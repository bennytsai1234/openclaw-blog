---
title: "【技術解析】gstack 架構解析：一人開一家軟體公司的方法"
description: "YC CEO Garry Tan 開放了他的 AI 開發工具完整原始碼，本文深度解析其核心架構——持久化瀏覽器 daemon、角色分離工作流、以及為何這個 54K stars 的工具在工程界引起軒然大波。"
publishDate: "2026-03-29"
updatedDate: "2026-03-29"
tags: ["技術", "AI", "開發"]
draft: false
---

## 這篇文章在說什麼

2026 年 3 月，Y Combinator 執行長 Garry Tan 在 GitHub 上開源了他每天在用的 AI 開發工具 gstack。19 天，54,695 顆星星。一個 CTO 朋友試用後跟他說：「這根本是 God Mode。」本文不談使用了幾天或收到了什麼評價，而是深入它的核心架構——一個持久化的瀏覽器 daemon 如何用 200ms 的延遲改變 AI 瀏覽交互的遊戲規則，以及為什麼「角色分離」是比「全能 AI」更正確的設計方向。

---

## 為什麼重要

大多數 AI 程式碼工具對瀏覽器的處理方式都一樣：每次要截圖或做 QA，先啟動一個全新的 Chromium，燒 3-5 秒，等瀏覽器準備好，截圖，結束。對單一操作來說可以接受，但當你需要對同一個登入狀態做 20 次操作時，光啟動瀏覽器就要等上一分鐘，而且每一次的 cookies、localStorage、登入 session 全部歸零——等於每次都是一個全新的瀏覽器。

gstack 的 `/browse` 技能解決了這個問題。它不是另一套 AI prompt，而是一個底層的系統架構：用 Bun 編譯成單一執行檔，在 localhost 上長期運行一個 headless Chromium daemon，Claude Code 透過 HTTP 與它通訊，第一次呼叫約 3 秒，之後每次只需要 ~200ms。

這件事的意義在於：AI 終於可以「看到」你的網頁應用，而且是以一種工程上合理的方式——有狀態、有上下文、有瀏覽器生命週期的管理，而不只是每次截圖後就扔掉。

---

## 技術細節

### 持久化 daemon 模型

gstack 的 daemon 不是 fork Chromium 程序，而是：

```
Claude Code (Tool Call)
       ↓ HTTP POST (localhost)
CLI (Bun 編譯的執行檔)
       ↓
Bun.serve() HTTP Server
       ↓ CDP (Chrome DevTools Protocol)
Persistent Headless Chromium
```

這個架構的關鍵設計決策：

1. **狀態文件 (state file)**：daemon 啟動後寫入 `.gstack/browse.json`，內容包含 PID、PORT、UUID auth token。CLI 啟動時先查這個檔案，做一次 HTTP health check，確認 daemon 活著才送請求。如果 PID 還在但 health check 失敗，就重啟——不用依賴作業系統的 PID 靠譜性。

2. **Bearer token auth**：每個 daemon session 啟動時產生一個隨機 UUID，寫入 state file（mode 0600，僅擁有者可讀）。之後每個 HTTP 請求都必須帶 `Authorization: Bearer <token>` header，保護 daemon 不被同機器的其他 process 意外呼叫。

3. **Idle timeout**：30 分鐘沒請求自動關閉，不需要手動管理行程生命週期。

4. **版本自動重啟**：編譯時把 `git rev-parse HEAD` 寫入 binary，下一次 CLI 執行時比對版本號，若不同就 kill 舊 server、啟動新的——杜絕了「binary 更新了但 server 還在跑舊版」的問題。

### 為什麼用 Bun

作者在 ARCHITECTURE.md 裡明確解釋了四個原因：

- **Compiled binary**：`bun build --compile` 產生一個約 58MB 的單一執行檔，runtime 不需要 node_modules，不需要 npm install，不需要動 PATH。這對安裝到 `~/.claude/skills/` 的工具鏟來說極度重要。
- **Native SQLite**：cookie 解密需要直接讀取 Chromium 的 SQLite cookie 資料庫。Bun 內建 `new Database()`，不需要 `better-sqlite3`，不需要 native addon 編譯。
- **Native TypeScript**：開發階段直接 `bun run server.ts`，不需要 tsc、不需要 ts-node。
- **Built-in HTTP server**：`Bun.serve()` 已經很快，不需要再裝 Express 或 Fastify。

瓶頸永遠是 Chromium，不是 CLI 或 server。Bun 的 startup speed 對 compiled binary 約 1ms vs Node 約 100ms，但這個差距不是選 Bun 的主因——compiled binary + native SQLite 才是。

### Ref 系統：讓 AI 用 @e1 而非 CSS selector 操作 DOM

這是整個架構裡最巧妙的設計。當 AI 需要點擊頁面上的某個元素時，傳統做法是給它一個 CSS selector 或 XPath，但這有幾個問題：

- CSP (Content Security Policy) 會阻擋 DOM injection
- React/Vue/Svelte 的 hydration 可能把注入的屬性 Strip 掉
- Shadow DOM 無法從外部觸及

gstack 的做法是使用 Playwright 的 Accessibility Tree：

1. Agent 呼叫 `$B snapshot -i`
2. Server 呼叫 `page.accessibility.snapshot()`
3. 解析 ARIA tree，給每個元素分配序號：`@e1`, `@e2`, `@e3`
4. 同時建立 Playwright Locator：`getByRole(role, { name }).nth(index)`
5. 存在 BrowserManager 的 Map 裡

之後 `$B click @e3` 時，Server 把 `@e3` 解析成 Locator，執行點擊。這完全繞過了 DOM injection 的限制——所有操作都在 Chromium 內部，沒有任何修改 DOM 的動作。

Staleness detection 也很有意思：SPAs 常在不改 URL 的情況下改變 DOM（比如 React Router 跳轉）。`resolveRef()` 在使用任何 ref 之前會先做 `count()` 檢查，如果元素數量為 0 就立刻拋出明確的錯誤訊息，而不是等到 Playwright 的 30 秒 action timeout。

### 環形緩衝區日志架構

三個獨立的 ring buffer（各 50,000 條 entry），console messages、network requests、dialog events 各一個。寫入是 O(1) 操作，每 1 秒非同步 flush 到磁碟。Server crash 時最多丟失 1 秒的 log，記憶體永遠有上界。對除錯來說，這個設計兼顧了效能與可持久性。

---

## 我的觀點

gstack 讓我最驚訝的不是那些 slash commands，而是背後的系統思維。

很多人討論它「60 天 60 萬行代碼」或「角色分工」——這些都是表象。真正有意思的是：Garry Tan 面對「AI 工具如何操作瀏覽器」這個問題時，沒有選擇「每次開一個新 Chrome + 截圖」的捷徑，而是把「持久狀態」當成第一優先級來解決。他承認了這件事的難度：「瀏覽器是 hard part，其他都是 Markdown。」

這種務實的架構判斷力，是多數 AI 開發工具所缺乏的。

角色分離哲學同樣值得思考。把 `/plan-ceo-review` 和 `/review` 和 `/ship` 做成完全獨立的 skill——不只是不同的 system prompt，而是不同的輸入輸出介面、不同的優先級、不同的「完成」定義——這比在單一對話裡切換 persona 更嚴謹。實際上是在用工程工具的紀律來約束 AI，而不是靠 prompt engineering 的巧思。

當然也有需要注意的地方：gstack 是高度以 Claude Code 為中心的工具。這個設計選擇讓它極度易用，但也意味著它不是跨模型的。如果 Anthropic 改了 Claude Code 的介面，gstack 可能需要跟著更新。這跟 OpenClaw 的多模型策略是兩條不同的路，沒有對錯，只是選擇不同。

最後，54K stars 在 19 天內發生——這個數字說明的不是 gstack 本身有多完美，而是整個產業界對「AI 時代的軟體開發流程」這個問題飢渴了很久。一個人可以開一家軟體公司，gstack 是目前最接近這個願景的開源實現。

---

## 參考連結

- [gstack GitHub 倉庫](https://github.com/garrytan/gstack)（54K stars，MIT License）
- [Architecture 文件](https://github.com/garrytan/gstack/blob/main/ARCHITECTURE.md)
- [A CTO Called It "God Mode" — Inside GStack (TopAIProduct)](https://topaiproduct.com/2026/03/13/a-cto-called-it-god-mode-inside-gstack-garry-tans-6-role-claude-code-toolkit/)
- [Garry Tan 推文引發的開發者討論 (DEV Community)](https://dev.to/createitv/a-cto-called-it-god-mode-garry-tan-just-open-sourced-how-he-ships-10000-lines-of-code-per-week-1ck7)
