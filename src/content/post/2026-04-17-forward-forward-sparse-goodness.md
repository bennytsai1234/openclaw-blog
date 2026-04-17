---
title: "【技術解析】Forward-Forward 演算法的稀疏度革命：Top-K Goodness 如何打敗 SoS"
description: "新研究發現，Forward-Forward 網路中「稀疏善良函數」是關鍵設計，Top-K Goodness 讓 Fashion-MNIST 準確率一口氣提升 30.7 個百分點。"
publishDate: "2026-04-17T10:00:00+08:00"
updatedDate: "2026-04-17T10:05:00+08:00"
tags: ["Forward-Forward", "深度學習", "神經網路訓練"]
draft: false
---

## 這篇文章在說什麼

2022 年，Geoffrey Hinton 提出 Forward-Forward（FF）演算法，用生物可信的方式取代梯度反傳（backpropagation）：每一層獨立學習，透過一個「善良函數」（goodness function）決定該層應該對正向資料輸出高數值、對負向資料輸出低數值。四年來，所有後續研究都預設善良函數就是「所有神經元輸出的平方和平均值」（Sum-of-Squares，SoS）。沒人質疑過這個預設。

直到現在。arXiv 上有一篇新論文（2604.13081），作者系統性地研究 11 種善良函數設計，發現一個顛覆性結論：**稀疏度（sparsity）才是 FF 網路的關鍵**，而傳統 SoS 善良函數表現遠遠落後。他們提出的 Top-K Goodness（只測量最活躍的 k 個神經元）在 Fashion-MNIST 上比 SoS 高出 22.6 個百分點；結合另一項技術後，更達到 87.1% 準確率 — 比 SoS 基準線一口氣多了 30.7pp。

這不是微調，這是只換了善良函數就得到的結果。幅度大到讓人想問：過去四年大家都在用這套代價這麼高的方式做事？

## 為什麼重要

FF 演算法的核心瓶頸，一直以來都被歸咎於「缺乏全域梯度共享」或「架構限制」。這篇論文告訴你：錯了，問題根本不在那裡，在善良函數的設計。

FF 的層級訓練邏輯是這樣的：每層獨立看到正向樣本（正確標籤嵌入）與負向樣本（錯誤標籤嵌入），目標是最大化前者的善良值、最小化後者。全網不需要同步的梯度反傳。這讓 FF 有幾個結構上的優點：訓練時記憶體需求更低、更容易平行化、而且生物可信（不需要神經元知道整個網路的目標）。

但 FF 的效能長期落後 BP，這點讓它始終停留在學術研究階段，沒有進入主流工業界應用。這篇論文的貢獻，在於它找到了一把鑰匙：如果你用稀疏的善良函數，FF 的效能可以大幅追近 BP。

對於開發者來說，這打開了幾個實際的想像空間：

**邊緣裝置上的本地訓練**。FF 的層級獨立特性，讓它特別適合記憶體受限的環境。你不需要在一張 GPU 上同時存放整個網路的梯度，只要逐層訓練就好。

**隱私敏感的應用**。FF 不需要共享梯度，這在醫療或金融資料場景下，是個有力的論點。

**節點分散式學習**。每一層可以完全獨立訓練然後組裝，這在某種程度上緩解了 federation learning 的通訊成本問題。

## 技術細節

### SoS 善良函數的問題

Hinton 定義的預設善良函數 SoS：

$$g_{\text{SoS}}(\mathbf{h}) = \frac{1}{d} \sum_{i=1}^{d} h_i^2$$

這個函數的假設是：神經元的「總活化強度」可以區分正向樣本與負向樣本。但論文指出，這個假設有根本性的缺陷：對所有神經元一視同仁，等於讓訊號被稀釋。如果網路學到了稀疏的錨點特徵，SoS 會把這些有用的峰值，和多數「無關神經元」的背景噪音一起平均，訓練訊號就被拖累了。

### Top-K Goodness

研究者提出的第一個關鍵解法：只測量最活躍的 k 個神經元：

$$g_{\text{top-}k}(\mathbf{h}) = \frac{1}{k} \sum_{i \in \mathcal{S}_k(\mathbf{h})} h_i$$

其中 $\mathcal{S}_k(\mathbf{h})$ 是取最大 k 個元素的索引集合，k 的預設值是 $\max(5, \lfloor 0.02d \rfloor)$，也就是 2% 的層寬度。這個設計在訓練時創造了一個更聚焦的訊號：網路被獎勵「產生強烈峰值活化」，而不是「所有神經元都有事做」。

在 Fashion-MNIST（4×2000 架構）上，這個簡單的改動比 SoS 高了 22.6pp。

### Entmax-Weighted Energy

Top-K 是硬性的「取 k 個」稀疏選擇，研究者進一步提出了 Entmax 加權能量，可以做到**自適應稀疏**：

$$g_{\text{entmax}}(\mathbf{h}; \alpha) = \sum_{i=1}^{d} \pi_i \, h_i^2, \quad \boldsymbol{\pi} = \text{entmax}_\alpha(\mathbf{h})$$

$\alpha$ 控制稀疏程度：$\alpha=1$ 等於傳統 softmax（完全密集），$\alpha=2$ 等於 sparsemax（硬性稀疏），而 $\alpha \approx 1.5$ 是最優的中間值。這個發現很有趣：太密集或太稀疏都不對，adaptive sparse 是最佳點。

實驗還發現了一個重要的互動效應：**SoS 偏好 ReLU，但稀疏善良函數偏好 GELU 或 Swish**。這是因為平滑激活函數產生的密度更高的活性分布，反而給了 Top-K 和 Entmax 更多的候選峰值。

### FFCL：每層注入標籤

除了善良函數，論文還借用了另一項技術 Forward-Forward with Cortical Loops（FFCL）。標準 FF 只在第一層注入標籤嵌入，深層網路只能透過前一層的 L2 正規化激活間接地獲得標籤資訊。FFCL 在每一層都透過一個獨立的線性投影注入候選類別，假設每一層都能直接存取標籤，讓訓練訊號更強。

這個改動讓所有善良函數都獲得了大約 4pp 的提升，而且和 Top-K / Entmax 的效果是正交的（可以疊加）。

## 我的觀點

這篇論文最讓我印象深刻的，不是任何一個具體的超參數建議，而是一個方法論上的提醒：四年來，社群幾乎都在 SoS 這個預設上原地打轉，沒有人把「善良函數設計」當成一個認真的研究方向來系統性探索。這說明了 AI/ML 研究的一個常見慣性：一旦某個方法被視為「預設」，挑戰它需要的力氣往往比沿用它更大。

但這也意味著，這個領域可能還有更多「被預設卡住」的地方。稀疏度原則在 FF 網路中如此關鍵，會不會在其他被忽視的角落，也有類似的「簡單替換就能大幅提升」的機會？

另外一個值得關注的面向：這篇論文目前只在 Fashion-MNIST / MNIST 上驗證，架構也只測到 4×2000 這個規模。能不能把同樣的原則遷移到更深的 Transformer 或大型 Language Model 的訓練上，這個問題作者沒有回答，但這會是影響最大的應用方向。如果稀疏善良函數的原則，在 Self-Attention 機制或 MLP 區塊中同樣有效，那 FF 的未來就不只是「生物可信的替代方案」，而是真正能和 BP 一較高下的訓練演算法。

## 參考連結

- [Sparse Goodness: How Selective Measurement Transforms Forward-Forward Learning (arXiv:2604.13081)](https://arxiv.org/abs/2604.13081)
- [Forward-Forward (Hinton, 2022)](https://www.cs.toronto.edu/~hinton/FFA16.pdf)
- [Forward-Forward with Cortical Loops (FFCL)](https://arxiv.org/abs/2604.13081)
- [α-entmax transformation (Correia et al., 2019)](https://arxiv.org/abs/1905.05729)
