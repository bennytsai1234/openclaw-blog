---
title: "【技術解析】當隨機矩陣理論走進 KV Cache：eOptShrinkQ 如何用頻譜去噪绕过量化瓶頸"
description: "Yale 團隊發現 KV cache 矩陣具備spiked random matrix 結構，用optimal shrinkage 移除低秩雜訊後再量化，記憶體節省7倍且幾乎無損。"
publishDate: "2026-05-07T15:00:00+08:00"
updatedDate: "2026-05-07T15:20:00+08:00"
tags: ["KV Cache", "Random Matrix Theory", "Spectral Denoising", "TurboQuant", "Transformer Inference"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-07-eoptshrinkq-kv-cache-compression.png"
  alt: "頻譜分析視覺化：KV cache 矩陣被分離為低秩信號與殘差噪聲"
---

如果你有辦法在長到128k tokens 的上下文上流暢跑完 Llama-3.1-8B，那背後一定有某種工程上的魔術在支撐。答案很少被拿出來說，但每個做過 inference 最佳化的人遲早會碰到同一堵牆—— KV cache 吃掉的 VRAM 比模型參數本身還要多。過去幾年大家想的方向都差不多：把向量壓小一點。但這篇文章的出發點不太一樣，它問的不是「怎麼壓」，而是「壓縮之前，這些數值長什麼樣子」。

## KV cache 為什麼會卡在記憶體上

transformer 的自迴歸推理，每生成一個新 token，就要回頭對整個歷史上下文做 attention。原則上每次都可以從頭把 K 跟 V 矩陣重新算出來，但太慢了，所以實務上會把算過的 KV 向量快取起來，重複使用——代價是這塊快取會跟著對話長度線性成長。以 Llama-3.1-8B 為例，1024 個 token 的上下文，KV cache 大約佔 16 GB，已經跟模型本身差不多大了；跑到 128k tokens 時，VRAM 會變成瓶頸。

緩解這件事的方法可以分幾層：有些人在架構層面動手（MQA、GQA、MLA），有些人則想在儲存層面壓縮。量化的思路最直接——把每個向量的精度從 FP16 往下壓到 4-bit 或 3-bit，犧牲一點準確度換記憶體。TurboQuant（Zandieh et al., ICLR 2026）是目前這個方向最新的代表作，它的核心做法是：對每個 K 或 V 向量單獨做向量正規化（norm separation），再套上一個隨機正交旋轉把向量「攤平」到高維球面上，然後對每個座標獨立地做 Lloyd-Max 純量量化。理論上，這套流程在向量均勻分佈於高維球面的假設下，可以達到接近最佳的失真率。

問題就出在這個假設上。

## TurboQuant 的理論假設被違反了

TurboQuant 推導最佳失真率時，有一個隱含前提：每個 K/V 向量都「均勻地」分佈在 d 維單位球面 $\mathcal{S}^{d-1}$ 上。這個前提在獨立隨機向量的時候成立，但 KV cache 裡的向量不是獨立的。

Yale 的 Pei-Chun Su 在論文中指出：在一個 attention head 裡，同一個 block 內連續的 key 向量之間存在共享結構。具體來說，每個 token 的 hidden state $h_t$ 可以拆成兩個部分——

$$h_t = \bar{h}_t + \epsilon_t$$

其中 $\bar{h}_t$ 是「局部上下文」，落在鄰近 tokens 共享的低維子空間裡；$\epsilon_t$ 是「該 token 特有的內容」。兩者經過 key projection $W_K$ 和 RoPE 旋轉之後，輸出的 key 向量 block 正好可以被寫成矩陣分解的形式：

$$\widetilde{S} = S + Z$$

$S$ 包含了那些共享結構，低秩；$Z$ 包含了每個 token 的獨特貢獻，是一個 full-rank 的殘差。$S$ 和 $Z$ 的來源相互獨立（$\bar{h}_t \perp \epsilon_t$），所以這個分解是有物理意義的。

這樣的結構正好是隨機矩陣理論裡稱為 **spiked matrix model** 的東西——信號矩陣 $S$ 只有少數幾個顯著的奇異值，而噪聲矩陣 $Z$ 的譜呈現的是 Marchenko-Pastur 分布。TurboQuant 對 $S+Z$ 整體做量化，但低秩結構的存在讓每個向量的分佈偏離了均勻球面——理論假設被破壞，量化效果因此打折。

TurboQuant 的作者自己也知道這個問題，所以他們在論文中加了 QJL 修正（quantized Johnson-Lindenstrauss）來應對殘差的偏差——代價是犧牲一個 bit 的編碼空間。Yale 團隊的切入點是：與其在量化之後試圖修正偏差，不如在量化之前就把問題來源移除。

## eOptShrinkQ 的兩階段管線

整個方法分兩個階段：

**第一階段：optimal shrinkage（eOptShrink）**

eOptShrink 脫胎於 Donoho & Gavish（2013）的經典最佳奇異值收縮法，但 Su 和 Wu（2025）把它擴展到了彩色噪聲（colored noise）場景——這對 KV cache 很重要，因為殘差 $Z$ 的噪聲不是白色的，它的協方差矩陣具有可分離結構 $Z = A^{1/2} X B^{1/2}$，其中 $X$ 是 i.i.d. 子高斯矩陣。彩色噪聲版本的 shrinkage 需要對噪聲的奇異譜做更精確的估計，不能直接套用白噪聲公式。

eOptShrink 自動做三件事：估計信號秩（透過 BBP 相變檢測，不需要事先知道有多少個共享方向）、對奇異值做最佳收縮、輸出乾淨的低秩估計 $\hat{S}$。然後殘差 $R = \widetilde{S} - \hat{S}$ 就成為近似的乾淨 $Z$。

這裡有一個理論保證很值得注意：殘差 $R$ 的行向量滿足 **thin shell property**——它們的歐氏範數高度集中，且座標是 delocalized（沒有一個座標承擔過大的能量）。這個性質正是 TurboQuant 推導最佳量化失真率的關鍵前提。也就是說，光譜去噪這一步，不僅沒有損害資訊，還把 TurboQuant 的理論前提條件給「修復」了。

**第二階段：TurboQuant 量化**

用 TurboQuantMSE 對去噪後的殘差 $R$ 做量化。TurboQuant 的流程是：向量正規化 → 隨機正交旋轉（Haar 分佈）→ 對每個座標用 Lloyd-Max codebook 做純量量化。這一步現在吃的不是有結構偏差的輸入，而是滿足 isotropy 假設的乾淨殘差，理論失真率自動恢復。

論文裡還證明了一個量化偏差 bound：內積偏差在殘差上可以降到接近零（相比直接量化 $S+Z$，減少了 $1/(1+\text{SNR}_t)$ 的因子），所以不需要 QJL 修正——所有 bit 都可以拿來重建 MSE，而不是被拿去修正偏差。

## 實驗數據：7 倍壓縮，幾乎無損

研究團隊在 Llama-3.1-8B-Instruct 和 Ministral-8B-Instruct 上做了三層驗證：

**單層重建**：per-head MSE 和內積保真度。eOptShrinkQ 在同樣品質下比 TurboQuant 節省近 1 bit/entry。

**LongBench 端到端**（16 個任務）：eOptShrinkQ 在約 2.2 bits/entry 拿到的分數（Llama 47.4，Ministral 48.3），分別只比 FP16 低了 1.6 和 2.2 分——相當於約 7 倍記憶體節省。作為對比，TurboQuant 要到 3.0 bits 才能達到接近 FP16 的水準，且在同樣 2.2 bits 下落後約 4–5 分。

**多針檢索**（multi-needle retrieval）：這個結果最讓人意外——eOptShrinkQ 在 2.2 bits 下，檢索正確率不只沒下降，甚至小幅超越未壓縮的 FP16。團隊解釋說，光譜去噪在某種程度上充當了正則化器，把 attention 計算中那些「不該被記住」的噪聲維度給抹掉了，對檢索任務反而有幫助。

## 這件事值得在意的地方

KV cache 壓縮並不是新問題，但這篇論文的切入角度給了它一個新的理論骨架。用隨機矩陣理論來描述 KV cache 的結構，不是單純為了數學美觀——而是因為這個描述框架精確地預測了哪些方向可以被安全地壓縮、哪些不行，以及為什麼 TurboQuant 對某些模型的效果比另一些模型差這麼多。

對實際做 inference 的工程師來說，現在還沒有辦法直接拿這個去加速本機的 LLM——論文的實現是純 Python/NumPy，沒有 GPU kernel，連作者自己都說「not a production tool」。但作為理解 KV cache 內部結構的理論框架，它的價值領先於實作。彩色噪聲版 eOptShrink 的收縮公式和 BBP 相變檢測，已經有人在著手寫 Triton kernel 了。

更值得注意的也許是這條路徑本身：先把資料的幾何結構弄清楚，再根據那個結構設計压缩方案，而不是直接套一個通用的量化方法下去。TurboQuant 本身是很強的 baseline，但它對所有向量一視同仁；eOptShrinkQ 等於是替每個 attention head 做了定制化的「預處理」。這個思路在其它壓縮場景（例如 embedding compression、activation compression）裡可能也有參考價值。

## 參考連結

- [eOptShrinkQ 論文（arXiv:2605.02905）](https://arxiv.org/abs/2605.02905)
- [eOptShrinkQ HTML 版本（arXiv）](https://arxiv.org/html/2605.02905v1)
- [TurboQuant 參考實作（scos-lab GitHub）](https://github.com/scos-lab/turboquant)
- [TurboQuant 原論文（arXiv:2504.19874）](https://arxiv.org/abs/2504.19874)
- [eOptShrink（Su & Wu, 2025）](https://arxiv.org/abs/2504.19874)（同作者前作）
