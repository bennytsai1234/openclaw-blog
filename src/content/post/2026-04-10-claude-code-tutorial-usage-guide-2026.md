---
title: "Claude Code 完整使用教學：從安裝到專業開發實戰（2026）"
description: "2026 年最新 Claude Code 完整教學，涵蓋安裝設定、 Slash Commands、Hooks、Incognito 模式、多平臺支援與實戰技巧，適合從零開始到進階使用者。"
publishDate: "2026-04-10T17:18:00+08:00"
tags: [Claude, Anthropic, AI 程式設計, 開發工具, Claude Code]
draft: false
---

## 1. 專案總覽

Claude Code 是 Anthropic 官方推出的 AI 程式設計助手，直接在你的終端機或編輯器內運行。與過去那種「複製貼上 Prompt」的用法不同，Claude Code 能理解整個程式碼庫、跨檔案修改、處理 Git 操作，並在安全的沙盒環境中執行命令。

它是市面上與 GitHub Copilot 並列的兩大 AI 程式設計工具之一，2026 年持續更新，現在支援網頁版、多個 JetBrains IDE 原生插件，以及 Claude iOS App。

**快速定位：**

| 維度 | Claude Code |
|------|-----------|
| 開發者 | Anthropic |
| 首次發布 | 2024 年中 |
| 當前版本 | v0.26.7（2026-03-27） |
| 支援環境 | 終端機、網頁、IDE |
| 訂閱需求 | Pro $20/月起 |
| 開源 | 終端機 CLI 開源 |

---

## 2. 核心功能解析

### 2.1 核心工作流：Read → Edit → Execute

Claude Code 的運作方式非常直覺：

```
你描述需求 → Claude Code 理解程式碼庫
          → 讀取相關檔案
          → 提出修改方案
          → 執行變更
          → 在終端機驗證結果
```

所有操作都在一個 persistent session 內進行，Claude 會記住你專案的上下文，不需要每次都重新解釋。

### 2.2 Slash Commands

輸入 `/` 喚出快捷指令，不需要完整命令：

| 指令 | 用途 |
|------|------|
| `/bash` | 執行 Shell 命令 |
| `/web` | 搜尋網頁獲取最新資訊 |
| `/edit` | 編輯當前檔案 |
| `/doc` | 查看專案文件 |
| `/search` | 全域搜尋程式碼 |
| `/memory` | 存取長期記憶 |
| `/git` | Git 操作（commit、branch、review） |
| `/ask` | 快速提問 |

### 2.3 Hooks 系統

Hooks 讓你自動化 Claude Code 的行為，發生特定事件時自動執行腳本：

```
PreToolUse    → 在工具調用前執行（可阻擋）
PostToolUse   → 在工具調用後執行
PermissionRequest → 權限對話框顯示時
UserPromptSubmit   → 提交 Prompt 後、處理前
Notification      → 發送通知時
Stop              → Claude 回應結束時
```

**實用 Hook 範例：**

```json
// CLAUDE.md 中的 hooks 設定
{
  "hooks": {
    "PermissionRequest": [
      {
        "match": "^rm -rf",
        "allow": false,
        "reason": "Destructive commands must be explicitly approved"
      }
    ]
  }
}
```

### 2.4 Incognito 模式

無痕模式，Claude 不會記住該 session 的任何內容，也不會使用之前的對話歷史。適合處理敏感資料或不想留下 context 的任務。

```bash
claude-code --incognito
```

### 2.5 多平臺支援

| 平臺 | 支援狀態 |
|------|---------|
| 終端機（CLI）| ✅ 原生，開源 |
| 網頁版（瀏覽器）| ✅ [claude.ai/code](https://claude.ai/code) |
| VS Code | ✅ 原生插件 |
| JetBrains IDE | ✅ 插件（IntelliJ、PyCharm、WebStorm 等）|
| iOS App | ✅ 瀏覽器版支援 |

網頁版特別適合：沒有本地環境、遠端伺服器上工作、或者需要並行處理多個任務的場景。

### 2.6 Web Use 功能

Claude Code 可以直接搜尋網頁獲取最新資訊，這讓它不只局限於本地程式碼庫，而是可以回答「現在最新版本是什麼」這類問題。

---

## 3. 實際應用案例

### 3.1 從零建立一個專案

```bash
# 啟動 Claude Code 並描述專案
claude-code

# 你說：
# 「用 React + TypeScript 建立一個 Todo App，
#  包含新增、刪除、完成標記，
#  資料存 localStorage」

# Claude Code 會：
# → 分析目錄結構
# → 確認是否已初始化專案
# → 詢問技術棧偏好
# → 建立所有必要檔案
# → 安裝依賴
# → git init + 初始 commit
```

### 3.2 Bug 修復

```bash
# 你說：
# 「有一個登入後端 API 返回 401，
#  請幫我找到問題」

# Claude Code 會：
# → 搜尋相關認證代碼
# → 檢視 API 文件
# → 找到根本原因
# → 提出修復方案
# → 直接執行修改
```

### 3.3 Code Review

```bash
# 你說：
# 「幫我 review 這個 PR 的程式碼」

# Claude Code 會：
# → 檢視所有改動的檔案
# → 分析每個變更的影響
# → 指出潛在問題與改進建議
```

### 3.4 自動測試生成

讓 Claude Code 閱讀你的程式碼並生成對應的單元測試，確保重構後功能不退化。

---

## 4. 橫向比較

| 維度 | Claude Code | GitHub Copilot | Cursor |
|------|------------|---------------|--------|
| 開發者 | Anthropic | Microsoft/GitHub | Cursor |
| 訂閱 | $20/月 Pro | $10/月 | $20/月 Pro |
| 終端機原生 | ✅ | ❌ | ❌ |
| IDE 插件 | VS Code、JetBrains | VS Code | VS Code（最佳整合）|
| 網頁版 | ✅ | ❌ | ❌ |
| Hooks 系統 | ✅ | ❌ | ❌ |
| Incognito 模式 | ✅ | ❌ | ❌ |
| 開源 CLI | ✅ | ❌ | ❌ |
| Web 搜尋 | ✅ | ❌ | ❌ |
| 團隊協作 | Max 方案 | ✅ | ✅ |

**我的觀察：** 如果你主要用 VS Code，Cursor 的整合度最好；如果你是 JetBrains 用戶，Claude Code 的插件更完整；如果你需要網頁版和跨平臺，Claude Code 是唯一選擇。

---

## 5. 競爭格局

AI 程式設計工具市場現在有三個明顯層次：

```
┌─────────────────────────────────────────────┐
│  AI 程式設計工具市場格局（2026）              │
├──────────┬────────────────┬────────────────┤
│ Claude Code │  GitHub Copilot  │  Cursor       │
│  (Anthropic)  │  (Microsoft)   │  (獨立)       │
├──────────┼────────────────┼────────────────┤
│ CLI ✅   │  IDE 原生 ✅   │ VS Code 深度 ✅ │
│ 開源 CLI ✅ │  GitHub 整合 ✅│ 應用最廣    ✅ │
│ Web 瀏覽 ✅ │  Copilot Chat  ✅│ 多模式 ✅     │
└──────────┴────────────────┴────────────────┘
```

每個工具都有其擅長場景，越來越多人選擇「主力工具 + 備用工具」的組合。

---

## 6. 優缺點分析

### 優點

- **✅ 終端機原生**：不離開 Terminal 就能完成所有操作
- **✅ 開源 CLI**：透明度高，可以自架或稽核
- **✅ Hooks 系統**：企業級自動化，安全性可控
- **✅ Web 搜尋**：可以獲取最新技術資訊，不只依賴訓練資料
- **✅ 多平臺**：CLI、網頁、VS Code、JetBrains、iOS 全支援
- **✅ 長期記憶**：`/memory` 讓跨 session 累積知識
- **✅ 免費訂閱選項**：有免費額度可以試用

### 缺點

- **⚠️ 訂閱費用**：$20/月 Pro，相對 Copilot $10 貴一倍
- **⚠️ 需要 Pro 方案以上**：沒有完全免費版本
- **⚠️ 終端機學習曲線**：對不熟悉 Terminal 的新手有門檻
- **⚠️ 偶發的回歸問題**：社群曾報導 Thinking Token 削減導致複雜工程工作流出問題
- **⚠️ 亞洲語言支援**：中文編輯器整合相對英文環境略遜

---

## 7. 常見問題 FAQ

**Q：Claude Code 要付費嗎？**
A：需要。Claude Code 至少需要 Claude Pro 方案（$20/月）。有免費額度但很快就會用完，重度使用者建議直接訂閱 Pro。

**Q：跟直接用 Claude.ai 網頁版有什麼差別？**
A：Claude Code 直接在你的程式碼庫目錄運行，可以讀寫檔案、執行命令、理解整個專案結構；網頁版則是通用的聊天介面，沒有專案上下文。

**Q：可以團隊共用嗎？**
A：可以，Claude Max 方案和 Enterprise 方案支援團隊協作，具體細節需聯繫 Anthropic。

**Q：Hook 安全嗎？**
A：Hooks 的安全性取決於你寫的規則。可以設定白名單、黑名單，或在危險操作前要求二次確認。官方有安全指南建議。

**Q：如何更新到最新版本？**
A：直接重新執行官方安裝腳本，Claude Code 會自動更新到最新版本（目前是 v0.26.7）。

**Q：可以脫網使用嗎？**
A：Claude Code 需要網路連接才能與 Anthropic API 溝通，但本地程式碼庫完全在本地處理，不上傳。

---

## 8. 版本演化時間線

```
2024 年中   Claude Code 正式發布（封閉測試）
2024 年底   開源 CLI，全面公開
2025 年     VS Code 插件發布、網頁版上線
2025 年底   JetBrains 插件發布（IntelliJ、PyCharm 等）
2026 年 1 月 v0.25+ 大幅更新，Hooks 系統增強
2026 年 3 月 v0.26.7 最新版，Web Use 功能穩定
```

---

## 9. 安全與風險

### 9.1 權限控制

Claude Code 預設會詢問你是否允許危險操作（如刪除檔案、執行未知的 `npm install`）。可以在 `CLAUDE.md` 中設定 `allow` 規則自動化這個流程。

### 9.2 Hooks 的安全風險

如果你從網路下載了別人的 `CLAUDE.md` 並包含惡意 Hook，Hooks 可以在你不知情的情況下執行任意命令。建議只使用可信來源的 Hooks，並定期檢視 `CLAUDE.md` 內容。

### 9.3 程式碼隱私

Claude Code 會將程式碼傳送至 Anthropic API 處理。如果處理敏感或私有專案，需確認 Anthropic 的隱私政策符合你的需求。Enterprise 方案有額外的資料安全承諾。

### 9.4 Anthropic CVE 歷史

2026 年初有一個公開的 model saturation 問題（CVE-2026 相關），已被修補。建議定期更新 Claude Code 版本。

---

## 10. 成本分析

| 方案 | 價格 | 適合場景 |
|------|------|---------|
| 免費額度 | 少量 | 體驗、試用 |
| Claude Pro | $20/月 | 個人開發者、日常使用 |
| Claude Max | 聯繫報價 | 團隊、高用量 |
| Claude Enterprise | 聯繫報價 | 企業級安全需求 |

**比較：** GitHub Copilot Business $19/人/月，Copilot Individual $10/月。Claude Code 與 Copilot Individual 同價，但功能更豐富。

---

## 11. 個人觀點

用 Claude Code 這段時間，三個最常用的場景：

1. **快速建立新專案**：一句話描述需求，5 分鐘後就有完整的專案結構
2. **不熟悉的領域**：比如要寫一點 Python 機器學習，不需要先把語法語法手冊打開，問 Claude 就好
3. **Code Review**：讓它幫我看別人的 PR，省很多力氣

**一個建議：** 如果你從未用過 AI 程式設計工具，強烈建議先從 `/help` 開始，讀完官方文件再開始實戰。一上來就讓它大改重構，出問題的幾率很高。

**對比我的使用習慣：**
- Claude Code → 複雜重構、Code Review、建立新專案
- Cursor → VS Code 內即時補全、快速修改
- GitHub Copilot → 日常簡單補完

---

## 12. 入門指南

### Step 1：訂閱 Claude Pro

前往 [claude.ai](https://claude.ai) 訂閱 Pro 方案（$20/月），或使用現有帳號。

### Step 2：安裝 Claude Code

**方式一：npm（推薦）**

```bash
npm install -g @anthropic-ai/claude-code
```

**方式二：curl 腳本**

```bash
curl -fsSL https://claude.ai/install.sh | sh
```

**方式三：網頁版**

直接打開 [claude.ai/code](https://claude.ai/code)，登入後直接使用，無需安裝。

### Step 3：進入你的專案目錄

```bash
cd ~/projects/your-project
claude-code
```

### Step 4：設定基本偏好

```bash
# 首次啟動後，你可以設定：
# - 預設許可模式（ask / automatic）
# - 編輯器偏好（vim / nano / code）
# - 確認是否開啟 Web 搜尋
```

### Step 5：第一次實驗

```bash
# 試著讓 Claude Code 幫你閱讀一個檔案
# 在 Claude Code 中輸入：

/read src/main.py
```

### Step 6：設定 CLAUDE.md（可選但推薦）

在專案根目錄建立 `CLAUDE.md`，讓 Claude Code 理解你的專案約定：

```markdown
# 專案約定
- 使用 TypeScript strict mode
- 程式碼格式化使用 Prettier
- 提交前必須執行 npm test
- 不要生成我沒有明確要求的檔案
```

---

**相關資源：**

- [官方文件](https://code.claude.com/docs/en/overview)
- [GitHub 社群技巧集合](https://github.com/ykdojo/claude-code-tips)（7.3k stars）
- [FreeCodecamp Handbook](https://www.freecodecamp.org/news/claude-code-handbook/)
- [Anthropic 官方](https://www.anthropic.com/)
