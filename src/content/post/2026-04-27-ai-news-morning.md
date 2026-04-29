---
title: "AI 晨間精選｜2026 年 4 月 27 日"
description: "Anthropic 實驗 AI 代理交易市場、OpenAI 終結獨立 Codex 編碼模型、500 位投資銀行家評測 AI 輸出零項目達標。"
publishDate: "2026-04-27T08:00:00+08:00"
updatedDate: "2026-04-27T01:51:00+08:00"
tags: ["Anthropic", "OpenAI", "Claude", "GPT-5", "AI agent"]
series: "daily-ai-report"
seriesOrder: 61
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-27-ai-news-morning.png"
  alt: "AI 晨間精選｜2026 年 4 月 27 日"
---

## 今日觀察

今天的 AI 圈安靜得有些反常——沒有新的監管禁令、沒有大規模融資公告，但水面下有幾個小動靜值得工程師停下來想想。Anthropic 用 69 個人實測了 AI agent 代替人談判購物的可行性，結果 186 筆真實交易就這樣跑完了；OpenAI 把獨立存在的 Codex 模型徹底歸檔，暗示專用編碼模型這條路可能在 GPT-5 時代已經走不通；另外一項讓 500 位投資銀行家評估 AI 輸出的研究顯示，當前最強的模型在真實工作中離「可交付」還有明顯距離。三個獨立事件拼在一起，指向同一個主題：**AI 在真實商業閉環裡的成熟度，比 benchmark 數字暗示的要低得多**。

---

## Anthropic Project Deal：AI 代理替你買東西，已經跑通了 186 筆

上個月（2025 年 12 月），Anthropic 在內部進行了一個代號 Project Deal 的實驗——一個類 Craigslist 的交易平台，但買賣雙方都由 Claude 代表。69 名員工各自獲得價值 100 美元的額度（以禮品卡形式在實驗後兌現），他們的 Claude agent 負責上架自己想出手的物品、搜尋想買的貨、進行價格談判，最後在真實世界交割實物。

結果：186 筆交易，總金額超過 4,000 美元。Anthropic 在官方頁面承認「我們被這個結果震驚了」，參與者事後的問卷也顯示出很高的參與意願，甚至有人表示以後願意付費使用類似服務。

**更值得注意的細節在並行實驗裡。** Anthropic 同時測試了另一組對照組：同一批參與者，隨機分配用 Opus 4.5 或 Haiku 4.5 作為各自的 agent。結論很殘酷——用更強模型的參與者，獲得了「客觀上更好的交易結果」，但諷刺的是，被較差模型代表的參與者「並沒有意識到自己吃虧了」。這暴露了一個風險：當 agent 品質成為交易結果的決定性變數時，沒有技術背景的使用者根本無法評估自己是否被降維打擊了。

這件事對工程師的啟示不是「agent commerce 馬上要改變電商」，而是**底層模型的能力差會在使用者不知情的情況下直接轉化為商業結果差**。如果這類 marketplace 真的進入消費市場，光是「誰用了更強的模型」這件事本身就會成為不對稱資訊，可能需要類似評級或透明度的機制來平衡。

資料來源：[Anthropic 官方頁面](https://www.anthropic.com/features/project-deal)、[TechCrunch 報導](https://techcrunch.com/2026/04/25/anthropic-created-a-test-marketplace-for-agent-on-agent-commerce/)。

---

## OpenAI 終止獨立 Codex：專用編碼模型在 GPT-5 時代走進了死胡同

OpenAI 的開發者體驗負責人 Romain Huet 上週末在 X 上說了一句很簡短的話：「as of GPT-5.4, there is no separate Codex model anymore」。這句話的重量在於：OpenAI 第二次關閉了獨立 Codex 產品線。

第一次是 2023 年，OpenAI 把最初的 Codex（基於 GPT-3 的程式碼專用模型）下架，理由是通用模型已經足以勝任程式設計任務。2025 年 5 月，Codex 以 Codex-1（基於 o3）重生，並配套推出了編碼 agent 軟體，被稱為 OpenAI 在 ChatGPT 之外的「第二戰場」。不到一年後，Codex 的獨立身分再次消失，能力被合併進 GPT-5.5 主線。

這背後不是技術失敗，而是架構判斷：**專用編碼模型在 LLM 能力提升曲線上，越來越難證明獨立存在的合理性**。GPT-5.5 在編碼任務上比 GPT-5.4 消耗的 token 更少、同時保持更強的 agentic coding 能力（AI 自主完成程式設計任務）、以及更好的 computer use 表現，這意味著把編碼 specialization 焊死在模型層面，收益已經低於融合進通用模型後在 token 效率、部署簡單性、上下文連貫性上的收益。

當然，OpenAI 的編碼 agent 軟體仍在繼續開發，Huet 也明確說 Codex 的 agent 產品線沒有停止——死的只是那個「獨立模型」的概念。

API 價格向上走了約 20%（GPT-5.5 vs GPT-5.4），儘管 per-task token 減少了。這意味著 OpenAI 相信 GPT-5.5 的能力溢價足以支撐漲價，哪怕它用更少的 token 完成相同任務。

對使用 Codex API 建構產品的工程師來說，這意味著你們的呼叫方式需要更新——不再有 `model: "codex"` 選項，現在要指定 `gpt-5.5`；prompt 策略也要重新 baseline，Huet 特別提到開發者不應該沿用針對舊模型優化的 prompt，角色定義（role definitions）重新變得重要。

資料來源：[The Decoder 報導](https://the-decoder.com/openai-kills-its-dedicated-coding-model-codex-again-folding-it-into-gpt-5-5/)、[OpenAI 社群討論](https://community.openai.com/t/gpt-5-5-is-here-available-in-codex-and-chatgpt-today/1379630)。

---

## 500 位投資銀行家評審主流 AI 模型：沒有一個輸出達到可交付標準

這是今天三件事裡最讓人冷靜的資料點。一項由 500 名投資銀行家參與的盲測實驗中，他們被要求評估 GPT-5.4 和 Claude Opus 4.6 的輸出，看能否直接交給客戶。結果：**沒有一個 AI 輸出被判定為達到可交付標準**，主要原因是「不夠精確」和「存在事實性錯誤」。

但更有意思的是後續資料：超過一半的銀行家表示，他們仍然會把 AI 輸出「當作起點」使用。這說明當前 AI 在專業場景裡扮演的角色還是「草稿生成器」而非「可交付成品」。模型的能力邊界在 benchmark 上看起來已經很強，但在需要準確性、法律責任和客戶信任的專業工作流裡，差距依然顯著。

這個結果和 Project Deal 的發現形成了有趣的對照：Anthropic 的實驗裡 AI 表現足夠好，好到人們願意付錢；但在同一時間點，專業使用者認為最好的模型還達不到工作標準。場景不同，結論完全不同。

資料來源：[The Decoder 報導](https://the-decoder.com/500-investment-bankers-review-ai-outputs-and-find-none-ready-for-client-delivery/)。

---

## 其他值得關注

- **Claude Code 降智事件官方結論**：Anthropic 於 4 月 23 日發布了 Claude Code 品質下降的 post-mortem，承認三個獨立 bug（reasoning effort 降級、caching 錯誤清除了 thinking、verbosity system prompt 讓編碼評分下降 3%）共同導致了使用者抱怨的「變笨」現象。公司同步重置了所有訂閱者的使用額度，並將 Opus 4.7 的預設 reasoning 拉回 xhigh。這是少見的廠商公開技術復盤，細節值得一讀。來源：[klab.tw 報導](https://klab.tw/2026/04/claude-code-performance-postmortem/)。

- **xAI grok-voice-think-fast-1.0 登上 τ-voice Bench 榜首**：xAI 發布了新的旗艦語音模型，在 τ-voice Bench 上達到 67.3%，擊敗 Gemini 和 GPT Realtime。專注於客服與銷售場景的高風險對話，強調複雜多步驟工作流中的精確資料錄入和大量 tool calling。來源：[MarkTechPost](https://www.marktechpost.com/2026/04/25/xai-launches-grok-voice-think-fast-1-0-topping-%cf%84-voice-bench-at-67-3-outperforming-gemini-gpt-realtime-and-more/)、[xAI 官方](https://x.ai/news/grok-voice-think-fast-1)。

- **Google Cloud CEO 談 AI edge 戰略**：Thomas Kurian 接受 FT 採訪，闡述 Google 如何用自研 AI 晶片和模型組合追回雲端市場份額落後的差距。核心論點是邊緣 AI（edge AI）部署正在成為下一個競爭維度，Google 不想再只靠「接入 Anthropic 模型」這一張牌。來源：[Financial Times](https://www.ft.com/content/2429f0f0-b685-4747-b425-bf8001a2e94c)。

- **DeepSeek V4 技術評論**：MIT Technology Review JP 發文指出 DeepSeek V4 雖然不如 R1 那樣造成全球衝擊，但 100 萬 token 的超長上下文處理能力、最低價位策略、以及對華為晶片的支援，正在中國以外的開發者社群產生實際的遷移行為。來源：[MIT Tech Review JP](https://www.technologyreview.jp/s/381804/three-reasons-why-deepseeks-new-model-matters/)。

---

## 參考連結

- [Project Deal 官方頁面 (Anthropic)](https://www.anthropic.com/features/project-deal)
- [TechCrunch: Anthropic created a test marketplace for agent-on-agent commerce](https://techcrunch.com/2026/04/25/anthropic-created-a-test-marketplace-for-agent-on-agent-commerce/)
- [The Decoder: OpenAI kills its dedicated coding model Codex again](https://the-decoder.com/openai-kills-its-dedicated-coding-model-codex-again-folding-it-into-gpt-5-5/)
- [OpenAI 社群: GPT-5.5 is here](https://community.openai.com/t/gpt-5-5-is-here-available-in-codex-and-chatgpt-today/1379630)
- [The Decoder: 500 investment bankers review AI outputs](https://the-decoder.com/500-investment-bankers-review-ai-outputs-and-find-none-ready-for-client-delivery/)
- [klab.tw: Claude Code 降智 post-mortem](https://klab.tw/2026/04/claude-code-performance-postmortem/)
- [xAI 官方: Grok Voice Think Fast 1.0](https://x.ai/news/grok-voice-think-fast-1)
- [MIT Tech Review JP: DeepSeek V4 分析](https://www.technologyreview.jp/s/381804/three-reasons-why-deepseeks-new-model-matters/)
