---
title: "【技術解析】FP16 KV 快取隱藏的確定性偏移：為何 cache-ON 與 cache-OFF 永遠不會产生相同輸出"
description: "一篇新論文揭示了一個長期被忽略的事實：在標準 FP16 精度下，KV 快取優化與完整重計算的執行路徑，會因為浮點運算不可結合性而產生 100% 確定性的 token 偏移，且此偏移無法被残差流的干預修復。"
publishDate: "2026-04-21T10:00:00+08:00"
updatedDate: "2026-04-21T10:00:00+08:00"
tags: ["KV Cache", "FP16", "LLM Inference", "Numerical Stability", "ArXiv 2604.15409"]
draft: false
---

## 這篇文章在說什麼

KV 快取（Key-Value Cache）是現代 LLM 推理引擎的基石優化：每一個解碼步驟不再重新計算對整個前綴的注意力，而是直接取用已緩存的 Key 與 Value。這項技術存在於幾乎所有生產環境的 serving 系統、Flash Attention 内核，以及各種 prompt caching API 中。

**長期以來，業界默認 cache-ON 與 cache-OFF（完整重計算）的輸出是數值等价的。**這篇論文用一個乾淨的實驗設計證明了這個假設並不成立：在標準 FP16 精度下，兩個執行路徑因為浮點累積順序不同，會產生**確定的、每次都重现的** token 序列差異，而且在貪婪解碼（greedy decoding）下也同樣發生——這排除了隨機性因素。

作者在 LLaMA-2-7B、Mistral-7B-v0.3、Gemma-2-2B 三個模型上，針對 GSM8K 基準測試，觀察到所有模型與所有採樣策略下的 **100% token 偏移率**。唯一的例外是精度提升到 FP32 時，偏移率直接歸零——確認了 FP16 非結合性是唯一驅動因素。

---

## 背景脈絡

在深入論文貢獻之前，需要理解三個背景知識：

**FP16 算術不可結合性**：對同樣的加減順序，FP16 不同的分組方式會產生不同的結果。這不是四捨五入噪聲，而是確定性的數值飄移。Transformer 的注意力計算是大量向量點積的累加，每一次解碼步驟都會寫入新的 KV tensors，誤差就此一路傳播。

**cache-ON / cache-OFF 的實作差異**：cache-ON 和 cache-OFF 的計算順序不同——並非只是「省略 vs 不省略」那麼簡單，而是使用了不同的 kernel 布局、不同的記憶體排布，以及不同的浮點累積路徑。這些差異在 FP32 下無害，但在 FP16 下就會產生確定性的分歧。

**GQA（Grouped-Query Attention）放大效應**：Mistral 使用 GQA（比例 4:1），LLaMA-2 使用標準 MHA。GQA 的設計是多個 query heads 共享同一組 KV heads，這讓一個 FP16 捨入誤差被**同時廣播到所有查詢頭**，導致這些錯誤並非獨立分布，而是高度相關的。Mistral 因此展現出比 LLaMA-2 更高的每層漂移量——論文的實驗數據完全驗證了這一點。

---

## 為什麼重要

這是一個在工程上被嚴重低估的問題。過去多篇論文探討 LLM 推理的不穩定性，通常把焦點放在採樣隨機性或提示敏感度上。然而，**這個偏差與任何隨機因素無關**——它發生在 greedy decoding 下、出現在同一硬體上的同樣輸入與模型身上，且每次都稳定出现。

對於工程師的實際影響：

- **部署一致性**：當團隊在開發環境用 FP32 做實驗，但在生產環境用 FP16 部署時，可能出現系統性的輸出差異，而不是噪聲。
- **量化可靠性**：FP16 KV cache 的準確性假設，在某些任務上並不成立。特別是那些依賴精確推理鏈的任務（如數學推導、程式合成），偏移可能足以翻轉最終答案。
- **模型責任與可重現性**：在要求嚴格可重現性的場景（如程式碼審查、醫療建議），KV cache 推理並不能被視為完整計算的等價替代。

---

## 技術細節

### 實驗設計

研究者在三個模型（LLaMA-2-7B、Mistral-7B-v0.3、Gemma-2-2B）上，對比 cache-ON 與 cache-OFF 兩條執行路徑在 GSM8K 基準上的輸出差異。測試了貪婪解碼、top-k、top-p 三種採樣策略，確保結果不是由隨機性產生。

**關鍵發現**：
- 所有 9 種模型×策略組合都出現了 100% token 偏移率（每次 decode 的結果都不同）
- cache-ON 在 8/9 條件下**準確率更高**，而非更低——說明這個偏移不是隨機錯誤，而是有方向的系統性偏差
- 轉換至 FP32 後，偏移幅度減少**八個數量級**，token flip rate 降至 0.0%——直接確認 FP16 非結合性是唯一原因

### 層級漂移分析（Layer-wise Drift Profiling）

研究團隊追蹤了偏差在網路中的傳播方式，發現架構選擇會預測漂移模式：

- **GQA 模型（如 Mistral）**：第一層就出現急劇的偏差峰值。一個 FP16 誤差被廣播到所有共享該 KV head 的 query heads，導致所有查詢頭同時產生相關錯誤，放大效應極強。
- **Gemma-2-2B**：更大的 head dimension 與 sliding window attention 產生**均勻分布**的偏差累積，而非集中在某幾層。

這個發現對於理解不同注意力架構的數值穩定性有直接價值。

### 殘差流修補實驗（Activation Patching）

研究團隊对整个残差流进行 activation patching（修補所有層的 residual stream），试图恢复 cache-free 的軌跡。结果：**完全失敗**——即使修補了所有層的殘差狀態，依然無法恢復 cache-OFF 的輸出。

這是一個嚴謹的因果定位實驗：它證明偏差的載體不是殘差流（residual stream），而是 KV cache 本身——一個狀態性的存儲結構，無法被殘差流的干預所影響。

---

## 跟既有做法相比

過去關於 LLM 數值穩定性的研究（如 LayerCast 等）主要关注点是：**不同硬體配置或不同並行策略**下的浮點差異。本論文填補的是一個更基本的空白：**在同一台機器、相同輸入、相同模型的情況下，兩種執行路徑（cache-ON vs cache-OFF）之間的確定性偏差**。

LayerCast 的解法是「全程以 FP32 儲存權重但在計算時使用 FP16」。這是一個有效的方向，但代價較高。本論文提供了更基礎的診斷框架，讓我們得以在設計 KV cache 量化策略、選擇注意力架構、確定部署精度需求時，有更精確的參考依據。

---

## 我的觀點

這篇論文最讓我印象深刻的，不是結論本身，而是它揭露的**系統性盲點**。整個業界在推論效率上花了大量力氣優化 KV cache，却幾乎沒有人系統性地驗證過快取後的輸出，與完整計算的輸出之間是否真的等價。

**100% 的偏差率**在科學上極為罕見——通常科研結果会呈现某种分布，不会是完美的100%。但這裡恰恰是因為根本沒有隨機因素在起作用：FP16 非結合性是一個確定性的物理現象，每次執行都一樣。這就是為什麼即使在 greedy decoding 下也不能免疫。

另外一個被低估的細節是：**cache-ON 居然在多數條件下比 cache-OFF 更準確**。論文作者將此解讀為「偏差方向是系統性的而非隨機的」——但這個觀察本身，其實暗示了在某些任務上，FP16 的計算順序可能剛好產生了稍微更有利的數值誤差分佈。這個方向值得進一步研究。

最後，GQA 的放大效應是一個對架構設計者很重要的提醒：共享 KV heads 不只是一個記憶體頻寬的優化，它同時也改變了錯誤的相關性結構。在高並發或需要確定性輸出的場景中，MHA（Multi-Head Attention）可能是一個被低估的穩定性選擇。

---

## 參考連結

- [The Illusion of Equivalence: Systematic FP16 Divergence in KV-Cached Autoregressive Inference (arXiv:2604.15409)](https://arxiv.org/abs/2604.15409)
- [arXiv HTML 版本（論文全文）](https://arxiv.org/html/2604.15409v1)
- [LLaMA-2-7B（Hugging Face）](https://huggingface.co/meta-llama/Llama-2-7b)
- [Mistral-7B-v0.3（Hugging Face）](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3)
- [Gemma-2-2B（Hugging Face）](https://huggingface.co/google/gemma-2-2b)
- [Flash Attention（官方論文）](https://arxiv.org/abs/2205.14135)
- [Grouped-Query Attention 原論文](https://arxiv.org/abs/2305.13245)
- [LayerCast 相關研究](https://arxiv.org/abs/2412.00056)