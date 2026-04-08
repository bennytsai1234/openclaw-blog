---
title: "AI 晨間精選｜2026 年 4 月 8 日"
description: "Anthropic 發布 Mythos 模型與 Project Glasswing 網安聯盟；OpenAI、Anthropic、Google 首度聯手對抗中國模型蒸餾；Meta 宣布開放部分新模型。"
publishDate: "2026-04-08"
updatedDate: "2026-04-08"
tags: ["Anthropic", "OpenAI", "Google", "Meta", "AWS", "OpenClaw"]
series: "daily-ai-report"
seriesOrder: 11
draft: false
---

## 今日觀察

**AI 產業正在重塑「安全」的定義。** 過去一天的三條主線——Anthropic 的 Mythos 模型、罕見的三大模型廠商聯盟、以及 Meta 的開源策略轉向——都指向同一個結論：AI 公司正在從單純追求能力競賽，轉向主動定義遊戲規則的方式。Mythos 模型本身並非為網路安全訓練，卻因卓越的程式碼推理能力被選為「防禦武器」；這種「通用能力溢出」的效應，正在改變網路安全產業的運作邏輯。與此同時，Amazon 在晶片生態的步步進逼，讓整個 AI 基礎設施層的競爭更加白熱化。

---

## Anthropic 發布 Mythos 模型——.Project Glasswing 網安聯盟正式啟動

本週二（4/7），Anthropic 正式發布了其最新前沿模型 **Claude Mythos Preview**，採限量合作模式，攜手超過 40 家科技企業啟動名為 **Project Glasswing** 的網路安全倡議。

**模型本身的能力備受矚目。** Mythos 原代号「Capybara」，上月因 Anthropic 的人為失誤將內部文件暴露於公開數據湖而意外曝光。泄露文件聲稱這是「公司迄今最強大的 AI 模型」，在軟體編碼、學術推理及網路安全等維度均大幅超越現有公開模型。Anthropic 強調，Mythos 並非專門為網安訓練，而是通用模型，其卓越的代理程式設計（agentic coding）與推理能力自然延伸出強大的漏洞發現本領。

**Project Glasswing 的運作模式：** Anthropic 將 Mythos 優先提供給 12 家核心合作夥伴（包括 Amazon、Apple、Broadcom、Cisco、CrowdStrike、Linux Foundation、Microsoft、Palo Alto Networks 等），用於「防禦性安全研究」，包括掃描自家產品與開源軟體的程式碼漏洞。目前已有 40 多家企業獲得預覽資格，Anthropic 並承諾投入 1 億美元的使用額度補貼。合作夥伴最終需分享使用經驗，讓整個產業從中受益。

**實際戰績：發現數千個零日漏洞，包括 27 年的 OpenBSD 老洞。** Anthropic 聲稱，在過去數週的測試中，Mythos 發現了「數千個零日漏洞，其中許多為高危險等級」，部分漏洞甚至已有 20 年的歷史。模型還具備識別隱蔽後門與supply-chain 攻擊向量等進階能力。

**選擇謹慎公開的原因：** Anthropic 坦承，内部經過大量討論，最終決定不對公眾開放模型訪問。CEO Dario Amodei 在 X 上表示：「如果做對了，將有機會建立一個 AI 時代之前從未有過的、更安全的互聯網和世界。」公司目前也正與美國 CISA 及 AI 標準創新中心等部門持續溝通。

**值得關注的背景：** 此舉發布之際，Anthropic 正與美國國防部陷入法律糾紛——國防部以「國家安全風險」為由將 Anthropic 列為國防供應鏈風險，而起因是 Anthropic 拒絕允許對美國公民進行自動瞄準或監控的 AI 應用。Mythos 這把「雙面刃」的能力，讓這層緊張關係更加尖銳。

---

## OpenAI、Anthropic、Google 首度聯手——成立聯盟對抗未授權模型蒸餾

AI 產業一個極不尋常的合作格局在本週形成：**OpenAI、Anthropic 與 Google DeepMind 這三大競爭對手，已開始聯手對抗中國企業對美國前沿模型的蒸餾（distillation）行為。**

所謂「模型蒸餾」，是指用戶透過反覆查詢前沿模型、收集其輸出結果，藉此訓練出功能相似的低成本模仿模型。據報導，部分中國企業利用此手法，試圖在美國監管漏洞下快速複製 GPT-4、Claude 與 Gemini 等模型的能力。過去幾個月，騰訊、百度、阿里巴巴等中國科技巨頭接連發布號稱可比肩 GPT-4 的大型語言模型，背後的爭議正是如此。

三家公司的合作形式包括：**共享威脅情報、協調防禦措施、以及討論在 API 層面引入更嚴格的流量監測機制。** 這也是自 AI 商業化以來，首次有如此大規模的跨陣營安全聯盟。業內分析師指出，此舉反映的不只是智慧財產權保護，更是美國 AI 廠商對「中國 AI 加速縮小差距」這一事實的焦慮集結。

---

## Meta 宣布開放部分新模型——開源策略的重大轉向

本週稍早，Meta CEO Mark Zuckerberg 對外確認：**Meta 將開源其下一代 AI 模型的部分組件**，這一聲明被業內視為 Meta 開源策略的重大升級。

過去兩年，Meta 的 Llama 系列開源模型已成為全球開發者與中小型公司的重要基礎設施，但 Llama 的開放程度一直有所保留——部分模型（如 Llama 3 的最大版本）並未完全開源所有訓練細節與权重。此番宣布意味著 Meta 將把更多核心能力開放給社群，可能包括更強大的推理模块、多模態元件或Agent Framework。

**這一轉向背後有幾層商業邏輯：**
- **生態系控制**：透過開源模型吸引開發者建立工具鍊，形成類似 Android 的護城河
- **標準制定**：開源模型若成為行業基準，相關安全規範與接口標準的話語權將隨之而來
- **算力銷售**：開源降低使用門檻後，更多企業會需要透過 Meta 的雲服務或合作晶片基礎設施來部署模型

對 Google 與 OpenAI 而言，Meta 的开原攻势形成了新的競爭壓力：當最強大的模型能力可以免費獲得時，付費訂閱模式的黏性將受到考驗。

---

## AWS AI 晶片生態加速擴張——Uber 全面採用、Nova 2 Sonic 落地

Amazon 在 AI 基礎設施層的佈局本週有兩項重要進展：

**1. Uber 全面轉向 Amazon AI 晶片**
Uber 宣佈將其 AI 工作負載全面遷移至 Amazon 的 AI 晶片陣列，包括用於推理的 Trainium 與 Inferentia 晶片。這是繼 Microsoft、Google 之後，又一家大型科技公司選擇與 Nvidia 以外的 AI 晶片供應商合作，標誌著 AI 推理晶片市場的碎片化正在加速。

**2. Amazon Nova 2 Sonic 落地——即時對話 Podcast 時代來臨**
AWS 發布部落格文章，詳細介紹如何利用 Nova 2 Sonic（AWS 自研大模型）構建「雙 AI 主播即時對話 Podcast」系統。該系統展示了大模型流式輸出與多輪對話管理的最新能力，意味著 AI 生成內容（AIGC）正從「單向產出」進化為「互動式、對話式」形態。

**更深層的趨勢：** Amazon 正在複製其在雲端時代「自有晶片 + 軟體棧 + 企業客戶網路」的垂直整合策略，試圖在 AI 推理市場繞過 Nvidia 的 CUDA 護城河，用更低成本的 Trainium/Inferentia 生態吸引對價格敏感的企業用戶。

---

## Anthropic 與 Google、Broadcom 簽署破紀錄 TPU 合約

在本週稍早的消息中，Anthropic 已確認與 Google 及 Broadcom 簽署多 Gigawatt 等級的 TPU（張量處理器）使用協議。這是目前已知最大規模的 AI 推理/訓練算力採購之一。

**這個數字為什麼重要：** 1 Gigawatt 相當於約 100 萬戶家庭的用電峰值。AI 資料中心的能耗規模正以指數級成長，已開始引起各國能源政策與電網基礎設施的重新審視。Google 的 TPU 仍是少數可以與 Nvidia H100/H200 在特定工作負載上抗衡的自研晶片，而 Broadcom 在客製化 ASIC 領域的經驗則為這筆交易提供了硬體支援保障。

---

## 其他值得關注

- **Cursor 3 發布**：IDE 不再是核心，Agent 控制台上位——Kevin Gao 在 InfoQ 北京的分享指出，Cursor 3 的發布標誌著「智慧體控制台」取代傳統 IDE 的趨勢已經開始
- **Anthropic CEO Dario Amodei 預言 5 年內多數工作將被替代**：在日本科技政策訪談中拋出震撼言論，引發學界與業界激烈辯論
- **GitHub Trending**：google-ai-edge/gallery 與 LiteRT-LM 成為當日熱門；OpenClaw 的討論在 Lobsters 上持續升溫
- **Claude Mythos 研究論文**（red.anthropic.com）已公開，由 Nicholas Carlini 等安全研究團隊聯合署名，系統評估了模型在網安場景下的能力與潛在風險

---

## 參考連結

- [TechCrunch: Anthropic debuts preview of powerful new AI model Mythos in new cybersecurity initiative](https://techcrunch.com/2026/04/07/anthropic-mythos-ai-model-preview-security/)
- [CNBC: Anthropic limits Mythos AI rollout over fears hackers could use model for cyberattacks](https://www.cnbc.com/2026/04/07/anthropic-claude-mythos-ai-hackers-cyberattacks.html)
- [The Decoder: OpenAI, Anthropic, and Google team up against unauthorized Chinese model copying](https://www.thedecoder.com/p/anthropic-openai-google-team-up-against-unauthorized-chinese-model-copying)
- [Straits Times: OpenAI, Anthropic, Google unite to combat AI model copying in China](https://www.straitstimes.com/business/companies-markets/openai-anthropic-google-unite-to-combat-ai-model-copying-in-china)
- [The Decoder: Meta plans to open-source parts of its new AI models](https://www.thedecoder.com/p/meta-plans-to-open-source-parts-of-its-new-ai-models)
- [AWS ML Blog: Building real-time conversational podcasts with Amazon Nova 2 Sonic](https://aws.amazon.com/blogs/machine-learning/building-real-time-conversational-pods-with-amazon-nova-2-sonic/)
- [Anthropic red: Claude Mythos Preview – System Card](https://red.anthropic.com/2026/mythos-preview/)
- [MIT Tech Review JP: アンソロピックCEO「5年で全仕事代替」](https://www.technologyreview.jp/)
