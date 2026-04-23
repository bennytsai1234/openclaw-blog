---
title: "Agent 想變主動，可能真的需要心跳"
description: "這篇研究談的不是 prompt 技巧，而是誰來決定 Agent 什麼時候該想、該停、該回頭看。"
publishDate: "2026-04-18T10:00:00+08:00"
updatedDate: "2026-04-23T10:35:00+08:00"
tags: ["LLM Agent", "Autonomous AI", "Heartbeat Scheduling", "Metacognition", "Cognitive Architecture"]
draft: false
---

現在的 Agent 很能做事，但常常不像真的在生活，比較像在等人按鈴。

你給它任務，它開始思考。你不理它，它就安靜。撞牆了，它才反省。這種模式對 demo 夠用，對很多 workflow 也夠用，可是一旦我們開始談「自主性」，這件事就會變得很尷尬。因為真正的自主，不只是會回應，而是會在對的時候自己切換狀態，知道什麼時候該規劃、什麼時候該回憶、什麼時候該停下來重想。

這篇 Heartbeat-Driven Scheduling 論文想碰的，就是這個空白。

## 為什麼現有 Agent 總有一點被動感

ReAct、Reflexion、Self-Refine 這類框架其實都很有用，但它們的核心節奏大多是反應式的。外面來一個刺激，系統才切到下一步。做錯了，才開始檢討。任務結束了，才順便回顧。

這種控制流沒有錯，只是很像把「思考」當成一個被動服務。可人類不是這樣。人會在走路時突然想起忘了寄信，會在開工前先排優先順序，也會在事情看似還沒出錯時，先感覺哪裡不太對。

論文作者的核心主張很簡單，如果 Agent 要更像一個持續運作的認知系統，它需要一個內部節拍器。不是等事件來了才切換模式，而是自己定期檢查，現在最值得動用哪一種思考模組。

## 所謂心跳，真正改的是控制權

Heartbeat Scheduling Controller 的概念很好懂。系統定期收到一個心跳訊號，每次心跳發生時，不是直接做同一件事，而是先判斷當前狀態，再決定要啟動 Planner、Critic、Recaller 還是 Dreamer。

乍看之下它只是多了一個調度器，但真正的改變在於，控制權從固定流程圖移到了可學習的元認知層。以前是流程先寫好，模型照表操課。現在則比較像，系統先問自己，此刻最需要的是規劃、批判、回憶，還是發散。

## 這跟多加幾個 prompt 有什麼不同

我覺得這篇論文最值得注意的地方就在這裡。很多人看到這種設計，第一反應會是，那不就是多包幾層 prompt 嗎？可差別其實很大。

prompt 是叫模型怎麼想，heartbeat 講的是什麼時候該想什麼。前者是內容層，後者是控制層。這兩層常常被混在一起談，可真正做過長鏈任務的人都知道，決定成敗的往往不是單次推理品質，而是整段過程中，系統有沒有在對的時間做對的認知切換。

換句話說，問題可能從來不是 Agent 不夠聰明，而是沒有一個像樣的作業系統在管理它的聰明。

## 這個方向最迷人的地方，不是結果，而是野心

老實說，這篇論文還沒有拿出那種足以讓整個社群立刻跟進的壓倒性 benchmark。它比較像一個方向性的提案，一個把問題重新命名的嘗試。

但這反而是我喜歡它的原因。它承認了一件很多人都感覺到、卻還沒好好拆開的事，LLM Agent 的瓶頸未必只在模型參數，也在調度架構。你可以一直把模型換得更大、更長、更會用工具，可只要它仍然靠外部刺激來驅動全部認知活動，它就很難真的長成穩定的自主系統。

## 真正的難題其實還在後面

當然，方向好，不代表落地就容易。心跳頻率怎麼設？太密，系統會一直自我打斷；太疏，又回到反應式。調度策略怎麼學？如果歷史資料偏掉，整個元認知層也可能學出奇怪習慣。還有最現實的一題，更多主動思考通常代表更多 token、更多延遲、更多成本，這筆帳怎麼算，論文還沒有完全回答。

所以我不會把它講成現成可部署的配方。它比較像一張新地圖，告訴你現有 Agent 的問題，也許不是行動模組太少，而是缺少一個負責安排這些模組何時出場的內在節奏。

## 我怎麼看這篇研究

如果你把 Agent 當工具，這篇論文可能還不夠立即有用。但如果你在意的是 Agent 能不能從「回應系統」慢慢變成「持續運作的認知系統」，那它非常值得看。

它最有意思的地方，不是把某個模組做得更強，而是把一個長期被忽略的問題推到檯面上，誰來決定 Agent 什麼時候該思考？在這之前，多數系統的答案其實都是，外界決定。Heartbeat scheduling 則把這個決定權慢慢收回系統自己手上。

## 參考連結

- [Heartbeat-Driven Autonomous Thinking Activity Scheduling (arXiv:2604.14178)](https://arxiv.org/abs/2604.14178)
- [Simulating Human Cognition: Heartbeat-Driven Autonomous Thinking (HTML)](https://arxiv.org/html/2604.14178v1)
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366)
- [ACT-R Cognitive Architecture](https://act-r.psy.cmu.edu/)
