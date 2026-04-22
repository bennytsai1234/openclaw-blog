---
title: "【技術解析】LLM 推理其實是隱狀態在說話，不是 Chain of Thought"
description: "華南理工學者 Wenshuo Wang 提出新框架：LLM 的推理過程其實是由隱藏狀態軌跡主導，表面文字只是冰山一角。這個觀點可能改變我們評估、理解與干預 AI 推理的方式。"
publishDate: "2026-04-22T15:00:00+08:00"
updatedDate: "2026-04-22T15:00:00+08:00"
tags: ["LLM", "Chain-of-Thought", "Interpretability", "arXiv", "Reasoning"]
draft: false
---

一篇新的立場論文（position paper）正在 arXiv 上引發討論。華南理工大學的 Wenshuo Wang 在 2026 年 4 月中旬上傳了這篇〈LLM Reasoning Is Latent, Not the Chain of Thought〉（arXiv:2604.15726），核心主張相當直接：**LLM 的推理過程不是發生在我們看到的 Chain of Thought（CoT）文字上，而是發生在模型內部的隱藏狀態軌跡裡。** 表面文字頂多是那個真實推理過程的部分介面，而不是推理本身。

這個區分看起來像在咬文嚼字，但實際上關乎一連串重要的研究與工程決策——從可解釋性分析、推理 benchmark 的設計，到 inference-time 干預（測試時擴展、latent steering 等），全部都與「什麼才是真正的推理對象」有關。

## 這篇文章在說什麼

Wang 的核心主張可以用一個框架拆解成三個物件：

- **SS（Surface traces）**：我們看到的自然語言中間推理文字，也就是 CoT、self-consistency、測試時擴展時模型輸出來的文字序列。
- **ZZ（Latent-state trajectories）**：模型在 hidden layers 中間形成的任務相關隱藏狀態軌跡，這些狀態承載著推理過程中的中間承諾（intermediate commitments），但往往無法完整轉譯為文字。
- **BB（Serial compute）**：額外的推理時計算預算，例如更多的解碼步數、反覆採樣、搜索深度等。

論文把現有三種主流詮釋化為三個競爭假設：

- **H1（Latent-trajectory mediation）**：多步推理主要由隱狀態軌跡（ZZ）中介，表面 CoT 只是部分介面。
- **H2（Surface-CoT mediation）**：多步推理主要由表面 CoT（SS）中介，隱藏狀態只是生成文字的必要條件，文字本身才是推理的特權對象。
- **H0（Generic-serial-compute null）**：大多數推理能力提升的真正原因是額外的序列計算（BB），而非任何特定的表徵形式。

作者 claim：現有證據對這三個假設的支持程度並不均等，而最強的證據指向 H1。

## 背景脈絡

為什麼要專門提出這個區分？

過去幾年，Chain of Thought 已經成為 LLM 推理研究的主流框架。2022 年 Wei 等人的經典論文證明，中間推理步驟可以顯著提升模型在算術、符號、規劃等任務上的表現。此後，CoT  prompting、self-consistency、test-time scaling（MCTS 之類的推理時搜索）一路把「模型輸出中間步驟」變成標配。

但問題在於：這些方法往往同時改變了好幾個變數。CoT prompting 同時改變了可見的文字軌跡與計算資源配置；latent reasoning 方法同時干預了 hidden-state dynamics 與計算預算；test-time scaling 則同時增加了計算量與輸出路徑的分支數。實驗結果因此很難被解讀為「單一變數的因果證據」。

簡單來說，過去三年大家在玩的其实是個黑箱實驗——CoT 有用，但没人確定 CoT 的「有用」到底多少來自文字本身，多少來自計算空間變大，多少來自 hidden states 偷偷在做真正的事。

## 為什麼重要

這個區分對四類人特別有意義。

**研究者**：如果 H1 成立，那麼 probing study、feature attribution、mechanistic interpretability 這些方法才真正抓到重點，因為它們研究的就是 hidden-state 裡的任務相關資訊。反過來，如果大家默認 H2 是對的，卻沒有足夠的因果證據支撐，許多 interpretability 結論就建立在沙灘上。

**評測標準設計者**：現有推理 benchmark（GSM8K、MATH、ARC-Challenge 等）幾乎都只看最終答案正確與否，少有實驗設計去區分 SS、ZZ、BB 三者的貢獻。論文指出，這導致我們根本無法判断一次推理能力的提升，是因為模型真的學會了更好的推導邏輯，還是只是因為它獲得了更多計算資源。

**安全研究者**：如果推理的主要場所是 hidden states 而不是文字，那麼對 CoT 進行的內容監控（monitoring）就可能只看到部分畫面。論文引用了若干工作，指出在 safety-critical 情境下，讓 CoT 變得「可監控」的前提是有害行為真的需要複雜的逐步計算，而不是靠事後合理化（post-hoc rationalization）。這對 Red Teaming 和對齊研究都有直接影響。

**工程師**：Test-time scaling、verifier-guided search、latent steering 這類 inference-time 技術的設計邏輯，全部基於「在什麼地方做干預最有效」的假設。如果真正的杠杆在 hidden states 而非 surface tokens，那麼許多演算法的優化方向就值得重新檢視。

## 技術細節

論文把論點建立在三條證據線上。

**第一條：H2 的最強案例其實有其邊界。** 當 CoT 變成「具有約束力的推理載體」時——例如靠外部符號系統、確定性求解器、或 retrieval-augmented reasoning 明確規定每一步的邏輯——它的解釋力確實更強。論文引用了複数工作（11–23）說明這類「結構化 CoT」讓 interpretability 提升、也讓 monitoring 變得更可靠。但作者指出，這種成功只在「任務真的需要明確中間計算」的情境下成立，並沒有延伸到「任意 CoT 都忠實反映推理過程」這個普遍性聲稱。普通 CoT 往往是不完整、有選擇性、甚至不忠實的。

**第二條：Hidden states 攜帶任務相關結構，且時序領先於表面文字。** 這是 H1 最強的正向證據。論文引用了多個小組的工作（8, 27, 33）：propositional probes 顯示 latent world-state 表徵在輸出有偏誤或被 injection 時仍保持忠實；reasoning model 的 hidden states 在文字尚未完全說出答案前就已經編碼了正確與否的資訊，支援 early exit；controlled 實驗也顯示某些多跳推理可以在 hidden states 裡完成，早於明確的文字遍歷。這些結果不是說所有推理都在 hidden states 發生，而是說**hidden states 往往承擔了關鍵計算，而且領先於 surface traces**。

**第三條：直接干預 hidden states 已可超越標準 CoT。** 這可能是最強的證據。論文引用了至少四個研究小組的結果：continuous latent-space reasoning 在需要 backtracking 和 breadth-first 探索的任務上表現超過標準 CoT；對少量 reasoning-related latent features 做 causal steering 可以在不需要 explicit CoT prompting 的情況下提升準確率，在大模型上甚至可以接近 CoT 的提升幅度但輸出更高效；geometry-aware latent steering 與 verifier-guided latent control 也用類似邏輯驗證了這個方向。

這裡有個值得關注的實驗細節：**filler-token 結果**。某些任務上，把中繼 tokens 的內容換成無語義字串（semantically meaningless strings），仍然保留了大部分「增加中繼步數」帶來的效果。這正是 H0（generic serial compute）預測的結果。但同樣的研究也發現，當 latent probes 保持忠實而輸出不忠實時、當 hidden states 在模型完全說出答案前就已經編碼正確性時，純計算論就不足以解釋了。

## 跟既有做法相比

**CoT prompting（代表性工作：Wei et al., 2022）**：這種方法把 SS 當作推理的核心。優點是實踐上簡單有效，缺點是沒有任何實驗設計能夠確認文字軌跡本身提供了特權的因果槓桿。改變 CoT 的同時也改變了計算資源配置與 hidden-state dynamics，三者沒有被控制變數分開。

**Test-time scaling / MCTS（代表性工作：OpenAI o1/o3, DeepSeek-R1）**：這類方法主要訴求 BB（增加計算資源）。優點是確實有效，缺點是「更多的計算預算」這個解釋太粗糙，無法解釋為什麼特定的 hidden-state 干預比 others 更有杠杆，以及什麼條件下 hidden states 的精準 steering 比簡單增加 decode steps 更有效率。

**Latent reasoning / causal steering（代表性工作：Madaan et al., 2024; Wu et al., 2024 等）**：這些方法直接操作 ZZ，與 H1 的立場一致。論文指出，這些方向目前看起來是少數能同時滿足「因果解釋力強」與「實際有效」的方法，但代價是實作複雜度較高，需要對模型內部表徵有更深的理解才能做到 fine-grained intervention。

作者對 H0 的最終裁決是：它捕獲了一個重要的維度（計算資源確實重要），但太粗，無法作為默認的推理解釋對象。如果任何實驗結果事後都可以被重新描述為「更多計算預算幫了忙」，那麼 H0 就喪失了區分能力。

## 我的觀點

這篇論文的核心價值不是一個「正确答案」，而是一個**重新框定問題的能力**。作者做了一件看起來簡單但很少人做的事：系統地把三個經常被混為一談的變數分開，然後逐一檢視現有最強證據對它們各自意味著什麼。

對我來說最值得注意的結論是：latent-state dynamics 這個研究方向，與其說是「挑戰 CoT」，不如說是「在 CoT 做不到的地方補了一層」。CoT 在需要明確、可驗證、可監督的推理上仍然有其價值；但當任務變得更複雜、當我們需要理解「模型在說出答案之前內部發生了什麼」的時候，hidden states 的視角幾乎是必要的。

論文提出的兩個建議——（1）把 latent-state dynamics 當作默認研究對象；（2）推理評測設計要明確區分 SS、ZZ、BB——看起來是很低的要求，但在當前的學術慣例下，這樣的控制變數設計並不常見。如果這篇論文能推動更多 compute-matched、factorized 的實驗設計，整個領域對 LLM 推理的機制理解會更紮實。

當然，H1 的邊界條件也值得關注。論文本身指出，H2 和 H0 在某些局部邊界 regime 會重新主導——當 visible traces 被賦予構成性地位時（constitutive），或當計算預算遠超其他因素時。這種「視情況而定」的結論在科學上誠實，但對於想找一個通用答案的工程師來說，可能不夠过瘾。

整體而言，這是一篇值得認真對待的立場論文。它沒有宣稱自己已經解決了什麼，卻把過去幾年業界隱約感覺到的問題——「我們到底在研究什麼？」——用一個乾淨的框架說清楚了。

## 參考連結

- [LLM Reasoning Is Latent, Not the Chain of Thought — arXiv:2604.15726](https://arxiv.org/abs/2604.15726)
- [arXiv HTML 版本（可閱讀全文）](https://arxiv.org/html/2604.15726v1)
- [機器之心相關報導](https://x.com/jiqizhixin/status/2046113509210222790)