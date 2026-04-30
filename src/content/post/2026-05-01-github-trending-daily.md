---
title: "【熱門專案】2026-05-01 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：Craft Agents、jcode、Ghostty、Browserbase Skills"
publishDate: "2026-05-01T07:30:00+08:00"
updatedDate: "2026-05-01T07:33:00+08:00"
tags: ["Claude", "Rust", "terminal", "browser-automation", "MCP"]
draft: false
---

## GitHub 今日趨勢：Coding Agent 基礎建設與開發體驗同時升級

五月的第一天，GitHub Trending 呈現出一個明確的主題：開發工具的「基底」正在被大量翻新——從 AI Agent 的執行環境、到 Terminal 的效能、再到瀏覽器自動化的整合方式。這些專案不是在做表面的 UI 改進，而是把力氣花在架構層，讓未來其他工具能站在更好的地基上。

---

## lukilabs/craft-agents-oss：讓 AI Agent 用對話就能操作任何 API

[Craft Agents](https://github.com/lukilabs/craft-agents-oss) 來自同名生產力工具 Craft.do 的團隊，開源了該公司內部用於對齊 AI Agent 與真實工作流程的桌面應用。Apache 2.0 授權，可自由改寫。

這個工具的核心思路是「Agent Native」——不做 CLI、不做 config 檔案，而是用自然語言描述你想做什麼，讓 Agent 自己找出並串接需要的 API。Curl 安裝，一行指令完成。支援的連線類型涵蓋了 MCP servers、REST APIs（Google 生態系、Slack、Microsoft）、本地檔案系統，甚至可以直接贴上 OpenAPI spec 或截圖來引導 Agent 理解自訂端點。

在多模型支援方面，可以同時連接 Anthropic（直接 API key 或 Claude Max）、Google AI Studio、ChatGPT Plus（Codex OAuth）、GitHub Copilot OAuth 等多個 provider，工作區域等級的預設值設定讓不同專案使用不同模型變得直覺。遠端伺服器模式也完善——可以把它當成 headless 服務跑在 VPS 上，桌面客户端只是thin client，長期執行的 Agent session 不會因為關機而中断。

適合誰：對目前 Coding Agent 的 CLI 界面感到受限、想要一個有 GUI 但不走傳統設定流程的開發者。

---

## 1jehuang/jcode：14ms 啟動、30+ 模型、支援 Swarm 的 Rust  Coding Agent 引擎

[jcode](https://github.com/1jehuang/jcode) 是一個用 Rust 實作的 coding agent harness，標榜極致效能與多 Agent 協作能力。PyShine 的實測顯示啟動時間僅 14ms，記憶體佔用 27.8MB——這個數字在同類工具中極具競爭力。支援 30+ LLM provider，從 Claude、OpenAI、Gemini、GitHub Copilot、Azure OpenAI 等一線服務，到 OpenRouter、OpenAI-compatible 端點都可以接入，多帳號切換讓你可以輪流消耗不同訂閱的額度。

架構上分為 Client（TUI 層）、Server（Session 管理）、Memory System 與 Provider Integration Layer 四層。TUI 跑在 1000+ FPS，支援 Mermaid 圖表內嵌、側邊面板、info widgets 自定型態。Server 負責所有 session 的生命週期與 Agent 間的訊息路由，當某個 Agent 修改了一個檔案，而另一個 Agent 之前讀過該檔案，Server 會主動通知後者去檢查diff——這是 swarm 協作最關鍵的衝突偵測機制。

Memory System 是 jcode 最特別的部分：對話的每個 turn 都會被向量嵌入，系統會在新的 turn 開始時用 cosine similarity 主動召回相關的歷史記憶並注入到 context，無需 explicit tool call。記憶會自動 consolidated、去除重複、檢查 stale 與衝突，保持長期的準確性。

Swarm 模式讓多個 Agent 可以同時在同一個 repo 運作，支援 DM（Agent 對 Agent 直接訊息）、Repo Broadcast（全 repo 內 Agent）、Global Broadcast（所有 Agent）。Agent 也可以自主 spawn 子 Agent 並變成 coordinator 角色，適用於需要並行開發多個功能的場景，或在 CI/CD pipeline 中以 headless 模式執行。

適合誰：需要跑多個 Coding Agent 協作、對效能與記憶體佔用敏感、想要一個不依附特定雲端服務的自架方案。

---

## ghostty-org/ghostty：用 Zig + Metal/OpenGL 重新定義「原生」Terminal 的可能性

[Ghostty](https://github.com/ghostty-org/ghostty) 是近期終端機討論中的異數——大多數人關注 Warp，但 Ghostty 以完全不同的切入點吸引了 180 位 contributors 在六個月內投了 2,800+ commits，2026 年 3 月的 1.3.0 版本帶來了大量功能更新。

Ghostty 宣言很直接：不做速度、豐富功能、原生 UI 三選一，全部都要。效能與 Alacritty 同級（約 100x 快過 Terminal.app 與 iTerm），但功能密度遠高於 Alacritty。實作方式是多執行緒架構——每個 terminal 有專屬的 read/write/render thread，Linux 用 OpenGL，macOS 用 Metal，parser 使用 CPU SIMD 指令優化。

平台整合深度體現在實際細節：macOS 是真正的 SwiftUI app，有完整 menu bar、Settings GUI，支援 AppleScript 與 Apple Shortcuts（AppIntents）；Linux 版本用 GTK，並深度整合 systemd，支援 always-on、單一實例管理、cgroup 隔離。Roadmap 的第六項「Ghostty-only Terminal Control Sequences」目前尚未實作，代表團隊仍在專注於相容性而非特殊性。

libghostty 是另一個野心的體現：zero-dependency 的 C + Zig 跨平台 library，可將 terminal 功能嵌入到任何第三方應用中，目前 `libghostty-vt` 已經可用於 Zig、C，且支援 macOS、Linux、Windows、WebAssembly。

適合誰：對 Terminal 效能與原生平台整合有高度要求、想要一個願意把資源投入長期架構而非不斷堆疊 short-term feature 的開源終端機。

---

## browserbase/skills：讓 Claude Code 把瀏覽器自動化變成第二天性

[browserbase/skills](https://github.com/browserbase/skills) 是 Browserbase 這間專注於瀏覽器基礎設施的公司開源的 Claude Code plugin，目標是讓 AI agent 能夠可靠地操控瀏覽器——不只是簡單的 page 抓取，而是完整的自動化流程，包括 anti-bot 規避、CAPTCHA 處理、住宅代理。

這組 skills 包含九個子 skill：瀏覽器自動化的 [browser](skills/browser/SKILL.md)、bb CLI 操作的 [browserbase-cli](skills/browserbase-cli/SKILL.md)、雲端無伺服器瀏覽器部署的 [functions](skills/functions/SKILL.md)、自動化失敗診斷的 [site-debugger](skills/site-debugger/SKILL.md)、CDP 追蹤錄製的 [browser-trace](skills/browser-trace/SKILL.md)、用量統計的 [bb-usage](skills/bb-usage/SKILL.md)、Cookie 同步的 [cookie-sync](skills/cookie-sync/SKILL.md)、無 Session 的 HTML/JSON 抓取的 [fetch](skills/fetch/SKILL.md)，以及 AI 對抗性 UI 測試的 [ui-test](skills/ui-test/SKILL.md)。

local 模式的 `browse env local` 現在預設啟動乾淨的隔離瀏覽器，加上 `--auto-connect` 才會重用本地 Chrome session 的 cookies 與登入狀態，對需要兼顧安全性與便利性的開發者是一個合理的預設值。

安裝方式對 Claude Code 用戶非常友善：直接 `/plugin marketplace add browserbase/skills`，不需要手動複製 skill 檔案。對於其他 coding agent（Codex、Cursor 等），用 `npx skills add browserbase/skills` 即可。

適合誰：需要讓 AI Agent 可靠地操作需要登入或有 bot 偵測的網站、想要一個完整的瀏覽器自動化 framework 而非散裝工具湊合。

---

## 今日趨勢觀察

今天 GitHub Trending 的四個入選專案有一個共同方向：**它們都在降低工程師使用先進工具的門檻**。Craft Agents 把「串接任何 API」變成一句自然語言；jcode 把多 Agent 協作與 semantic memory 拉到 Rust 效能等級；Ghostty 把終端機的效能天花板繼續墊高；Browserbase Skills 把瀏覽器自動化的複雜性封裝成一個 plugin。

如果說去年是「Agent 元件爆發年」，那麼今年五月的主題似乎是「把這些元件組裝成對一般開發者友善的產品」——這條路才剛開始。

---

## 參考連結

- [lukilabs/craft-agents-oss](https://github.com/lukilabs/craft-agents-oss)
- [1jehuang/jcode](https://github.com/1jehuang/jcode)
- [ghostty-org/ghostty](https://github.com/ghostty-org/ghostty)
- [browserbase/skills](https://github.com/browserbase/skills)
- [jcode 效能分析（PyShine）](https://pyshine.com/jcode-Next-Generation-Coding-Agent-Harness/)
- [Ghostty 1.3.0 發布 note](https://ghostty.org/docs/install/release-notes/1-3-0)
- [Ghostty 1.3 評測（OMG! Ubuntu）](https://www.omgubuntu.co.uk/2026/03/ghostty-1-3-terminal-brings-big-new-features)