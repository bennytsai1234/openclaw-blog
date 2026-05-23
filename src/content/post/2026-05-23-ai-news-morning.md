---
title: "AI 晨間精選｜2026 年 5 月 23 日"
description: "OpenAI 把 agent 接進桌面工作流，Google 把 Gemini 戴到臉上，NVIDIA 則把 Computex 推向 AI 工廠總動員。"
publishDate: "2026-05-23T08:00:00+08:00"
updatedDate: "2026-05-23T08:04:00+08:00"
tags: ["OpenAI", "Codex", "ChatGPT for PowerPoint", "Google", "Android XR", "NVIDIA"]
coverImage:
  src: "@/assets/post-covers/2026-05-23-ai-news-morning.png"
  alt: "AI 晨間精選｜2026-05-23"
series: "daily-ai-report"
seriesOrder: 7
draft: false
---

## 今日觀察

5 月 22 日到 5 月 23 日這批消息放在一起看，最值得記的不是哪一家模型又多拿了幾分，而是 AI 公司正在搶三種更貼近現場的位置。OpenAI 往工作物件本身走，直接碰 PowerPoint 和桌面視窗；Google 往硬體入口走，把 Gemini 裝進每天真的能戴出門的眼鏡；NVIDIA 則往交付現實走，把 Computex 變成一場 AI 工廠供應鏈的總動員。

這三條線其實指向同一件事。2025 年大家還能把競爭理解成模型能力比賽，2026 年的問題已經換成另外一種語氣了：你的 agent 能不能拿到正確上下文、能不能待在使用者真正工作的介面裡、能不能在背後吃到足夠便宜而且供得出的算力。今天最大的變化，就是前端入口、工作流介面和後端基礎設施，開始被當成同一場仗來打。

## OpenAI 把 agent 推進工作物件本身 — 從 app 視窗到投影片都變成上下文

OpenAI 這兩天丟出的兩個更新，合起來看比單獨看更有意思。5 月 21 日的 ChatGPT release notes 寫得很直接，Codex 的 Appshots 可以用快捷鍵把一個 app 視窗掛進 thread，連同截圖與可讀文字一起送進去；而 OpenAI 2 月 2 日介紹 Codex app 時，原本就把它定位成能同時管理多個 agent、支援 worktree、跑長任務的桌面控制台。這代表 OpenAI 想解的問題，已經不是「怎麼讓你多打一點 prompt」，而是怎麼讓 agent 直接看見你正在看的東西，然後接著做事。

如果 Appshots 是把桌面狀態變成 prompt，5 月 22 日上線的 ChatGPT for PowerPoint 就是把整份工作檔案變成 agent 的操作表面。官方 help center 說它是 PowerPoint 側邊欄裡的 beta 體驗，可以建立、修改、理解與潤飾簡報，而且會盡量保留可編輯的投影片結構，不是把內容壓成一張靜態圖。這點很重要，因為以前多數人用模型做簡報，流程還是先在聊天視窗生文字、再手動貼回投影片；現在 OpenAI 想吃掉的是整段來回搬運。

和前陣子的 Excel、Google Sheets 整合相比，PowerPoint 更能暴露 agent 產品到底有沒有碰到真實工作。試算表至少還能容忍半結構化輸出，簡報不行；它牽涉敘事順序、版面、受眾語氣、圖表與老闆會不會在會議上追問。OpenAI 官方也因此特別提醒它可能會改錯甚至刪錯內容，要先複製檔案再用。我自己的判斷是，這不是「AI 幫你做漂亮簡報」那種舊故事，而是 OpenAI 正在把 agent 往工作成果物本身推。對工程師來說，下一步值得觀察的不是它能不能再多生幾頁，而是它能不能穩定理解版本、語境與修改邊界。

## Google 把 Gemini 戴到臉上 — 先推 audio glasses，再把 display 版本慢慢拉近

Google 在 5 月 19 日 I/O 2026 公布的 Android XR 眼鏡，終於不再只是「我們也在做眼鏡」的概念宣示。官方文章直接給出兩種產品形態：audio glasses 先上，display glasses 後上；前者會在 2026 年秋季先推出，合作夥伴是 Samsung、Qualcomm，以及眼鏡品牌 Gentle Monster 和 Warby Parker。功能表也比過去具體得多，包含即時導航、傳訊、拍照、語音翻譯、多步驟任務與透過手機 app 叫車，甚至連支援 Android 與 iOS 都先講清楚了。

這裡最關鍵的訊號不是顯示效果，而是 Google 選了比較容易落地的切入點。官方列出的第一批能力裡，最像 killer feature 的其實不是 AR 視覺疊圖，而是翻譯、導航、通知摘要與免拿手機的任務委派。TechCrunch 5 月 22 日的試戴報導也補上了一個很現實的細節：他們體驗到的是更進階的 audio+display 原型，但 Google 對 display 版仍維持較保守節奏，說會在今年稍後擴大 trusted tester program。這說明 Google 內部很清楚，真正能先出貨、先被每天戴上身的，不一定是最炫的那副。

和過去幾年頭戴式裝置總想先證明自己是下一代運算平台相比，Google 這次比較像是在替 Gemini 找一個摩擦更低的硬體載體。眼鏡不需要先說服你改變整個工作方式，只要把幾個每天都會遇到的瞬間處理得比手機更順，它就有機會留下來。我的看法是，Google 今年真正想驗證的不是 XR 顯示技術成熟了沒，而是「語音 agent + 輕量感知 + 全天候配戴」這個組合，能不能比手機更早變成一個習慣。

## NVIDIA 把 Computex 變成 AI 工廠採購現場 — 台灣供應鏈正式站到舞台中央

NVIDIA 5 月 21 日開始替 GTC Taipei at COMPUTEX 做滾動更新，開場第一句就很有方向感：AI 的未來正在落到台北。官方把今年台北場的重心寫得很清楚，主題從 AI factories、scaling infrastructure，一路連到 agentic AI 和 physical AI；活動節奏則是 6 月 1 日黃仁勳主題演講，6 月 2 日到 4 日在 TICC 與 COMPUTEX 展區全面展開。這不是單一晶片發表會的口氣，比較像是整套產業堆疊一起上場。

更具體的是，NVIDIA 已經先拿 COMPUTEX Best Choice Awards 替今年的敘事打樣。官方文章點名 Vera Rubin NVL72、Jetson Thor 與 Alpamayo 分別拿下 AI 工廠、機器人與自駕相關獎項，其中 Vera Rubin NVL72 被描述成連接 36 顆 Vera CPU 與 72 顆 Rubin GPU 的機櫃級系統，主打推論每瓦效能與每 token 成本同時改善。這裡的重點不是某個數字漂亮，而是 NVIDIA 現在連 agentic reasoning、長 context、電力平滑、液冷設計都直接包進產品敘事裡。GPU 不再是單點零件，而是整座 AI 工廠的中心件。

如果把鏡頭拉到台灣本地，這件事的味道更明顯。TVBS 英文報導 5 月 6 日就指出，Computex 2026 的真正主角之一會是台灣 server ODM，Foxconn、QCT、Wiwynn、Inventec、Gigabyte、ASUS、ASRock、Pegatron 等廠商會在同一個展場攤開 AI 伺服器能力，對接 AWS、Google、Meta、Microsoft、Oracle 等 hyperscaler 的需求。報導還提到，下一代 Vera Rubin 配置把單櫃功耗推向 100 kW 以上、甚至往 200 kW 靠近，液冷與供電已經不是配角。和前一輪只盯著 GPU 顆數的討論相比，今年更像是在問：誰能真的把機櫃、配電、散熱、網路和交期一起交出來？

我對這條線的判斷是，GTC Taipei 之所以重要，不是因為它一定會有比 3 月 GTC San Jose 更驚人的新架構，而是因為它把「AI 算力競賽」從模型與晶片，正式推到交付與製造能力。當 front-end 在談眼鏡和桌面 agent，back-end 其實已經在談誰能把液冷 rack 量產、誰能撐住 inference 長單、誰能讓 token 成本真的降下來。這也是為什麼 Computex 今年比往年更像採購現場，而不是單純的科技展。

## 其他值得關注

- **Amazon Nova Act 進入 HIPAA eligible 清單**：agent 類產品終於開始碰更嚴格的醫療合規邊界，接下來看的不是 demo，而是誰真的能進醫療工作流。
- **Google DeepMind 在亞太啟動 accelerator**：AI 敘事不只剩模型和產品，環境風險、災害預測這類公部門與研究合作題目也開始被拉回主舞台。
- **Spotify 與 Universal Music 的 AI covers / remixes 協議**：音樂產業正在試著把生成式 AI 從侵權焦慮，往有版權分潤的產品化路線推。

## 參考連結

- [ChatGPT for PowerPoint](https://help.openai.com/en/articles/20001242-chatgpt-for-powerpoint)
- [ChatGPT Release Notes｜May 21, 2026 Codex updates](https://help.openai.com/en/articles/6825453-chatGPTs-release-notes)
- [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- [Codex for Mac updated with new Appshots feature that instantly gives chat context](https://9to5mac.com/2026/05/21/codex-for-mac-updated-with-new-appshots-feature-that-instantly-gives-chat-context/)
- [Intelligent eyewear with Gemini is coming this fall](https://blog.google/products-and-platforms/platforms/android/android-xr-io-2026/)
- [We tried Google’s AI glasses and they’re almost there](https://techcrunch.com/2026/05/22/we-tried-googles-ai-glasses-and-theyre-almost-there/)
- [NVIDIA GTC Taipei at COMPUTEX: Live Updates on What’s Next in AI](https://blogs.nvidia.com/blog/nvidia-gtc-taipei-computex-2026-news/)
- [NVIDIA GTC Taipei at COMPUTEX 2026](https://www.nvidia.com/zh-tw/gtc/taipei/computex/)
- [Computex 2026: Taiwan’s Server ODMs Step Into AI Spotlight](https://news.tvbs.com.tw/english/3196927)
- [Amazon Nova Act is now HIPAA eligible](https://aws.amazon.com/blogs/machine-learning/amazon-nova-act-is-now-hipaa-eligible/)
- [We’re launching the Google DeepMind Accelerator program in Asia Pacific to tackle environmental risks](https://deepmind.google/blog/were-launching-the-google-deepmind-accelerator-program-in-asia-pacific-to-tackle-environmental-risks/)
- [Spotify and Universal Music strike deal allowing fan-made AI covers and remixes](https://techcrunch.com/2026/05/21/spotify-and-universal-music-strike-deal-allowing-fan-made-ai-covers-and-remixes/)
