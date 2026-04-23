---
title: "DeepGEMM，DeepSeek 怎麼把 FP8 寫得更乾淨"
description: "DeepSeek 開源 DeepGEMM，用極少量核心程式碼做出高效 FP8 GEMM，從 dense GEMM 到 MoE 場景都瞄準 Hopper 與 Blackwell。"
publishDate: "2026-04-20T10:00:00+08:00"
updatedDate: "2026-04-20T10:03:00+08:00"
tags: ["DeepSeek", "FP8", "GEMM", "CUDA", "MoE"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-20-deepgemm-fp8-gem.png"
  alt: "DeepGEMM：DeepSeek 的 FP8 矩陣乘法核心庫"
---

很多 GPU 專案一打開，你會先感受到壓力，不是靈感。

滿山滿谷的 template、巨量抽象、幾乎碰不得的 kernel 結構，這幾年 CUTLASS 給不少工程師的感覺就是這樣。它很強，但也很重。DeepSeek 把 DeepGEMM 開源時，我第一個反應不是「又一個矩陣庫」，而是他們終於把一件大家都需要、又一直很難讀的事，重新寫得像人能理解。

DeepGEMM 的野心其實很清楚，用盡量少的程式碼，把 Hopper 和 Blackwell 上最重要的 FP8 GEMM 場景處理好。不是做一個包山包海的通用框架，而是直指當下大模型訓練和推理最需要的那塊核心路徑。

## 為什麼 FP8 不是把 bits 砍半這麼簡單

矩陣乘法永遠是大模型的主幹。attention 要算，MLP 要算，MoE 更是一路都在算。從 BF16 往 FP8 走，理論上吞吐量會很好看，但真正麻煩的是表示範圍。E4M3 的指數和尾數都很短，一不小心就飽和或下溢。

所以 FP8 的關鍵從來不只是格式，而是縮放。你得替不同 block 找到合適的 scale，讓值塞得進去，又不要把有效資訊磨平。這也是 DeepGEMM 為什麼不是單純做一個低精度 kernel，而是把細粒度 scaling 當成主角。

它支援 1D-1D 和 1D-2D 這些縮放模式，背後的意思其實很實在，不同形狀、不同分佈的矩陣，需要不同程度的局部校正。這種設計對 dense GEMM 有用，對 MoE 更重要，因為每個 expert 收到的 token 分佈本來就不穩定。

## 這套東西真正想解的是可讀性

DeepGEMM 最吸睛的數字當然是效能，在 H800 上 FP8 峰值可到 1550 TFLOPS。但我覺得它真正想解的，是另一件比較少被直接講出口的問題，NVIDIA 這套最佳化世界太難學了。

DeepSeek 的做法很像一次工程上的翻譯。他們沒有否認 CUTLASS 和 CuTe 的價值，反而很明白地借用了那些概念，TMA 怎麼搬、MMA 怎麼打、epilogue 怎麼收尾，全都還在。只是他們把這些東西重寫成一個更乾淨的版本，讓你至少看得懂資料怎麼流。

而且它走的是 JIT 路線。不是安裝時就編好一堆萬用 kernel，而是在 runtime 根據具體 shape 去 specialize。這種策略很適合現在的大模型工作負載，因為很多關鍵 shape 其實高度集中，真的值得客製。

## MoE 才是它最有企圖心的地方

如果只把 DeepGEMM 看成 FP8 GEMM 庫，其實低估了它。它特別把 grouped GEMM、masked layout、Mega MoE 這些能力一起端出來，已經很明顯是在替 DeepSeek 自己的大模型基礎設施鋪路。

Mega MoE 那段尤其有意思。它不是單做矩陣乘法，而是把 dispatch、兩層線性層、activation、combine 一路 fuse 起來，盡量把 NVLink 通訊藏進張量核心計算的節奏裡。這種寫法不是教科書會先教你的東西，但很像真正跑大型 MoE 系統時，最後一定會遇到的現實，單個 kernel 再快，如果 GPU 之間的交換卡住，整體還是上不去。

## 跟 CUTLASS 比，差別到底在哪

CUTLASS 的價值是完整，DeepGEMM 的價值是克制。前者像一座大工廠，幾乎什麼零件都做得出來；後者像一條重新整理過的產線，只保留最值得保留的工具。

這當然也意味著它有邊界。你不會期待 DeepGEMM 一開始就覆蓋所有架構、所有精度、所有稀奇古怪的 layout。它明顯偏向 NVIDIA 最新兩代 GPU，也很貼著 DeepSeek 自己的 workload。可這反而是它能成功的原因，因為它沒有假裝自己是萬靈丹。

## 我怎麼看這個專案

我喜歡 DeepGEMM，主要不是因為它想取代誰，而是它證明了一件事，GPU kernel 不一定非得寫成只有原作者看得懂。當一個底層元件已經重要到左右整個模型系統的成本和速度，把它做得更透明，本身就是貢獻。

它對大多數工程師的直接意義，未必是明天就把 production 全面換掉，而是終於有一份相對乾淨、又真的有實戰負載撐腰的教材，可以拿來學 FP8、學 TMA、學 Hopper 上的資料流怎麼安排。

這件事很小，也很大。因為很多時候，技術社群真正缺的不是下一個更快的庫，而是一個讓更多人看得懂、因此敢去改的庫。