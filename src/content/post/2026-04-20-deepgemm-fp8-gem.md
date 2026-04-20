---
title: "【技術解析】DeepGEMM：DeepSeek 的 FP8 矩陣乘法核心庫"
description: "DeepSeek 開源的 DeepGEMM 以僅 300 行 CUDA 核心程式碼，達到 H800 上 1550 TFLOPS 的 FP8 效能，挑戰 NVIDIA CUTLASS 的壟斷地位。"
publishDate: "2026-04-20T10:00:00+08:00"
updatedDate: "2026-04-20T10:03:00+08:00"
tags: ["DeepSeek", "FP8", "GEMM", "CUDA", "MoE"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-20-deepgemm-fp8-gem.png"
  alt: "DeepGEMM：DeepSeek 的 FP8 矩陣乘法核心庫"
---

## 這篇文章在說什麼

DeepSeek 上週更新了 DeepGEMM（v0.4.16），把整個專案推向新階段——Mega MoE、FP8×FP4 混合精度、FP4 Indexer、PDL（Programmatic Dependent Launch）支援全部到位。這個函式庫的核心訴求很明確：**用最少的程式碼，提供比 NVIDIA 官方 CUTLASS 更易讀、同時效能不打折扣的 GPU 矩陣乘法核心**。在 Hopper（H100/H800）和 Blackwell（B200/B300）上，DeepGEMM 的 FP8 張量核心峰值達到 1550 TFLOPS，而且核心實作只有大約 300 行 CUDA 程式碼。

## 背景脈絡

矩陣乘法（GEMM）是現代大型語言模型的計算骨幹。一次 DeepSeek-V3 的前向推論，會在注意力投影、前饋網路和 MoE 專家層中執行數十億次浮點乘法傳加運算。傳統上，這些運算採用 BF16 或 FP32 執行，NVIDIA 的 Hopper 架構開始原生支援 FP8 張量核心，硬體上每個時脈週期的理論 FLOPS 相比 BF16 多一倍。

問題在於 FP8 的動態範圍極窄。E4M3 格式只有 4 位元指數和 3 位元尾數，超出可表示範圍的值會被飽和或向下溢位為零。為了解決這個問題，FP8 GEMM 需要精細的 per-block 縮放因子——每個小 tile 矩陣使用自己的最佳 scale。這正是 DeepGEMM 設計的核心。

在 DeepGEMM 出現之前，工程師要嘛直接用 NVIDIA CUTLASS（龐大的 C++ template 函式庫，學習曲線極高），要嘛自己從零寫 CUDA kernel。DeepSeek 的切入點很直接：**吸收 CUTLASS 的概念，但用更乾淨、更易懂的實作方式**。

## 為什麼重要

這件事對兩種人直接有幫助。

第一類是訓練或推論 LLM 的工程團隊。DeepGEMM 把 FP8 GEMM 的入門門檻從「需要 GPU kernel 專家」降到「只要會 Python 就能呼叫」。對於需要在 Hopper 或 Blackwell 集群上優化 DeepSeek V3、Llama 4 或其他 MoE 架構模型的團隊，DeepGEMM 提供了一個可以直接置換的效能層。

第二類是想理解 NVIDIA GPU kernel 最佳化的人。DeepGEMM 的核心只有 300 行 CUDA 程式碼，配合 TMA（Tensor Memory Accelerator）載入、FP8 MMA（Matrix Multiply-Accumulate）和 epilogue 階段的縮放因子應用，整個資料流寫得相當透明。這不是 toy project——它是支撐 DeepSeek V3 實際訓練的工作量。

## 技術細節

DeepGEMM 的架構分為幾層。最上層是 Python API (`import deep_gemm`)，底層則是 lightweight JIT CPP module，runtime 即時編譯成 CUDA SASS，**不需要在安裝時執行 nvcc**。JIT 引擎支援 NVCC 和 NVRTC 兩種編譯後端，NVRTC 可快 10 倍但部分 shape 可能效能略低。

核心支援的 kernel 型別：

**Dense GEMM**：標準矩陣乘法 D = C + A × B，支援 FP8（E4M3）、BF16、TF32（HC pre-norm）。FP8 GEMM 支援兩種精細縮放模式：1D-1D（row + column scaling，適用大多數 shape）和 1D-2D（更細粒度，針對分佈不均勻的矩陣）。

**Grouped GEMM for MoE**：MoE 模型中多個專家共享權重維度，但各自處理不同數量的 token。DeepGEMM 支援 contiguous layout（適用 training forward 和 inference prefilling）和 masked layout（適用 decoding with CUDA graphs，CPU 不知道每個專家具體拿到幾個 token）。

**Mega MoE**：最激進的優化。把 Expert Parallelism（EP）dispatch、兩層 FP8×FP4 線性層、SwiGLU  activation 和 EP combine **全部 fuse 成單一 mega-kernel**，讓 NVLink 通訊延遲與張量核心計算完全 overlap。需要多程序啟動與對稱記憶體。這個 kernel 直接影響 DeepSeek V3 這類超大規模 MoE 模型的訓練效率。

**MQA Logits**：針對 DeepSeek V3.2 lightning indexer 的 FP8 多查詢注意力評分實作。

硬體支援方面，SM90（Hopper，H100/H800/H200）支援 FP8 GEMM 的 1D-1D 和 1D-2D 縮放模式；SM100（Blackwell，B200/B300） additionally 支援 FP8×FP4 混合精度、Mega MoE 和所有記憶體 layout（NT/TN/NN/TT）。

## 跟既有做法相比

CUTLASS 是這個領域的事實標準，由 NVIDIA 官方維護，支援幾乎所有可能的矩陣形狀和資料類型。但 CUTLASS 的代價是極高的 template 複雜度——整個專案依賴大量的 C++ template metaprogramming，學習和修改成本極高。

DeepGEMM 的策略是「拿 CUTLASS 的概念，不用它的 template 負擔」。它從 CUTLASS 和 NVIDIA CuTe 汲取概念（特別是 TMA 和 MMA 指令的使用模式），但用更少的核心程式碼實現可比擬的效能。JIT 即時編譯讓 kernel 可以針對具體的矩陣維度做 specialize，這是預先編譯的 static library 無法做到的彈性。

從效能數字來看：H800 上 1550 TFLOPS 的 FP8 峰值，已經接近理論上限。對於 MoE 工作負載，Mega MoE 把通訊與計算 overlap 的設計，直接對應了 MoE 模型在多 GPU 間專家路由的通訊瓶頸。FP8×FP4 混合精度在 SM100 上把權重載入的記憶體頻寬再減半——對於權重運算比極高的 MoE 模型，這是實質的加速。

## 我的觀點

DeepGEMM 最讓人印象深刻的不是效能數字，而是工程取態。DeepSeek 選擇把一個這麼核心的元件開源，而且不是以「教學 toy」的心態敷衍——它真的在支撐 DeepSeek V3 系列的實際訓練。300 行核心 kernel 的宣言，某種程度上也是在向社群喊話：「CUTLASS 那套太複雜了，我們可以更乾淨」。

當然，這個專案有它的適用範圍。它只支援 NVIDIA Hopper 和 Blackwell，想要 AMD/Mac GPU 支援的人還是得找別的路。另外 FP4 的採用（特別是 Blackwell 專屬的 FP8×FP4 模式）暗示 DeepSeek 仍在最高階的美國硬體上訓練——這和市場上「中國公司被禁止訓練大模型」的敘事有一點落差，是個值得觀察的信號。

對於多數工程師來說，短期内最實際的價值可能是把 DeepGEMM 當作學習 NVIDIA kernel 最佳化的教材——乾淨、完整、有實際工作量支撐。

## 參考連結

- [DeepGEMM GitHub（原始 repo）](https://github.com/deepseek-ai/DeepGEMM)
- [DeepGEMM 技術解析（PyShine）](https://pyshine.com/DeepGEMM-Efficient-FP8-GEMM-Kernels/)
- [DeepGEMM DeepWiki 文件](https://deepwiki.com/deepseek-ai/DeepGEMM)
- [DeepSeek DeepGEMM Update 分析（ChinaBizInsider）](https://chinabizinsider.com/deepseeks-deepgemm-overhaul-signals-nvidia-blackwell-integration-amid-compute-squeeze/)
