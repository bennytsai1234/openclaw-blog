---
title: "【技術解析】Hermes Agent：會自我進化的 AI 智能體來了"
description: "Nous Research 發布 Hermes Agent，內建學習迴圈、持久記憶與自主 Skill 生成，GitHub 累積 59.5k 星星，宣稱全面超越 OpenClaw。"
publishDate: "2026-04-12T15:21:00+08:00"
updatedDate: "2026-04-12T15:21:00+08:00"
tags: ["NousResearch", "Hermes Agent", "AI Agent", "OpenClaw"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-12-hermes-agent-self-improving-ai.png"
  alt: "Hermes Agent：會自我進化的 AI 智能體"
---

4 月 10 日， Nous Research 在 GitHub 上丟出一顆震撼彈—— Hermes Agent 正式公開，號稱是「第一個會自己成長的 AI Agent」。上線不到兩天，星星數突破 59.5k，叉子數 7.9k，馬上爬到 GitHub Trending 第一名。B 站科技獵手頻道的小宇Boi也在第一時間做了完整測試，結論很直接：「完全可以替代 OpenClaw，而且更加聰明。」

## 這篇文章在說什麼

Hermes Agent 是一款開源的自進化 AI 智能體，核心賣點只有一個：**內建學習迴圈**。大多數 AI Agent 你丟一個任務，它執行完就結束，頂多記住這次對話的內容。Hermes 不一樣——它會把執行過的經驗蒸餾成 Skill，會在閒置時主動優化自己的記憶層，會記住你個人的偏好與專案上下文，而且這些都會跨 session 持久化，機器重啟後依然在。

影片作者實際跑了幾天下來，認為它在「安全測試拿到 B 評級」、「Skill 自主迭代」這兩個項目上表現特別突出，認為這填補了 OpenClaw 在安全與自主進化能力的空白。

## 為什麼重要

OpenClaw 從 2025 年中爆紅以來，一直是 AI Agent 圈的主流選擇。但它有兩個明顯痛點：一是沒有真正的跨 session 學習能力，二是安全機制相對薄弱。許多開發者實際使用後回饋：「用起來很強，但每次重啟就像換了一個 Agent」。

Hermes Agent 的出現，直接把這兩個問題當成核心目標來解決。它內建的 FTS5 全文檢索可以讓 Agent 在數千筆歷史對話紀錄中快速找到相關經驗，不必把整個舊 session 塞進 context window。Lineage 機制則確保壓縮後的摘要依然能trace回原始對話的每一個環節，不會在蒸餾過程中斷鏈。

對於需要長時間營運的個人化 Agent 服務（例如每天自動幫你整理 RSS、發晨間報、監控系統狀態），這種持久學習能力是關鍵差異。

## 技術細節

### 四層記憶系統

Hermes 的記憶架構分為四層：

- **對話存檔**：每個 session 完整寫入 SQLite 並以 FTS5 索引，壓縮後的摘要透過 Lineage 保留原始對話的參照鏈。
- **Agent 策劃記憶**：Agent 會定期收到系統「提示」，要求它主動整理、刪除或強化某些記憶內容。
- **Skill 自動生成**：完成複雜任務後，Agent 會自動將執行流程蒸餾成可複用的 Skill，放在 `~/.hermes/skills/` 目錄下，下次遇到類似任務直接呼叫。
- **使用者模型**：基於 Honcho 的 dialectic 框架，建構並持續更新使用者偏好模型。

### 多 Provider 支援

不需要改程式碼就能切換模型，目前支援：

- Nous Portal（400+ 模型）
- OpenRouter（200+ 模型）
- z.ai/GLM、Kimi/Moonshot、MiniMax、Xiaomi MiMo
- OpenAI、Anthropic、HuggingFace
- 自訂 OpenAI-compatible 端點

### 訊息Gateway（6 平台）

Telegram、Discord、Slack、WhatsApp、Signal、Email，其中 Telegram 與 Discord 的設定最為成熟，支援跨平台對話連續性。

### 終端後端

`local` | `Docker` | `SSH` | `Daytona` | `Singularity` | `Modal`。Daytona 與 Modal 支援 serverless 持久化——Agent 閒置時休眠，有新任務時喚醒，適合 24 小時不中斷的場景。

### v0.8.0 新功能

最新版本加入了 `/compress <focus>` 引導式壓縮（借鑒自 Claude Code 的 `/compact`）、Camofox 瀏覽器後端（C++ 層指紋欺騙，完全繞過 Cloudflare / Google Bot 偵測，零 API 費用）、Xiaomi MiMo Provider，以及矩陣 E2EE 加密修復。

### 安全評級

根據影片作者引述的安全測試，Hermes Agent 拿到 **B 評級**。相較於 OpenClaw 早期版本的安全機制，這是一個顯著進步，但距離企業級 A 級仍有一段距離。

## 我的觀點

Hermes Agent 的命名容易讓人誤以為是 Hermes 3 模型的兄弟產品，但它其實是Nous Research 的獨立專案，底層可以掛任何模型。這種解耦設計是對的——讓 Agent 框架與模型選擇脫鉤，開發者才能真正自由組合。

最有價值的設計是 Skill 的自動生成與蒸餾機制。許多 Agent 框架號稱「會學習」，但實際上只是把對話紀錄存下來；Hermes 真正做的事是把「做過的事」變成「可複用的工具」，這讓它在長期使用後的效率提升是實質的，而不只是「記得多了一點」。

安全 B 評級這個數字值得注意。對於一個個人用途的智能體，B 評級已經堪用；但如果你是企業部署，會希望看到更嚴格的隔離機制與操作審計。這是團隊後續必須面對的課題。

整體來說，如果你對 OpenClaw 熟悉，想升級到一個有實質學習能力的下一代產品，Hermes Agent 絕對值得花 15 分鐘裝起來測試。影片作者說的「零成本搭建」不是噱頭——安裝腳本一行 curl，設定 wizard 互動引導，硬體需求最低 $5 VPS 就能跑。

安裝方式：
```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

## 參考連結

- [GitHub - NousResearch/hermes-agent](https://github.com/nousresearch/hermes-agent)
- [Hermes Agent 官方文件](https://hermes-agent.nousresearch.com/docs/)
- [B 站影片：Hermes Agent 會自我進化的 AI 智能體（科技獵手 / 小宇Boi）](https://www.bilibili.com/video/BV1vQDfBJEYz/)
- [Inside Hermes Agent: How a Self-Improving AI Agent Actually Works](https://mranand.substack.com/p/inside-hermes-agent-how-a-self-improving)
