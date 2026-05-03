---
title: "【技術解析】CSPNet：如何做到省 20% 計算又不犧牲精度"
description: "CSPNet 透過通道分流機制，讓神經網路在維持準確率的情況下大幅減少計算量。它不是一種新的 backbone，而是一套可以套用在 DenseNet、ResNet、ResNeXt 上的改造範式。"
publishDate: "2026-05-04T10:00:00+08:00"
updatedDate: "2026-05-04T06:32:00+08:00"
tags: ["CSPNet", "DenseNet", "電腦視覺", "模型優化", "Darknet"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-04-cspnet-cross-stage-partial-network-explained.png"
  alt: "CSPNet 通道分流機制圖解：特徵圖在 stage 交界處分成兩路，一路通過 dense block，一路繞過直接往前"
---

你有沒有過那種經驗：模型壓小了，精度就掉；精度守住，計算量又壓不下去。多數輕量化方案都是這個 trade-off——用參數量換來的節省，最後以某種方式在準確率上償還回來。

2019 年，有一群研究者在 CVPR 發了一篇看起來有點不一樣的論文。他們說：我們不用在精度和效率之間選一個。CSPNet 這個設計，可以在**減少 20% 計算量的同時，準確率不降反升**。而且這套方法不是只適用某一種網路——ResNet、ResNeXt、DenseNet 統統可以套。

這件事到底怎麼做到的？

## 從 DenseNet 的瓶頸說起

要理解 CSPNet，先要理解它的改造對象是誰。論文最初的目標是 DenseNet，所以我們得先看一下 DenseNet 的運作邏輯哪裡出了問題。

DenseNet 的核心精神是「每一層都接收前面所有層的輸出」——所有前面的 feature maps 全部 concatenate 起來送到下一層。這在梯度傳遞和特徵重複利用上非常有效，但代價是：隨著網路變深進入dense block，每一層要處理的通道數會不斷累加，計算成本跟著膨脹。

論文作者打了個比方：就像一個學生同時被五個老師教同一個主題。一開始是有用的，視角多元，但到了某個臨界點，資訊開始大量重疊，效率反而變差。在 DenseNet 裡，越深的層收到的「老師」越多，實際上真正新的資訊卻越來越少。

這就是 CSPNet 試圖處理的問題：**不是網路不夠好，而是網路在處理的梯度資訊有太多重複**。

## 把通道從中間切開

CSPNet 的核心機制叫做「Cross Stage Partial」——跨階段分流。概念很直覺：把某層的 feature maps 在通道維度上分成兩半，一半直接跳過主要的運算瓶頸繞到輸出端，另一半才進入 dense block 處理。

假設輸入有 64 個通道，切成兩半之後，只有 32 個通道要進入複雜的卷積流程。處理完之後，再把那 32 個已處理的通道和 32 個繞過去的原始通道拼接起來，繼續往下走。

這個做法帶來兩個直接的好處：

**節省計算量**。通過 dense block 的通道數量只有原本的一半，因此瓶頸層的運算成本相應降低。

**梯度資訊多樣化**。那條繞過去的捷徑攜帶的是未經深層處理的原始特徵，梯度流到這裡時不會夾帶大量重複內容。也就是說，網路優化時收到的「教學訊號」品質更好。

這就是 CSPNet 的核心主張：**它不是從零設計一個新架構，而是提出一套可以在既有架構上執行的「改造手術」**。

## 從論文實驗數字讀出來的真相

既然它宣稱可以同時降低計算量和提升精度，數字怎麼說？

在 ImageNet 分類任務上，CSPDarknet-53 比起原始 Darknet-53，參數量從 41.57M 降到 27.61M（減少 34%），BFLOPs 從 18.57 降到 13.07（減少 30%），Top-1 精準度維持不動，Top-5 甚至略升 0.2%。

在 MS COCO 物體檢測任務上，CSPResNeXt-50 搭配 PANet-SPP 在 512×512 輸入下達到 AP50=64.6，比同尺寸的原始模型表現更好，而且推論速度維持在 44 fps（1080ti）。

如果把 CSP 改造應用到 PeleeNet（這是一個專為行動裝置設計的輕量網路），結果也很有趣：參數量只增加 1%，但計算量降低 13%，精準度還提升了 0.2%。

這些數字有幾個值得注意的地方：

第一，「減少計算」的幅度和「精度不降」之間不是線性關係，有時候計算量降了 30%，精度反而微幅上升。這說明瓶頸不只是在計算量本身，**梯度的品質才是真正的限制因素**。

第二，CSPNet 的效果在不同 backbone 上的表現差異不大——ResNet、ResNeXt、DenseNet 都有對應的 CSP 版本，而且每個版本都出現了類似的規律：計算降、精度不降或微升。這讓它看起來更像一個通用範式，而不是針對某個特定網路架構的打補丁。

## Fusion First 與 Fusion Last：拼接位置決定成敗

CSPNet 論文裡有幾種不同的實作變體，其中最核心的差異在於「兩個分支在哪裡拼接」。

**Fusion First**（拼接在 transition 之前）：把繞過分支和處理過的分支在進入 transition 層之前就拼接起來。這種做法確實能省計算，但精度掉得也明顯，論文中 PeleeNet+Fusion First 版本的準確率下降了 1.5%。

**Fusion Last**（拼接在 transition 之後）：先讓處理過的分支通過 transition 層降維，再和繞過分支拼接。因為 transition 層本來就會縮小空間維度，所以這條路徑需要對繞過分支做同樣的 downsampling 才能對齊維度。做起來更麻煩，但效果好——計算量少了 21%，精度只掉了 0.1%。

**CSPDenseNet（兩層 transition）**：這是效果最好的一種。先讓進入 dense block 的分支通過第一層 transition（只做通道維度的压缩，不做空間維度的 downsampling），處理完後再和繞過分支拼接，最後再進入第二層 transition 做空間和通道的降維。這個設計在 PeleeNet 上把計算量降低了 13%，精度還提升了 0.2%。

這個結果驗證了一件事：**節省計算不等於要犧牲精度，關鍵在於減少的是「冗餘計算」而不是「有效計算」**。

## 它為什麼能在 YOLO 系列的訓練裡扮演關鍵角色

CSPNet 真正被大量使用，是從 YOLOv4 開始。YOLOv4 的骨幹網路 CSPDarknet53 就是直接來自這篇論文。YOLOv4 能在 MS COCO 上達到當時領先的精度，同時在 1080ti 上跑出 44 fps 的速度，CSP 結構功不可沒。

背後的道理並不難理解：YOLO 是一個 single-stage 檢測器，它需要在每一個 feature map 位置預測物體的邊界框和類別。如果 backbone 的計算成本太高，整個系統的推論速度就會被拖累。當 backbone 用上了 CSP，不只骨幹網路自己變輕，整個檢測 pipeline 的負擔也跟著下降。

從那之後，CSPDarknet、CSPResNeXt、CSPPeleeNet 這類骨幹網路就成為後續 YOLO 系列（YOLOv5、YOLOv7、YOLOv8）的標準配置。**可以說 CSPNet 是目前大多數頂級 YOLO 變體的技術起點**，這個事實在某種程度上比它在 ImageNet 分類任務上的表現更能說明它的實用價值。

## 被低估的地方

CSPNet 的論文裡有一個實驗數字很少被提起：CSPPeleeNet Ref.（輕量版本）的參數量只有原始 PeleeNet 的 56%，計算量只有 44%，但 Top-1 精準度卻提升了 7.8%——從 61.1% 跳到 68.9%。

這個數字來自非常極端的通道削減（從頭到尾的通道數都減半），代表 CSP 的設計在最極限的輕量化設定下依然維持了有效的特徵表達能力，而不是像一般 model scaling 那樣直接崩潰。

也就是說，CSPNet 的貢獻不只體現在「中等程度的省力」，它在極端的省力情境下依然有效。這讓它在嵌入式系統和邊緣裝置的應用場景裡特別有意義——那些地方通常連 1% 的計算資源都計較。

## 結語

CSPNet 解決的問題框架很清晰：**減少神經網路中的梯度資訊冗餘，而不是削減網路規模本身**。這套思路在 2019 年提出時並不是主流，但後來 YOLO 系列的大規模採用證明了它的實用價值。

對工程師而言，這篇文章最重要的啟發也許是：**當你在壓縮模型的時候，不要只盯著 FLOPS 和參數量這兩個數字，更值得問的是「我砍掉的計算單元，到底有沒有在有效工作」**。CSPNet 用數字證明，有時候你省下來的 20% 計算，其實是網路本來就沒在用的冗餘。那麼與其讓它繼續拖累訓練過程，不如趁早把它拿掉。

---

## 參考連結

- [CSPNet 原始論文（arXiv:1911.11929）](https://arxiv.org/abs/1911.11929)
- [CSPNet GitHub（Darknet 實現）](https://github.com/WongKinYiu/CrossStagePartialNetworks)
- [CSPNet Paper Walkthrough: Just Better, No Tradeoffs（Towards Data Science）](https://towardsdatascience.com/cspnet-paper-walkthrough-just-better-no-tradeoff/)