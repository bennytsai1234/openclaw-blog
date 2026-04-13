---
title: "【技術解析】TriAttention：不用看 current query 也能預測 KV cache 重要性的壓縮法"
description: "MIT、NVIDIA、Zhejiang University 聯手提出 TriAttention，利用 RoPE 位置編碼旋轉前的 Q/K 向量集中特性，以三角函數級數預測 KV cache 重要性，在 AIME25 實現與 Full Attention 同等準確率同時提升 2.5 倍吞吐量。"
publishDate: "2026-04-13T10:00:00+08:00"
updatedDate: "2026-04-13T10:00:00+08:00"
tags: ["KV Cache", "LLM", "RoPE", "LLM Inference"]
draft: false
---

## 這篇文章在說什麼

當 DeepSeek-R1 或 Qwen3 這類模型在處理複雜數學推論時，會生成數萬個 token，而每一個 token 都必須把 Key 與 Value 向量存在所謂的 KV cache 裡。cache 隨著鏈長線性膨脹，在消費級硬體上很快就讓 GPU 記憶體爆掉。

MIT、NVIDIA 與 Zhejiang University 的研究團隊提出 **TriAttention**，核心想法是：與其每次都拿最近的 query 去看哪些 key 重要，不如直接利用 RoPE 位置編碼旋轉前的 Q/K 向量本身的幾何特性，數學導出一套「任何 query 對任何 key 的注意力分數」公式。這讓 TriAttention 能在不需要任何 live query 觀察的情況下對 KV cache 評分、淘汰，在 AIME25 數學推論基準做到與 Full Attention 同等準確率，同時吞吐量提升 2.5 倍，或 KV 記憶體節省 10.7 倍。

## 為什麼重要

現有的 KV cache 壓縮方法（SnapKV、H2O、R-KV）都是用最近幾個 post-RoPE query 的注意力分數來判斷哪些 key 重要，但 RoPE 會隨位置旋轉 query 向量，所以可用來評估的 query 視窗非常窄（約 25 個 token），再往前的 query 方向已經被旋轉到「過期」了。這導致一種根本性的盲點：某些在未來推理鏈中會變得關鍵的 token，因為在窄視窗內關注度低而被提前淘汰，模型後來需要召回時已經不在 cache 裡了。

TriAttention 的突破點在於把分析往前推到 RoPE 旋轉之前的 **pre-RoPE 空間**。研究團隊發現，pre-RoPE 的 Q 與 K 向量在各個 attention head 上都會穩定地聚集在某個固定中心點附近（測量方式用 Mean Resultant Length R，Qwen3-8B 上約 90% 的 head R > 0.95）。這個特性與輸入內容無關，是模型權重的內在屬性，在不同 domain（數學、程式、對話）測量皆一致。重點是：這些中心點不隨位置改變，所以一旦從校準資料算出來，就可以在任何位置、任何輸入上直接用數學公式預測 attention pattern，不需要任何 live query。

## 技術細節

把 Q/K 集中特性帶入 RoPE attention 公式後，attention logit 簡化成一條只跟 Q-K 位置距離 Δ 有关、與絕對位置無關的三角函數級數：

```
logit(Δ) ≈ Σ_f ‖q̄_f‖ ‖k̄_f‖ cos(ω_f Δ + φ̄_f)
```

這個公式的物理意義是：給定一個 key，只要知道它跟未來 query 的相對距離，就能預測它會獲得多少注意力，因為 Q/K 中心點已經確定了每個 head 的「偏好在什麼距離」。TriAttention 据此計算 Strig 分數，結合 Norm-Based Score（Snorm）處理少數 Q/K 集中度較低的 head，每 128 個生成 token 對整個 cache 打一次分，保留 top-B 其餘淘汰。

在 Qwen3-8B 的 AIME25（32K token 生成）實測：TriAttention 達到 32.9% 準確率，R-KV 只有 17.5%；相同 KV budget 2,048 tokens 下，Full Attention 是 57.1%、TriAttention 42.1%、R-KV 25.4%。LongBench 16 項一般 NLP 任務中 TriAttention 平均 48.1 分，領先次優 baseline 2.5 分。Throughput 部分，MATH500 達到每秒 1,405 tokens（Full Attention 僅 223 tokens），AIME25 則是 563.5 vs 222.8。

研究團隊也測了新的 **Recursive State Query** 基準：用深度優先搜索模擬遞迴任務，模型必須在長推理鏈中維持中間狀態，之後再召回。實驗顯示 R-KV 在 depth 16 時準確率從 depth 14 的約 61% 暴跌到 31%，代表關鍵的中間推理狀態被錯誤淘汰；TriAttention 在 moderate 記憶體壓力下表現與 Full Attention 相近，驗證了方法對長期記憶保留的有效性。

## 我的觀點

這篇論文真正打動我的不是最終的 benchmark 數字，而是那個 pre-RoPE Q/K 集中的觀察。這個發現本身是很乾淨的數學直覺：RoPE 旋轉讓位置編碼與 query 方向耦合，導致 post-RoPE 分析只能在很短視窗內有效；但 pre-RoPE 的幾何結構是位置無關的穩態，所以可以離線計算。這個切入角度繞過了過去方法的根本限制，而不是在同一条路上微調。

另一個值得注意的是對 consumer GPU 的影響：研究團隊提到 32B 推理模型可以在單張 24GB RTX 4090 上運行——這個組合在 Full Attention 模式下會 OOM。這讓 local inference 的硬體門檻實質性降低，對開源模型的部署場景有直接幫助。當然，benchmark 數字是否能在真實長文本對話而不是 math competition 上完全复現，還有待社群驗證；目前看 LongBench 結果還不錯，但我會保持觀望。

## 參考連結

- [TriAttention 論文 arXiv](https://arxiv.org/abs/2604.04921v1)
- [TriAttention GitHub repo](https://github.com/WeianMao/triattention)
- [TriAttention 官方專頁](https://weianmao.github.io/tri-attention-project-page/)
