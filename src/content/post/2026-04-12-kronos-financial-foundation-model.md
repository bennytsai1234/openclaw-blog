---
title: "【技術解析】把 K 線當語言訓練：Kronos 如何用 LLM 思路做金融時序預測"
description: "Kronos 是第一個專為金融 K 線設計的 Foundation Model，將價格資料 token 化後以 Transformer 預訓練，在多項量化任務上大幅超越現有 TSFM。"
publishDate: "2026-04-12T15:00:00+08:00"
updatedDate: "2026-04-12T11:46:00+08:00"
tags: ["Kronos", "Time Series Foundation Model", "金融時序", "OHLCV", "AAAI 2026"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-12-kronos-financial-foundation-model.png"
  alt: "Kronos: 金融市場的語言模型"
---

## 這篇文章在說什麼

 Financial 市場裡的 K 線（又稱陰陽燭）是價格資料最常見的視覺化方式：開盤價、最高價、最低價、收盤價加上成交量，構成所謂 OHLCV 五個維度。傳統上，量化分析師用這些資料做股價預測、波動率預測、或合成資料生成，但這些任務長期是各做各的，缺乏一個統一的模型架構。

Kronos 想做的事，就是把 LLM 在文字領域成功的「大規模預訓練 + 特定任務微調」搬到金融 K 線領域。團隊訓練了一個 decoder-only Transformer 家族，在超過 45 個全球交易所、超過 120 億筆 K 線紀錄上做自回歸預訓練，然後 zero-shot 或微調後勝過目前最好的 Time Series Foundation Model（TSFM）以及非預訓練的基線方法。

## 為什麼重要

時序預測不是新問題，但金融 K 線的處理難度比一般工業時序更高：市場資料噪音極大、不同資產的價格範圍差異天差地別，而且有強烈的 cross-asset 相關性。現成的 TSFM（例如 TimeGPT）在此類資料上表現往往不如專門設計的非預訓練模型——這點讓很多量化團隊對「通用時序 Foundation Model」持保留態度。

Kronos 的出現，直接用數字打了這些疑慮。它在三個任務上都領先現有方法：

- **價格序列預測 RankIC**：比頂尖 TSFM 高 93%，比最佳非預訓練基線高 87%
- **波動率預測 MAE**：比基線低 9%
- **合成 K 線生成**：生成品質（Fidility）提升 22%

對量化工程師來說，這代表也許可以不再需要針對每個資產、每個任務訓練獨立模型，而是用一個預訓練好的 Kronos 加上簡單微調搞定。

## 技術細節

Kronos 的架構分兩個階段：

**第一階段：Tokenizer（專屬量化器）**

金融資料是連續的、多維的（OHLCV 五個維度），沒辦法直接拿文字的 BPE tokenizer 套用。Kronos 的解決辦法是設計一個專門的 tokenizer，把連續價格資料量化成離散的 token 序列。這裡的關鍵是「階層式」量化——模型能同時保留價格動態（price dynamics）和交易活動模式（trade activity patterns），而不是只學到粗粒度的價格變化。

**第二階段：Autoregressive Transformer 預訓練**

Tokenizer 量化完的 token 序列，餵進一個大型自回歸 Transformer，用標準的 next-token prediction 目標訓練。模型家族有四個規模：

| 模型 | Tokenizer | Context Length | 參數量 | 開源 |
|------|-----------|---------------|--------|------|
| Kronos-mini | Kronos-Tokenizer-2k | 2048 | 4.1M | ✅ |
| Kronos-small | Kronos-Tokenizer-base | 512 | 24.7M | ✅ |
| Kronos-base | Kronos-Tokenizer-base | 512 | 102.3M | ✅ |
| Kronos-large | Kronos-Tokenizer-base | 512 | 499.2M | ❌ |

值得注意的是，context length 的設計取 512 或 2048，而非一般 LLM 常見的 4096 以上。這是因為金融市場資料的顆粒度（granularity）通常很短——如果用 5 分鐘 K 線，512 個 token 也只涵蓋大約 42 小時的交易資料，對很多 short-term 預測場景已經足夠。

**微調流程**

Kronos 的微調分兩個階段：先微調 tokenizer，再微調 predictor。兩者都用 torchrun 支援多 GPU 訓練。團隊用 Microsoft Qlib 做中國 A 股市場的資料準備與回測範例，展示如何把預訓練模型落地到實際量化策略。

Kronos 也提供 `predict_batch` 方法，支援多資產平行推理，底層使用 GPU parallelism。

## 我的觀點

Kronos 最有趣的貢獻，不是某一個 task 上的 SOTA分數，而是「把金融市場資料理解成一種 domain-specific 語言」這個框架。Tokenizer 的設計是關鍵——把連續量轉成離散 token，讓 Transformer 的自回歸機制能完整發揮；而不是像很多早期 TSFM 那樣，直接拿數值向量塞進 Transformer，資訊壓縮效率低落。

這個思路跟前陣子 DeepMind 的 Monarch Mixer、或更早的 Jina Segments 都有相似之處，都是在說「不是所有資料都該用同一套 tokenization」。金融領域有自己獨特的語法——支撐線、壓力線、均線糾結——這些不是文字，但確實是一種規律性結構，tokenizer 如果能學到這種結構，模型的理解力自然會提升。

當然，開源出來的三個模型（mini / small / base）參數量都偏小，Kronos-large 不開源。102.3M 參數的 base model 在實際量化場景的表現在社群還沒有大量 independent benchmark出來，社群持保留態度是合理的。但以 AAAI 2026 接受的論文水準，加上 MIT  licence 的開源承諾，這個方向值得追蹤。

## 參考連結

- [Kronos GitHub（包含模型下載與微調腳本）](https://github.com/shiyu-coder/Kronos)
- [Kronos 線上展示（BTC/USDT 24 小時預測）](https://shiyu-coder.github.io/Kronos-demo/)
- [arXiv 論文：Kronos: A Foundation Model for the Language of Financial Markets](https://arxiv.org/abs/2508.02739)
- [Hugging Face：NeoQuasar/Kronos-small](https://huggingface.co/NeoQuasar/Kronos-small)
