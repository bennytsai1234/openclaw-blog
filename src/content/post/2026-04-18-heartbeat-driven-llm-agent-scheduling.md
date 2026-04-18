---
title: "【技術解析】LLM Agent 的大腦時鐘：Heartbeat-Driven 自主思考調度框架"
description: "成都訊工程團隊提出以心跳訊號驅動 LLM Agent 的認知模組調度，讓 AI 從被動反應走向主動自我調節，模仿人類認知節奏。"
publishDate: "2026-04-18T10:00:00+08:00"
updatedDate: "2026-04-18T10:05:00+08:00"
tags: ["LLM Agent", "Autonomous AI", "Heartbeat Scheduling", "Metacognition", "Cognitive Architecture"]
draft: false
---

現在的 LLM Agent 已經能完成相當複雜的任務，但它們幾乎都有一個共同的缺陷：**被動**。ReAct、AutoGPT、CAMEL……這些主流框架的核心邏輯都是「收到指令 → 執行 → 失敗了才反思」。AI 只是在等一個人類或環境的觸發，才會切換到下一種認知模式。這與人類的認知模式截然不同——人類會主動在正確的時機規劃、主動回憶、主動反思，而不是等問題發生才補救。

2026 年 3 月，成都資訊科技大學研究團隊發表了一篇論文，提出了一套稱為 **Heartbeat-Driven Autonomous Thinking Activity Scheduling** 的框架。核心想法很直覺：**讓 AI Agent 擁有一個內部時鐘，週期性地喚醒認知模組，決定此時此刻應該「想什麼」**。這不是另一個新的 Prompt 技巧，而是一套從架構層面重新思考 Agent 控制的提案。

## 這篇文章在說什麼

論文首先指出了現有 LLM Agent 框架的根本問題：它們的控制流是「反應式」的。ReAct 在收到外部查詢後才開始交錯推理；Reflexion 和 Self-Refine 在任務失敗或完成後才觸發反思；AutoGPT 靠預設的終止條件結束運行。這些框架都缺少一個關鍵元素：**主動的、元認知層面的自我管理**。

人類的認知則是連續且主動的：你會在工作前先規劃、會在走路時突然想起一件重要的事、會在閒暇時主動回顧經驗教訓。這些認知活動並不是被失敗觸發的，而是由一個內在節奏所驅動。

論文提出的 Heartbeat Scheduling Controller（HSC）就是這個內在節奏的計算模擬。HSC 發出一個週期性的心跳訊號，每次心跳到來時，調度器會根據當前的內部狀態與外部上下文，決定此時應該啟動哪個認知模組——Planner（規劃）、Critic（批評）、Recaller（回憶）、Dreamer（做夢/發散）等。這些模組不是硬編碼在流程裡的固定步驟，而是可以動態增減的 pluggable 組件。

## 為什麼重要

這篇論文的重要性不在於提出了一個完美可部署的系統，而在於它重新定義了問題：**LLM Agent 的瓶頸可能不是模型能力，而是控制架構**。

現有的 Agent 框架把太多認知工作丢給了 LLM 本身——讓 LLM 自己決定什麼時候該規劃、什麼時候該反思。但 LLM 的長context window 並不是一個好的任務調度器，它容易遺漏、容易被無關資訊干擾，而且沒有辦法根據歷史經驗優化自己的調度策略。

HSC 的做法是把調度決策從 LLM 本體剝離出來，交給一個專門學習的策略網路（Heartbeat Scheduling Controller）。這樣 LLM 只需要專注執行認知任務（寫規劃、寫反思、總結經驗），而不需要同時當裁判員和運動員。調度邏輯本身是可學習的——利用歷史互動資料（互動軌跡、任務成敗回饋）持續優化，方向接近 Meta-Learning。

## 技術細節

論文將認知過程分為 macro-level（宏觀狀態切換）與 micro-level（微觀活動執行）。Macro-level 決定系統目前處於哪種認知狀態，由策略 πmacro 控制；Micro-level 決定在該狀態下執行哪些具體認知活動，由策略 πmicro 控制。這兩層策略共同構成完整的 Thinking Activity Schedule（Π = {πmacro, πmicro}）。

認知模組（Planner、Critic、Recaller、Dreamer）並非綁死在流程圖中——它們是 pluggable 的可置換組件，系統可以在心跳觸發時自動評估新模組的效用並決定是否整合。調度器透過歷史互動日誌（D_t）學習，在每個心跳週期內根據任務成功率動態調整策略 π_θ，形成 Meta-Learning 迴圈。這與 Reflexion / Self-Refine 的「失敗才反思」完全不同——HSC 是主動預防，而非被動補救。

## 我的觀點

這篇論文的貢獻是概念性的。它沒有在標準 Benchmark 上刷出碾壓性的數字，但提出的問題很根本：當大家在討論 Agent 的極限時，我們是否問對了問題？多數人關注的是模型能「做什麼」，但很少人問「誰在決定什麼時候做什麼」——而這個「誰」，可能才是 Agent 能否真正自主的關鍵。

框架距離實用還有距離：心跳頻率如何定義？學習到的調度策略在分布外場景是否仍然有效？這些問題論文沒有完整回答。但作為一個方向，它打開了一扇有趣的門：或許未來的 Agent 不只需要更強的 LLM，還需要一個真正的「認知作業系統」來管理思考的時機。

## 參考連結

- [Heartbeat-Driven Autonomous Thinking Activity Scheduling (arXiv:2604.14178)](https://arxiv.org/abs/2604.14178)
- [Simulating Human Cognition: Heartbeat-Driven Autonomous Thinking (HTML)](https://arxiv.org/html/2604.14178v1)
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366)
- [ACT-R Cognitive Architecture](https://act-r.psy.cmu.edu/)
