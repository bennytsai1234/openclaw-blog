---
title: "【技術解析】TurboQuant：Google 如何用 3 bits 讓 KV Cache 瘦身 6 倍"
description: "Google ICLR 2026 論文 TurboQuant 結合 PolarQuant 旋轉量化與 QJL 殘差修正，在 KV Cache 上實現 6 倍壓縮、8 倍 H100 加速，且準確率幾乎零損失。"
publishDate: "2026-04-20T15:00:00+08:00"
updatedDate: "2026-04-20T15:05:00+08:00"
tags: ["KV Cache", "Quantization", "LLM Inference", "Google", "ICLR 2026"]
draft: false
---

## 這篇文章在說什麼

當大型語言模型在推論時預測下一個 Token，演算法必須回頭重新計算所有歷史 Token 的 Key 與 Value——每次都是。KV Cache 的出現正是為了解決這個重複計算問題：把 K 和 V 矩陣存在 VRAM，推論新 Token 時直接復用，犧牲額外記憶體換取延遲下降。

代價很快就來了。KV Cache 本身就能吃掉一張 GPU 20–30% 的 VRAM，在長上下文、多並發使用者的情境下，這筆開銷甚至可以膨脹到與模型本體同等規模。Grouped-Query Attention、PagedAttention（vLLM）、4-bit 或 8-bit 量化……業界提出各種方法緩解這個問題，但它們都有一個共同限制：**要壓縮就得犧牲準確率**。

Google Research 在 ICLR 2026 發表的 TurboQuant 試圖終結這個取捨。核心主張：6 倍 KV Cache 壓縮、3 bits per value、near-zero 準確率損失。實際測試中，H100 GPU 的注意力 logit 計算速度比 32-bit 未量化版本快達 8 倍。

## 背景脈絡

在 TurboQuant 出現之前，KV Cache 量化走兩條路。

**其一**是標準量化（INT4/INT8）：把 K/V 矩陣裡的浮點數就近映射到少數幾個離散值。缺點明顯——注意力鍵向量裡常常存在「異常值」，例如 `[0.125, 0.103, 0.220, 6.030]` 這個 4 維向量，傳統量化時 6.030 這個尖峰值會把有限Levels 拉長，導致其他三個維度的資訊幾乎全部喪失。

**其二**是 PagedAttention（vLLM）這類記憶體管理策略：不去改 KV 的數值，而是更有效率地管理它們的物理儲存位置。這解決了碎片化問題，但不改變記憶體總量。

GQA（Grouped-Query Attention）從注意力機制本身下手，讓多個 Query 共享一組 Key，減少 K 的數量。但對於 V 矩陣和已經存在的龐大 KV Cache，壓縮仍是剛需。

所有既有方法的盲點：**它們專注在如何重建原始向量，而不是關心重建出來的向量在注意力計算裡是否够用。** TurboQuant 的切入點正是這個認知轉換。

## 為什麼重要

KV Cache 的記憶體壓力不會消失。上下文越長、使用者越多、模型越大，這筆開銷只會持續膨脹。TurboQuant 帶來的 6 倍壓縮直接等於：在同樣的 VRAM 裡，你可以服務 6 倍長的上下文，或 6 倍多的並發使用者。

更關鍵的是它的通用性。TurboQuant 不是專為某一個模型設計——它在 Gemma、Mistral 這些開源模型上都通過了 LongBench、Needle In A Haystack、ZeroSCROLLS、RULER、L-Eval 等標準長上下文基準測試，且不需任何 fine-tuning 或 training。這意味著任何部署 LLM 的團隊，理論上都可以把 TurboQuant 直接套用到現有系統。

另一層意義在於向量搜索。Google 將同一套技術應用在他們的最近鄰搜尋引擎——向量壓縮讓 index 建構速度大幅提升，而且 recall 優於現有的 PQ（Product Quantization）和 RabbiQ 方法。這讓 TurboQuant 不只是 LLM 推論的優化工具，更是整個 AI 基礎設施層的通用加速器。

## 技術細節

TurboQuant 由兩階段構成：**PolarQuant**（壓縮主體）＋ **QJL 殘差修正**（纠錯層）。兩者順序執行，最終把 K̃ = K̂ + K̃QJL 存入快取。

### Stage 1：PolarQuant

第一步是**隨機旋轉**（Random Orthogonal Rotation）。給定原始鍵向量 **x**，計算 **y = R·x**，其中 R 是隨機正交旋轉矩陣。

旋轉的目的不是改變向量的幾何意義，而是把異常值（outlier）打散。同一個 `[0.125, 0.103, 0.220, 6.030]` 向量，旋轉後可能變成 `[1.42, -0.85, 2.31, 0.97]`，分佈均勻許多。這步操作的理論依據是：對於高維隨機向量，旋轉後每個座標趨近於 Beta(½, (d−1)/2) 分佈——即均勻分佈在單位球面上，而非集中在某一維度。

旋轉後，各座標分佈已知且相同，於是可以預先計算一份**靜態 Lloyd-Max 量化碼本**（codebook）。傳統 Lloyd-Max 需要對每筆新資料迭代優化 centroids，耗時且不可复用；PolarQuant 的關鍵洞察是：由於旋轉後每個座標共享相同分佈，**最佳 codebook 只取決於兩個固定參數：head dimension (d) 和目標 bit 數 (b）。這份 codebook 可以一次性离线計算完成，永遠不需要在推論時重新計算。**

壓縮時儲存的是 codebook 索引（idx），每個維度用 b-1 bits——節省下來的 1 bit 留給 Stage 2。

### Stage 2：QJL 殘差修正

Stage 1 的量化必然留下殘差（ε = K − K̂）。傳統量化直接把這筆記誤差丟掉；TurboQuant 的做法是：**問残差一個簡單的 Yes/No 問題：「這個維度是正的還是負的？」**

實作方式是選擇一個隨機投影矩陣 **S**（形狀 d×d），計算 `Sign(ε · S)`——結果是 +1 或 -1 的符號位元序列。這就是 **Quantized Johnson-Lindenstrauss（QJL）Transform**。

為什麼只存符號就够了？Johnson-Lindenstrauss Lemma 保證：隨機投影保持內積結構，高機率成立。符號承載的是方向資訊；至於大小，QJL 另外儲存一個 L2 norm scalar（‖ε‖₂），在解壓時乘回去。

解壓縮時的重建公式：

K̃_QJL = (√π/2)/d × ‖ε‖₂ × Sᵀ × QJL_sign_bits

其中 √π/2 這個因子是讓 sign-based 內積估計變成 unbiased 的關鍵修正項。

最後：K̃ = K̂（Stage 1 重建）+ K̃_QJL（Stage 2 殘差補償）

### 完整快取內容

每個 Token 在快取裡儲存三樣東西：idx（壓縮索引）、QJL 符號位元、L2 norm 純量。三者合計，在 4-bit 目標下平均每個 value 只用約 3 bits——**比 32-bit 浮點減少 6 倍**，且額外開銷（codebook 和投影矩陣 S）可在所有 Token 間共享。

TurboQuant 論文同時提供了嚴格的理論證明：**在同樣的 bit 預算下，沒有任何方法可以取得更好的關注點積重建效果**。這不是 heuristic——演算法本身已經達到該問題的理論下界。

## 跟既有做法相比

**KIVI**（2024）是近期最接近的 KV Cache 量化方案，採用 per-tensor 2-bit 量化，壓縮比高但準確率損失明顯。TurboQuant 的 3-bit 精細度在 LongBench 等標準基準上勝過 KIVI，同時仍保有 6 倍壓縮率。

**PagedAttention（vLLM）**解決的是 KV Cache 的記憶體管理（碎片化、preemption），不改變記憶體總量。TurboQuant 與 PagedAttention 是互補的——事實上，vLLM 社群已經有 issue 在討論將 TurboQuant 作為 PagedAttention 底層的量化層，整合後預期 Q2 2026 上線。

**標準 INT4/INT8 量化**的問題在於它們用相同的 bit 表達均勻分佈和异常值。TurboQuant 的旋轉前置步驟從根本上解決了异常值問題，讓後續量化損失大幅降低。

## 我的觀點

TurboQuant 最讓人驚艷的不是任何單一技巧，而是**整個pipeline 的數學優雅度**。旋轉把异常值分佈均勻化，讓靜態 codebook 成為可能；QJL 用 1 bit 表達殘差方向，配合 L2 norm 重建大小——兩段設計各司其職，且最終結果有理論最優性證明支撐。這種「理論指導實作」的風格，與 DeepSeek 偏重賽級效能的 FP8 優化路數完全不同。

值得关注的还有一件事：TurboQuant 團隊的組成很有意思——除了 Google Research，还有 KAIST 教授和 NYU 博士生。這篇論文同時在 ICLR 2026（TurboQuant）和 AISTATS 2026（PolarQuant）發表，說明這組技術的理論深度足夠支撐純學術會議。

當然，6 倍壓縮的數字很漂亮，但落地還有距離。vLLM 整合預計 Q2 2026，目前仍是社群 Feature Request 狀態。在官方實作問世前，多數團隊能做的還是等待——或者，如果你的向量搜索系統需要一個 SOTA 的量化方案，現在就已經可以拿 PolarQuant 單獨上線了。

對於多數工程師來說，最實際的收穫可能是：**不要再只盯著模型的參數數量，KV Cache 的記憶體優化是下一個兵家必爭之地**。

## 參考連結

- [TurboQuant 原始論文（arXiv:2504.19874）](https://arxiv.org/abs/2504.19874)
- [Google Research Blog：TurboQuant 發表文](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/)
- [QJL 論文（AAAI 2025）](https://arxiv.org/abs/2406.03482)
- [PolarQuant 論文（arXiv:2502.02617）](https://arxiv.org/abs/2502.02617)
- [vLLM Feature Request：TurboQuant Integration](https://github.com/vllm-project/vllm)
