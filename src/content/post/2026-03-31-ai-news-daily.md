---
title: "AI 新聞精選｜2026 年 3 月 31 日"
description: "Qwen3.5-Omni 全面超越 Gemini 3.1 Pro、Claude Code 上線 Computer Use、OpenAI 為 Claude Code 推出 Codex 插件歐洲 AI 基礎設施大戰升溫。"
publishDate: "2026-03-31T20:00:00+08:00"
updatedDate: "2026-03-31T12:00:00+08:00"
tags: ["Google", "OpenAI", "Anthropic"]
draft: false
---

## 今日觀察

今天的 AI 產業呈現兩條平行叙事：開源陣營接連發布足以撼動既有格局的多模態模型，基礎設施軍備競賽也在歐洲正式點燃。與此同時，Anthropic 與 OpenAI 這對競爭對手，正在用一種前所未有的方式走向協作——Claude Code 的插件生態系統，已經開始接納 OpenAI 的 Codex。這個訊號，比任何單一模型的發布都更值得關注。

---

## Google — Qwen3.5-Omni 超越 Gemini 3.1 Pro：開源多模態的定義权正在轉移

阿里巴巴 Qwen 團隊正式發布 Qwen3.5-Omni 系列，一口氣帶來 Plus、Flash、Light 三種規格。這款模型的核心能力在於原生统一處理文字、圖片、音頻及音視頻，Thinker 與 Talker 模組均升級為 Hybrid-Attention MoE 架構，context window 擴展至 256K tokens——单轮可處理 3 小時音頻或 1 小時 720P 影片。

真正值得注意的數字是：Qwen3.5-Omni-Plus 在 215 項子任務 Benchmark 上取得 SOTA，通用音頻能力全面超越 Gemini 3.1 Pro，音視頻理解達到 Gemini 3.1 Pro 同等水平。考慮到 Gemini 3.1 Pro 是 Google 當家多模態旗艦，這個對照結果標誌著開源模型陣營不只在追趕，而是在部分維度已經建立了領先。

另一個商業維度的看點是定價：根據橘鸦資訊，Qwen3.5-Omni 的 API 代價約為 Gemini 3.1 Pro 的十分之一。如果這個數字在企業級實際部署中仍然成立，多模態模型的性價比遊戲規則即將被徹底改寫。

---

## Anthropic — Claude Code 上線 Computer Use：桌面 Agent 的最後一塊拼圖

Claude Code 正式面向 macOS Pro 和 Max 計劃用戶推出 Computer Use 研究預覽版。這項功能允許開發者透過 CLI 指令控制屏幕、點擊介面、完成端到端的 GUI 測試——某種程度上，這是桌面 Agent 能力的最終補全：不再只是操作終端，而是能夠像人類一樣操控視窗應用。

与此同时，Claude Code 已全面支援 GitHub Enterprise Server（GHES）。這意味著企業開發者可以直接對自托管倉庫運行非同步工作流，無需將代碼遷移至 github.com。對於有嚴格資料主權要求的大型組織，這是採納 Claude Code 的最後一道門檻被拆除。

開發者社群也在挖掘 Claude Code 的更多潛力。Boris Cherny 分享的一系列高階冷門功能清單值得特別注意：`/loop` 與 `/schedule` 可實現長達一週的任務自動化；`/batch` 結合 `git worktrees` 能將代碼遷移任務分發給數百個並行 Agent；`--bare` 參數可將 SDK 啟動速度提升十倍。這些功能的存在說明，Claude Code 的設計邊界比大多數人認知中的要寬廣得多——它不只是一個 CLI 工具，而是一個可擴展的 AI 軟體開發系統。

---

## OpenAI — 為 Claude Code 推出 Codex 插件：一個時代的終結與開始

OpenAI 官方發布了一款代號 `codex-plugin-cc` 的 Claude Code 插件，允許在 Claude Code 工作流中直接調用 Codex 作為「第二意見」——執行標準代碼審查、對抗性審查，或直接接管任務。

這個發布的戰略意涵超越了技術本身。Anthropic 的 Claude Code 與 OpenAI 的 Codex 是直接競爭關係——兩者都在爭奪 AI 編碼工具市場的主導權。然而 OpenAI 選擇將自己的旗艦產品做成 Claude Code 的插件，而不是打造一個封閉的競品生態，這代表一種務實的市場策略轉向：用接入取代取代，用整合取代競爭。

技術實現也很有趣：該插件封裝了 Codex app-server，直接複用現有的本地認證、配置、環境與 MCP 設定。這意味著 Claude Code 用戶無需重新配置任何東西，裝上插件即可獲得 Codex 的審查能力。OpenAI 這一步，幾乎是在向 Claude Code 用戶喊話：「你不需要離開你的工具，我們可以成為你工作流的一部分。」

---

## 行業動態 — Mistral AI 募集 8.3 億美元：歐洲 AI 基礎設施軍備競賽正式開打

法國 AI 實驗室 Mistral AI 完成 8.3 億美元首次債務融資，由 BNP Paribas、HSBC 等七家銀行聯合提供。這筆資金將專項用於在巴黎南部建設供電容量 44MW 的数据中心，並部署 13,800 塊 Nvidia GB300 GPU。

對比一下這個數字的意義：13,800 塊 GB300 GPU，44MW 供電，2026 年 Q2 末即可投產。Mistral 的目標是 2027 年底在歐洲確保 200MW 容量。這不是一家小型 AI 實驗室的規模擴張，這是歐洲試圖在 AI 基礎設施層面建立戰略自主的直接證明。

值得觀察的是背後的銀行陣容——BNP Paribas 與 HSBC 都不是典型的科技投資者，但他們願意為一個 AI 實驗室的數據中心建設提供債務融資，說明歐洲金融體系已經開始將 AI 基礎設施視為戰略資產而非純商業項目。

---

## 其他值得關注

- **GitHub 遭遇大規模投毒攻擊**：3 月 29-30 日，攻擊者在 WSL、isce-framework 等數百個知名開源項目的 Issues 區創建超過 20 萬條垃圾內容，攻擊速率一度高達每秒 20 條。WSL 項目 Issue 編號從 #14575 暴漲至 #40028。這次攻擊暴露了 GitHub 對抗自動化 bot 的系統性脆弱，也為開源維護者群體敲響了安全警鐘。

---

## 參考連結

- [Qwen AI Blog - Qwen3.5-Omni](https://qwen.ai/blog?id=qwen3.5-omni)
- [OpenRouter - Qwen3.6 Plus Preview](https://openrouter.ai/qwen/qwen3.6-plus-preview)
- [Claude Code Docs - Computer Use](https://code.claude.com/docs/en/computer-use)
- [Claude Code Docs - GitHub Enterprise Server](https://code.claude.com/docs/en/github-enterprise-server)
- [GitHub - OpenAI codex-plugin-cc](https://github.com/openai/codex-plugin-cc)
- [Reuters - Mistral AI $830M debt financing](https://www.reuters.com/business/finance/frances-mistral-raises-830-million-debt-ai-data-centre-build-up-2026-03-30/)
- [GitHub WSL Issue #40028](https://github.com/microsoft/WSL/issues/40028)
