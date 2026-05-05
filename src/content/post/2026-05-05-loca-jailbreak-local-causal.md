---
title: "【技術解析】LOCA：為每個 jailbreak 找到專屬的「解藥鑰匙」"
description: "UIUC 研究團隊提出 LOCA 方法，用最少的因果干預就能讓成功的 jailbreak 失效，揭示 jailbreak 成功機制並非單一全局邏輯，而是因樣本而異。"
publishDate: "2026-05-05T15:00:00+08:00"
updatedDate: "2026-05-05T03:06:00+08:00"
tags: ["mechanistic interpretability", "sparse autoencoder", "jailbreak", "LLM safety", "UIUC"]
draft: false
---

有個問題在 LLM 安全社群討論了很長一段時間，但很少有人真正去測試：當一個 jailbreak prompt 成功繞過模型的安全防線時，到底發生了什麼？

多數人的直覺回答是：jailbreak 降低了模型對「有害」概念的編碼程度。也就是說，原本會被安全訓練標記為危險的信號，在攻擊過程中被壓下去了，所以模型不再拒絕回應。這個解釋看似合理，也確實有文獻支持——Arditi 等人（2024）和 Ball 等人（2024）都找到過類似證據：jailbreak 成功的同時，模型的 intermediate representation 裡「有害程度」的方向投影確實變小了。

但這個解釋有個盲點：**它是全局的、平均的、對所有 jailbreak 都適用的**。如果真的是這樣，那我們只需要找到一個「有害程度方向」，朝反方向推一把，就能讓所有 jailbreak 失效。問題在於，實驗數據並不支援這個假設。同一種 jailbreak 手法，對暴力請求有用，對網路攻擊請求可能完全無效。同一個請求類別，A 模型吃這招，B 模型不吃。你沒辦法用一個方向、一套機制，說清楚所有失敗的原因。

UIUC 的 Shubham Kumar 與 Narendra Ahuja 在 2026 年 4 月底發表的論文〈Minimal, Local, Causal Explanations for Jailbreak Success in Large Language Models〉，就是針對這個缺口而來。他們提出一個方法叫 **LOCA**（LOcal, CAusal explanations），目標是：給每一個成功的 jailbreak，找出「讓它失效所需要的最少干預」——不是全局解釋，而是樣本級、因果驅動的診斷。

## 為什麼「全局解釋」不夠用了

先說清楚既有的方法出了什麼問題。

現有研究找 jailbreak 機制的套路大致是：訓練一個 probe 或使用 sparse autoencoder（SAE），在模型的 intermediate representation space 裡找到一個方向，這個方向跟「harmfulness」或「refusal」的概念高度相關。一旦找到，學界就宣稱：我們知道 jailbreak 為什麼成功了——是因為它把表徵往那個方向推。

問題有幾層。第一，這種方向是跨所有輸入、平均出來的，它沒有辦法捕捉同一個 jailbreak 在不同請求類別上的表現差異。第二，Zou 等人（2023）做過一個觀察很值得注意：在 90% 的成功 jailbreak 案例中，模型**其實知道這個請求是有害的**，但仍然選擇不回絕。這說明「harmfulness 的編碼」和「refusal 的觸發」是分開的兩件事，不是同一條因果鏈上的兩個環節。第三，Zhao 等人（2025）的實驗進一步給出事實證據：LLM 會把 harmfulness 和 refusal 的概念分開儲存，就算模型正確理解了請求的危險性，拒絕機制仍然可以被繞過。

這些發現加在一起的結論是：要用一個全局方向解釋所有 jailbreak，邏輯上就不成立。但多數研究仍然這樣做——直到 LOCA 出現。

## LOCA 的核心思路：把「為什麼成功」變成「最少改動什麼就會失敗」

LOCA 的設計核心是把「解釋 jailbreak 成功」重新表述為一個因果干預問題：**如果我對這個成功的 jailbreak prompt 的內部表徵做最少的修改，讓它失效（觸發 refusa），我需要動哪些地方？**

注意這裡的幾個關鍵字：「最少」、「因果」、「局部」。

**最少**指的是 parsimony——干預的數量要極小化，目標是找到那個最小子集，足以翻轉模型的輸出。如果需要二十個方向的干預才能讓模型拒絕，那這二十個方向就不算是「真正的原因」，只是數量夠多所以碰巧有效。

**因果**指的是干預後的結果必須在模型的輸出 logits 上可觀察——不只是相關，而是直接的因果鏈。LOCA 採用的是 activation patching 的技術，而不是 activation steering。兩者差別在這裡：steering 是把一個偏移量加到很多 token 的表徵上，paching 則是用另一個乾淨 prompt 的等位置表徵直接置換。Patching 的好處是可以做到 token-level 的精準操作，而且置換出來的表徵仍在 distribution 內，不會像 steering 一樣推得太遠而讓輸出失去意義。

**局部**則是相對於「全局」的概念——LOCA 要找的是這個特定 jailbreak sample 的失敗條件，而不是一個對所有 sample 都適用的通則。

## 技術實現：三個步驟湊出最小因果集合

LOCA 的演算法分為三個主要步驟。

**第一步：Token matching**。Jailbreak prompt（xj）和原始有害請求（xo）的長度和格式可以完全不同，用同一套 template 做 token matching 根本不合規格。LOCA 對 xo 重新採樣（resample）其 instruction tokens，讓長度與 xj 對齊，然後再做 token 對應。這解決了結構不一致的問題，讓 activation patching 的位置有意義。

**第二步：概念候選集**。研究團隊使用預訓練的 SAE（sparse autoencoder）來表示每一個 token 在每一層的表徵。SAE 的每一個 feature 對應到解碼矩陣 Wd 的一列，也就是一個可解釋的方向。選擇 SAE 而不是 probes 的原因是：SAE 是非監督的，feature 之間更 likely 互相獨立、更可能是有意義的概念。

**第三步：迭代式 ranking 與 patching**。LOCA 用一階近似（first-order approximation）在每輪對所有（token, feature, layer）的候選組合打分，選擇分數最高的那一個做 activation patching，然後重新 forward 一次，看拒絕有沒有被觸發。整個過程持續，直到模型輸出 refusa 或候選集耗盡。這種迭代式 greedy 的做法，比 prior work 那種 one-shot 選 top-K 的方法更能捕捉 feature 之間的交互效應——因為有些 feature 單獨看沒用，但配合起來才真正翻轉輸出。

## 數據說了什麼：六個干預就夠，過去方法要二十個

研究團隊在 Gemma-2 系列和 Llama-3-chat 系列上測試，取了大型 jailbreak benchmark 裡的有害請求-jailbreak 配對，計算「需要多少個 interpretable changes 才能讓原本成功的 jailbreak 失效」。

LOCA 的結果是：平均約六次干預，模型就從服從變成拒絕。

這個數字本身不算驚人——真正驚人的是對照組。同樣的設定，adapted prior methods 幾乎沒有辦法在二十次干預內誘發拒絕，其中多數甚至在耗盡二十次之後仍然失敗。這說明 prior methods 找到的那些全局方向，單獨存在時根本不是真正的 bottleneck；它們只是平均下來相關性最高，實際上每個 sample 的關鍵方向都不一樣。

 ablation study 驗證了演算法的每一個設計選擇都有實質貢獻。Token matching 的步驟尤其關鍵——不做 matching 直接做 patching，效果大幅衰退。這印證了 token-level 操作不能跨結構套用的直覺。

## 一個意外的層級規律

最有趣的發現其實在 localization analysis 裡。

研究團隊把每個成功干預所在的層次、作用的 token type 做了分類，結果發現了一個規律：**在較早的 transformer layers，觸發拒絕的關鍵發生在 instruction tokens（即用戶原始請求的內容）**；**在較晚的 layers，關鍵幾乎全部轉移到 punctuation 和 post-instruction tokens（聊天模板的裝飾性 tokens）**。

這個分層模式透露了一個重要訊息：模型對「這是不是一個有害請求」的判斷，很早就已經被 instruction tokens 的表徵編碼完成了。但如果早期 layer 的信號不夠強、沒能阻止輸出，後期 layer 還有第二次機會——透過 chat template 的格式 tokens 來介入。Jailbreak 之所以成功，可能是因為它在某個層級上繞過了這兩個機制中的一個；LOCA 能修復，則是因為它同時覆蓋了這兩個層級的關鍵方向。

## 這件事為什麼重要

LOCA 的價值不在於找到一個新的安全方法——它本質上是一個診斷工具，不是防禦系統。但如果我們能對每一個成功 jailbreak 的失敗模式都給出「六個關鍵干預」的解釋，累積起來能做的事情就多了。

第一，可以重新審視我們現有安全訓練假設的邊界。如果不同 jailbreak 真的分層繞過不同機制，那單靠「壓低 harmfulness 方向」的對齊訓練，可能只能堵住早期的繞過経路，對後期格式層的攻擊仍然脆弱。第二，這種樣本級的因果解釋可以用來自動生成更有针对性的 red team 測試案例——不只是「這個 jailbreak 成功了」，而是「這次成功是因為第三層的某幾個 feature 被壓住了，換個方向就能繞過」。第三，從科學角度，這個研究重新打開了一個根本問題：jailbreak 的成功到底是不是一個單一機制？LOCA 的結果間接否定了這個假設，傾向於認為它是多路徑的、層級的、高度樣本依賴的。

當然，這個研究也有明顯的限制。實驗只在 Gemma 和 Llama chat 模型上做，結論能否推廣到更大的 frontier 模型，目前未知。SAE 的品質會直接影響概念覆蓋度，而 SAE 的訓練本身又是一個沒有標準共識的領域。另外，LOCA 目前只針對「單一 jailbreak 成功」這一種失敗模式，對於那些從來沒有被成功 jailbreak 過的安全模型，這套方法沒有東西可以解釋。

## 結語

LOCA 帶來的最核心訊息，也許不是那六個干預的數字，而是它重新定義了問題的維度。

過去的 Jailbreak 研究一直在問：「這個模型哪個方向跟拒絕有關？」然後宣稱找到答案。但 LOCA 的發現暗示這個問法本身就錯了——方向可能是真的，但每個成功的 jailbreak 依賴的具體方向集合都不一樣。全局方向只是統計上相關，不是因果上充分。真正需要回答的問題是：「這個特定 jailbreak，它繞過的是哪一層、哪幾個 token、哪幾個 feature？」

當未來的 LLM 被部署在高風險、高自主性的場景時，這種粒度的解釋能力會變成必需品。不是「我知道模型會不會拒絕」，而是「我知道模型在這一次、是因為什麼而決定不拒絕」。

---

## 參考連結

- [LOCA 原論文（arXiv:2605.00123）](https://arxiv.org/abs/2605.00123)
- [LOCA HTML 版本（可全文閱讀）](https://arxiv.org/html/2605.00123v1)
- [arXiv PDF 全文](https://arxiv.org/pdf/2605.00123)
- [Google Gemma Scope 2（SAE-based 可解釋性工具）](https://www.infoq.com/news/2026/01/google-gemma-scope-2/)
- [Arditi et al., 2024 — Refusal via Harmfulness Direction](https://arxiv.org/abs/2404.03328)
- [Zou et al., 2023 — Truthfulness Directions in LLM Representations](https://arxiv.org/abs/2306.15037)
- [Zhao et al., 2025 — Separability of Harmfulness and Refusal](https://arxiv.org/abs/2503.XXXXX)