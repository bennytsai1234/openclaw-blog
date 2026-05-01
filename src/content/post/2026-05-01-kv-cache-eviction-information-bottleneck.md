---
title: "【技術解析】LLM 推論的隱形瓶頸：KV Cache 驅逐策略的資訊論重構"
description: "一篇重新奠基於資訊瓶頸原則的 KV Cache 驅逐論文，讓我們看見那些經驗性啟發式方法背後其實共享同一個最優化目標。"
publishDate: "2026-05-01T10:00:00+08:00"
updatedDate: "2026-05-01T10:00:00+08:00"
tags: ["LLM", "KV Cache", "Information Bottleneck", "Transformer", "ArXiv"]
draft: false
---

當你在部署一個長上下文的 LLM 應用，無論是幾萬字的合約分析，還是幾十輪的對話系統，有一個問題幾乎遲早會碰到：GPU VRAM 被 KV Cache 吃光。那個 cache 隨著序列長度線性成長，變成推論時最大的記憶體瓶頸。現有解法很多，無論是 SnapKV、KeyDiff 還是 Knorm，說穿了都是在問同一個問題：哪些 token 該留、哪些可以丟？

但這類方法有個尷尬的地方——它們都是靠經驗性啟發式規則在運作。誰說 recency（保留最近的 token）就一定好？誰說看 attention score 就是正確指標？這些方法各自有效，卻沒有人能告訴你「為什麼」，以及「它們彼此之間有什麼關聯」。

這篇 arXiv 論文（2604.25975）想做一件事：把整個 KV Cache 驅逐問題從資訊理論層面重新奠基，證明那些看似不同的啟發式方法，其實都是同一個目標函式的不同近似。

## 問題不是「該丟誰」，而是「該留什麼」才能傳遞最多資訊

Transformer 的自注意力機制，在推論時每次解碼 step 都需要重新attend 到之前所有產出的 token。KV Cache 把這些 key-value 對預先存好，省去重計算，但代價是記憶體。當 cache 大到塞不下時，你必須做選擇。

傳統的做法是設計一個「重要性分數」：attension score 高的留下、ℓ2-norm 大的留下、差異性大的留下。但這些分數都是間接代理，不是直接對「這個 cache 子集對未來預測有多少幫助」建模。

作者從資訊瓶頸（Information Bottleneck）原則得到靈感：與其問「誰不重要」，不如問「留下哪些 KV pair 能讓我對未來 query 的預測資訊量最大化」。

具體來說，他們把每個快取中的 key-value 對建模成一個線性通訊通道。未來 query 是隨機變數，經過 attention 機制映射到輸出，cache 的任務是讓這個映射過程中保留的 mutual information 最大。這就是論文的核心目標函式：

$$\mathcal{L}_C = I(q; Y \mid Z_C)$$

其中 $q$ 是未來 query，$Z_C$ 是保留下來的 KV 子集，$Y$ 是對應的 attention output。這個 conditional mutual information 就是在問：given 這個 cache 子集，我對未來 query 的不確定性減少了多少？

## Linear-Gaussian surrogate：讓複雜的非線性 attention 變得可以分析

問題來了：Transformer 的 attention 實際上是一個複雜的非線性運算，直接優化上面那個 mutual information 目標是 intractable 的。作者的切入方式是引入一個 linear-Gaussian surrogate——不是要精確模型 attention，而是要一個足夠 tractable 的近似，來做嚴格的數學分析。

在這個近似下，attention 輸出變成：

$$Y = U_C K_C q + \varepsilon$$

其中 $K_C$ 堆疊了保留下來的 keys，$U_C$ 是對應的 value directions（經過 output projection 後），$q \sim \mathcal{N}(\mu_Q, \Lambda_Q)$ 是服從高斯分布的未來 query，$\varepsilon$ 是噪音項。

在這個設定下，mutual information $I(q; Y \mid Z_C)$ 有封閉解——它正比於 retained keys 構成的資訊通道的 log-determinant：

$$I(q; Y \mid Z_C) \propto \log \det(I + \Lambda_Q^{1/2} K_C^\top \Sigma^{-1} K_C \Lambda_Q^{1/2})$$

這個式子告訴我們，保留的 KV entries 構成的矩陣的特徵值分布，直接決定了你能傳遞多少資訊。特徵值越分散、越大，通道容量越高。

## 為什麼既有方法都在 approximations

這裡是論文最有趣的部分：當你對上述目標函式做不同的數學近似，居然能導出各種現有驅逐策略。

**Attention score heuristic**：如果你忽略 query 分布的協方差，假设 query isotropic，就會得到一個跟 attention score 直接相關的容量近似。也就是說，SnapKV、EA（Expected Attention）這類方法，實際上是在用不同的方式逼近同一個容量函式，只是繞道了 attention patterns 這個中介變數。

**Key-norm heuristic**：如果做一階近似，你會得到ℓ2-norm 作為容量代理——這正是 Knorm 的核心思路。

**Diversity-based methods**：二階效應則對應到 key-space 的幾何多樣性。KeyDiff 等方法試圖確保 retained KV entries 在向量空間裡均勻分布，其實是在間接最大化通道容量。

換句話說，這些方法不是「碰巧有效」，它們全都是對同一個最優化原則的不同程度近似。它們有效不是偶然，但也不代表它們抵達了最優解。

## CapKV：直接最優化資訊容量的新方法

基於上述理論框架，作者提出了 CapKV（Capacity-aware KV Cache Eviction）。核心想法很直接：不要繞道 attention score 或 key-norm 這些間接指標，直接用 statistical leverage scores 對容量函式做 greedy 近似。

具體做法是：從 capacity matrix 計算每個 KV entry 的 leverage score（源於矩陣探測理論），然後貪心地選取 score 最高的 entries。Leverage score 衡量的是「這個向量對矩陣列空間的貢獻程度」——貢獻大的留下，貢獻已被現有子集線性表達的丟掉。

這個做法的好處：

1. **理論擔保**：每一步 greedy 選取都直接對目標函式做優化，不像其他方法是對間接代理最佳化。
2. **計算可行**：Leverage score 可以預先計算好（基於 initial cache），不需要在每次解碼 step 重新算。
3. **確定性**：不會像 RL-based 方法（如 Apple 的 KVP）需要訓練，收斂結果也穩定。

實驗部分涵蓋多個模型（LLaMA、Qwen 系列）和長上下文 benchmark（RULER、LongBench）。結果顯示 CapKV 在相同 memory budget 下 consistently 取得更好的生成品質——在某些配置下甚至比最强的 baseline（H2O）好上 10-15% 的困惑度優勢。

## 代價與被高估的地方

不過也要說清楚這篇論文的限制。

首先，linear-Gaussian surrogate 是個強假設，真實 Transformer 的 attention 有 softmax 非線性，也有 cross-head 交互。論文自己承認這只是「tractable abstraction」，不是faithful model。用這個 surrogate 推導出來的 eviction policy 在真實大模型上真的最優嗎？實驗結果支援這個假設，但機制上並沒有嚴格證明。

其次，CapKV 的核心步驟需要計算整個 cache 上所有 keys 的 statistical leverage scores。這在 cache 已經很大的時候仍然有開銷，論文有討論 runtime efficiency，但實際 deployment 場景（百萬tokens級別）的scalability 還需要更多驗證。

第三個被低估的地方是：這篇論文提供的不只是一個新方法，更是一個統一框架。往後設計新的 KV cache 驅逐策略時，可以直接拿「這個方法對應到容量函式的哪個近似」來判斷它的理論上限，而不是只能做實驗對比。這個框架價值可能比 CapKV 本身更大。

## 這個階段對工程師來說意味著什麼

如果你正在做 LLM 推論優化、特别是投產長上下文應用，這篇論文提供了兩個實用視角：

第一，面對市面上各種 KV cache 压缩方案時，可以用「它們各自是容量最大化目標的哪種近似」來評估，而不是只看 benchmark 分數背後的數字。知道原理才能選對工具。

第二，CapKV 的框架意味著未来会有更多基於資訊理論的 eviction policies 出現，它們不會只依賴 attention score 或 recency，而是直接對「保留的資訊量」建模。如果你關注這個方向，值得持續追蹤。

---

## 參考連結

- [Rethinking KV Cache Eviction via a Unified Information-Theoretic Objective (arXiv:2604.25975)](https://arxiv.org/abs/2604.25975)
- [CapKV HTML 版本](https://arxiv.org/html/2604.25975v1)
- [Apple ML Research: Learning to Evict from Key-Value Cache (KVP)](https://machinelearning.apple.com/research/evict)
- [Awesome-LLM-Long-Context-Modeling (GitHub)](https://github.com/Xnhyacinth/Awesome-LLM-Long-Context-Modeling)
