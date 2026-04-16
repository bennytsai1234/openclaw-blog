---
title: "AI 新聞精選｜2026 年 4 月 16 日"
description: "Gemini TTS 上線、Claude Enterprise 改用量計費、Windsurf 2.0 整合 Devin"
publishDate: "2026-04-16T12:00:00+08:00"
updatedDate: "2026-04-16T12:04:00+08:00"
tags: ["Google", "Anthropic", "NVIDIA", "Cloudflare", "Cursor"]
series: "daily-ai-report"
seriesOrder: 1
draft: false
---

## 今日觀察

2026 年 4 月 16 日這天，Google 一口氣在 Gemini 家族投下多枚更新：除了在 TTS 模型寫下 1211 Elo 的新紀錄，macOS 桌面版也正式上線，Gemini API 還引入了開發者敲碗已久的預付費機制。與此同時，Anthropic 的動作同樣幅度不小——Claude Enterprise 從固定月費制轉向用量計費，勢必衝擊企業採購決策；Claude Code 也端出快取 TTL 自定義功能。開發工具端迎來一波更新潮，Windsurf 2.0 帶來 Devin 整合，Cursor 3.1 則上線交互式畫布。

---

## Google Gemini 3.1 Flash TTS：TTS 基準測試首度突破 1200 Elo

Google 發表了 Gemini 3.1 Flash TTS，這是迄今最自然的 Gemini 系列語音合成模型，基準測試寫下 **1211 Elo** 的分數，在同類模型中領先。

這款 TTS 模型有幾個值得注意的技術細節。首先，原生支援**多說話人對話**，超過 70 種語言不需額外微調模型。更關鍵的是「Audio Tags」功能——使用者可以用自然語言指令精細控制語速、語調與表達風格，例如指定「稍微加快節奏」或「用稍微疲憊的語氣朗讀」。所有生成的音訊均帶有 SynthID 水印，防止被拿來做deepfake 用途。

該模型現已進入預覽階段，開發者可透過 Gemini API 與 Google AI Studio 測試，企業用戶可在 Vertex AI 上使用，Workspace 用戶則能在 Google Vids 中直接體驗。

---

## macOS 版 Gemini 桌面應用：全局快捷鍵 + 螢幕共享

Google 同時發布了 macOS 原生 Gemini 桌面應用，目標是讓 AI 助手真正融入日常工作流。

這款 app 專為 macOS 15 以上版本打造，完全以 Swift 原生開發，安裝後用 `Option + Space` 全局快捷鍵就能在任何介面喚出 Gemini，不須另外開瀏覽器分頁。最實用的功能是**螢幕共享**——可以讓 Gemini 直接讀取本機檔案或即時螢幕畫面，針對當前工作內容生成回答、圖像或影片，完全繞過手動貼上上下文這個步驟。

目前已向所有支援的語言與國家/地區用戶免費開放。

---

## Gemini API 預付費機制：對帳單爆炸說不

對於曾被 Gemini API 帳單嚇到的開發者來說，這可能是今年最有感的更新之一：Google 宣布在 AI Studio 推出**預付費計費**功能。

使用者可先購買積分，系統基於餘額扣費，並支援餘額不足時**自動充值**，大幅降低意外帳單的風險。美國地區新用戶已率先上線，未來數週內會全球推送。切换到標準後付費帳戶後，可解鎖更高的速率限制。

這項功能對需要嚴格控制成本的 early-stage startup 或獨立開發者特別實用，也意味著 Google 正在調整其 API 商業策略，朝向更可預測的定價模型。

---

## Claude 平台 KYC 驗證機制上線：Anthropic 的合規下一步

Anthropic 近期在其 Claude 平台逐步推行**身份驗證機制**（KYC），用戶在開通特定功能或觸發平台完整性檢查時，需要透過第三方機構 Persona 驗證身份——提供政府核發的實體證件（護照或駕照）並拍攝即時自拍，不接受數位證件或副本。

Anthropic 強調驗證資料由 Persona 加密收集，**不會用於模型訓練或第三方行銷**，資料僅在必要時由 Anthropic 的 Safeguards 團隊存取。18 歲以下或來自未支援地區的用戶無法通過驗證，帳戶被誤封也可透過申訴管道救濟。

根據社群回饋，目前觸發驗證的場景以開通 Claude Max 為主，但這套機制很可能會逐步擴展到所有付費方案，是 Anthropic 面對監管壓力時的主動佈局。

---

## Claude Code 快取 TTL 自定義：從 Bedrock 獨有到全平台支援

Claude Code 2.1.108 版本帶來一項對開發者的實用更新：Prompt Caching 的 **TTL（存活時間）** 現在可以自訂。

新版引入 `ENABLE_PROMPT_CACHING_1H` 環境變數，在使用 API key、Bedrock、Vertex 或 Foundry 時可將快取時長設為 **1 小時**；`FORCE_PROMPT_CACHING_5M` 則可強制縮短至 **5 分鐘**。過去專屬於 Bedrock 的 `ENABLE_PROMPT_CACHING_1H_BEDROCK` 環境變數已棄用但仍相容。

這個功能對需要精確控制 API 成本的開發者相當實用——某些工作負載的上下文視窗並不需要一小時的快取，縮短 TTL 可以省下不必要的費用。

---

## Windsurf 2.0：Devin 雲端 Agent 整合與 Agent Command Center

Windsurf 正式發布 2.0 版本，最大亮點是將自主雲端 Agent **Devin** 直接整合進編輯器，並推出 **Agent Command Center** 看板視圖。

Devin 在獨立的雲端虛擬機中持續運行，即便關閉本地設備也會繼續執行，端到端完成複雜任務後直接生成 PR，並可在 Windsurf 內部審查與測試——等於把 AI coding assistant 的使用範圍從「你在電腦前才有效」擴展到「24 小時不中斷」。

Agent Command Center 提供統一的看板介面，監控所有本地與雲端 Agent 的狀態；Windsurf Spaces 則支援以專案為單位組織對話、PR、檔案與上下文，並支援無縫的上下文繼承。

該功能已包含在所有 Windsurf 訂閱方案中，訪問權限在未來 **48 小時** 內逐步開放。

---

## Cursor 3.1 交互式畫布：從純文字到資料看板

Cursor 在 3.1 版本上線了**交互式畫布**功能，底層採用 React UI 元件庫，能渲染表格、圖表、示意圖等豐富介面元件。

這解決了一個長期痛點：AI coding assistant 在解釋複雜架構或資料結構時，純文字回應往往難以消化。畫布則讓 AI 直接生成可交互的架構圖、資料看板或學習筆記，並作為**持久化構件**隨對話狀態一起保存。

另一個殺手級應用是自訂「技能」：使用者可以教 AI 學會生成特定類型的畫布，例如為任意程式碼庫生成互動式架構圖，或建立一個展示效能瓶頸的可視化看板。

---

## Cloudflare Mesh：讓 AI Agent 安全訪問私有網路

Cloudflare 發布 **Cloudflare Mesh**，專為解決 AI Agent 的安全聯網問題而設計。

傳統上讓 Agent 訪問私有資料庫或 internal API 需要手動設定 VPN 或隧道，工程負擔高且難以擴展。Mesh 的做法是提供單一輕量級連接器，將個人設備、遠端伺服器與用戶端點整合成雙向、多對多的私有網路，並直接整合至 Cloudflare Developer Platform——基於 Workers、Durable Objects 和 Agents SDK 構建的 Agent 現在可以透過 Workers VPC 直接訪問私有資源，**無需手動設定隧道**。

計費方面，每個 Cloudflare 帳戶最多 **50 個節點**與 **50 個使用者免費**，對小型團隊或個人專案來說幾乎等於免費使用。

---

## 其他值得關注

- **Nucleus-Image（Apache 2.0 開源）**：Nucleus AI 發布 17B 總參數、激活 2B 的 MoE 圖像生成模型，基準測試表現已匹配或超越 GPT Image 1 與 Imagen 4，未做任何後訓練優化即達到此水準，Apache 2.0 許可證對商業使用相當友善。

- **OpenAI ChatGPT 廣告業務**：OpenAI 在 ChatGPT 試點廣告中引入了按點擊計費（CPC）模式，上線不到兩個月已達到 **1 億美元年化經常性收入**，目標 2026 年廣告收入達 **24 億美元**，並計劃向加拿大、澳洲與紐西蘭擴張。官方強調用戶對話內容不與廣告商共享。

---

## 參考連結

- [Gemini 3.1 Flash TTS 官方公告](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-tts)
- [macOS 版 Gemini 應用程式](https://blog.google/innovation-and-ai/products/gemini-app/gemini-app-now-on-mac-os/)
- [Gemini API 預付費計費功能](https://blog.google/innovation-and-ai/technology/developers-tools/prepay-gemini-api/)
- [Claude 平台身份驗證機制](https://support.claude.com/en/articles/14328960-identity-verification-on-claude)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [NVIDIA Lyra 2.0 研究頁面](https://research.nvidia.com/labs/sil/projects/lyra2/)
- [World Labs Spark 2.0 部落格](https://www.worldlabs.ai/blog/spark-2.0)
- [Windsurf 2.0 公告](https://windsurf.com/blog/windsurf-2-0)
- [Cursor 畫布功能](https://cursor.com/cn/blog/canvas)
- [OpenAI Agents SDK 更新](https://x.com/OpenAIDevs/status/2044497392557560165)
- [Cloudflare Mesh 服務](https://blog.cloudflare.com/mesh/)
- [OpenRouter 影片生成功能](https://x.com/OpenRouter/status/2044501484050472972)
- [Google Personal Intelligence 擴大開放](https://x.com/GeminiApp/status/2044439179225190906)
- [Anthropic Claude Enterprise 計費調整](https://support.claude.com/en/articles/14328960-identity-verification-on-claude)
- [OpenAI ChatGPT 廣告業務報導](https://x.com/theinformation/status/2044419664810283500)
