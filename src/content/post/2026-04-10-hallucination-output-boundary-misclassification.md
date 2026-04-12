---
title: "【技術解析】幻覺其實是輸出邊界的分類錯誤：Instruction + Structural Gate 複合棄權架構"
description: "一篇論文提出把幻覺重新框架為「輸出邊界上的分類錯誤」，並設計了一個結合指令驅動拒絕與結構化棄權閘門的複合架構，在 50 題嚴格控制的五種認知體制下達到 96–98% 準確率，幻覺率僅 0–4%。"
publishDate: "2026-04-10T10:36:00+08:00"
updatedDate: "2026-04-10T10:36:00+08:00"
tags: ["AI", "LLM", "幻覺", "輸出邊界", "棄權機制", "NLP"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-10-hallucination-output-boundary-misclassification.png"
  alt: "幻覺是輸出邊界的分類錯誤 封面圖"
---

## 這篇文章在說什麼

幻覺（hallucination）——大型語言模型產出流暢但無根據的內容——長期以來被視為一種「內容錯誤」：模型說了錯誤的事，所以要修內容。但這篇由 Angelina Hintsanen 發表的論文提出了一個截然不同的框架：**幻覺不是內容錯誤，而是輸出邊界（output boundary）上的分類錯誤**。

核心洞察是：當一個 query 所需的資訊不存在於 prompt、檢索到的上下文、或模型的參數知識中時，系統面臨一個「認知鴻溝」（epistemic gap）。模型繼續生成，是因為訓練獎勵流暢完成，而非認知謹慎。於是，原本只應該「內部產生」的猜測內被當作「有證據支撐」的答案發射出去了。這個錯誤分類發生在輸出邊界——在生成完成之後、對外發射之前——所以事後檢查已經來不及了。

基於這個框架，作者設計了一套**複合棄權架構**（composite abstention architecture），同時使用兩種機制：
- **Instruction-based refusal**：用 instruction prompt 告訴模型「當證據不足時要說不知道」
- **Structural abstention gate**：一個與模型無關的外部閘門，計算「支持度不足分數 $S_t$」，當超過閾值就直接攔截輸出

兩種機制各有互補的失敗模式，合起來才能做到趨近零幻覺。

## 為什麼重要

### 現有方法的根本限制

目前主流的幻覺緩解策略都是**事後**運作：生成完之後再去比對來源、做 self-check、訓練驗證器。這些方法的共同結構性限制是：**幻覺內容已經被製造出來了**。論文稱之為「post-output control」，控制時機已經晚了。

另一條路線是「選擇性預測」（selective prediction），在輸出前就做閘門——但現有方法主要應用在confidence-based的場景，沒有針對幻覺這個特定失敗模式設計。

這篇論文把焦點從「生成什麼內容」移到「什麼條件下應該發射內容」，把干預點從生成階段移到輸出邊界——這是一個更乾淨的控制理論框架。

### 為什麼單一機制不夠

這是論文最有力的貢獻：**instruction-only 和 structural gate 各自有互補的失敗模式**。

**Instruction-only 的失敗模式：**
- 在 R1（可回答的事實問題）上會**過度謹慎**：GPT-4o-mini 和 GPT-4o 有 10% 的可回答項目被錯誤地放棄
- 在 GPT-3.5-turbo 上，由於 instruction-following 能力較弱，仍然有 6% 的幻覺殘留（主要在衝突證據項目上）

**Structural Gate 的失敗模式：**
- 在 R3（衝突證據）上會**自信地胡說**：模型選了一方的答案，然後以高 self-consistency、高 paraphrase stability、高 citation coverage 產生流暢但錯誤的輸出。三個信號都很好看，因為模型真的在認真「引用」被選中的那一半證據——但這恰恰是「自信犯錯」而非「隨機犯錯」，閘門完全無法察覺。

**複合架構的結果：** 兩者互補，邏輯是 OR：當模型自己願意拒絕**或**閘門的支持度不足分數超標，輸出就被攔截。GPT-4o-mini 和 GPT-4o 準確率達 96–98%，幻覺率 0–4%。

### 支援不足分數怎麼算

Structural gate 用三個**黑箱信號**計算支持度不足分數 $S_t$，不需要接觸模型內部：

$$S_t = 1 - \frac{A_t + P_t + C_t}{3}$$

- **$A_t$（Self-consistency）**：獨立地生成 K=3 個答案，$A_t$ 是多數決一致率。拿同一個問題問模型好幾次，如果每次答案都不一樣，代表模型自己也不確定。
- **$P_t$（Paraphrase stability）**：把問題換句話說再問一次，測量原始答案與換句話說後答案的語意重疊度。如果換句話說後答案差很多，代表答案對問題措辭太敏感，缺乏穩定的支撐。
- **$C_t$（Citation coverage）**：回答內容中，有多少 content words 能追溯到提供的上下文。如果答案是模型自己生成的，沒有引用任何上下文，$C_t$ 就會很低。

閾值 $\tau = 0.55$：$S_t > 0.55$ 就 block 輸出。

## 五種認知體制的實驗設計

這篇論文的實驗設計很值得拿出來說。作者手工建構了五種嚴格控制的體制（regime），每種 10 題，總共 50 題，跨三個模型（GPT-3.5-turbo、GPT-4o-mini、GPT-4o），四種條件，600 個試驗：

| Regime | 描述 | 正確行為 |
|--------|------|---------|
| R1 | 事實問題，上下文充足 | 回答 |
| R2 | 上下文為空或沒有答案 | 棄權 |
| R3 | 兩份來源提供矛盾答案 | 棄權或標明衝突 |
| R4 | 上下文主題相關但缺少答案 | 棄權 |
| R5 | 對抗性：問題無答案但要求自信回答 | 棄權 |

這個設計的價值在於**隔離失敗模式**：只看 general QA 基準無法區分「自信犯錯」和「隨機犯錯」，而這兩種失敗模式需要完全不同的干預機制。

## TruthfulQA 無上下文壓力測試

在 50 題控制實驗之外，作者還用 TruthfulQA 建構了一個 100 題的無上下文 stress test：所有問題都以空白上下文餵入，**正確行為是 100% 棄權**。

結果：

| 條件 | GPT-4o / GPT-4o-mini 棄權率 | GPT-3.5-turbo 棄權率 |
|------|--------------------------|---------------------|
| Baseline | 0% | 0% |
| Instruction-only | 100% | **62%** |
| Structural Gate | 98–100% | **100%** |
| Composite | 98–100% | **100%** |

GPT-3.5-turbo 的 instruction-only 只能做到 62% 棄權——換句話說，有 38% 的時候模型會對沒有答案的問題自信胡說。Structural gate 在所有模型上都維持了 98–100% 的棄權率，證明了這種「能力無關的安全地板」（capability-independent abstention floor）。

## 為什麼這個理論框架有意義

作者引用了 predictive processing（預測處理）的生物認知框架：在人類大腦中，當內部產生的信號被錯誤地分類為外部證據時，會產生有問題的正回饋迴路。LLM 的類比是：當 prior-driven completion 被當作 evidentially sufficient response 發射出來時，這個過程本身就是那個需要被干預的邊界錯誤。

這個框架帶來一個很重要的實務啟示：**事後修正（post-hoc correction）無法從根本上解決幻覺問題**。一旦內容已經發射，系統就已經像外界確認了這是「足夠支撐的輸出」。事後比對與修正或許能降低特定輸出的傷害，但並沒有修復那個讓輸出跨越邊界本身就已經發生的分類失敗。

## 我的觀點

### 正面的判斷

這篇論文最值得稱許的是**框架的原創性**：不是又一個新的 benchmark 或新的 training trick，而是把「幻覺」這個概念重新框架成一個分類問題，然後從這個分類觀點出發設計干預機制。這種「問題定義」級別的貢獻，往往比直接給答案更有持久價值。

另一個優點是實驗設計的精準性：五種認知體制隔離了不同的失敗模式，讓論文的結論有很強的說服力。知道自己設計的東西在哪種設定下會失敗、為什麼失敗，是論文能對社群產生影響力的前提。

### 需要保留懷疑的地方

1. **規模問題**：50 題 × 3 模型 × 4 條件是一個 proof-of-concept，不是 publication-grade 的 benchmark。效果在更大規模、更自然的查詢分佈上是否能維持，很難說。
2. **API 成本**：Composite 架構每次 query 需要約 22 次 API 調用（K=3 時：3 次 self-consistency + 2 次 paraphrase + 1 次 gated generation + 1 次 instructed generation）。在高風險領域（醫療、法律、金融）這個成本合理，但對一般對話應用來說太貴了。
3. **跨家族泛化性**：所有實驗都在 OpenAI 模型上。LLM 的 RLHF stack、safety tuning、decoding defaults 等因素都會影響 instruction-following 能力和 self-assessment 可靠性。在 Claude 或 Llama 上測試，結果可能會不同。
4. **Confident confabulation 是個真正的硬問題**：作者自己承認，structural gate 無法察覺「模型自信地選了一方衝突證據並流暢地引用它」的狀況。這個 failure mode 的本質是：所有可觀測信號（self-consistency、paraphrase stability、甚至 citation coverage）都可以在「自信犯錯」的情況下同時表現良好。這個問題可能需要引入 entailment checking 之類的額外機制才能根本解決。

### 實務建議

對工程師來說，這篇論文帶來的實務啟示是：

- **高風險應用**（需要杜絕幻覺的 domain）應考慮 composite 架構，特別是需要跨能力level（如同時服務 GPT-4o 和 GPT-3.5 等較弱模型）的產品，structural gate 提供了一個能力無關的 safety floor
- **Citation coverage 作為信號**的思路可以直接在現有 RAG 系統中實現：用關鍵字覆蓋率來估計回答是否有上下文支撐，不需要 entailment verifier 就能做到一定程度的 early signal
- **不要依賴單一機制**：instruction-following 的可靠性會隨模型能力退化，self-assessment 在「自信犯錯」時不可靠——複合架構的思路對其他安全問題（jailbreak、prompt injection）同樣適用

## 參考連結

- [Hallucination as Output-Boundary Misclassification: A Composite Abstention Architecture](https://arxiv.org/abs/2604.06195)
- [OpenReview 討論頁](https://openreview.net/forum?id=HId1PNRzeB)
- [ICLR 2026 Workshop on LLM Reasoning](https://iclr.cc/)
