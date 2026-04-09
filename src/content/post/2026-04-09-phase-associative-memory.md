---
title: "【技術解析】Phase-Associative Memory：讓語言模型在複數空間裡做序列記憶"
description: "一篇論文提出用複數希爾伯特空間取代實數向量，做序列關聯記憶，在 100M 參數下 perplexity 僅落後 transformer 約 10%，但推理成本為 O(1)。"
publishDate: "2026-04-09"
updatedDate: "2026-04-09"
tags: ["AI", "NLP", "序列模型", "複數神經網路"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-09-phase-associative-memory.png"
  alt: "Phase-Associative Memory 封面圖"
---

## 這篇文章在說什麼

這篇由 Christopher Agostino 與 Gowrav Vishwakarma 發表的論文，提出了一個名為 **Phase-Associative Memory（PAM）** 的序列模型，核心概念是：把所有表徵（representations）改成**複數值**，讓語言模型在「複數希伯特空間」（Complex Hilbert Space）而非傳統的實數向量空間中運作。

具體做法是：每個 token 被嵌入成一個複數向量，token 之間的關聯（association）不再存成實數外積，而是用複數外積累進一個矩陣狀態 $S_t \in \mathbb{C}^{d \times d}$。查詢（retrieval）時，用的是**共軛內積**（conjugate inner product）$K_t^* \cdot Q_t / \sqrt{d}$，也就是看「相位對齊程度」來決定取出哪些關聯——這跟量子力學裡從波函數投影得到測量結果的數學形式一模一樣。

在 WikiText-103 上，約 100M 參數的 PAM 達到驗證 perplexity 30.0，而條件完全相同、相同參數量訓練的 transformer 是 27.1，落後約 10%。但 PAM 的推理是完全固定大小的狀態，**O(1) per token**，而 transformer 的 KV cache 會隨序列長度線性成長。

## 為什麼重要

### 理論層面：語言本來就是「量子」的

這篇論文最有趣的不是工程，而是一個很少被認真看待的理論觀察：**人類語言的語義關聯服從量子統計**。

研究者讓人類受試者在不同語境框架下對同一句話給出解釋，結果發現這些詮釋之間的相關性違反了貝爾定理（Bell's Theorem）的古典邊界——就跟量子實驗中粒子糾纏的行為一樣。更有趣的是，把同樣的測試套用在大型語言模型上，這種「非古典相關性」在横跨四個數量級的參數量上都存在，而且與所有標準 benchmark 完全無關。

如果你接受這個前提，語言處理的正確數學框架就不是實數向量空間，而是**複數希爾伯特空間**——因為那才是「語境依賴」系統的原生的代數結構。Transformer 用實數 embedding + softmax attention 功能性地近似了這個結構，就像古典電腦用大量參數投影量子態到實數空間來模擬量子計算，效率永遠有落差。

PAM 的目標不是另一個更快的 attention 替代品，而是**把計算形式直接搬到複數空間**，讓架構與語言的幾何結構匹配。

### 工程層面：O(1) 推理是認真的

現在各家在做 SSM（State Space Models）、linear attention，都是想要擺脫 transformer 的 O(T) 推理成本。PAM 在這個脈絡下加入了一個很乾淨的設計：**矩陣狀態 $S_t \in \mathbb{C}^{d \times d}$ 的大小是固定的**，不管序列多長，狀態就是 $H \times d \times d$ 個複數值。推理時每個 token 的計算是 O(Hd²)，但不會隨著已經處理過多少 token 而增長。

對比一下：transformer 在 T=2048 時，KV cache 大小約是 PAM 固定狀態的 56 倍，而這個比例還會隨 context length 增加繼續拉開。

## 技術細節

### 核心機制

PAM 的運作流程：

1. **輸入**：$x_t \in \mathbb{C}^D$ 複數 embedding
2. **投影**：透過一個複數線性層，同時得到 query、key、value（$Q_t, K_t, V_t \in \mathbb{C}^{H \times d}$）
3. **相位旋轉**：對 Q 和 K 施加複數旋轉位置編碼（complex RoPE），絕對位置編碼進相位，而非實數大小
4. **狀態更新**：$S_t = \gamma_t \cdot S_{t-1} + V_t' \otimes K_t^*$，其中 $\gamma_t$ 是 input-dependent decay rate，有一個 protect gate 防止重要資訊被覆蓋
5. **檢索**：$Y_t = S_t \cdot \tilde{Q}_t$（$\tilde{Q}_t = Q_t / \sqrt{d}$），這就是**共軛內積**——當 key 的相位與 query 相位對齊時，檢索強度高；相位錯開時自然被抑制，不需要 softmax

### 為什麼用矩陣狀態而非向量狀態

早期的向量狀態版本（$S_t \in \mathbb{C}^d$）面臨所謂的**全息綁定（holographic binding）容量衰減**問題：疊加 multiple 綁定時，關聯會發生破壞性干擾，容量以 $O(1/\sqrt{n})$ 衰減。這在綁定數量少時還可接受；數量一多，資訊就互相淹沒了。

矩陣狀態提供 $O(d^2)$ 的關聯容量（他們的配置是 6 heads × 64² = 24,576 複數值 per layer），徹底繞過這個問題。

### 訓練代價 vs. 推論代價

PAM 的代價是**4 倍的算術運算量**（每個複數乘法等於 4 個實數乘法），而且作者用的是純 PyTorch、沒有 custom CUDA kernel。所以在訓練 throughput 上 PAM 約 23k tokens/s，而 matched transformer 是 96k tokens/s，落後約 4 倍。

但論文強調一個重要的觀點：PAM **付出 4 倍算術代價，只損失 ~10% perplexity**。如果 perplexity gap 純粹來自算術效率問題，那優化過的 CUDA kernel 應該能大幅縮小差距——這個假設有待驗證，但方向是合理的。

### 生成品質

論文中有一個 generation sample（epoch 10，prompt：「In 1923, the University of」），文法正確、呈現出對日期與專有名詞的結構感知，3-gram 重複率 0.034。但研究團隊也明確說：**在這個規模下事實準確性不可靠**。

## 我的觀點

### 正面的判斷

這篇論文觸碰到一個很少人願意正面討論的問題：Transformer 到底是對的架構，還是只是目前最大、最幸運的資料壓縮器？如果語言的語義本質上具有量子性（contextuality），那麼實數向量空間裡訓練出來的模型，其實是用「古典硬碟」存「量子資料」，幻覺（hallucination）與 jailbreak 可能不是 bug，而是這種錯配結構下的必然副產物。

這個理論框架如果成立，會是一個很重要的研究方向：不是繼續堆參數，而是問「什麼是最適合語言這個系統的計算代數？」

### 需要保留懷疑的地方

1. **只有單次訓練結果**：10% perplexity gap 是單次 run，沒有 multi-seed 驗證。差距是否顯著、現在很難說。
2. **規模太小**：100M 參數的實驗結果能否推論到數百 B 參數的 regime？SSM 在小模型上的表現往往在大模型上不成立（Mamba 早期的情況）。在這個規模下 transformer 的能力也遠沒有充分展現。
3. **理論 vs. 工程**：作者聲稱的「語言具有量子 contextuality」——這是一個可以被檢驗的假說，不是已經被確認的事實。CHSH 測試應用在語義詮釋上的效度存在爭議。
4. **沒有和 SOTA 比較**：WikiText-103 上 30.0 的 perplexity 比不上 Mamba、RWKV 等已在更大規模驗證過的 SSM。拿 PAM 和 100M transformer 比，更像是內部消融實驗而非對外宣稱的效能聲明。

### 實用建議

短期內，工程師不需要把這個馬上拿進產品。但有兩個方向值得關注：
- **作為 interpretability 的新框架**：如果「語言本質上是 contextuality 的」這個理論被更多實驗支持，會根本性地改變我們對 LLM 可解釋性的期望
- **長期來說，complex-valued models 可能是一條值得關注的硬體-算法 co-design 路線**：因為 GPU 的 tensor core 對複數運算已有原生支援，某種程度來說 PAM 在硬體上的劣勢可能比看起來小

## 參考連結

- [Phase-Associative Memory: Sequence Modeling in Complex Hilbert Space](https://arxiv.org/abs/2604.05030)
- [GitHub: gowrav-vishwakarma/qllm2](https://github.com/gowrav-vishwakarma/qllm2)
