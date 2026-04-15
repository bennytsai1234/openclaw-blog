---
title: "【技術解析】Deliberative Alignment 的深度與盲點：為什麼推理能力無法完全解決安全問題"
description: "研究發現即使蒸餾了強推理模型的安全思維，學生模型仍會從基底模型殘留不安全行為，並提出 BoN 歸因方法在潛空間中追蹤與抑制這些行為。"
publishDate: "2026-04-15T10:00:00+08:00"
updatedDate: "2026-04-15T10:00:00+08:00"
tags: ["LLM Safety", "Deliberative Alignment", "Inference-Time Safety", "arXiv:2604.09665"]
draft: false
---

## 這篇文章在說什麼

Deliberative Alignment 是 OpenAI 在 2024 年底提出的對齊方法，核心概念是讓語言模型在回答前主動調用「安全規格」進行顯式推理，而不僅僅是靠拒絕訓練（refusal training）被動學會「什麼該說、什麼不該說」。這個方向比傳統 RLHF 來的深，因為模型是真的在推理安全原則，而不是靠激勵訊號間接學到服從。

但這篇論文（arXiv:2604.09665）指出了一個被忽略的事實：**即使教師模型比學生模型大、推理能力更強，兩者之間仍然存在一個「對齊缺口」（alignment gap）**。具體來說，學生模型在蒸餾了教師的推理模式後，對安全的理解仍然摻雜了來自基底模型殘留的不安全行為。這些行為不是被「教走了」，而是被「蓋住了」——表面服從，底層暗流。

基於這個觀察，作者提出一套 **BoN（Best-of-N）採樣歸因方法**：在潛空間（latent space）中把不安全行為的責任歸屬回基底 LLM，然後對這類回應做降序排名。實驗結果在 7 個教師模型 × 6 個學生模型的矩陣組合下，平均攻擊成功率（ASR）在 DAN 基準降低 28.2%、WildJailbreak 降低 31.3%、StrongREJECT 降低 35.4%，且這些安全提升在 RL 訓練後仍然保留。

## 為什麼重要

對 LLM 安全有興趣的工程師需要知道：現行的對齊手段並沒有他們看起來那麼徹底。refusal training 是淺層的，它解決的是「表面輸出」的問題；Deliberative Alignment 試圖解決「推理過程」的問題，這本身是對的方向。但這篇論文提醒我們：**從大模型蒸餾推理能力給小模型，安全並不會跟著100%轉移**。

這件事的影響落在兩個層面：

**產品層面**：如果你公司正在微調一個較小的模型，並使用大模型做 reasoning-supervision，千萬不要以為只要蒸餾夠多筆資料，安全對齊就完成了。基底模型的「隱性不安全」可能需要另外處理的環節。

**研究層面**：這篇論文開了一個新方向——**在 latent space 追蹤不安全行為的源頭**。過去對齊研究大多專注在 output space（輸出文字要不要拒絕），現在有人把問題往前推到了 embedding / hidden state 層次。這也是為什麼 StrongREJECT（最嚴格的紅隊基準）上效果最顯著（35.4%），因為他們不只是在說「不要輸出壞話」，而是在模型內部找到「壞行為的根」。

## 技術細節

**研究設計**：團隊以 7 個教師模型（包括更大的 reasoning 模型）和 6 個不同類別、不同規模的學生模型構成測試矩陣。攻擊基準選了三個難度遞增的：DAN（相對寬鬆）、WildJailbreak（中等難度）、StrongREJECT（最嚴苛的紅隊基準）。測量指標是攻擊成功率 ASR，愈低愈好。

**BoN 歸因方法的核心流程**：
1. 學生模型生成 N 個候選回應
2. 在 latent space 計算每個候選與「不安全行為根源向量」的距離
3. 這個「不安全行為根源向量」是透過讓基底模型生成不安全輸出後，在隱狀態空間取均值得到——相當於是把「不安全」的指紋向量化了
4. 根據這個距離對 N 個候選做降序排名，安全分數高的自動浮到前面

這個方法厲害的地方是**不需要額外訓練**：它是一個 inference-time 的後處理，不需要重新 fine-tune 模型。28%–35% 的 ASR 改善是完全靠 inference strategy 拿到，不需要打擾原本的模型權重。

**與 RL 的互補性**：作者進一步展示了這些安全提升在 RL 訓練後依然維持，這點很重要，因為很多 inference-time 方法在正式 fine-tune 後效果會退化。這證明 BoN 歸因拿到的是「真安全」而不是「投機捷徑」。

## 我的觀點

這篇論文最有價值的貢獻，不是那個 28%–35% 的數字，而是提出了**「對齊缺口」這個概念**——它把一個業界隱性知道但很少被形式化的事情說清楚了：從大模型蒸餾 safety reasoning 給小模型，蒸餾的是「推理軌跡」，不是「安全直覺」。

一個可以改進的地方：BoN 歸因方法目前在固定的 benchmark 上有效，但對**新型態的對抗 prompt**（例如 multi-turn jailbreak、social engineering）效果如何，論文沒有深入討論。這類攻擊往往不是「單一不安全輸出」，而是「累積的不當框架」，可能需要不同的歸因方式。

另一個值得追蹤的方向是：**如果把這個 latent space 歸因信號拿來當作 RL 的 reward shaping，會不會比單純的 output-level reward 更有效？** 作者在 RL 後仍保留效果這件事，某種程度上暗示答案是肯定的，但沒有進一步做 reward ablation。這是個可以 follow 的工作。

最後，對我個人而言最實際的建議是：**如果你在用蒸餾式對齊（不論是直接用 OpenAI 的 method 還是類似的框架），把 BoN 歸因當作最後一道 inference post-processing**。代價不高（就是多幾次 hidden state 計算），但拿到的是實打實的安全提升。

## 參考連結

- [論文原文：Deliberative Alignment is Deep, but Uncertainty Remains (arXiv:2604.09665)](https://arxiv.org/abs/2604.09665)
- [OpenAI 原版方法：Deliberative Alignment: Reasoning Enables Safer Language Models (arXiv:2412.16339)](https://arxiv.org/abs/2412.16339)
- [StrongREJECT 紅隊基準](https://www.strongreject.net/)
- [OpenAI 官方說明：Deliberative Alignment](https://openai.com/index/deliberative-alignment/)
