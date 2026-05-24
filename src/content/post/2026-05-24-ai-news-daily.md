---
title: "AI 新聞精選｜2026 年 5 月 24 日"
description: "DeepSeek 擴容、Codex 修限額，Anthropic Mythos 再露出下一步訊號。"
publishDate: "2026-05-24T12:00:00+08:00"
updatedDate: "2026-05-24T18:52:00+08:00"
tags: ["DeepSeek", "Codex", "Anthropic", "Claude Mythos", "Claude Code"]
series: "daily-ai-report"
seriesOrder: 9
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-24-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-05-24"
---

## 今日觀察

5 月 24 日這批消息有個共同點：大家都不在講新模型參數，而是在講模型終於能不能被穩定用起來。DeepSeek 把 API 服務擴容到預設 500 並發，等於直接對接更重的生產流量；Codex 則反過來暴露出另一面，模型再強，如果長對話壓縮把快取命中率打壞，用量體感立刻崩掉；Anthropic 那邊流出的 Mythos 1 線索也不是單純八卦，因為它透露的其實是 Claude Code 與 Claude Security 可能正在往更明確的產品分層走。

---

## 主題一｜DeepSeek 不只是在加速，而是在把便宜 API 推向正式生產

今天最務實的一條，是 DeepSeek 把 API 服務做了提速與擴容。從官方文件看，`deepseek-v4-pro` 的並發上限目前列到 `500`，`deepseek-v4-flash` 則是 `2500`；同一頁也寫明，`deepseek-v4-pro` 在 2026 年 5 月 31 日 15:59 UTC 結束 75% 折扣後，正式價格會固定為原價的四分之一。這兩個訊號放在一起看，比單純「速度變快」更重要，因為它代表 DeepSeek 已經不是只想用低價吸引用戶試玩，而是在調整到能承接較穩定、較大的業務流量。

對工程團隊來說，500 並發不是小修小補。很多團隊卡住的地方從來不是 benchmark，而是排隊、逾時和尖峰時段的吞吐量。如果官方現在敢把預設上限寫進文件，而且還保留更高並發的申請通道，結果就是 DeepSeek 開始更像一個能進正式環境的供應商，而不是只適合低成本實驗的替代選項。再加上價格檔位已經提前講清楚，採購端也比較容易做月度預算，不用一直猜促銷結束後會不會突然翻倍。

這件事和前陣子的模型價格戰有一個差別。過去很多降價消息都只是在搶聲量，但今天這條更像基礎設施補齊後的第二步：先把成本壓下來，再把容量與穩定性補上。對使用 agent、批次生成或多租戶 SaaS 的開發者來說，這比又多幾分 benchmark 分數還實際。

---

## 主題二｜Codex 修掉限額異常後，真正浮上檯面的是 agent 產品的系統工程

Codex 官方今天凌晨回滾了一項系統優化，原因是它在長對話壓縮時拉低了快取命中率，讓不少人感覺用量限制掉得異常快，團隊後來也替所有帳戶重置了限額。這條消息有意思的地方，不只是 bug 修掉了，而是它把 agent 產品最脆弱的地方直接攤開來看：同一個模型，只要上下文壓縮、快取路由、會話續跑策略做得不好，使用體驗就會從「可以全天工作」瞬間變成「三個回合就心驚膽跳」。

OpenAI 自家的 prompt caching 文件其實把這件事講得很直白：相同 prefix 與 `prompt_cache_key` 的請求如果流量過高，可能會被分流到其他機器，快取效果就會下降。Codex 這次踩到的問題，正好證明 agent 產品的競爭已經不只在模型能力，而是在整套長任務執行鏈條。你今天做的是多代理協作、長 session 修碼、還是反覆 compaction，背後都在吃這些系統工程細節。

同一天另一則補充消息更能把脈絡接起來。Codex 負責人 Tibo 透露，目前約 `5%` 的生產流量跑在 `Pi harness`，另外約 `5%` 跑在 `OpenCode`。這個數字不算大，卻已經足夠說明 Codex 的價值正在往外溢出，不再只鎖在官方介面裡。對開發者來說，接下來要比的不是「你有沒有模型」，而是「你能不能把模型放進最順手的工作流，而且不要在第 20 輪對話時突然變貴又變慢」。今天這次修復，某種程度上是在提醒所有 coding agent 團隊：快取命中率和 benchmark 一樣，都是產品核心指標。

---

## 主題三｜Mythos 1 再露臉，但今天還不是 Anthropic 正式放行的日子

Claude 網頁端短暫出現 `Mythos 1` 的消息，很容易被解讀成 Anthropic 準備把最強模型直接丟進一般產品線。不過把時間線攤開來看，這比較像產品封裝往前推了一步，還不是正式發布。Anthropic 在 2026 年 4 月公開 Project Glasswing 時，就已經把 `Claude Mythos Preview` 定位成「未公開的一線模型」，當時同步公布的資料還列出相當激進的能力數字，像是 `SWE-bench Pro 77.8%`、`Terminal-Bench 2.0 82.0%`，明顯高於 `Opus 4.6`。

真正值得追的是 Anthropic 5 月 22 日的後續更新。官方文字已經從「暫不公開」往前挪了一小步，改成在保障措施夠強之後，期待把 Mythos 級模型帶到一般釋出。也就是說，今天 TestingCatalog 抓到的 `claude-mythos-1-preview`、Claude Code 與 Claude Security 相關字串，價值不在於證明模型存在，因為它早就存在；價值在於它暗示 Anthropic 正在把這個原本偏研究與防禦安全場景的能力，整理成比較清楚的產品入口。

這對開發者和企業的影響，是要開始區分兩件事。第一件是模型能力本身，Anthropic 早就證明 Mythos Preview 在攻防與 agentic coding 上明顯比現有公開 Claude 強。第二件是誰能先拿到、以什麼形式拿到。今天的線索比較偏向後者，所以我會把它放在「重要方向確認」而不是「正式新品發布」。如果接下來真的先落在 Claude Code 或 Claude Security，而不是一般聊天介面，那也很合理，因為 Anthropic 現在最在意的顯然還是風險包裝，而不是先搶一輪流量。

---

## 其他值得關注

- **DeepSeek 把價格切換時間講得很早**：5 月 31 日 15:59 UTC 後的 `deepseek-v4-pro` 正式價格已經寫進官方文件，對需要做下月採購與容量預估的團隊很有幫助。
- **Codex 的外部工具生態正在成形**：就算 `Pi harness` 與 `OpenCode` 合計只占約一成流量，這也已經說明開發者想在自己熟悉的殼層裡用同一個模型，而不是被單一入口綁住。

## 參考連結

- https://imjuya.github.io/juya-ai-daily/issue-100/
- https://api-docs.deepseek.com/quick_start/pricing/
- https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit
- https://www.ithome.com/0/954/427.htm
- https://x.com/thsottiaux/status/2058280452851638313
- https://x.com/thsottiaux/status/2058071172361998482
- https://developers.openai.com/api/docs/guides/prompt-caching
- https://www.anthropic.com/glasswing
- https://www.anthropic.com/research/glasswing-initial-update?xs=1
- https://www.testingcatalog.com/anthropic-prepares-mythos-1-for-claude-code-and-claude-security/
