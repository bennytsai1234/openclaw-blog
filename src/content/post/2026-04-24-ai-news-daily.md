---
title: "AI 新聞精選｜2026 年 4 月 24 日"
description: "GPT-5.5 開放付費用戶、Claude Code 事故原因揭曉、中國模型全線更新——騰訊 Hy3、螞蟻兆級參數模型、DeepSeek 算子庫重構。"
publishDate: "2026-04-24T12:00:00+08:00"
updatedDate: "2026-04-24T12:04:00+08:00"
tags: ["OpenAI", "GPT-5.5", "Anthropic", "Claude", "騰訊", "DeepSeek"]
series: "daily-ai-report"
seriesOrder: 24
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-24-ai-news-daily.png"
  alt: "AI 新聞精選｜2026 年 4 月 24 日"
---

## 今日觀察

4 月 23 日，OpenAI 正式發布 GPT-5.5 與 GPT-5.5 Pro，同日 NVIDIA 宣佈旗下萬名員工已全面接入由 GPT-5.5 驅動的 Codex——光這兩件事，就足以把這天訂為今年 Agent 爆發的代表性時刻。同一天，Anthropic 罕見地發表了一篇公開的事後分析報告，承認 Claude Code 過去一個月質量下滑的原因是由三個獨立的程式碼缺陷所引起，而非模型本身的退化。這兩件事擺在一起，讓人清楚看見：當 Agent 從研究課題變成日常工具，無論是 OpenAI 還是 Anthropic，都在面對一個全新的工程挑戰——不是模型不夠強，而是系統複雜度已經超出最初設計能安全承載的範圍。

---

## 主題一——GPT-5.5：智力躍升背後的代價與機會

OpenAI 在 4 月 23 日發布 GPT-5.5，官方定調為「至今最聰明且最直覺易用的版本」，主打 agentic coding、computer use、知識工作與早期科學研究四大場景。兩款型號同步上線：GPT-5.5 瞄準 Codex 的付費用戶；GPT-5.5 Pro 則專為高難度、高準確度需求設計，優先提供給 Pro、Business、Enterprise 方案用戶。

**核心 benchmark 數據：**

- Terminal-Bench 2.0：GPT-5.5 達 82.7%，超越 GPT-5.4 的 75.1%，也領先 Claude Opus 4.7 的 69.4%
- GDPval：GPT-5.5 為 84.9%，打敗所有對手，包含 Opus 4.7 的 80.3% 與 Gemini 3.1 Pro 的 67.3%
- FrontierMath Tier 4（目前最難的數學推理子集）：GPT-5.5 拿下 35.4%，是 Opus 4.7（22.9%）的 1.5 倍
- BrowseComp：GPT-5.5 Pro 以 90.1% 勝出，幾乎把競爭對手拉開了 5 到 10 個百分點

這不是一次例行升級。官方明確表示，GPT-5.5 在保持與 GPT-5.4 相同 per-token 延遲的前提下完成了智力躍升，並且在 Codex 中完成同一任務所需的 token 消耗顯著更低。實際測試過的工程師描述，GPT-5.5 對系統結構的理解能力有「概念清晰度」（conceptual clarity）的突破——它不只是告訴你哪裡錯，而是能推斷出修復需要影響到哪些周邊模組。Every 創辦人 Dan Shipper 說這是他用過的「第一個有嚴肅概念清晰度的程式碼模型」，他在產品上線後花了幾天偵錯，最後拿 GPT-5.5 重新跑同一個情境，模型成功重現了資深工程師最終決定的那種重寫邏輯。Cursor 共同創辦人 Michael Truell 的說法更直接：「GPT-5.5 在複雜長時間任務上的堅持度明顯更強，用戶最需要的正是這種能力。」

API 定價也在同一天更新：gpt-5.5 為每百萬輸入 token 5 美元、輸出 30 美元，較 GPT-5.4 的 2.5/15 美元翻倍；gpt-5.5 Pro 為 30/180 美元。OpenAI 官方說法是，token 效率的提升足以抵消更高的 per-token 單價——實際上在 Codex 的任務中，GPT-5.5 消耗的總 token 數比 GPT-5.4 少了相當幅度，這對於需要大量來回對話的 Agent 場景是重要的成本優化。但這個邏輯需要市場驗證：一旦脫離 Codex 的任務形態，效率提升幅度是否仍然顯著，目前沒有第三方數據。

API 上線時間仍未公告，官方只說「即將推出」，安全與規模化部署所需的把關工作仍在進行中。

### NVIDIA 萬人部署：Codex 的終極壓測

同一天，OpenAI CEO Sam Altman 宣佈已將 GPT-5.5 驅動的 Codex 成功部署至 NVIDIA 全公司。NVIDIA 九大業務部門、超過 10,000 名員工已全線接入，範圍涵蓋工程、產品、法務、行銷、財務、銷售、人力資源、營運與開發者關係。NVIDIA 內部形容效果「令人震驚」且「改變生活」。

這件事的意義不在於數字本身，而在於它展示了企業級 Agent 部署的實際輪廓：不是概念驗證，而是跨部門、數千人同時使用同一套工具，而且結果讓用戶願意公開為它背書。一個 NVIDIA 的工程師說：「失去 GPT-5.5 的存取權，就像是被截肢了一樣。」這種層級的採用強度，遠超過多數企業 AI 工具的平均推廣曲線。Sam Altman 隨即公開邀請其他企業聯繫 OpenAI，進行類似的全公司級部署。從 Agent 的產業化角度來看，這會是今年最重要的參考案例之一。

---

## 主題二——Claude Code 事故復盤：三個 bug 為何能繞過所有測試

Anthropic 在 4 月 23 日發佈了一份名為《April 23 Postmortem》的公開報告，坦承過去一個月 Claude Code 質量下滑是事實，且原因與模型無關——是三個獨立的系統變更各自引入的缺陷，在不同時間點、以不同方式影響了使用體驗。官方同時強調：API 層與推理層完全未受影響。

**第一個問題：推理努力程度下調。** 3 月 4 日，官方為了解決部分用戶反映的高推理模式「凍住 UI」問題，將 Sonnet 4.6 與 Opus 4.6 的預設推理努力從 high 降至 medium，代價是智慧度下降。這項變更的背景是：內部測試顯示 medium 模式在多數任務上只犧牲了一點智慧，但大幅降低了延遲與尾時延，並且讓用戶的額度消耗更慢。但用戶實際反饋是：他們寧可多等一點時間，也要預設使用更高智慧的模型。官方在 4 月 7 日回溯了這項變更。Opus 4.7 已調整為 xhigh，其他模型恢復為 high。

**第二個問題：快取優化邏輯缺陷。** 3 月 26 日，官方試圖針對空閒超過一小時的會話做一次性的歷史推理清除，來降低恢復時的延遲。設計思路是：會話空閒超過門檻後，API 请求會變成快取未命中，此時可以清除不必要的舊訊息以節省費用，同時讓後續请求恢復傳送完整推理歷史。問題出在實作：這項清除不只執行一次，而是每個後續對話回合都在執行，導致模型逐步喪失所有歷史推理記憶——臨床上看起來就像失憶症，而且持續的快取未命中同時加速消耗了用戶額度。這個 bug 在 4 月 10 日修復。官方指出，兩個不相關的内部實驗（一個關於訊息佇列的伺服器端實驗，以及一個影響 thinking 顯示方式的正交變更）讓問題更難被重現，即便在外部建構版本上測試也沒有捕獲到。

**第三個問題：系統提示詞長度限制。** 4 月 16 日，官方為了解決 Opus 4.7 輸出過度冗長的問題，引入了一條系統提示詞指令。評估後發現，這條指令讓 Opus 4.6 與 4.7 的質量平均下降了 3%，官方在 4 月 20 日將其移除。

三個變更各自在不同的流量切片上、以不同的時間表發揮作用，疊加起來的 aggregate effect 看起來就像「模型整體變笨了」，這也是為什麼一開始用戶回報與官方內部測試結果嚴重不一致。Anthropic 指出，每個變更都通過了多輪人類與自動審查、單元測試、端到端測試與自動化驗證，但仍然在生產環境中出問題——這說明了 Agent 系統的複雜度已經到了無法靠傳統測試方法完全覆蓋的程度。特別值得注意的是，官方在事後用 Opus 4.7 跑了 Code Review 功能（這是他們自己的 Agent 程式碼審查功能），針對這三個問題的 pull request 進行回測，發現 Opus 4.7 確實能識別出導致這些問題的程式碼改動——這在某種程度上是 AI 輔助偵錯的回音。

Anthropic 已全面修復問題（v2.1.116+），並重置了所有訂閱者的使用額度作為補償。更重要的是，這次事件讓 Anthropic 承諾擴大內部對公共建構版本的測試、強化系統提示詞審查，以及建立 @ClaudeDevs 社群帳號與 GitHub 集中討論區，改善與開發者的溝通。這份報告的罕見之處在於：它是主流 AI 公司第一次以這種透明度公開承認「不是模型能力問題，是系統工程問題」。對所有正在建構 Agent 基礎設施的工程師來說，這是一個免費的真實教材，說明了為什麼 Agent 系統的穩定性會隨著功能增加而變得越來越脆弱。

---

## 主題三——中國模型全線更新：騰訊、螞蟻、DeepSeek 同日動作

4 月 24 日的中國 AI 動態密度極高，騰訊、螞蟻與 DeepSeek 三方同日發佈重要更新，合計覆蓋開源模型、API 平台與基礎設施優化三個層面。任何單一天出現這樣的集中度，都不是巧合，而是 Chinese AI 生態已經進入「每週甚至每天都有實質更新」的節奏。

### 騰訊混元 Hy3 preview：295B MoE 開源，256K 上下文

騰訊混元團隊正式發佈並開源 Hy3 preview，這是該團隊自 2 月重建預訓練與強化學習基礎設施以來的第一款產品。Hy3 preview 採用 MoE 架構，總參數量 295B，活躍參數量 21B，另有 3.8B 的 MTP（Multi-Token Prediction）層參數，最大支援 256K 上下文長度。官方表示，該模型在複雜推理、指令遵循、上下文學習、程式碼與 Agent 任務上有大幅提升，主打全面實用性與高性價比。

權重已在 Hugging Face、GitHub、ModelScope 與 GitCode 同步開源，騰訊雲提供 API 與 Token Plan，OpenRouter 與 OpenCode 提供限時免費调用。騰訊內部的元寶、QQ、微信等核心產品線已全面接入。相較於同類中國開源模型，Hy3 preview 的 256K 上下文窗口是目前少見的規格，加上 MoE 的成本結構，預計會成為中小型企業在本地部署時的高 CP 值選擇。需要注意的是，騰訊將其描述為「重建基礎設施後的第二款模型」，而非第一款——這暗示在 Hy3 正式版之後，可能還有更多旗艦級模型在路上。

### 螞蟻百靈 Ling-2.6-1T 與 LLaDA2.0-Uni：兆級參數與統一多模態同發

螞蟻集團百靈團隊同日發布兩款模型，策略上非常清楚：Ling-2.6-1T 衝參數量級，LLaDA2.0-Uni 衝多模態統一。

**Ling-2.6-1T** 是一款兆級參數旗艦模型（1 trillion = 1 兆），不支援思考模式，採用 Fast-Thinking 機制，專為精確指令執行設計，官方聲稱性能媲美 GPT-5.4（非推理版）。在 AIME26 基準測試的非推理模型中處於領先地位。已上線 OpenRouter 與 Kilo 平台，提供為期一週的免費 API 試用，官方同時預告即將開源權重。Fast-Thinking 機制的設計思路是：不靠拉長推理時間來提升準確度，而是在單次 forward pass 內做更深層的計算資源調度，換句話說就是「用更聰明的計算圖取代更長時間的計算」。

**LLaDA2.0-Uni** 統一多模態模型，總參數 16B（每 token 活躍約 1B），基於 MoE 架構，單一模型整合視覺問答、高保真文字生成圖像、文件理解與交錯生成推理。底層採用統一的 dLLM-MoE 骨幹網路與分塊掩碼 Token 預測範式，配合 SPRINT 加速技術與蒸餾 8 步擴散解碼器，已在 Hugging Face 以 Apache 2.0 許可證開源。LLaDA2.0 的架構選擇很有意思：用同一個骨幹處理理解與生成，意味著視覺訊號可以直接流動到生成路徑，不需要跨模型轉接。對需要端到端處理圖文混合輸入的開發團隊來說，這是一個值得关注的开源自選項。

### DeepSeek：TileKernels 與 DeepEP v2，從模型商到基礎設施商

DeepSeek 近期動作同樣密集，顯示該公司正在從「模型供應商」逐漸轉變為「基礎設施供應商」。

首先，GitHub 上線了完全重構的專家並行通訊庫 DeepEP v2，測試顯示在延續 DeepSeek V3 模型配置下，峰值效能達初代的 1.3 倍，流處理器佔用降低 4 倍，並引入多項零流處理器消耗的實驗性特性。其次，官方開源了基於 TileLang 的高效能 GPU 算子庫 TileKernels，針對大語言模型訓練與推理優化，以 MIT 許可證發布。此外，社群用戶發現 DeepSeek API 疑似低調上線了與官網快速模式一致的模型版本。

這些更新的節奏與深度，意味著中國 AI 生態正在往更底層的優化方向移動。TileKernels 這類算子庫的價值在於：它們是所有上層模型的共同地基，任何針對計算效率的優化都能讓所有模型受益。對開發者而言，這代表 DeepSeek 的影響力已經不只在模型本身，而是滲透到了訓練與部署流程中最底層、也是最難被替換的那一層。

---

## 其他值得關注

- **小米 MiMo 語音模型系列**：MiMo-V2.5-ASR（8B 參數端到端語音辨識）已在 Hugging Face 開源，MiMo-V2.5-TTS Series（含音色設計與音色克隆）限時免費開放 API。這是小米首次在語音 Agent 方向上有完整的开源方案，對中文語音 Agent 生態有參考價值。8B 規模的 ASR 模型做到開源，在中文長尾場景上會有差異化優勢。

- **xAI grok-voice-think-fast-1.0**：在 τ-voice Bench 排行榜登頂的旗艦語音模型，原生支援 25+ 種語言，可在後台即時推理而不增加延遲。這是語音 Agent 能力的最新 benchmark 座標，特別值得關注的是它在高併發工具調用場景下的穩定性。

- **Claude Managed Agents 記憶功能公測**：記憶被存為檔案並直接掛載到檔案系統，開發者可以完整匯出與管理，API 同時提供完整控制權。這是 Agent 從「單次會話工具」走向「跨會話學習體」的關鍵一步，也是目前市面上少數提供記憶持久化方案的企業級選擇。

- **Gemini 對話分支功能**：Google 逐步推送對話分支功能，讓使用者在同一主題下開出多條分支探索不同方向。這與 NotebookLM 同時更新的「斷點續學」功能形成互補：NotebookLM 強調的是同一個會話內的學習連貫性，Gemini 分支則強調的是同一個起點下的探索多元性。

---

## 參考連結

- [Introducing GPT‑5.5 - OpenAI](https://openai.com/index/introducing-gpt-5-5/)
- [GPT-5.5 Pricing: Full Breakdown - apidog](https://apidog.com/blog/gpt-5-5-pricing/)
- [An update on recent Claude Code quality reports - Anthropic](https://www.anthropic.com/engineering/april-23-postmortem)
- [Tencent Hunyuan Hy3 preview - GitHub](https://github.com/Tencent-Hunyuan/Hy3-preview)
- [Tencent Hy Research](https://hy.tencent.com/research/hy3)
- [Ant Group LLaDA2.0 - GitHub](https://github.com/inclusionAI/LLaDA2.0-Uni)
- [DeepSeek TileKernels - GitHub](https://github.com/deepseek-ai/TileKernels)
- [OpenClaw v2026.4.22 release](https://github.com/openclaw/openclaw/releases/tag/v2026.4.22)
- [Claude Managed Agents Memory - Claude](https://claude.com/blog/claude-managed-agents-memory)
- [xAI grok-voice-think-fast-1.0](https://x.ai/news/grok-voice-think-fast-1)
