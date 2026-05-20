---
title: "AI 晨間精選｜2026 年 5 月 20 日"
description: "Google 把 Search 做成 agent 入口，OpenAI 接上 SynthID，Claude 則開始吃進顧問與科學工作流。"
publishDate: "2026-05-20T08:00:00+08:00"
updatedDate: "2026-05-20T08:06:00+08:00"
tags: ["Google", "Gemini 3.5 Flash", "OpenAI", "SynthID", "Anthropic", "Claude"]
series: "daily-ai-report"
seriesOrder: 3
draft: false
---

## 今日觀察

Google 在 I/O 2026 把 Gemini 3.5 Flash 直接推進 Search，OpenAI 則把自家圖片溯源方案接上 Google 的 SynthID，Anthropic 同一天把 Claude 送進 KPMG 的核心交付平台。這三條新聞看起來分屬搜尋、媒體驗證和企業應用，實際上都在指向同一件事：模型公司不再只賣一個聊天框，它們現在搶的是入口、驗證層和工作流本身。

如果把時間往前拉一年，大家還在比誰的模型分數更高、誰的 app 體驗更順。今天的節奏已經變了。Google 想把 Search 變成長時間運作的 agent 容器，OpenAI 想讓自己生成的內容在別人的平台上也能被辨識，Anthropic 則想證明 Claude 不只會寫字，還能進稅務、私募與藥物研發這些高成本場景。今天最大的變化，不是哪一家又發了一個新模型，而是幾家大廠都在往更難被替換的那一層靠。

## Google 把 Search 改造成 agent 入口 — Gemini 3.5 Flash 不只是在回答問題

Google 這次 I/O 最值得工程師注意的，不是單一功能，而是 Search 的角色變了。官方說法很直接：Gemini 3.5 Flash 從今天起成為全球 AI Mode 的預設模型，AI Mode 去年上線一年後已經超過 10 億月活躍用戶，查詢量還在按季翻倍。這代表 Google 不只是把一個新模型塞進搜尋框，而是把最有流量的產品，正式改成 frontier model 的分發入口。

Gemini 3.5 Flash 的定位也跟以前的 Flash 系列不太一樣。Google 給的數字很有針對性，像是 Terminal-Bench 2.1 的 76.2%、MCP Atlas 的 83.6%，還有輸出速度號稱比其他 frontier 模型快 4 倍。這些指標都不是在講聊天品質，而是在講 agent 與 coding 任務。更關鍵的是，Google 把 Antigravity 一起拉進 Search，讓搜尋結果可以即時組出互動式圖表、模擬器和客製化介面。以前 Search 的終點是連結頁，現在 Google 想把它變成執行頁。

這個方向在「information agents」上更清楚。官方描述是 24/7 背景運作的 agent，會持續看網頁、新聞、社群貼文和即時資料，等條件成立再回來通知你。TechCrunch 把它比成 Google Alerts 的下一代，這個比喻很準。差別在於舊的 Alerts 只會丟連結，新版 agent 會先整合、比較，再決定什麼時候值得打擾你。對使用者來說，這只是搜尋框變聰明；對 Google 來說，這其實是在把「一次性查詢」改成「持續性委託」。

Gemini Omni 放在同一天發表，也不是巧合。Omni 的重點是把文字、圖片和影片編輯串成一條創作鏈，而不是只做單次生成。這讓 Google 的搜尋入口和生成入口開始互相靠近：前者負責追蹤、整理、組裝答案，後者負責把答案變成可看的媒體或互動介面。跟去年相比，Google 這次更像是在把 Search、Gemini 與生成式 UI 收斂成同一個 runtime。這一步真正要對打的，不只是傳統搜尋，也包括把使用者工作流整段吃進去的 ChatGPT。

## OpenAI 接上 SynthID — 內容溯源開始從單家標記走向跨平台協議

今天另一條很值得記下來的線，是 OpenAI 正式把 Google DeepMind 的 SynthID 接進自己的圖片生成流程。OpenAI 官方公告寫得很清楚，它現在同時做三件事：成為 C2PA 的 conforming generator product、把 ChatGPT、Codex 與 API 產生的圖片接上 SynthID，另外還預覽一個公開驗證工具，讓使用者可以上傳圖片檢查其中是否含有 Content Credentials 與 SynthID 訊號。

這裡最重要的不是「OpenAI 也開始加浮水印」這麼簡單，而是它承認單一機制不夠。C2PA 的優點是有完整的中繼資料和簽章，缺點是經過下載、重新上傳、截圖或轉檔後很容易掉。SynthID 則剛好補另一邊，它把看不見的訊號直接埋進影像本身，比較扛得住裁切、壓縮和濾鏡。OpenAI 的表述很務實：metadata 提供上下文，watermark 提供韌性，兩個一起用才比較像真正可落地的內容溯源。

Google 同天的部落格把這件事再往前推了一步。它透露 SynthID 目前已經替超過 1000 億張圖片與影片、以及 6 萬年長度的音訊加上標記，Gemini app 的驗證功能也已被使用 5000 萬次，而且接下來 Search、Chrome、Lens 與 Circle to Search 都會加入驗證能力。OpenAI、Kakao、ElevenLabs、NVIDIA 也開始採用或串接這套技術。這個訊號很強，因為過去 SynthID 比較像 Google 自家產品的檢測體系，現在才第一次比較像跨平台規格。

不過這不代表「AI 生成內容終於都能被查出來」。OpenAI 自己也在公告裡承認，若偵測不到 metadata 或 watermark，工具不會下定論，因為訊號有機會被剝除。Ars Technica 也提醒，開源模型和未加標記的生成系統還是大量存在。今天的進展不是終局，而是底層協議開始成形。對平台方、媒體和開發者來說，這比任何單一偵測模型都更實際，因為你總算有一套比較像標準件的東西可以接。

## Claude 開始往高價值工作流裡鑽 — 從顧問平台到藥物研發都想吃下來

Anthropic 今天的官方新聞稿裡，最醒目的數字是 KPMG 將把 Claude 開給全球超過 27.6 萬名員工，並直接嵌進 Digital Gateway 這個用來做客戶交付的主平台。這不是員工多一個聊天視窗而已。KPMG 和 Anthropic 都反覆強調，Claude Cowork 與 Managed Agents 會放進稅務、法務、私募與資安流程裡，而且是在 Azure 上、結合客戶資料與既有工具一起跑。KPMG 還提到，原本要花數週搭出來的稅務 agent，現在可以縮到幾分鐘。

如果只看這則新聞，你可能會把它理解成又一筆顧問公司合作案。但把 SandboxAQ 的消息放進來，味道就不一樣了。TechCrunch 報導，SandboxAQ 把自己的 Large Quantitative Models 接到 Claude 後，研究人員可以直接用自然語言操作藥物與材料科學模型，不必先準備一套專門的運算基礎設施。重點不是 Claude 變成科學模型，而是 Claude 變成一個跨工具入口，把本來只有計算科學家能碰的系統，往一般研究團隊推近一步。

這兩件事的共同點，是 Claude 被拿去接高摩擦、昂貴、而且錯了會很麻煩的工作流。KPMG 看重的是信任、治理和多代理協作；SandboxAQ 看重的是把物理模型包進自然語言介面。跟前一波企業 copilot 相比，今天這些案子更像是「把模型嵌進既有專業系統」，而不是「替員工多加一個摘要工具」。前者難做得多，但一旦做成，替換成本也高得多。

我的判斷是，Anthropic 接下來會愈來愈少把 Claude 單獨當成聊天產品賣，而是把它賣成能接住專業工具、公司治理和代理協作的中介層。這和 Google 想把 Search 變成 agent 入口、OpenAI 想把生成內容的驗證權延伸到外部平台，其實是同一種競爭邏輯：誰先站到工作流的中間，誰就比較不會被下一個新模型輕易替掉。

## 其他值得關注

- **Andrej Karpathy 加入 Anthropic 預訓練團隊**：這不一定立刻改變產品節奏，但說明 Anthropic 仍在補強最核心的模型研究戰力。
- **Mistral AI 收購 Emmi AI**：歐洲模型公司也開始往垂直模擬與企業堆疊擴張，不打算只停在通用模型層。
- **Google 的音訊智慧眼鏡與 Gmail 語音搜尋**：這些功能本身不是今天最硬的工程訊號，但它們讓 Gemini 正在往更多日常介面滲透。

## 參考連結

- [Gemini 3.5: frontier intelligence with action](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/)
- [A new era for AI Search](https://blog.google/products-and-platforms/products/search/search-io-2026/)
- [Gemini Omni — Google DeepMind](https://deepmind.google/models/gemini-omni/)
- [How to use Google’s new AI agents to go beyond your standard searches](https://techcrunch.com/2026/05/19/how-to-use-googles-new-ai-agents-to-go-beyond-your-standard-searches/)
- [Everything Announced at Google I/O 2026: Gemini, Search, Smart Glasses](https://www.wired.com/story/everything-google-announced-at-google-io-2026/)
- [Advancing content provenance for a safer, more transparent AI ecosystem](https://openai.com/index/advancing-content-provenance/)
- [Making it easier to understand how content was created and edited](https://blog.google/innovation-and-ai/products/identifying-ai-generated-media-online/)
- [SynthID — Google DeepMind](https://deepmind.google/models/synthid/)
- [Google's SynthID AI watermarking tech is being adopted by OpenAI, Nvidia, and more](https://arstechnica.com/google/2026/05/googles-synthid-ai-watermarking-tech-is-being-adopted-by-openai-nvidia-and-more/)
- [KPMG integrates Claude across its core business and workforce of more than 276,000 in strategic alliance](https://www.anthropic.com/news/anthropic-kpmg)
- [KPMG and Anthropic sign global alliance and launch Digital Gateway Powered by Claude](https://kpmg.com/xx/en/media/press-releases/2026/05/kpmg-and-anthropic-sign-global-alliance-and-launch-digital-gateway-powered-by-claude.html)
- [SandboxAQ brings its drug discovery models to Claude — no PhD in computing required](https://techcrunch.com/2026/05/18/sandboxaq-brings-its-drug-discovery-models-to-claude-no-phd-in-computing-required/)
