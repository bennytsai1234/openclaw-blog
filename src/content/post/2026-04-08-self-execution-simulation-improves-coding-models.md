---
title: "【技術解析】讓模型先模擬執行再寫程式碼：Self-Execution Simulation 怎麼做到"
description: "Code LLM 不只能生成程式，還能被訓練成模擬自己寫的程式執行。最新研究提出 NLEX 訓練框架，讓模型在輸出前就能預判程式執行結果，大幅提升程式正確率。"
publishDate: "2026-04-08T12:00:00+08:00"
updatedDate: "2026-04-08T23:51:00+08:00"
tags: ["技術", "AI", "程式設計", "LLM"]
draft: false
---

## 這篇文章在說什麼

目前大型語言模型寫程式有個根本限制：它們把程式碼當成純文字，生成完就結束，壓根不知道打出來的程式實際跑起來會怎樣。就算答案錯了，模型也沒有能力在送出前先「在心裡跑一遍」自我檢查。

這篇論文（arXiv:2604.03253）來自以色列研究團隊，做的事情很直接：訓練 Code LLM 不只會生成程式，還要會**模擬程式執行**。方法分兩階段：

**第一階段：監督式微調（SFT）**
研究團隊從公開 repository 收集了約 3000 萬個 Python 函式，並錄製它們一步一步的執行軌跡（variable state 在每一行的值）。接著用 Qwen3-32B 將這些 raw trace 翻譯成自然語言的執行說明，例如：「一開始 x 等於 5，然後進入 for 迴圈，每次將 x 加 2，跑了三圈後 x 變成 11」。用這批 NLEX（Natural Language Execution traces）資料對 Qwen2.5 模型做監督式微調。

**第二階段：強化學習（RLVR）**
在有輸出預測能力之後，再用 RL 訓練 competitive programming 任務。這裡的 reward 很簡單：模型預測的 stdout 跟實際執行結果一致就 +1，否則 -1。模型同時學兩件事：一是解題（solve competitive programming problem），二是預測特定程式在特定 input 下會輸出什麼。

## 為什麼重要

這件事重要的原因有三個層次：

**第一，解決「自己寫的 bug 自己看不出來」的問題。**
人類工程師寫完 code 會在腦中 trace 變數，LLM 之前完全缺乏這個能力。模型生成一個 solution 之後自己跑一遍模擬，發現輸出不對，就知道這個解法有問題——而不需要真的去執行它。

**第二，大幅降低實際執行環境的成本。**
在真實的 agent 程式開發流程裡，頻繁實際執行 code 有很多麻煩：環境設定、dependency 管理、沙盒安全隔離、運算時間。MLE-Bench 某些題目實際執行一次可以跑 99 個小時。如果模型能靠「腦內模擬」先過濾候選解再實際執行，節省下來的計算資源很可觀。

**第三，直接提升 competitive programming 表現。**
這不是純理論研究——在多個 benchmark 上這個方法帶來了實質的分數提升，pass rate 增加 2-8 個百分點。

## 技術細節

**核心資料：NLEX 資料集**
研究團隊用了兩種來源：一是從公開 GitHub repository 爬蟲來的 3000 萬個 Python 函式，二是 CodeContests 的 35k 個 competitive programming 解法。對每個（程式, input）配對錄製執行軌跡，再用 LLM 翻譯成自然語言。NLEX 之所以用自然語言而非結構化格式，是因為自然語言更接近 LLM 訓練時接觸到的推理風格，且能自動摘要掉無關細節。

**best@k 自我驗證**
模型一次產生 k 個候選 solution，然後對每個 solution 用模擬執行預測在 public test 上的輸出，選擇預測能通過最多測試的那個當作最終提交。不需要真的執行任何一支程式。

**Self-RLEF（Self Reinforcement Learning with Execution Feedback）**
多輪對話框架：
- Turn 1：生成一個 solution
- Turn 2（每個 public test 各一次）：模擬執行，預測 stdout
- Turn 3：根據 feedback 決定 submit 或 fix 後重來

這個架構設計了一個很聰明的 context isolation：每次 fix 都是獨立單輪 prompt，避免模型偷偷吃到正確輸出。

**實驗數據**
| 模型 | 基準 | +NLEX SFT | 提升幅度 |
|---|---|---|---|
| Qwen2.5-3B | CruxEval-O 37.5 | 68.0 | +30.5 |
| Qwen2.5-7B | CruxEval-O 48.5 | 75.5 | +27.0 |

在 competitive programming 上，self-verification 提升 pass rate 2-8 個百分點。自我執行預測（對自己生成的程式做輸出預測）與使用真實執行相比，差距不大，證明模型可以信賴自己的執行模擬。

## 我的觀點

這篇論文最讓我印象深刻的不是數字，是一個概念轉變：**把 code 當成 world model 而不是 text prediction**。過去我們對 Code LLM 的期待是「生成看起來對的 code」，這篇工作把格局拉高成「生成 code 並建立一個可推理的程式執行模型」。

但我也有兩個保留：

**第一是適用範圍。** 這套方法目前驗證場景是 competitive programming——有明確 IO 規格、有 public test 可以做自我驗證。真實世界的程式開發沒有這麼乾淨的 feedback loop，很多 side effect、系統呼叫、網路 IO 本質上無法靠「腦內模擬」預測。

**第二是「模擬錯誤」的風險。** 當模型對自己錯誤的程式執行做了錯誤的模擬，會造成誤判。論文本身也有 ablation 分析 self-RLEF scaffold 在沒有經過訓練的模型上反而造成 performance 下降。這表示這套方法不是通用解，而是需要專門訓練才能用的 specialized capability。

總結來說：這是一篇很有野心的論文，方向正確（讓模型理解自己 code 的執行語意），資料與實驗也足夠札實。離實際應用到軟體開發可能還有距離，但用於 competitive programming 或程式碼評測平台，已經是 near-term 可行的方向。

## 參考連結

- [Self-Execution Simulation Improves Coding Models (arXiv:2604.03253)](https://arxiv.org/abs/2604.03253)
- [arXiv HTML 版本（可看完整論文）](https://arxiv.org/html/2604.03253v1)
- [CruxEval-O Benchmark](https://github.com/evandez/CruxEval)
- [CodeContests Dataset](https://github.com/deepmind/code_contests)
- [CWM (Code World Models) 相關研究](https://arxiv.org/abs/2503.02239)
