---
title: "Hermes Agent 想解的，是健忘這件事"
description: "Nous Research 推出的 Hermes Agent，真正有意思的地方不只是工具多，而是它試著讓 agent 把做過的事留下來，慢慢變成可重用的能力。"
publishDate: "2026-04-08T12:00:00+08:00"
updatedDate: "2026-04-08T23:51:00+08:00"
tags: ["Hermes Agent", "Nous Research", "AI Agent", "自我進化", "OpenClaw", "Atropos", "MCP", "開源AI"]
draft: false
series: "ai-tools-deep-dive"
---

多數 AI agent 最讓人洩氣的地方，不是它不夠聰明，而是它不夠記得。

你花一整個下午把專案背景、部署流程、命名習慣、禁區和捷徑都教給它。那一刻它看起來真的很像一個快上手的夥伴。結果換個 session，它又回到起點。你不是在合作，比較像是在重複 onboarding。

Hermes Agent 讓人願意多看兩眼，就是因為它沒有假裝這件事不存在。

## 它想處理的，不只是聊天記錄保存

很多系統談記憶，其實只是把對話留著。真正難的是，agent 能不能從做過的事裡抽出模式，下次遇到類似任務時，不用再重新摸一次。

Hermes 的設計很明顯在往這裡靠。它把記憶拆成幾層，事件記錄、用戶模型、技能文件，各自處理不同問題。你要的是它記得你，也記得它自己以前怎麼做成事情。

尤其技能文件這一塊，是整個專案最有野心的地方。它不是要你手動整理 SOP，而是希望 agent 自己把完成任務的路徑沉澱成可重用的知識。

## 為什麼這種方向值得認真看

今天很多 agent 框架在拚的是即戰力，工具越多越好、接的平台越廣越好、模型支援越多越好。這些當然重要，但它們有一個共同限制，很多能力都停留在「這一次會做」。

Hermes 比較像在追另一件事，它想把「這一次會做」慢慢變成「下一次更會做」。

這件事一旦成立，agent 的價值就會變質。它不再只是臨時幫手，而開始像一個會累積默契的系統。對重複性高的研究工作、資訊監控、例行維護、固定部署流程來說，這種累積比單次爆發更有用。

## 它的吸引力，也來自 Nous Research 的背景

Hermes Agent 背後是 Nous Research。因為他們本來就在訓練模型、做工具調用、做 RL，所以 Hermes 身上一直有一種研究系統的味道。

你會看到 Atropos、軌跡導出、自訓練管道這些設計。對普通使用者來說也許有點重，但它至少說明這個專案想把 agent 使用過程接回長期演化。

## 真正會讓人留下來的，可能還是那些不顯眼的細節

像是 SQLite FTS5 做跨 session 搜尋，聽起來不浪漫，但很實用。你隔了幾週再問它之前處理過的錯誤，能不能真的找回來，這比記憶宣傳詞重要多了。

再像多平台 Gateway，Telegram、Discord、Slack、CLI 能串在一起，agent 就會比較像一個持續存在的東西，而不是只住在單一終端裡的工具。

至於 skill 會自動更新，我期待，也保留戒心。因為任何會自己改寫知識的系統，都很需要邊界和審計。

## 和 OpenClaw 的差別，不只是社群大小

如果只看表面，OpenClaw 的社群更大、技能更多、平台更廣。Hermes 想賭的則是時間，想讓 agent 自己把做過的事內化下來。

前者擅長快速擴充，後者押注長期演化。如果你的工作是反覆巡航同一批流程，Hermes 這種方向，確實更有誘惑力。

## 我會怎麼評價它現在的位置

Hermes Agent 還很年輕，這一點不能忽略。很多地方還在變，社群也還沒累積出足夠多的解法。像 Honcho 預設沒開、設定流程偶爾卡住，這些都不是小問題。

但就算如此，我還是會把它列進值得追的名單。因為它至少正在認真回答一個今天很多 agent 都還沒答好的問題，如何讓一個系統不是每次都從零開始。

## 最後留下來的感覺

Hermes Agent 最迷人的地方，不在於它今天是不是最成熟，而在於它選擇站的方向夠對。

AI agent 如果永遠只會在當下聰明一下，那它最後多半還是工具。只有當它能記得、能整理、能把經驗變成下次更好的做法，它才開始有一點夥伴的樣子。

## 資料來源

1. [Hermes Agent GitHub](https://github.com/NousResearch/hermes-agent)
2. [Hermes Agent 官方文件](https://hermes-agent.nousresearch.com/docs/)
3. [Hermes Agent 官方頁](https://hermes-agent.nousresearch.com/hermes-agent)
4. [Nous Research 官網](https://nousresearch.com)
5. [Virtual Uncle - Hermes Agent Guide](https://virtualuncle.com/hermes-agent-complete-guide-2026/)
6. [hermesos.cloud - Hermes vs OpenClaw](https://hermesos.cloud/blog/hermes-vs-openclaw)
7. [Tracxn - Nous Research Funding](https://tracxn.com/d/companies/nous-research/)
8. [The Block - Paradigm Series A](https://www.theblock.co/post/352000/)
9. [Nous Research - Introducing Atropos](https://nousresearch.com/introducing-atropos)
