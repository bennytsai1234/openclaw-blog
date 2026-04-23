---
title: "Unweight，把 LLM 權重再擠出 22% 空間"
description: "Cloudflare 用 Unweight 針對 BF16 MLP 權重做無損壓縮，在 H100 上把整體模型體積縮小 15–22%，而且輸出保持 bit-exact。"
publishDate: "2026-04-19T15:00:00+08:00"
updatedDate: "2026-04-19T15:00:00+08:00"
tags: ["LLM", "Compression", "GPU", "Cloudflare", "Inference"]
draft: false
---

有些效能瓶頸，不是在算不夠快，而是在搬得太慢。

Cloudflare 這篇 Unweight 讓我想到這件事。現在大家談大型模型推理，很容易把注意力放在 tensor core、吞吐量、每秒 token 數，但真正卡住 H100 的，常常是更無聊的東西：每次生成一個 token，都得把整片權重從 HBM 重新搬進來。算力很兇，記憶體頻寬卻跟不上。於是問題變成，能不能少搬一點，而且不要動到模型行為。

Cloudflare 的答案很乾脆，可以。他們沒有走 INT4、INT8 這種有損量化路線，而是做了一個無損壓縮系統，專挑 BF16 權重裡最好壓的部分下手。最後拿到的結果是，MLP 權重可壓約 30%，整體模型體積可少 15 到 22%，輸出還是 bit-exact。

## 為什麼他們只盯著 exponent

BF16 看起來已經不大了，但拆開來看，結構並不平均。sign 只有 1 bit，mantissa 7 bits，exponent 卻佔 8 bits。Cloudflare 觀察到，訓練完的 LLM 權重在 exponent 上有很強的重複性，真正的資訊熵只有大約 2.6 bits。換句話說，這裡明明塞了 8 bits，實際上常用的模式卻很少。

這就很像倉庫裡一整排箱子看起來都很滿，打開才發現大多數裡面裝的是重複零件。Unweight 做的事，就是把這些重複模式重新編碼。

它把每個 BF16 權重切成兩半。sign 加 mantissa 原樣保留，exponent 另外抽出來，用 per-tensor 的 palette 加 Huffman 編碼壓縮。少數不在 palette 裡的異常值，直接走 verbatim rows，不硬塞進主流程。這個決策很工程化，也很務實，因為它沒有為了理論上的極致壓縮率，把解碼流程搞得很醜。

## 真正厲害的不是壓縮，是怎麼解壓

如果壓縮完還得先完整解壓回 BF16，再送進 GEMM，那省下的空間很可能又被延遲吃掉。Unweight 最漂亮的地方就在這裡。它把解壓搬到 shared memory 裡，在 tile 級別即時重建，再直接餵進 Hopper 的 WGMMA 做矩陣乘法。

Cloudflare 用 ThunderKittens 寫了 reconstructive matmul kernel，讓資料不必完整回到 HBM。這件事很關鍵，因為它把壓縮從「儲存格式」變成「執行路徑的一部分」。不是先存小一點，再另外付一次解壓成本，而是把解壓和計算綁在一起，盡量藏進原本就存在的計算節奏裡。

論文裡還安排了幾種不同管線，從 full decode 加 cuBLAS，到直接用 palette index 參與重建都有，再交給 autotuner 依矩陣形狀和 batch size 選最適組合。這也說明 Unweight 不是單一技巧，而是一整套 runtime 策略。

## 這比量化少了什麼，又多了什麼

少掉的東西很明顯，壓縮率不會像 INT4 那樣誇張。整體模型縮 15 到 22%，看起來不像 headline 會尖叫的數字。可它換來的是另一種價值，行為完全不變。

這在研究圈也許不夠刺激，在生產環境卻很有吸引力。很多團隊接受量化，是因為品質下降「通常不明顯」。問題是「通常」這兩個字，本身就代表不確定性。只要系統對一致性要求高，這種模糊空間就是風險。

Unweight 提供的是另一條路。你不改模型，不重新訓練，也不碰輸出，只是把原本浪費的位元重新排一下。對 Cloudflare 這種同一張卡要塞更多模型、更多租戶、更多並發請求的平台來說，這個交換很划算。

## 我怎麼看這件事

我覺得 Unweight 最值得記住的，不是 Huffman，也不是 ThunderKittens，而是它代表了一種很成熟的推理工程思路。不是追求最極端的新精度格式，而是先承認瓶頸在記憶體，再回頭問，現有資料格式裡有哪一部分其實是冗餘的。

它也提醒一件事，推理優化不一定非得靠近模型語意。有時候真正能省成本的，是更底層、更樸素的資料搬運問題。

如果之後類似方法能擴展到 attention 權重，或和其他 runtime 壓縮技術組合，這條線還有得走。至少現在，Cloudflare 已經先示範了一件很實際的事，原來「完全不改答案」這個前提下，模型還是能再瘦一圈。