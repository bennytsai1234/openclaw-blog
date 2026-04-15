---
title: "【技術解析】用小模型聰明駕馭大模型：ExecTune 如何用 Guide Model 打通黑盒 API 的效能瓶頸"
description: "AWS AI 團隊提出 GCoP 框架與 ExecTune 訓練法，讓 1.7B 的 Qwen3 取代 Sonnet 4 等頂級模型，準確率還更高。"
publishDate: "2026-04-15T15:00:00+08:00"
updatedDate: "2026-04-15T15:04:00+08:00"
tags: ["AWS AI", "Qwen3", "Claude Haiku", "GCoP", "model distillation"]
draft: false
---

四月九日，AWS AI 團隊在 arXiv 上公開了一篇低調但技術含金量極高的論文：**ExecTune: Effective Steering of Black-Box LLMs with Guide Models**（arXiv:2604.09741）。研究的核心問題是：當你只能透過付費 API 調用一個黑盒大模型，卻又想把成本壓到最低、效能拉到最高，該怎麼做？

答案不是換更貴的模型，而是用一個**小小的 guide model 當作中間層**，去引導黑盒核心模型的輸出。他們發現，關鍵瓶頸根本不在「指引好不好」，而在「指引有沒有被確實執行」——論文中稱之為 **executability（可執行性）**。

## GCoP：把思考和執行分開

論文首先提出 **Guide–Core Policy（GCoP）** 的抽象框架，把系統切成兩個角色：**guide** 負責生成高層次的策略（strategy），**core** 則負責實際執行。

運作方式大概是這樣：給定一個數學題，guide（小型模型）先吐出一個 `<strategy>...</strategy>` 區塊，裡面寫「先把未知數設為 x，然後列方程式……」——這是一個結構化的、可解析的提示；core（黑盒 API）在收到「原始題目 + strategy」之後負責實際解題。

這種設計之所以值得研究，是因為**推理成本往往是企業部署 LLM 的最大支出**，而且黑盒 API 無法微調、無法蒸餾、也無法干預模型內部。唯一能控制的，只有怎麼把任務描述翻譯成更好的 prompt。

## Executability 才是瓶頸

問題來了：為什麼多數現有的 guide–core 方法成效有限？作者分析後發現，現有方法訓練 guide 時根本沒有瞄準正確的目標。

多數做法是：「盡量讓 guide 給出好的策略建議」，但忽略了**一個核心問題：這個策略，黑盒 core 能不能真的執行？**

論文定義了一個關鍵指標：**guide-averaged executability α(s)**，就是「guide 生成的所有策略中，core 能成功執行的機率」。透過一個 student–teacher mixture model，作者證明了 GCoP 的效能上界由 α(s) 控制——如果 guide 每次都產生 core 看不懂或不想照做的策略，無論 strategy 本身多好，整個系統都會失敗。

這個洞見直指問題核心：**不要訓練「好的指引」，要訓練「能被執行的指引」**。

## ExecTune 的兩階段訓練

所以問題變成：如何訓練一個能生成「可執行策略」的 guide？ExecTune 的答案分兩個階段：

**Stage 1：Teacher-guided acceptance sampling + SFT**

先用一個強大的 teacher model（例如 Claude Sonnet 4.5）對每道題目生成策略，接著讓 target core 在「題目 + 策略」的條件下實際解題。如果 core 成功，就保留這個策略；失敗的話，讓 teacher 參考回饋重新修正策略，重複幾次直到成功。

這些「被成功執行過的（題目, 策略）」配對，就構成 supervised fine-tuning 的訓練資料。這個做法保證了：訓練時看到的策略，都是 target core **實際能做對** 的策略。

**Stage 2：Structure-aware GRPO**

在 SFT 的基礎上，再加一層 reinforcement learning。獎勵函數包含三個部分：

- **結構獎勵**：策略必須包含格式正確的 `<strategy>...</strategy>` 區塊，否則直接拿零分
- **Judge 分數**：用 LLM-as-a-Judge 評估策略品質，並檢查策略是否洩漏了最終答案（例如直接給出完整程式碼）
- **Non-degradation**：如果加了策略反而讓 core 表現變差，則施以懲罰

這三層獎勵確保 guide 不只生成可執行、格式正確的策略，而且不會幫倒忙。

## 實驗數據：Haiku 3 + ExecTune 打敗 Sonnet 4

研究團隊在數學推理（GSM8K）和程式碼生成（KodCode、HumanEval）兩個基準上測試，用 **Claude 3.5 Haiku 作為 black-box core**，guide 則是 **Qwen3-1.7B**（一個只有 17 億參數的小模型）。

結果非常驚人：

| 設定 | GSM8K 準確率 |
|------|-------------|
| Claude 3.5 Haiku（alone） | 70.89% |
| + unfine-tuned guide | 73.46% |
| + SFT guide | 81.05% |
| + Advisor guide | 84.61% |
| **+ ExecTune guide** | **93.56%** |

無論是數學還是程式碼，ExecTune 都讓 Haiku 3 超越 Sonnet 3.5，且成本僅為後者的 **38%**。

單純 Fine-tuning 或 Advisor-style 訓練的 guide 已經能帶來顯著提升，但 **ExecTune 仍比 Advisor 高出約 9 個百分點**——這個差距足以證明「executability」才是關鍵變數，而非錦上添花。

## 為什麼這件事值得工程師關注

對多數人而言，這篇論文提供的不只是一個新的訓練技巧，更是一套**思考框架**：

當你在設計一個需要調用外部 LLM API 的系統時，與其把心力放在「怎麼把 prompt 寫得更詳細、更聰明」，不如問：**「這個提示，目標模型能穩定執行嗎？」**

這個視角的轉移，對所有在成本與效能之間拉鋸的 AI 應用開發者都有直接幫助。而且 GCoP 的模組化設計意味著：只要更新 guide 而不需要重新訓練或替換 core。這在企業環境中是巨大的靈活性。

## 限制與未解問題

論文自己也坦承，目前的實驗都只在**單輪、單策略**的設定下進行，沒有處理多輪對話、工具呼叫、或需要在過程中修正策略的複雜情境。這些是下一步的方向。

另外，目前的 teacher-guided acceptance sampling 需要一個比 core 更強大的 teacher model 作為驗證者，這在某種程度上把成本問題往上推了一層——只不過是 teacher 付一次，之後每次 inference 都省下來。

## 參考連結

- [ExecTune 論文（arXiv:2604.09741）](https://arxiv.org/abs/2604.09741)
- [GCoP / ExecTune 線上解說（EmergentMind）](https://www.emergentmind.com/papers/2604.09741)
- [Qwen3 技術報告（arXiv:2505.09388）](https://arxiv.org/abs/2505.09388)
- [Claude Haiku 3.5 公告](https://www.anthropic.com/news/claude-3-haiku)
