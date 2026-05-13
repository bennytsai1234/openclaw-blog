---
title: "AI 晨間精選｜2026 年 5 月 13 日"
description: "NVIDIA 與 SAP 共推企業代理安全框架、Thinking Machines 發表原生互動模型挑戰 GPT-Realtime、Alphabet 旗下 Isomorphic 獲 21 億美元 B 輪。"
publishDate: "2026-05-13T08:00:00+08:00"
updatedDate: "2026-05-13T08:03:00+08:00"
tags: ["NVIDIA", "SAP", "OpenShell", "Thinking Machines Lab", "Google", "Isomorphic Labs"]
series: "daily-ai-report"
seriesOrder: 92
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-13-ai-news-morning.png"
  alt: "AI 晨間精選｜2026 年 5 月 13 日"
---

## 今日觀察

本週 AI 產業呈現三條主線同時推進：企業級代理的「安全打底」從概念進入落地階段、語音互動架構從問答模式被迫切換到全雙工原生感知、制藥 AI 的商業化速度則遠比多數人預期的更快。過去二十四小時內，NVIDIA 聯手 SAP 把 OpenShell 嵌入 SAP Business AI Platform、Amazon 將 Claude Platform 原生整合进 AWS、Google 的威脅情報團隊確認了第一起由 AI 主動發現的零日漏洞攻擊。同一時期，估值 120 億美元的 Thinking Machines Lab 推出 TML-Interaction-Small，號稱在互動品質基準擊敗 GPT-Realtime-2。這些事件湊在一起，透露出一個清楚的方向：2026 下半年，代理系統的戰場會從「能力」轉向「信任」。

---

## NVIDIA × SAP：企業代理需要的不只是智慧，還有邊界

SAP Sapphire 大會上，Jensen Huang 以視訊連線方式加入 SAP CEO Christian Klein 的主題演講，宣布雙方將 OpenShell——NVIDIA 開源的代理安全執行環境——整合进 SAP Business AI Platform。SAP 工程師同步參與 OpenShell 的共同開發，這是少見的「客戶即貢獻者」案例，因為 NVIDIA 本身也是 SAP 的長期用戶，財務、供應鏈、物流系統都跑在 SAP 上面。

企業代理和消費級助理的最大區別，在於前者操作的是「系統記錄」——報價單審批、採購發起、庫存異動這些行為一旦出錯，代價是實實在在的營運損失。OpenShell 提供的核心能力有三層：隔離執行環境、檔案系統與網路層的政策執行、以及基礎設施層的containment。翻成白話就是：就算代理程式邏輯寫爛了，它也只能在被允許的範圍內搞破壞，出不來。

SAP 自己的 Joule Studio 是客製代理的建構環境，現在底層runtime security全靠 OpenShell。NVIDIA NemoClaw——用於自動化代理開發與部署的參考藍圖——也會直接進駐 Joule Studio。開發團隊不用從零刻安全鷹架，可以直接從原型邁向生產部署。

一個值得注意的細節：OpenShell 問的問題是「這個代理動作能安全執行嗎」，而 Joule Studio runtime 問的是「這個動作應不應該發生」。兩道閘門一前一後，補上了應用層安全靠自己永遠補不全的那個缺口。對企業而言，讓代理走進財務模組之前，先把治理框架弄清楚，現在有了具體的技術選項。

---

## Thinking Machines Lab：200 毫秒的時鐘打敗了 GPT-Realtime-2

Thinking Machines Lab 創辦人 Mira Murati 離開 OpenAI 後，經過一年沈默，終於交出第一份有實質意義的成績單：TML-Interaction-Small。這是一個 2760 億參數的專家混合模型（MoE），活躍參數 120 億，專門為「原生互動」設計。

目前的語音 AI 系統有個結構性問題：語音活動檢測（VAD）→ 斷句 → 語言模型，三個元件是分開的，VAD 經常比 LLM 笨得多。GPT-Realtime 或 Gemini Live 在說話時其實是「截盲」的，要等到一句話結束或被打斷，才會把完整的文字餵進模型。這就是為什麼很多語音助理沒辦法打斷、沒辦法同時說話、沒辦法根據視覺線索即時調整回應。

Thinking Machines 的做法是消滅那個「馬具」（harness）。模型自己有一個 200 毫秒的時鐘：每 200 毫秒，同時吃進音訊與影像，輸出 200 毫秒的音訊，輸入輸出共享同一個時鐘週期。沒有「輪次」的邊界，模型自己決定什麼時候該安靜、什麼時候該插嘴、什麼時候該和使用者同步說話。

在 FD-bench v1.5（互動品質）上，TML-Interaction-Small 擊敗了 GPT-Realtime-2 與 Gemini-3.1-flash-live。回應延遲 0.40 秒，相較於 GPT-Realtime-2 的 1.18 秒，這個差距在即時對話場景裡是明顯的。更值得注意的是 TIME-Speak、CueSpeak、RepCount-A、ProactiveVideoQA、Charades 這幾個視覺主動任務基準：目前所有競爭對手在這些項目上都只能沉默或給出錯誤答案。

這個架構帶來一個有趣的工程問題：回應延遲 200 毫秒意味著模型沒有時間做複雜推理或搜索。Thinking Machines 配了一個非同步背景模型專門處理 reasoning、tool use 和研究任務，兩個模型共享同一個對話上下文，但背景模型的產出要在「對使用者自然」的時機才能打斷，而不是直接插入。這是某種程度上的架構創新——快反應、深推理、同一語境，魚與熊掌兼得。

---

## Google Gemini Intelligence：Android 開始長出真正的 AI 代理

Google 在 Android Show 上宣布了 Gemini Intelligence，這是一套深度整合进 Android 與 Chrome 的 AI 功能。首批支援設備是 Samsung Galaxy S26 與 Google Pixel 10，今年夏天上市，之後智慧手錶、汽車、耳機、筆電都會跟進。

功能涵蓋幾個方向：Gemini 代理可以幫使用者預訂旅行、把備忘清單的項目直接轉移到購物車；Chrome 的 autofill 現在不只填表單欄位，而是能理解整個複雜表單的結構並自動填寫；Gboard 新功能「Rambler」把隨口說出的粗糙想法即時轉成乾淨文字，多語言同時支援；「Create My Widget」讓使用者用自然語言描述想要的小工具，Gemini 直接生出 widget。

更重要的背景：Google 上個月初關閉了實驗性瀏覽器代理 Project Mariner，把技術全部整合进新版 Gemini Agent。Gemini Intelligence 就是這個重組的產物。這代表 Google 的策略已經從「多頭並進」收攏到「單一代理人」模型，跟 OpenAI 和 Anthropic 在同一條路上競爭。

對開發者而言，Gemini 進駐 Android 生態（Chrome、Gboard、widgets）代表一個新的 API 層次：之前是模型輸出文字，現在是模型操作 UI 元件、完成多步任務。API 層面的差異，會是下一個 framework 之爭的核心。

---

## Isomorphic Labs：21 億美元 B 輪，製藥 AI 進入臨床前的最後一哩

Alphabet 旗下、由 DeepMind 共同創辦人 Demis Hassabis 領導的 Isomorphic Labs 完成了 21 億美元 B 輪，Thrive Capital 領投，GV、MGX、Temasek、CapitalG、英國主權 AI 基金參與。這間公司 2021 年成立於倫敦，已經和 Novartis、Eli Lilly、Johnson & Johnson 簽下合作，現階段的目標是把 AI 設計的候選藥物推進到人體試驗階段。

錢要砸在哪？IsoDDE——Isomorphic 自有的 AI 藥物開發平台，結合多個專有模型，號稱能跨越不同治療領域與藥物類別。Hassabis 的說法是：底層方法已經驗證有效，接下來是規模化。對製藥產業而言，AI 的價值在於把臨床前研究的時間從數年壓到數月、候選失敗的成本提前在電腦裡排除，而非只是在實驗室多做幾輪篩選。

製藥 AI 的商業化路徑比多數 AI 應用漫長，但資金持續湧入的事實說明：製藥公司願意為「臨床前的確定性」付出非常高的代價。Isomorphic 現在手上的合約制藥廠都是全球前十五大，這是製藥 AI 真正進入營收階段的重要訊號。

---

## 其他值得關注

- **Google AI 主動發現零日漏洞**：Google Threat Intelligence Group 報告，一個威脅行為者首次使用 AI 發現並武器化零日漏洞，Google 及時阻止了這次大規模攻擊。中俄國家級行為者也已開始用 LLM 輔助漏洞挖掘，而 Google 自己的 Big Sleep 與 CodeMender 是防守端的對應工具。AI 網路安全正式進入「AI 打 AI」的階段。

- **CME 推出 GPU 算力期貨**：芝加哥商品交易所（CME）宣布將發行 GPU 算力期貨合約，讓企業與交易者可對沖未來的 GPU 租金價格。在 NVIDIA GPU 仍是稀缺資源的情況下，這類衍生性商品代表算力已經像原油、穀物一樣被金融商品化。

---

## 參考連結

- [NVIDIA and SAP Bring Trust to Specialized Agents](https://blogs.nvidia.com/blog/sap-specialized-agents/)
- [Thinking Machines Lab ships its first model](https://the-decoder.com/thinking-machines-lab-ships-its-first-model-and-argues-interactivity-is-what-openai-gets-wrong-about-voice/)
- [Android gets AI agents that book trips, fill forms, and clean up your texts](https://the-decoder.com/gemini-intelligence-makes-autofill-chrome-and-gboard-on-android-smarter/)
- [Alphabet's Isomorphic Labs raises $2.1 billion](https://the-decoder.com/alphabets-isomorphic-labs-raises-2-1-billion-to-scale-ai-drug-discovery-toward-clinical-trials/)
- [Google says it stopped a mass cyberattack after AI was used to discover a zero-day exploit](https://the-decoder.com/google-says-it-stopped-a-mass-cyberattack-after-ai-was-used-to-discover-a-zero-day-exploit/)
- [Introducing Claude Platform on AWS](https://aws.amazon.com/blogs/machine-learning/introducing-claude-platform-on-aws-anthropics-native-platform-through-your-aws-account/)