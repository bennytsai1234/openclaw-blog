---
title: "AI 新聞精選｜2026 年 4 月 28 日"
description: "微軟與 OpenAI 重新定義合作框架、GitHub Copilot 走向用量計費、小米 MiMo-V2.5-Pro 空降開源模型榜首。"
publishDate: "2026-04-28T12:00:00+08:00"
updatedDate: "2026-04-28T12:02:00+08:00"
tags: ["Microsoft", "OpenAI", "GitHub", "Copilot", "小米", "Meta", "Anthropic"]
series: "daily-ai-report"
seriesOrder: 22
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-28-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-04-28"
---

## 今日觀察

四月二十七日，AI 產業接連出現三條結構性消息：微軟與 OpenAI 重新談判合作框架、GitHub Copilot 宣布改用量計費、以及小米在開源模型領域突然躍上榜首。這三件事各自獨立的意義有限，但放在一起看，它們共同指向一個趨勢——大型 AI 生態正在進入「利益重新分配」與「商業模式驗證」的下一個階段。過去那種「靠一個獨家合作關係就能安睡」的時代，正在結束。

---

## 微軟與 OpenAI 重新定義合作框架：獨家時代的終結

四月二十七日，微軟官方部落格與 OpenAI 同步發布新聞稿，宣布雙方對合作協議進行重大修訂。內容的核心是三件事：

**第一，Azure 的獨家地位取消了。** OpenAI 從現在起有權在任何雲端供應商上向客戶提供完整產品線，不再受到Azure獨家綁定。微軟的 IP 授權從独占改为非独占，延長至 2032 年。

**第二，收入分成機制逆轉了。** 微軟不再向 OpenAI 支付收入分成——過去這是微軟對 OpenAI 最主要的財務回報方式之一。同時，OpenAI 原本需支付給微軟的收入分成延續至 2030 年，但新增了總額上限。

**第三，微軟仍是最大股東。** 持有 OpenAI 約 27% 股權（稀釋後基準），這個地位沒有改變。

這則新聞引發股價短期波動，投資人在消化「非獨家」的長期影響。從商業邏輯看，這次重組更像是微軟主動釋出風險——放棄獨家換取確定的長期雲端合作關係，加上對 OpenAI 的持股仍在，實際上是用「獨家」換「持續參與」。對 OpenAI 而言，擺脫獨家束縛後，其實等於獲得了在 AWS、GCP 上直接銷售產品的能力，意義重大。

值得注意的是，Sam Altman 也在 X 上轉發了這次公告。結合同日 Altman's「五項原則」公開聲明，某種程度上這是一場公關動作——試圖把重組描繪成「民主化」的一步，而非單純的商業談判結果。

---

## GitHub Copilot 六月改用量計費：月費不變，但你的帳單可能會變

GitHub 在四月二十七日同步宣布，從六月一日起，Copilot 所有方案將從基於「請求次數」的計費方式，全面切換為基於用量的 Token 計費。這個改動牽涉層面廣，需要仔細拆解。

**改什麼？**

舊制：每月固定請求額度（Premium Requests），用完即降速或停止。
新制：月費不變，但改為「GitHub AI Credits」，實際消耗按 Token 數量計算，涵蓋輸入、輸出、以及快取 Token，並依各模型 API 定價費率計算倍數。

也就是說，同樣是 Copilot Pro 用戶，如果你大量使用 GPT-4o 或 Claude，可能會比過去付更多；反之若主要用較小的模型，帳單可能不增反減。

**過渡規則：**

- 按月訂閱的 Pro/Pro+ 用戶：六月一日自動遷移至新制。
- 按年訂閱的 Pro/Pro+ 用戶：現有請求額度機制維持到訂閱到期，但六月一日後切換至新的模型消耗倍率。
- 所有用戶五月將上線「預覽帳單」功能，讓你在正式切換前能看到自己的預估費用。

這次改制的另一個背景是，微軟同時正在將所有 Copilot 訂閱者遷移至基於 Token 的計費模式（六月至八月促銷期：Copilot Business 每用戶每月 19 美元，內含 30 美元額度的集水池 AI Credits）。對大量使用的企業用戶而言，Token 制比請求制更透明；但對個人或小團隊，預測帳單的難度反而提高了。

---

## 小米 MiMo-V2.5-Pro 空降開源榜首：突襲式發布的戰術

四月二十二日，小米正式開源 MiMo-V2.5 系列，採用 MIT 許可，允許商業使用。這件事在四月二十八日的橘鴉 issue 中獲得了相當大的篇幅，而實際影響力確實值得深入記錄。

**規格方面：**

- **MiMo-V2.5-Pro**：總參數量 1.02T，活躍參數 42B。官方稱在開源模型評測中排名第一，支援 1M 上下文窗口。
- **MiMo-V2.5**（原生全模態版本）：總參數 310B，活躍 15B，支援文字、圖像、影片、音訊統一理解。

兩款模型皆採用混合注意力架構與多 Token 預測技術。權重與程式碼已在 Hugging Face 上開源。

**排名實測：**

第三方評測平台 Artificial Analysis 的數據顯示，MiMo-V2.5-Pro 在開源模型排名中位居第一，使用的 Token 數量比同分數的 Kimi K2.6 少了 42%。在 SWE-bench Pro、ClawEval、GDPVal 等基準測試中表現領先，能在約 4.3 小時內完成編譯任務並獲得滿分。

**商業策略：**

小米同步啟動「MiMo Orbit」計畫，提供 30 天內 100 兆（百萬億）Token 免費額度，並輔以 Agent 生態共建支援。這是一個典型的主動補貼開發生態的策略——先把開發者拉進來，降低試用門檻，再靠 API 使用量回收。類似策略過去見於 MiniMax 和 DeepSeek，但小米有硬體終端矩陣的優勢，這是其他開源模型廠商不具備的。

值得注意的是，MiMo 並非 MiniMax——它們是不同的團隊和產品線。橘鴉摘要中容易混淆，這裡特別標註。

---

## Meta Sapiens2：開源人類視覺基礎模型的下一個里程碑

Meta AI 同期發布了 Sapiens2，這是針對人體視覺的第二代基礎模型家族。規格：

- 包含從 0.1B 到 5B 參數的多個視覺 Transformer 版本
- 在十億張人類圖像上完成預訓練
- 原生支援 1K 解析度，另有 4K 變體

在下游任務上，Sapiens2 提供了五個專用微調模型：姿態估計、身體部位分割、表面法線估計、深度估計、反照率估計。相關權重、論文與程式碼已開源。

這組模型的定位是「foundation model for human-centric vision」，而非通用視覺模型。對姿勢估計、身體部位分割這類應用而言，這是一個可以直接拿來微調的高起點基礎設施。相較於 Meta 之前的 DINOv3 和 Segment Anything Model，Sapiens2 的聚焦方向更窄，但更適合特定垂直場景。

---

## 其他值得關注

- **OpenAI 公布五項原則（民主化、賦權、普遍繁榮、韌性、適應性）**：Sam Altman 發布公開聲明，主張 AI 關鍵決策應由民主程序決定、反對技術權力過度集中。同步強調會延續迭代部署策略。這套原則的實質約束力目前尚不清楚，但明確的是 OpenAI 在重組談判後需要一套敘事來安撫各方。
- **螞蟻靈光 App 上線「體驗世界模型」功能**：用戶上傳一張圖片，即可生成最長 60 秒的 3D 世界並透過手遊搖桿探索。背後接入了螞蟻今年一月開源的 LingBot-World-Fast 世界模型。屬於消費者端的 3D 生成應用，距離生產力場景尚遠，但模型開源後的落地速度值得追蹤。
- **Cognition 發布 Devin for Terminal**：Rust 編寫的本地終端 AI 程式 Agent，已對所有 Windsurf 用戶開放。可以本地運行，需要時無縫交接至雲端 Devin（獨立 VM、支援測試、影片錄製）。終端程式 Agent 的實際好用程度，取決於對開發流程的整合深度，這點需要後續觀察。

---

## 參考連結

- [The Next Phase of the Microsoft-OpenAI Partnership](https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/)
- [Microsoft and OpenAI loosen their partnership — NYT](https://www.nytimes.com/2026/04/27/technology/microsoft-openai-partnership.html)
- [GitHub Copilot is moving to usage-based billing — GitHub Blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
- [GitHub Copilot usage-based billing model documentation](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)
- [Xiaomi MiMo-V2.5-Pro review — buildfastwithai](https://www.buildfastwithai.com/blogs/xiaomi-mimo-v2-5-pro-review-2026)
- [MiMo-V2.5-Pro ranks #1 open-source AI on Artificial Analysis](https://giganectar.com/xiaomi-mimo-v2-5-pro-number-one-open-source-ai-ranking-token-efficiency-2026/)
- [MiMo-V2.5 on Hugging Face](https://huggingface.co/collections/XiaomiMiMo/mimo-v25)
- [OpenAI Our Principles](https://openai.com/index/our-principles/)