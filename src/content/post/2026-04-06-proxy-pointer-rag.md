---
title: "為向量檢索裝上結構之眼：指標代理人 RAG"
description: "用 metadata pointer 在 FAISS 的規模與成本下，實現結構化檢索"
publishDate: "2026-04-06T12:00:00+08:00"
updatedDate: "2026-04-06T10:00:00+08:00"
tags: ["技術", "RAG", "LLM", "檢索系統"]
draft: false
---

當一份結構嚴謹的萬字報告，被 RAG 系統當作一袋馬鈴薯，切成無數個獨立、破碎的文本塊時，文件的內在邏輯——目錄、章節、父子關係——便在暴力切分中灰飛煙滅。使用者提問：「請總結第二章的市場風險評估」，系統或許能憑藉語意相似度，大海撈針般地找到包含「市場風險」的隻字片語，卻完全無法回應「第二章」這個結構性限制。

為了解決這份「結構失憶症」，業界浮現了兩條看似無法兩全的路徑。第一條是主流的 **Vector RAG**，以 FAISS 這類近似最近鄰（ANN）資料庫為核心引擎。它將一切化約為向量，實現了風馳電掣、成本低廉的大規模檢索。但它的阿基里斯之腱，正在於對文件物理結構的徹底盲視。另一條是新興的 **Vectorless RAG** 思潮，以 PageIndex 為代表。它反其道而行，在索引階段就讓強大的 LLM 閱讀全文，建立一棵「語意骨架樹」，查詢時沿樹導航，精準定位。這雖聰明，但代價是索引一份財報就可能需呼叫 LLM 上百次，昂貴且緩慢。

Proxy-Pointer RAG 拒絕做出這種非此即彼的選擇，它試圖從中闢出第三條路。其核心洞察振聾發聵：問題的根源不在於我們選擇了哪種資料庫，而在於我們如何「準備」送入庫中的資料。

#### 第一層：以 Regex 取代 LLM，低成本繪製文件骨架

傳統作法用昂貴的 LLM 建立樹狀結構，但對 Markdown 這類半結構化文件，其階層關係已由標題語法（如 `#`）定義。Proxy-Pointer 的第一步便是返璞歸真，改用極輕量的正規表示式（regex）掃描文件，直接解析出樹狀結構與各節點的起訖行號。

#### 第二層：讓 Chunk 成為代理人，用指標取回完整上下文

傳統 RAG 回傳的 chunk 邊界武斷，常切斷語意。Proxy-Pointer 改變了此規則：送入 FAISS embedding 的 chunk 不再是內容本身，而是攜帶「指標」的「代理人」。真正重要的是其 metadata，包含了 `start_line` 和 `end_line`。這使得檢索流程煥然一新：FAISS 根據語意相似度返回候選 chunks 後，系統只讀取 `metadata`，根據 `node_id` 去重，然後使用 `start_line` 和 `end_line` 回到原始 Markdown 文件中，將完整、未被切割的段落內容整個取出。

#### 第三層：麵包屑注入，將文件「地址」刻印在 Embedding 裡

「麵包屑注入」（Breadcrumb Injection）解決了 FAISS 檢索時結構盲的問題。在 chunk 送入 embedding 前，系統會找到其所有祖先節點，將標題串成路徑字串，加到文本最前面。這樣一來，embedding 模型看到的就不再是孤立的句子，而是這句話在文件中的完整「地址」。

#### 何時該用 Proxy-Pointer RAG？

**最適用場景：** 結構嚴謹、層級複雜、上下文邊界至關重要的長文件。例如財務報告、法律條文、技術手冊、學術論文。

**較不適用場景：** 大量獨立短文件（如 FAQ、推文），以及需要跨多份文件進行複雜推理的查詢。

---

## 參考連結

- 原文：[Proxy-Pointer RAG: Achieving Vectorless Accuracy at Vector RAG Scale and Cost](https://towardsdatascience.com/proxy-pointer-rag-achieving-vectorless-accuracy-at-vector-rag-scale-and-cost/)
- [PageIndex (VectifyAI)](https://github.com/VectifyAI/PageIndex)
