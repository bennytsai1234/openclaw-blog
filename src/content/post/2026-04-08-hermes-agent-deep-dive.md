---
title: "Hermes Agent 深度解析：Nous Research 自我進化 AI Agent 技術評測"
description: "Hermes Agent 是由 AI 研究實驗室 Nous Research 打造的自我進化 AI Agent，具備內建學習循環、技能自動創建、長期記憶與跨平台訊息整合。本文從技術架構、核心功能、與 OpenClaw 的完整比較、以及實際應用場景，進行全方位深度解析。"
publishDate: "2026-04-08T12:00:00+08:00"
updatedDate: "2026-04-08T23:51:00+08:00"
tags: ["Hermes Agent", "Nous Research", "AI Agent", "自我進化", "OpenClaw", "Atropos", "MCP", "開源AI"]
draft: false
series: "ai-tools-deep-dive"
---

## 前言：大多數 AI Agent 都在假裝記得你

你花了一個下午教 AI Agent 你的程式碼庫、命名規範、部署流程，做了真正的成果。然後你關掉 session，打開新的——它不記得你是誰了。從頭解釋，看它重蹈覆轍，再糾正一次。

這是每一個 AI Agent 都聲稱要解決、卻幾乎沒人真正解決的問題。

**Hermes Agent** 是少數认真面對這個問題的項目。它不只儲存對話記錄，而是從自身經驗中建立技能、在使用過程中改進技能、跨 session 搜尋歷史、並持續建構關於「你是誰」與「你如何工作」的深度模型。執行越久，能力越強。

這不是 slogan，是 Architecture。

本文針對以下目標進行完整分析：
- 技術架構與核心設計邏輯
- 封閉式學習循環的實作方式
- 與 OpenClaw 的完整功能對比
- 實際安裝路徑與成本測試
- 安全模型與真實用戶反饋

---

## 1. 專案概覽

| 項目 | 內容 |
|------|------|
| 專案名稱 | Hermes Agent |
| 開發團隊 | Nous Research |
| 開源授權 | MIT |
| 首次發布 | 2026 年 2 月 26 日 |
| 當前版本 | v0.7.0 (2026.4.3, 2026 年 4 月 3 日) |
| GitHub Stars | 24,200+（持續成長中） |
| 官方網站 | hermes-agent.nousresearch.com |
| 文件站 | hermes-agent.nousresearch.com/docs/ |

### 核心定位

Hermes Agent 的官方定位不是「編碼 Copilot」，也不是「聊天機器人包裝器」，而是一個**自主運行的 Agent 系統**——活得夠久，就會變得更強。它可以部署在 $5 VPS、GPU 叢集、或幾乎免費閒置的無服務器基礎設施（Daytona、Modal）上。透過 Telegram 發送指令，讓它在你睡覺時完成工作，這才是它的本色。

---

## 2. Nous Research：打造 Hermes Agent 的實驗室

### 2.1 團隊背景

Nous Research 不是突然走紅的業餘項目，而是一家專注於 AI 安全與能力的研究實驗室，成立於 2023 年，由以下成員創辦：

- **Jeffrey Quesnelle** — 執行長
- **Karan Malhotra** — 技術長
- **Teknium** — 知名開源模型貢獻者（Qwen、Nous Hermes 系列）
- **Shivani Mitra** — 產品負責人

總部位於美國德克薩斯州奧斯汀，團隊規模約 20 人。

### 2.2 財務狀況

| 輪次 | 日期 | 金額 | 領投 |
|------|------|------|------|
| Seed | 早期 | ~$20M | Distributed Global, North Island Ventures, Delphi Digital 等 |
| Series A | 2025 年 4 月 25 日 | $50M | Paradigm |
| **總計** | | **$70M** | |

本輪估值對其代幣（尚未發布）給出 $1B 的估值。值得注意的是，Nous Research 的商业模式中，Hermes 模型系列是其核心資產，而 Hermes Agent 的定位是讓這些模型能够以 Agent 形式部署在真實工作流程中。

### 2.3 核心技術積累

Nous Research 最著名的產品線：

- **Hermes 系列模型** — 一系列微調 LLM，專為工具調用（Tool Calling）和指令遵循優化，是目前開源模型中工具使用能力最強的家族之一
- **Nomos** — 專注於安全與對齊的模型系列
- **Psyche** — 推理與心理模型
- **Atropos** — 自家的 RL（強化學習）訓練框架，用於批量生成工具調用軌跡、壓縮後用於微調下一代工具調用模型

**為什麼這很重要？** 因為 Hermes Agent 不是產品公司为了功能而堆出來的框架。它是模型訓練者自己打造的工具——那些在 LLM 與用戶之間出了問題的地方，他們比大多數框架開發者理解得更深。

---

## 3. 技術架構深度解析

### 3.1 運行環境：6 種終端後端

Hermes Agent 支援 6 種不同的運行環境，使用者可以根據需求選擇：

| 後端 | 說明 | 適用場景 |
|------|------|---------|
| **Local** | 直接在本地 Linux/macOS/WSL2 運行 | 開發測試、個人使用 |
| **Docker** | 官方容器鏡像，`docker run` 一鍵啟動 | 生產環境、隔離需求 |
| **SSH** | 連接到遠程伺服器運行 | 已有遠程機器的用戶 |
| **Daytona** | 無服務器持久化，閒置時休眠，按需喚醒 | 低成本 24/7 運行 |
| **Singularity** | 高效能容器，適合 GPU 資源 | 深度學習、研究用途 |
| **Modal** | 無服務器，類似 Daytona，冷啟動 | 無服務器愛好者 |

Daytona 和 Modal 的無服務器持久化模式是亮點：Agent 環境在閒置時休眠，幾乎不在空閒時間收費，只有在收到請求時才喚醒。這讓 24/7 運行的成本可以低到接近零。

### 3.2 技術棧

- **主語言**：Python 3.11（通過 `uv` 包管理器管理）
- **安裝腳本**：自動處理 Python、Node.js、相依套件，無需 sudo
- **資料庫**：SQLite + FTS5（全文字搜索）用於跨 session 記憶
- **模型格式**：OpenAI API 兼容端點，支援本地模型（Ollama、vLLM、SGLang）
- **容器**：Docker / Podman 支援

### 3.3 訊息通道：15+ 平台整合

Hermes Agent 的 Gateway 系統支援 15+ 訊息平台，實現真正的跨平台對話：

- **即時通訊**：Telegram、Discord、Slack、WhatsApp、Signal、Matrix、Mattermost
- **企業通訊**：Email、SMS、DingTalk（�釘釘）、Feishu（飛書）、WeCom（企業微信）
- **智慧家庭**：Home Assistant
- **CLI**：本地終端介面（TUI）

所有這些都通過**一個 Gateway 程序**實現，不需要為每個平台運行獨立的服務進程。

---

## 4. 核心功能：封閉式學習循環

這是 Hermes Agent 與市場上幾乎所有其他 Agent 框架最本質的區別。

### 4.1 長期記憶：三層架構

Hermes 的記憶系統分為三層，每層解決不同問題：

**第一層：事件記憶（Event Memory）**
- 時間戳記錄所有任務、決策與結果
- 讓 Agent 能夠引用自己的歷史行為
- 監控任務運行 50 次，就有 50 次運行的上下文來告訴 Agent 這次該怎麼處理

**第二層：用戶模型（User Model / Honcho）**
- 建構你這個人的結構化記錄：技術背景、溝通偏好、正在進行的專案、操作模式
- 這是「Honcho」框架的貢獻，實現所謂的「辯證式用戶建模」（Dialectic User Modeling）
- 隨著時間積累，Agent 對你的理解越來越精準
- ⚠️ **重要**：Honcho 預設為關閉狀態！這是大多數新用戶感到「記憶不起作用」的最常見原因，需要在配置文件中明確啟用

**第三層：技能文件（Skill Documents）**
- 結構化的程序記憶，遵循 [agentskills.io](https://agentskills.io) 開放標準
- 儲存為 Markdown 文件，包含：處理的任務類型、使用的工具組合、在哪裡遇到困難、最終如何解決
- 可在任何時候被檢索、加載、重用
- **關鍵創新**：技能文件在使用過程中**會自動更新**——當 Agent 發現更好的做法，會同步修改對應的技能文件

### 4.2 自主技能創建

在完成複雜任務時（通常超過 5 次工具調用），Agent 可以主動將這段經驗合成為一個**永久可重用的技能文件**。

實際例子：用戶回報，在連續两小時的使用中，Agent 主動創建了三個技能文件，涵蓋研究任務的範圍。之後執行類似的任務，速度提升了 **40%**。沒有任何提示詞調整——改進來自於「做過了，記住了」。

### 4.3 FTS5 跨 Session 召回

Hermes 使用 SQLite 的 FTS5（全文字搜索）引擎對所有歷史 session 進行索引，結合 LLM 生成的摘要，實現跨星期、甚至跨月的精準資訊召回。

你可以問：「上個月我讓你處理的那個錯誤，日誌在哪？」Agent 能找到對話、提取細節，並應用到當前任務中。

### 4.4 自訓練管道（Research-Ready）

Hermes 與 Atropos RL 框架深度整合，支援：

- **批量軌跡生成**：並行生成數千條工具調用軌跡
- **軌跡導出**：以 ShareGPT 格式導出，用於微調更小、更便宜的模型
- **RL 訓練**：使用 Atropos 進行強化學習訓練你自己的工具調用模型

這是研究等級的基礎設施，但封裝在消費級產品中。大多數人不會用到這個功能，但需要這個功能的人，除了 Hermes Agent 幾乎沒有其他選擇。

---

## 5. 核心工具生態

Hermes Agent v0.7.0 内建 **47+ 工具**，分為以下類別：

| 類別 | 工具數 | 代表工具 |
|------|--------|---------|
| 檔案操作 | 多種 | 讀取、寫入、編輯、搜尋 |
| Web 自動化 | 多種 | 網頁搜尋、內容提取、截圖 |
| 代碼執行 | 多種 | Python REPL、程式碼分析 |
| AI 整合 | 多種 | 影像生成、TTS/STT |
| 通訊 | 多種 | 發送郵件、Discord、Telegram |
| 系統管理 | 多種 | Cron 排程、系統服務 |

### 5.1 MCP（Model Context Protocol）整合

Hermes 支援 MCP 協議，可以連接到任何 MCP 伺服器來擴展工具能力，並對這些工具進行過濾和安全隔離。

### 5.2 SOUL.md 角色系統

和 OpenClaw 一樣，Hermes Agent 支援 SOUL.md 檔案來定義 Agent 的預設人格。這個檔案塑造 Agent 的說話風格、行為模式與回應語氣。對於有特定角色扮演需求的用戶，這是必備功能。

---

## 6. 與 OpenClaw 完整比較

這是讀者最關心的問題。我們從多個維度進行實事求是地比較：

| 維度 | Hermes Agent | OpenClaw |
|------|------------|---------|
| **首次發布** | 2026 年 2 月 | 2025 年 11 月（Clawdbot） |
| **GitHub Stars** | 24,200+ | 214,000+ |
| **主語言** | Python | Node.js |
| **技術棧焦點** | AI/ML 研究者 | Web 開發者 |
| **記憶系統** | 三層結構（事件+用戶+技能） | 對話存檔為主 |
| **技能創建** | 自主創建 + 使用中自動改進 | 人類維護（社區貢獻） |
| **訊息平台** | 15+ | 50+（含 iOS/Android 原生） |
| **內建工具數** | 47+ | 700+（ClawHub 市場） |
| **模型支援** | 400+（OpenRouter/Nous Portal） | 多種（OpenAI/Anthropic 等） |
| **無服務器** | Daytona / Modal | 不支持 |
| **Atropos RL** | 原生整合 | 不支持 |
| **安裝難度** | 一鍵腳本 | 一鍵腳本 |
| **社區規模** | 小，快速成長 | 大，非常活躍 |

### 6.1 兩者最根本的差異

**OpenClaw 的技能靠人類維護** — 700+ 技能文件來自社區貢獻，你需要哪個技能，就從市場里裝。

**Hermes 的技能由 Agent 自己維護** — 技能文件會在使用過程中自動創建與更新。框架會「經驗中學習」。

這不是功能數量的差異，而是**設計哲學**的根本分歧。

### 6.2 各自的最佳場景

**選擇 Hermes Agent 當：**
- 工作內容是結構化、重複性的任務
- 希望 Agent 隨著使用時間累積而變得更靠譜
- 需要對重複的調查、編碼、部署流程進行長期最佳化
- 對模型訓練有研究需求，想利用 RL 軌跡微調專屬模型
- 已有伺服器，需要低成本的無服務器運行方式

**選擇 OpenClaw 當：**
- 偏好 Node.js 生態，或團隊熟悉 JavaScript
- 需要 iOS/Android 原生移動端體驗
- 需要極大的社區支持和故障排除資源
- 工作以一次性、探索性的任務為主
- 需要 ClawHub 市場上大量現成的專門技能

### 6.3 遷移路徑

Hermes Agent 內建從 OpenClaw 遷移的工具：

```bash
hermes claw migrate          # 互動式遷移
hermes claw migrate --dry-run    # 預覽遷移內容
hermes claw migrate --preset user-data  # 遷移用戶數據（不含金鑰）
```

可遷移的內容包括：SOUL.md、記憶、Skills、命令白名單、訊息設定、API 金鑰、TTS 資產、AGENTS.md 等。

---

## 7. 安全分析

### 7.1 CVE-2026-25253 與 ClawHavoc 事件

2026 年 2 月，安全研究人員發現了一個值得关注的問題：

- **Bitsight** 識別出 30,000+ 台暴露在公共網際網路上且無認證的 OpenClaw 實例（多為反向代理配置錯誤）
- **CVE-2026-25253**：一鍵遠端代碼執行漏洞
- **ClawHavoc 事件**：研究人員記錄了一個協作式供應鏈攻擊，數百個惡意技能（設計為資訊竊取器）被上傳到 ClawHub，而市場當時尚未有系統性安全審查機制

Hermes Agent 的 40+ 核心工具由 Nous Research 團隊維護和審計，**不受 CVE-2026-25253 影響**。但 Hermes 也支援載入 ClawHub 的技能，此時同樣的審計紀律仍然適用。

### 7.2 安全最佳實踐

從 Hermes Agent 文檔建議的安全配置：
1. **容器隔離**：在隔離環境中運行未經審計的技能
2. **命令審批**：配置命令審批白名單，防止意外執行高風險命令
3. **DM 配對**：僅允許授權用戶與 Gateway 互動
4. **網路存取控制**：限制 Gateway 的對外網路請求範圍
5. **讀取技能原始碼**：在運行任何第三方技能前，務必閱讀其原始碼

---

## 8. 安裝指南

### 8.1 前置需求

- Linux / macOS / WSL2
- Git
- 一個 LLM 後端（Nous Portal / OpenRouter / OpenAI / Ollama 等）
- 一個訊息平台帳戶（可選，推薦 Telegram）

### 8.2 推薦路徑：VPS 自託管（$5/月）

適用對象：希望 24/7 運行、不占用個人機器的用戶。

**Step 1：SSH 到伺服器**
```bash
ssh root@your-server-ip
```

**Step 2：執行一鍵安裝**
```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```
自動處理 Python 3.11、Node.js、相依套件，無需 sudo。

**Step 3：運行設定精靈**
```bash
source ~/.bashrc  # 重新加載 shell
hermes setup      # 互動式設定向導
```

**Step 4：啟動 CLI**
```bash
hermes
```

**Step 5：設定 Gateway（可選）**
```bash
hermes gateway setup   # 設定訊息平台
hermes gateway install # 安裝為 systemds 服務，開機自啟
```

### 8.3 其他安裝路徑

| 路徑 | 說明 |
|------|------|
| **本地 Mac** | 安裝腳本 + Amphetamine 防休眠 |
| **Docker** | `docker run -v ~/.hermes:/root/.hermes nousresearch/hermes-agent` |
| **Windows WSL2** | 需安裝 WSL2，再執行 Linux 安裝腳本 |
| **Pinokio** | 一鍵 GUI 安裝，終端恐懼者的選擇 |
| **Daytona/Modal** | 無服務器，閒置時幾乎零成本 |

### 8.4 從 OpenClaw 遷移

```bash
hermes claw migrate --dry-run  # 先預覽
hermes claw migrate            # 執行遷移
```

---

## 9. 成本分析

軟體本身完全免費（MIT 授權），費用來自兩個地方：

### 9.1 托管費用

| 方案 | 月費 | 備註 |
|------|------|------|
| Oracle Cloud Free Tier | $0 | 永久免費 VM（需搶申請） |
| 樹莓派 | ~$1 電費 | 前期硬體 ~$80 |
| Hetzner / Contabo VPS | $4–6 | 最受歡迎選擇 |
| DigitalOcean Droplet | $6–12 | 托管型選項 |
| Daytona / Modal 無服務器 | ~$0 空閒 | 按使用量計費 |
| Mac Mini M4（一次性） | ~$600 + $1/月電費 | 本地運行，性價比最高 |

### 9.2 模型 API 費用

取決於選用的模型層級：

| 模型 | 輸入 ($/1M tokens) | 輸出 ($/1M tokens) |
|------|-------------------|-------------------|
| Claude Haiku (OpenRouter) | ~$0.1 | ~$0.4 |
| DeepSeek | ~$0.1 | ~$0.4 |
| GPT-4o | ~$2.5 | ~$10 |
| Claude Sonnet | ~$3 | ~$15 |
| Claude Opus | ~$15 | ~$75 |

推薦的經濟型組合：**OpenRouter + Claude Haiku**，以極低成本獲得優質的工具調用能力。

---

## 10. 真實用戶反饋

### 正面案例

**持續性研究監控**
> 「設定了一個 cron 任務，每早 8 點監控我關注的 GitHub repos 和 Reddit 熱帖，整理成摘要發到 Telegram。相當於自動化了一整個情報收集工作流。」

**編碼合作夥伴**
> 「作為一個持久化的編碼伙伴，記得我的程式碼庫、約定和部署流程，這才是真正節省時間的方式。」

**跨平台對話**
> 「在手機上用 Telegram 發起對話，在筆電上用 CLI 繼續。一個 Gateway，全部同步。」

### 常見抱怨

1. **Honcho 不起作用**：新用戶最常見的問題。Honcho（自學習引擎）預設關閉，需要在 `~/.hermes/config.yaml` 中明確啟用。團隊在文檔中存在缺口，需要改進。
2. **安裝後配置迴圈**：設定精靈有時未能正確保存 Provider 配置，手動檢查 `~/.hermes/config.yaml` 是解決方案。
3. **社群規模小**：相較 OpenClaw 的 214,000+ stars，Hermes Agent 的 24,200+ stars 意味著更少的社區資源和故障排除文章。

---

## 11. 版本演化時間線

| 版本 | 日期 | 重點更新 |
|------|------|---------|
| 初始發布 | 2026 年 2 月 26 日 | 首版發布，核心功能上線 |
| v0.6.0 | 2026 年 3 月 | 官方 Docker 鏡像，MCP 支援 |
| v0.7.0 | 2026 年 4 月 3 日 | 可插拔記憶體供應商、Camofox 反偵測瀏覽器、內聯差異預覽、Gateway 強化、168 個 PR、46 個已解決問題、深度安全修復 |

v0.7.0 的更新節奏顯示團隊在快速回應社群回饋，這對開源專案是良好信號。

---

## 12. 競爭格局

Hermes Agent 不是唯一的開源 AI Agent 選擇：

| 專案 |  Stars | 特點 |
|------|--------|------|
| **OpenClaw** | 214,000+ | 最大社區、700+ 技能、原生移動端 |
| **ElizaOS** | — | 多代理框架、角色扮演生態 |
| **Dify** | — | 無代碼 LLM 應用平台 |
| **n8n** | — | 工作流程自動化 |
| **Hermes Agent** | 24,200+ | 自我進化、長期記憶、研究級 RL |

在開源 Agent 領域，OpenClaw 目前擁有压倒性的先發優勢。但 Hermes Agent 的「自我進化」架構提供了 OpenClaw 缺乏的長期價值主張——時間越長，差距越大。

---

## 結語：值得嘗試的理由

Hermes Agent 值得認真對待的原因很簡單：**它解決了一個真實的問題，而不是假裝這個問題不存在。**

大多數 Agent 系統假設用戶每次都是從零開始。Hermes Agent 的設計假設恰恰相反：隨著時間推移，Agent 應該變得更了解你、更有能力、更可靠。

如果你的工作涉及重複性的資訊收集、程式碼維護、研究監控等結構化任務，Hermes Agent 的學習循環會在几週後開始產生實際可測量的效率提升。對於技術從業人員而言，這是少數真正將「人工智慧」與「智慧」結合在一起的開源專案。

目前它還年輕（不到兩個月大），社群規模有限，但背靠 Nous Research 的研究實力和資金實力，以及明確的技術路線圖，它值得出現在你的實驗清單上。

---

## 資料來源

1. [Hermes Agent GitHub](https://github.com/NousResearch/hermes-agent)
2. [Hermes Agent 官方文件](https://hermes-agent.nousresearch.com/docs/)
3. [Hermes Agent 官方行銷頁](https://hermes-agent.nousresearch.com/hermes-agent)
4. [Nous Research 官網](https://nousresearch.com)
5. [Virtual Uncle - Hermes Agent Complete Guide 2026](https://virtualuncle.com/hermes-agent-complete-guide-2026/)
6. [hermesos.cloud - Hermes vs OpenClaw](https://hermesos.cloud/blog/hermes-vs-openclaw)
7. [Tracxn - Nous Research Funding](https://tracxn.com/d/companies/nous-research/)
8. [The Block - Paradigm $50M Series A](https://www.theblock.co/post/352000/)
9. [Nous Research - Introducing Atropos](https://nousresearch.com/introducing-atropos)
10. [ByteIOTA - Hermes Agent Tutorial](https://byteiota.com/hermes-agent-tutorial-build-self-improving-ai-agents-2026/)
11. [OpenAI Tools Hub - Hermes Agent Review](https://www.openaitoolshub.org/en/blog/hermes-agent-ai-review)
