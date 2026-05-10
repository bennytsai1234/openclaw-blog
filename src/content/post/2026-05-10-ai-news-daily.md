---
title: "AI 新聞精選｜2026 年 5 月 10 日"
description: "百度 ERNIE 5.1 以三分之一參數拿下全球第四、Anthropic 七年 180 億美元算力大單、HiDream-O1-Image 登上開源圖生成王座"
publishDate: "2026-05-10T12:00:00+08:00"
updatedDate: "2026-05-10T12:22:00+08:00"
tags: ["Baidu", "ERNIE-5.1", "Anthropic", "Akamai", "HiDream", "OpenAI"]
series: "daily-ai-report"
seriesOrder: 44
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-10-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-05-10"
---

## 今日觀察

五月的第二週，AI 業界接連傳出三件戰略層級的消息。百度正式上線 ERNIE 5.1，宣稱用同規模模型約 6% 的預訓練成本達到全球第四名的表現；Anthropic 被揭露已與 Akamai 簽下七年 180 億美元的雲端算力合約，是該公司史上最大筆訂單；同一時間，HiDream-ai 開源的 HiDream-O1-Image 以 8B 參數量首次上榜即空降 Artificial Analysis 圖像生成排行榜第八名。三件事各自發生在不同賽道，卻都指向同一個趨勢：2026 年的 AI 競爭已從純粹的模型能力競賽，演進到成本效率、算力供應鏈與開源生態的綜合較量。

---

## 主題一 — 百度 ERNIE 5.1：三分之一參數、6% 成本，如何拿下全球第四

百度在 5 月 8 日正式上線 ERNIE 5.1，這一次不是預覽版，而是完整版本開放一般用戶在官網與星河社區 Playground 直接使用。

與前代 ERNIE 5.0 相比，ERNIE 5.1 的架構做了大幅度的精簡：總參數量壓縮至原本的約三分之一，活躍參數量約為一半，但百度宣稱預訓練成本僅有同規模模型的 6%。這個數字換句話說，就是訓練效率提升了大約十六倍。根據 LMArena Search Leaderboard 的公開數據，ERNIE 5.1 以 1223 分排名全球第四、中國第一——領先於不少同尺寸甚至更大尺寸的競爭對手。

為什麼現在重要？過去幾年，大型語言模型的發展邏輯多半是「參數越多越強」，代價是訓練和推論成本線性飆升。ERNIE 5.1 的做法等於是從網路架構下手，用「多維度彈性預訓練」與「Once-for-All 彈性訓練框架」把計算資源的浪費压到最低。百度特別強調了「分離式全異步強化學習架構」與「FP8 訓推一致性優化」，這兩個技術細節指向的是：訓練階段和推論階段現在可以用更緊湊的數值精度共享底層設計，省下的不是一點點。

對開發者而言，這件事有兩層意義。首先，ERNIE 5.1 即將上架 ISEKAI ZERO 等數十個創作類 Agent 平台，代表中國市場的 AI 原生應用生態又往前跨了一步。其次，百度這次的 benchmark 成績（GPQA、MMLU-Pro、創意寫作）在中國模型中已經來到接近 Gemini 3.1 Pro 的水準——這代表中文模型的領先梯隊，已經不是只靠「中文資料多」這個單一優勢了。

---

## 主題二 — Anthropic 七年 180 億美元算力大單：CDN 巨頭如何擠進 AI 基礎設施

本週最被低估的新聞，可能是這個：Anthropic 與 Akamai 簽下七年、總價 180 億美元的雲端基礎設施合約。

這筆交易是 Akamai 成立以來最大的單筆訂單。Akamai CEO Tom Leighton 在財報電話會議上說了一句很直接的話：這些 AI 領域的領導者選擇 Akamai，是因為他們的工作負載需要「規模、性能與可靠性」，而這正是 Akamai 既有網路能提供的東西。Anthropic CEO Dario Amodei 也在一場活動中提到，公司正在「盡可能快地」爭取更多算力資源，因為今年第一季的年化營收與用量成長了 80 倍。

180 億美元怎麼算出來的？這不是一次性付款，而是七年期間的 consumption-based 合約，隨著容量逐步拉升才會開始認列營收。巧的是，Anthropic 與 Google Cloud 之間之前也有一筆為期五年、約 200 億美元的合作。這兩筆合約加總，讓 Anthropic 的算力佈局呈現「雙供應商」格局：既有傳統雲端巨頭（Google），也有邊緣 CDN 轉型的 AI 推論供應商（Akamai）。

這件事對整個產業的啟示是：AI 基礎設施的供應商版圖正在重構。過去只有 AWS、Azure、Google Cloud 三強，但 Akamai 從 CDN 切入 AI 推論市場的策略開始見效——他們在 2025 年 3 月推出 Cloud Inference 服務，並在 2025 年 10 月進一步推出基於 Nvidia RTX PRO 6000 Blackwell 伺服器與 BlueField-3 DPU 的 Inference Cloud。對 Anthropic 來說，選擇 Akamai 可能不只是為了算力，也是為了利用其邊緣網路讓推論延遲降低。

對工程師而言，這個趨勢意味著：未來模型的部署可能不再只依賴單一雲端 region，邊緣推論的時代可能比我們想像中來得更快。

---

## 主題三 — HiDream-O1-Image：開源圖生成模型殺出一匹黑馬

HiDream-ai 在 5 月 5 日開源了 HiDream-O1-Image（代號 Peanut），一個 8B 參數的圖像生成模型，而且一上榜就在 Artificial Analysis Text to Image Arena 排到全球第八。

這件事特別值得關注，是因為它的架構本身就和主流做法不同。HiDream-O1-Image 採用的是「像素級統一 Transformer（UiT）」，不需要外部 VAE，也不需要分離式的文字編碼器，所有處理——原始像素、文字條件、工作任務條件——全部在同一個共享的 token 空間內完成。這與 Stable Diffusion 時代「latent space + U-Net」的主流架構有根本性的差異，概念上更接近原生端到端的思路。

原生解析度可達 2048×2048，支援文生圖、影像編輯、主體驅動個人化等任務。它以 MIT 許可證發布，程式碼與模型權重已在 GitHub 與 Hugging Face 公開。

對開源社群而言，這填補了「真正開放權重的頂級圖像生成模型」的缺口。FLUX.1 系列雖然表現優異，但模型權重並未完全開放。HiDream-O1-Image 這次是從頭到尾都可以研究、修改、部署，對於想在本地端跑圖像生成 pipeline 的開發者來說，現在多了一個不需要付費 API 的選項。官方同步發布的蒸餾版本（HiDream-O1-Image-Dev）則以更低的參數量（28B）提供更快的推論速度，適用於對延遲更敏感的場景。

---

## 其他值得關注

- **OpenRouter Pareto Code**：OpenRouter 推出實驗性編碼路由，透過 ArtificialAnalysis 排名自動把任務導向「滿足分數要求且成本最低」的模型。這個概念類似於模型版本的「智慧負載均衡」，對需要控制成本的開發團隊有直接幫助。三個質量頻帶共涵蓋 13 個模型，最高支援 2M 上下文。

- **OpenAI Codex 安全實踐**：OpenAI 發布內部部署 Codex 編程 Agent 的安全白皮書，內容涵蓋沙箱執行邊界、審批策略、網路流量預設封閉設計，以及 MCP OAuth 憑據綁定至作業系統安全鑰匙圈等實務細節。對於企業安全團隊來說，這份文件比多數供應商發的「安全承諾書」更有參考價值。

- **Perplexity Agent Skills 設計指南**：Perplexity Research 公開了內部的 Agent Skills 設計與維護方法論，核心概念是「Skill 由描述觸發、透過階層組織複雜知識、並以失敗案例累積的 gotchas 飛輪持續迭代」。這份文件的價值在於它來自實際產品部署經驗，而非實驗室假設。

- **Nous Research Hermes Agent 登頂 OpenRouter**：Nous Research 的 Hermes Agent 在 OpenRouter 平台以全球 AI 應用用量第一名的姿態超越了 OpenClaw。這代表開源 Agent 模型在實際部署滲透率上已經進入第一梯隊，開發者社群對其接受度不容小覷。

---

## 參考連結

- [ERNIE 5.1 正式發布公告](https://yiyan.baidu.com/blog/zh/posts/ernie-5.1-0508-release/)
- [ERNIE 5.1 在 LMArena 的評測表現](https://ernie.baidu.com/blog/posts/ernie-5.1-preview-0430-release-on-lmarena/)
- [Akamai 2026 Q1 財報新聞稿](https://www.globenewswire.com/news-release/2026/05/07/3290507/0/en/akamai-reports-first-quarter-2026-financial-results.html)
- [Forbes：Akamai Lands $1.8 Billion Anthropic Deal](https://www.forbes.com/sites/janakirammsv/2026/05/08/akamai-lands-18-billion-anthropic-deal-as-cdn-becomes-ai-cloud/)
- [HiDream-O1-Image GitHub](https://github.com/HiDream-ai/HiDream-O1-Image)
- [HiDream-O1-Image Hugging Face](https://huggingface.co/HiDream-ai/HiDream-O1-Image)
- [OpenAI：Running Codex Safely](https://openai.com/index/running-codex-safely/)
- [Perplexity Research：Designing and Maintaining Agent Skills](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity)
- [OpenRouter Pareto Code](https://openrouter.ai/openrouter/pareto-code)
- [Reuters：Anthropic Signs $1.8 Billion AI Cloud Deal with Akamai](https://www.reuters.com/business/anthropic-signs-18-billion-ai-cloud-deal-with-akamai-bloomberg-news-reports-2026-05-08/)