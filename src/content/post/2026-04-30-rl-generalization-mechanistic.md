---
title: "【技術解析】為何 RL 能泛化而 SFT 只會背？LLM 後訓練的特徵層級 Mechanistic 分析"
description: "天津大學與 DFKI 團隊用 Sparse Crosscoder 追蹤後訓練期間內部特徵變化，發現 RL 泛化的真正原因是保留了 base model 的表示結構，而非新增大量 specialized features。"
publishDate: "2026-04-30T15:00:00+08:00"
updatedDate: "2026-04-30T15:03:00+08:00"
tags: ["天津大學", "RL", "SFT", "LLM", "interpretability"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-30-rl-generalization-mechanistic.png"
  alt: "LLM 後訓練中 RL 與 SFT 的特徵空間分化示意圖"
---

## 舊方法早就碰到牆，只是大家沒有明講

從 GPT-4 到 Claude 3.7 到 DeepSeek V4，近年的旗艦模型幾乎都有一個共同的後訓練流程：先做監督式微調（SFT），再接強化學習（RL）。但這兩個步驟各自在做什麼、為什麼有效，工程師社群的理解長久以來只停留在「RL 可以提升推理能力」的表面層次。

真正讓人困惑的問題是：為什麼同樣的訓練資料、同樣的 base model，SFT 經常導致模型遺忘原本的一般能力，RL 却能讓模型在沒見過的任務上表現更好？這個差異在實務上後果截然不同，但我們對它的理解，一直停在行為觀察的層次，沒有觸及內部機制。

來自天津大學 TJUNLP Lab 與德國 DFKI 的研究團隊，4 月底發表了一篇 ACL 2026 的論文，想把這個問題弄清楚。他們的核心做法是：用特徵層級的可解釋性工具，把 SFT 和 RL 訓練過程中模型內部到底發生了什麼，逐一拆開來看。

## 特徵空間對齊：用 Sparse Crosscoder 替不同模型找共同語言

要比較三個模型的內部錶征，第一個問題是：每個模型都有自己的activation空間，直接對比沒有任何意義。C Crosscoder 這種工具，就是拿來解決這個問題的——它可以把不同模型的activation，統投射到同一套稀疏的特徵空間裡，讓研究者可以直接比對哪個特徵在哪個模型裡比較強。

研究團隊用了兩種 crosscoder 設定。第一種是 two-model 版本，拿 base model 和調優過的模型（無論是 SFT 版還是 RL 版）做配對比較。第二種是 three-model 版本，把 base、SFT、RL 三個模型同時投射到同一個特徵空間。這麼做的原因是：two-model crosscoder 的特徵索引各自獨立，feature #2026 在 SFT-Base crosscoder 裡，和 RL-Base crosscoder 裡的 feature #2026 可能完全是兩回事，無法直接比對。三個模型一起投射，才能確保所有特徵都在同一套座標系裡。

除了 crosscoder，研究團隊還設計了一個叫 MAS（Model Attribution Score）的指標，專門用來衡量某個特徵對某個特定訓練方式的專屬程度。NRN（Normalized Relative Norm）值趨近 1 代表這個特徵幾乎只存在於調優過的模型裡，趨近 0 代表只存在於 base model，0.5 代表兩個模型都有。

## SFT 快速建立大量 specialized features，RL 却按兵不動

研究團隊追蹤了整個訓練過程中特徵的變化，得到了非常清晰的對比結果。

SFT 會在訓練早期快速引入大量高度專門化的特徵，而且這些特徵一旦形成，很快就穩定下來不再變化。也就是說，SFT 在極短的時間內就確定了它要用什麼內部線路來處理任務，之後只是在強化這些線路的強度。這解釋了為什麼 SFT 容易導致遺忘：大量新特徵壓過了 base model 原本用來處理其他任務的表示結構。

RL 的軌跡則完全相反。它對 base model 表示結構的改動幅度相對節制，而且特徵的重要程度排序在整個訓練過程中持續演化，沒有早早定型。這說明 RL 不是在覆蓋 base model，而是在慢慢微調、重塑既有的表示空間——一個持續進行的過程，而不是一個一步到位的結果。

## 那一小組控制泛化行為的特徵

研究者把焦點進一步縮小到「RL 成功但 base model 失敗」的样本上，想找出是哪些內部特徵在控制跨任務的泛化能力。

結果發現，控制泛化的特徵數量非常少——只有一小組，而且這些特徵有一個關鍵特點：它們是 task-agnostic 的，不是專門針對某一個數學題目或某個程式任務，而是跨任務通用的。

這裡的意義在於：過去我們以為 RL 是靠「記憶更多答題模式」來提升推理能力，但這篇論文告訴我們，RL 真正做的事要更精簡——它只是強化了少數幾個核心的泛化控制特徵，其餘的表示結構幾乎沒動。

## 干預實驗：直接證明這些特徵的因果角色

如果只是觀察到這些特徵存在，還不足以說它們「控制了」泛化。研究團隊做了干預實驗來驗證因果關係。

在 RL 模型裡，把這組關鍵特徵關掉（zeroing），模型在跨任務測試上的泛化表現大幅下滑。在 base model 裡，把同樣的位置强化（amplifying），模型在沒見過的任務上獲得了明顯的進步——而且不只是同一領域的任務，也包括完全新領域的 unseen tasks。

這個實驗結果直接證明了：泛化能力不是模型訓練過程中自然湧現的副產品，而是由這一小組特徵直接掌控的。我們現在有了第一個 Mechanistic 等級的解釋。

## 這件事為什麼工程師現在要在意

過去大家在聊 RL post-training 的時候，往往只在意「哪個 RL 方法在 benchmark 上分數更高」——PPO 還是 DPO，GRPO 還是 REINF。這個研究方向當然有意義，但它沒有處理解「為什麼 RL 有用而 SFT 沒用」這個更根本的問題。

這篇論文的價值在於，它把解釋層級從「演算法效果」推進到了「內部機制」。未來如果要設計更好的 post-training 方法，你現在可以問的不只是「哪個目標函數更好」，而是「這次的改動會不會破壞 base model 原有的關鍵泛化特徵」。

另一個實務上的啟示是：如果你在微調自己的模型，看到 loss 收斂很快，先別高興得太早——這可能正是 SFT 快速建立 specialized features 的訊號，而那代表你的模型正在走上一條容易遺忘的路。相對地，loss 慢慢震盪、RL 特徵重要度排序持續變化的訓練過程，反而可能是更健康的訊號。

## 一點懷疑

當然，這個研究的實驗範圍目前限於數學推理和程式任務，結論的可推廣性還需要更多領域的驗證。three-model crosscoder 的訓練成本不低，這在某種程度上限制了它被广泛採用的速度。此外，「task-agnostic 的泛化控制特徵」這個概念，如果最後發現它在更大的模型（例如 70B 以上）上並不成立，這個故事就會需要大幅修正。

但即便如此，能把「RL 泛化」這件事做到特徵層級的因果驗證，在 interpretability 這個領域已經是一個實實在在的進展。這個方向值得持續關注。

## 參考連結

- [arXiv:2604.25011 — Why Does Reinforcement Learning Generalize?](https://arxiv.org/abs/2604.25011)
- [arXiv HTML 版本（可全文檢索）](https://arxiv.org/html/2604.25011v1)
- [GitHub: danshi777/RL-generalization](https://github.com/danshi777/RL-generalization)（代碼即將公開）
- [OpenReview — SFT Memorizes, RL Generalizes](https://openreview.net/forum?id=dYur3yabMj)
- [Hugging Face Papers — Post-Training Mechanistic Analysis](https://huggingface.co/papers/2504.02904)
