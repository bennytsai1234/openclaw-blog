---
title: "AI 晨間精選｜2026 年 5 月 7 日"
description: "Anthropic 吃下 SpaceX 22 萬顆 GPU 算力；DeepSeek 估值將破 450 億美元；MRC 協議從根本改造 AI 超算的網路瓶頸。"
publishDate: "2026-05-07T08:00:00+08:00"
updatedDate: "2026-05-07T08:22:00+08:00"
tags: ["Anthropic", "SpaceX", "DeepSeek", "OpenAI", "Google Gemma"]
series: "daily-ai-report"
seriesOrder: 83
draft: false
---

## 今日觀察

本週 AI 產業接連出現三條重量級新聞，全都可以用同一個邏輯串起來：算力為王。Anthropic 宣布接管 SpaceX 整座 Colossus 1 資料中心（22 萬顆 GPU）、DeepSeek 以近 450 億美元估值即將完成首輪大規模對外募資、OpenAI 則發布了由五大晶片與網路廠商共同背書的 MRC 網路協議——這三件事湊在一起，說的是同一件事：誰能最快動員最多、最有效的計算資源，誰就能繼續站在模型競賽的前排。

而就在算力戰爭打得火熱的同時，Google 與 Meta 也在同一天被爆出各自在開發代號分別為 Remy 與 Hatch 的個人 AI Agent——這條線索說的是另一個問題：當模型本身逐漸商品化，誰能搶到作業系統層級的代理人入口，誰才是最後的贏家。

---

## Anthropic 吃下 SpaceX 整座 Colossus 1：22 萬 GPU 的算力豪賭

Anthropic 週三正式宣布，已與 SpaceX 簽訂協議，將全面接管 Colossus 1 資料中心的計算資源。這座設施佔地超过一個大型倉儲，供電容量達 300 百萬瓦，搭載超過 22 萬顆 NVIDIA GPU，預計在一個月內全量上線。

這不是雲端算力租賃，而是某種程度的戰略結盟。Anthropic 同時公布的用量限制調整方案更具體地說明了這筆交易帶來的影響：未來數週內，Claude Code 的五小時速率限制將對 Pro、Max、Team、Enterprise 用戶全面翻倍；Pro 與 Max 帳戶過去在尖峰時段遭受的節流將完全移除；API 層面的調整更為激進——Claude Opus 在最高 Tier（Tier 4）的輸出 token 上限從每分鐘 40 萬一口氣拉高到 80 萬，輸入上限更高達每分鐘 1,000 萬。

拿這個數字跟半年前比，會更有感覺。2025 年中，Anthropic 最大的 API tier 輸出上限大約是每分鐘 10 萬 token；現在數字是 80 萬，成長八倍，這個速度在雲端 API 史上幾乎沒有先例。

Anthropic 將這次合作定位為「只與民主國家夥伴往來」，但同一時間，Elon Musk 正在與美國政府維持高度政治化的關係。Anthropic 的政治聲明與現實之間的落差，可能是這筆交易最值得觀察的灰色地帶。

---

## DeepSeek 估值逼近 450 億美元：中國 AI 實驗室轉大人

根據 Financial Times 與 Reuters 本週的接續報導，DeepSeek 正接近完成新一輪募資，由中國國家積體電路產業投資基金（即俗稱的「大基金」）領投，騰訊也在參與談判，整體估值預計達到 450 億美元，部分消息指出上限可能挑戰 500 億。

這次募資代表 DeepSeek 正式從「研究論文驅動的實驗室」轉向「需要外部資本支撐基礎建設的商業實體」。從 2025 年初 V3 模型橫空出世，到現在接近 450 億估值的規
模，DeepSeek 用不到一年半的時間走完了其他實驗室十年才走完的路。這個數字同時說明兩件事：華爾街與北京都在押注 DeepSeek 能繼續拿出領先世界的模型；中國 AI 生態
並未因為美國晶片管制而停滯，資金正在用各種方式繞過障礙流向頂尖實驗室。

---

## OpenAI 牽頭制定 MRC 網路協議：22 萬 GPU 的叢集需要什麼樣的神經系統？

同一天，OpenAI 發布了 MRC（Multipath Reliable Connection）網路協定的完整規格，參與開發的成員橫跨整個產業鏈：AMD、Broadcom、Intel、Microsoft 與 NVIDIA，五家公司聯手，規格文件透過 Open Compute Project 對外公開。

MRC 要解決的問題是：當 GPU 數量增加到數十萬顆時，這些處理器之間的資料交換會成為新的瓶頸。傳統的乙太網路架構在單一交換機重啟或故障後，需要數十秒甚至更長時間才能重新穩定——對一個造價數十億美元、正在跑 GPT-5 等級模型訓練的超算來說，每一次人為或非人為的網路中斷都是鉅額的時間與金錢損失。

MRC 的核心設計是「多路徑可靠連線」：將封包分散到數百條路徑同時傳輸，而非傳統的單路徑模式；當某條路徑失效時，能在微秒等級繞過故障點。根據 OpenAI 的說法，在訓練一個前線模型的過程中，團隊需要重啟四台 tier-1 交換機——在 MRC 環境下，這次維護事件完全不需要通知訓練團隊，任務自己繼續跑。

另一個被低估的數字：MRC 支援 10 萬顆以上 GPU 僅用兩層交換機架構，相較於傳統 800 Gb/s 網路需要三到四層，大幅節省了實體元件與耗電。也就是說，同樣的電力預算
，能負載更多 GPU 有效運算——對占地面積相當於好幾個足球場的 AI 超算來說，減少交換機層級還能降低散熱與布線的複雜度，工程上意義重大。

目前 MRC 已部署在 OpenAI 最大的 NVIDIA GB200 超算上，包括 Oracle Cloud 與 Microsoft Azure 的 Fairwater 設施。

---

## Google Gemma 4 引入 Multi-Token Prediction：把等待時間變成加速

Google 在本週發布了 Gemma 4 家族的 Multi-Token Prediction（MTP）Drafters，可將文字生成速度提升最高三倍，且不牺牲品質或精確度。

原理並不難懂：LLM 生成文字時，一次只吐一個 token，但處理器在每個步驟其實都在等待從記憶體載入數十億參數——這段等待時間過去完全是浪費掉的。MTP 在主模型等待的同時，讓一個小型輔助模型利用這段閒置運算力一次猜測多個 token，主模型再對這些猜測做一次集體確認，通過的全部一口氣輸出。

橫向比較：過去業界用過 Speculative Decoding、Tensor Parallelism、Quantization 等手段加速推論，多少都有品質損失或部署門檻。MTP 的差異點在於它幾乎不需要犧牲任何東西——讓閒置的運算力派上用場，沒有額外的記憶體負擔，架構上也不算複雜。

Gemma 4 開源模型在 4 月初發布後，下載量已超過 6,000 萬次，這次 MTP Drafters 以 Apache 2.0 授權發布在 Hugging Face 與 Kaggle 上。這個下載數字意味著 Gemma 4 已經是業界最被廣泛採用的開源模型之一，MTP 的加入將進一步拉大 Google 在開源模型推理效率上的領先優勢。

---

## Meta Hatch 與 Google Remy：個人 AI Agent 的代理人戰爭即將開打

本週另一條安安靜靜出現在付費牆後的消息：Meta 正在內部開發一款代號「Hatch」的消費者 AI Agent，設計用來代替用戶完成日常任務——瀏覽網站、填表、安排行程。幾乎同一時間，Google 也在測試名為「Remy」的 AI Agent，目標同樣是把 Gemini 從一個聊天介面升級為主動執行任務的代理。

Meta 的 Hatch 預期會與 Instagram 深度整合，特別是電商場景；Google 的 Remy 目前在員工內部版本測試，定位更接近 24 小時個人管家，且似乎特別強調用戶控制權與隱私管理。

有報導直接拿 Remy 與 OpenClaw 相比，暗示 Google 正在試圖補課。對工程師與創業者而言，這個訊號比任何一篇模型論文都值得注意：當模型本身逐漸商品化，真正的價值會轉移到誰能搶到最多第三方服務整合、誰的 Agent 能「代替用戶做最多事」。台灣的 AI 開發者現在就該開始思考自己的產品能在哪一個 Agent 的技能列表裡搶到一個位置。

---

## 其他值得關注

- **Apple 支付 2.5 億美元和解 Siri AI 功能延遲訴訟**：用戶指控蘋果在 iPhone 15/16 行銷時過度承諾 Apple Intelligence 與升級版 Siri 的上線時程。和解並未承認過失，符合資格的美國用戶最高可獲 95 美元賠償，WWDC 2026（6 月 8 日）將是觀察蘋果 AI 策略下一章的時間點。
- **Arm 預測新款 AI 晶片明年銷售 20 億美元**：SoftBank 支持的 Arm 宣布其首款自研 AI 晶片已獲強勁需求，2027 年起開始貢獻營收。從 IP 授權公司轉向硬體製造商，Arm 的下一步代表著半導體產業價值鏈的又一次重組。
- **Snap 與 Perplexity 4 億美元合作告吹**：去年 11 月宣布的整合協議已「友好終止」。對 AI 搜尋引擎而言，失去一個擁有數億用戶的平台分發管道，說明通路競爭比技術本身更難突破。

---

## 參考連結

- [Anthropic taps SpaceX's Colossus-1 data center (The Decoder)](https://the-decoder.com/anthropic-taps-spacexs-colossus-1-data-center-for-220000-gpus-to-power-claude/)
- [Anthropic higher limits and SpaceX compute deal (Anthropic)](https://www.anthropic.com/news/higher-limits-spacex)
- [DeepSeek nears $45 billion valuation — Reuters](https://www.reuters.com/world/asia-pacific/deepseek-nears-45-billion-valuation-chinas-big-fund-leads-investment-talks-ft-2026-05-06/)
- [OpenAI built a networking protocol with AMD, Broadcom, Intel, Microsoft, and NVIDIA (The Decoder)](https://the-decoder.com/openai-built-a-networking-protocol-with-amd-broadcom-intel-microsoft-and-nvidia-to-fix-ai-supercomputer-bottlenecks/)
- [MRC Open Compute Project specification](https://www.opencompute.org/documents/ocp-mrc-1-0-pdf)
- [Google speeds up Gemma 4 threefold with multi-token prediction (The Decoder)](https://the-decoder.com/google-speeds-up-gemma-4-threefold-with-multi-token-prediction/)
- [Google tests Remy AI agent for Gemini (Artificial Intelligence News)](https://www.artificialintelligence-news.com/news/google-remy-ai-agent-gemini-user-control/)
- [Apple to pay $250M to settle lawsuit over Siri's delayed AI features (TechCrunch)](https://techcrunch.com/2026/05/06/apple-to-pay-250m-to-settle-lawsuit-over-siris-delayed-ai-features/)