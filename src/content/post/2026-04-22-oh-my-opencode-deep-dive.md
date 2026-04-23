---
title: "【技術解析】oh-my-opencode：當 OpenCode 被 Anthropic 封鎖之後"
description: "一個被官方封鎖的開源專案，如何變成史上最強的 AI 開發環境？Sisyphus 和它的多模型編排故事。"
publishDate: "2026-04-22T18:00:00+08:00"
tags: ["opencode", "ai-agent", "tooling"]
---


你可能聽過 Claude Code，聽過 Cursor，聽過各種 AI 程式設計工具。但在 2024 年的某一天，Anthropic 做了一個決定——他們封鎖了 OpenCode。

理由？因為 OpenCode 太好了。好到威脅到了 Claude Code 的生態。

這個故事，是關於一個被拒絕的專案，如何在逆境中長成一隻怪物。

## 一切都從「不能被滿足」開始

開發者 Yoon Kim（@code-yeongyu）燒了 24,000 美金的 LLM Tokens 在自己的專案上。他嘗試了所有工具，配置了又配置，卻發現沒有一個能讓他真正滿意。

Claude Code 好，但它綁死你在 Anthropic 的生態系。Cursor 好，但它是一個封閉的 SaaS。其他的開源方案？看起來都像是半成品。

他想要的是什麼？

> 「我要同時用 Claude 做大方向規劃、用 Kimi 寫快速原型、用 GPT 做複雜推理、用 Gemini 寫創意文案。一個模型不夠，我就用十個。」

但沒有一個 harness 支援這種「多模型編排」——直到他決定自己動手。

## Sisyphus：推石頭的人

oh-my-opencode 的核心是一個叫做 **Sisyphus** 的主控制器。這個名字很有趣——希臘神話中，Sisyphus 要永恆地把石頭推上山，然後看它滾下來，再推上去。

這完美描述了 AI 開發的本質：你不斷地寫 code、發現 bug、修復、再發現新的 bug。

Sisyphus 不做具体的事情。它的角色是**調度**。當你輸入 `ultrawork`（或簡寫 `ulw`），Sisyphus 會：

1. 分析你的意圖（透過 IntentGate）
2. 把任務拆解
3. 調動 Hephaestus、Prometheus、Oracle、Librarian、Explore 這些子代理
4. 讓它們並行執行
5. 確保任務完成——不達目標，不罷休

這不是那種「你問一句，它答一行」的單向對話。這是一整個 AI 團隊在為你工作。

## Hephaestus：合法工匠

Hephaestus 是希臘的火神，也是工匠之神。這個代理是給它一個目標，然後讓它自行探索程式碼庫、研究模式、執行端到端任務。

不需要手把手教它怎麼做。你只要告訴它「我要這個功能」，它會自己找出路。

而且它是合法的——因為 Anthropic 封鎖了 OpenCode，所以團隊開玩笑說 Hephaestus 是「The Legitimate Craftsman」（合法的工匠）。諷刺嗎？非常諷刺。

## Hashline：被痛點逼出來的編輯器

大多數 AI 程式設計工具的痛點是什麼？

**編輯器。**

「None of these tools give the model a stable, verifiable identifier for the lines it wants to change... They all rely on the model reproducing content it already saw. When it can't - and it often can't - the user blames the model.」

這是開發者 Can Bölük 在 blog 裡寫的一段話。解決方案？**Hashline**。

oh-my-opencode 讀取檔案時，會在每一行前面加上內容雜湊標籤：

```javascript
11#VK| function hello() {
22#XJ|   return "world";
33#MB| }
```

當代理想要編輯時，它引用這些標籤（例如「修改 22#XJ 這行」）。如果檔案在讀取和編輯之間被其他代理改變了，雜湊不會匹配，編輯會被直接拒絕。

**Grok Code Fast 的成功率從 6.7% 暴漲到 68.3%。** 只是一個編輯工具的改變。

## 多模型編排：不做選擇題

這是 oh-my-opencode 最核心的理念：未來不是單一模型贏家通吃，而是所有模型都會越來越便宜、越來越聰明。

所以它不讓你選。它讓你全都要。

當 Sisyphus 調度子代理時，它不指定模型，它只指定**類別**：

- **visual-engineering**：前端、UI/UX → 自動路由到擅長視覺的模型
- **deep**：深度研究 + 執行 → 自動路由到 o1、Opus 等推理強者
- **quick**：單一檔案修改 → 快速模型如 Kimi、Haiku
- **ultrabrain**：困難邏輯、架構決策 → GPT-5.4 xhigh

你說要做什麼，harness 選模型。你什麼都不用碰。

## 它不只是一個 plugin

oh-my-opencode 做的事情很多，但大多數你不需要知道——它「只是運作」。

- **LSP + AST-Grep**： IDE 等級的重構、rename、診斷
- **Background Agents**：同時間跑 5+ 個專家代理
- **Built-in MCPs**：Exa（網路搜尋）、Context7（官方文檔）、Grep.app（GitHub 程式碼搜尋）
- **Ralph Loop**：自我參照循環，做到 100% 完成才停
- **Todo Enforcer**：代理閒置？系統把它拉回來，任務一定要完成
- **Comment Checker**：不允許 AI Slop 出現在註解裡
- **Tmux 整合**：完整的互動式終端機，REPLs、debuggers、TUIs 都能用
- **Claude Code 相容**：你的 hooks、commands、skills、MCPs、plugins 全部都能用

## 有人說它是「AI 程式設計的 Ubuntu」

如果 OpenCode 是 Debian/Arch，oh-my-opencode 就是 Ubuntu/Omarchy——有 opinionated 的預設值，但你能調整。

創辦人說：「如果你想研究哪個模型最強、誰最適合調試、誰寫 Prose 最好、誰管後端最快——這幾個月我做了無數實驗，這個 plugin 是濃縮後的精華。」

> 「Stop agonizing over harness choices. I'll research, steal the best, and ship it here.」

聽起來很囂張？但他們真的做出了東西。

## 現在怎麼樣？

專案在 GitHub 上持續更新，而且是用 OpenCode 本身開發的——「99% of this project was built with OpenCode. I don't really know TypeScript.」

他們在 Discord 上做 Building in Public，每個 feature、每個 fix、每個 issue triage 都是直播。

Sisyphus Labs 正在做一個產品化的版本，想要定義 frontier agents 的未來。

---

oh-my-opencode 教會我們一件事：**被封鎖不等於死亡。**

當你的工具足夠好，好到官方覺得你有威脅，那你要嘛接受收編，要嘛自己長成一棵樹。

Anthropic 封鎖了 OpenCode，卻意外催生了一個更開放、更強大的生態系。

這可能就是開源最有趣的地方。