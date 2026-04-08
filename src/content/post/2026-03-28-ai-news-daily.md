---
title: "AI 新聞精選｜2026 年 3 月 28 日"
description: "Anthropic 勝訴阻止國防部禁令、預備 IPO 集資 600 億美元；OpenAI ChatGPT 廣告上線 6 週 ARR 破 1 億美元；快手 KAT-Coder V2 支援 OpenClaw；釘釘開源 CLI 工具布局 Agent 場景。"
publishDate: "2026-03-28T20:00:00+08:00"
updatedDate: "2026-03-28"
tags: ["Anthropic", "OpenAI", "OpenClaw"]
draft: false
---

## 今日觀察

今天的新聞清單裡有兩個數字值得記住：六百億，和一億。前者是 Anthropic 傳聞中的 IPO 集資目標，後者是 OpenAI ChatGPT 廣告業務上線六週後的年化收入。這兩個數字放在同一天出現，不是巧合——它們都在回答同一個問題：AI 公司的商業化速度，能不能支撐起外界對這個行業的所有期待？答案看起來是肯定的，但背後的路徑截然不同。

---

## [Anthropic] — 法院擋下國防部禁令後：600 億美元 IPO 輪廓浮現

本週 Anthropic 打了兩場仗，一場在法庭，一場在輿論場。

先說法庭。三藩市聯邦法官 Rita Lin 批准了針對美國國防部的初步禁令，暫時阻止政府將 Anthropic 列為「供應鏈風險」並禁用 Claude 模型。法院認為相關部門的動作涉嫌非法言論自由報復（First Amendment retaliation），裁決目的是恢復此前現狀。Anthropic 的底氣來自於一筆沒談成的合約：五角大廈想要無限制取用 Claude 模型，Anthropic 堅持要有使用保障，結果對方直接發了禁令。這次勝訴讓 Anthropic 短期內不用擔心監管黑天鵝。

但更有爆炸性的是後面的數字。據 CNBC 獨家報導，Anthropic 高管已討論最快於今年第四季度啟動 IPO，擬籌集超過 600 億美元——這讓它成為僅次於沙烏地阿美之後的全球第二大 IPO。如果數字屬實，Anthropic 的估值會一舉超過目前所有上市的 AI 概念股。目前 Anthropic 年化收入已達 190 億美元，商業化速度是其 IPO 最大的底氣。

---

## [Anthropic] — Claude Mythos 內部文件外流：比 Opus 強一個數量級，風險優先發布策略

就在勝訴的同一天，Anthropic 也同時面對了一起資安事故。因 CMS 設定錯誤，近 3,000 份內部文件意外暴露在公開數據儲存中，其中包括代號「Claude Mythos」的新模型草稿。

根據 Fortune 取得的文件，Claude Mythos（內部代號 Capybara）是 Anthropic 的全新第四檔產品線，定位在 Opus 之上。Anthropic 對其測試結果的描述是：在軟體編碼、學術推理和網路安全測試上，較 Claude Opus 4.6 有「戲劇性的分數提升」。公司發言人向 Fortune 證實，該模型代表「一步到位的進步」，也是「公司迄今最强大的產品」。

但真正引發 Anthropic 高度警戒的是網路安全風險。洩露文件中明確寫道：該模型在網路能力上「目前已大幅超越所有其他 AI 模型」，並且「預示著即將到來的一波模型將能以遠超防守方努力的速度利用漏洞」。因此 Anthropic 採用了極為罕見的「先給防守方」策略：早期訪問名單首先開放給網路安全防御機構，而非公眾或企業客戶。同時官方坦言，該模型運行成本極高，需要大幅優化後才會考慮廣泛發布。

---

## [OpenAI] — ChatGPT 廣告 6 週 ARR 破 1 億美元：商業模式轉向

OpenAI 的廣告業務給出了令人意外的數字。據 The Information 獨家報導，OpenAI 在大約六週前於美國地區針對 ChatGPT Free 和 Go 版本用戶上線的廣告試點，其年化收入（ARR）已突破 1 億美元，廣告主數量超過 600 家。

這個數字的意義在於驗證了「AI 原生廣告」商業模式的可規模化路徑。傳統數位廣告市場長期被 Google 和 Meta 壟斷，OpenAI 的切入點是：用戶在對話過程中天然帶有高度意圖信號（intentional signal）——人們問問題的方式比搜尋關鍵字更透露需求。廣告主如果能利用這個信號，定價權會比傳統展示廣告高得多。

OpenAI 計劃於 4 月正式推出自助廣告投放平台，目標是把廣告業務從「銷售團隊推動」變成「軟體自動規模化」。六週破億只是起點。

---

## [OpenClaw] — 快手 KAT-Coder-Pro V2：針對 OpenClaw 優化的編程模型

快手 KwaiKAT 團隊發布了旗艦級編程模型 KAT-Coder-Pro V2。該模型特別針對 OpenClaw 進行了專項訓練與深度優化，旨在解決工具調用失敗與長鏈路任務中斷這兩個 OpenClaw 用戶的核心痛點。

除了傳統編程能力，KAT-Coder-Pro V2 還在前端美學生成方向有所突破：在 Landing Page 和 PPT 場景中，用戶可以透過口語化描述直接生成高品質視覺輸出。目前已全量上線，用戶可透過 StreamLake.com 平台 API 或 Coding Plan 套餐調用。

這條新聞對 OpenClaw 生態的意義在於：模型供應商開始把 OpenClaw 列為一等公民的優化目標，這代表 OpenClaw 的用戶規模和生態活躍度已經到達了被主流廠商「看見」的程度。

---

## 其他值得關注

- **NotebookLM 後台生成上線**：用戶建立 Notebook 或 Artifact 任務後可隨時離開頁面，系統後台執行完畢後自動推送通知到移動設備。這是 AI 工具在非即時使用場景下體驗的重要進步。
- **Claude Code Windows PowerShell 支援**：Claude Code 針對 Windows 平台推出 PowerShell 原生運行支援，無需經 Git Bash 路由。目前為預覽階段，不支援自動模式和沙盒。
- **釘釘開源跨平台 CLI**：釘釘開源了 DingTalk Workspace 命令行工具，將審批、通訊錄、日曆等產品能力封裝為 LLM 可直接呼叫的結構化介面，内置 Agent Skills，無需自定義工具即可使用。

---

## 參考連結

- [Anthropic 勝訴：法院裁決 PDF](https://storage.courtlistener.com/recap/gov.uscourts.cand.465515/gov.uscourts.cand.465515.134.0.pdf)
- [Anthropic 勝訴：CNBC 報導](https://www.cnbc.com/2026/03/26/anthropic-pentagon-dod-claude-court-ruling.html)
- [Claude Mythos：Fortune 獨家報導](https://fortune.com/2026/03/26/anthropic-says-testing-mythos-powerful-new-ai-model-after-data-leak-reveals-its-existence-step-change-in-capabilities/)
- [OpenAI 廣告破億：The Information](https://www.theinformation.com/briefings/exclusive-openai-surpasses-100-million-annualized-revenue-ads-pilot)
- [OpenAI 廣告破億：CNBC](https://www.cnbc.com/2026/03/26/openai-ads-pilot-tops-100-million-in-arr-in-under-2-months.html)
