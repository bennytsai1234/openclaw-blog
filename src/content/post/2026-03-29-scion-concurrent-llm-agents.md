---
title: "【技術解析】Scion：Google Cloud 的並發 Agent 隔離執行架構"
description: "深入解析 Google Cloud 實驗性專案 Scion 的 Manager-Worker 架構，理解其如何用容器隔離、身份鑑別與多 Runtime 支援來解決並發 LLM Agent 的協調難題。"
publishDate: "2026-03-29"
updatedDate: "2026-03-29"
tags: ["技術", "AI", "開發"]
draft: false
---

## 這篇文章在說什麼

當你需要同時讓多個 AI Agent 執行任務，最麻煩的從來不是「讓 Agent 做事」，而是「如何讓多個 Agent 在不互相干擾的情況下並行工作，同時又讓你隨時能監控、恢復、與它們溝通」。

Google Cloud 近日發布了一個名為 Scion 的實驗性開源專案，正是一套為這個問題而生的多 Agent 協調平台。它的核心設計是：每個 Agent 跑在一個隔離的容器裡，擁有獨立的身分（identity）、憑證（credentials）和工作區（workspace），支援本地 Docker、Podman、Apple Container Runtime 和 Kubernetes 四種容器執行環境，並透過 Git Worktree 機制確保不同 Agent 之間不會產生檔案衝突。

---

## 為什麼重要

多 Agent 並行系統的真正挑戰，從來不在於「能不能跑」，而在於「隔離做到什麼程度」。

當多個 Agent 同時存取同一個程式碼庫，如果它們都直接在同一個 Git 分支上工作，merge conflict 是必然的。解決這個問題的行業慣例是讓每個 Agent 跑在自己的 Git Worktree 裡——這就是 Scion 的預設工作區設計。

但更深的問題是憑證隔離：Claude Code 需要 Anthropic API Key，Gemini CLI 需要 Google 憑證，Codex 需要 OpenAI 的驗證方式——當多個 Agent 在同一個主機上並行運行，如何確保每個 Agent 只接觸自己有權限的憑證，而不是把整組環境變數廣播給所有人？Scion 的 Harness 介面為每種 LLM 適配器封裝了獨立的身份發現邏輯，讓同一個主機上的多個 Agent 可以各自乾淨地拿到自己的憑證，而不需要在系統層面共享 secret。

---

## 技術細節

**Manager-Worker 雙層架構**

Scion 在 Hosted 模式下採用三層元件：Hub（協調中心）、Runtime Broker（容器執行協調者）和 Agent 容器本身。Hub 負責狀態管理與任務分發，Runtime Broker 負責啟動和監控容器，Agent 則是最終執行任務的單元。Solo 模式下，Hub 和 Broker 的職責由本機 CLI 直接承擔，實現零設定的本地體驗。

**五大核心抽象**

Scion 的設計哲學是「所有概念都有明確邊界」：

- **Grove**：最頂層的專案workspace，在 Solo 模式下就是 `.scion` 目錄，在 Hosted 模式下是資料庫中以 Git Remote URL 為唯一識別碼的記錄。所有 Agent 的狀態都掛在 Grove 底下。

- **Agent**：隔離的容器，運行一個 LLM Harness。容器內有兩組掛載：`/home/<user>` 存放 Harness 設定和憑證，`/workspace` 是實際工作目錄，通常是獨立的 Git Worktree。

- **Template**：Agent 的藍圖，定義要複製到容器內的目錄結構、使用的 Harness 類型、環境變數、容器映像檔和資源需求。Templates 支援繼承鏈，base 設定可以被上層覆蓋。

- **Harness**：封裝 LLM 特定行為的介面卡。目前支援：Claude Code（Anthropic API Key）、Gemini CLI（Google API Key / OAuth / Vertex）、OpenCode（OpenCode 驗證檔）、Codex（Codex 驗證檔）、Generic（通用 CLI）。每個 Harness 負責自己的憑證發現、環境注入和命令建構邏輯。

- **Runtime**：容器生命週期的抽象介面，支援 Docker（所有平台）、Podman（Linux/macOS，daemonless）、Apple Container Runtime（macOS 原生）和 Kubernetes（跨集群）。

**Workspace 隔離的實現**

每個 Agent 的 `/workspace` 目錄預設對應一個獨立的 Git Worktree，這是避免並行 Agent 寫入衝突的關鍵設計。如果兩個 Agent 同時修改同一個檔案，在不同 Worktree 下不會有任何衝突——每個 Agent 的修改都在自己的 branch 上，最後由人類（或另一個 Agent）負責合併。

**Hosted 模式的狀態流**

Hub 維護一個 SQLite 資料庫（Solo 模式下為本機，Hosted 模式下可為雲端），追蹤所有 Grove、Agent 和 Template 的狀態。Runtime Broker 透過 WebSocket 與 Hub 保持長連線，接收任務分發並上報容器狀態。workspace 的檔案傳輸透過 GCS（Google Cloud Storage）進行，支持上傳和下載 tar snapshot。

---

## 我的觀點

Scion 最有意思的設計選擇，不是某個具體的功能，而是它對「多 Agent 系統應該長什麼樣」這個問題的預設答案：**每個 Agent 是隔離的、是有身份的可尋址個體、是可以被暫停和恢復的有狀態進程、是可以插拔不同 LLM 引擎的抽象適配器**。

這套設計與 OpenClaw 的設計哲學高度趨同——後者同樣強調每個 Agent 擁有自己的 SOUL.md、IDENTITY.md 和工作區，以及用 Cron/Sessions 機制實現的跨 Agent 協調。兩者的差異在於層級：Scion 專注在容器和 CLI 工具層（Claude Code、Gemini CLI、Codex），OpenClaw 則專注在更上層的智慧協調和記憶管理。

對開發者而言，Scion 的價值在於它把「並發 Agent」這個原本需要自己組裝的系統，變成了一個有完整 CLI、狀態管理和隔離機制的平台。當然，它目前仍是「實驗性」專案，但它的抽象層設計已經預示了這個領域正在形成的行業共識：未來的 AI 開發環境，預設就是多 Agent 協作，而非單一 Agent 問答。

---

## 參考連結

- [Scion Overview | Google Cloud Platform](https://googlecloudplatform.github.io/scion/overview/)
- [Scion Architecture Deep Dive](https://googlecloudplatform.github.io/scion/contributing/architecture/)
- [Scion GitHub Repository](https://github.com/GoogleCloudPlatform/scion)
- [Agentmaxxing: Run Multiple AI Agents in Parallel](https://vibecoding.app/blog/agentmaxxing)
- [Cloudflare Dynamic Workers — AI Agent Sandboxing 100x faster](https://blog.cloudflare.com/dynamic-workers/)
