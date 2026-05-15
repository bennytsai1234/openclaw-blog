---
title: "AI 新聞精選｜2026 年 5 月 15 日"
description: "Cerebras 掛牌首日大漲 68%、螞蟻百靈開源萬億參數思考模型、GitHub Copilot App 進入桌面端 Agent 時代"
publishDate: "2026-05-15T12:00:00+08:00"
updatedDate: "2026-05-15T13:20:00+08:00"
tags: ["Cerebras", "螞蟻百靈", "GitHub Copilot", "Anthropic", "OpenAI"]
series: "daily-ai-report"
seriesOrder: 1
draft: false
---

## 今日觀察

今天的 AI 業界呈現三條不同軸線的突破：晶片基礎設施公司在資本市場寫下年度最大 IPO 紀錄、中國開發者社群迎來萬億參數開源思考模型、以及開發工具正式進入桌面端原生 Agent 時代。每一條軸線背後都有具體的數據支撐，而非停留在「好消息」的層次。

---

## 一、Cerebras 掛牌首日大漲 68%——AI 基礎設施 IPO 正式啟動

5 月 14 日，專注於 AI 加速晶片的 Cerebras Systems 以每股 185 美元定價在納斯達克掛牌，籌集 55.5 億美元。開盤價隨即飆升至 350 美元，較發行價大漲 89%，收盤時仍守住 311.07 美元，漲幅 68%。以此計算，公司完全稀釋估值達到 1067.5 億美元。

這不是一家小公司。Cerebras 的 Wafer Scale Engine 是目前已知面積最大的晶片，專為訓練超大語言模型設計，與 NVIDIA 的 H100/H200 系列在不同的設計哲學下競爭。根據申報文件，2025 年該公司營收有相當比例來自 G42（占 24%）與阿聯酋哈利法科技大學（占 62%），顯示其客戶集中度極高——這在 IPO 市場情緒高漲時不是問題，但遲早會被認真審視。

值得注意的不是 68% 這個數字本身，而是它發生的時機。Cerebras 的 IPO 是 2026 年 AI 板塊公開市場情緒的試金石。NVDA 今年的走勢已經讓「AI 基礎設施」成為華爾街最擁擠的交易之一，而 Cerebras 的首日表現說明市場依然願意為這個故事付出極高的溢價。接下來幾週，所有在排隊的 AI 公司——包括傳聞中的 SpaceX——都會拿這個數字作為參考基准。

對開發者而言，Cerebras 的掛牌意味著 GPU 供應鏈的話語權正在多元化。NVIDIA 目前仍是王者，但當一家專門做超大模型的晶片公司登陸二級市場並獲得認可，訓練基礎設施的採購選擇就會開始分化。

---

## 二、螞蟻百靈正式開源 Ring-2.6-1T——開源思考模型的第三極

螞蟻集團百靈團隊在 5 月 15 日正式開源其萬億參數旗艦思考模型 Ring-2.6-1T，模型已可在 Hugging Face 與魔搭上下載。與多數開源模型不同，Ring-2.6-1T 的核心定位是「執行」而非「回答」——模型從預訓練階段就圍繞多步驟任務與工具協作設計，支援 Agent 風格的規劃與執行迴圈。

具體來說，該模型引入可調節的 Reasoning Effort 機制，提供 high 與 xhigh 兩個推理強度檔位，開發者可根據任務複雜度動態調整 token 消耗與回應速度的平衡。螞蟻集團宣稱在 PinchBench 等多個基準測試中達到 SOTA 水準，但開源社群通常需要幾週才會跑出可信的第三方橫向評測。

過去幾個月，開源思考模型這個賽道已經有了 DeepSeek R2 與 Qwen 3 系列兩個主要玩家，螞蟻百靈此時加入，帶來的是一個明確的信號：中國科技公司在開源模型的布局速度不遜於美國同業，且更願意在發布時選擇全面開源而非限制性授權。對開發者來說，現在有多一個足夠大的基座模型可以直接部署，省去微调的資源。

不過也有一點需要提醒：螞蟻集團的背景意味著這個模型在中國境外的使用場景可能受到額外審查，特別是涉及非中國雲端基础设施的部署。開發者在評估時需要把這層因素一起放進去。

---

## 三、GitHub Copilot App 進入技術預覽——桌面端 Agent 開發的最後一塊拼圖

GitHub 在 5 月 14 日發布了 GitHub Copilot App 的技術預覽版，這是一款原生桌面應用，目標是讓開發者直接在獨立的隔離空間內以 Agent 模式處理 issue、pull request 與完整的功能開發迴圈。

這款應用的核心設計邏輯是：開發者在一個具有專屬分支、檔案環境與對話歷史的隔離空間內啟動 Copilot Agent，Agent 會自動完成程式碼修改、終端驗證與 PR 創建，最後由 Agent Merge 功能自動處理後續的 review 與 CI 檢查。目前 Copilot Pro 與 Pro+ 用戶已可註冊搶先體驗，Business 與 Enterprise 訂閱用戶將在接下來一週內逐步獲得權限。

對比既有的 VS Code 擴展套件，這款獨立應用的差異在於它把 Agent 运行时從 IDE 的生命週期中釋放出來——不會因為 IDE 重啟或擴展崩潰而中斷長時間的開發任務。GitHub 顯然是從 Cline 的架構設計中汲取了靈感（兩者都強調持久性與運行時隔離），但 GitHub 的優勢在於對 issue 與 PR 上下文的原生理解，這是任何第三方工具都難以完全複製的。

接下來的觀察點是 Copilot App 與 GitHub Actions 的定價整合——GitHub 已在 5 月 14 日宣布 Copilot Code Review 將從 6 月 1 日起開始消耗 Actions minutes，這代表 GitHub 正在把 Agent 功能統一收費在 Actions 生態內，而非維持訂閱制的單一模型。

---

## 其他值得關注

- **Anthropic 與蓋茲基金會投入 2 億美元推進 AI 公益**：雙方宣布四年內共同投入 2 億美元贈款、Claude 使用額度與技術支援，聚焦全球健康、生命科學與教育。Anthropic 將把農業等特定領域的改進工具作為公共產品開源。這是迄今為止最大規模的 AI 公益合作案，但 2 億美元分四年相當於每年 5000 萬美元，與其估值相比這個比例其實不算高。
- **OpenAI 準備對 Apple 提起法律行動**：據報導，OpenAI 認為 Apple 在 2024 年 WWDC 宣布的 ChatGPT 整合合作中未能履行協議義務，導致功能入口極深、用户難以找到，且營收遠低於預期的數十億美元水準。Apple 目前尚未對此發表評論。兩家公司的緊張關係正值 OpenAI 籌備 IPO 的前夕，這個時機讓這場官司多了幾層額外的解讀空間。
- **Recursive Superintelligence 獲 6.5 億美元融资，估值 46.5 億美元**：这家由田渊栋、Richard Socher 等人共同創辦的新公司專注於「递归式超智能」——目標是构建能够自动发现弱点并持续自我优化的 AI 系統。Google Ventures 與 Greycroft 領投，AMD Ventures 與 NVIDIA 也有參與。公司目前僅有不到 30 名員工，辦公室分布在倫敦與舊金山。這筆錢與這個願景之間的差距，在短期內會是觀察的重點。

---

## 參考連結

- [Cerebras IPO 官方新聞稿](https://www.cerebras.ai/press-release/cerebras-systems-announces-pricing-of-initial-public-offering)
- [NYT 報導 Cerebras 首日大漲](https://www.nytimes.com/2026/05/14/technology/cerebras-ipo-ai.html)
- [螞蟻百靈 Ring-2.6-1T（Hugging Face）](https://huggingface.co/inclusionAI/Ring-2.6-1T)
- [GitHub Copilot App 技術預覽公告](https://github.blog/changelog/2026-05-14-github-copilot-app-is-now-available-in-technical-preview/)
- [Anthropic × 蓋茲基金會合作公告](https://www.anthropic.com/news/gates-foundation-partnership)
- [TechCrunch 報導 OpenAI 考慮起訴 Apple](https://techcrunch.com/2026/05/14/openai-is-reportedly-preparing-legal-action-against-apple-it-wouldnt-be-the-first-partner-to-feel-burned)
- [Recursive Superintelligence 融資新聞（Tech.eu）](https://tech.eu/2026/05/13/recursive-superintelligence-emerges-from-stealth-with-650m-raise/)