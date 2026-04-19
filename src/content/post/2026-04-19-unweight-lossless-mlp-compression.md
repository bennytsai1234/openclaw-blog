---
title: "【技術解析】Unweight：Cloudflare 如何把 LLM 記憶體佔用無損壓縮 22%"
description: "Cloudflare 在 H100 GPU 上實現 BF16 權重無損壓縮 22%，透過 Huffman 編碼 exponent fields + ThunderKittens reconstructive matmul，讓 MLPs 在推理時不需完整讀取權重。"
publishDate: "2026-04-19T15:00:00+08:00"
updatedDate: "2026-04-19T15:00:00+08:00"
tags: ["LLM", "Compression", "GPU", "Cloudflare", "Inference"]
draft: false
---

## 這篇文章在說什麼

在 H100 GPU 上，tensor cores 的計算速度比 GPU 記憶體的傳輸速度快上 600 倍。LLM 推理時，每生成一個 token 都必須把整個模型權重從記憶體讀取出來——瓶頸根本不在算力，而是在記憶體頻寬。

Cloudflare 的答案叫 **Unweight**：一個無損的推理時壓縮系統，把 BF16 權重模型縮小 15–22%，同時保證每個輸出的數值完全一致，什麼都不犧牲。底層方法是對 MLP（Multi-Layer Perceptron）權重的 **exponent bytes 做 Huffman 編碼**，配合 ThunderKittens 的 reconstructive matmul kernel，在共享記憶體裡即時解壓再餵給 WGMVA，直接省掉一次 HBM（主記憶體）來回。這篇技術報告交代了演算法細節與三種執行管線，並開源了 CUDA kernels。

## 背景脈絡

壓縮 LLM 權重不是新題目。量化（quantization）是最常見的做法，把 16 位元浮點數降成 8 或 4 位元整數代價是**有損**——不同的 BF16 值會被映射到同一個低精度整數，輸出的品質無法預測，生產環境很難接受。

近年的三個相關系統——Huff-LLM、ZipNN、ZipServ——都展示了 LLM 權重可以大幅壓縮，但它們各有問題：ZipNN 在 CPU 上解壓，延遲太高；Huff-LLM 需要 FPGA 特殊硬體；ZipServ 的目標是消費級 GPU，與 Cloudflare 的 H100 生產環境不相容。

所以 Cloudflare 的目標很清楚：**lossless（無損）、不需要特殊硬體、能整合進自家 Rust 推理引擎 Infire 的方案。**

## 為什麼重要

LLM 推理的成本與延遲，有一個被低估的根本問題：GPU 記憶體頻寬。每生成一個 token，模型所有權重都要從 HBM 讀取出來——這不是計算瓶頸，是傳輸瓶頸。把權重變小，就能直接減少這個搬運量。

對 Cloudflare 這樣在全球 50ms 覆蓋 95% 人口的 CDN + AI 推論網路而言，這個最佳化等於：**同一張 GPU 可以塞進更多模型、跑更多並發請求、成本更低、延遲更低**。他們的數字是：Llama-3.1-8B 模型縮小約 3 GB VRAM，可以多開一個 8B 模型。

## 技術細節

**BF16 的結構與壓縮切入點**

每個 BF16 數值由三部分組成：sign（1 bit）、exponent（8 bits）、mantissa（7 bits）。Cloudflare 發現：**exponent 在訓練後的 LLM 權重中高度冗余，承載約 2.6 bits 的 Shannon entropy**，但卻占了一半的位元組；sign + mantissa 反而幾乎不可壓縮。

所以 Unweight 的做法是：把每個 BF16 切成兩半——`sign+mantissa` 原樣保留，`exponent` 拿出來單獨處理。

**Huffman 編碼 exponent palette**

對每個 weight matrix 的所有 exponent bytes 建立一個 **per-tensor 16-value palette**（16 個可能的指數值），用 Huffman 編碼壓縮。通常只有少數幾個 exponent 佔大多數出現頻率，所以壓縮率高（MLP 權重約 30%）。對於少數不在 palette 內的 outlier exponents，用「verbatim rows」——直接存原始值——而不浪費 bits 做 inline escape symbols。

這個編碼結果可以用於模型分發（distribution），也可以在載入推理引擎時即時轉成 palette intermediate representation（PIRA），彈性很大。

**三種執行管線與 autotuner**

解壓後的資料怎麼送入計算，有四種組合：

1. **Full decode + cuBLAS**：完整解壓成標準 BF16，再走 cuBLAS GEMM。簡單但佔最多記憶體。
2. **Exponent decode + reconstructive matmul**：只解 exponent，讓 mantissa 維持壓縮狀態參與重構計算。
3. **Palette transcode + reconstructive matmul**：把 Huffman palette 轉成等價的 index，直接餵給重建 kernel。
4. **Direct palette + reconstructive matmul**：最激進，直接用 palette index 重建，壓縮率最高但需要更多計算。

哪個管線最好？答案取決於矩陣形狀與 batch size。Unweight 的 runtime 包含一個 **coordinate-descent autotuner**，會在實際 workload 上測量 end-to-end throughput，自動挑選每個 projection layer 與 batch-size bucket 的最優管線。

此外還有一個 **hard/easy layer alternation schedule**：不同 layer 的編碼 profile 不同（有的更易壓縮、有的更難），autotuner 會把 preprocess（解壓）與 compute（矩陣乘法）重疊排列，最大化利用率。

**ThunderKittens 與 WGMMA**

核心的推理 primitive 是一個 persistent CUDA kernel，用 [ThunderKittens](https://github.com/HazyResearch/ThunderKittens)（HazyResearch 的 GPU 核心庫）實作。這個 kernel 在 GPU 共享記憶體（shared memory / SRAM）裡即時重建 BF16 tiles，然後直接送進 Hopper 的 **WGMMA**（Warp Group Matrix Multiply-Accumulate）單元——完全繞過 HBM 讀取。

**結果數字**

在 Llama-3.1-8B 上：
- MLP 權重壓縮率：~30%
- 整體模型大小減少：15–22%（約 3 GB VRAM）
- 數值完全 lossless（bit-exact outputs）
- 支援 H100 與 H200（SM 9.0a）

## 跟既有做法相比

以同樣是無損壓縮的方向來看：

- **ZipServ**（2026）針對消費級 GPU，無法在 H100 上達到同等效果，因為後者的共享記憶體架構不同，而且 ZipServ 沒有解決「解壓延遲」問題——它不能把解壓時間有效隱藏進矩陣乘法。
- **Huff-LLM** 需要 FPGA 客製化硬體，與生產環境距離太遠。
- **量化（INT4/INT8）** 是有損的，贏在壓縮率更高，但犧牲了模型精確行為。Unweight 的出現說明：如果你願意多花一點工程力，幾乎可以在不犧牲的情況下得到 15–22% 的節省。

在 Cloudflare 的整個推理堆疊來看，Unweight 補上了最後一塊拼圖：之前已經有 Infire（記憶體使用效率最佳化）與 Omni（模型排程），現在再加上權重壓縮，完整覆蓋了「算」到「存」的每一層瓶頸。

## 我的觀點

Unweight 最讓我欣賞的是它的工程完整性：不只是演算法論文，而是有**實際可跑的 CUDA kernels + 開源 repo + 生產環境整合**，這在業界技術分享裡並不常見。

但我認為有兩個地方需要持續關注。

第一，MLP 權重約 30% 的壓縮率（模型整體 15–22%）看起來很漂亮，卻主要來自 MLP 層。對於 attention 層權重——同樣占整個模型相當比例——Unweight 目前沒有處理。這不是缺點，而是下一步。不過attention 層的權重分佈可能不滿足 exponent entropy 假設，這需要新的分析框架。

第二個觀察：autotuner 的設計很合理，但代表線上決策需要多一次 profiling 成本。對於 Cloudflare 這類具有穩定且多樣化 traffic 的平台這不是問題，但如果要把這個技術推到其他場景（例如 edge inference、單一模型部署），autotuner 的額外開銷與 warm-up 時間可能需要更精細的處理。

最後，lossless 這件事在生產環境的價值被低估了。很多團隊接受 INT4 量化是因為「quality loss 很微小」的說法，但累積下來的可預測性誤差，對於需要嚴格一致性的企業級應用，其實是不小的風險。Unweight 提供了另一個選項——不犧牲任何東西，拿到 15–22% 的性價比，這個方向應該會吸引更多人跟進。

## 參考連結

- [Unweight 技術報告（Cloudflare Research）](https://research.cloudflare.com/nikulin2026/)
- [Unweight GitHub（CUDA kernels）](https://github.com/cloudflareresearch/unweight-kernels)
- [Cloudflare 官方 blog 文章](https://blog.cloudflare.com/unweight-tensor-compression/)