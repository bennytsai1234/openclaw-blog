---
title: "【技術解析】Knowledge Packs：顛覆 RAG 的零代價知識注入技術"
description: "透過預先計算 KV cache，取代把知識塞進 prompt 的老方法，實現零 token 損耗的知識交付，並順帶解鎖行為 steering 的新能力。"
publishDate: "2026-04-08"
updatedDate: "2026-04-08"
tags: ["AI", "LLM", "RAG", "KV Cache", "技術解析"]
draft: false
---

## 這篇文章在說什麼

RAG（Retrieval-Augmented Generation）長期以來是給大語言模型注入外部知識的標準做法——把檢索到的文字直接塞進 prompt，模型就能「知道」那些它訓練資料截止日期之後的事。但這有個代價：每次檢索都要消耗大量 prompt token，在多步 agent 累積事實的場景下，這筆開銷線性成長，五次檢索就能燒掉 700+ token，嚴重侵蝕 context window 的空間。

這篇論文提出了 **Knowledge Packs**——把知識事先寫进 KV cache，query 時直接 inject，完全不佔 token。概念很簡單：decoder-only transformer 對事實文本做一次 forward pass，把输出的 past_key_values 快取下來；query 時把這些 cache 當成 prefix 傳給模型，模型產生的輸出與把同樣文字塞在 prompt 開頭的結果**完全相同**（byte-identical）。論文在 Qwen3-8B 與 Llama-3.1-8B 上跑了 700 題，零分歧。

除了知識交付，作者還發現了一個意外的 bonus：既然可以操作 KV cache，就等於有了模型內部狀態的寫入權限。Value（不是 Key）可以做對比相減，產生出**任何文字序列都無法抵達的 KV 狀態**，進而 steer 模型行為——比如讓它寫出更嚴謹、更有防禦性思維的程式碼。

## 為什麼重要

**第一個原因很實際：省 token。**

在多步 agent 場景裡，累積檢索事實是剛需。RAG 每步約消耗 140–150 token，五步下來就多付 700 token；Knowledge Packs 的查詢代價固定在 31–35 token（只有問題本身），節省幅度達 95%。在 32K context 限制下，RAG 靠累積事實大約碰到 200 筆就觸頂，Knowledge Packs 完全沒有這個天花板。

**第二個原因是工程上的優雅。**

從 KV cache 重建知識不需要任何訓練、不改模型權重、沒有蒸餾損耗，準確率與 RAG 完全相同。這等於是 lossless 的效能優化，無痛替換。

**第三個原因是它打開了一扇新門：value-space steering。**

過去 activation steering 需要在 inference 時動態干預 hidden states，代價不菲。Knowledge Packs 把 steering vector 直接寫進預先計算好的 cache，一次建好、無限使用，而且知識傳遞與行為 steering 可以同時運行（α ≤ 0.7 時兩者不打架）。

## 技術細節

### KV–Prefix Equivalence 的數學基礎

核心觀察：對 causal attention 架構來說，token position $i$ 只能 attend 到 $j \leq i$。因此在 $F$（事實文本）上獨立做一次 forward pass 得到的 KV cache，與在 $F \circ q$（事實文本 + 查詢）的 joint pass 中，$F$ 對應的 KV entries 完全一致。寫成論文中的形式：

$$\text{KV}(F) \oplus \text{generate}(q \mid \text{KV}(F)) \equiv \text{generate}(F \circ q)$$

這個等價成立的前提有兩個：第一，架構必須是 decoder-only causal masking（非 cross-attention 或 bidirectional）；第二，**必須用模型的 chat template 格式化事實文本**。

### Chat template 是關鍵 but fragile

這是論文裡最容易被忽略、也最有價值的發現之一：直接拿原始文字建 KV cache，在 Qwen3-8B 上會造成 6pp 的準確率下降，Llama-3.1-8B 更慘，達到 7.4pp。原因是 instruction-tuned 模型把特殊 token（如 Qwen 的 `<|im_start|>system`、Llama 的 `<|begin_of_text|>`）當成一種「模式切換訊號」，沒有的話同樣的文字會被處理成不同的分佈。

另一個坑是 template split：分別呼叫 `apply_chat_template` 處理 system 與 user 部分，會在 Llama-3.1 上重複注入 `<|begin_of_text|>` 與空 system header，再扣 1.5pp。正確做法是一次性生成完整 template 再於邊界處切開。

論文認為，過去某些宣稱「KV 勝過 RAG」的研究，很可能是因為兩種方法的格式化不一致，而不是 KV 本質更強。

### Banked Routing 擴展至 5000+ facts

單一 cache 有 context window 長度限制。為此，作者用 BGE-large embeddings 對事實做 k-means 分群（約 N/20 個 bank），query 時先 cosine  routing 到最近的 bank，再在 bank 內 ranking 取 top facts 並即時重新計算 KV（lazy recompute，代價約 6ms）。5000 個事實只佔 4.2 MB，routing 準確率 100%。

### Value Steering 的力學

RoPE（Rotary Position Embedding）會 rotate keys 但不動 values，所以**key 上做算術會破壞 coherence（準確率掉到 27%）**，但 value 上做沒問題。

Steering 的構造方式：準備對比 pairs（如「防禦性程式碼 vs. 草率寫法」），各別建 KV cache，取差異向量 $\Delta V = V_{good} - V_{bad}$，加到 base cache 的 values 上：

$$V_{steered}^{(l)} = V_{base}^{(l)} + \alpha \cdot (V_{good}^{(l)} - V_{bad}^{(l)})$$

實驗發現效果集中在 **mid-layer values（33–66% 的層數）**，與 baseline 相比 steering 分數顯著提升，且不同 steering 方向的 cosine similarity 約為 0（近正交），可以疊加而不互相干擾。

## 我的觀點

這篇論文的核心貢獻其實有兩層。

第一層是**工程上的勝利**：它提供了一個完全免費的 RAG 替代方案，而且背後有乾淨的數學證明撐腰。對於在高流量場景（API 按 token 計費、long-conversation 應用、多步 agent）工作的人來說，95% 的 token 節省幅度是實實在在的成本優化。缺點是 KV cache 與模型架構綁定，Qwen 的 cache 不能給 Llama 用——這讓它的泛用性受限於 RAG。

第二層更有意思：**value-space steering 證明了我們對模型內部狀態的理解還遠遠不夠**。作者展示了一個 KV 狀態可以被疊加出「任何文字序列都無法抵達」的 steering effect，而且這個 effect 只在特定 layer 層（33–66%）生效。這暗示模型的不同層級確實承載了不同類型的資訊——浅層處理表面語義，深層處理高層語義，而「行為風格」這種東西恰好落在中層。如果這個發現可復現，它對 interpretability 和 model editing 都有深遠的影響。

最後一個小觀察：作者在 appendix 裡跑了 5000 facts 的實驗仍然 100% 準確率，但用的是 synthetic facts，現實世界的知識庫會更 messy。這是合理的 limitation，不影響論文結論，但應用者需要注意。

## 參考連結

- [Knowledge Packs: Zero-Token Knowledge Delivery via KV Cache Injection (arXiv:2604.03270)](https://arxiv.org/abs/2604.03270)
- [GitHub: cnails/kv-knowledge-packs](https://github.com/cnails/kv-knowledge-packs)
- [KV Knowledge Packs — PyPI (`pip install kvpack`)](https://pypi.org/project/kvpack/)
