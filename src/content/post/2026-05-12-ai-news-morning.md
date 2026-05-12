---
title: "AI 晨間精選｜2026 年 5 月 12 日"
description: "OpenAI 成立 DeployCo 進軍企業部署、Anthropic 與 AWS 深度整合、百度 ERNIE 5.1 以 6% 訓練成本挑戰一線陣營，三條主線串起本週 AI 產業的關鍵轉向。"
publishDate: "2026-05-12T08:00:00+08:00"
updatedDate: "2026-05-12T08:03:00+08:00"
tags: ["OpenAI", "Anthropic", "Baidu", "AWS", "DeployCo"]
series: "daily-ai-report"
seriesOrder: 90
draft: false
---

## 今日觀察

五月中旬的 AI 產業，接連出現三個訊號指向同一件事：模型本身的戰爭已經不是終點，誰能把它們實際部署到企業流程裡，才是下一階段的主戰場。OpenAI 成立 DeployCo，買下 Tomoro 並引入 19 家投資機構當靠山；Anthropic 讓 Claude Platform 直接進駐 AWS 帳戶；百度則用一份不可驗證但極具說服力的 benchmark，試圖證明訓練效率的落後可以靠演算法追上。這三件事加在一起，勾勒出的是一幅「基礎模型 → 企業落地」的價值鏈重構圖。對工程師而言，這代表的不是又多了一個新模型可以玩，而是 AI 進入生產環境時會碰到的那些問題——整合、成本、可靠性——正在被認真拆解。

---

## OpenAI 成立 DeployCo：把顧問公司做進估值裡

OpenAI 上線了一個新公司，全名「OpenAI Deployment Company」，內部代號 DeployCo。對外公告的核心訊息很直接：OpenAI 不只要賣 API，現在要直接派工程師進駐企業，幫忙把 AI 系統做到真的能用、真的在用。

這個決定背後有一個明確的商業邏輯。過去幾年，已經有超過一百萬家企業接上 OpenAI 的 API，但實際做出來的系統，品質參差不齊，很多最後變成「有 ChatGPT 但沒有 ChatGPT 化的工作流」。DeployCo 要解決的就是這段落差。OpenAI 會派出所謂 Forward Deployed Engineers（FDE），進去客戶組織，從診斷哪些環節值得上 AI 開始，一路做到系統上線。

LaunchCo 同時宣佈收購 Tomoro，一家做企業 AI 落地很成熟的顧問公司。收購完成後，會有約 150 名有實戰經驗的 FDE 直接加入 DeployCo，無需從頭組建。Tomoro 之前服務過 Tesco、Virgin Atlantic、Supercell 這類對可靠性要求極高的企業，這是本次收購最有價值的部分。

DeployCo 的資本結構也值得注意。它是 OpenAI 持股過半的子公司，但同時引入了 19 家私募、諮詢和系統整合商當合作夥伴，包括 Bain Capital、Goldman Sachs、SoftBank Corp.、Capgemini 和 McKinsey。光是這張名單，就代表這家公司第一天就握有覆蓋全球數千企業的銷售網絡。初期資金超過 40 億美元。

對工程師來說，DeployCo 模式代表一種新的職業角色——FDE。他們不是純研究，也不是純顧問，而是要真的在客戶的技術棧裡寫 code、做整合、搭系統。這和 Anthropic 稍早推出的 Claude Platform 以及內建 Agent 功能，方向上高度重疊，都是在搶「幫企業把 AI 做出來」這段價值。

---

## Anthropic × AWS：Claude Platform 正式登陸雲端

Anthropic 宣佈 Claude Platform 在 AWS 上正式可用。這不是把那個 API 包裝一下放到 Marketplace 那麼簡單，而是允許企業直接透過自己的 AWS 帳戶啟動 Claude Platform，包含 Messages API、Claude Managed Agents（beta 版）以及相關工具，不需要另外建立一組新的帳單或合約。

這件事對 AWS 的戰略價值不言而喻。AWS 過去幾年在 AI 基礎設施上一直被質疑「在生成式 AI 時代落後了」——客戶大量採用 OpenAI API 和 Azure OpenAI Service，AWS 的存在感相對弱。引進 Claude Platform，等於在自家雲上補了一個頂級模型供應商，而且是以「原生平台」而不是「簡單 API」的方式呈現，代表整合深度更高。

從 Anthropic 的角度，走 AWS 帳戶的好處是滲透進那些本來就重度使用 AWS 的企業客戶。這些企業現在可以把 Claude 直接嵌進現有工作流，不需要改變帳單架構，也不需要再跑一次 vendor negotiation。對於合規要求嚴格的金融、醫療和政府客戶，這種「在我的帳戶裡跑」的心理門檻比「把你的資料傳到 Anthropic 伺服器」低很多。

這個動作出現在 DeployCo 成立隔天，時間點湊巧但訊號清晰：OpenAI 和 Anthropic 之間的競爭，已經從「誰的模型更強」蔓延到「誰的企業落地網絡更深」。AWS、微軟 Azure 和 Google Cloud 都變成了必爭之地，而雲端廠商也樂於讓多個模型供應商在同一個基礎設施上競爭。

---

## 百度 ERNIE 5.1：用 6% 的訓練成本擠進第四名

百度丟出一個數字足夠吸睛的宣稱：ERNIE 5.1 的預訓練成本只有同類型模型的 6%，但在同一套 Search Arena Leaderboard 拿到 1223 分，全球第四名。這個數字如果屬實，代表的不只是百度自己的成本勝利，而是對整個「Scaling Law 已經走到盡頭、必須靠砸錢追趕」論述的質疑。

ERNIE 5.1 的技術核心是百度所說的「Once-For-All elastic training framework」。簡單講，就是在同一個訓練流程裡，同時最佳化一整個不同大小的模型 family，共享 weights，只差在 depth、expert 數量和每個 query 激活哪些 expert。ERNIE 5.1 是從這個 family 裡挑出來的一個子模型，節省了重頭訓練的成本。背後另一個關鍵工程是百度重建了整個 RL 基礎設施，把 model update、response generation 和 evaluation 三個環節從原本的 tight coupling 拆開成獨立的子系統，讓各環節可以独立擴展，解決了大型模型 RL 訓練中常見的 drift 問題。

在 benchmark 方面，百度聲稱 ERNIE 5.1 在 autonomous AI agent 任務上打敗 DeepSeek-V4-Pro，在數學 benchmark AIME26 僅落後 Gemini 3.1 Pro 少許，在創意寫作上追平西方商業模型。不過，這些數字都未經獨立驗證（百度沒有開源權重），社群對此態度通常偏保留。

真正值得注意的，是 ERNIE 5.1 的訓練效率論述，和 DeepSeek V4 當初推出的邏輯如出一轍：用更聰明的演算法、更低的成本，挑戰需要天量 GPU 才能做出來的模型。對工程師而言，這代表訓練基礎設施的進步，已經開始把「多少張 H100」變成不是唯一決定模型品質的因素——架構創新、資料效率和訓練方法同樣重要。

---

## 其他值得關注

- **Byte Latent Transformer 新推理方法**：Meta 與 Stanford 團隊提出 BLT-Diffusion 三種加速方法，最高可將推理記憶體頻寬減少 87–92%，且不需要 tokenization。對部署 byte-level 模型感興趣的工程師，這篇論文值得追蹤。

- **Sakana AI × NVIDIA TwELL**：利用 ReLU 替換 SiLU 加上 L1 sparsity regularization，在 feedforward layer 誘導出 99%+ activation sparsity，實現 20.5% 推理加速和 21.9% 訓練加速。這套方法的關鍵創新在於 TwELL 這個 sparse format——可在現有 GPU kernel 的 epilogue 階段直接構建，不需要另開 kernel，迴避了過去 sparse kernel 的 overhead。

- **Jensen Huang 給 CMU 畢業生的演說**：NVIDIA CEO 在 CMU  commencement 上說「你們的職涯起點正好在 AI 革命的起點」，呼籲「讓 AI 廣泛可及」的同時強調，科學家與工程師有責任同步推進 AI 能力與安全。他獲授 CMU 榮譽博士學位。

- **Google：AI 駭客已成工業規模威脅**：Google 威脅情報報告指出，過去三個月內，AI 輔助駭客攻擊已從潛在問題爆發成工業級威脅，中俄朝等國家駭客組織已常態使用 Gemini、Claude、OpenAI 模型改良攻擊工具與規模。中國某犯罪組織甚至差點用 LLM 發現的 zero-day 發動大規模漏洞攻擊。

- **Cowboy Space 募 2.75 億美元做太空資料中心**：由 Robinhood 共同創辦人 Baiju Bhatt 創辦，從衛星太陽能電站概念 Pivotal 到決定自己造火箭，目標 2028 年前發射。為了解決「沒有足夠火箭」的問題，Cowboy Space 乾脆把自己變成火箭公司。

---

## 參考連結

- [OpenAI launches the OpenAI Deployment Company](https://openai.com/index/openai-launches-the-deployment-company/)
- [Introducing Claude Platform on AWS](https://aws.amazon.com/blogs/machine-learning/introducing-claude-platform-on-aws-anthropics-native-platform-through-your-aws-account/)
- [NVIDIA CEO Tells Graduates: Your Career Starts at the Beginning of the AI Revolution](https://blogs.nvidia.com/blog/nvidia-ceo-carnegie-mellon-commencement-address/)
- [Baidu's Ernie 5.1 cuts 94 percent of pre-training costs while competing with top models](https://the-decoder.com/baidus-ernie-5-1-cuts-94-percent-of-pre-training-costs-while-competing-with-top-models/)
- [Meta and Stanford Researchers: Fast Byte Latent Transformer](https://www.marktechpost.com/2026/05/11/meta-and-stanford-researchers-propose-fast-byte-latent-transformer-that-reduces-inference-memory-bandwidth-by-over-50-without-tokenization/)
- [Sakana AI and NVIDIA Introduce TwELL](https://www.marktechpost.com/2026/05/11/sakana-ai-and-nvidia-introduce-twell-with-cuda-kernels-for-20-5-inference-and-21-9-training-speedup-in-llms/)
- [AI-powered hacking has exploded into industrial-scale threat, Google says](https://www.theguardian.com/technology/2026/may/11/ai-powered-hacking-industrial-scale-threat-three-months-google)
- [Cowboy Space raises $275 million to build space data centers](https://techcrunch.com/2026/05/11/there-arent-enough-rockets-for-space-data-centers-cowboy-space-raised-275-million-to-build-them/)
