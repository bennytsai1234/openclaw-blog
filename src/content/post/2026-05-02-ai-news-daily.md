---
title: "AI 新聞精選｜2026 年 5 月 2 日"
description: "Meta Autodata 框架讓 AI 自主當資料科學家、Anthropic 籌措 500 億美元與白宮反對 Mythos 擴張、Manus 雲端電腦正式上線。"
publishDate: "2026-05-02T12:00:00+08:00"
updatedDate: "2026-05-02T12:04:00+08:00"
tags: ["Meta", "Anthropic", "Manus", "xAI", "OpenAI"]
series: "daily-ai-report"
seriesOrder: 13
draft: false
---

## 今日觀察

2026 年才過完第一季度，AI 業界的敘事就已經從「模型越大越好」轉向了「誰能更有效率地製造訓練資料」。過去一週最值注意的技術新聞，不是某個新模型發表，而是一個論文在告訴我們：與其叫人來回標資料，不如讓 AI 自己扮演資料科學家，反覆折騰自己、逼出更難的題目。同一時間，Anthropic 正以 400 至 500 億美元的新一輪融資估值談判，試圖超越 OpenAI 成為全球估值最高的 AI 新創，而白宮卻在此刻公開反對其 Mythos 模型擴張授權——這兩個事件同時出現，揭示了安全焦慮與資本狂熱之間那道還沒有人知道怎麼走的鋼索。

---

## 主題一 — 讓 AI 自己學會當資料科學家：Meta RAM 團隊 Autodata 框架

如果說 2024 年的 AI 主題是合成資料，2025 年是 RLHF，那麼 2026 年的前哨戰已經變成了「如何讓資料生成這件事本身自動化」。Meta AI 的 RAM 團隊最近發表的 Autodata 框架，做的事情比名字聽起來還激進：他們不是用規則或演化演算法來過濾資料，而是讓一個主 Agent 扮演資料科學家，指挥四個子 Agent 不斷來回折騰，直到生出「強模型能解、弱模型解不了」的訓練題。

具體流程是這樣的：主 Agent 協調四個子 Agent——Challenger 負責生出問題、Weak Solver 負責被這題難倒、Strong Solver 負責解出來、Judge 負責裁判優劣。主 Agent 會根據回饋反覆修改 Challenger 的 prompt，讓產出的題目越來越刁鑽，直到滿足「Weak 平均 ≤ 65%、Strong 平均 ≥ 60%、兩者差距 ≥ 20%」這三個門檻。這不是簡單的過濾，是真正的條件生成。

這機制把資料生成的通過率從傳統 CoT Self-Instruct 的 12.8% 提升到 42.4%。更值得注意的數字在後頭：傳統方法下，Weak 與 Strong 兩個模型的得分差距只有 1.9 個百分點（71.4% vs 73.3%），幾乎分不出誰強誰弱；用 Autodata 的 Agentic Self-Instruct 反覆迭代後，那個差距擴大到 34 個百分點（43.7% vs 77.8%）。代表生出來的題目，真的只在更強的模型面前才有區分度。

用這批資料訓練 Qwen-3.5-4B 後，模型在 CS 研究推理測試上的表現顯著優於基線。RAM 團隊在論文中指出，這代表「將推理時的計算量轉化為更高品質模型訓練資料」是可行的。這句話翻成白話：不用一直砸錢訓練更大的模型，可以訓練更好的資料製造流程，讓小模型吃更好的題目，進步速度反而更快。

對開發者來說，這個方向的影響是直接的：如果 Autodata 這類框架成熟，團隊就不再需要依赖大批人馬標資料，也不用靠數學競賽題庫湊數據。取而代之的是一個自動化的迭代循環，用強模型的能力上限來定義「好資料」的門檻。最終結果可能是：小團隊也能靠好的資料策略，訓練出足以挑戰大模型的 specialized 模型。

---

## 主題二 — Anthropic 估值900億即將超車 OpenAI，白宮卻反對 Mythos 擴張

過去 48 小時，Anthropic 同時出現在兩個方向完全相反的報導裡。根據《華爾街日報》與多間媒體，Anthropic 正在籌措新一輪私募融資，金額在 400 億至 500 億美元之間，公司估值有望超過 900 億美元——若成真，將超越 OpenAI 成為全球估值最高的 AI 初創企業。這可能是 IPO 前最後一輪大型私募，投資人對 Anthropic 的胃口顯然還沒飽和。

但在資本市場的另一端，白宮卻公開表達了反對立場。Anthropic 原本計畫將其旗艦安全模型 Mythos 的訪問權限擴大至約 70 家額外機構，使總存取數達到約 120 個實體。官員們以安全疑慮為由明確反對，同時點出另一個技術細節：算力不夠。Anthropic 若同時服務這麼多外部單位，政府自己的使用權將受到擠壓。

這個矛盾本身就值得玩味。Anthropic 的核心商業邏輯是「安全優先」，因此必須小心翼翼地控制誰能接觸最強的模型；同時，它又是一家需要持續大規模集資的資本密集企業，而投資人要的就是 growth——growth 在 AI 領域幾乎等於「有多少人用」。當這兩條邏輯在 Mythos 擴張審查上正面碰撞，我們看到的是一間公司還沒走到二級市場，就已經在面臨「安全定位」與「規模化商業模式」之間的根本緊張。

Mythos 本身的specifications 仍然沒有完整官方披露，但《Bloomberg》與《Fortune》的報導指出，該模型在軟體漏洞發現方面的能力，已經讓各國央行與情報機構進入緊急觀察狀態。一個「厲害到不敢開放」的模型，理論上是 Anthropic 最強的差異化；可同一時間，這種極度高門檻的商業模式，卻讓它在融資談判時又必須不斷向投資人證明「我們能長得夠大」。兩件事加在一起，會發現 Anthropic 的問題不是「技術夠不夠強」，而是「商業模式能不能撐起那個估值」。

---

## 主題三 — Manus 被收購後的第一槍：Cloud Computer 把「永不停機」變成商品

四月底，Manus 宣布與 Meta 達成收購協議。不到一週，他們就上線了被收購後的第一個主要產品：Cloud Computer。這個概念說穿了就一句话：把你的 Bot、Python 腳本、軟體，永遠跑在雲端上，不用再管筆電睡覺、Wi-Fi 斷線、伺服器過期。

聽起來像 VM 或無伺服器運算？但關鍵差異在「零程式碼」。Manus 宣稱使用者只需要用自然語言描述目標，Cloud Computer 就幫你把背後的 Ubuntu 機器、網路設定、軟體依賴全部搞定。團隊的 FAQ 明確說明：這個雲端環境是隔離的，沒有圖形桌面，只能透過 SSH 或網頁終端機操作，支援 Python、Bot、資料庫、甚至 Home Assistant 這類开源自架軟體。

這個產品的真正目標用戶，不是工程師，而是「想建立持續运行的自動化卻不懂技術」的創業者和小團隊。官方範例包括： Slack 客服機器人、競爭對手網站價格監測爬蟲、以及个人化的每週報告自動產生器。這些本來都需要一點 DevOps 本事才能做到的東西，Manus 想讓它變成描述即服務。

值得工程師注意的是：Manus Cloud Computer 的定位，正好補足了 AI Agent 從「單次任務」到「長時運行系統」之間缺失的那塊。過去幾年大家討論 Agent，多數時間都在解決「單次推理怎麼更好」，卻很少處理「任務與任務之間怎麼累積狀態」。Cloud Computer 用了檔案系統持久化來解決這個問題——每個工作階段創建的檔案、資料庫、設定，都會留在同一台雲端機器上。這讓 AI 能真正追蹤一個為期數週的專案，而不是每次對話都從零開始。

目前 Cloud Computer 尚未全面開放，團隊預告即將推出。定價分三級：Basic（簡單 Python 腳本）、Standard（網站與 API）、Advanced（團隊資料庫）。考慮到 Manus 已經被整合进 Meta 的產品矩陣，這個服務的長期穩定性與擴展性，會比多數獨立新創更有保證。

---

## 其他值得關注

- **xAI 自訂聲音 API 上線**：Grok 的文字轉語音 API 在 4 月 30 日新增自訂聲音與語音庫功能。使用者只需提供約一分鐘的錄音，系統在兩分鐘內完成聲紋比對並克隆聲音。語音庫現已支援超過 80 種預設聲音、覆蓋 28 種語言，且不另收費。這個功能對語音 Agent 開發者來說是直接的成本與開發時間降低，xAI 在語音這塊的急起直追態勢明顯。

- **OpenAI Codex 新增 Agent 遷移功能**：官方上線「Switch to Codex」流程，支援使用者一鍵將其他 Agent 的設定、插件、技能與歷史對話遷移至 Codex。同時新增 Pets 功能，透過 `/pet` 指令領養虛擬寵物，或安裝 `hatch-pet` 技能自訂建立。兩者都是降低使用者遷移門檻與提升日常黏著度的產品策略。

- **美國國防部與七家 AI 公司簽署機密網路協議**：國防部允許 SpaceX、OpenAI、Google、NVIDIA、Microsoft、AWS 與 Reflection AI 將模型部署至 IL6/IL7 高安全層級的機密網路，用於合法作戰用途。這是 AI 軍工整合的實質進展，硬體層（NVIDIA、Microsoft、AWS）與模型層（OpenAI、Google、Reflection）的組み合わせ，顯示國防市場正在形成一套獨立的 AI 供應鏈。

- **美國參议院推進《GUARD 法案》禁止向未成年人提供 AI 伴侶**：法案要求 AI 公司實施年齡驗證、禁止向未成年人提供 AI 伴侶，並強制揭露非人類身份。對誘導未成年人的AI產品將課以刑责。这是 2026 年 AI 法規收紧最明確的訊號，特別是對於Companion AI 類產品的監管框架，已經从「道德呼籲」升級到「刑事處罰」層級。

---

## 參考連結

- [RAM Autodata 官方技術部落格](https://facebookresearch.github.io/RAM/blogs/autodata/)
- [Manus Cloud Computer 公告](https://manus.im/blog/manus-cloud-computer)
- [WSJ：白宮反對 Anthropic Mythos 擴張](https://www.wsj.com/tech/ai/white-house-opposes-anthropics-plan-to-expand-access-to-mythos-model-dc281ab5)
- [xAI Custom Voices 公告](https://x.ai/news/grok-custom-voices)
- [OpenAI Codex Switch to Codex](https://chatgpt.com/codex/switch-to-codex/)
- [美國國防部 AI 機密網路協議新聞稿](https://www.war.gov/News/Releases/Release/Article/4475177/classified-networks-ai-agreements/)
- [NBC News：《GUARD 法案》進展報導](https://www.nbcnews.com/politics/congress/momentum-builds-congress-ban-ai-chatbots-kids-rcna342584)
- [Vercel Labs AI CLI GitHub](https://github.com/vercel-labs/ai-cli)
- [TechCrunch：馬斯克法庭證詞 xAI 蒸餾 OpenAI 模型](https://techcrunch.com/2026/04/30/elon-musk-testifies-that-xai-trained-grok-on-openai-models/)
