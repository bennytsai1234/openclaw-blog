---
title: "AI 晨間精選｜2026 年 4 月 30 日"
description: "NVIDIA 發表全模態一體模型、OpenAI 與微軟獨家協議終結後登陸 AWS、馬斯克與阿特曼對簿公堂，三件大事背後的脈絡一次看。"
publishDate: "2026-04-30T08:00:00+08:00"
updatedDate: "2026-04-30T00:26:00+08:00"
tags: ["NVIDIA", "Nemotron", "OpenAI", "AWS", "GPT-5.5"]
series: "daily-ai-report"
seriesOrder: 67
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-30-ai-news-morning.png"
  alt: "AI 晨間精選｜2026 年 4 月 30 日"
---

## 今日觀察

四月最後一個交易日，AI 產業界接連拋出三枚深水炸彈。NVIDIA 端出第一款真正意義上整合視覺、音訊與語言的全模態推理模型Nemotron 3 Nano Omni；OpenAI 與微軟的獨家協議在法庭壓力下提前瓦解，亞馬遜隔日隨即宣布全線接入 OpenAI 模型；同時馬斯克狀告阿特曼與 OpenAI 案在奧克蘭聯邦法院開審，雙方在陪審團前交火。看似獨立的這三件事，指向同一個結構性移動：當 AI 基礎設施的排他性框架陸續崩解，各陣營正在重新搶奪誰能第一批規模部署最前沿模型的位置。

---

## NVIDIA Nemotron 3 Nano Omni — 視覺、音訊、語言終於合而為一

AI Agent 系統過去處理多模態輸入時，通常要串起三個獨立模型——一個看圖、一個聽音、一個讀文字——然後在中間層設法把彼此輸出的上下文拼起來。延遲高一點、誤差累積多一點、部署成本乘以三。NVIDIA 在 4 月 28 日發表的 Nemotron 3 Nano Omni，是第一個從架構層面把這個問題拆掉的開放模型。

**它到底做了什麼**

Nemotron 3 Nano Omni 是一款 30B-A3B 混合專家架構（MoE）的全模態推理模型，支援文字、圖片、音訊、影片、文件和圖形介面輸入，輸出則純文字。它在六項基准測試排名領先，涵蓋複雜文件理解、影片推理和音訊理解。實測吞吐量比同類開放全模態模型高出 9 倍，而延遲幾乎不變。架構代號 EVS（Early Vision Encoding）、Conv3D、256K context window。

**跟既有做法差在哪裡**

過去 Agent 要做電腦使用（computer use）任務時，通常靠視覺語言模型處理截圖、再由語言模型接手規劃。缺點是每張截圖都要跑一次完整推理，互動延遲高，1920×1080 全解析度輸入幾乎不可能即時處理。H Company 拿它跑 OSWorld 基准測試，直接用原生 1920×1080 像素輸入，複雜圖形介面的導航能力出現明顯階梯式提升。這不是增量最佳化，是輸入解析度的數量級躍進。

**為什麼工程師現在要在意**

如果你的系統需要同時處理文件理解、語音客服錄音、螢幕錄影分析，過去的代價是串三套模型、承擔三次延遲、三組維護成本。Nemotron 3 Nano Omni 把視覺編碼器和音訊編碼器內建在同一個 Transformer 架構裡，MoE 前饋層只有 50M 活躍參數，總參數 1.5B，用稀疏路由節省算力——這代表它可以真正跑在邊緣裝置或企業內部伺服器上，不再只是雲端 API。

此外，模型已開放在 Hugging Face、OpenRouter、build.nvidia.com 等平台下載，訓練資料集與技巧一併公開。對於需要在有資料主權要求的環境（例如金融或醫療）部署的團隊，這是少數可以完全控制、微調後依然留在自己機房的開放全模態模型。

---

## OpenAI 登陸 AWS — 獨家協議瓦解後的第一個 24 小時

四月最後一個星期，OpenAI 與微軟重寫合作協議、解除 Azure 獨家經銷權。不到 24 小時，AWS 在舊金山活動上宣布三項新服務即刻上線 Amazon Bedrock：OpenAI 模型直接託管、Codex on Bedrock、以及雙方共同打造的 Bedrock Managed Agents。

**它到底做了什麼**

Bedrock Managed Agents 是這次公告的核心產品。AWS CEO Matt Garman 將其定義為「有狀態的執行期環境」——每個 Agent 都有獨立身份、完整動作日誌、運行在客戶自己的基礎設施內，所有推論都經由 Bedrock 路由。翻譯成工程語言：企業可以用 OpenAI 最前緣模型的能力，但 inference 留在自己的 VPC，不需要擔心資料出境。

GPT-5.4 已經可以在 Bedrock 上呼叫，GPT-5.5 預計數週內跟進。這是 AWS 首次直接托管 OpenAI frontier 模型，過去 OpenAI 的 Azure 獨家協議使微軟得以阻止 OpenAI 向其他雲端轉授權。

**跟既有做法差在哪裡**

過去要在雲端用 OpenAI 模型，只有兩個選擇：直接叫 OpenAI API，或透過 Azure（後者有企業合規優勢但價格較高）。Azure 的獨家權在 2026 年初其實已成為 OpenAI 繼續擴大營收的障礙—— Anthropic 靠著讓 AWS 和 Google Cloud 都能提供 Claude，在企業市場快速滲透；OpenAI 如果只靠一個分銷通路，8500 億美元 IPO 估值的故事很難說服投資人。現在 GPT-5.4 上 Bedrock，等於 OpenAI 一次打開了企業合規市場和 AWS 基礎設施的雙重通道。

值得注意的一個細節：Sam Altman 出席這次活動是以視訊連線，因為他同時在奧克蘭法院出庭。OpenAI CEO 一邊應對 1500 億美元損害賠償官司，一邊還是要親自站台雲端合作夥伴——這說明 AWS 這條通路對 OpenAI 此刻的商業化敘事有多重要。

**為什麼工程師現在要在意**

Bedrock Managed Agents 具體改變的是 Agent 部署的預設架構。如果你的公司已經在 AWS 生態系裡，需要用 OpenAI 模型跑流程自動化或客服 Agent，現在可以直接在 Bedrock 內建身份與日誌機制，不需要自己兜一套 Agent 框架。對於已經投資 Amazon Bedrock AgentCore 的團隊，這是與 OpenAI frontier 模型直接整合的官方路徑，穩定性比社群外掛可靠。

---

## 馬斯克 v. 阿特曼 — 一場代價 1500 億美元的非典型專利訴訟

這場聯邦法院訴訟的核心不是技術，是 OpenAI 從非營利轉型為營利公司的過程中，馬斯克認為自己被背叛了什麼。雙方的敘事在法庭上交火時，陪審團聽到的是兩個完全不相容的 OpenAI 起源故事。

**馬斯克的版本**

根據馬斯克在證人席上的證詞，他創辦 OpenAI 的動機是對抗 Google 的 AI 霸權。Google 共同創辦人 Larry Page 曾叫他「物種歧視者」，因為他堅持人類利益優先於未來數位生命形式。馬斯克說：「我想要一間公司成為 Google 的平衡力——與 Google 相反。」他聲稱自己想出公司名稱、招募關鍵人員、提供初期資金。

馬斯克指控 OpenAI 把智財權和員工轉移到營利公司，「博物館的禮品店把畢卡索的作品卖掉，然後把真跡鎖起來不讓任何人看見。」他的律師尋求 1500 億美元損害賠償，並要求法院撤銷 OpenAI 的重組。

**OpenAI 的反駁**

OpenAI 律師 William Savitt 的開場陳述與馬斯克版本幾乎處處矛盾。他引用了 2015 年的郵件——當時馬斯克自己寫道「也許用標準 C 型公司搭配平行非營利組織比較好」。2016 年他說「OpenAI 以非營利方式成立也許是個錯誤，因為 DeepMind 進展太快」。到 2017 年，馬斯克提議把 OpenAI 變成全營利公司並由他絕對控制，其他創辦人否決了這個提案。Savitt 的結論：「馬斯克只是因為自己的方案沒被接受，就把這間公司起訴了。」

**為什麼這件事對 AI 產業有意義**

這場訴訟不只是兩個人之間的恩怨。它直接影響 OpenAI 的重組是否能維持現狀，以及 8500 億美元 IPO 的時間表。如果法院支持馬斯克的救濟請求（撤銷重組），OpenAI 的整個營利子公司結構將被迫拆分，這對仰賴 OpenAI 營利機構達成協議的投資人和雲端合作夥伴都是地雷。

對於關注 AI 治理的工程師，這個案例正在成為未來非營利-營利混合結構的先例參考。OpenAI 當年選擇非營利，後來發現算力需求讓這個框架無以為繼；現在馬斯克試圖用法律手段強迫執行他認為「最初承諾」的合作模式，無異是對整個產業釋出一個信號——如果你支持非營利AI組織，卻在事實上允許其轉向營利，法律救濟並非不存在。

---

## 其他值得關注

- **Scout AI 募資 1 億美元訓練戰爭用 AI 模型**：國防新創 Scout AI 獲得 1 億美元融資，用於開發幫助個別士兵控制自主車隊的 AI Agent。軍事 AI Agent 正在脫離研究階段進入實際部署，這是明確的產業訊號。
- **OpenAI Privacy Filter 開源**：1.5B 總參數、50M 活躍參數的稀疏 MoE 模型，專門用於文字中 PII 偵測與遮蔽，Apache 2.0 授權可在瀏覽器或筆電上執行。對需要處理機敏資料但不能呼叫第三方 API 的團隊，這是實用工具。
- **Google 擴大與國防部 AI 合約**：在 Anthropic 拒絕國防部用於國內大規模監控和自主武器的請求後，Google 簽署新合約填補這個位置。涉及國防應用的 AI 模型治理問題，正在成為大型模型提供商的立場測試。

---

## 參考連結

- [NVIDIA Nemotron 3 Nano Omni部落格全文](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/)
- [The Decoder — OpenAI lands on AWS](https://the-decoder.com/openai-lands-on-aws-one-day-after-microsoft-deal-restructuring/)
- [The Decoder — Musk and Altman face off](https://the-decoder.com/musk-and-altman-face-off-in-court-over-openais-for-profit-pivot/)
- [Wired — Musk Testifies at Trial](https://www.wired.com/story/model-behavior-elon-musk-testifies-at-musk-v-altman-trial/)
- [MarkTechPost — OpenAI Privacy Filter](https://www.marktechpost.com/2026/04/28/openai-releases-privacy-filter-a-1-5b-parameter-open-source-pii-redaction-model-with-50m-active-parameters/)
- [TechCrunch — Scout AI raises $100M](https://techcrunch.com/2026/04/29/coby-adcocks-scout-ai-raises-100-million-to-train-models-for-war-we-visited-its-bootcamp/)
