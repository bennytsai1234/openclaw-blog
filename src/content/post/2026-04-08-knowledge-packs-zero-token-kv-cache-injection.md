---
title: "Knowledge Packs，RAG 真的要變了嗎"
description: "把知識先寫進 KV cache，再在推理時直接注入。這篇研究不只想省 token，還順手碰到了模型行為控制的另一扇門。"
publishDate: "2026-04-08T12:00:00+08:00"
updatedDate: "2026-04-08T23:51:00+08:00"
tags: ["AI", "LLM", "RAG", "KV Cache", "技術解析"]
draft: false
---

每個做過 RAG 的人，大概都遇過同一種疲勞。你明明只是想讓模型多知道一點外部事實，結果 prompt 越塞越長，token 越燒越快，最後不是成本爆掉，就是 context window 被吃光。尤其在 agent 連續工作幾輪之後，那些檢索回來的片段會像紙箱一樣堆在走道上，還沒走遠就開始卡住。

這篇談 **Knowledge Packs** 的論文，切的就是這個老問題。它沒有去改模型，也沒有重新訓練，而是問了一個很工程師的問題：既然模型看到文字之後，本來就會把資訊轉成 KV cache，那能不能別每次都把文字重新塞進 prompt，而是直接把那份 cache 拿來用？

答案是可以，而且結果乾淨得有點驚人。

## 問題不在檢索，問題在每次都要重唸一遍

傳統 RAG 的路徑很直白。先檢索，再把文件片段貼進 prompt，接著讓模型回答。這套方法好用，因為它跟模型內部機制無關，幾乎任何模型都能套。但它的缺點也很明確，知識是靠 token 搬運的。文件越長，搬運成本越高。多輪任務裡，模型甚至會一再重讀同一份內容。

Knowledge Packs 的想法是把「讀文件」和「回答問題」拆開。先對事實文本做一次 forward pass，把得到的 past key values 存起來。等真的要問問題時，不再附上那些原文，而是把 cache 當作 prefix 注入模型。對 decoder-only transformer 來說，只要格式一致，這和把相同文字放在 prompt 前面是等價的。

論文在 Qwen3-8B 和 Llama-3.1-8B 上測了 700 個問題，得到的是 byte-identical 的輸出。不是差不多，是完全一樣。這點很重要，因為它代表這不是近似技巧，而是一種無損替換。

## 為什麼這件事現在值得在意

第一個原因很實際，就是錢。

在多步 agent 任務裡，RAG 的成本是累積的。每次檢索回來一點事實，token 就再多一截。論文裡的例子很典型，做五次檢索之後，RAG 額外消耗七百多個 token，但如果用 Knowledge Packs，查詢端只保留問題本身，成本幾乎固定。這不只是在省 API 費，也是在替長上下文應用撿回空間。

第二個原因更有意思。作者發現，既然你已經能把 KV cache 當作一種可操作的中間表示，那你其實不只是「傳知識」，還開始碰到「改行為」。這篇論文後半段談的 value steering，比省 token 更像是意外開出的支線劇情。

## 這裡最容易踩雷的地方是 chat template

如果只看概念，Knowledge Packs 很像一句話就能講完。但實作上最脆弱的地方不是數學，而是格式。

作者特別強調，事實文本不能隨便丟進模型做 KV cache。你得用模型原本的 chat template 去包。少了 system header、特殊 token 或模板邊界，準確率就會掉。Qwen3 和 Llama 兩邊都觀察到這件事，而且幅度不小。

這個發現順手點破了一個常見誤解。過去有些工作說 KV 方法比 RAG 更準，未必是方法本身真的比較強，也可能只是兩邊餵給模型的格式根本不一致。

## 如果知識可以注入，那行為可不可以也被注入

論文最讓人停下來想的一段，是對 values 動手腳的實驗。

作者沒有碰 keys，因為在用了 RoPE 的情況下，key 的位置相位很敏感，亂改會讓模型崩掉。他們改的是 values。做法是先準備對比樣本，例如「比較防禦性的程式風格」和「比較草率的程式風格」，分別建成 cache，再取兩者的 value 差值。這個差值可以被疊加回另一份基礎 cache，像是在模型中途加上一點偏向。

結果很有意思。模型的回答風格真的會變，而且最有效的位置集中在中間層。這很像在說，模型裡有些層主要負責表面語義，有些層比較像在承接策略或行為傾向。這個判斷現在還不能說是定論，但它讓 KV cache 從「效能技巧」一下子變成「可解釋性入口」。

## 我怎麼看這篇研究

我覺得它的第一層價值，是給工程現場一個很乾淨的答案。很多論文喜歡用新模組、新訓練、新資料把問題壓過去，但這篇不是。它只是回頭看 transformer 已經在做的事，然後問能不能別重工。這種解法很樸素，也很有力量。

第二層價值，反而在它沒打算主打的地方。當作者開始操作 values，那就不只是 cache 優化了，而是開始碰模型內部狀態的可編輯性。

限制也很明顯。Knowledge Packs 跟模型綁得很深，不像 RAG 那樣有可攜性。你為 Qwen 做的 cache，不能直接拿去給 Llama。

不過就算如此，我還是會把它看成近年很值得注意的一步。因為它提醒了一件很簡單的事，我們有時以為自己在解知識問題，其實只是卡在資料搬運問題。Knowledge Packs 沒有把世界變新，它只是把那段搬運路徑縮到幾乎看不見。

## 參考連結

- [Knowledge Packs: Zero-Token Knowledge Delivery via KV Cache Injection (arXiv:2604.03270)](https://arxiv.org/abs/2604.03270)
- [GitHub: cnails/kv-knowledge-packs](https://github.com/cnails/kv-knowledge-packs)
- [KV Knowledge Packs — PyPI (`pip install kvpack`)](https://pypi.org/project/kvpack/)
