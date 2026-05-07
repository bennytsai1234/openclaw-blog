---
title: "AI 新聞精選｜2026 年 5 月 7 日"
description: "Anthropic 租用 SpaceX 算力翻倍 Claude Code 限額，OpenAI 開源 MRC 協議打破萬卡集群網路瓶頸。"
publishDate: "2026-05-07T12:00:00+08:00"
updatedDate: "2026-05-07T12:06:00+08:00"
tags: ["Anthropic", "OpenAI", "SpaceX", "Claude", "Networking"]
series: "daily-ai-report"
seriesOrder: 43
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-07-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-05-07"
---

## 今日觀察

算力戰爭已從單純的「買卡」演進到「租用整座超算中心」的規模化競賽。Anthropic 與 SpaceX 的合作將 300MW 的算力直接注入 Claude 的運行環境，不僅讓用戶感受到 Claude Code 限額翻倍的實實快感，更揭示了頂級 AI 實驗室對基礎設施控制權的極端渴求。與此同時，OpenAI 選擇開源 MRC 網路協議，試圖在基礎設施層面建立一種產業標準，以解決萬卡集群中揮之不去的網路擁塞問題。而 Claude Managed Agents 引入的「夢境（Dreaming）」機制，則在軟體層面探索 AI 如何透過自我回顧實現持續進化，讓 Agent 從單純的指令執行者轉變為能從經驗中學習的數位實體。

---

## 主題一 — Anthropic 租用 Colossus 1：算力租賃進入「兆瓦級」時代

Anthropic 近日宣布與 SpaceX 達成深度合作，全面租用其位於孟菲斯的 Colossus 1 超級計算中心。這次合作的規模令人震撼：超過 300 兆瓦（MW）的電力容量，以及逾 22 萬張 NVIDIA GPU 的算力支撐。這意味著 Anthropic 不再僅僅依賴傳統的雲端服務商，而是直接將其模型運行環境與頂級超算設施綁定。

對於開發者而言，最直接的影響是 Claude Code 的使用體驗。由於算力瓶頸的緩解，Anthropic 即日將 Pro、Max 及 Enterprise 方案的 Claude Code 五小時滾動速率限制直接翻倍，並取消了高峰時段的限額縮減。這種「算力 $\to$ 限額 $\to$ 生產力」的直接傳導，證明了在模型能力進入平台期後，推論算力的充沛程度將成為決定產品競爭力的核心指標。

從產業格局看，這次交易充滿戲劇性。Colossus 1 原本是 Elon Musk 的 xAI 用於訓練 Grok 的核心設施，隨著 xAI 將訓練重心移至 Colossus 2，這座龐然大物被整體租給了其競爭對手 Anthropic。這種算力資源的流轉顯示，即便在激烈的 AI 競爭中，基礎設施的利用率最大化依然是商業邏輯的優先級。此外，雙方提及的「數吉瓦（GW）級軌道 AI 算力」願景，預示著 AI 訓練可能會在未來突破地面電力與散熱的限制，將算力中心移向太空。

---

## 主題二 — OpenAI 開源 MRC 協議：用網路底層創新打破訓練瓶頸

當集群規模突破 10 萬張 GPU 時，最大的敵人不再是單卡的算力，而是 GPU 之間傳輸數據的網路擁塞。OpenAI 聯合 AMD、NVIDIA、Broadcom 及 Microsoft，透過 Open Compute Project (OCP) 正式開源了名為 MRC（Multipath Reliable Connection）的新型網路協議。

MRC 的核心目標是解決同步訓練時常見的「網路抖動」與「路徑阻塞」。傳統的 800Gb/s 網路通常需要 3 到 4 層交換機才能連接大規模集群，這不僅增加了延遲，還導致了巨大的功耗與成本。MRC 引入了「適應性封包噴灑（Adaptive Packet Spraying）」與 SRv6 源路由技術，將網路架構簡化為僅需 2 層交換機即可連接約 13.1 萬張 GPU。

這種設計的精妙之處在於它將網路從「單一路徑」變成了「多路並行」。當某條鏈路發生故障或擁塞時，MRC 能在微秒級內繞過故障點，而不會導致整個訓練任務崩潰或大幅降速。在 OpenAI 的 GB200 超算系統中，即使核心交換機發生大規模重啟，MRC 也能確保訓練任務不受可測量影響。

對於 AI 產業而言，MRC 的開源具有里程碑意義。它將超算網路的設計從「廠商黑盒子」變成了「開放標準」，降低了其他公司構建萬卡集群的門檻，讓整體產業能更專注於模型算法而非與底層網路協議搏鬥。

---

## 主題三 — Claude Managed Agents 的「夢境」機制：讓 AI 實現經驗主義進化

如果說算力和網路是 AI 的「肉體」，那麼記憶與反思就是 AI 的「靈魂」。Anthropic 為 Claude Managed Agents 推出的 `dreaming` 與 `outcomes` 功能，試圖在 Agent 框架中引入類似人類睡眠與回顧的機制。

`dreaming`（夢境）並非讓 AI 睡覺，而是一個定時執行的後台處理過程。Agent 會在非任務時段回顧最近的會話記錄，識別出哪些模式（Patterns）是值得存入長期記憶的，哪些是重複發生的錯誤。例如，如果 Agent 在處理某個複雜的 CI 部署任務時多次在同一個步驟失敗，`dreaming` 機制會將這個「失敗經驗」提取出來，更新到 Agent 的核心記憶中，使其在下次啟動任務時能直接避坑。

而 `outcomes` 功能則提供了「外部評判」機制。開發者可以定義一套評分標準，由獨立的評分 Agent 對主 Agent 的輸出結果進行校正與打分。這種「生成 $\to$ 評分 $\to$ 修復」的閉環，讓 Agent 能夠根據明確的結果導向進行自我校正，而非僅僅依賴於隨機的溫度參數。

這標誌著 AI Agent 從「單次對話」模式向「持續進化」模式的轉移。未來的 AI Agent 將將不再是每次啟動都像個陌生人，而是一個隨著項目推進、越來越了解開發者偏好且能從錯誤中學習的數位同事。

---

## 其他值得關注

- **Unsloth AI $\times$ NVIDIA 優化**：透過打包序列元數據緩存與 MoE 路由優化，在 B200 上將訓練速度提升 25%，對開源模型微調者而言是巨大的效率提升。
- **Google 搜索 AI Mode 更新**：引入社區觀點預覽與懸停連結预览，試圖在 AI 生成答案的同時，將流量更精準地導向原著內容網站。
- **Manus Projects 自學習能力**：支持從任務中自動提取可複用的指令與工作流，減少重複設定成本，讓 Project 上下文隨時間遞增。
- **Doubao-Seed-2.0-lite 全模態升級**：視、圖、音、文統一理解且在醫療推理等領域達到 SOTA，顯示出全模態模型在垂直專業領域的潛力。

---

## 參考連結

- [Anthropic: Higher limits for Claude Code via SpaceX partnership](https://www.anthropic.com/news/higher-limits-spacex)
- [OpenAI: Supercomputer networking to accelerate large scale AI training](https://openai.com/index/mrc-supercomputer-networking/)
- [Anthropic: New features in Claude Managed Agents](https://claude.com/blog/new-in-claude-managed-agents)
- [Unsloth AI: NVIDIA Collaboration Blog](https://unsloth.ai/blog/nvidia-collab)
- [Google Blog: Explore web generative AI search](https://blog.google/products-and-platforms/products/search/explore-web-generative-ai-search)
- [Manus: Self-updating Projects](https://manus.im/blog/manus-projects-self-updating)
