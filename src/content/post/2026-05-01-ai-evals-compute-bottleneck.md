---
title: "【技術解析】當評測成為瓶頸：AI Evals 怎麼把算力成本吃掉一半"
description: "從靜態基準測試到 Agent 評測，一次 $40,000 的實驗告訴我們：評測成本正在追上訓練成本，而且沒有簡單的壓縮方法。"
publishDate: "2026-05-01T15:00:00+08:00"
updatedDate: "2026-05-01T15:00:00+08:00"
tags: ["Hugging Face", "HAL", "Agent Benchmark", "LLM Evaluation", "算力成本"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-01-ai-evals-compute-bottleneck.png"
  alt: "AI 評測成本暴增的示意圖"
---

四月最後一週，Hugging Face 實驗室成員 EvalEval Coalition 在官方 blog 上貼出一篇有點嚇人的盤點：他們跑 Holistic Agent Leaderboard（HAL），對 9 個模型、9 個基準測試、合計 21,730 次 agent rollout，最後收到的帳單是 **$40,000 美元**。這還不是最終數字——到四月中，leaderboard 累積到 26,597 次 rollout，成本還在往上爬。

這不是少數大廠才會碰到的問題。當越來越多開發者開始讓 LLM 做多步推理、讓 agent 實際上網操作、讓模型跑長程任務的時候，評測的代價正在變成專案取捨的名詞。

## 問題是從什麼時候開始不對勁的

要理解為什麼 agent 評測會貴成這樣，得先回頭看靜態基準測試曾經有過的一個小奇蹟。

2022 年 Stanford CRFM 放出 HELM，做了 30 個模型、42 種情境的全盤測試。論文裡自己算的帳：OpenAI code-cushman-001 收費 $85，AI21 J1-Jumbo 來到 $10,926；GPU 小時部分，OPT-175B 燒掉 4,200 小時。整體算出來大約 $100,000。

但 Perlitz 等人後來的分析發現了一件諷刺的事：這整筆預算裡，大部分計算只是在確認一件早就幾乎確定了的事——模型之間的排序，在頭 100 倍到 200 倍的資料刪減後幾乎不改變。tinyBenchmarks 把 MMLU 從 14,000 題壓到 100 題，誤差不過 2%。Open LLM Leaderboard 直接從 29,000 筆降到 180 筆。

靜態基準測試所以能這樣壓，是因為模型的能力差異通常集中在一小部分題目上。刪掉那些沒有鑑別力的題目，排序基本不受影響。100 倍壓縮、200 倍壓縮，在那個階段是可以做到的。

Agent 的評測打破了这个假設。

## 什麼把評測成本拉到四個數量級

Agent 評測的核心差異在於：出來的成品不是一個答案，而是一條**軌跡（trajectory）**。你讓一個 agent 去訂機票，它可能會在十個頁面之間跳來跳去，中間經歷失敗、重試、錯誤的信用卡輸入，最後才找到正確的完成方式。單一一個 task 的長度，是靜態 benchmark 裡任何一道題目的十倍甚至百倍。

而且在 agent 的世界裡，成本不是「模型」一個變數決定的。HAL 論文裡有一句話後來被到處引用：**每次評測測的不是模型本身，而是模型 × scaffold × token-budget 這個組合**。而這三個變數湊在一起，能把費用拉出四個數量級的差距。

同一個 benchmark，Claude Sonnet 4 配 Browser-Use 吃掉 $1,577，達到 40% 準確率；GPT-5 Medium 配 SeeAct 只花 $171，跑到 42%。9 倍的價格差，2% 的準確率差。在 GAIA 基準上，一個 HAL Generalist 配 o3 Medium 燒 $2,828 拿到 28.5%，另一個 agent 壓到 $1,686 卻拿到 57.6%。

這些數字講的是同一件事：**高花費買不到好結果，而且 scaffold 的選擇幾乎是第一階的成本驅動因子。**

這個觀察讓 Exgentic 的一次實驗獲得了更多關注：他們花了 $22,000 跑一輪 agent 配置掃描，發現同樣任務下，最高與最低費用的配置相差 **33 倍**，而主要原因就是 scaffold 差異。

## 為什麼壓縮方法過不了這關

面對靜態基準測試有效的那些工具——IRT 縮減、Anchor Points、Flash-HELM 逐級解析——在 agent 領域全面失效。

Ndzomga 的 mid-difficulty filter 是目前少數有效的技巧：只挑歷史通過率落在 30%–70% 之間的題目，刪掉太簡單和太難的任務，能達到 2× 到 3.5× 的費用下降，同時維持排序的保真度。這在 HAL 的驗證下，在 scaffold 和時間偏移下依然成立。

但這只是 2× 到 3.5×。離靜態測試的 100× 到 200× 壓縮空間，差了整整兩個數量級。原因是：當每一個「任務」本身就是一個多步驟、高變異的 rollout，無論怎麼抽樣，你都必須保留足夠數量的完整軌跡才能評估真實能力。壓到 100 題的 MMLU 和壓到 100 個 agent 任務，是完全不同的代價結構。

## 有些評測根本就是訓練

有一類 benchmark 連 API 費用的框架都不適用了，因為它們的評測流程本身就是從頭訓練模型。

[The Well](https://arxiv.org/abs/2412.00568) 是當中一個特別極端的例子。16 個科學 ML 資料集、15 TB 的物理模擬資料（流體力學、超新星、等離子體……），完整 protocol 要求訓練四種架構、16 個資料集、五個學習率，每個組合跑 12 小時。一個完整的四基準 sweep 需要 **3,840 張 H100 小時**，約等於 $9,600 美元。光是一個新架構的單次評測，就吃掉 960 張 H100 小時。

這裡有個在深度學習時代很少見的逆轉：**評測的計算量是訓練的計算量的 100 倍**。過去的認知是訓工廠貴、推論便宜；現在在科學模擬這個領域，評測才是那個吃掉最多 GPU 時間的步驟。

PaperBench 的數字更詳細。20 篇 ICML 2024 Spotlight 或 Oral 論文要從頭重現，每篇論文對一個 rubric 樹，有 8,316 個葉節點評分標準。o1 IterativeAgent 每次 rollout 用 $400 API 費用，20 篇就是 $8,000。光 grading 用 o3-mini 法官模式，每篇 $66，20 篇變 $1,320。OpenAI 後來出了 PaperBench Code-Dev 版本，把執行環節拿掉，rollout 成本砍半，grading 降到每篇 $10，因為不需要真的跑程式碼。

RE-Bench 的框架也類似：七個研究工程環境，每個最多 8 小時、1 到 6 張 H100。專家人類基准跑了 71 次，因為人和 agent 用相同的牆鐘時間上限，這讓隱性預算又墊高了一截。

## 可靠性和重複性把代價再乘上去

上面大多數數字，只買到**單次測量**，而單次測量在統計上幾乎沒有什麼力度。

當你開始要求可靠性——同一個配置跑多次、看一致性——靜態基準測試、agent 基準測試、訓練 loop 基準測試全部都要再貴一輪。Yao 等人的 τ-bench 后来在 CLEAR 框架下复現時，發現 performance 可以從單次跑的 60% 掉到 8 次一致性檢驗的 25%。「60 分，但只有一次」的 agent，在需要穩定輸出的場景裡幾乎是無用的。

Kapoor 等人在「AI Agents That Matter」裡做了更直接的對比：簡單的 baseline agents 在 HumanEval 上，Pareto-dominate 那些所謂的 SOTA agents（Reflexion、LDB、LATS），代價差 50 倍。這個發現在後續的 Benchmark 設計討論裡被反覆引用，因為它直接戳破了一個心照不宣的假設：複雜的 agent 架構帶來更好的評測分數，但這個假設從未被嚴格檢驗過。

## 這件事現在沒有簡單的出路

把視角拉回來，問題的核心是這樣的：當模型的能力在往 agent 方向走——從回答問題到實際操作任務——評測的方法論也必須跟著演化，但演化出來的方法恰好是那些**無法大幅壓縮成本**的類型。

靜態 benchmark 的壓縮邏輯是「很多題目其實沒有鑑別力」，但當任務本身就是一個高變異的長軌跡時，刪掉哪一段都可能刪掉訊號。scaffold 選擇對成本的影響是第一階的，但多數開發者在構建 agent 時，幾乎不會先把評測成本考慮進設計決策。機構研究發現 33 倍的同名任務費用差，絕大多數不是模型差異，是 scaffold 差異——這個事實現在還沒有被充分轉譯成工程實踐。

從長期看，評測瓶頸會逼迫幾件事同時發生：更嚴格的 benchmark 設計用更少資源得到更多訊息；scaffold 層的標準化讓成本可預期；以及某種形式的「評測基礎設施共享」——類似 HAL 試圖做的，讓社群共同分擔那筆 $40,000 的帳單。但這些路徑目前都還在早期，沒有任何一個足以在短期內把成本曲線壓平。

對多數還在本地跑 eval 的團隊而言，現在比較務實的理解可能是：評測不是一次性的費用，是跟訓練、部署並列的第三條成本線，而且它不服從同樣的摩爾定律邏輯。

---

## 參考連結

- [AI evals are becoming the new compute bottleneck — Hugging Face Blog](https://huggingface.co/blog/evaleval/eval-costs-bottleneck)
- [Holistic Agent Leaderboard (HAL) — arXiv:2510.11977](https://arxiv.org/abs/2510.11977)
- [The Well — arXiv:2412.00568](https://arxiv.org/abs/2412.00568)
- [PaperBench — arXiv:2504.01848](https://arxiv.org/abs/2504.01848)
- [CLEAR Benchmark — arXiv:2511.14136](https://arxiv.org/abs/2511.14136)
- [AI Agents That Matter — arXiv:2407.01502](https://arxiv.org/abs/2407.01502)