---
title: "【技術解析】為什麼推理模型的帳單會暴增：從訓練時間算力到推論時間算力的轉向"
description: "Inference scaling 將智慧從訓練階段移到生成階段，代價是新的成本與延遲結構。本文從一篇技術文章的脈絡出發，解析背後的算力邏輯。"
publishDate: "2026-05-04T10:00:00+08:00"
updatedDate: "2026-05-04T11:53:00+08:00"
tags: ["OpenAI", "GPT-5.5", "inference scaling", "reasoning models", "test-time compute"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-04-inference-scaling-reasoning-models.png"
  alt: "為什麼推理模型的帳單會暴增：從訓練時間算力到推論時間算力的轉向"
---

## 舊時代的算力方程式出了什麼問題

過去幾年，讓模型變強的方式很直觀：砸 GPU、擴參數、訓練更久。模型上線之後，工程團隊要操心的事相對固定——只要 inference cost 和延遲在可接受範圍內，靜態智慧帶來的服務品質就是穩定的。這套邏輯運作了很多年，直到 reasoning model 出現。

現在旗艦模型如 GPT-5.5 和 o1 系列，選擇在生成的當下投入額外算力，透過內部的「思考 token」反覆檢查邏輯，直到找到自認為最好的答案。表面上，這是效能的進步；實際上，這把整個基礎設施決策的複雜度往上拉了一個量級。因為「什麼時候該用多少算力」，不再是一個部署前就能靜態決定的事，而是要在每一次請求的當下動態估算。

## 從靜態智慧到動態算力配置

訓練時間算力 scaling 的邏輯很純粹：上线前燒錢，上线後穩定收費。基礎設施團隊只要算清楚一張 GPU 的單位成本、一次請求的平均 tokens 量，就能對帳單有明確預期。

推論時間算力 scaling（又稱 inference scaling 或 test-time compute）把这套邏輯打掉了。它把資源配置的時機從「部署前」移到「生成中」——同一個模型，面對簡單的分類問題和復雜的架構規劃，會自動決定投入多少算力。模型在處理的時候，使用 chain-of-thought 的方式在內部拆解問題：

- **Decomposition**：把多步驟問題拆成中間邏輯
- **Self-Correction**：在思考階段識別內部錯誤並迭代
- **Strategic Selection**：生成多個內部答案，評分後選擇最準確的輸出

這套機制讓模型對每個 prompt 有了「自适应算力消耗」的能力。基礎的摘要任務便宜快速，因為模型識別到不需要復雜邏輯；但面對分散式系統架構審查這類高難度 prompt，模型會暫停並生成數千個隱藏 token 來驗證推理。

然而，這裡有一個關鍵陷阱：這種額外的「思考」並不是準確度的保證按钮，也不是安全層。Apple 機器學習研究團隊發表的論文 *The Illusion of Thinking* 用可控的謎題環境系統性地測試了大型推理模型（LRM）的極限，發現了一些違背直覺的事實：

在**低復雜度任務**（例如「9900 + 1」）上，標準 LLM 反而比 reasoning model 有更高的準確率，而且完全不需要額外代價。這些任务根本不需要那麼多思考——但 reasoning model 會固執地燃燒數千個 tokens 來「確認」一個根本不需要確認的答案。

在**中等復雜度任務**上，額外思考確實帶來優勢。但這個優勢區間比預想的窄。

到了**高復雜度任務**，兩種模型同步崩潰——推理模型在面對超出臨界的問題時，思考量反而開始下降，邏輯路徑趨於混亂，最後給出錯誤答案時姿態顯得非常有說服力。論文作者指出，這證明了 extra thinking tokens 無法彌補基礎訓練資料的缺陷。

這個發現對實際部署決策有直接影響：如果你的系統把 reasoning mode 應用在錯誤的任務複雜度層級，帳單會爆炸，但輸出品質不會跟著提升。

## 代價不只來自 token 計數

想像一個團隊要在生產環境啟用 reasoning mode。他們聽到 o1 在數學和程式碼任務上表現驚人，於是全系統默認開啟。帳單寄來時才發現問題。

**Per-request 成本攀升**：Token 消耗不再線性。GPT-5.5 這類模型使用 interleaved thinking，在 tool calls 之前和之間都會生成推理 token。這種基於搜索的推理方式，讓算力消耗隨任務複雜度指数級成長。

**容量與並發下降**：標準模型一次請求大約占用 GPU 記憶體一秒，而 reasoning model 可能占用三十秒。這個更長的占用時間直接減少了硬體能同時服務的用戶數量。要麼擴容，要麼限制並發。

**延遲方差擴大**：平均延遲或許能維持，但 p95（最慢 5% 請求）往往會明顯變差。在延遲敏感的使用者介面場景，這會觸發超時，應用感覺起來就像壞掉了——即使輸出品質其實更好。

蘋果論文描述的這個「危險效率缺口」，在生產環境裡會造成連鎖反應：系統超時 → 使用者重試 → API 連接耗盡 → 系統穩定性崩潰。而且 reasoning model 有時會對一個格式化任務生成數千個隱藏 token，帳單突然飆高，工程團隊卻不知道問題出在哪。

## 成本-品質-延遲三角：新時代的基礎架構框架

要在這個新現實下做出靠譜的基礎設施決策，團隊需要用「成本-品質-延遲三角」來對齊不同持份者：

**成本**不只包含可見的輸出 tokens，還包括每次請求占用的 GPU 時間。由於 reasoning model 在記憶體中占用時間更長，整體並發量下降，硬體擴容需求上升。

**品質**的測量維度包含：任務成功率、幻覺帶來的缺陷率的事實查核，以及用 model judge 給邏輯或語氣打分數的 rubric scores。

**延遲**的重點指標是 p50 和 p95。p50 顯示典型體驗，p95 監控最慢的 5% 請求。在這裡，超時帶來的傷害不只是使用者經驗下降——它會觸發重試迴路，讓帳單進一步膨脹。

一個具體場景：假設團隊構建一個編碼助理，最初所有流量都路由到高算力 reasoning model。後來發現 70% 的請求是格式化程式碼、檢查語法、簡單補全這類簡單任務——這些任務在更便宜更快的模型上表現一模一樣。實施路由策略後，單日成本從 3,000 美元降到 970 美元，年度節省超過 74 萬美元。

這個數字遊戲的核心不是「用更差的模型」，而是「用正確的算力預算做正確的任務」。 Routine 的提取、格式化、輕度改寫，應該路由到更快、更可預測的模型；數學、多步驟規劃、複雜邏輯權衡，才值得使用推理 token。

## 任務分類學：什麼時候值得付費思考

根據這個邏輯，任務可以分成三類：

**Use（果斷用）**：數學、多步驟規劃、涉及高風險邏輯的決策。錯誤代價極高，邏輯必須驗證。

**Maybe（個案判斷）**：代碼架構、高風險合成。結構準確性超過延遲需求。

**Avoid（果斷避）**：提取、分類、格式化、輕度改寫。高容量、低複雜度，速度是優先項。

判斷的核心信號是：**錯誤代價 vs. 延遲代價**。如果邏輯錯誤導致的損失高於額外算力成本，就該付費思考。同時還要評估 p95 增加時你的系統能否承受——如果下游服務無法處理 30 秒延遲，無論輸出品質多高，產品體驗都會受損。

對於實際運營，Apple 論文和 OpenAI 文件都指向同一個結論：要對 reasoning effort 進行控制。OpenAI 的 `reasoning.effort` 參數提供從 `none` 到 `xhigh` 的控制維度，底層邏輯是：讓模型自己判斷任務複雜度，簡單任務用少量 tokens，複雜任務用更深的推理。但蘋果的研究表明，這種「自適應」並不總是靠譜——模型有時會對簡單任務過度思考，對超複雜任務思考不足。

## 我對這件事的判斷

推論時間算力 scaling 是過去三年 AI 基礎設施領域最重要的範式轉變之一，它的影響我認為被低估了。

大多數團隊現在才開始認真面對這個問題：reasoning model 不是效能提升開關，而是一套需要主動管理的算力資源。用得好，它能讓高風險任務的錯誤率明顯下降；用得隨便，它會讓帳單在無聲無息中暴增三倍，同時你的使用者體驗 p95 變得更差。

真正拉開差距的團隊，會把 reasoning token 視為昂貴的計價資源，精確地為每個任務節點配置算力預算，並用實際資料持續優化路由策略。他們看的不再是「每百萬 tokens 多少錢」，而是「每完成一個任務需要多少成本」——這個維度的轉換，會改變整個產品經濟學。

同時，蘋果的這篇論文也讓我對「越貴的模型越聰明」這件事保持警覺。LRM 在簡單任務上的過度思考、在超複雜任務上的思考不足，說明推理能力不是一條簡單的上升曲線。在真正困難的問題上，模型仍然會崩潰——只不過這次它會用很有信心的方式崩潰，讓你很難察覺。

**結論是：推論時間算力 scaling 不是銀彈，但它是新時代的必備工具。學會用它而不是被它用，是未來兩年基礎設施團隊的核心功課。**

## 參考連結

- [Inference Scaling (Test-Time Compute): Why Reasoning Models Raise Your Compute Bill](https://towardsdatascience.com/inference-scaling-test-time-compute-why-reasoning-models-raise-your-compute-bill/) — Mostafa Ibrahim, Towards Data Science
- [OpenAI Reasoning Models Documentation](https://developers.openai.com/api/docs/guides/reasoning) — OpenAI API Docs
- [The Illusion of Thinking: Understanding the Strengths and Limitations of Reasoning Models via the Lens of Problem Complexity](https://machinelearning.apple.com/research/illusion-of-thinking) — Apple ML Research
- [Language Models Perform Reasoning via Chain of Thought](https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/) — Google Research
