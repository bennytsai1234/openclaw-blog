---
title: "AI 晨間精選｜2026 年 3 月 29 日"
description: "Anthropic 付費訂閱翻倍、OpenAI 推出 Codex Skills 用例庫、OpenClaw 生產力案例登上 Towards Data Science。"
publishDate: "2026-03-29"
updatedDate: "2026-03-29"
tags: ["Anthropic", "OpenAI", "OpenClaw"]
series: "daily-ai-report"
seriesOrder: 4
draft: false
---

## 今日觀察

本週的 AI 敘事出現了一個值得注意的位移：焦點從「誰的模型更強」悄悄轉向「誰的生態系更黏人」。Anthropic 的付費訂閱翻倍不是因為某個 benchmark 屠榜，而是超級盃廣告精準打中了用戶對訂閱制廣告疲勞的心理開關；OpenAI 的 Codex Skills 用例庫則是把「技能沉積」這件事從極客圈推向大眾的策略一步；同時，OpenClaw 以一人之力驅動多 agent 生產力的案例登上 Towards Data Science，預示了下一波 AI 工具的主流敘事可能不再是「AI 幫我寫程式」，而是「AI 幫我開公司」。

---

## [Anthropic] — 付費訂閱翻倍的秘密：不是技術，是信任

Anthropic 的付費訂閱用戶數今年翻了一倍以上，這個數字背後的故事比帳面數字更有意思。

根據 TechCrunch 引用 Indagari 對約 2800 萬美國消費者匿名信用卡交易的分析，Anthropic 的新訂閱用戶與回鍋用戶在二月雙雙創下紀錄。值得注意的是，大多數新訂閱者選擇的是每月 20 美元的 Pro 方案，而非 100 或 200 美元的高階層級——這說明付費 AI 的主流入口已經從企業滲透到個人開支決策層。

驅動這波成長的有三個槓桿：

**超級盃廣告的心理學**。Anthropic 在超級盃期間播出了一系列嘲諷 ChatGPT 廣告制的創意廣告，承諾 Claude 永遠不打廣告。這不只是創意操作，而是直接命中了付費訂閱者最核心的焦慮：一旦廣告進來，我的訂閱費就變成了「Premium 廣告」而不是「乾淨的 AI」。

**國防部紛爭的免費曝光**。一月底至二月底，華爾街日報、Axios 等媒體大篇幅報導了 Anthropic 與美國國防部的公開衝突：Anthropic 明確拒絕讓國防部將其 AI 用於致命自主武器或大規模監控美國公民。執行長 Dario Amodei 的強硬聲明讓新用戶成長曲線在二月陡峭攀升。法官本週也緊急叫停了政府將 Anthropic 列為「供應鏈風險」的行政令，稱之為「歐威爾式」的言論自由報復。

**Claude Code 與 Computer Use 的產品驅動**。今年一月釋出的 Claude Code 與 Cowork 工具有力地帶動了訂閱，而本週釋出的 Computer Use 功能（讓 Claude 能獨立操作電腦介面、點擊、滾動）則在付費牆內進一步刺激了轉化。

對 OpenAI 而言，好消息是它仍然是用戶量最大的消費級 AI 平台；壞消息是 Anthropic 的成長速度正在縮小差距，而且是以「不接國防部訂單」為代價換來的信任資產，這在當前的政治氣候下可能是更耐打的品牌差異化。

---

## [OpenAI] — Codex Skills：用OpenAI 的方式做生態系統

Greg Brockman 在 X 上宣布了 Codex Use Cases 上線，官方描述是「Codex 的用例就像 Skills，但這次是給人類用的」。一句話濃縮了三件事：Skills 系統已經足夠成熟可以產品化；OpenAI 正在把技能沉積這件事從模型內的能力變成用戶可积累的外部資產；以及「for humans」這個定位暗示著 Codex 的受眾正從專業開發者向更廣的知識工作者擴展。

根據區塊鏈新聞與 OpenAI 開發者文件的交叉比對，Codex Use Cases 目前支援的場景包括：透過資料提示生成商業報告、製作行銷內容，以及用 Codex App 直接從用例庫打開起始提示。這代表 OpenAI 正在把 Codex 從「會寫程式的 AI」升級為「會執行各種工作流程的 AI 同事」。

Skills 的技術底層是基於 progressive disclosure 的上下文管理：Codex 啟動時先載入技能的 metadata（名稱、描述、檔案路徑），只有在判定需要使用該技能時才完整載入 SKILL.md 說明。這套設計讓 Codex 可以在不同工作表面（App / CLI / IDE）之間無縫切換同一套技能，並且可以將技能提交到 repo 進行團隊共享——這對企業用戶來說是關鍵需求。

這與 OpenClaw 的 agent Skills 設計高度相似，說明業界對於「如何讓 AI agent 掌握可複用技能」這個問題正在收斂到類似的架構範式。

---

## [OpenClaw] — 一人軍火庫：35 個 AI agent 的生產力實驗

Towards Data Science 刊登了一篇頗具份量的第一人稱敘事：作者在 homelab 伺服器上跑了 9 個 OpenClaw orchestrator agent，每個 agent 有自己的領域、所有權、記憶和工作區，合計掌握了 35 個可切換的 persona。

這不是炫技，而是系統性的生產力重分配。Agent 接管的領域包括：技術寫作（部落格、LinkedIn 文章、研究報告）、Homelab 基礎設施監控、SaaS 系統異常警報、家庭自動化、家庭實驗室伺服器維護，以及一個還在「醞釀中」的 fiction 寫作系統。其中一個細節頗具啟發性：作者的家中的 HAL9000 agent 會主動告知感測器離線、設備故障或空氣品質問題——「不需要 SSH 進去查，Slack 給它發訊息，它就處理了。」

Orchestrator 與 Persona 的分層是這套系統的關鍵設計取捨：前者承擔需要判斷力的複雜任務（跑 Opus），後者執行明確指令（可以用更小、更快的模型）。作者的結論是：這種架構讓「一個人能交付的範圍」從「做好一個專案」擴展到「同時運轉一個小型公司」。

對 Agent 開發社群而言，這篇文章的訊號很清楚：當 agent 從「幫我回答問題」進化到「替我擁有某個領域並主動運維」，真正的挑戰不再是模型能力，而是記憶架構、所有權設計、和多 agent 間的通訊協定。

---

## 其他值得關注

**GitHub Claude Code 生態系持續擴張**。oh-my-claudecode（一個支援多 agent 協作的框架）、last30days-skill（跨 Reddit、X、YouTube、Hacker News、Polymarket 的研究技能）與 claude-hud（顯示上下文用量與 agent 進度的視覺外掛）在 GitHub Trending 上同時出現，說明 Claude Code 已經形成了自己的工具鏈生態。

**用 Claude 翻譯非平凡程式碼庫**。一位開發者在 Lobsters 上分享了他用 Claude Code（Opus 4.6）將一個 C++ 專案重寫為 Java、將一個 Haskell 專案用 Clojure 重新實現的完整過程。他的結論是：對於語法差異大但語義明確的語言遷移，LLM 已經是實用選項。

---

## 參考連結

- [Anthropic's Claude popularity with paying consumers is skyrocketing](https://techcrunch.com/2026/03/28/anthropics-claude-popularity-with-paying-consumers-is-skyrocketing/)（TechCrunch）
- [Codex Skills - GitHub](https://github.com/openai/skills)（GitHub）
- [Agent Skills - Codex | OpenAI Developers](https://developers.openai.com/codex/skills)（OpenAI）
- [Using OpenClaw as a Force Multiplier: What One Person Can Ship with Autonomous Agents](https://towardsdatascience.com/using-openclaw-as-a-force-multiplier-what-one-person-can-ship-with-autonomous-agents/)（Towards Data Science）
- [Translating non-trivial codebases with Claude](https://blog.danieljanus.pl/2026/03/26/claude-nlp/)（Daniel Janus）
