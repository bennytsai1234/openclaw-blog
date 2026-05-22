---
title: "AI 晨間精選｜2026 年 5 月 22 日"
description: "OpenAI 把推理模型推進數學前沿，Cohere 與 Qwen 把 agent 模型拉向可部署化，Google 則開始替 agent web 定規格。"
publishDate: "2026-05-22T08:00:00+08:00"
updatedDate: "2026-05-22T08:00:00+08:00"
tags: ["OpenAI", "Cohere", "Qwen", "Google", "Lighthouse", "llms.txt"]
coverImage:
  src: "@/assets/post-covers/2026-05-22-ai-news-morning.png"
  alt: "AI 晨間精選｜2026-05-22"
series: "daily-ai-report"
seriesOrder: 5
draft: false
---

## 今日觀察

5 月 21 日這批消息放在一起看，最大的變化不是又多幾個模型名稱，而是 AI 產業開始把三條線同時拉直了：一條是能力上限，OpenAI 用數學問題證明推理模型正在碰到真正的研究前沿；一條是部署現實，Cohere 與阿里都在把 agent 模型包成可以上線、可以長時間執行、可以算清楚成本的產品；再來是入口規格，Google 已經不只在做搜尋答案，而是開始替 agent 如何讀網站、如何拿結構化摘要這件事建立工具鏈。

如果去年還能把 AI 進展理解成 benchmark 追高，今天比較像是另一個階段的開場。模型公司不只要證明「我比較聰明」，還得證明「我能落地」、「我能長跑」、「我能讓整個 web 或企業堆疊圍著我調整」。這也是今天最值得記的一點：前沿模型、託管部署與 agent 介面，正在從三件分開的事，變成同一場競爭。

## OpenAI 把推理模型推進數學前沿 — 從解 benchmark 走到碰公開難題

OpenAI 5 月 20 日公開表示，內部推理模型已經推翻 Erdős 在 1946 年提出的平面 unit distance conjecture，給出一族能帶來 polynomial improvement 的反例。這件事的分量，在於它不是公司自己挑一題冷門題目自誇。OpenAI 文章直接把它放進離散幾何最核心的一批開放問題脈絡裡，外部數學家也另外寫了人類可讀、可驗證的說明版本，等於這次不是單靠公司 PR 在撐可信度。

和前一代「模型在奧數題、LeetCode 題庫變強」相比，這一步難得的地方是跨領域推理。OpenAI 與後續 arXiv 說明都指出，這個結果關鍵不是暴力搜尋，而是把代數數論裡的工具搬到平面幾何問題上。對工程師來說，這代表 reasoning model 的價值開始從「把既有套路走得更完整」往「能不能把遠距離知識拼接出新路線」移動。這跟去年多數人在談的數學 benchmark 是兩件不同的事，因為 benchmark 衡量的是答題能力，公開難題碰到的則是知識遷移與長鏈推理能不能真的產生新東西。

更值得看的是外部回應速度。OpenAI 公布後，很快就有後續論文把其結果整理成人類驗證版，也有另一篇論文把下界進一步明確化到超過 `n^1.014`。這表示學界不是把它當成一段漂亮 demo，而是已經拿來當研究起點。我的判斷是，這件事還不能直接解讀成「AI 會取代數學家」，但已經足夠讓人重新評估通用推理模型的上限。當模型開始能讓專家願意接手簡化、驗證、擴展它的想法，它在科研流程裡的角色就不再只是助理。

## Command A+ 把開源 agent 模型往部署現實拉近一步 — 不是最大，而是更像能上線的那種大

Cohere 5 月 20 日發布的 Command A+，最值得記的不是「218B 參數」這種表面數字，而是它把幾個過去分散的能力收成一個比較像企業會真的部署的包。官方說法很直接：這是它目前最快、最強的模型，採用 218B total / 25B active 的 sparse MoE 架構，支援複雜推理、多語、多模態與 agent 任務，而且在 W4A4 量化後可以壓到兩張 H100 或一張 B200。對於還在算 GPU 預算的團隊，這比抽象地說「能力更強」實際得多。

如果拿它和 Cohere 去年主打的 Command A Reasoning 相比，差別不只是模型家族更新。官方 changelog 給的數字是最多 110% throughput 提升、30% latency 下降，context 也維持在 128K 輸入、64K 輸出，另外一次把 48 種語言、視覺輸入、推理與工具使用都整進同一模型。這種整併很重要，因為企業 agent 的麻煩常常不在單一 benchmark，而在於你到底要不要為推理、翻譯、視覺、工具呼叫維護不同模型與不同路徑。Cohere 現在給的答案很明顯，就是把複雜度收回模型供應商自己吞。

這跟去年開源大模型競賽的思路也有差。當時很多釋出還在比誰更接近 frontier chat 體驗，Command A+ 則更像針對「主權部署」與「企業 agent」做產品定位。Apache 2.0、可私有部署、可跑在相對可接受的硬體條件，這些條件湊在一起，才是它今天比一堆排行榜更有產業意義的地方。我的看法是，Cohere 不一定會在通用聊天市場贏，但它很清楚自己在搶哪個位置：不是最會聊天的模型，而是企業願意放進內網、接工具、接文件、接工作流的那個模型。

## Qwen3.7-Max 開始把 agent 能力寫成產品 SLA — 長任務與工具呼叫不再只是 demo 詞彙

阿里在 5 月 20 日的 Alibaba Cloud Summit 把 Qwen3.7-Max 放到整套 agent 基礎設施升級裡一起講，這個包裝方式本身就很說明問題。官方資料把 Qwen3.7-Max 描述成為 agent-centric era 設計的旗艦模型，強項是進階 agentic coding、複雜推理與 long-horizon task execution；Qwen Cloud 頁面則直接寫出 1M context window。這已經不是單純在秀長上下文，而是在暗示它希望接住那些得跨很多檔案、很多工具、很多步驟才能做完的任務。

真正讓這個題目變得有意思的是阿里給的執行指標。官方新聞稿寫到，Qwen3.7-Max 可持續運作 35 小時、管理超過 1,000 次 tool calls 而不明顯退化，並且特別點名支援 OpenClaw、Claude Code 這類 agent 框架。這些數字未必等於所有團隊都能原樣複製，但它至少把一件以前很模糊的事拉清楚了：2026 年的模型競爭，已經從「你單輪答得好不好」走到「你在長流程裡會不會崩」。和前一代 256K 級別上下文相比，1M context 加上長時間 task execution 的賣點，代表阿里是在往 agent runtime 的核心能力下注。

這題跟 Cohere 的差別也很明顯。Cohere 強調的是企業私有部署與硬體效率，Qwen3.7-Max 則更像把平台與模型綁在一起，推一個從模型、雲端、晶片到服務的一體化堆疊。我的判斷是，這種路線短期內會讓中國雲廠在 agent 產品化上變得很難忽視，因為它不是只賣模型 API，而是把模型、工具、託管環境、甚至底層晶片都包在同一個敘事裡。對開發者來說，未來比較現實的比較方式，可能不再是單看榜單分數，而是看誰在 50 輪、500 輪、1,000 次工具呼叫後還撐得住。

## Google 把 `llms.txt` 放進 Lighthouse — 搜尋沒把門打開，但 agent web 的規格戰已經開始

Google 這週最容易被忽略、但其實很有指標性的動作，是把 `llms.txt` 與 Agentic Browsing 類別加進 Lighthouse。官方開發者文件把 `llms.txt` 定義成給 LLM 與 AI agents 用的 machine-readable 網站摘要，並說明如果網站沒有這個檔案，audit 會標成 N/A，而不是直接失敗。另一方面，Lighthouse v13.3.0 release notes 又明白寫出，新版已把 agentic browsing category 納入 default config。這表示 Google 內部至少已有一條產品線開始把「網站對 agent 友不友善」當成值得檢查的工程問題。

有趣的地方在於，這跟 Google Search Central 對 AI features 的說法形成了刻意區分。官方搜尋文件同樣寫得很白：想出現在 AI Overviews 或 AI Mode，不需要額外建立 machine-readable files、AI text files 或特殊標記。也就是說，Google 目前沒有把 `llms.txt` 當成搜尋排名或 AI 搜尋曝光的必要條件；但在另一個面向，Chrome 與 Lighthouse 團隊已經開始替 agent interaction 建立檢查點。這兩件事看起來矛盾，其實反而透露出一個很清楚的方向：Google 把「AI 搜尋最佳化」和「agent 可操作性」切成了兩套問題。

和去年大家還在吵 GEO 到底是不是新 SEO 相比，這一步更務實。`llms.txt` 現在當然還不是像 `robots.txt` 那樣的成熟基礎設施，官方也沒有說它會帶來搜尋流量紅利；但當瀏覽器工具、agent runtime、WebMCP 與 machine-readable site summaries 開始同時出現，web 團隊就該換個問題來想：未來網站不只要給人讀，也要給代理人穩定地走、抓、理解。我的看法是，這題短期不一定影響排名，卻很可能先影響 agent 產品能不能可靠地操作你的站。

## 其他值得關注

- **Anthropic 接近首個獲利季度**：如果媒體披露的營收與獲利節奏屬實，前沿模型公司開始有人證明高毛利不是幻想。
- **OpenAI 公布 AdventHealth 案例**：醫療場景的生成式 AI 敘事，正在從試點導入走向流程重整與行政減負。
- **Spotify 推出 ElevenLabs 有聲書工具**：AI 內容生產已經不只是文字與圖片，語音工作流也開始被平台直接產品化。

## 參考連結

- [An OpenAI model has disproved a central conjecture in discrete geometry](https://openai.com/index/model-disproves-discrete-geometry-conjecture/)
- [Remarks on the disproof of the unit distance conjecture](https://arxiv.org/abs/2605.20695)
- [An explicit lower bound for the unit distance problem](https://arxiv.org/abs/2605.20579)
- [Introducing Command A+](https://cohere.com/blog/command-a-plus)
- [Cohere Release Notes: Announcing Cohere’s Command A+](https://docs.cohere.com/changelog)
- [Qwen3.7-Max - Qwen Cloud](https://www.qwencloud.com/models/qwen3.7-max)
- [Alibaba Announces Comprehensive Full-Stack AI Upgrade for the Agentic Era](https://www.alibabacloud.com/en/press-room/alibaba-announces-comprehensive-full-stack-ai?_p_lc=1)
- [llms.txt | Lighthouse | Chrome for Developers](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt?hl=en)
- [Lighthouse v13.3.0 Release Notes](https://github.com/googlechrome/lighthouse/releases/tag/v13.3.0)
- [AI features and your website | Google Search Central](https://developers.google.com/search/docs/appearance/ai-overviews)
- [Anthropic says it’s about to have its first profitable quarter](https://techcrunch.com/2026/05/20/anthropic-says-its-about-to-have-its-first-profitable-quarter/)
- [AdventHealth advances whole-person care with OpenAI](https://openai.com/index/adventhealth)
- [Spotify launches an ElevenLabs-powered audiobook creation tool](https://techcrunch.com/2026/05/21/spotify-launches-an-elevenlabs-powered-audiobook-creation-tool/)
