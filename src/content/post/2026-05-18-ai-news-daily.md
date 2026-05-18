---
title: "AI 新聞精選｜2026 年 5 月 18 日"
description: "Codex 遠端控制再往前一步，DeepMind 把前沿 AI 推向氣候場景，Gemini 的模型抽象化更明顯。"
publishDate: "2026-05-18T12:00:00+08:00"
updatedDate: "2026-05-18T12:06:00+08:00"
tags: ["OpenAI", "Codex", "Google DeepMind", "Gemini", "ChatGPT"]
coverImage:
  src: "@/assets/post-covers/2026-05-18-ai-news-daily.png"
  alt: "AI 新聞精選｜2026 年 5 月 18 日"
series: "daily-ai-report"
seriesOrder: 94
draft: false
---

## 今日觀察

5 月 18 日這波新聞有個很一致的方向：大模型公司不只是在發模型，而是在補齊讓模型真正進入工作流程的基礎設施。OpenAI 這邊，Codex 從手機監工進一步走向多裝置遠端控制；Google DeepMind 這邊，則把前沿模型能力包成一個亞太氣候加速器；連 Gemini 這種看似只是 App 介面的小改動，也透露出另一個訊號，就是 Google 正把模型選擇慢慢藏到產品體驗後面。對工程師來說，今天比較值得看的不是誰又喊出更強的 benchmark，而是這些公司正在怎麼把 AI 從 demo 變成可持續運作的系統。

---

## 主題一 — Codex 遠端控制補上關鍵一哩，手機不再只是通知器

OpenAI 在 5 月 14 日正式推出「Work with Codex from anywhere」之後，Codex 的定位已經從單機上的 coding agent，變成可以跨手機、Mac 主機、SSH 開發環境運作的長任務協作系統。官方說法很清楚：手機端看到的是執行中的即時狀態，真正的專案檔案、憑證、權限、plugins、skills 和本地工具，仍然留在原本那台機器上。這一點很重要，因為它意味著 OpenAI 並不是把 IDE 搬到手機，而是把「批准、追問、改方向、看 diff」這種零碎但關鍵的決策點，抽出來做成遠端控制面板。

今天的 Juya 條目真正有意思的部分，在於報導提到 OpenAI 正測試讓 Codex 透過 Computer Use 控制其他桌面裝置，甚至探索在鎖屏狀態下持續執行的「Locked Use」。這件事目前還不是正式發布，來源主要是 TestingCatalog 觀察到的介面與測試狀態；但如果把它放回 OpenAI 近一週的官方文件來看，脈絡其實很連貫。Codex 的遠端連線文件已經明寫，使用者可以在一台主機上啟用「Control other devices」，而 Remote connections 也明確支援 Mac 主機、常駐 Mac 與 SSH host。再加上 5 月 8 日 changelog 新增 codex remote-control 入口，代表底層能力早就在往「多主機、多執行環境」的方向鋪。

這裡最值得工程師注意的，不是「可以從手機控制電腦」這種表層新鮮感，而是 OpenAI 正在把 agent 的執行環境拆成兩層：上層是你隨時可插手的對話與審批介面，下層是長時間在線的主機與工具鏈。這種結構和傳統遠端桌面不一樣，因為重點不是串流畫面，而是保留 thread、工具權限、終端輸出、測試結果與工作上下文。假如 Locked Use 真能上線，意義也不是多一個炫技功能，而是 Computer Use 不再被「人要回去把筆電打開」卡住，像 GUI 測試、桌面模擬器操作、內部系統巡檢這類任務，才有機會變成真正的 unattended workflow。

不過風險也很直接。OpenAI 官方的 Computer Use 指南一再強調要跑在隔離環境、對高風險操作保留人工批准，而且必須把螢幕內容與第三方頁面都視為不可信輸入。這代表就算遠端控制能力持續擴張，產品方向也不會是「把整台開發機無條件交給 agent」，而是更像一個有審批、有沙箱、有 relay 的遠端操作框架。和上週單純把 Codex 放進 ChatGPT 手機 App 比起來，今天這條新聞更像第二階段：OpenAI 開始把 agent 從「我能看你做了什麼」推進到「我能讓你在別台機器上繼續做完」。

---

## 主題二 — Google DeepMind 把前沿模型包成氣候加速器，開始押注產業落地速度

Google DeepMind 今天宣布在亞太推出首屆 AI for the Planet 加速器，為期三個月，對象是新創、研究團隊與非營利組織，主打用 frontier AI 去處理自然、氣候、農業與能源問題。表面上看，這像是科技公司常見的影響力計畫；但把公告和 Google、KPMG 先前聯合研究放在一起看，這更像是 Google 對一個很具體瓶頸的回應：亞太區不是沒有綠色投資，而是缺把技術從 pilot 推到商業規模的能力。

KPMG 與 Google 的報告提到，亞太在 2023 年吸收了超過 45% 的全球能源轉型投資，規模約 9,400 億美元，但氣候科技融資在 2020 到 2024 年間反而下滑了 44%。報告還點出另一個更刺眼的對比：GreenTech 新創平均要超過 7 年才能從 A 輪走到 D 輪，數位新創大約只要 3 年。更直接地看，錢不是完全沒有進來，真正卡住的是部署速度、跨國協作、人才與商業化週期。DeepMind 現在推出的加速器，與其說是在宣傳 AI 能拯救地球，不如說是在補「模型能力怎麼接到場域」這段常常最難也最慢的路。

這也是這條新聞和過去不少 ESG 型宣示最大的差別。DeepMind 這次不是丟出一個抽象願景，而是給了相對明確的支援形式：三個月週期、Google AI 專家指導、frontier AI 與 science AI 模型整合支援，以及新加坡的實體 bootcamp。這些安排透露一個很務實的假設，那就是現在真正的瓶頸已經不是「大家知不知道 AI 很厲害」，而是有沒有能力把模型接進農業監測、能源優化、氣候風險分析這些需要資料、場域與跨部門協作的流程裡。

對開發者來說，這條新聞的啟示不在於你明天就要去做 climate startup，而是 Google 正把前沿模型當成產業基礎設施往外推。去年大家談 AI，重點多半還是聊天、搜尋、寫程式；今年開始，前沿模型被打包成 accelerator、工作流平台、企業接入方案，甚至連研究支持都變成產品化服務。這代表 AI 競爭下一步不只看模型分數，也看誰能提供更完整的導入模板。Google 在亞太先開這個口子，很可能是在測試一件事：當模型能力已經足夠強，真正稀缺的是能把它部署進現實產業的人和流程。

---

## 主題三 — Gemini 的重點不是 3.2 來了，而是模型正在被 UI 抽象化

Juya 今天把社群觀察到的 Thinking Level 與疑似 Gemini 3.2 路由變動列進快訊，這條如果寫得不小心，很容易變成「Google 偷發新模型」的聳動敘事。但目前比較可靠的讀法其實是另一個方向：Google 已經正式把 Gemini App 的模型選擇做成 Fast、Thinking、Pro 這種任務導向介面，而社群看到的疑似 3.2，只能算是底層模型切換的跡象，還不能當成公開發布。

官方 Help Center 現在已經明寫，Gemini Apps 的 Fast 是偏速度的工作模型，Thinking 是平衡速度與推理的模式，Pro 則對應 3.1 Pro 等級的數學、程式與多模態能力。Google 去年在 I/O 2025 先把 Canvas 推成創作與原型空間，2025 年 11 月的 Gemini 3 App 更新又把 Thinking 放進 model selector，讓 Gemini 3 Pro 直接透過這個入口對外。這說明 Google 的產品策略正在變化：它不再要求一般使用者精準理解一長串模型代號，而是把模型能力包成幾個體感明確的檔位。你選的是「快一點」還是「想深一點」，至於背後究竟是 3 Flash、3.1 Pro 還是未來的 3.2 Flash，Google 有愈來愈大的空間在後台替換。

這就是為什麼今天這條傳聞值得看，但不值得過度解讀。社群觀察到的 Fast mode 加上 Canvas 疑似路由到新 Flash 模型，確實和 Google 這兩季的節奏相符。從 I/O 2025 強推 Canvas，到 Gemini 3 官方文案直接說它是「best vibe coding model ever」，Google 很明顯把 coding、互動式介面生成與多模態理解綁在同一條產品線上。若底層真的在悄悄升級，也很可能是為了讓這些高頻場景更順，而不是急著對外宣告一個新版本名。

對工程師而言，重點不是去追 3.2 這個數字本身，而是接受一個正在成形的現實：面向終端產品時，模型版本號可能會愈來愈不重要，重要的是 Google 願意把多少能力放進哪一個 UX 檔位、給多少人用、限額怎麼設、什麼任務會被路由到更強的後端。這和 API 世界裡明確點名模型的做法不同，也代表日後做效能比較時，App 端體驗與 API 端模型未必能直接對齊。今天看到的，不一定是 Gemini 3.2 的官宣，但很可能是模型層被產品層吃掉的又一個信號。

---

## 其他值得關注

- **知乎資料開放平台**：今天曝光的知乎資料開放平台提供站內搜尋、全網搜尋、熱榜與直答 API，還特別標示支援 Skills、API、MCP 等接法，註冊後每日有 1000 次試用額度。這種把內容平台直接包成可調用資料層的做法，對中文 RAG 與搜尋代理會有實際吸引力。

- **中國電信 Token 套餐**：中國電信試商用的 Token 套餐從月費 9.9 元到 299.9 元不等，最高方案對應每月 1.5 億 tokens。這不是前沿模型新聞，但它提醒了一件事：模型能力之外，電信商與基礎設施商也開始搶佔「誰來賣 token、誰來包裝計費」這一層市場。

---

## 參考連結

- [Google DeepMind：AI for the Planet Accelerator](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/accelerator-ai-for-the-planet/)
- [KPMG x Google：Scaling Asia Pacific’s GreenTech ecosystems](https://www.eco-business.com/press-releases/asia-pacific-at-a-climate-inflection-point-new-kpmg-google-report-calls-for-coordinated-action-to-scale-greentech-ecosystems/)
- [OpenAI：Work with Codex from anywhere](https://openai.com/index/work-with-codex-from-anywhere/)
- [OpenAI Developers：Remote connections](https://developers.openai.com/codex/remote-connections)
- [OpenAI Developers：Codex changelog](https://developers.openai.com/codex/changelog)
- [OpenAI API：Computer use guide](https://developers.openai.com/api/docs/guides/tools-computer-use)
- [TestingCatalog：Codex can now control other desktop devices via Computer Use](https://www.testingcatalog.com/openai-will-let-codex-control-other-desktop-devices-via-computer-use/)
- [Google Help：Use Gemini Apps](https://support.google.com/gemini/answer/13275745?hl=en&co=GENIE.Platform%3DAndroid)
- [Google Blog：Gemini 3 brings upgraded smarts and new capabilities to the Gemini app](https://blog.google/products/gemini/gemini-3-gemini-app)
- [Google Blog：Gemini gets more personal, proactive and powerful](https://blog.google/products/gemini/gemini-app-updates-io-2025/)
