---
title: "AI 晨間精選｜2026 年 5 月 2 日"
description: "Anthropic 喊出 900 億美元估值、GitHub Copilot 全面改成按 token 計費、Musk v. Altman 世紀庭審開盤——本週 AI 產業的三條主軸在同一天亮相。"
publishDate: "2026-05-02T08:00:00+08:00"
updatedDate: "2026-05-02T08:00:00+08:00"
tags: ["Anthropic", "GitHub Copilot", "Musk", "OpenAI", "xAI"]
series: "daily-ai-report"
seriesOrder: 71
draft: false
---

## 今日觀察

AI 產業在勞動節假期迎來三起同類事件，而它們的根源都指向同一件事：錢。Anthropic 正在關閉私人市場的最後一扇窗、GitHub Copilot 把開關從月費制改成流量制、馬斯克在法庭上承認 xAI 拿 OpenAI 模型蒸餾——這三件事表面上是不同的新聞，但內核都是「如何把 AI 變現」這道難題的現階段答案。當投資人願意為 900 億美元買單、當工程師的用量開始被精確追蹤、當創辦人之間互相拆帳的細節在公開法庭上被逐字朗讀，你就知道這個產業已經從「願景」集體轉向「結帳」。

---

## 主題一：Anthropic 估值 900 億——私人市場最後一張票有多貴

TechCrunch 獨家報導，Anthropic 正在向投資人募集新一輪約 500 億美元的資金，目標估值 900 億美元，預計兩週內關帳。這是 AI 產業史上最大規模的私人籌款之一，而距離該公司上一次估值 3800 億（2026 年 2 月）還不到三個月。

營收數據是支撐這個數字的核心。Anthropic 對外公布的年度經常性收入（ARR）是 300 億美元，但據知情人士透露，實際跑率已達到 400 億。兩個月翻轉一次估值，某種程度上反映了市場對 Claude 系列產品的強勁需求——特別是 Claude Code 在程式碼輔助場景的市佔持續上升，讓企業客戶從「試用」轉為「規模部署」。

對比一下：OpenAI 在今年稍早關帳的 F 輪，估值為 8520 億美元。若 Anthropic 以 900 億成交，不只超越自己上輪的 2.3 倍，也正式超越 OpenAI 成為全球估值最高的 AI 公司。

但有一個細節不該被忽略：據報導，部分早期投資人（2024 年以前進場的那些）正在跳過這輪。他們的邏輯是等 Anthropic 年內 IPO 時再現金退出。這個選擇透露了一件事：在私人市場拼命高點套現，和相信這家公司上市後還能繼續漲之間，聰明錢現在偏向前者。

---

## 主題二：GitHub Copilot 全面改為按 token 計費——月費制時代結束

從 2026 年 6 月起，GitHub Copilot 將終止實行多年的統一月費訂閱制，改為「消費多少、付多少」的 token 計費模式。這是微軟與 GitHub 對 Copilot 商業邏輯的一次根本性重構，影響範圍涵蓋 Copilot Pro（$10/月）、Copilot Business（$19/人/月）與 Copilot Enterprise（$39/人/月）。

新規則的核心是：所有透過 Copilot 進行的聊天、代碼解釋、AI 輔助審查等非即時補完的請求，都會被換算成 input / output / 快取三種 token 消耗，以各模型 API 費率計價。月費內附對應額度的「GitHub AI Credits」，超用再逐量扣款。

對開發者的實際影響是什麼？若你每天大量使用 Copilot 處理複雜重構或跨檔案分析，帳單會比現在高；若只是偶爾拿來補完簡單的迴圈，月費可能反而省錢。GitHub 的定價邏輯正在從「軟體訂閱」轉向「雲端用量」，與 Azure OpenAI Service、AWS Bedrock 的收費模型趨同。

從產業角度看，這代表 AI 輔助開發的商業化已經走到第二階段：第一階段是「包月、吃到飽」刺激採用，第二階段是「精準計費、讓用量與收入匹配」。對微軟而言，Copilot 從一個讓營收數字好看的訂閱產品，變成一個可以在用量維度優化利潤的現金牛——而且隨著模型能力提升、每位開發者的平均 token 消耗自然增加，這條營收曲線只會往上。

---

## 主題三：Musk v. Altman 世紀庭審開盤——馬斯克承認蒸餾，法庭成爆料現場

本週在加州奧克蘭聯邦法院開庭的 Musk v. Altman 案，可能是近年來資訊密度最高的 AI 產業法庭記錄。馬斯克親自出庭作證，席間承認 xAI 曾使用 OpenAI 模型訓練 Grok——這個承認在法庭內引發了可聽見的驚呼。

細節比八卦更重要。馬斯克的論點是：他在 2015 年以「非營利 AI 實驗室」共同創辦人的身份捐了 3800 萬美元，卻被 Altman 與 Brockman 轉化成一家估值 8000 億的營利公司。他的核心訴求是把 OpenAI 恢復為非營利架構，並將兩人驅逐出公司。

OpenAI 律師 William Savitt 的反擊則乾淨利落：馬斯克從未真正想讓 OpenAI 做非營利組織，他真正想要的只是在 Google 之外建立一個製衡力量，後來發現自己錯過了最大紅利才提告。Savitt 在庭上也秀出馬斯克旗下 xAI 起诉科羅拉多州AI法規的文件，試圖說明馬斯克並非如其所述那般在意 AI 安全。

另外值得注意的一條支線：xAI 預計最快六月隨 SpaceX 一起上市，目標估值 1.75 兆美元。如果這個時間線屬實，Musk v. Altman 的判決某種程度上也會影響華爾街如何看待一家「同時與前合作夥伴打官司」的 AI 公司的 IPO 訂價。

---

## 其他值得關注

- **Pentagon 與八大科技公司簽署 AI 部署協議**：SpaceX、OpenAI、Google、Nvidia、Reflection、Microsoft、AWS、Oracle 與美國戰爭部簽約，在機密網路部署 AI。Anthropic 不在名單上，之前因「all lawful use」條款爭議被列為供應鏈風險，已提起訴訟。
- **蘋果 M4 Mac 嚴重缺貨**：Cook 在財報會議承認 AI 驅動的需求超乎預期，Mac mini、Studio、Mac Pro 接下來數月都會供應緊張。這對蘋果的 AI 策略是一個正面訊號，但供應鏈能否跟上會是下個挑戰。
- **Mistral Medium 3.5 發布**：Mistral 發表旗艦模型 Medium 3.5，整合對話、推理、程式碼三種能力於一體，並新增非同步雲端代理功能。這是歐洲本土實驗室挑戰美國與中國大陸模型的一次具體動作。

---

## 參考連結

- [Sources: Anthropic potential $900B+ valuation round could happen within 2 weeks](https://techcrunch.com/2026/04/30/anthropic-potential-900b-valuation-round-could-happen-within-two-weeks/)
- [Eight tech giants sign Pentagon deals to build an "AI-first fighting force" across classified networks](https://the-decoder.com/eight-tech-giants-sign-pentagon-deals-to-build-an-ai-first-fighting-force-across-classified-networks/)
- [GitHub Copilot switches to token-based billing in June 2026](https://the-decoder.com/github-copilot-switches-to-token-based-billing-in-june-2026/)
- [Musk v. Altman week 1: Elon Musk says he was duped, warns AI could kill us all, and admits that xAI distills OpenAI's models](https://www.technologyreview.com/2026/05/01/1136800/musk-v-altman-week-1-musk-says-he-was-duped-warns-ai-could-kill-us-all-and-admits-that-xai-distills-openais-models/)