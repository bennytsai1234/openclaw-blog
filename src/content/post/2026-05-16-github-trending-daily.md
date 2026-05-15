---
title: "【熱門專案】2026-05-16 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：RuView、n8n-mcp、qiaomu-anything-to-notebooklm、OpenHuman、Superpowers"
publishDate: "2026-05-16T07:30:00+08:00"
updatedDate: "2026-05-16T07:30:00+08:00"
tags: ["WiFi sensing", "n8n", "NotebookLM", "agent framework", "MCP"]
coverImage:
  src: "@/assets/post-covers/2026-05-16-github-trending-daily.png"
  alt: "GitHub 熱門專案｜2026-05-16"
draft: false
---

今天的 GitHub Trending 有幾個值得注意的方向：AI Agent 基礎建設持續成熟（Memory、Skills、MCP），同時有專案開始往「非視覺感測」這個方向突圍，硬體成本打到個位數美元。以下是今日精選。

## ruvnet/RuView

用 WiFi CSI（Channel State Information）做到人物存在偵測、呼吸、心率、姿態估計——全程不用一顆鏡頭。

核心原理：WiFi 訊號穿過人體後產生散射，ESP32-S3 晶片可擷取這種微弱的相位與振幅變化（CSI），RuView 再透過自行開發的 RuVector 類神經網路將訊號還原成 17 個人體關鍵點（、COCO 標準）、呼吸頻率（6–30 BPM）、心率（40–120 BPM）。一個 $8 的 ESP32-S3 就能做到穿透牆壁 5 公尺的存在偵測。

這個專案最有趣的地方是「Camera-free training」——姿態模型從頭到尾只用 WiFi CSI 訊號訓練，完全不靠標籤資料（不像傳統 DensePose 需要多鏡頭同步拍攝）。目前 PCK@20 約 2.5%，目標是 35%，不過 pipeline 還在等資料收集階段完成。實務上，光是「非視覺的存在偵測 + 生命跡象」在醫療、零售、智慧家庭這些場景就已經有明確價值，不需要等下一階段的姿態準確度。

適合誰：做室內定位、醫療感測、零售人流分析、或對隱私法規（GDPR、HIPAA）有顧慮的開發者。

## czlonkowski/n8n-mcp

把 n8n（開源工作流自動化平台）的 1,650 個節點——820 個官方節點加上 830 個社群節點——封裝成一個 MCP Server，讓 Claude Code、Cursor、Windsurf 這些 AI 程式設計工具可以直接「看到」n8n 的節點文件、屬性schema、以及 2,352 個現成範本。

n8n-MCP 的價值在於大幅降低「用 AI 建造 n8n 自動化流程」的進入門檻。過去 AI 必須靠提示詞掙扎著描述工作流邏輯，現在可以直接查詢結構化的節點文件、驗證設定參數、搜尋符合條件的範本。工具覆蓋率聲稱：節點屬性 99%、節點操作 63.6%、官方文件 87%。也有提供無需安裝的雲端版本（dashboard.n8n-mcp.com），每天 100 次免費呼叫。

這不是那種「用 MCP 把兩個工具黏起來」的輕量整合，而是真的把整個 n8n 生態系的結構化知識餵給 AI。對於已經在用 n8n 的團隊，這個 MCP 讓 AI 助手從「能幫一點忙」升級到「能實際操作工作流」。

適合誰：已經在用 n8n 或考慮引進工作流自動化的團隊，以及想把 AI 程式設計工具整合進 n8n 生態系的開發者。

## joeseesun/qiaomu-anything-to-notebooklm

一個 Claude Code Skill，解決的是「如何把任意來源的內容（付費文章、微信公眾號、YouTube、PDF、EPUB）自動轉換成 NotebookLM 可吃的格式」。

它的核心賣點是付費牆繞過：6 層級聯策略（代理服務 → Googlebot UA → Bingbot UA → Cookie 清空 → AMP → archive.today），覆蓋 300+ 付費網站，包括 NYT、WSJ、FT、The Economist、以及騰訊和騰訊系媒體。轉換輸出支援 Podcast、PPT、思維導圖、Quiz、報告等多種形式，都是透過 NotebookLM 的生成能力。

qiaomu 的技術架構值得注意：它不是單一腳本，而是一個多 MCP 架構——微信內容有專屬的 `wexin-read-mcp`（用 Playwright 瀏覽器模擬），飛書文件有 `feishu-read-mcp`，兩者都可以獨立運作。Deep Analysis 模式還支援 3 輪遞進提問（概覽 → 深度挖掘 → 綜合反芻），背後是 NotebookLM 在同一對話中保持上下文的能力。

適合誰：需要研究競爭情報、做知識整理、或經常處理「網頁有付費牆」這個日常痛苦的研究者與分析師。

## tinyhumansai/OpenHuman

個人 AI Agent，主打「幾分鐘內讓 AI 認識你」，而不是傳統的「給它幾週觀察期」。

做法是 Auto-fetch：透過 OAuth 一次性串接 Gmail、Notion、GitHub、Slack、Stripe、Calendar、Drive、Linear、Jira 等 118+ 服務，每 20 分鐘自動把新資料拉回本地，經過 TokenJuice（智慧代幣壓縮）處理後存入本地 SQLite 的 Memory Tree，並同步成 Obsidian 相容的 Markdown  vault。整個過程不需要寫任何 polling 程式碼，也不需要訓練期。

OpenHuman 的設計思路類似 Karpathy 的 LLM Knowledgebase 概念，但把它變成一個有桌面 UI、有 mascot、有語音（STT + ElevenLabs TTS）、可以加入 Google Meet 當真正參與者的產品。它的 model routing 內建了多模型分流（reasoning / fast / vision），還支援透過 Ollama 使用本機模型。Memory 後端可切換成 agentmemory，讓它和 Claude Code、Cursor、Codex 共用同一套持久化 store。

適合誰：想要一個開源、隱私優先、而不是把所有脈絡交給雲端處理的個人 AI Agent 的開發者或進階用戶。

## obra/superpowers

Agentic Skills Framework + 軟體開發方法論，支援 Claude Code、Codex CLI/App、Gemini CLI、OpenCode、Cursor、GitHub Copilot CLI 等主流程式設計工具。

Superpowers 的核心訴求是「讓 Coding Agent 不要一拿到任務就急著寫程式碼」。它用一組可組合的 Skills 強迫 Agent 在動手前先做 brainstorming（確認真正需求）、再寫 design doc（分段呈現給人類確認）、然後才進入 writing-plans（切分成 2–5 分鐘可完成的小任務）、最後以 subagent-driven development 方式執行，每個子任務都經過兩階段 review（規格合規 → 程式碼品質）。

這個框架把 TDD（紅/綠/重構）變成強制流程，不允許在測試沒寫的情況下先寫業務程式碼。Skills 觸發是自動的，不需要人類特別呼叫——當 Agent 偵測到工作類型，就自動套用對應的 Skill。這種「方法論內建在工具裡」的設計，是它跟其他純提示詞工程的方案最大差異。

適合誰：希望 Coding Agent 不只是幫你寫 code，而是能遵循一套有紀律的開發流程的團隊或個人。

## 參考連結

- [RuView GitHub](https://github.com/ruvnet/RuView)
- [n8n-MCP GitHub](https://github.com/czlonkowski/n8n-mcp)
- [qiaomu-anything-to-notebooklm GitHub](https://github.com/joeseesun/qiaomu-anything-to-notebooklm)
- [OpenHuman GitHub](https://github.com/tinyhumansai/openhuman)
- [Superpowers GitHub](https://github.com/obra/superpowers)