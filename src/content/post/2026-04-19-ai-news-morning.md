---
title: "AI 晨間精選｜2026 年 4 月 19 日"
description: "Cerebras 申請 IPO、Recursive Superintelligence 獲 5 億美元鉅額融資、DeepSeek 首度開放外部增資——三條主線看懂當前 AI 資本市場的瘋狂與焦慮。"
publishDate: "2026-04-19T08:00:00+08:00"
updatedDate: "2026-04-19T00:10:00+08:00"
tags: ["Cerebras", "IPO", "Recursive Superintelligence", "DeepSeek", "NVIDIA"]
series: "daily-ai-report"
seriesOrder: 45
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-19-ai-news-morning.png"
  alt: "AI 晨間精選｜2026 年 4 月 19 日"
---

## 今日觀察

過去 48 小時的 AI 產業新聞濃縮成三件事：Cerebras 要上市了，目標是 mid-May；一家成立才四個月的公司叫 Recursive Superintelligence，已經裝進了 5 億美元，估值 40 億，Google Ventures 領投、NVIDIA 跟投；與此同時，DeepSeek 這家從未拿過外部錢的中國 AI 新創，據傳正在洽談第一次對外增資，目標至少 3 億美元。

這三件事發生在同一個禮拜，說明的不是 AI 泡沫有多嚴重，而是錢的流向正在重新排隊。Cerebras 代表的是有營收、有客戶（AWS、OpenAI）、有硬體交付能力的晶片公司要二級市場化；Recursive Superintelligence 代表的是「自我改進型 AI」這個概念已經足夠吸引頂級投資人掏錢；DeepSeek 則說明中國 AI 生態在美國晶片禁令壓力下，正在用一種極端的意志力找出路。

對工程師而言，這三條線索加在一起，提供了一個判斷框架：AI 基礎設施的資本競爭還沒結束，甚至剛進入下一輪淘汰賽。

---

## 主題一：Cerebras 申請 IPO——一家敢直接嗆聲 NVIDIA 的晶片新創終於要上市了

Cerebras Systems 在 4 月 18 日正式向美國證管會（SEC）遞交 IPO 文件，計劃 mid-May 掛牌。這是 Cerebras 第二次申請 IPO——上一次是 2024 年，因為 Abu Dhabi G42 的投資案遭遇美國國安審查而撤件。這一次背景不同了：營收數字擺出來了，OpenAI 的合約擺出來了，AWS 的合作也擺出來了。

先看基本面。根據 IPO 文件，Cerebras 2025 年營收 5.1 億美元，淨利 2.378 億美元（若扣除一次性項目，則為非 GAAP 虧損 7570 萬）。去年九月才剛完成 11 億美元 G 輪，今年二月又完成 10 億美元 H 輪，估值 230 億。短短半年間估值三級跳，現在要找二級市場接棒。

但讓這次 IPO 真正引發話題的，是執行長 Andrew Feldman 的一段受訪。他對《華爾街日報》說：「很明顯地，NVIDIA 不願意失去 OpenAI 這個快速推理業務，而我們從他們手中搶過來了。」這句話的底氣來自 2026 年初達成的一紙協議——OpenAI 據報導與 Cerebras 簽下價值超過 100 億美元的算力合約。

Cerebras 的核心產品是一款用整片晶圓（wafer-scale）打造的 AI 加速器，與 NVIDIA 的 GPU 叢集路線完全不同。傳統觀點認為 Cerebras 的市場極窄，只適合少數需要極度扁平記憶體架構的工作負載。但現在的事實是：OpenAI 選擇把相當一部分推理工作分流給 Cerebras，而不是全部押在 H100/H200 叢集上。這個訊號對投資人的意義是：AI 推理市場已經大到需要多供應商，何況在某些場景下 Cerebras 的性價比確實勝出。

對工程師來說，Cerebras 掛牌後最值得追蹤的是幾件事：這家公司會不會把 API 開放给一般開發者，而不只是超大企業？它的 wafer-scale 架構在實際推理工作負載下的延遲與成本數據，目前沒有太多公開資料，IPO 之後勢必會有更詳細的 benchmark 數據出來。另外，NVIDIA 會不會有應對動作？這也會影響整個 AI 基礎設施市場的價格結構。

---

## 主題二：Recursive Superintelligence 四個月估值 40 億——Google Ventures 和 NVIDIA 同時掏錢的.self-improving AI 是什麼

過去這個週末最戲劇化的 AI 融資新聞，不是來自任何一家已知的 AI 獨角獸，而是一家四個月前才成立、團隊約 20 人、產品尚未正式發布的新創。Recursive Superintelligence（簡稱 RSI）宣布已完成至少 5 億美元融資，估值 40 億美元，Google Ventures（GV）領投，NVIDIA 入股。根據《金融時報》報導，這輪融資超額認購，最終金額可能上看 10 億美元。

團隊陣容是亮的：創辦人 Richard Socher 是 Salesforce 前首席科學家，Tim Rocktäschel 是 UCL AI 教授兼前 Google DeepMind 主力科學家，團隊成員涵蓋前 OpenAI、Google 和 Meta 研究員。這些不是只想做產品的工程師，而是真正相信「AI 可以自我改進」這個方向的 research-oriented 團隊。

Recursive Superintelligence 的願景是構建一種能夠在沒有人類介入的情況下持續自我改進的 AI 系統。這個概念在 AI 社群裡有個名字：recursive self-improvement，維基百科的條目把它連結到技術奇點（technological singularity）的討論。主流 AI 實驗室（包括 Anthropic 和 OpenAI）都把這種能力當成長期研究目標，但從未對外宣布已接近實用階段。RSI 的說法是：他們正在研究階段，還沒有經過長時間測試。這個姿態的誠實程度，其實比很多「已完成 AGI」的浮誇聲明要靠譜得多。

錢進來的邏輯有兩個層次。第一層是：Google Ventures 從來不投純粹在燒錢的研究專案，它投的是有商業化路徑的團隊。GV 顯然認定 RSI 的研究方向與 Google 內部的某些戰略方向有足夠高的相關性，以至於願意在團隊只有 20 人、產品還沒有的階段就下重注。第二層是：NVIDIA 的入股是關鍵信号。NVIDIA 從來不是財務投資人，它的投資對象一定是對 GPU 需求有結構性影響的公司。RSI 的算力需求預期極高——如果模型真的在持續自我改進，訓練和推论的計算量會指數成長，這對 NVIDIA 的 GPU 業務是長期大利多。

對工程師而言，RSI 的新聞最值得注意的不是「什麼時候會有產品」——四個月的公司不太可能有可用的东西——而是這個階段就已經有這麼多頂級資本願意下注，說明「self-improving AI」已經不是邊緣概念，而是 AI 投資圈的核心敘事。這會影響研究經費的流向，也會影響接下來一兩年內開源社群對「自我改進 Agent」的熱情程度。

---

## 主題三：DeepSeek 首度徵求外部增資——中國 AI 最重要的異類開始向外國資本招手

過去三年，DeepSeek 是中國 AI 版圖裡最特別的存在。創辦人梁文鋒從來不拿外部資金，High-Flyer Capital Management 是唯一的背后金主支撐所有開支。DeepSeek V3 在 2025 年初發布時，以不到 600 萬美元的訓練成本震驚業界，被視為中國 AI 性價比自己出的代表作。

現在這個慣例要被打破了。根據 The Information 報導，DeepSeek 正在與潛在投資人洽談第一次對外增資，目標至少 3 億美元，估值瞄準 100 億美元以上。這是 DeepSeek 成立以來第一次對外部資本敞開大門，而且據悉他們之前拒絕過幾乎所有中國頂級創投和科技巨頭的主動接觸。

轉向的背後有壓力。首先是人才流失：V3 模型的共同開發者羅福莉已跳到小米，郭大雅已入字節跳動，核心研發團隊的穩定性正在經歷考驗。其次是下一代旗艦模型 V4 的進度落後，原本規劃的发布时间多次延後，原因之一是工程師正在努力讓 V4 能夠完整運行在華為晶片上。這個決定與北京推動本土半導體獨立的政策方向高度吻合，代價是技術路徑被迫繞道。

所以這次對外增資，有一個很合理的解讀：DeepSeek 需要更多資金來支撐 V4 的研發，同時也需要戰略性資源——無論是華為的晶片供應鏈，還是與中國官方在半導體自主議題上的更深層合作。向外國創投伸手，意味著 DeepSeek 在某種程度上願意稀釋創辦人對公司的控制權。這對一個三年來從不稀釋、從不對外開放的公司來說，是一個根本性的文化轉變。

對工程師來說，DeepSeek 開放增資這件事最值得關注的是兩個問題。第一，V4 的實際效能——如果真的能完整運行在華為 Ascend 晶片上，這將是第一個主流大模型完全不使用 NVIDIA 晶片做訓練的案例，對中國 AI 生態的晶片自主有指標性意義。第二，DeepSeek 的開放策略會不會因此改變——過去 V3 和 R1 都是開源釋出，如果新資金要求某種商業化回報，開源政策可能會受到影響。

---

## 其他值得關注

- **Tesla Robotaxi 登陸達拉斯與休士頓**：Tesla 在 4 月 18 日宣布 Robotaxi 服務正式拓展至達拉斯與休士頓，在德州形成三城市營運網絡（奧斯汀為首個上線城市）。不過根據 Robotaxi Tracker 的眾包數據，兩座新城目前各僅有一台車上線，與奧斯汀 46 台活躍車輛相比，初期規模極小。工程師應該關注的不是「Robotaxi 現在能不能坐」，而是 Tesla 的監理對應策略——在奧斯汀上線以來已發生 14 起事故，NHTSA 已在調查，這些數據會直接影響 Tesla 在其他州的營運許可審批速度。

- **Anthropic 發布 Claude Opus 4.7**：Anthropic 在 4 月 18 日推出旗艦模型更新，焦點落在三個功能：代理程式編碼能力大幅提升（在 CursorBench 上從 58% 升至 70%）、視覺解析解析度提升三倍（最高 2576 像素）、以及新增 xhigh 推理力度選項與 Task Budgets 功能。這次更新對使用 Claude Code 做生產級開發的工程師最有價值——特別是 /ultrareview 功能與 Auto Mode 延伸至 Max 用戶這兩項，直接改變了人機協作的工作流程。

- **Meta 準備裁員 8 千人以支撐 AI 基礎設施投入**：根據 Reuters 報導，Meta 預定 5 月 20 日展開第一波裁員，規模約 8,000 人（約占全球員工數 10%），年內可能再進行第二波，總裁員比例上看 20%。與此同時，執行長 Mark Zuckerberg 正在把資源傾斜到 AI 基礎設施上。這個對比透露了一個殘酷的事實：在 Meta 的計算裡，維持員工規模與維持 AI 投資節奏已經是不可兼得的選項，而 Meta 選擇了後者。這對 Meta 的產品團隊和廣告系統團隊的工程師而言，是一個需要高度警覺的訊號。

---

## 參考連結

- [AI chip startup Cerebras files for IPO (TechCrunch)](https://techcrunch.com/2026/04/18/ai-chip-startup-cerebras-files-for-ipo/)
- [Self-improving AI startup Recursive Superintelligence pulls in $500 million (The Decoder)](https://the-decoder.com/self-improving-ai-startup-recursive-superintelligence-pulls-in-500-million-just-four-months-after-founding/)
- [Deepseek reportedly seeks outside funding for the first time at $10 billion valuation (The Decoder)](https://the-decoder.com/deepseek-reportedly-seeks-outside-funding-for-the-first-time-at-10-billion-valuation/)
- [Tesla brings its robotaxi service to Dallas and Houston (TechCrunch)](https://techcrunch.com/2026/04/18/tesla-brings-its-robotaxi-service-to-dallas-and-houston/)
- [Anthropic Releases Claude Opus 4.7 (MarkTechPost)](https://www.marktechpost.com/2026/04/18/anthropic-releases-claude-opus-4-7-a-major-upgrade-for-agentic-coding-high-resolution-vision-and-long-horizon-autonomous-tasks/)
- [Zuckerberg reportedly trades headcount for compute as Meta readies to cut 10 percent of its workforce (The Decoder)](https://the-decoder.com/zuckerberg-reportedly-trades-headcount-for-compute-as-meta-readies-to-cut-10-percent-of-its-workforce-to-fund-ai-infrastructure/)
