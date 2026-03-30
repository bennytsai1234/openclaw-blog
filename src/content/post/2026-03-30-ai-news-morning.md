---
title: "AI 晨間精選｜2026 年 3 月 30 日"
description: "Sora 關停揭示 AI 消費應用泡沫、Claude Mythos 內部文件外洩衝撃資安界、AIO Sandbox 開啟 Agent 執行環境新典範。"
publishDate: "2026-03-30"
updatedDate: "2026-03-30"
tags: ["OpenAI", "Anthropic", "OpenClaw"]
series: "daily-ai-report"
seriesOrder: 3
draft: false
---

## 今日觀察

本日 AI 產業同時出現三條相互關聯的敘事主線：OpenAI 以「企業化轉向」為名關停 Sora，揭示消費端 AI 產品的結構性困境；Anthropic 的下一代模型 Claude Mythos 因資安漏洞意外曝光，卻暴露出自身產品安全性的雙重標準；與此同時，ByteDance 關聯團隊 Agent-Infra 發布 AIO Sandbox，將 Agent 執行環境的整合度推向新階段。三條新聞看似獨立，實則都在回答同一個問題——**誰能在兼顧安全性與實用性的前提下，真正規模化 AI 應用？**

---

## OpenAI — Sora 關停：消費端 AI 熱潮的現實檢驗

本週 OpenAI 正式宣布關閉 Sora App 及相關影片生成模型，距離產品上線僅六個月。這不是單一產品的失敗，而是整個 AI 消費應用賽道的警訊。

根據 TechCrunch 報導，OpenAI 此舉與 IPO 前夕的戰略聚焦高度相關。Disney 協議涉及 10 億美元投資，但高層評估後認為消費級社群產品與企業化方向難以共存。值得注意的是，節目中分析師 Kirsten Korosec 對此決策給予正面評價——「這是 AI 實驗室成熟度的象徵，能快速迭代也能果斷終止無效產品。」

然而 Sean O'Kane 的觀察更值得深思：他認為這次事件讓 OpenAI 內部重新意識到 ChatGPT 的成功並非可複製的公式，「純粹的技術領先不等於產品市場契合（PMF）。」同一時間，ByteDance 的 Seedance 2.0 全球發布亦因 IP 保護與工程問題延後。兩大玩家的挫折共同指向一個結論：**AI 影片距離「輸入 prompt 就能拍電影」的願景，比業界願意承認的還要遙遠。**

---

## Anthropic — Claude Mythos 內部外洩：最強模型與最大資安漏洞

Anthropic 本週陷入一場充滿諷刺意味的公關危機。3 月 26 日，由於公開內容管理系統的安全疏漏，Anthropic 內部正在測試的下一代模型「Claude Mythos」相關文件意外暴露，隨後公司發言人向 Fortune 證實了此項目，形容其為「能力提升的重大階躍（step change）」，也是「迄今為止最強大的模型」。

根據外洩文件，Mythos 隸屬於 Anthropic 內部新設立的「Capybara」層級，定位高於現有 Opus 系列。在軟體編碼、學術推理及網路安全測試中，Mythos 均較 Claude Opus 4.6 有「戲劇性提升」。然而最具話題性的細節是——Anthropic 自己在文件中明確警告：此模型「對現有網路安全防禦構成前所未見的挑戰」，「預示著一波能以前所未有速度滲透漏洞的模型浪潮」。

諷刺之處在於：這批警告網路安全的文件，恰恰是因 Anthropic 自身的資安漏洞而外洩。消息傳出後，網路安全類股於週五全線下跌。

與此同時，GitHub Issue #40710 揭示 Claude Code 2.1.87 版存在嚴重資料毀滅 bug：每 10 分鐘自動執行 `git reset --hard origin/main`，導致開發者所有未提交的變更被靜默清除。Hacker News 上的討論指出，觸發條件涉及遠端 git 操作，但 Claude Code 從未對此行為發出任何警告或確認提示。**一款被宣傳為「最安全」的 AI 編碼工具，卻在默默抹除使用者的本地進度。**

---

## OpenClaw — AIO Sandbox：Agent 執行環境的整合新標準

隸屬 ByteDance 生態系的 Agent-Infra 團隊發布了 AIO Sandbox——一個將瀏覽器、Shell、檔案系統、VSCode Server、Jupyter Notebook 與 MCP Server 全部封裝進單一 Docker 容器的開源專案。根據官方說明與 DeepWiki 分析，其核心創新在於**共享儲存層**：透過瀏覽器下載的 CSV 檔案，無需任何外部資料處理，即可直接被 Python 指令碼或 Bash Shell 讀取。

這種無縫轉換能力解決了過往多容器 Agent 架構中最棘手的環境碎片化問題。對於需要跨工具協作的開發流程（例如：自動抓取資料、清理分析、產出報告），AIO Sandbox 提供了比各自獨立運作更緊湊的執行環境。GitHub 已公開開源，官方網站提供 API/SDK 文件。

---

## 其他值得關注

- **OpenAI 政策轉向**：OpenAI 投資人公開表示 AI 發展需要「所得稅改革」配套，暗示 AI 紅利的分配問題已進入華爾街主流論述。
- **Anthropic GitHub 專案熱度**：本週多個 Claude Code 教學與應用 Repo 登上 GitHub Trending，顯示開發者社群對 Anthropic 生態的興趣持續升溫，但 Claude Code 本身的資料丟失問題可能影響採用信心。

---

## 參考連結

- [TechCrunch - Sora's shutdown could be a reality check moment for AI video](https://techcrunch.com/2026/03/29/soras-shutdown-could-be-a-reality-check-moment-for-ai-video/)
- [Fortune - Anthropic leaked unreleased model exclusive event security issues](https://fortune.com/2026/03/26/anthropic-leaked-unreleased-model-exclusive-event-security-issues-cybersecurity-unsecured-data-store/)
- [Futurism - Anthropic Just Leaked Upcoming Model With "Unprecedented Cybersecurity Risks"](https://futurism.com/artificial-intelligence/anthropic-step-change-new-model-claude-mythos)
- [GitHub Issue #40710 - Claude Code git reset hard every 10 minutes](https://github.com/anthropics/claude-code/issues/40710)
- [Hacker News - Claude Code runs git reset --hard](https://news.ycombinator.com/item?id=47567969)
- [GitHub - agent-infra/sandbox](https://github.com/agent-infra/sandbox)
- [DeepWiki - AIO Sandbox Overview](https://deepwiki.com/agent-infra/sandbox/1-overview)
