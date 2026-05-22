---
title: "AI 新聞精選｜2026 年 5 月 22 日"
description: "OpenAI、Google 與 Anthropic 今天不約而同把 agent 從功能展示往真實工作環境裡推。"
publishDate: "2026-05-22T12:00:00+08:00"
updatedDate: "2026-05-22T12:03:00+08:00"
tags: ["OpenAI", "Google", "Anthropic", "Codex", "ADK"]
coverImage:
  src: "@/assets/post-covers/2026-05-22-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-05-22"
series: "daily-ai-report"
seriesOrder: 3
draft: false
---

## 今日觀察

5 月 22 日這波消息裡，最有意思的不是哪家公司又多發了一個模型，而是三家一線平台都在補 agent 真正落地時最麻煩的那一層。OpenAI 把 Codex 往手機遙控、SSH 主機與鎖屏電腦操作推進，Google 把 ADK 延伸到 Kotlin 與 Android，Anthropic 則把 Claude 的治理面接進企業既有的安全與稽核系統。

如果把這三件事放在一起看，方向很清楚：2026 年的 agent 競爭，已經不只是回答品質，而是能不能直接吃到現場環境、能不能在裝置端跑起來、能不能被公司安全團隊接受。前一輪大家在比模型會不會做事，這一輪開始比誰先把執行面、部署面與治理面補齊。

---

## 主題一 — OpenAI 想把 Codex 變成你隨手可接回去的工作站

OpenAI 這次更新的重點，在於把 Codex 從「坐在同一台 Mac 前面使用的工具」往「可跨裝置接續的工作環境」推。5 月 22 日的 Codex Remote Connections 文件寫得很直白：手機上的 Codex 可以直接接回一台連線中的 Mac 主機，沿用那台主機上的專案、執行緒、檔案、憑證、外掛、瀏覽器設定與本地工具；如果專案本來就在遠端機器上，則可以再透過 SSH 讓 Codex 直接對遠端檔案系統與 shell 動手。這代表 agent 不再只是把程式碼片段貼來貼去，而是能回到原本那個已經登入服務、已經裝好依賴、已經接上內網的真實環境裡繼續做事。

另一個更關鍵的更新，是 Computer Use 的鎖屏模式。OpenAI 文件說明，當 Mac 螢幕鎖定後，只要是受信任的 active computer use turn，Codex 可以在短暫授權窗口內自動解鎖，但會遮住所有顯示器，偵測到本地鍵盤或滑鼠輸入時又會立刻重新上鎖。這個設計很重要，因為它把「遠端幫我操作桌面」從 demo 級功能，往真正能放心掛在辦公室常駐機器上的流程拉近了一步。對工程師來說，這比單純多一個 slash command 更有差別，因為它解決的是 agent 何時能碰到你真正工作的那台機器。

我自己的判斷是，這比今天一起出現的 Appshots 或 ChatGPT for PowerPoint 測試版更有長期影響。後兩者是在擴張輸入輸出介面，Remote Connections 與 locked computer use 則是在擴張 agent 的作業邊界。只要這條線穩下來，未來大家對「Codex 能做什麼」的想像，會從幫你改一個 repo，慢慢變成幫你接手整個工作台上的一段真實流程。

---

## 主題二 — Google 把 agent runtime 往 Android 裝置端壓過去

Google 在 2026 年 5 月 21 日發布 ADK for Kotlin 與 ADK for Android 0.1.0，訊號同樣很強。官方部落格明講，ADK for Kotlin 針對後端與一般 Kotlin 專案，ADK for Android 則是專門替裝置端 agent 做優化；同時 Google 也再次強調，Gemini Nano 已經可用於超過 1.4 億台 Android 裝置。這不是單純把一套 server-side agent framework 多包一個語言 SDK，而是在宣告 mobile agent 會是一條獨立產品線。

這版 ADK 最值得看的是混合式編排。Google 的範例不是把所有事都丟給雲端模型，而是讓雲端 orchestrator 負責理解任務，再把文件擷取、資料比對或順序工作交給裝置端 sub-agent。官方也把依賴寫得很具體，像 Android 版核心套件就是 `com.google.adk:google-adk-kotlin-core-android:0.1.0`，能力清單則包含 session state、memory service、OpenTelemetry、MCP tools 與 plugin 支援。這代表 Google 想做的不只是「手機上可以跑個小模型」，而是一套真的能在 Android app 裡維持 agent 狀態、工具調用與觀測能力的 runtime。

這件事現在重要，是因為 Google 終於把「裝置端隱私」和「多 agent 協作」放進同一條敘事裡。過去大家談 on-device AI，常停在離線摘要、鍵盤補全或小型分類器；這次 ADK for Android 的方向比較像是，讓敏感資料留在本機，讓重推理或跨服務協調留在雲端。這比單純強調某顆手機 NPU 更實際，因為它回答的是工程團隊真正會問的問題：哪些資料不能離開裝置、哪些步驟可以交給雲端，以及兩邊怎麼共享上下文而不把系統做爛。

---

## 主題三 — Anthropic 補上的不是新模型，而是企業最在意的治理層

Anthropic 在 2026 年 5 月 21 日推出的是另一條完全不同、但同樣關鍵的路線。Claude 的新公告把重點放在 Compliance API 與 28 個安全與合規整合上，包含 CrowdStrike、Datadog、Okta、Microsoft Purview、Wiz、Zscaler 等常見企業供應商。官方說明也很具體：這個 API 一方面提供 Claude Enterprise 的對話內容、上傳檔案與專案資料，讓管理員可以套用既有的 DLP、監控與稽核政策；另一方面提供橫跨 Claude Enterprise 與 Claude Platform 的活動事件，像登入、管理動作與設定變更，讓安全團隊能在同一套看板裡看完整個組織怎麼使用 Claude。

這類更新表面上不像模型發布那麼熱鬧，但對大公司採用速度的影響通常更直接。很多企業不是不知道 agent 有用，而是不敢讓它碰內部資料，因為一旦進了法遵、資安或 eDiscovery 流程，沒有統一事件流與資料出口，就等於不能上正式環境。Anthropic 這次做的，其實是把 Claude 從「一個很會回答的產品」往「可以被現有治理框架接管的企業系統」推。當 Claude 的聊天、檔案與管理事件都能流進既有的安全平台，阻力會明顯下降。

如果把 OpenAI、Google、Anthropic 這三條線放在一起看，我會說它們剛好補齊了 agent 落地的三個角。OpenAI 在擴張執行面，Google 在擴張 runtime 與部署面，Anthropic 在擴張治理面。這也是今天最值得記住的地方：真正的競爭已經從模型本身，轉到誰能把 agent 放進一個團隊每天真的敢用、能用、也管得住的工作系統。

---

## 其他值得關注

- **DeepSeek 更新 API 限流規則**：`deepseek-v4-pro` 與 `deepseek-v4-flash` 的並發上限分別寫成 500 與 2500，還新增 `user_id` 隔離，這對多租戶服務與快取調度都很實際。
- **OpenClaw 2026.5.20 發版**：這版不只把 bundled Codex harness 升到 `@openai/codex 0.132.0`，也補了 Policy plugin、xAI device-code OAuth，以及多個 cron 與 agent 穩定性修正。
- **MiniMax Agent 接上 Perplexity Search**：這種整合看起來像小更新，實際上是在補 agent 最弱的外部檢索層，代表產品方開始直接把搜尋能力當成 agent 標配。

---

## 參考連結

- https://imjuya.github.io/juya-ai-daily/issue-98/
- https://developers.openai.com/codex/remote-connections
- https://developers.openai.com/codex/app/computer-use
- https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/
- https://github.com/google/adk-kotlin/tree/main/internal/examples
- https://claude.com/blog/compliance-api-security-partners
- https://platform.claude.com/docs/en/manage-claude/compliance-api
- https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit
- https://github.com/openclaw/openclaw/releases/tag/v2026.5.20
