---
title: "【技術解析】OpenAI Workspace Agents 底層與 WebSocket 延遲戰"
description: "ChatGPT Workspace Agents 不只是把 GPTs 改名，底層藏著一場 API 延遲戰。OpenAI 怎麼把 Codex agent loop 變快 40%，以及為什麼她們寧可犧牲一點效能也要保留開發者熟悉的 API shape。"
publishDate: "2026-04-23T15:00:00+08:00"
updatedDate: "2026-04-23T15:06:00+08:00"
tags: ["OpenAI", "Workspace Agents", "WebSocket", "Codex", "Responses API"]
draft: false
---

OpenAI 今天在 ChatGPT 裡上線了「Workspace Agents」。名字很響，但它本質上是一次回答一個問題：當 AI 要變成團隊裡真正的同事，而不只是一個幫你寫郵件的工具，它需要的技術底層是什麼？

這個問題看似直白，但答案藏細節。

## 從「幫你做事」到「替你的團隊做事」

大多數人用 AI 的方式到目前為止都是一次性的：你給它一個 prompt，它回你一段文字。雙方共享的上下文只在那一個來回裡，結束就結束。

Workspace Agents 想處理的問題是：組織內真正重要的工作不是一次性的——它會重複、會跨系統、會需要審核、把關、和後續追蹤。銷售團隊每週要整理陌生拜訪的回饋，IT 部門每天要處理員工的軟體申請，財務月底要對帳。這些工作不只要求 AI 會做事，還要求它能在一組確定的工具、政策、和審批流程裡持續做事。

所以 Workspace Agents 補了三樣東西：觸發條件（例如每週五早上）、處理工序（把饋料分類然後寫進 CRM）、以及工具連結（讓 agent 能真的讀Slack、查 CRM、更新狀態）。這聽起來像把傳統工作流重新發明一遍——事實上也確實是，只是這次是由一個大語言模型來詮釋每一個步驟之間的判斷。

OpenAI 在官方文件裡說得很坦白：OpenAI 自己內部已經有人在跑了，Sales 團隊的 agent 每週幫每個業務省下五到六個小時。這個數字不誇張，但重點不在節省的時數，在於這個 workflow 以前是需要工程團隊建 CRM webhook + Zapier + 人力才能串起來的自動化，現在變成業務自己用自然語言描述就能架構出來。

## 真正讓 AI agent 變慢的原因，不是推理

如果只是把 workflow 包裝成自然語言介面，技術含量其實不高。真正有意思的問題在 OpenAI 同步公開的那篇 WebSocket 技術文：Speeding up agentic workflows with WebSockets in the Responses API。

這篇文章交代了一個很具體的測量：GPT-5 和 GPT-5.2 跑出大約 65 tokens per second（TPS）。他們想在 Codex 這個 coding agent 場景裡做到 1,000 TPS——十倍提升。這個速度是透過專門最佳化過的 Cerebras 硬體實作的。

問題來了：即使 Cerebras 把模型推理變快了，API 的オーバーヘッド（overhead）——那些在 GPU 實際跑模型之外，每次 request 來回之間要處理的驗證、快取、更新對話狀態——這些東西本來埋在推理時間的陰影裡不太明顯，現在推理變快了，オーバーヘッド 的佔比就整個浮上來。

用數字說明：最佳化後，API 的 time-to-first-token（TTFT，從發出請求到模型開始吐第一個 token 的時間）已經有約 45% 的改善。但相對於 1,000 TPS 的目標，這些改善遠遠不夠。原因是結構性的：HTTP request-response 的來回模式，每個步驟都要重新建立連線、傳送完整對話歷史、做一次完整的狀態重建。當 Codex 要對一個大型程式碼庫做跨數十個步驟的分析時，這個代價會累積到幾分鐘。

## 兩個設計方向，以及最後選的那個

團隊一開始有兩個候選方向：gRPC bidirectional streaming，以及 WebSocket。最後選擇了 WebSocket，理由表面上很簡單：它是個「簡單的消息傳輸協定」，不需要改 Responses API 的 input/output shape。開發者可以把 WebSocket 支援直接接進去，不需要因為傳輸層的改變而重寫 API 包裝邏輯。

但真正推動最後決策的，是一個內部原型帶來的教訓。

團隊一開始做了一個「更乾淨」的設計：把 agent 的整個 rollout 建模成一個「單一長期運行的 Response」，用 asyncio 讓 Responses API 在 model sampling 迴圈裡等到 tool call 被執行完才繼續。模型 tooling 執行時，inference 迴圈被 block，等客戶端把執行結果送回來，才把結果寫進模型 context，然後繼續 sampling。

這個設計的效率提升極為顯著，因為所有重複的 API 工作（狀態驗證、token 渲染、政策檢查）都只用在 rollout 一開始處理一次，中間的 tool execution 時間則完全不需要和 API 互動。用 OpenAI 文件裡的比喻：把本地端的 tool call 當成一個遠端 tool call 來處理，只是不是真的打去遠端服務，而是把 tool call 的請求透過 WebSocket 送回客戶端，執行完後再送回來。

問題在於這個設計出來的 API shape 太陌生了——它要求開發者圍繞一個全新的互動模式重構整個 API 整合邏輯。最後團隊決定犧牲一點點效率，把形狀壓回開發者熟悉的 `response.create` + `previous_response_id`：WebSocket 連線只是在伺服器端維護一個連線範圍內的 in-memory cache，用來存放前一版 response 的狀態——包含 prior input/output items、tool definitions、之前渲染過的 tokens——然後在下一個 `response.create` 收到 `previous_response_id` 時，直接從 cache 取用，而不是重新從零建立。

這個 cache 的效果是：安全分類器不需要每次都對完整歷史重新跑、已經渲染過的 tokens 可以直接 append 而不需要重新 tokenize、billing 資訊可以和下一個 request 重疊執行。這些優化加總，讓 alpha 使用者回報了最高 40% 的 agentic workflow 延遲改善。

## 為什麼這個選擇值得在意

40% 這個數字放在實際的 coding agent 場景裡，代表的意義是：原本 Codex 要花三分鐘完成的程式碼修改任務，現在大概兩分鐘不到。對一個要跑幾十個來回的任務來說，這個改善幅度影響的是使用者的實際等待感受，而不只是 benchmark 分數。

但這個故事真正值得記錄的，是那個「被犧牲的乾淨原型」背後的工程判斷。原型設計在技術上更乾淨——一個真正的 single-long-running-response 模型，讓整個 agent loop 的狀態管理一次搞定。但這個設計的代價是 API interface 的陌生度：要所有開發者或所有整合方都為了一個傳輸層最佳化去改自己的架構，阻力太大。

OpenAI 最後的決定是：保留大家熟悉的 API shape，用一個連線範圍內的 in-memory cache 來吸收大部分的效率損失。代價是少了一點點效能，換來的是更大的採用率。這個交換在他們的處境裡是合理的——OpenAI 作為平台，最大公約數的開發者成本比極致效能最佳化更重要。

相對的，如果是一個內部系統、或是像 Cursor/Windsurf 這類的 coding agent 新創，她們的取捨可能就會相反——她們沒有平台包袱，願意為了一點效能犧牲通用性。

## 對開發者的實際影響

Workspace Agents 本身提供的價值是清楚的：把組織內部的重複性工作自動化，而且讓沒有工程背景的人也能自己架構 workflow。從產品角度，這是 AI 應用滲透進企業流程的關鍵一步。

但對於在技術層面關注 OpenAI 動態的工程師，這個 WebSocket 最佳化可能是更值得追的東西。它透露的趨勢是：當推理速度持續加快，API overhead 會變成下一個瓶頸。這個瓶頸不是靠更好的 GPU 能解決的——它需要傳輸層、狀態管理、和 API 設計層面的重新思考。

GPT-5.3-Codex-Spark 在 Cerebras 硬體上跑到 1,000 TPS，這個數字讓過去需要好幾秒的 multi-turn agent 互動，變成接近即時。支撐這個速度的，除了模型本身的優化，還有 WebSocket 持久連線加上 cache-aside 狀態管理這套組合。這個架構模式未來很可能會被更多提供 agentic API 的廠商參考。

---

## 參考連結

- [Introducing workspace agents in ChatGPT](https://openai.com/index/introducing-workspace-agents-in-chatgpt/)
- [Speeding up agentic workflows with WebSockets in the Responses API](https://openai.com/index/speeding-up-agentic-workflows-with-websockets/)
- [Workspace agents | OpenAI Academy](https://openai.com/academy/workspace-agents)
- [Anthropic tested removing Claude Code from the Pro plan - Ars Technica](https://arstechnica.com/ai/2026/04/anthropic-tested-removing-claude-code-from-the-pro-plan/)
