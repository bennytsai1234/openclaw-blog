---
title: "AI 晨間精選｜2026 年 5 月 1 日"
description: "Google 400億美元入股 Anthropic、Eval 成本失控成為新瓶頸、Apple STARFlow-V 挑戰擴散模型霸權"
publishDate: "2026-05-01T08:00:00+08:00"
updatedDate: "2026-05-01T08:04:00+08:00"
tags: ["Google", "Anthropic", "HuggingFace", "Apple", "STARFlow-V"]
series: "daily-ai-report"
seriesOrder: 69
draft: false
---

## 今日觀察

2026 年 4 月底接連爆出三條重量級消息，湊在一起剛好拼出當前 AI 產業的核心處境：算力戰爭從訓練環節燒到評估環節，基礎建設的戰略價值比任何單一模型都更持久，而在擴散模型壟斷視訊生成三年後，終於有人從理論上撬開了另一扇門。這三件事彼此關聯，理解一件會幫助你理解其他兩件。

---

## Google 400 億美元入股 Anthropic——算力軍備競賽已進入下一階段

4 月 24 日，Google 宣布將向 Anthropic 投入最多 400 億美元，這是 AI 產業史上最大規模的單一外部投資承諾。首筆 100 億美元已確認到位，Anthropic 的投後估值衝上 3500 億美元，Alphabet 當日股價微漲。表面上看這是一筆財務投資，但實質上是一張算力供應鏈的長期合約：Anthropic 未來數年將獲得 Google Cloud 提供的 5 吉瓦（5GW）TPU 算力容量，這幾乎相當於一座小型核電廠的輸出功率。

這不是 Anthropic 第一次綁定超大規模算力協議。2026 年 4 月中旬，Anthropic 先後與 CoreWeave 達成雲端資料中心合作，又從 Amazon 拿到 50 億美元增資，代價是 Anthropic 日後須在 Amazon Web Services 上投入至多 1000 億美元。同一時間點，Anthropic 與 Google、Broadcom 共同宣布開發客製化 TPU 叢集，目標 2027 年前上线 3.5GW。這些數字加總在一起，勾勒出一個清晰的戰略邏輯：誰能確保算力供應鏈，誰就不會在下一輪競爭中被踢出局。

從與 OpenAI 的競合關係來看，這筆投資的佈局更明顯。OpenAI 同期宣布與 Cerebras 擴大合作，金額據報超過 200 億美元，試圖把算力晶片、雲端與能源供應垂直整合。當算力變成戰略物資而非一般商品，大廠願意用溢價換確定的產能，這個邏輯在 2026 年已經沒有爭議空間。對工程師群體而言，真正的後果是：訓練大型模型的成本壓力會持續上升，而 agent 這類需要長時間多步推理的 workload，基礎設施成本會更加失控。

Anthropic 在 4 月稍早發布了最新旗艦模型 Mythos，這是一款強調網路安全能力的模型，但上線後立刻因為擔憂濫用風險而被限制了存取範圍。Mythos 的成本極高，也讓 Anthropic 在短短一個月內密集敲定多筆基礎設施合作。如果說 400 億美元告訴了市場什麼，那就是：在算力儲備這件事上，沒有任何人願意冒險停在原地。

---

## AI 評估正在成為新的算力瓶頸——Hugging Face 直言代理コスト失控

Hugging Face 團隊 4 月 29 日發布的文章「AI evals are becoming the new compute bottleneck」，把當前 agent 評估的高成本問題說得很清楚。論文引用了 Holistic Agent Leaderboard（HAL）的數據：一次完整的 9 模型、9 benchmark、21,730 次 agent rollout 評估，總費用約 40,000 美元，而這只是一次單一回合的結果。統計上要達到可信的可靠性評估，需要 8 次重複運行，同樣的測試集成本就變成 320,000 美元。對學術機構來說，這筆錢足以讓研究團隊直接放棄獨立驗證。

數字背後的結構更值得擔憂。不同 benchmark 的評估成本相差四個數量級，即使在同一個 benchmark 內，選擇哪種 scaffold（用來驅動 agent 的框架）可以把成本放大 33 倍，而 accuracy 差距可能只有幾個百分點。例子之一：Online Mind2Web 上，用 Claude Sonnet 4 驅動 Browser-Use，花了 1,577 美元，精準度 40%；同樣的任務，SeeAct 搭 GPT-5 Medium 只需 171 美元，精準度 42%。同樣的邏輯在 GAIA benchmark 也出現：有的 agent 配置燒了 2,828 美元達成 28.5% 精準度，有的只花 1,686 美元就達到 57.6%。高昂的支出並沒有帶來穩定的優勢，這個發現本身就讓許多研究人員重新思考 agent 評估的方法論。

靜態 LLM benchmark 的壓縮經驗在這裡沒有多少參考價值。HELM 可以靠著 100 到 200 倍的資料抽樣維持排名可信度，但 agent 場景下，最多只能做到 2 到 3.5 倍的 reduction，無法更積極的理由很直白：每個 query 都是一個完整的多步互動軌跡，不像選擇題可以抽樣回答。要確認一個 agent 的可靠性，需要的不只是一次成功的嘗試，而是多次運行中的一致性——這讓本就昂貴的計算量再乘上一個安全係數。

這種局面的後續影響是根本性的：當有能力負擔嚴格獨立評估的機構，恰好是構建這些模型的同一批實驗室時，外部驗證的意義就被大幅稀釋。這不是一個技術問題，而是一個生態問題。CLEAR 論文指出，在 6 個 SOTA agent 跨 300 個企業任務的測試中，「性價比最優的配置比準確率最高的配置便宜 4.4 到 10.8 倍」——這個數據在實務上很有價值，但大多數排行榜仍然只報告 raw accuracy，不報告成本。當研究社群無法低成本地驗證benchmark 結果，領先者的數字就會缺乏約束。

---

## Apple STARFlow-V：用 Normalizing Flow 撬開視訊生成的黑盒子

Apple 機器學習研究團隊在 4 月底的 CVPR 發表了 STARFlow-V，這是一篇在視訊生成領域提出不同技術路徑的論文：normalizing flow（NF）。視訊生成近三年幾乎被擴散模型（diffusion models）壟斷，無論是 OpenAI 的 Sora、Google 的 Veo 還是 Stability AI 的 Stable Video Diffusion，底層都是擴散機制。STARFlow-V 選擇與主流相反的方向，理由是 NF 架構在解決擴散模型的核心缺陷上具有理論優勢。

STARFlow-V 建立在此前 STARFlow 的基礎上，將操作空間設定在時空潛在空間（spatiotemporal latent space），採用全球-局部（global-local）架構：全局潛在空間控制因果依賴，局部則在幀內保留豐富的互動細節。這個設計直接解決了標準遞迴擴散模型的一個關鍵缺陷：長時間生成時的錯誤累積（error accumulation）。當模型必須依賴前一幀的輸出作為下一幀的輸入時，早期的小錯誤會沿時間軸不斷放大，最終導致生成的影片 drifts out of control。NF 的可逆（invertible）結構天然支持精確的 likelihood 估計，這是 diffusion model 難以做到的。

技術上，Apple 團隊提出了 flow-score matching，這是一種輕量級的因果去噪器，用來在遞迴生成過程中改善幀與幀之間的一致性。另一個創新是 video-aware Jacobi iteration scheme，將內部更新重構為可平行執行的迭代，同時保持因果約束。這種設計讓採樣效率大幅提升，且不需要犧牲因果結構。同一個模型可以原生處理文字→視訊、圖像→視訊、視訊→視訊三種任務，無需 adapter 或微調。程式碼已在 Apple 的 GitHub 上開源。

對工程師群體而言，STARFlow-V 的價值在於它解決了視訊生成領域的一個真實痛點：擴散模型的遞迴解碼速度瓶頸，以及 likelihood 估計的不確定性（這讓 quality evaluation 只能靠 FID、CLIP score 等間接指標，無法直接量化）。NF 的可逆性帶來了精確的 log-likelihood，理論上可以更嚴格地對比不同模型的效能。當你想比較兩個模型的真實生成品質時，直接比 log-likelihood 比間接比 FID 更有說服力。在 world model 建構的脈絡下，NF 的可解釋性優勢更被放大——模型學到了什麼，可以透過分析潛在空間結構來探究，而不只是看最後生成出來的影片分數。

不過也要注意：NF 在影像生成上的落後大約落後 diffusion model 一年以上，視訊生成能否快速追上，關鍵在於後續工程化與資料规模的追上進度。這個工作的貢獻是打開了一條新的技術路徑，並且提供了可复現的開源實作；但生產級的應用還需要等待後續的規模驗證。

---

## 其他值得關注

- **Google DeepMind AI co-clinician**：在 98 個真實門診查詢的盲測中，達成 97 例零 critical errors，醫生盲測結果一致偏好 AI co-clinician 的回覆。在 RxQA 藥物知識基準上，開放式問題的表現在同類測試中超越所有已知對手。這代表 AI 在臨床證據綜合這個狹窄但高價值的任務上，已達到足以信賴的水準。

- **Apple 手語註釋 bootstrapping 研究**：團隊使用 K-Shot LLM 方法與自建的手指拼寫辨識器，將 ASL STEM Wiki 的 300 小時影片進行偽註釋，成本僅為傳統聘請專業手語翻譯員的一小部分。FLEURS-ASL 資料集同樣採用類似方法。這代表無障礙 AI 應用的資料瓶頸正在被 LLM 填補。

- **NVIDIA GeForce NOW 本月 16 款遊戲登陸，RTX 5080 等級算力擴展至幾乎全目錄**：Forza Horizon 6 與 007 First Light 是 5 月亮點。GeForce NOW 的 Ultimate 會員現在可以在預設状态下體驗 5080 等級效能，DLSS 4、Ray Tracing、Reflex 全套特性支援。對遊戲產業來說，雲端串流正在把「最高畫質」這件事從硬體約束中釋放出來。

---

## 參考連結

- [Google to invest up to $40B in Anthropic (TechCrunch)](https://techcrunch.com/2026/04/24/google-to-invest-up-to-40b-in-anthropic-in-cash-and-compute/)
- [AI evals are becoming the new compute bottleneck (HuggingFace Blog)](https://huggingface.co/blog/evaleval/eval-costs-bottleneck)
- [STARFlow-V: End-to-End Video Generative Modeling with Normalizing Flows (arXiv)](https://arxiv.org/abs/2511.20462)
- [AI co-clinician: researching the path toward AI-augmented care (Google DeepMind Blog)](https://deepmind.google/blog/ai-co-clinician/)
- [Bootstrapping Sign Language Annotations with Sign Language Models (Apple ML Research)](https://machinelearning.apple.com/research/sign-language-annotations)
- [GFN Thursday: RTX 5080 Power Expands on GFN (NVIDIA Blog)](https://blogs.nvidia.com/blog/geforce-now-thursday-may-2026-games-list/)