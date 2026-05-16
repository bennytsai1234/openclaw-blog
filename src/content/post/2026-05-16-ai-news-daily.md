---
title: "AI 新聞精選｜2026 年 5 月 16 日"
description: "xAI 開放 Grok 訂閱直連開源 Agent、ChatGPT 進軍個人金融、OpenAI 組織重組全力押注 AI Agent 三大事件同日登場。"
publishDate: "2026-05-16T12:00:00+08:00"
updatedDate: "2026-05-16T12:03:00+08:00"
tags: ["xAI", "Grok", "OpenAI", "ChatGPT", "Anthropic"]
series: "daily-ai-report"
seriesOrder: 2
draft: false
---

## 今日觀察

5 月 16 日的 AI 產業安靜不起來。三件重量級事件擠在同一天：xAI 宣布 Grok 訂閱可以 OAuth 方式直接接進開源 Agent 框架 Hermes Agent；OpenAI 向美國 Pro 用戶開放 ChatGPT 個人金融功能，支援銀行帳戶連結；OpenAI 內部則正式確認將由總裁 Greg Brockman 全面接管產品策略，ChatGPT 與 Codex 合併為單一 Agent 平台。三條新聞各有不同維度，但指向同一個趨勢：各家公司正在用完全不同的方式，把 AI 能力從聊天框往外推——有的靠開源生態、有的靠金融資料、有的靠組織整合。對開發者而言，這一天值得細看的不是某個新模型分數，而是這些路徑背後的邏輯差異。

---

## 主題一 — Grok 訂閱直進 Hermes Agent：訂閱制 AI 的生態突圍

xAI 在 5 月 15 日正式開放 Grok 訂閱透過 OAuth 直接接入 Nous Research 的開源 Agent 框架 Hermes Agent。使用者只需要在 Grok 帳戶做一次 OAuth 授權，即可在 Hermes Agent 內呼叫 Grok 4.3 進行高階推理對話，還能使用 Grok TTS 語音回覆與 Grok Imagine 生成圖片與影片，而且整個流程不需要任何 API Key。

這個整合的意義不在於「又多了一個地方能用 Grok」，而在於它的接入模式。傳統上，付費 AI 服務要接入第三方工具，工程師需要去開發者平台建立金鑰、管理用量、處理付費——流程說不上複雜，但絕對有摩擦。xAI 這次選擇的是 OAuth，也就是讓使用者的 Grok 訂閱身份直接映射到 Hermes Agent，不需要再建立獨立的鑰匙。背後支撐這個模式的，是 Hermes Agent 本身是一個持久化的開源 Agent，會在電腦或 VPS 上長期運行、跨 session 建立記憶體。這種「訂閱等於使用授權」的邏輯，可能會成為日後付費 AI 接入開源生態的事實標準。

值得注意的是，這個整合不只是技術上的可能性。xAI 官方在公告中明確表示「未來將推出更多開源 Agent 的集成」，姿態已經擺出來了。對開源社群來說，這等於是 xAI 在釋出一個訊號：我願意讓我的付費牆成為整個 Agent 生態的流量入口，而不是自己建一個封閉花園。這跟 OpenAI、Anthropic 目前的策略有明顯差異——後兩者更偏向控制輸出層次，API 金鑰是主要介面。xAI 這一步，實驗性質比較強，但方向值得追蹤。

---

## 主題二 — ChatGPT 個人金融：AI 從建議者變成帳戶旁觀者

OpenAI 在同一天向美國 Pro 用戶推出 ChatGPT 個人金融體驗预览版。用户可以通过 Plaid 将银行账户、投资账户和信用卡绑定到 ChatGPT，让 AI 读取余额与交易记录，并基于真实财务数据给出建议。官方内部评测中，GPT-5.5 Thinking 在复杂理财任务上拿到 79 分，GPT-5.5 Pro 则拿到 82.5 分。

這裡有幾個技術細節值得拿出來說。首先，ChatGPT 在這個場景下的能力邊界是「讀取」而非「操作」——它能瀏覽餘額與交易明細，但不能執行任何動帳操作，這個設計很大程度上降低了安全風險，也回應了外界對「AI 操縱帳戶」的疑慮。其次，用戶可以隨時斷開連結，ChatGPT 同步的財務資料會在 30 天內刪除，而「財務記憶」則可以在 Finances 專區單獨檢視與移除，這些都是 GDPR 時代的基本隱私設計，不過放在 ChatGPT 的輪廓下，感覺還是有點不一樣。

比較值得关注的，是 OpenAI 这次选择了与 Intuit 合作——未来用户可以在聊天内直接提交信用卡申请或预约税务顾问，而不只是「查余额、给建议」这种被动角色。如果这个合作方向持续扩展，ChatGPT 的金融能力会从「查询型」走向「行动型」，这两者之间的安全边界设计会完全不同。OpenAI 计划后续将这个功能下放至 Plus 用户，并最终向所有人开放。如果真的到达免费用户圈层，它会成为第一个大规模进入个人财务管理场景的消费级 AI——这在监管层面会带来什么样的压力，目前很难评估，但肯定会是接下来的重要变量。

---

## 主題三 — OpenAI 組織重組：Brockman 接管產品，ChatGPT 與 Codex 合併

據 The Verge、Wired 等多家媒體報導，OpenAI 在 5 月 16 日宣布最新組織調整，正式任命共同創辦人兼總裁 Greg Brockman 全面領導公司產品戰略，並計畫將 ChatGPT 與 Codex 合併為單一平台體驗。Brockman 在內部備忘錄中寫道，公司的產品策略是「全力投入 AI Agent」，並明確表示要「投資單一 Agent 平台，將 ChatGPT 與 Codex 合併為一個統一的 Agent 體驗，服務所有用戶」。

過去一年，OpenAI 的產品線擴張得很快：ChatGPT 是消費者的入口、Codex 是開發者的營收引擎、API 是合作夥伴的底層，這三條線各有團隊、各有优先级，偶爾還互相競爭資源。這次重組的核心邏輯，是把這個分散的結構收斂到一個「以 Agent 為中心」的單一框架。ChatGPT 與 Codex 的介面會越來越模糊——Codex 的自動化能力會逐步嵌入 ChatGPT 的消費者介面，而 ChatGPT 的普及量也會為 Codex 的企業銷售提供背書。兩者最終合併成一個「Agent 平台」，不只是 UX 統一，連底層模型服務都會共享。

這個重組還有一個背景細節：OpenAI 正面臨投資者要求盈利的壓力，且 IPO 傳聞不斷。在這個時間點放棄資源分散、聚焦核心收入驅動力，是合理的選擇，但代價可能是非核心項目被犧牲。從外部觀察，先前討論中的某個「進階影片生成」功能可能會因此退居二線，而那個「統一的 Agent 平台」會吃掉大部分工程資源。這次的重組，比較像是「止血」多於「擴張」。

---

## 其他值得關注

- **Anthropic 重置全體用戶速率限制**：Anthropic 透過官方開者帳號 ClaudeDevs 宣布已為全體用戶重置五小時及每週速率限制，即時生效，無需等待。B 部分媒體解讀為回應市場競爭的調整，而非單純的技術問題。對仰賴 Claude Code 做正式開發的工程師而言，這次重置提供了短期的額度空間，可以注意後續是否有更長期的限額調整方案。

- **Intern-S2-Preview 開源：上海 AI 實驗室的 35B 科學多模態模型**：上海 AI 實驗室發布 Intern-S2-Preview，35B 參數，主打科學多模態推理能力，官方稱其核心表現可比擬萬億參數的 Intern-S1-Pro，且首發材料晶體結構生成能力。模型與程式碼已在 HuggingFace、ModelScope 與 GitHub 公開。對需要處理科學文獻或材料結構的開發者而言，這是一個可以實際部署的開源選項，不只是論文發表。

- **Grok V9 參數量確認：1.5T 對抗 Blackwell 架構**：Elon Musk 確認 xAI 內部正在開發參數量達 1.5T 的 V9 模型，已完成初步訓練並效果出色，後續將加入 Cursor 資料做補充訓練。相較於上一代 V8（公開版本為 v4.2，0.5T），這是一次硬體導向的參數量擴張，對 Blackwell 架構的優化是亮點。距離正式發布還有一段路，但方向已經確立。

---

## 參考連結

- [xAI — Connect Grok to Hermes Agent](https://x.ai/news/grok-hermes)
- [Hermes Agent — xAI Grok OAuth 文件](https://hermes-agent.nousresearch.com/docs/guides/xai-grok-oauth)
- [OpenAI — Personal Finance in ChatGPT](https://openai.com/index/personal-finance-chatgpt/)
- [The Verge — OpenAI reorganizes executives to win AI agent battle](https://www.theverge.com/ai-artificial-intelligence/931544/openai-keeps-shuffling-its-executives-in-bid-to-win-ai-agent-battle)
- [WIRED — OpenAI Reorg: Greg Brockman Product](https://www.wired.com/story/openai-reorg-greg-brockman-product/)
- [GitHub — InternLM Intern-S2](https://github.com/InternLM/Intern-S1)
- [Anthropic — ClaudeDevs rate limit reset](https://x.com/ClaudeDevs/status/2055347539923308703)