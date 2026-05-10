---
title: "【熱門專案】2026-05-11 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：9Router、GenericAgent、oMLX 三款開發者必備工具"
publishDate: "2026-05-11T07:30:00+08:00"
updatedDate: "2026-05-11T07:33:00+08:00"
tags: ["GitHub", "9Router", "GenericAgent", "oMLX", "open source", "開發工具"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-11-github-trending-daily.png"
  alt: "GitHub 熱門專案｜2026-05-11"
---

今天的 GitHub Trending 出現好幾個「幫開發者省錢 / 省麻煩」的工具。從免費的 API 路由器到本地端的 LLM 推理伺服器，再到能自己長出技能的 Agent 框架，2026 年的開發工具正在往「免費 + 本地 + 自演化」三個方向走。

## decolua/9Router — 免費 API 路由器

如果你每個月都在付 Claude Code 或 Cursor 的訂閱費，9Router 值得試試。它是一個本地端的中介層，可以把 Claude Code、Codex、Cursor、Cline 這些主流 AI Coding Tool 全部接上一個「智慧路由器」，自動在 40 多個 Provider 之間切換。

核心功能有三個：第一是 RTK Token Saver，會自動壓縮 tool_result 的內容，最多幫你省 20-40% 的 token，用愈多工具的話省得愈多。第二是 Auto-fallback，當你的主要訂閱帳戶用完了，自動切到便宜方案，最後切到免費方案，中間不會斷線。第三是多帳號 round-robin，如果你有好幾個帳號，它會輪流用，不會一次就把某個帳號額度撞爆。

目前支援的免費 Provider 包括 Kiro AI（有免費的 Claude）、OpenCode Free、以及 Vertex AI 的 $300 額度。設定也很簡單：全域安裝後開 Dashboard，連上你想用的 Provider，然後把你的 AI Tool endpoint 指到 `http://localhost:20128/v1` 就完成了。

實際用起來會是這樣：當你用 Claude Code 寫程式時，9Router 偵測到你的 API Key 額度即將用完 → 自動切到 Kiro → 寫到一半的程式繼續跑，中間不需要你動手切換。這對長期需要大量 AI 輔助的工程師來說，是省錢兼省心的組合。

## lsdefine/GenericAgent — 會自己長技能的 Agent

GenericAgent 是一個「自演化」Agent 框架，核心只有約 3,000 行代碼。一般的 Agent 框架是先把所有技能預先寫好放進去，但它不是 —— 它讓 Agent 在每次解決新任務的過程中，自動把「怎麼解決的」結晶成一支 skill，下次遇到類似的任務就直接叫出來用。

這個概念叫「技能樹成長」：一開始你可能只有 9 個原子工具（瀏覽器、Terminal、檔案系統、鍵盤滑鼠控制、螢幕截圖、ADB 等），每次叫它做一件事 — 例如「帮我查微信訊息」— 它會自己安裝依賴、寫腳本、debug、驗證，然後把整個流程存成一條 skill。下次再叫它做類似的事，一行指令就解決。

技術上它的設計哲學是「不要預裝技能，而是讓它自己長」。這和傳統的 Tool-use Agent 有本質差別：傳統 Agent 是你给它工具，它照著步驟做；GenericAgent 是你给它一個目標，它自己探索、犯錯、學會、然後把學到的寫進記憶體。根據 arXiv 上的技術報告，它在某些場景下的 token 消耗只有傳統方法的六分之一。

現在它已經長出不少技能：幫你叫外賣、篩選股票、自動瀏覽網頁、抓 Alipay 消費紀錄等。理論上用愈久，這棵技能樹就長得愈大，最後變成完全屬於你個人的 Agent。

## jundot/omlx — Apple Silicon 本地 LLM 推理伺服器

如果你有一台 M 系列的 Mac，想在本地跑自己的 LLM 來搭配 Claude Code 或 OpenClaw，oMLX 是目前最完整的解決方案之一。它是一個本地的 LLM 推理伺���器，專門為 Apple Silicon 最佳化，最大特點是可以把 KV Cache 分成兩層：熱的放在 RAM（常用區塊），冷的放在 SSD。

這個設計來自 vLLM 的概念，但针对本地端優化：當對話很長的時候，過去的 Context 會佔用大量 VRAM，限制了可以跑的模型大小。oMLX 把不常用的 Cache 區塊搬到 SSD，需要的時候再讀回來，等於把 VRAM 的空間讓出來給更大的模型用。而且即使伺服器重啟，這些 SSD 上的 Cache 會保留，不需要重新算過。

安裝很簡單：下載 DMG、拖到 Applications，然後打開 App 就有 GUI 可以管理模型。它支援 text LLM、VLM（視覺語言模型）、OCR 模型、embedding 和 reranker，全部可以透過 continuous batching 來跑。GUI 裡有 Web UI 可以監控、聊天、改每個模型的設定。

如果要和 OpenClaw、OpenCode 或 Codex 整合，只要把 API endpoint 設成 `http://localhost:8000/v1` 就行了。它會自動發現你放在 model 目錄底下的模型，而且支援 mlx-lm 的 BatchGenerator 來處理並發請求。

對開發者來說，這意味著可以在自己的 Mac 上跑一個 70B 參數的模型放到 SSD 上，用的時候熱插進 VRAM，同時不影響系統的其他工作。

## 結語

這三個專案的共同點很清楚：它們都在幫開發者「把 AI 能力的成本壓下來」。9Router 讓你少付訂閱費、GenericAgent 讓 Agent 自己長技能省去每次從頭教、oMLX 讓你在家裡的 Mac 上跑原本要花大錢租伺服器的 LLM。開發工具的趨勢正在從「功能導向」轉向「成本與維護導向」—— 不僅要好用，還要夠便宜、夠安靜。

如果你是每天都會用到 AI Coding Tool 的工程師，這三個都可以直接裝來試試。

## 參考連結

- [9Router 官方 Repo](https://github.com/decolua/9router)
- [GenericAgent 技術報告 (arXiv)](https://arxiv.org/abs/2604.17091)
- [GenericAgent 官方 Repo](https://github.com/lsdefine/GenericAgent)
- [oMLX 官方 Repo](https://github.com/jundot/omlx)
- [oMLX Benchmarks](https://omlx.ai/benchmarks)