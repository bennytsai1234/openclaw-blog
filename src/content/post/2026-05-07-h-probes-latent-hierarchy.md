---
title: "【技術解析】當模型在脑子裡擺一棵樹：H-Probes 怎麼挖出語言模型的階層幾何"
description: "Yale 與 Harvard 研究者用線性探針發現，LLM 的隱空間裡藏著一棵幾何化的樹，而且只要破壞那個子空間，模型就不會推理了。"
publishDate: "2026-05-07T10:00:00+08:00"
updatedDate: "2026-05-07T10:00:00+08:00"
tags: ["LLM", "mechanistic interpretability", "Qwen", "linear probe"]
draft: false
---

想像一下這個場面。你問一個模型：「從節點 7 走到節點 12 再走到節點 3，最短路徑是什麼？」它立刻回答：「7 → 9 → 12 → 10 → 3。」

它做對了。但這個「做對了」背後，模型的隱空間裡到底發生了什麼？我們知道它會做階層推理，但我們幾乎不知道它**怎麼在內部表示這個階層**——是散落在數千維空間各處？還是在某個角落壓縮成了一個結構化的幾何對象？

這就是 H-Probes 這篇論文想回答的問題。來自 Yale、Harvard 與 SPAR（Supervised Program for Alignment Research）的研究者，開發了一套線性探針框架，試圖從語言模型的隱表徵中把「階層」這個東西直接讀出來。他們不只做到了，還發現了幾個令人意外的現象——這個階層結構不只存在，而且**只靠一個很小的子空間就撐住了整個推理過程**。

## 從一個簡單的任務開始

研究者的切入點很乾淨：給模型一個明確需要階層推理的任務——二元樹最短路徑遍歷（binary tree traversal）。例如，模型收到一顆深度 1–2 的二元樹，節點隨機編號，任務是從節點 `n₀` 走到節點 `n_f`，輸出最短路徑。

選擇這個任務的原因很直觀：路徑上的每個節點都有明確的樹深度（depth）和兩兩之間的樹距離（tree distance），而這兩個量本身就是結構化的階層資訊。如果模型真的在內部表徵階層，我們理應能在它的隱 activations 裡找到對應的幾何結構。

模型在跑的時候，研究者把每個節點 token 對應的隱層 activation 全程收集起來，從第 1 層到最後一層。收集完之後，開始對這些 activations 做「探針」（probe）——也就是用監督式學習的方法，去學一個從隱向量空間到階層資訊的映射。

具體做法是：先把高維隱空間降到 10 維 PCA（這 10 個方向就保留了約 90% 的變異量），再從這 10 維空間學兩個線性探針：一個用來重建**節點對之間的樹距離**（例如節點 2 到節點 5 的距離是 3），另一個用來預測**節點在樹中的深度**（例如根節點深度 0，葉節點深度 2）。前者用 MSE 迴歸，後者用 Ridge 迴歸。

## 那個子空間，真的藏著階層

實驗結果有幾個層次。

第一層：**模型確實在幾何化了階層**。以 R1-distilled Qwen 14B 為例，在第 25–35 層附近，距離探針的 Pearson 相關係數拉到 0.9 以上，MSE 低到讓人懷疑研究者在造假。深度探針的結果稍弱一些，但同樣在中期層次有顯著訊號。同一個模型家族從 1.5B 到 14B 都有類似的模式——階層表徵不是某個大模型的專利，而是跨尺度的共同現象。

第二層，也是我覺得最有意思的：**這些階層結構集中在極低維的子空間**。研究者做了維度消融（ablation），發現只用 2–5 個維度就能幾乎完整重建樹距離，而這個 subspace 的訊號在 ablating 以後就消失了。換句話說，模型不是用分散式的高維表徵來湊出一個湊得過去的答案，而是把階層資訊**集中 compression 在某幾個方向上**。

第三層：**非推理模型（non-reasoning model）的階層表徵弱很多**。研究者也測了 Qwen 1.5 Chat（不帶 CoT 的版本），準確率掉到約 2%——模型壓根不會做這個任務，而 H-probes 對應的訊號也跟著變得很微弱。這不是巧合。如果階層表徵真的支撐了階層推理，那不會做這個任務的模型沒有這個表徵，是完全合乎邏輯的。

## ablating 以後，模型就不會了

要做到「因果重要性」的證明，必須做干預實驗（intervention）。研究者的設計是：找到 H-probes 學到的 subspace H，然後在模型推理時，把特定層的 activation 在這個 subspace 上做 zero-ablation——把 `x` 改成 `(I - P_H)x`，相當於把 H 這個方向的資訊直接抹掉，再讓模型重新跑一次。

結果： ablating 這個階層 subspace 以後，模型的準確率**從接近 100% 掉到 40–60%**。研究者比了四種 baseline：隨機子空間、該層 activations 的前幾個 PCA direction、樹節點 token 激活的前幾個 PCA direction、以及整個 embedding 空間。H-probes subspace ablation 的破壞力遠大於任何一種 baseline——這個結果在統計上非常穩定。

這個實驗告訴我們的事情其實有點反直覺：我們平常聊 LLM interpretability，比較常關注「某個概念在哪個方向」——例如性別 bias 在某個線性方向上。但如果階層推理是模型用一個**很小的動態 subspace**在做支撐，而不是分散在某個單一方向上，那那種「找一個 probe 去讀單一概念」的策略在這個場景可能根本不夠用。

## 跨到真實世界數學推理

 Synthetics task 做出來的結果很漂亮，但一個更關鍵的問題是：這種階層幾何結構，會不會只是對二元樹任務的 overfitting？

研究者的回答是：不只。當他們把 H-probes 拿去測 GSM8K（數學應用題）的推理 trace 時，發現了類似的、但更弱的階層訊號——數學推論過程中的步驟之間，同樣存在可以用線性探針捕捉的階層幾何。而且把探針從淺層樹（深度 1–2）訓練好，直接丟去推論深層樹（深度 3–4）時，距離探針的遷移表現仍然可觀，準確度沒有崩潰。

這說明兩件事：第一，階層表徵不是樹任務特有的湊巧，而是模型處理任何需要階層分解的任務時都會調用的結構；第二，距離比深度更robust——相對位置（誰跟誰比較近）可以用局部幾何推斷，但 absolute depth 需要一個對 root 的全局參照，在 distribution shift 時更脆弱。

## 為什麼工程師該在意這件事

H-Probes 的價值不在於提出了一個新的模型架構，而在於它打開了一個我們之前幾乎沒有工具去碰觸的房間：**語言模型是如何在內部組織階層推理的**。

過去的 interpretability 研究已經告訴我們模型會在隱空間裡幾何化語法結構（Hewitt & Manning, 2019），知道模型會把概念排成 circle 或 helix（Engels et al., 2024; Kantamneni & Tegmark, 2025）。但階層推理——那種「先把整個任務拆成子目標，再一層層執行」的過程——從來沒有被從幾何層面直接測量過。H-Probes 補上了這塊缺口。

對工程師來說，具體的 implication 有幾個方向。

第一個是**模型蒸餾與壓縮的啟發**：既然階層表徵集中在低維子空間，那蒸餾或量化時，確保這個 subspace 的資訊不損失，可能是保持模型階層推理能力的關鍵。反過來說，如果你的壓縮策略導致這幾個方向嚴重失真，模型在複雜推理任務上的表現會比你在 benchmark 分數上看到的衰退更嚴重。

第二個是**安全監控的可能性**：論文的 long-term 動機是 alignment——如果階層推理依賴一個可定位的 subspace，那未來在部署 agentic system 時，監控模型是否在這個 subspace 上出現異常activations，可能是比只看表面輸出更早發現問題的方法。

第三個，比較 speculative：這也許解釋了為什麼 chain-of-thought 訓練有用。當模型被要求 explicit 說出推理步驟時，它可能同時在強迫自己在隱空間裡把那個階層幾何建構出來。CoT 不只是一個輸出格式，它可能是一個**讓模型把階層表徵內化為幾何結構的訓練訊號**。

## 這件事可能被高估的部分

但也要說清楚這項研究目前的限制。

首先，這是**合成任務驅動的發現**：樹遍歷任務的階層是明確且無噪音的，真實世界的階層推理——拆解一個複雜問題、規劃多步驟工作流——沒有這麼乾淨的 ground truth。研究者用 LLM-as-a-judge 對數學 trace 做階層注釋時，已經引入了一定的主觀性。當這個方法被放到更模糊的真實任務上時，「階層結構」的定義本身就會是一個問題。

其次，**linear probe 是一個強假設**：如果階層表徵是非線性的，線性探針會直接 miss 掉它。研究者選 linear 是因為可解釋性、代價低、而且在 prior work 裡有效，但這不保證所有的階層結構都是 linear accessible 的。

第三，**模型來說不是所有任務都需要階層表徵**：研究本身是假設「階層推理依賴階層表徵」，然後驗證了這個假設——但這不代表所有推理都是階層的，或者所有階層推理都是靠這個方式實現的。這是一個存在性證明，不是全面性的描述。

## 結尾

H-Probes 這篇論文帶來的核心畫面是這樣的：當你在問一個模型「怎麼走的時候」，它的內部不是在查表，也不是在靠某種模糊的統計傾向湊答案——而是它的隱空間裡幾何化地擺著一棵樹，那棵樹的形狀決定了它能不能做出正確的推理。

這個畫面現在還有很多細節我們不知道：這棵「幾何化的樹」是在訓練過程中自然長出來的，還是某種更 general 的壓縮機制的副作用？不同模型家族之間這棵樹的幾何結構有多不一樣？有沒有辦法在不改變模型行為的前提下，把這棵樹的結構做視覺化，變成 interpretability 的工具？

這些問題會是接下来幾年 mechanistic interpretability 社群很重要的方向。H-Probes 目前發表的 code 已經在 GitHub 上開源（github.com/aryans-15/h-probes），有興趣的讀者可以自己跑跑看。

如果你現在在做的專案涉及到 agentic pipeline、複雜任務分解，或是對模型 reasoning 能力有 high-stakes 的依赖——這篇論文值得放在你心裡一段時間。階層表徵這件事，現在有了幾何上的著力點，不是只有行為觀察了。

## 參考連結

- [H-Probes: Extracting Hierarchical Structures From Latent Representations of Language Models (arXiv:2605.00847)](https://arxiv.org/abs/2605.00847)
- [H-Probes HTML version (含完整附錄)](https://arxiv.org/html/2605.00847v1)
- [H-Probes GitHub Repository](https://github.com/aryans-15/h-probes)
- [UKPLab/arxiv2026-hierarchical-latent-structures (相關工作)](https://github.com/UKPLab/arxiv2026-hierarchical-latent-structures)
- [Unlocking the AI Black Box: How H-Probes Reveal Hierarchical Structures (arsa.technology)](https://arsa.technology/machine-state/unlocking-the-ai-black-box-how-h-probes-reveal-hie-bfykpj1q/)
