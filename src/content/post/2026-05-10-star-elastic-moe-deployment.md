---
title: "【技術解析】一個 Checkpoint 三個模型：NVIDIA Star Elastic 如何打破 MoE 的部署困境"
description: "透過嵌套權重共享與可學習路由，NVIDIA Star Elastic 讓單一模型權重即可動態切換 30B/23B/12B 規模，並優化推理階段的算力分配。"
publishDate: "2026-05-10T15:00:00+08:00"
updatedDate: "2026-05-10T15:30:00+08:00"
tags: ["NVIDIA", "Nemotron Nano v3", "MoE"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-10-star-elastic-moe-deployment.png"
  alt: "【技術解析】一個 Checkpoint 三個模型：NVIDIA Star Elastic 如何打破 MoE 的部署困境"
---

如果你曾經負責部署過一組模型家族（Model Family），你一定對那個「乘數效應」深有體會。為了滿足不同場景的延遲與成本要求，團隊通常得準備 8B、30B 甚至 70B 多個版本。這意味著每個尺寸都需要獨立的訓練週期、獨立的儲存空間，以及一套重複的部署管線。對於追求規模化推理的工程師來說，這簡直是計算資源的噩夢。

NVIDIA 最近提出的 Star Elastic 試圖從根本上改變這個遊戲規則。他們不再將不同尺寸的模型視為「親戚」，而是將其視為「包含關係」。簡單來說，Star Elastic 能在一個單一的 Checkpoint 中，同時嵌入 30B、23B 和 12B 三個不同規模的推理模型，而且不需要為每個尺寸重新訓練。

## 讓小模型成為大模型的「子集」

Star Elastic 的核心在於「嵌套權重共享」（Nested Weight-sharing）。想像一下，如果你有一個 30B 的模型，你不需要隨機砍掉一些神經元來壓縮它，而是透過一種精準的評分機制，找出對模型準確率貢獻最高的核心權重。

在 Nemotron Nano v3（一個結合了 Mamba、Transformer 與 MoE 的混合體）中，Star Elastic 將權重共享擴展到了多個維度：從 Embedding 通道、Attention 頭數，到 Mamba 的 SSM 頭以及 MoE 的專家數量。系統會對每個組件進行重要性評估，然後將其排序。這樣一來，12B 的子模型就直接使用了 30B 父模型中排名最高的那部分權重。

這裡最巧妙的設計在於它引入了一個「可學習的路由器」（Learnable Router）。不同於以往 Minitron 等壓縮方案使用固定的壓縮配方，Star Elastic 使用 Gumbel-Softmax 訓練一個路由器。這個路由器接收一個目標預算（例如：「請給我一個 2.8B 激活參數的模型」），然後輸出可微分的遮罩（Mask）來決定哪些組件應該被激活。

透過這種方式，模型在訓練過程中就在學習：在特定的資源限制下，哪些權重組合能維持最高性能。這將訓練成本降低了 360 倍，因為你不再需要為每個尺寸跑一次完整的預訓練。

## 「思考用小模型，回答用大模型」的非對稱策略

除了儲存空間的縮減，Star Elastic 帶來的一個工程突破是針對「推理過程」的算力動態分配。

目前的推理模型（Reasoning Models）通常有一個 `<think>` 階段，模型在輸出最終答案前會生成長長的推理鏈。以往的做法是全程使用同一個模型，但在 Star Elastic 中，研究員提出了一種 $\mathcal{M}_S \to \mathcal{M}_L$ 的配置：在生成高容量但容錯率較高的推理鏈（Thinking phase）時使用較小的子模型（例如 23B），而到了需要極高精準度的最終答案合成（Answering phase）時，再切換回全能力的 30B 模型。

這種非對稱策略直接優化了準確率與延遲的 Pareto 前沿。實驗數據顯示，這種配置比原生的 Nemotron Nano v3 預算控制方式提升了高達 16% 的準確率，同時降低了 1.9 倍的延遲。這揭示了一個有趣的洞察：推理 token 雖然數量龐大，但對模型容量的依賴度低於最後那個決定性的答案。

## 從數據中心下放到 RTX 5080

對於本地部署的開發者來說，最實用的部分在於量化後的表現。通常量化會破壞嵌套結構，導致每個尺寸得重新量化一次。但 NVIDIA 採用了量化感知蒸餾（QAD），直接在彈性 Checkpoint 上操作。

這讓儲存壓力大幅下降。如果分開儲存 12B、23B 和 30B 的 BF16 版本，需要 126.1 GB；而單一的 Star Elastic Checkpoint 僅需 58.9 GB。如果進一步使用 NVFP4 格式，整個 30B 家族可以縮減到 18.7 GB。

這意味著原本會 OOM（記憶體溢出）的 RTX 5080 顯卡，現在可以流暢運行 12B 的 NVFP4 版本，並達到 7,426 tokens/s 的吞吐量，比 30B BF16 基線提升了 3.4 倍。

## 總結：這是否改變了 MoE 的部署邏輯？

Star Elastic 的價值不在於它創造了最強的模型，而是在於它定義了一種「彈性」的部署標準。它告訴我們，模型規模不應該是一個靜態的標籤，而應該是一個可以隨需求動態調整的參數。

對於工程師來說，這種「一個權重，多種尺寸」的模式極大簡化了基礎設施的複雜度。我們不再需要在不同尺寸的模型之間做艱難的權衡，而可以在同一個 session 中，根據 token 的性質（是推理過程還是最終答案）來動態切換模型規模。

當然，這種方案依賴於極其精準的權重重要性評估與蒸餾過程，並非所有模型都能輕易實現。但隨著 Nemotron Nano v3 這類混合架構的普及，這種「嵌套式」的設計將成為高效能 AI 代理（Agent）的標配。

## 參考連結

- [NVIDIA AI Releases Star Elastic: One Checkpoint that Contains 30B, 23B, and 12B Reasoning Models with Zero-Shot Slicing](https://www.marktechpost.com/2026/05/09/nvidia-ai-releases-star-elastic-one-checkpoint-that-contains-30b-23b-and-12b-reasoning-models-with-zero-shot-slicing/)
- [NVIDIA Nemotron 3 Nano Technical Report](https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3-Nano-Technical-Report.pdf)
- [Hugging Face: NVIDIA-Nemotron-Labs-3-Elastic-30B-A3B](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Elastic-30B-A3B-BF16)
