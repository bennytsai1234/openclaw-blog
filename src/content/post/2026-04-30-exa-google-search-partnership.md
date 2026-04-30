---
title: "【技術解析】Exa 為何被 Google 接進 AI 搜尋堆疊"
description: "Exa 被 Google Cloud 接進 Vertex AI 與 Gemini Enterprise，顯示 AI 搜尋基礎設施正快速分層。"
publishDate: "2026-04-30T16:10:00+08:00"
updatedDate: "2026-04-30T16:12:00+08:00"
tags: ["Exa", "Google Cloud", "Vertex AI", "Gemini Enterprise", "Search API"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-30-exa-google-search-partnership.png"
  alt: "【技術解析】Exa 為何被 Google 接進 AI 搜尋堆疊"
---

## Google 沒有自己全包，反而把 Exa 接了進來

4 月底，Exa 在自家部落格丟出一則很短的公告：Google 已經把 **Grounding with Exa Web Search** 放進 Vertex AI 的 Private Preview，Exa Agent 也成了 **Gemini Enterprise Agent Marketplace** 的首發夥伴之一。若只看字面，這像是一則普通合作新聞；若往下拆，你會發現它其實很反直覺。

Google 本來就是全球搜尋秩序的制定者。結果到了 AI agent 時代，它不只沒有把「網路搜尋」完全鎖在自家系統裡，反而讓一間做 AI 搜尋的新創以外部能力的身分進到 Vertex AI 與 Gemini Enterprise。更精確地說，Google 在某些企業場景裡，選擇讓 Exa 供應即時網頁檢索與結果抽取。這已經不只是「合作」，而是 Google 願意把 Exa 納進自家 AI 產品堆疊。

對 Exa 而言，這是里程碑；對整個市場而言，這更像是一個訊號：**AI 時代的搜尋，未必再是單一巨頭從索引、排序、介面到應用全部包辦，而是開始拆成多層供應鏈。**

## Exa 到底在做什麼

Exa 不是另一個想直接取代 Google 首頁的消費級搜尋站。它從一開始瞄準的就不是人，而是 **AI 本身**。

依照 TechCrunch 2024 年的報導，Exa 由 Will Bryk 與 Jeff Wang 在 2021 年創立，最初想做的是用 AI 重新打造搜尋引擎。ChatGPT 爆紅後，他們很快發現，最急著需要新型搜尋的不是一般網友，而是大量冒出的 AI 產品：聊天機器人要找即時資訊，coding agent 要查技術文件，研究 agent 要抓論文、公司資料與網頁內容。於是 Exa 的定位逐漸清晰：不是「給人用的搜尋引擎」，而是「給 AI 用的搜尋基礎設施」。

這個定位後來愈來愈鮮明。Exa 在 2025 年宣布完成 **8500 萬美元 Series B**，估值來到 **7 億美元**；官方說法是自己已經服務「數千家公司」，從 Cursor 之類的 AI 產品，到私募股權與顧問公司都在用。Lightspeed 的投資文也提到，Exa 目前索引的是 **數十億級網頁文件**，而且主打的不只是相關性，還有延遲與可客製化能力。

簡單講，Exa 的產品哲學跟傳統搜尋引擎差很多。它不想把你導去點廣告、逛 SEO 頁面，而是想把頁面內容濃縮、抽取，再直接餵給模型。官方在 Series B 公告裡列得很直白：AI 要的是高品質知識、完整頁面內容、低延遲、可高算力展開的大規模搜尋，以及 **Zero Data Retention**。這些條件，本來就不是傳統搜尋引擎替人類設計時的優先順序。

## Google 跟 Exa 的合作，實際上分成兩層

Exa 這次進到 Google 生態，不是單一入口，而是兩條路線同時打通。

第一條是 **Vertex AI 上的 Grounding with Exa Web Search**。Google 官方文件寫得很清楚：這是一個 **Separate Offering**，目前仍在 **Restricted Preview**。它的角色，是把 Gemini 模型接到 Exa 的公網搜尋 API，讓模型在回答問題時，能即時抓取最新網頁資料，再把相關片段送進上下文。Google 文件特別提到，這適合新聞、商品資料、技術文件一類對「新鮮度」與「事實正確性」要求很高的任務。

第二條是 **Gemini Enterprise 裡的 Exa Agent**。在 Google Cloud 的官方部落格裡，Exa Agent 被列進 Agent Gallery 的首批夥伴名單。Google 對它的描述也很具體：Exa Agent 能把即時網路視野轉成一個可查詢的資料庫，覆蓋 **程式碼、人物、公司** 等資訊，協助開發工具、招募與市場研究等任務。

兩者差在哪裡？前者比較像「模型層工具」，讓開發者在 Vertex AI 裡把 Exa 當成 grounding source；後者比較像「應用層 agent」，讓企業使用者在 Gemini Enterprise 裡直接呼叫 Exa 的研究能力。也就是說，Exa 同時踩進了 **底層檢索能力** 跟 **上層 agent 入口**。

這正是此事最有意思的地方。若只有 Agent Marketplace 上架，還能說是一般生態合作；連 grounding 都接進 Vertex AI，代表 Google 至少承認一件事：在某些企業級 AI 任務裡，外部 AI-native 搜尋供應商有獨特價值。

## 為何 Google 自己不全做？

直覺上最容易冒出的疑問是：Google 明明有 Google Search，也有自己的 grounding 能力，何必還要接 Exa？

答案恐怕不在「Google 不會做」，而在「AI agent 要的，不只是一個給人看的搜尋頁」。

Exa 這類產品的強項，不是首頁流量，而是 **把搜尋結果變成適合模型消化的中介資料層**。Exa 官方提到自家的 Highlights 模型會先從網頁裡抽出高密度、貼近查詢的片段，避免把一大坨頁面樣板、導覽列與廣告文案全塞進模型上下文。若你在做 agent，這一層很重要：模型每一次工具呼叫都在燒延遲、燒 token，也在放大噪音。能不能把「網頁」轉成「可被模型高效率消化的知識塊」，其實就是產品體驗差異。

再來是客製化。Exa 在 Series B 公告裡強調，自家搜尋能排除數千個網域、回傳上百筆結果、加自訂分類器，甚至提供零資料保留。對企業客戶來說，這些都比「一般搜尋很強」更有購買理由。Google 若要服務各種 agent builder，也未必得把每一種檢索邏輯都自己包下來；它更像是在搭一個平台，讓不同專精能力上來補洞。

## 此事真正透露的，不是合作本身，而是市場分層

我覺得最值得在意的，不是「Exa 拿到 Google 背書」這個表層敘事，而是搜尋市場的重心正在偏移。

過去談搜尋，大家想到的是同一件事：誰擁有最多索引、最強排序、最大流量入口，誰就贏。AI 時代仍然重視索引與排序，不過價值開始往另一端滑動——**誰更懂得替模型準備資料，誰就有機會卡進新的基礎設施層。**

這也是 Exa 跟 Perplexity 那種消費級 AI 搜尋產品最不同的地方。Perplexity 比較接近「新型介面」，Exa 更像「後端供應商」。TechCrunch 去年就點出，Exa 的大客戶之一是 Databricks；Lightspeed 今年又補了一個訊號：Cursor 也在用 Exa 查技術文件。如今 Google Cloud 再把它接進 Vertex AI 與 Gemini Enterprise，等於又往上蓋了一層驗證：Exa 並非只是在新創圈裡有話題，而是真的在 AI 工具鏈裡佔到一個位置。

## 我的看法：Google 不是輸了，而是很現實

若把此事簡化成「Google 竟然要靠新創做搜尋」，其實會看錯焦點。Google 並不是失去搜尋能力，而是很現實地接受一件事：AI 平台的勝負，不一定靠全部自研，而是靠 **把最適合 agent 的能力最快接進來**。

對 Google 而言，最有價值的資產已經不只是搜尋首頁，而是 Vertex AI、Gemini Enterprise、Agent Marketplace 這種平台級分發入口。只要平台還握在手上，底層某些能力由夥伴提供，未必是壞事。反過來看，Exa 的機會也不在正面挑戰 Google Search，而在成為各大模型平台都願意接入的「AI 搜尋中介層」。

若此趨勢成立，未來的搜尋戰場就不只是使用者打開哪個網站，而是 **模型在背後呼叫哪一層檢索基礎設施**。人類看不見的 API 入口，反而可能比首頁更值錢。

Exa 這次最厲害的地方，不在它發布了一則合作新聞；而在它讓市場看到，一間主打「給 AI 用的搜尋引擎」的新創，已經強到足以被 Google 納入正式產品堆疊。對一家搜尋新創來說，這幾乎是最有說服力的介紹方式。

## 參考連結

- [Exa and Google Partnership｜Exa Blog](https://exa.ai/blog/exa-google-cloud)
- [Grounding with Exa Web Search｜Google Cloud Documentation](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-exa)
- [Partner-built agents available in Gemini Enterprise｜Google Cloud Blog](https://cloud.google.com/blog/products/ai-machine-learning/partner-built-agents-available-in-gemini-enterprise)
- [Exa raises $17M from Lightspeed, Nvidia, Y Combinator to build a Google for AIs｜TechCrunch](https://techcrunch.com/2024/07/16/exa-raises-17m-lightspeed-nvidia-ycombinator-google-ai-models/)
- [Exa raises $85M to build the search engine for AIs｜Exa Blog](https://exa.ai/blog/announcing-series-b)
- [Search, Perfected for AI: Why We’re Doubling Down on Exa｜Lightspeed](https://lsvp.com/stories/search-perfected-for-ai-why-were-doubling-down-on-exa/)
