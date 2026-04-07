---
title: "【技術解析】用 10 bits 就能壓縮一個 Opus：LLM 文字壓縮的下一步"
description: "Harvard 與 Anthropic 研究者聯手，展示 LLM 不只能生成文字，還能成為史上最強的文字壓縮器——lossless 到 lossy，壓縮率比 GZIP 好 100 倍。"
publishDate: "2026-04-07"
updatedDate: "2026-04-07"
tags: ["AI", "壓縮", "機器學習", "LLM"]
draft: false
---

## 這篇文章在說什麼

你可能覺得「壓縮」是 ZIP、GZIP 那套東西，跟 AI 沒什麼關係。但這篇 2026 年 2 月釋出、作者來自 Harvard 與 Anthropic 的論文，要告訴你一件事：**LLM 本身就是一種壓縮器，而且它的潛力遠遠超乎預期。**

核心想法很直白：LLM 的本質是「預測下一個 token 的機率分佈」，而「壓縮」做的事情正是用最少的位元數表達一段資訊。兩者共享同一套資訊理論基礎——**熵（entropy）**。只要你能給出一個精確的機率分佈，你就能做到理論上限的壓縮。

這篇論文做了三件事：

1. **Lossless 壓縮**：用領域適配的 LoRA adapter，把 LLM 算術編碼（arithmetic coding）的壓縮率再提升 2 倍。
2. **Lossy 壓縮（Response Rewriting）**：叫 LLM 先把自己的回覆改寫得更精簡，再做算術編碼，壓縮率達到 0.03（比直接壓原始回覆好 2 倍）。
3. **互動式 Extreme 壓縮（QA Compression）**：一個小模型（Haiku）等點問答，透過 10 個是非題從大模型（Opus）身上「取經」，壓縮率 0.0006 到 0.004——比先前 SOTA 好超過 **100 倍**。

## 為什麼重要

### 對開發者的直接影響

如果你在做 RAG（Retrieval-Augmented Generation）系統、API 呼叫、或任何需要傳輸大量 LLM 生成文字的場景，這篇論文直接告訴你：**不要裸傳文字，先問問 LLM 能不能先把回覆「減肥」。**

具體數字：
- GZIP 壓文字：壓縮率約 0.33（三個位元組變一個）
- 基礎 LLM 算術編碼：0.1
- LoRA 適配後：0.09（再快一倍）
- Response rewriting + 算術編碼：0.03
- QA Compression：0.0006～0.004

這不是線性進步，是**數量級的跳躍**。把 100KB 的 Opus 回覆變成 60 bytes——這改變了通訊的遊戲規則。

### 為什麼 lossy 對文字有意義

JPEG 壓圖片，你永遠看得出差異。但文字不同：**用戶要的不是「逐字 replay」，而是「正確的答案」**。

論文裡有一句話點出了這個關鍵：「在 LLM 聊天情境下，用戶根本接觸不到底層模型，所以也無法察覺回覆與原始輸出之間的差異。」

這意味著：lossy 文字壓縮不會造成 fidelity loss——只要语义不跑偏。這打開了一個全新的壓縮 regime。

### 理論啟發：知識可以互動傳遞

QA Compression 的底層想法，其實是從複雜度理論借來的：**互動式證明系統**（Interactive Proof Systems）比非互動式證明（NP）更強，因為提問方可以根據回答動態調整下一個問題，把資訊壓到極致。

論文把這個概念搬到 LLM：你不需要傳輸完整的「知識」，你只需要傳**好問題**。一個 7B 的 Haiku 問 10 個聰明的是非題，就能從 405B 的 Opus 那裡拿回 23%–72% 的能力差距。

## 技術細節

### Arithmetic Coding 基礎

LLM 文字壓縮的核心流程：
1. LLM 對每個 token 給出機率分佈 `p(token | context)`
2. Arithmetic coding 把這些機率直接轉成 bit stream
3. 壓縮後的位元數 ≈ 模型的 cross-entropy × token 數

壓縮效果好不好的關鍵：**模型的機率分佈與真實資料分佈有多接近**。KL 散度越大，浪費的位元數越多。

### Lossless：LoRA Domain Adaptation

問題：同一個通用 LLM 面對不同領域（數學、程式、醫療對話），機率分佈差異很大，但模型只有一個。

解法：用 LoRA 對每個領域微調一個 adapter。傳送端和接收端共享同一組 adapters，根據 prompt 內容用 RAG-style router 選對應的 adapter。

實驗結果（LMSYS-Chat 數據集）：
- 正確 LoRA：壓縮率 0.09（比 base model 0.18 快 2 倍）
- RAG router 選 LoRA（不用看完整回覆，只靠 prompt）：準確率 72%，仍保有 1.9 倍加速

### Lossy：Response Rewriting

分兩種策略：
- **Shortest-of-N**：生成 N 個候選回答，取最容易被壓縮的那個。N=10 時壓縮率 0.063。
- **Summarization**：直接叫 LLM「把回覆改寫得更短但語意不變」。壓縮率 0.034，比 Shortest-of-N 再好 1.9 倍。

重要的是：**選擇更可壓縮的回答，並不會降低答案品質**（在數學和程式 benchmark 上測試）。

### QA Compression：20 Questions 遊戲

這是論文最有趣的部分：

```
小模型（Haiku）                      大模型（Opus）
    │                                     │
    │──── 有關這個問題，答案是否為 "是"？ ────▶│
    │◀──────── 是 ─────────────────────────│
    │                                     │
    │──── 繼續問下一個問題...              │
    │◀──────── ...                        │
    │                                     │
    ▼                                     │
用自己的理解產生回答
```

- 小模型根據到目前為止的答案，自己推斷大模型會怎麼回答
- 每個問題只傳 1 bit（大模型回答是/否）
- 10 個問題（10 bits）就能把 Opus 的能力取回 23%–72%

在 8 個跨數學、科學、程式領域的 benchmark 上：
- 簡單任務：取回 72% 能力差距
- 困難任務：取回 7%–38%
- 壓縮率：0.0006 ~ 0.004（比 Delétang 2024 的方法好 100 倍以上）

## 我的觀點

這篇論文有幾個地方讓我特別感興趣，也有幾個地方讓我保持懷疑。

**讓人興奮的地方：**

第一，壓縮-計算 Frontier 這個框架很漂亮。它把「計算量」當成一個維度：你願意花更多 GPU 算力，就能壓得更小。這對未來 Inference 最佳化極為重要——當 token 生成成本下降，edge device 能負擔的模型能力就會上來。

第二，QA Compression 的理論意涵比實務意涵更大。它暗示了一件事：**知識不需要被完整傳遞，只需要被聰明地查詢**。如果這個思路被推廣，未來的多智體系統（multi-agent）之間可能不需要交換長篇上下文，只需要交換「問題」。

**讓我保守的地方：**

第一，QA Compression 在簡單任務上效果很好（72%），但在困難任務上只有 7%–38%。這代表「問對問題」這件事本身也需要能力——而小模型往往不太擅長问對問題。如果小模型問不出好問題，整個壓縮協議就失效。

第二，論文的實驗都在 Anthropic 的封閉模型上做的（Haiku / Sonnet / Opus family）。跨模型架構（open-source 對 closed-source，或不同家族模型）能不能復現，沒有答案。

第三，實驗室出來的數字很漂亮，但落地到 production 系統還有很長的路。Arithmetic coding 的非確定性問題（不同硬體/軟體版本導致浮點差異）雖然論文有討論 block emission encoding 的解法，但距離好用還需要更多工程打磨。

## 參考連結

- [Haiku to Opus in Just 10 bits (arXiv:2604.02343)](https://arxiv.org/abs/2604.02343)
- [arXiv HTML 版本（全文）](https://arxiv.org/html/2604.02343v1)
- [MATS Program 研究摘要](https://www.matsprogram.org/research/haiku-to-opus-in-just-10-bits-llms-unlock-massive-compression-gains)
- [Roy Rinberg Twitter/原始發表](https://x.com/RoyRinberg/status/2029620878082986331)
