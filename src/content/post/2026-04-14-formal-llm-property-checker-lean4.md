---
title: "【技術解析】Formal：用 Lean 4 為 LLM 生成程式碼建立形式化驗證防線"
description: "yamafaktory/formal 專案讓任何 LLM 生成的純函式邏輯都能透過 Lean 4 數學庫進行機械驗證，試圖在「AI 寫 code」與「程式碼正確性」之間搭起一座形式化橋梁。"
publishDate: "2026-04-14T15:00:00+08:00"
updatedDate: "2026-04-14T15:09:00+08:00"
tags: ["Lean 4", "形式驗證", "LLM", "程式碼品質", "Mathlib", "軟體工程"]
draft: false
---

## 這篇文章在說什麼

當 LLM 生成的程式碼「看起來正確」時，我們往往只能靠測試個案來驗證——但測試通過從不代表邏輯真的對。**Formal** 這個專案嘗試用形式化方法（Formal Verification）為 LLM 生成程式碼的正確性提供機械保證。

它的核心思路是這樣的：從任何語言的原始碼檔案出發，先用 LLM 辨識出「pure functions」（無副作用的純函式），再由 LLM 自動生成這些函式應該滿足的「properties」（屬性），接著把這些 properties 翻譯成 Lean 4 定理，最後交給 Lean 4 + Mathlib 證明引擎來驗證。如果 Lean 接受了證明，那這條 property 就是經過機械確認的。

整個流程完全不求人力介入形式規格（formal spec）的撰寫——全部由 LLM 自動推斷和翻譯。

## 為什麼重要

LLM 寫 code 最大的盲點不是「語法錯」，而是「邏輯對但语义錯」——程式可以跑、測試會通過，但實際行為偏離了工程師的意圖。例如：「discount 永遠在 0 到 1 之間」這個 invariant，LLM 可能在翻譯時把前提假設搞錯，卻依然產生一個「通過了錯誤假設」的證明。

Formal 的價值在於讓這些隱藏假設**浮出水面**。每一條 property 都附帶：
- **Preconditions（前提條件）**：例如「discount 是 float 類型」
- **Assumptions（建模假設）**：例如「floats 以有理數建模，忽略 NaN 與 Infinity」

這些在輸出結果裡都會明確顯示，讓人類 reviewer 可以判斷「Lean 證明的命題，是否真的對應到程式設計師想要的行為」。

這是一個本質上的進步：過去形式化驗證需要專家手寫規格，門檻極高；現在用 LLM 把這段gap自動化，理論上任何團隊都能在 CI/CD 流程中加入這個檢查層。

## 技術細節

### 整個 Pipeline

```
原始碼（任何語言）
  → LLM：分解出 pure functions
  → LLM：生成 properties + explicit preconditions + assumptions
  → LLM：翻譯成 Lean 4 theorem + proof sketch
  → Lean 4 + Mathlib：接受或拒絕證明
  → 結果：verified / failed / unverifiable
```

支援的語言：Python、Java、Kotlin、TypeScript/JavaScript、Go、Rust、C#、C++、Ruby。

### 三個 LLM 步驟，再交給 Lean

**1. Decomposition**：LLM 閱讀程式碼，識別哪些函式是 pure function、哪些有 side effect（DB call、HTTP、I/O）。Side effect 函式直接排除，不做驗證。

**2. Property Extraction**：對每個 pure function，LLM 生成它認為該函式應該滿足的 properties，並標明 explicit preconditions 與 modeling assumptions。

**3. Formalization**：把每條 property 翻譯成 Lean 4 定理（theorem + proof）。

只有這三步全由 LLM 負責。Lean 4 在最後只做機械校驗——它無法被欺騙（sound），但它只能檢查餵給它的命題是否成立。

### 驗證結果評分

| 分數 | 意義 |
|------|------|
| `full` | 所有可驗證的 properties 全部證明成功 |
| `partial` | ≥50% 可驗證 properties 成功 |
| `failed` | <50% 可驗證 properties 成功 |
| `no_pure_logic` | 檔案中找不到 pure functions |

每一條 property 的狀態：
- **verified**：Lean 4 在 stated preconditions 與 assumptions 下接受了證明
- **failed**：找不到證明，可能表示邏輯有 bug 或翻譯失準
- **unverifiable**：該 property 依賴無法用 Lean 4 建模的特性（reference equality、reflection、runtime behavior），不是 bug，是建模極限

### 建模限制（重要）

Formal 的 README 裡特別強調了幾個關鍵限制：

- **Floats 建模為有理數**：IEEE 754 精度問題、NaN、Infinity 等浮點數行為**無法**被忠實建模，預設假設無 NaN/Inf
- **字串用結構相等**：reference equality 不能建模
- **不是測試替代品**：Formal 驗證的是「在 stated assumptions 下，命題為真」，而非「程式在所有輸入下都對」
- **LLM 可能產生「正確但無關」的證明**：如果 LLM 誤解了函式意圖，它會產生一個數學上正確但偏離原意的定理，Lean 照樣接受

### 實際使用範例

以一個 `Feature.java` 為例：

```
[PIPELINE] Pure functions: ['computePrice', 'applyDiscount']
[PIPELINE] Extracted 5 properties
[VERIFY ] ✓ prop_1: verified — discount is always between 0 and 1
[VERIFY ] ~ prop_3: unverifiable — depends on JVM reference equality
[PIPELINE] Done — verified: 4, failed: 0, unverifiable: 1

Summary: Score: full (4/5 verified, 1 unverifiable)
  ✓ [bound] discount is always between 0 and 1
    Preconditions: discount is a float
    Assumptions: floats modeled as rationals, no NaN or Inf
  ✓ [monotonicity] higher discount yields lower price
    Preconditions: price > 0, 0 <= discount <= 1
    Assumptions: floats modeled as rationals
```

### 技術架構

- **LLM Backend**：支援 Claude Code CLI（直接用本機 claude binary）與任何 OpenAI-compatible endpoint（Anthropic、Groq、Ollama、LM Studio 等）
- **驗證引擎**：運行在 Docker container（localhost:1337），依賴 Lean 4 + Mathlib
- **快取機制**：成功的 proof 結果以 SHA-256 hash 為 key 快取，預設 TTL 7 天；失敗的嘗試**不**快取，每次都重新跑 full LLM + retry loop
- **Proof Retry**：每條 property 預設最多重試 3 次（`MAX_PROOF_RETRIES`）

## 與其他方案的比較

傳統形式化驗證（Coq、Isabelle、Agda、TLA+）需要**專家手寫形式規格**，門檻極高。LLM 改變了這個 Equation——讓「寫 formal spec」的過程自動化代價大幅降低，但同時引入了新的信任問題：「LLM 生成的 formal spec 是否忠實反映程式意圖？」

Formal 的回答是：不完全解決，但**讓問題可見**。它沒有聲稱能證明「程式正確」，只證明「在 explicit assumptions 下，這些 properties 成立」。而 assumptions 是 explicit 的，人類可以 review。

另一條路是「AI for Formal Verification」——用 LLM 輔助或自動生成 Coq/Lean 證明（e.g., Coq的 coqai、Lean的 lean-gpt-folive）。Formal 與這些路徑的差異在於：**它的起點是自然語言的需求描述或既有程式碼，而不是 formal specification**。

## 侷限與適用場景

**適用場景：**
- AI 生成程式碼的邏輯審查（尤其 pure domain logic：定價計算、資料轉換、validation rules）
- CI/CD 流程中對「數學上可證」但「測試可能漏掉」的 properties 做額外把關
- 建立團隊對 LLM 生成關鍵邏輯的信心

**不適用場景：**
- 有副作用的程式碼（IO、網路、資料庫）
- 依賴浮點數精確行為的場景
- 需要完整覆蓋（full coverage）的場景
- 替代單元測試或集成測試

## 結論

Formal 是一個思路清晰、限制坦誠的工具。它沒有聲稱用 LLM + Lean 就能解決程式碼正確性的根本問題，但透過把「LLM 的隱含假設」翻譯成「explicit preconditions 與 assumptions」，讓形式化驗證的成果從「專家能讀懂的證明文件」變成「工程師能 review 的行為描述」。

在 AI 生成程式碼已成主流的時代，這種「用形式化方法對齊 LLM 意圖」的路徑，值得持續關注。最終能否真正規模化，取決於 LLM 翻譯的忠實度能否持續提升——而這，正是下一階段研究的核心問題。
