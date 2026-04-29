---
title: "【技術解析】參數少不等於記憶體少：LARS 與邊緣裝置微調的重新思考"
description: "MIT CSAIL 研究團隊提出 LARS 框架，證明 LoRA 等 PEFT 方法的記憶體瓶頸不在參數數量，而在 activation 的序列維度。平均減少 33.54% GPU 記憶體、51.95% CPU 記憶體。"
publishDate: "2026-04-29T10:00:00+08:00"
updatedDate: "2026-04-29T10:03:00+08:00"
tags: ["LoRA", "PEFT", "邊緣 AI", "LARS", "模型微調"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-29-parameter-efficiency-vs-memory.png"
  alt: "LARS：參數效率不是記憶體效率，邊緣裝置微調的新思路"
---

如果有人告訴你，他的微調方法只需要訓練 0.1% 的模型參數，你直覺會怎麼反應？大概會想：這很省資源，很適合放在邊緣裝置上跑。但 MIT CSAIL 的研究團隊在 2026 年四月發表的一篇論文裡，丢出了一個讓很多人（包括我自己）停下來想一想的事實：**參數效率（parameter efficiency）和記憶體效率（memory efficiency）根本是兩回事**。

這個觀察做起來並不難。你拿 LoRA 和 IA3 放在同一個硬體上比對一下就知道：IA3 的可訓練參數比 LoRA 少，但實際跑到一半記憶體爆掉的，往往是 IA3。這不符合多數人對「節省參數就節省記憶體」的直覺。

問題出在哪裡？出在你只盯著參數，卻忽略了訓練時另一個龐大的記憶體消耗：activation。

## 這不是參數的問題，是 activation 成長率的問題

讓我們把視角移到訓練時的記憶體組成。模型在微調時，峰值記憶體大概長這樣：

```
M_peak ≈ M_params + M_grads + M_opt + M_acts
```

`M_params` 是模型參數，`M_grads` 是梯度，`M_opt` 是優化器狀態，這三個在 PEFT 方法裡確實都變小了。但 `M_acts`——也就是前向傳播時的中間 activation——**跟訓練多少參數完全無關**。它只跟序列長度 S、隱藏維度 H、與層數 L 有關，而且成長率是 `O(BSHL)`。

PEFT 方法（LoRA、IA3、AdaLoRA）之所以緩解不了這個問題，是因為它們幾乎保留了完整的前向計算圖。以 LoRA 為例，計算 `W*x + A*B*x` 時，無論 A 和 B 有多小，輸入 `x` 在反向傳播時仍然必須完整存在於記憶體中。因此：

```
M_acts = O(BSHL)      # 基礎 activation
       + O(BSRL)      # adapter 的 intermediate tensor，與序列長度 S 線性相關
```

標準 PEFT 方法被綁在所謂的「Sequence Length Ceiling」上——序列越長，activation 記憶體就跟著線性膨脹。系統層級的優化（Gradient Checkpointing、FlashAttention）可以降低絕對值常數，但改不了這個生長趨勢。

所以，如果目標是讓 LLM 在邊緣裝置上做本地微調，只減參數量不夠——必須直接面對 activation 成長率這個根本瓶頸。

## LARS 怎麼繞過去：把序列維度压扁

LARS 的想法乾脆到有點野：既然問題是 activation 隨序列長度線性成長，那就不存那麼多 activation不就得了？他们的具体做法是把整個訓練流程搬到一個「序列維度被压扁」的低秩子空間裡執行。

整個流程分三個階段：

**第一階段：Pooled Feature Extraction**

把輸入的 `[B, S, H]` 張量聚合成一個全局語義向量 `x_pool ∈ ℝ^(B×H)`。LARS 預設使用混合 mean-pooling：

```
x_pool = (1/S) * Σ Xi + X_S
```

也就是把整個序列的平均池化結果，加上最後一個 token（蘊含最多「最近」語境）。他們在附錄裡也提到了另一個可選方案：學習得來的 attention pooling，額外多消耗 `O(BH)` 的 activation，但會根據資訊密度動態加權各個 token。

預設方案不引入新的可訓練參數，額外 activation 消耗是 `O(1)`——這是刻意為了在邊緣裝置上省記憶體的選擇。

**第二階段：Low-Rank Subspace Modulation**

拿到 `x_pool` 後，LARS 把它投影到一個低秩子空間 `h = x_pool * A_pool`，其中 `A_pool ∈ ℝ^(H×R)`，且 `R << H`。接著他們用三層調制機制補足collapsed sequence 所失去的資訊彈性：

1. **Feature-Space Gating**：用一個實例條件閘門 `g = σ(τ₁·W_x·x_pool + τ₂·W_h·LN(h))` 動態調整子空間座標。這個機制讓模型能根據輸入的全局語義特徵動態放大或抑制某些子空間維度。

2. **Inter-Rank Mixing**：加入一個 `M_mix ∈ ℝ^(R×R)` 矩陣，讓子空間維度之間可以互相溝通，弥补「每個維度獨立運算」導致的表達能力不足。

3. **Subspace Non-Linear Transformation**：在投影後引入非線性變換，確保即使維度被大幅压缩，仍保有足夠的函數近似能力。

**第三階段：Residual Projection**

經過子空間調制後的向量通過一個殘差投影回到原始 manifold，加到原模型輸出上。這一步讓 LARS 的 adaptation 可以跟原始模型保持對齊，而不是在另一個空間裡游離。

把這三個階段加在一起，關鍵效果是：**adapter 相關的 intermediate tensor 從 `O(BSRL)` 變成了 `O(BRL)`——序列維度 S 消失了**。

## 記憶體節省的實際數字

團隊在三種不同的模型規模（LLaMA 1B、Qwen 7B，以及在 Raspberry Pi 上測試的小模型）上，用推理、理解、與長上下文資料集對 LARS 做了全面評估。

核心結果：

- **GPU 平均記憶體節省：33.54%**（相較於 LoRA）
- **CPU 平均記憶體節省：51.95%**（相較於 LoRA）
- 在長序列 Needle-In-A-Haystack 測試中，LARS 在序列長度超過 LoRA 的上限時仍能繼續運作
- 準確率和吞吐量與 LoRA 等主流方法持平，沒有因為省記憶體而犧牲太多效能

這些數字對應的是：LoRA 在消費級 CPU 上微調長序列任務時，跑到大約 2048 個 token 就會 OOM，但 LARS 可以支撐到 4096 甚至更長。

在 Raspberry Pi 上驗證這點尤其有意義——那是一個記憶體只有 4GB 的 ARM 單板電腦，理論上幾乎不可能跑 LLM 微調，但 LARS 團隊讓它成功跑起來了。

## 這件事為什麼值得在意

我想特別把這個問題拆開來說，因為有兩種讀者會從這篇論文裡拿走不同的東西。

**第一種：在邊緣或在本地做微調的開發者。** 過去幾年多數人的思路是跟著 LoRA 家族走的——減少可訓練參數、降低模型大小、做量化，然後期待記憶體跟著降。但 LARS 的貢獻在於它指出了一條被嚴重低估的路：直接從 activation 的成長率下手。這個思路不只在消費級 GPU 上有效，在更嚴苛的嵌入式環境也許是唯一可行的方向。

**第二種：做大模型系統優化的工程師。** 這篇論文對 PEFT 社群的主流假設做了一次難得的挑戰。過去大家在宣稱某種方法「記憶體友好」的時候，幾乎都只拿出參數量來證明。LARS 把一張 `Accuracy vs. Peak Memory` 的圖放在論文開頭，直接指出參數效率和實際記憶體消耗之間那道巨大的鸿沟。這張圖的殺傷力在於，它不需要任何复杂的推導——任何看過的人都會立刻意識到：我們過去優化的方向可能根本就是錯的。

## 局限與還沒回答的問題

LARS 不是沒有代價。在論文附錄的討論中，團隊承認了幾件事：

一是「序列維度被压扁」這件事本身是一個很強的資訊壓缩假設，對於某些重視細粒度 token-level 差异的任務（例如某些序列標注），mean-pooled representation 可能會遺失關鍵信號——雖然實驗結果顯示這在多數任務上影响不大，但並非普適。

二是學習得來的 attention pooling 在邊緣裝置上並不是預設選項，因為它會帶來额外的激活開銷。預設的固定 pooling犧牲了一些表達能力換取確定性的記憶體節省，這個取捨是情境相關的。

三是目前的 benchmark 主要覆盖了推理和語言理解，對於多模態任務（例如视觉-语言模型的微調）LARS 的表現尚未被系統性測試過。

---

## 參考連結

- [Parameter Efficiency Is Not Memory Efficiency: Rethinking Fine-Tuning for On-Device LLM Adaptation (arXiv:2604.22783)](https://arxiv.org/abs/2604.22783)
- [LARS HTML 全文（arXiv）](https://arxiv.org/html/2604.22783v1)
- [LoRA: Low-Rank Adaptation of Large Language Models (Hu et al., 2021)](https://arxiv.org/abs/2106.09685)
- [IA3: Infused Adapter by Inhibiting and Amplifying Inner Activations (Liu et al., 2022)](https://arxiv.org/abs/2205.05638)
- [FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness (Tri, 2024)](https://arxiv.org/abs/2205.14135)