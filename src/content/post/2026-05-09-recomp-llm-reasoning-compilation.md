---
title: "【技術解析】LLM 的推理軌跡，居然可以編譯成符號求解器？"
description: "CMU 團隊用 coding agent 把 LLM 的推理過程蒸餾成可重複使用的符號程式，在困難的程式合成任務上打敗了 GPT-oss-120b 的 BoK 測試時擴展策略，且完全不需呼叫 LLM。"
publishDate: "2026-05-09T15:00:00+08:00"
updatedDate: "2026-05-09T15:00:00+08:00"
tags: ["CMU", "程式合成", "符號求解", "LLM蒸餾", "PBEBench"]
draft: false
---

你有沒有注意過一件事：LLM 在處理那種「簡單、確定」的程式合成題目時，表現其實很好，但只要題目稍微複雜一點、需要多層組合推理的時候，它就開始表現得像一個人在考試時對著題目乾瞪眼——東試一下、西試一下、然後迴圈。

這不是錯覺。CMU 的研究團隊在分析 GPT-oss-120b 的推理軌跡時發現，這個模型在處理長 cascade（多層字串替換組合）時，會出現「在一個 attempt 裡原地打轉」以及「跨 attempts 大量重複探索」的問題。就算加強了 Best-of-K 採樣或 Direct Feedback（帶驗證器的迭代優化），hard 實例的 token 消耗仍然飆升，而準確率天花板卻很明顯。

所以問題來了：LLM 到底卡在哪裡？

## 舊方法的瓶頸不只是「慢」，是「沒有結構」

研究團隊畫了一張圖，把 LLM 搜尋候選程式的過程形容為「無結構搜尋」——它對候選空間沒有任何明確的佈局或引導，純粹靠著「這個感覺對」的直覺在候選空間裡遊走。簡單題目時，這種方式還堪用，因為正確答案本來就在高機率區；但當題目困難到需要組合多個變換步驟時，LLM 就必須燒大量 token 去搜尋，而且還不一定找得到。

現有的緩解手段——例如 tool use、learned libraries、或從經驗中提取 reusable abstractions——在計算預算內確實有幫助，但仔細看就會發現，這些方法的 gain 其實主要來自「推理時多了更多 compute」，而不是真正把之前學到的結構重用起來。團隊引用了 Sesterhenn et al. 2025 的分析：這些方法在跨實例的工具重用上，幾乎沒有穩定證據。

這就是 ReaComp 想要回答的核心問題：**與其不斷最佳化推理時的計算，有沒有可能把 LLM 已經會做的推理，直接編譯成一個可以脫離 LLM 獨立運作的符號求解器？**

## ReaComp 的核心思路：離線蒸餾，然後混合推理

答案是一套兩階段流程：離線求解器誘導（offline solver induction），加上測試時的混合推理（hybrid inference）。

**離線階段**：研究團隊先收集一批 LLM 推理軌跡——包含中間推理步驟、候選程式、以及最終結果。這些軌跡餵給一個 coding agent（可以是 Claude Code，也可以是 Qwen + OpenHands），讓它在受限的 DSL 範圍內，逐步建構出一個 Symbolic Solver。這個過程有點像老師傅帶菜鳥：coding agent 觀察 LLM 失敗的案例、失敗的模式、以及偶爾成功的捷徑，最後歸納出一套可以直接套用的求解邏輯。產出是一個 `SOLVER.py` 檔案，測試時完全不需要任何 LLM 呼叫。

**測試階段**：拿到新任務時，先讓符號求解器跑一次。如果直接命中（reward = 1），則以零 LLM 成本完成。如果失敗，再 fall back 到 LLM 的 BoK 或 Direct Feedback 搜尋。這種架構的好處是：簡單題目幾乎全部由求解器處理，LLM 只在困難殘差案例被呼叫，代價大幅下降。

## 數字說了什麼

團隊在 PBEBench（Programming By Example）和 SLR-Bench（Inductive Logic Programming）兩個 benchmark 上做實驗，難度涵蓋 Lite（cascade 2–5 層）與 Hard（cascade 2–20 層）。

最重要的對比是 Hard 等級：

- **BoK（Best-of-32）**：68.4% 準確率，平均 reward 0.9428，token 消耗 332.1M
- **All Symbolic（求解器集成）**：84.7% 準確率，reward 0.9920，**零 token 消耗**

同一批任務，求解器用零 LLM 成本打敗了花費 57 美元 token 的 BoK 策略。而且這還沒完——兩者疊加的混合策略（BoK + All Symbolic）可以把 Hard 準確率推到 85.8%，同時把 token 消耗從 332M 砍到大約 130M，降幅 78%。

另一個有趣的數據在 SLR-Bench 的 hard tier：純 LLM Direct Feedback 只有 34.4%，加上求解器混合之後拉到 58.0%。

## 為什麼它值得工程師注意

如果你曾經在 production 環境裡接過程式合成相關的功能——無論是 AI coding assistant、data wrangling pipeline、還是某種自動化重構工具——你大概遇過這個困境：要嘛接受 LLM 的不穩定性，要嘛燒錢上更多的測試時計算。

ReaComp 給出的方向是：這兩件事不需要是取捨的對立面。你可以訓練一個 domain-specific 的求解器，針對你的 DSL 與任務分佈，讓它處理大部分例行案例，把 LLM 的負擔降到最低。這個求解器是離線訓練的，測試時完全沒有 LLM 成本——在需要處理大量任務的場景，這個代價結構的翻轉意義很大。

而且這個求解器是真的可以跨領域轉移的。團隊測試了從 PBEBench 和 SLR-Bench 學到的求解器，zero-shot 套用到歷史語言學的聲音變化預測任務，準確率達到 80.1%（集成模式下），而且真的學到了一些 linguistics 合理的 sound change rules。這說明蒸餾出來的知識不是只在 benchmark 上有效的 overfit，而是某種更結構化的東西路徑。

## 什麼被高估，什麼被低估

ReaComp 目前的瓶頸，在於它高度依賴一個前提：**需要能從 LLM 拿到夠好的推理軌跡**。如果你的 LLM 在某個 domain 本身就是亂猜的，那軌跡裡的訊號品質也不會好到哪裡去。而且誘導出來的求解器綁定在特定 DSL 上——換一個 domain 可能就要重新誘導一個新的。

另一個被低估的地方是 cross-domain transfer 的潛力。實驗顯示 SLR-Bench 的求解器在歷史語言學任務上有 80.1% 準確率，這個數字背後的含義是：符號化之後的推理結構，比原本的 LLM 權重更容易泛化。如果這個現象在更多 domain 上成立，那「用 LLM 誘導求解器」可能會變成一種新的 workflow：不是部署一個萬能的 LLM，而是用 LLM 當 constructor，生產一堆專門的 lightweight 求解器。

## 參考連結

- [ReaComp 原論文（arXiv 2605.05485）](https://arxiv.org/abs/2605.05485)
- [ReaComp HTML 版本（完整內容）](https://arxiv.org/html/2605.05485v1)
- [PBEBench 原始論文（Naik et al., 2025）](https://arxiv.org/abs/2605.04050)
- [SLR-Bench（Helff et al., 2025）](https://arxiv.org/abs/2605.05386)
- [Anthropic Claude Code](https://www.anthropic.com/claude-code)
- [OpenHands](https://github.com/All-Hands-AI/OpenHands)