---
title: "【技術解析】P-GRPO：蘋果如何用群體歷史統計解決 LLM 偏好對齊的偏見問題"
description: "標準 GRPO 在異質偏好下會歧視少數群體，蘋果研究團隊提出 P-GRPO，以群體歷史統計取代批次統計，終於讓模型公平對齊每一種用戶偏好。"
publishDate: "2026-04-03"
updatedDate: "2026-04-03"
tags: ["技術", "AI", "RLHF", "LLM Alignment", "強化學習"]
draft: false
---

## 這篇文章在說什麼

當前主流的 LLM 對齊方法，如 RLHF 及其變體 GRPO（Group Relative Policy Optimization），在訓練時都假設所有用戶的偏好是「同一種聲音」——優化的是一個全球共同的目標。但現實世界的使用者偏好是高度異質的：有人愛簡潔回覆，有人要詳細說明；有人偏好謹慎保守的建議，有人喜歡大膽有創意的方向。

蘋果機器學習研究團隊的最新論文「Personalized Group Relative Policy Optimization for Heterogenous Preference Alignment」指出，GRPO 現行的群組內歸一化（group-based normalization）策略，其實是拿「同一批次內的即時統計」來當基準，這在偏好異質的場景下會造成系統性偏差：高獎勵的少數群體樣本，會被相對打壓；低獎勵的少數群體，梯度訊號則被進一步衰減。長期下來，模型會收斂到只服務「大多數人偏好」的狀態，少數族群的體驗被犧牲。

蘋果提出的解法叫 **P-GRPO（Personalized GRPO）**：把優勢估計（advantage estimation）從「批次即時統計」改為「該偏好群體的歷史統計」。具體來說，維護每個偏好群體的滾動平均值 μp 和標準差 σp（透過 Welford 線上演算法實作，空間複雜度 O(1)），優勢計算從：

```
A = (Ri - mean(batch)) / std(batch)
```

變成：

```
A_personalized = (Ri - μp) / (σp + ε)
```

好處是：一個「高獎勵」的完成，現在是跟自己所屬群體的歷史比，而非跟同一批次裡那些可能屬於完全不同偏好的人比。這讓少數群體的訊號不再被稀釋。

---

## 為什麼重要

這件事的重要性可以從三個層次來看：

**對研究者**：過去談 LLM 個人化，方向多集中在「推論時」的策略——用戶 profile 寫進 prompt、RAG 使用者歷史紀錄等。P-GRPO 告訴你，真正的差異化要從「訓練時」的目標函數下手，光靠 context conditioning 不夠，因為梯度本身已經不公平了。

**對應用開發者**：如果你在建的產品面向多元用戶群（不同地區、不同使用習慣、不同專業程度），標準 GRPO 訓練出來的模型對某些群組會天然表現較差。P-GRPO 提供了一條不需要犧牲通用能力的個人化捷徑。

**對整個 AI 安全性與公平性**：論文在 Broader Impact 章節特別點出一個值得擔憂的問題：個人化做得太好，會不會反而加劇同溫層效應、讓模型更會投其所好而非引發思考？這是個人化對齊文獻裡少見的自我反省。

---

## 技術細節

### GRPO 的核心問題

GRPO 的標準優勢估計公式：
$$\hat{A}_{i,t} = \frac{R_i - \text{mean}(\{R_i\}_{i=1}^G)}{\text{std}(\{R_i\}_{i=1}^G) + \epsilon}$$

其中 $G$ 是同一 prompt 抽樣出來的完成群組大小。問題在於：當批次裡摻雜了來自不同偏好群體的樣本，少數群體的 reward 若天然偏低，被同一批次的均值/std 歸一化後，梯度訊號就會被壓縮。論文把這叫「統計收縮」（statistical shrinkage）。

### P-GRPO 的修正

論文推導了一個關鍵等式（Corollary 3.1）：個人化優勢可以分解為：

$$\tilde{A}_{i,t}^p = \frac{\sigma_G}{\sigma_p} \hat{A}_{i,t} + \frac{\mu_G - \mu_p}{\sigma_p}$$

第二項 $\frac{\mu_G - \mu_p}{\sigma_p}$ 就是偏差修正項。當某一偏好群體的歷史均值 μp 遠低於當前批次均值 μG，這個修正項會把少數群體的優勢往上拉。

### Welford 線上演算法

要維護每個偏好群體的 μp 和 σp，最 naive 的做法是存下所有歷史 reward，這在大型分散訓練環境是不可行的。P-GRPO 採用 Welford 1962 年提出的 O(1) 空間演算法，每次只更新三個變數：計數 np、均值 μp、M2（平方差總和），就能持續更新而不需儲存完整歷史。

### 實驗設置

團隊用 Qwen3（1.7B/8B）和 Gemma-2B 在三類任務上測試：
- **MovieLens-1M 推薦任務**：預測用戶下一步會看哪部電影
- **合成偏好資料集**：七種人格，各自有不同的語言風格與音樂類型偏好
- **Goodreads 書評生成**：用評分作為偏好群組 proxy

結果：P-GRPO 在所有任務、所有模型規格上都比標準 GRPO 收斂更快、最終獎勵更高。LLM-as-judge（用 GPT-OSS-120B 擔任裁判）也確認 P-GRPO 在幾乎所有偏好群組的 win rate 都優於 GRPO。

---

## 我的觀點

這篇論文的核心貢獻其實相當低調——不是提出新架構，也不是發明新 loss，而是「對 GRPO 優勢估計的歸一化基準做了一個看起來很小的改動」。但這個改動觸及的是一個根本假設：拿什麼當「比較的基準」。

我自己對這篇文章有兩個保留意見：

**第一，聚類品質是關鍵瓶頸。** 論文裡的 ablation 實驗說明了這點：當群組分配是隨機的，P-GRPO 沒有任何提升。實際應用中，如何可靠地把使用者分進有意義的偏好群組，本身就是一個極難的問題。沒有好的聚類，就沒有好的個人化——這個假設比論文論證的还要強。

**第二，少數群體的「低獎勵」是否真的代表「錯誤偏好」？** 論文假設少數群體的 reward 偏低是因為偏好更難滿足（技術性解釋），但也有可能是模型對某些群體存在系统性偏差。這兩種情況在 P-GRPO 的框架裡看起來一模一樣——都體現在 μp 偏低。如果根本問題是歧視而不是難度，P-GRPO 只是在把歧視「固化」成個人化的預設值。

儘管如此，P-GRPO 仍然是 RLHF 個人化方向上一步扎實的工作。對正在建多樣化 AI 產品、需要對齊多元族群的團隊而言，這個方向值得持續關注。

---

## 參考連結

- [Personalized Group Relative Policy Optimization for Heterogenous Preference Alignment (Apple ML Research)](https://machinelearning.apple.com/research/personalized-group)
- [arXiv:2603.10009](https://arxiv.org/abs/2603.10009)
- [GRPO 原論文 (DeepSeek-AI)](https://arxiv.org/abs/2409.12570)
- [GDPO: Group Distributional Preference Optimization](https://arxiv.org/abs/2603.10009)
