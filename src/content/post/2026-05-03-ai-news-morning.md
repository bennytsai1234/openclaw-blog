---
title: "AI 晨間精選｜2026 年 5 月 3 日"
description: "馬斯克與 OpenAI 世紀審判開庭、五角大廈與八大科技巨頭簽約佈局軍事 AI、Meta 收購人形機器人新創瞄準物理 AGI"
publishDate: "2026-05-03T08:00:00+08:00"
updatedDate: "2026-05-03T00:15:00+08:00"
tags: ["OpenAI", "xAI", "Meta", "Anthropic", "Pentagon"]
series: "daily-ai-report"
seriesOrder: 73
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-03-ai-news-morning.png"
  alt: "AI 晨間精選｜2026 年 5 月 3 日"
---

## 今日觀察

上週五（5/1）在加州奧克蘭聯邦法院發生了一件也許會被未來 AI 歷史反覆提起的事：Elon Musk 親自站在证人席上，告訴陪審團他當年資助 OpenAI 的 3,800 萬美元，現在變成了一家估值 8,000 億的公司，而他自己說是被 Altman 和 Brockman 欺騙了。同一時間，美國國防部宣佈與 SpaceX、OpenAI、Google、NVIDIA、Microsoft、AWS、Oracle、Reflection 簽署合約，要在保密網路上部署 AI——Anthropic 不在名單上，已經對聯邦機構下達禁令並提起訴訟。

這兩件事看似分開，骨子裡是同一個故事：AI 產業正在進入一個「誰跟誰結盟、誰被誰排除」的版塊重組期。不是技術競爭，是權力地圖重新畫線。

---

## 主題一：馬斯克 v. Altman 審判第一週——世紀官司背後的 AI 路線之爭

週五一早，馬斯克穿著黑色西裝走進奧克蘭聯邦法院。這場官司的起點是他聲稱 OpenAI 創辦時是個非營利組織，現在卻變成營利公司，偏離了當初「為人類利益開發 AI」的使命。他要求法院強迫 OpenAI 拆解營利子公司，讓 Altman 與 Brockman 下台。

庭審第一天，馬斯克的證詞就接連抛出震撼彈。他承認 xAI（他自己的 AI 公司）其實有在蒸餾（distill）OpenAI 的模型來訓練自家模型。觀眾席傳出明顯的倒吸一口氣聲。他說自己當年是「fool」——笨蛋——才會資助他們成立公司，現在那些錢「創造了一間價值 8,000 億美元的公司」。他也警告 AI 可能消滅人類，說「最糟情況是終結者情境，AI 殺死我們所有人」。

但 OpenAI 的律師 William Savitt 也不是省油的燈。他直接拿出 email 記錄顯示，馬斯克 2017 年就挖走了 OpenAI 共同創辦人 Andrej Karpathy 去 Tesla 工作，email 內容寫道：「OpenAI 的人一定會想殺了我，但這件事必須做。」Savitt 的核心論點：馬斯克從頭到尾都不是真心想守護非營利使命，他現在只是在打壓市場競爭對手。法官 Yvonne Gonzalez Rogers 甚至直接打斷律師們的爭吵，說：「這不是一場審訊 AI 是否傷害了人類的審判。」

這週的證詞也確認了幾個重要細節：
- **xAI 目標估值 1.75 兆美元**，預計隨 SpaceX 一起上市，最快下個月（2026 年 6 月）
- **OpenAI 目標 IPO 估值接近 1 兆美元**，這場官司的結果可能直接影響上市時間表
- 馬斯克聲稱他在 2022 年底才知道微軟投資 100 億美元，當時傳訊息給 Altman 說「這是 bait and switch（騙局）」

對工程師來說，這場審判提供了難得的內部視角：OpenAI 當年的非營利架構從一開始就是脆弱的，隨著 GPU 需求膨脹到需要數十億美元，任何試圖堅守純非營利的 AI 實驗室都必須走向營利子公司。這不是誰的陰謀，是現實的資金壓力。

---

## 主題二：五角大廈簽下八大 AI 合約——Anthropic 被排除的真相

同一天（5/1），美國國防部公開宣佈與八間科技公司簽署協議，要在保密軍事網路上部署 AI 能力，打造「AI-first fighting force」。入選名單：SpaceX、OpenAI、Google、NVIDIA、Reflection、Microsoft、AWS、Oracle。

Anthropic 的名字不在上面。這不是意外——而是結果。

今年稍早，Anthropic CEO Dario Amodei 反對國防部合約中使用「all lawful use」條款，理由是現行法律存在漏洞，可能允許大規模監控（例如透過商業資料集）。國防部隨即將 Anthropic 列為「供應鏈風險」，川普政府下令聯邦機構停止使用其技術。Anthropic 已提起訴訟，聯邦法官暫時擋下了禁令，稱該標籤是「 Orwellian」（老大哥式）。

同一時間，Amodei 被揭露在內部備忘錄中稱 OpenAI 的國防合約是「80% safety theater」（八成是安全秀）。OpenAI 則自行畫了三條紅線：禁止國內大規模監控、禁止自主武器、禁止自動化高風險決策。但法律專家質疑，這些承諾在合約中沒有明確的除外條款約束，強度有限。

對開發者的直接意義：AI 公司的「安全承諾」現在有了軍事層級的測試案例。當合約涉及「all lawful use」，哪些承諾是真的，哪些是公關，未來在爭議中會更清楚。Claude 模型現在被禁止用於美國聯邦政府業務，這對想在政府相關場景使用 Claude 的企業來說是直接障礙。

---

## 主題三：Meta 收購 Assured Robot Intelligence——硬體 + AI 的下一個平台之戰

Meta 週四宣佈收購機器人 AI 新創 Assured Robot Intelligence（ARI），將其完整團隊併入 Meta Superintelligence Lab。ARI 共同創辦人 Xiaolong Wang 在 X 上發文說，ARI 一年前成立時的目標就是「physical AGI」——能在真實物理世界運作的通用人工智慧。他認為要達成這個目標，需要一個通用的物理代理（universal physical agent），而人形設計是最佳載體。系統要能從人類經驗中直接學習，而不是只能靠遠端操作（teleoperation）。

Meta 不只是想自己做硬體，還要把它變成一個開放平台——類似 Google 當年用 Android 做的事。他們計劃對外授權這套技術，而不是獨佔。Tesla（Optimus）、Google（DeepMind）、Amazon（Digit）也都在投入人形機器人，現在 Meta 加入，讓這場硬體競賽正式升溫。

對工程師來說，這筆交易透露的信號：AI 的下一個戰場不只在雲端和程式碼裡，還在「能移動、搬東西、操作物理世界的代理人」。強化學習（RL）和電腦視覺在機器人上的應用，會是 2026 下半年開始明顯增長的領域。這個收購也讓 Meta 正式從「軟體 AI 公司」跨到「軟硬整合」，和 Apple 的 Vision Pro 布局方向不同，但都是試圖定義下一代運算介面的動作。

---

## 其他值得關注

- **Replit 年營收 ARR 突破 10 億美元**：從 2024 年的 280 萬美元到 2026 年走向 10 億，Replit CEO Amjad Masad 在受訪時說，他的目標是「十億軟體創作者」，而且他強調 Replit 已經毛利率轉正，不像 Cursor 據報導是負 23% 毛利率。他對出售傳言的回應是：「我們想保持獨立。」值得觀察的是，在 Cursor 可能以 600 億美元被 SpaceX 收購的消息下，Replit 能否維持民辦道路。

- **ChatGPT 預設開啟廣告追蹤**：OpenAI 在 4 月 30 日更新隱私政策，免費 ChatGPT 用戶的 cookie ID 與 email 現在會與廣告合作夥伴共享，用於在 Instagram 等第三方平台推廣 OpenAI 產品。付費用戶預設不開啟。超過 90% 的 ChatGPT 用戶使用免費版本，這是 OpenAI 在營收壓力下的貨幣化動作。對隱私敏感的開發者可能需要主動進設定關閉。

- **NVIDIA 研究：投機解碼在 NeMo RL 實現 1.8 倍生成加速**：NVIDIA Research 新論文將 speculative decoding 整合進 NeMo RL，配合 vLLM 後端，在 8B 模型規模實現 lossless rollout 加速，預測 235B 規模可達 2.5 倍端對端加速。這個優化方向對於需要高 throughput 的 LLM 推理場景（尤其是 agentic coding 任務）有直接價值。

---

## 參考連結

- [Musk v. Altman week 1 - MIT Technology Review](https://www.technologyreview.com/2026/05/01/1136800/musk-v-altman-week-1-musk-says-he-was-duped-warns-ai-could-kill-us-all-and-admits-that-xai-distills-openais-models/)
- [Eight tech giants sign Pentagon deals - The Decoder](https://the-decoder.com/eight-tech-giants-sign-pentagon-deals-to-build-an-ai-first-fighting-force-across-classified-networks/)
- [Meta acquires ARI for humanoid robots - The Decoder](https://the-decoder.com/meta-acquires-assured-robot-intelligence-to-accelerate-humanoid-robot-push/)
- [Replit Amjad Masad interview - TechCrunch](https://techcrunch.com/2026/05/01/replits-amjad-masad-on-the-cursor-deal-fighting-apple-and-why-hed-rather-not-sell/)
- [ChatGPT ads tracking - Wired](https://www.wired.com/story/openai-enables-cookies-by-default-for-free-chatgpt-users/)
- [Anthropic lawsuit federal judge blocks ban - The Decoder](https://the-decoder.com/federal-judge-blocks-trumps-ban-on-anthropic-ai-models-calls-security-risk-label-orwellian/)
- [NVIDIA speculative decoding NeMo RL - MarkTechPost](https://www.marktechpost.com/2026/05/01/a-new-nvidia-research-shows-speculative-decoding-in-nemo-rl-achieves-1-8x-rollout-generation-speedup-at-8b-and-projects-2-5x-end-to-end-speedup-at-235b/)