---
title: "AI 晨間精選｜2026 年 4 月 25 日"
description: "Google 注資 Anthropic 400 億美元創紀錄、DeepSeek V4 破百萬上下文衝擊開源格局、Meta 轉向 AWS 自研 CPU，本週 AI 格局正在重寫。"
publishDate: "2026-04-25T08:00:00+08:00"
updatedDate: "2026-04-25T08:08:00+08:00"
tags: ["Google", "Anthropic", "DeepSeek", "Meta", "Graviton", "OpenAI"]
series: "daily-ai-report"
seriesOrder: 28
draft: false
---

## 今日觀察

2026 年 4 月 25 日的 AI 產業安靜不起來。過去 48 小時內，三條主線同時推進：Google 宣布對 Anthropic 最多 400 億美元投資、NEC 讓 30,000 名員工集體上船使用 Claude、DeepSeek V4 預覽版低調上線。表面上這是三條不相關的公告，拼在一起看，訊號很清楚，算力佈局決定誰能在下一代 AI 格局裡站得住腳，而這場佈局的規模已經邁入天文數字。與此同時，Meta 悄悄從 AWS 掃走數千萬顆 Graviton 5 CPU 核心，暗示 GPU 不是 AI 硬體的唯一戰場。

---

## Google 對 Anthropic 最高 400 億美元：AI 軍備競賽進入新量級

這次公佈的結構值得細看：Google 先掏 100 億美元讓 Anthropic 估值站上 3,500 億美元，後續再依據績效目標注入 300 億，總規模有機會觸及 400 億。同一週 Anthropic 也從亞馬遜拿到了 50 億美元，加上之前 CoreWeave 的雲端協議，這家公司短期內等於同時吃進三家雲端巨頭的資源。

這不只是財務操作。Anthropic 近期推出的 Mythos 模型——號稱有顯著網路安全應用能力——因為潛在濫用風險，已被限制在特定合作夥伴範圍內，同時已經外流到未授權用戶手中。Mythos 的算力消耗預計相當驚人，這解釋了為什麼 Anthropic 要在短時間內密集鎖定多筆資金。值得工程師注意的是：Google 與 Anthropic 的合作不只在雲端，雙方也和 Broadcom 聯手，目標是 2027 年前提供 3.5GW 的 TPU 算力，這個數字已經是小型資料中心總容量。

對開發者而言，這意味著 Anthropic 模型背後的基礎設施正在快速與 Google 生態深度整合。如果你的產品高度依賴 Claude API 或 Anthropic 的模型能力，未來的定價、可用性、以及地理分布都會與這幾筆巨額雲端合作直接掛鉤。

---

## DeepSeek V4 預覽版：開源模型正式進入百萬上下文時代

DeepSeek V4 預覽版在 4 月 24 日低調上線，卻在技術圈引發了相當程度的討論。這次有兩個版本：V4-Pro 面向複雜 Agent 工作負載，V4-Flash 主打快速低成本。兩者皆已可在 DeepSeek 官網和 API 使用。

核心突破是上下文窗口。兩版本均預設支援 100 萬個 token——相當於把《魔戒》三部曲加《哈比人》全部塞進一次對話。以往長上下文模型的主要瓶頸在注意力機制（attention mechanism），模型需要把 prompt 中每個 token 與其他所有 token 比較，成本隨長度二次方成長。DeepSeek 的解法是讓模型「選擇性專注」：新資訊保持完整注意力，舊資訊則動態壓縮。官方數據顯示，V4-Pro 在 100 萬 token 上下文下，計算資源消耗僅有前代 V3.2 的 27%，記憶體用量壓到 10%；V4-Flash 更誇張，兩項指標分別只有 7% 和 3%。

這個效率改進的實際意義很明確：過去 Agent 處理長程式碼庫、龐大文件集或跨會議對話時需要反覆回顧，現在可以把整個語境一次吃進去。DeepSeek 也明確表示已針對 Claude Code、OpenClaw、CodeBuddy 等主流 Agent 框架做最佳化，這對工程師社群有直接吸引力。

價格同樣是賣點。V4-Pro 每百萬輸入 token 收費 1.74 美元、輸出 3.48 美元，V4-Flash 更壓到 0.14 美元和 0.28 美元，相比 Claude Opus 4.6、GPT-5.4、Gemini 3.1 這些閉源對手，約只有十分之一的報價。根據 DeepSeek 發布的技術報告，V4-Pro 在多項 benchmark 上已與這些封閉旗艦模型平起平坐；在 85 位資深開發者的內部評測中，超過 90% 把 V4-Pro 列入 coding 任務的首選名單。

另一個值得注意的技術細節：V4 是 DeepSeek 首次全面最佳化華為 Ascend 晶片的模型。考慮到美國對中國的出口管制，DeepSeek 走向國產硬體的路徑幾乎是必然，但也讓這次發布同時成為中美 AI 供應鏈脫鉤的一個觀察樣本。

---

## Meta 掃走 AWS Graviton 5 核心：CPU 在 AI Agent 時代的角色翻轉

當所有目光都在 GPU 軍備競賽上時，Meta 默默從 AWS 敲定了一筆數量級極大的 Graviton 5 處理器核心訂單，成為全球最大 Graviton 客戶之一。這次採購的硬體不是用來訓練模型，而是支撐 AI Agent 系統的「orchestration 與協調」工作。

這裡需要一個認知框架：GPU 擅長大量平行矩陣運算，適合模型訓練階段；一旦模型進入實際部署、協調多個子任務、維持對話狀態、規劃下一步操作——這些工作更適合用 CPU 來處理。隨著 Agent 應用從概念走向生產級規模，這種分工正在被重新定價。Meta 之前已經部署了 Nvidia 的 Grace CPU，今年三月也和 ARM 合作開發資料中心晶片；現在再加上 AWS Graviton 5，意味著 Meta 的 AI 硬體棧呈現三軌並行。

對工程師的啟示是，如果你正在構建需要長時間運行、狀態管理複雜，或需要同時維護多個工具上下文的 Agent 系統，CPU 規格會直接影響延遲和成本表現。Graviton 5 基於 ARM 架構，與傳統 x86 相比在每瓦效能上有優勢，這是雲端廠商願意大舉投資的原因。

---

## OpenAI GPT-5.5：Benchmark 王者與幻覺地獄

GPT-5.5 於本週稍早全面登陸 API，Artificial Analysis Intelligence Index 給出 60 分，以 3 分差距壓過 Claude Opus 4.7 與 Gemini 3.1 Pro Preview 共同守住的 57 分。OpenAI 重新站上榜首，這點不意外——意外的是它怎麼代價爬上來的。

根據 Artificial Analysis 的 AA Omniscience 基準測試，GPT-5.5 在事實召回（factual recall）上領先所有模型，準確率達 57%；但幻覺率（hallucination rate）也飆到 86%，遠高於 Claude Opus 4.7 的 36% 和 Gemini 3.1 的 50%。翻譯成白話：GPT-5.5 比同業更會回答問題，但同時也更會胡亂回答問題。這個 trade-off 在 benchmark 上看起來像是分數提升，在需要精確可靠的實際應用中，卻可能是災難。

價格方面，每百萬輸入 token 5 美元、輸出 30 美元，比 GPT-5.4 貴約 20%。但因為 token 消耗量減少約 40%，實際成本增幅低於帳面數字。與 Claude Opus 4.7 相比，GPT-5.5 在中算力等級就能達到 Opus 4.7 最大算力等級的表現水準，費用卻只有後者的四分之一。對預算敏感的開發團隊，這個性價比數字值得計入選型考量。

---

## 其他值得關注

- **Anthropic 與 NEC 達成策略合作**：NEC 將對 30,000 名員工部署 Claude，涵蓋內部工程到金融、製造、資安等垂直產業應用。這是 Anthropic 首個日本全球合作夥伴，對想進軍日本市場的 AI 應用開發者而言，Claude 的企業滲透率正在快速拉開。
- **ComfyUI 估值達 5 億美元，獲 3,000 萬美元新一輪融資**：專注於 AI 圖像生成流程控制的開源工具鏈，正在建立與封閉平台不同的差異化路徑。對從事 AI 影像應用的工程師，ComfyUI 的技術棧值得關注。
- **Cohere 收購 Aleph Alpha，德國 AI 新創加入跨大西洋陣營**：繼 Anthropic、OpenAI 各自站隊之後，歐洲的自研 AI 勢力開始重組，德國最大 AI 新創之一的 Aleph Alpha 由加拿大 Cohere 接手。

---

## 參考連結

- [Google to invest up to $40B in Anthropic (TechCrunch)](https://techcrunch.com/2026/04/24/google-to-invest-up-to-40b-in-anthropic-in-cash-and-compute/)
- [Three reasons why DeepSeek's V4 matters (MIT Technology Review)](https://www.technologyreview.com/2026/04/24/1136422/why-deepseeks-v4-matters/)
- [Meta buys AWS Graviton 5 processor cores (The Decoder)](https://the-decoder.com/meta-buys-tens-of-millions-of-aws-graviton-5-processor-cores-from-amazon/)
- [GPT-5.5 tops benchmarks but still hallucinates (The Decoder)](https://the-decoder.com/gpt-5-5-tops-benchmarks-but-still-hallucinates-frequently-and-costs-20-percent-more-over-the-api/)
- [Anthropic and NEC collaborate (Anthropic)](https://www.anthropic.com/news/anthropic-nec)
