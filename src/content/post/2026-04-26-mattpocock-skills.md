---
title: "mattpocock/skills：把 AI agent 的工作方法，做成可重用的技能模組"
description: "這不是普通的 prompt 範本庫。mattpocock/skills 展示的是另一條路：把 PRD、TDD、issue 拆解、文章編修與 git 護欄，變成 AI agent 可以反覆調用的工作技能。"
publishDate: "2026-04-26T13:45:00+08:00"
tags: ["AI Agent", "Claude Code", "Skills", "Workflow", "Developer Tools"]
pinned: false
---

最近如果你有在看 Claude Code 那一圈，很容易碰到一個名字：[`mattpocock/skills`](https://github.com/mattpocock/skills)。

乍看之下，它很像一個 prompt 範本庫。裡面是一包一包的 skill，名字也很直白，像 `to-prd`、`to-issues`、`tdd`、`triage-issue`、`edit-article`、`write-a-skill`。但如果只把它理解成「作者把自己常用的提示詞整理出來」，其實有點看輕它了。

這個 repo 真正有意思的地方，在於它示範了一件事：**AI agent 最有複利的資產，不是單次對話裡寫出來的好 prompt，而是能反覆重用的工作方法。**

## 它是什麼？

Matt Pocock 對這個 repo 的描述很直接：這是他自己 `.claude` 目錄裡的 skills 集合。換句話說，這不是為了做展示而生的教學樣板，而是他真的拿來工作的東西。

目前 repo 裡的 skills，大致分成四類：

- **規劃與設計**：`to-prd`、`to-issues`、`grill-me`、`design-an-interface`
- **開發與修 bug**：`tdd`、`triage-issue`、`improve-codebase-architecture`
- **工具與護欄**：`setup-pre-commit`、`git-guardrails-claude-code`
- **寫作與知識管理**：`edit-article`、`ubiquitous-language`、`obsidian-vault`

你很快就會發現，這些 skill 都不是在教模型「怎麼回答比較好聽」，而是在定義它「做事時該怎麼走」。這個差別很重要。

## 這不是 prompt library，而是 workflow library

一般人收藏 prompt，收藏的是一句命令。今天拿來改文章，明天拿來拆需求，效果好不好很看當下狀態。

但 skill 想做的不是這件事。根據 Claude 的技能文件，skill 是放在檔案系統裡的 `SKILL.md`，模型會依描述與上下文自動決定是否調用。這代表 skill 承載的，不只是某段文字，而是一個完整的操作單位。

像 `to-prd` 的價值就不在於它會說「請幫我寫一份 PRD」，而在於它把一段本來很容易散掉的流程收斂成固定手勢：根據目前已經聊過的上下文，整理成 PRD，再送進 GitHub issue。你不需要每次都重講一次，也不需要每次都猜模型會不會抓到重點。

這就是我覺得 `mattpocock/skills` 最值得注意的地方：**它不是在優化答案，而是在優化工作節奏。**

## 為什麼這種東西現在變重要？

因為我們已經慢慢走出「只跟模型聊天」的時代了。

如果你只是拿 ChatGPT 查資料，prompt 當然夠用。可是一旦你開始用 Claude Code、Codex、OpenClaw 這類會讀檔、改檔、拆 issue、跑指令的 agent 工具，問題就不再只是「它知不知道」，而是「它做事穩不穩」。

同一件事，今天它知道要先問清楚需求，明天又直接開工。今天它會乖乖用 TDD，明天又一路改到爆。模型本身可能沒有差很多，真正飄的，是工作方法。

而 `skills` 的目的，就是把這些方法固定下來。

像 `grill-me` 這種 skill 就很能說明問題。一般 AI 很容易太快開始幫你解題，但很多設計問題真正需要的，是先被問透。`grill-me` 做的，不是生成答案，而是把「不要太快給答案，先把模糊處挖乾淨」這個工作姿勢封裝起來。這類東西平常很容易只存在高手的手感裡，skill 則把它變成可攜帶的模組。

## 它對 Claude Code、Codex、OpenClaw 有什麼啟發？

對 **Claude Code** 來說，這個 repo 幾乎是原生生態的一部分。你看像 `git-guardrails-claude-code` 這種 skill，就很明顯是在處理 agent 真的會踩到的風險：git 太敢動，護欄太薄。這不是紙上談兵，是從真實工作流裡長出來的。

對 **Codex** 來說，它不一定能原封不動套用，但很值得拿來做 workflow 設計參考。因為 repo 裡每一個 skill，都在回答同一個問題：這類任務究竟該怎麼被拆解、限制、輸出？這種思路完全可以轉成自己的 playbook。

對 **OpenClaw** 來說，啟發更直接。OpenClaw 本來就有 skill、session、tool 限制與排程能力，所以它不是只能學 prompt 內容，而是可以進一步學 skill 的邊界怎麼畫。換句話說，`mattpocock/skills` 值得抄的，不只是字句，而是它怎麼把「方法」包成可被 agent 反覆呼叫的能力。

## 它也不是沒侷限

這個 repo 很強，但不是萬靈丹。

第一，它很吃作者自己的工作習慣。Matt Pocock 的背景很明顯是工程工作流，所以這套 skills 會天然偏 GitHub、偏 TypeScript、偏開發者協作。這很好，但也代表它不是什麼場景都能直接照搬。

第二，skill 不是越多越好。你若把 skills 當成外掛倉庫，看到什麼都裝，最後很容易變成 agent 身上掛滿招式，卻沒有一套真正穩定的核心手勢。真正有價值的，通常不是裝最多，而是留下最常用、最可信的那幾個。

第三，skill 會把偏好固定下來。這是優點，也是風險。若你太早把一套其實還沒成熟的方法封裝起來，之後每次自動調用，都只是在放大那個偏差。

## 我對這個 repo 的判斷

我覺得 `mattpocock/skills` 最值得看的，不是某一個 skill 特別神，而是它把一個方向示範得很清楚：**AI agent 的下一步，不只是模型升級，而是把工作方法模組化。**

以前大家收藏 prompt。接下來大家會收藏 workflow。再往後，大家會收藏一整套可以被 agent 主動調用的 skills。

這件事的意義不小。模型會換，排行榜會洗，產品介面會一直重包；但你一旦把自己的工作手勢技能化，那些東西才會真正變成自己的資產。

所以如果你問我，這個 repo 值不值得看？我會說，很值得。不是因為它提供了一個終極答案，而是因為它把問題問對了：**與其每次重新教模型做事，不如把做事的方法留下來。**

## 相關連結

- GitHub：<https://github.com/mattpocock/skills>
- Claude Skills 文件：<https://code.claude.com/docs/en/agent-sdk/skills>
