---
title: "AI 新聞精選｜2026 年 4 月 23 日"
description: "Qwen 稠密模型打敗 397B MoE、Google TPU v8 雙晶片架構、小米 MiMo-V2.5 開源衝擊市場"
publishDate: "2026-04-23T12:00:00+08:00"
updatedDate: "2026-04-23T12:04:00+08:00"
tags: ["Qwen", "Google", "TPU", "Xiaomi", "MiMo", "OpenAI"]
series: "daily-ai-report"
seriesOrder: 68
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-23-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-04-23"
---

## 今日觀察

今天（2026 年 4 月 23 日）的 AI 資訊量相當可觀，橫跨模型架構、硬體基礎建設、價格競爭與開源生態四條主線。Qwen 團隊在同一天發表了 Qwen3.6-27B，稠密模型的參數量只有 270 億，卻在程式設計基準打敗了同一家族的 3970 億參數 MoE 前旗艦；Google 在 Cloud Next 大會上發表第八代 TPU，採取訓練晶片與推理晶片分家的雙軌設計，直接為 Agent 時代的工作負載特性重新設計硬體；小米的 MiMo-V2.5 系列則宣布两款模型開源，同時以不到 GPT-5.4 一半的 API 價格殺入市場。這三件事加在一起，反映的是同一個趨勢：AI 基礎設施正在從「越大越好」走向「越精準、越划算、越開放」。

---

## 主題一 — Qwen3.6-27B：稠密模型打敗 MoE 大前輩，開源生態的結構轉變

阿里雲 Qwen 團隊 4 月 22 日正式發布 Qwen3.6-27B，這是 Qwen3.6 家族第一款全稠密（dense）模型，參數量「只有」270 億，卻在多項程式設計與 Agent 任務基準測試中全面超越 Qwen3.5-397B-A17B——後者是擁有 3970 億參數的稀疏 MoE 模型，活躍參數也有 170 億。光是數字上，這樣的對比就很不直覺。

為什麼稠密模型能在某些任務打敗規模更大的 MoE 模型？答案在 Qwen3.6-27B 的混合架構設計。根據官方技術文件與 MarkTechPost 的分析，Qwen3.6-27B 的 64 層結構中，每 4 個子層為一組：3 層採用 Gated DeltaNet，1 層採用傳統 Gated Attention。DeltaNet 是一種線性注意力機制，計算複雜度從 O(n²) 降到 O(n)，好處是記憶體效率高、推論速度快；再透過 gating 機制讓模型學習「什麼時候該更新資訊、什麼時候該保留」，這在長時間對話或跨多個工具呼叫的工作流中特別關鍵，因為模型不需要每個 token 都重新計算完整的注意力。

這個架構還搭配了一項新功能叫「Thinking Preservation」（思考保留）。預設情况下，LLM 只會保留當前對話輪次的思維鏈；上一輪推理產生的思考過程，在下一輪就會被丟掉。Qwen3.6-27B 透過 API 參數 `preserve_thinking: True` 讓模型跨回合保留歷史推理軌跡，對需要「多輪迭代、每次都承接上一次判斷」的 Agent 工作流來說，可以大幅減少重複推理的 token 消耗。

在基準數據方面，Qwen3.6-27B 的 SWE-bench Verified 達到 77.2 分，與 Claude 4.5 Opus 的 80.9 差距已相當小；前端程式碼生成測試 QwenWebBench 拿到 1487 分，大幅領先前代 27B 模型的 1068 分。這個分數的意義在於：它代表的是「在實際專案環境下的程式碼生成能力」，不是那種只在固定題庫上有效的數字。模型已在 Hugging Face 開源（BF16 與 FP8 量化兩種版本），並支援 SGLang、vLLM、KTransformers 等主流推論框架。

對開源生態而言，Qwen3.6-27B 的出現傳遞了一個訊號：MoE 並不是提升程式設計能力的唯一路徑，稠密模型在特定任務上可以更高效。對於算力有限的團隊、對於需要在本地部署的企業，這款模型的可部署性遠比 397B MoE 型號實用得多。

---

## 主題二 — Google TPU v8 雙晶片架構：Agent 時代的硬體需求已經改變

Google 在 Cloud Next 2026 大會上發表了第八代 TPU，這次不是一顆晶片，而是兩顆——TPU 8t 專攻訓練，TPU 8i 專攻推理。這是 Google 第一次在 TPU 家族內做出這麼明確的分工決定，反映的是 Agent 時代對基礎設施需求已經產生根本性的結構轉變。

Agent 工作流的特性是什麼？它不是一次性的推理，而是多步驟、迭代式、可能同時有多個專門 Agent 在協作。Google 在官方部落格中指出，隨著 Agent 數量規模擴大，即使是很小的延遲差異也會被「放大」——這就是為什麼 TPU 8i 會把記憶體頻寬列為核心設計目標。TPU 8i 搭配 288 GB 高頻寬記憶體（HBM）與 384 MB 晶片上 SRAM，是上一代的 3 倍，就是要解決「記憶體牆」（memory wall）問題，避免處理器空等資料。

TPU 8t 的設計邏輯則是另一個故事。它瞄準的是「從 months 到 weeks」的訓練週期壓縮。單一 Superpod 現在可擴展至 9,600 顆晶片、2 PB 共享高頻寬記憶體，提供 121 ExaFlops 算力；搭配新推出的 Virgo Network，最高可支援單一邏輯叢集 100 萬顆晶片的近線性擴展。Google 還特別強調 97% 以上的「goodput」——也就是實際有效運算時間佔比。這個數字的背景是：在大規模訓練中，任何硬體故障、網路停滯、檢查點重啟都會直接轉化為天數級的時間損失。

值得注意的是，TPU v8 兩款晶片都首次採用了 Google 自研的 Axion ARM 架構 CPU 作為主機，並配備第四代液冷技術，能效比上一代提升約兩倍。這代表 Google 不只是在 AI 加速器上自研，連帶 CPU、主機互連、散熱系統都在同步演進。

這次 TPU v8 的發表與近期 xAI 宣布興建 Terafab 超級晶片廠（採用英特爾 14A 製程，預計 2026-2027 年投產）的消息放在同一個禮拜觀察，會看到一個清晰的競爭格局：無論是雲端基礎設施（TPU v8）還是自建晶片廠（xAI Terafab），各方都在押注「算力基礎建設」將成為下一階段 AI 競爭的核心壁壘。

---

## 主題三 — 小米 MiMo-V2.5：開源＋低價戰略能否撬動市場既有格局

小米在 4 月 22 日發表 MiMo-V2.5 系列，包含四款模型：MiMo-V2.5（原生全模態）、V2.5-Pro（長程 Agent 任務專用）、V2.5-TTS Series（語音合成）、V2.5-ASR（語音辨識）。其中 MiMo-V2.5 與 MiMo-V2.5-Pro 兩款即將開源。

MiMo-V2.5 的核心數據值得細看。在 Claw-Eval General 測試中達到 62.3 分，達到效能與效率的 Pareto 前沿；在 Claw-Eval Multimodal 拿到 23.8 分，與 Claude Sonnet 4.6 持平，領先前代 MiMo-V2-Omni 達 8 分，與 Claude Opus 4.6 只差 1 分。影片理解方面，Video-MME 分數 87.7，几乎與 Gemini 3 Pro 的 88.4 並肩，標誌著長程影片推理能力已進入前沿領域。上下文窗口支援最長 100 萬 tokens。

但真正讓業界注意的是 MiMo 的 API 定價策略。新版 Token Plan 把 MiMo-V2.5 的消耗倍率訂為 1x（等於 1 token = 1 credit），V2.5-Pro 為 2x，且不再對 100 萬 tokens 上下文窗口收取額外倍率。橘鴉摘錄中提到的「約為 GPT-5.4 一半的 API 成本」，對象是 MiMo-V2.5-Pro 對比 GPT-5.4 的複雜長程 Agent 任務處理成本。如果這個對比數字屬實，它代表的是：小米正在用價格作為突破口，直接吸引那些對成本敏感的開發者與小型企業。

MiMo 團隊同時宣布已購買套餐的用戶 Credits 額度全面重置，並新增連續包月（首月 7 折）與包年（88 折）選項。北京時間每日凌晨 00:00 至 08:00 還有夜間 8 折優惠。這個定價結構的精細程度，說明 MiMo 不只是想靠「開源」在技術圈打形象，它正在認真建設一個有商業模式的 API 平台。

對開發者來說，MiMo-V2.5 的價值主張現在有三層：開源可用、本地部署門檻低；API 成本低；同時具備視覺、音頻、文字三模態理解能力於單一模型。這三層湊在一起，對中小型團隊的吸引力不可小覷。

---

## 其他值得關注

- **GLM 老套餐終止續訂**：智譜 GLM Coding Plan 無限額老套餐將於 4 月 30 日強制停售自動續訂，受影響用戶獲贈 2 個月同級新套餐。社區反應兩極，有人認為此舉有「背刺早期支持者」之嫌。這次調整代表的是 API 平臺在算力成本壓力下，重新結構化訂閱套餐的趨勢正在加速。

- **OpenAI 隱私過濾模型**：OpenAI 發布 1.5B 總參數、50M 活躍參數的隱私過濾模型，Apache 2.0 開源，可在瀏覽器內本地執行，專門用於偵測與脫敏文字中的個人身份資訊。這個模型本身不大，但方向明確：隱私敏感場景的 PII 處理正在走向「資料不出設備」的本地化路線。

- **Claude Code /ultrareview 免費開放**：Claude Code 的雲端程式碼審查功能 /ultrareview 即日起至 5 月 5 日向 Pro 與 Max 用戶提供 3 次免費使用，透過雲端一組找 Bug 的 Agent 自動審查並反饋結果。Anthropic 近期也正面臨測試移除部分新 Pro 用戶 Claude Code 存取權的爭議，OpenAI Codex 負責人則公開承諾 Codex 將繼續向免費版與 Plus 版用戶提供服務，形成直接對比。

- **DeepSeek V4 猜測與巨頭投資**：騰訊、阿里被報導正洽談投資 DeepSeek，估值目標已從不低於 100 億美元提升至尋求超過 200 億美元。同時社區觀察到 DeepSeek API 出現新模型上線又回滾的變動，App 推送了 2.0.0 版本更新，有關 DeepSeek V4 的猜測正在升溫。如果騰訊與阿里同時入股，這將是中國 AI 生態中罕見的「競爭對手聯手」局面。

---

## 參考連結

- [Qwen3.6-27B 官方發布](https://qwen.ai/blog?id=qwen3.6-27b)（Qwen.ai）
- [Qwen3.6-27B MarkTechPost 報導](https://www.marktechpost.com/2026/04/22/alibaba-qwen-team-releases-qwen3-6-27b-a-dense-open-weight-model-outperforming-397b-moe-on-agentic-coding-benchmarks/)
- [Qwen3.6-27B Hugging Face 頁面](https://huggingface.co/Qwen/Qwen3.6-27B)
- [Google TPU v8 官方發布](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/eighth-generation-tpu-agentic-era/)
- [Google TPU 8t/8i 技術深度解析](https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive)
- [小米 MiMo-V2.5 官方頁面](https://mimo.xiaomi.com/mimo-v2-5)
- [小米 MiMo-V2.5 MarkTechPost 報導](https://www.marktechpost.com/2026/04/22/xiaomi-releases-mimo-v2-5-pro-and-mimo-v2-5-matching-frontier-model-benchmarks-at-significantly-lower-token-cost/)
- [OpenAI 隱私過濾模型](https://openai.com/index/introducing-openai-privacy-filter/)
- [Claude MCP 官方技術解析](https://claude.com/blog/building-agents-that-reach-production-systems-with-mcp)
- [xAI Terafab Reuters 報導](https://www.reuters.com/business/autos-transportation/tesla-ceo-musk-says-company-plans-use-intels-14a-process-terafab-2026-04-22/)
- [DeepSeek 騰訊阿里投資報導（The Information）](https://www.theinformation.com/articles/tencent-alibaba-talks-invest-deepseek-20-billion-plus-valuation)
