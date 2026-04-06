---
title: "【技術解析】模型靠自己變強：Simple Self-Distillation 讓 LLM 寫程式能力飛躍 30%"
description: "Apple 研究團隊發現，只要讓模型用自己的輸出當教材，不需要老師、不需要驗證器，就能讓程式碼生成能力大幅提升。背後的關鍵是解碼階段的「精確-探索」兩難。"
publishDate: "2026-04-06"
updatedDate: "2026-04-06"
tags: ["AI", "LLM", "程式碼生成", "Self-Distillation", "Post-training"]
draft: false
---

## 這篇文章在說什麼

Apple 研究團隊在 2026 年 4 月發表了一篇名為《Embarrassingly Simple Self-Distillation Improves Code Generation》的論文，回答了一個很根本的問題：**一個 LLM 能不能只靠自己的輸出來變強，而不依賴任何外部的信號？**

答案是不只能，而且效果驚人。他們的方法稱為 **Simple Self-Distillation（SSD）**：從 base model 用特定溫度取樣生成一批未經驗證的程式碼解法，然後用標準的監督式微調（SFT）讓模型學自己的輸出。就這樣，沒有 RL、沒有驗證器、沒有老師模型、沒有測試資料。

Qwen3-30B-Instruct 在 LiveCodeBench v6 上從 42.4% 的 pass@1 一口氣拉到 55.3%，幅度約 +30%。更誇張的是 hard 問題：pass@5 從 31.1% 暴增到 54.1%。

## 為什麼重要

現在提升模型程式碼能力的的主流方法有幾條路：

| 方法 | 限制 |
|------|------|
| 人類撰寫解答 | 成本極高，難以規模化 |
| 更強的老師模型蒸餾 | 能力天花板受限於老師，而且需要 API 費用 |
| RL + 可驗證 reward | 操作複雜、訓練不穩定，容易 reward hack |
| Majority voting / Entropy minimization | 長時間訓練會 collapse |

SSD 的厲害之處在於**它把這些限制全部繞過了**。你只需要：
1. 一批程式題目 prompt
2. 模型自己
3. 標準的 SFT

不需要執行環境、不需要答案對照、不需要 RL。這讓任何有足夠算力的人都能把自己的模型往上推一階。

## 技術細節

### SSD 三步驟

**Step 1 — 取樣（無驗證）**

從 base model 用設定好的溫度 $T_{train}$ 和截斷配置 $\rho_{train}$ 取樣 $N$ 個解答。論文中 $N=1$ 就足夠了，且**完全不做正確性過濾**——即使生出錯的程式碼也照樣拿來訓練。

$$y \sim \text{Decode}_{T_{train}, \rho_{train}}[p_\theta(\cdot|x)]$$

**Step 2 — 微調**

用標準交叉熵 loss 在這批「自己生成的未驗證解答」上做 SFT：

$$\mathcal{L}(\theta) = -\mathbb{E}_{(x,y)\sim\mathcal{D}_{SSD}} \sum_{t=1}^{|y|} \log p_\theta(y_t|x, y_{<t})$$

**Step 3 — 推論**

部署時用 $T_{eval}$ 和 $\rho_{eval}$ 解碼：

$$\hat{y} \sim \text{Decode}_{T_{eval}, \rho_{eval}}[p_{\theta^*}(\cdot|x)]$$

### 溫度是關鍵：$T_{eff} = T_{train} \cdot T_{eval}$

實驗發現這兩個溫度是相乘的關係。$T_{eff} \approx 1.2$ 是最佳甜蜜點，而截斷（truncation）則負責在這個 band 之上再墊高天花板。最佳配置落在 $T_{train}=2.0$、$T_{eval}=1.1$、top-k=10。

### 為什麼有效：精確-探索衝突

這是論文最有洞察力的部分。研究團隊提出 LLM 在生成程式碼時會遇到兩種截然不同的 token 位置：

- **Lock（鎖點）**：語法語意高度確定，分布尖銳，但低機率尾巴（distractor tail）仍然存在
- **Fork（分支點）**：演算法層面的分歧，多種 continuation 都合理，分布比較平坦

**問題來了**：單一溫度 $T$ 對這兩種位置的要求是矛盾的。

- **降低 $T$**：Lock 的 distractor 被壓下去了，但 Fork 的探索空間也跟著縮減
- **升高 $T$**：Fork 恢復多樣性，但 Lock 的 distractor tail 又重新獲得機會

最佳全局設定必然是妥協。

SSD 的作用是**改變模型本身**而非只是解碼參數。訓練時讓 Lock 的 distractor tail 被壓縮得更乾淨，而 Fork 的頂層保持多個可行選項且分布更平坦。這相當於把 Lock 變成「尖峰」，把 Fork 變成「高原」。訓練改變分布讓 Lock 更安全，解碼時就可以用更高的溫度來釋放 Fork 的探索潛力——兩者互補而非替代。

實驗也證明了解碼調參無法複製 SSD 的效果：對 base model 掃描最佳溫度，pass@1 差距仍達 +11.8pp（Qwen3-30B-Instruct），hard 問題上差距更擴大到 +13.3pp。

## 實驗結果摘要

| 模型 | 基準 pass@1 | +SSD pass@1 | 變化 |
|------|-------------|--------------|------|
| Qwen3-30B-Instruct | 42.4% | 55.3% | **+12.9pp** |
| Qwen3-4B-Instruct | 30.7% | 38.2% | +7.5pp |
| Llama-3.1-8B-Instruct | 27.8% | 31.3% | +3.5pp |
| Qwen3-4B-Thinking | 33.5% | 36.8% | +3.3pp |
| Qwen3-30B-Thinking | 43.2% | 45.3% | +2.1pp |

值得注意的是：**pass@5 的進步幾乎都高於 pass@1**，代表 SSD 不是只把最佳輸出變得更確定了，而是**同時提升了整體多樣性**，讓同樣的 prompt 能產生更多好的分支。

## 我的觀點

這篇論文讓我想到的是：現在大家在吹 RL 和 Verify-on-Excecution，但這篇文章告訴你**不需要那些也能做到大幅進步**。代價當然是：需要算力做 SFT（論文用 8×B200 GPU），而微調的資料仍然是從模型自己來的，所以模型的能力上限不會超出自已原有的邊界。

真正的亮點我認為是**「精確-探索衝突」這個框架**。過去大家都在調溫度、調 top-p，隱隱約約感覺到有個 tradeoff，但沒有人把這個 conflicts 明確的寫成一個 hypothesis 並用實驗證明。這個視角我認為是這篇文章最值得帶走的思想。

未來的方向可能是：結合 SSD 和 execution-based RL——先用 SSD 把模型的分布改好，再用驗證信號在更高的起點上做探索。或許下一代程式碼模型的訓練流程會變成：預訓練 → SFT → **SSD** → RL。這一步「自己教自己」可能會變成標準流程。

---

## 參考連結

- [Embarrassingly Simple Self-Distillation Improves Code Generation (arXiv:2604.01193)](https://arxiv.org/abs/2604.01193)
- [LiveCodeBench](https://livecodebench.github.io/)
- [rSTARcoder Dataset](https://github.com/mbzuai-oryx/rSTARcoder)
