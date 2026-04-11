---
title: "【技術解析】SELFDOUBT：從推理蹤跡讀出不確定性——O(1) 成本戰勝昂貴的 Semantic Entropy"
description: "一篇論文從推理模型的思考蹤跡中提取「對冲-驗證比率」（HVR），在零額外成本下做到 96.1% 正確率的高精度閾門，並以 O(1) 單次推理代價在 AUROC 上顯著打敗需要 10 倍計算量的 Semantic Entropy。"
publishDate: "2026-04-11"
updatedDate: "2026-04-11"
tags: ["AI", "LLM", "不確定性量化", "推理模型", "_reasoning models", "NLP"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-11-selfdoubt-uncertainty-reasoning-llm.png"
  alt: "SELFDOUBT 封面圖"
---

## 這篇文章在說什麼

當一個推理語言模型（reasoning LLM）回答一個複雜問題時，我們幾乎沒有可靠的辦法知道它什麼時候在「真的確定了」而什麼時候在「胡說八道」——尤其是當你使用的是不暴露內部 logit 的商業 API 時。

現有的方案都有明顯的代價：sampling-based 方法（如 Semantic Entropy）需要跑十幾次推理，成本高到不實際；單次推理的替代方案（verbalized confidence、trace length）在不同模型間表現飄忽；probe-based 方法需要 access to hidden states；logprob 方法在商業 API 上根本無法使用。

這篇由 Satwik Pandey 等人發表的論文提出 **SELFDOUBT**，核心洞察是：**推理蹟跡本身就是一個不確定性的信號**，不需要多次采樣，不需要模型內部，只需要對蹟跡中的自然語言標記做正則表達式匹配。

## 為什麼重要

### 核心信號：Hedge-to-Verify Ratio（HVR）

推理模型在思考過程中，會自然地摻入兩類語言標記：
- **Hedge markers（對冲標記）**：「或許吧」「也許」「我不確定」「可能」
- **Verify markers（驗證標記）**：「讓我驗證一下」「代入檢查」「再確認一遍」

HVR 的定義很簡單：

$$HVR(T) = \frac{h(T)}{v(T) + 1}$$

其中 $h(T)$ 是蹟跡中 hedge marker 的總次數，$v(T)$ 是 verify marker 的總次數。+1 避免除以零。如果一個蹟跡充滿了「或許」「可能」但幾乎沒有驗證行為，HVR 就高；如果模型在驗證、代入、檢查，HVR 就低。

這是一個完全不需要訓練的信號——只需要一個 marker dictionary 做正則表達式匹配。

### HVR = 0：零成本的正確性閾門

論文最重要、最出人意料的發現是：**HVR = 0 的蹟跡（即零個對冲標記）在 21 個跨模型、跨數據集的實驗中，正確率達到 96.1%**，涵蓋率 25.4%。也就是說，有四分之一的查詢，模型產出的推理蹟跡中完全沒有「或許」「可能」這類詞，這些回答在 96% 的情況下是正確的——而檢測 HVR = 0 只需要正則表達式匹配，零額外計算代價。

經過 label-noise 校正後（HVR = 0 但答案仍然錯誤的案例中，有部分是因為答案 key 本身有誤），校正後精確率為 99.4%。

### SelfDoubt 分數：HVR + Verbalized Confidence 的 z-score 融合

對於 HVR > 0 的其餘 75% 查詢，論文用 z-score 融合 HVR 和 verbalized confidence：

$$s_{sd}(T) = z_r(-HVR(T)) + z_r(V)$$

其中 $V$ 是模型自己報告的 confidence percentage，$z_r$ 是對第 $r$ 個 run 的標準化函數。兩個 channel 被標準化之後才能相加，確保量綱一致。

融合後的 SelfDoubt 分數在 21 個 run 上的平均 AUROC 為 0.7895，平均 AURAC 為 0.8992——**是所有 O(1) 方法中唯一同時在兩個指標上都領先的**，而且與需要 10 倍推理代價的 Semantic Entropy 在 AURAC 上實質相當（SE 是 0.8988，SELFDOUBT 是 0.8992）。

統計顯著性：在 AUROC 上，SELFDOUBT 對 Semantic Entropy 的 Wilcoxon signed-rank test p = 0.001，顯著領先。

### Marker Dictionary 是如何構建的（數據驅動，無需人工）

這裡有一個聰明的設計：marker dictionary 不是人工定義的，而是從模型自身自動構建的。

**Stage 1（Seed Generation）**：用多個 LLM 生成候選 hedge/verify 單詞，每個模型跑 5 次，只保留在模型內部一致（多數決）且跨模型一致（多數模型都提名）的詞。然後用 BAAI/bge-m3 embeddings 做語意聚類，移除與核心語義偏離太遠的詞，經過 6 輪迭代收斂到一個連貫的集合。

**Stage 2（Per-Model Expansion）**：用目標模型自身的 90 條無標記推理蹟跡，從中提取 1-3 grams。對於每個候選 n-gram，用 embedding 計算它與 verify centroid 和 hedge centroid 的餘弦相似度差 $\Delta(g)$。如果 $\Delta(g) > \tau_{verify}$ 就進入 verify dictionary；$\Delta(g) < -\tau_{hedge}$ 就進入 hedge dictionary。

這個 pipeline 完全不需要正確性標籤，不需要人工策展，換一個模型只需要重新跑 Stage 2，90 條無標記蹟跡 + 幾分鐘計算。

## 實驗結果

### 部署 cascade：71% 覆蓋率，89.7% 準確率

論文提出一個兩層 cascade 部署策略：

- **Tier 1（HVR = 0 gate）**：HVR = 0 的直接接受（25.2% 覆蓋，96.3% 準確率）
- **Tier 2（calibrated z-sum）**：對 HVR > 0 的其余查詢，用校準後的 z-score 融合分數決定是否 defer

在 $\tau = 0$（自然對稱閾值）的均衡點上，cascade 達到 **71% 覆蓋率，89.7% 準確率**——比不做 deferral 的 baseline 高出 9.2 個百分點。

部署只需要：每個模型一個 marker dictionary（正則表達式） + 4 個校準純量（$\mu_{hvr}, \sigma_{hvr}, \mu_v, \sigma_v$），全部從同一組 90 條無標記蹟跡估計。

### 模型間的差異很有意思

| 模型 | HVR = 0 覆蓋率 | HVR = 0 準確率 |
|------|--------------|--------------|
| GPT OSS 120B | 25.7% | 96.6% |
| GPT OSS 20B | 30.2% | 96.1% |
| Qwen 3 14B | 9.7% | 96.1% |
| Claude Sonnet 4.6 | 53.3% | 98.1% |
| Grok 4.1 Fast | 50.9% | 94.8% |
| Gemini 2.5 Flash | 0.9% | 57.1%（樣本太少，不可靠）|

Gemini 是明顯的異常值：它的 thought summary 極度壓縮，幾乎不包含自然語言標記，所以 HVR 基本上是個常數。這個發現本身就很有價值——這意味著不同的推理模型架構壓縮思考蹟跡的方式不同，有些會保留語義標記，有些則不會，而 HVR 對壓縮方式是敏感的。

### 失敗模式

論文誠實地描述了 SELFDOUBT 在哪裡會失敗：

1. **Qwen3 4B**：當 verbalized confidence signal 很弱的時候，添加 Verb channel 反而稀釋了 HVR 的信號。這時候 HVR 單獨使用比分數融合更好。
2. **Gemini 2.5 Flash**：壓縮過度，n-gram 候選極度稀疏，HVR 幾乎無效。這是一個 tracerichness 閾值的問題——低於某個閾值，SELFDOUBT 無法可靠運作。

## 我的觀點

### 最值得重視的發現

這篇論文最讓人驚艷的不是 SelfDoubt 分數本身，而是 **HVR = 0 的發現**：模型在推理時「完全沒有表現出任何不確定性語言」，這件事本身就與答案正確性高度相關，而且在 6 個模型上都成立（除了 Gemini）。這個發現的實務價值是：對於某些模型，超過一半的查詢（Claude Sonnet 4.6 有 53.3%）可以直接用零成本的是/否閾門判斷答案是否可信，而不需要任何額外計算。

這是那種「為什麼之前沒有人想到」的洞察——之前大家都 focus 在怎麼從 logits 或 hidden states 讀出不確定性，卻忽略了模型自己已經在思考蹟跡中透露了這些信息，而且是用自然語言的形式。

### 需要保留懷疑的地方

1. **僅限 multiple-choice**：所有實驗都在 BBH、GPQA-Diamond、MMLU-Pro 這三個多選題數據集上。開放式生成任務（數學推導、代碼生成）上的 HVR 信號是否仍然有效，這是目前最大的未解答問題。
2. **風格敏感性**：如果 prompt 抑制了 hedge 語言的使用，或者模型被 fine-tuned 成了不提「可能」「也許」的風格，HVR 就會失效。這是一個與部署相關的真實風險。
3. **沒有區分認知類型的不確定性**：SelfDoubt 產生一個總體不確定性分數，無法區分「我根本不知道這個領域的知識」（epistemic）和「這個問題的隨機性很高」（aleatoric）。對於某些高風險應用場景，這種區分是有意義的。
4. **校正代價**：90 條無標記蹟跡看起來不多，但對於某些邊緣部署場景（edge device、極低資源）仍然是一個門檻。

### 實務建議

對工程師來說，這篇論文帶來了幾個可以直接應用的 insight：

- **對商業推理 API（Claude、Grok、OpenAI o1/o3）使用 HVR = 0 閾門**：只要對蹟跡做正則匹配，不需要任何 API 額外調用，就能識別出 25–50% 的高置信查詢（取決於模型），而且正確率 96%+
- **在內部部署的開源推理模型上完整使用 SelfDoubt cascade**：只需要 90 條領域相關的無標記蹟跡做校正，就能得到每模型 4 個校準參數，之後在部署時每個查詢只需正則匹配 + 簡單算術
- **區分 HVR 和 Verbalized Confidence 的適用場景**：如果你的模型在某些任務上 verbalized confidence 一直偏高（overconfidence），HVR 單獨使用會比融合分數更可靠

## 參考連結

- [SELFDOUBT: Uncertainty Quantification for Reasoning LLMs via the Hedge-to-Verify Ratio](https://arxiv.org/abs/2604.06389)
- [GitHub: satwik2711/SelfDoubt](https://github.com/satwik2711/SelfDoubt)
