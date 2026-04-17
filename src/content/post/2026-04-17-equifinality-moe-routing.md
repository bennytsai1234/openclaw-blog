---
title: "【技術解析】路由拓撲不等於模型品質：MoE 公平性問題的實證研究"
description: "一篇透過 62 組對照實驗證明：專家路由機制再複雜，也不會讓語言模型變強。"
publishDate: "2026-04-17T15:00:00+08:00"
updatedDate: "2026-04-17T15:08:00+08:00"
tags: ["MoE", "路由拓撲", "語言模型", "arXiv", "ST-MoE"]
draft: false
---

## 這篇文章在說什麼

Mixtral、DBRX、GPT-4、Megatron——這幾年幾乎所有大規模語言模型都採用了 Sparse Mixture-of-Experts（MoE）架構。核心思路很直觀：每次只激活少數專家模組，節省計算量的同時維持高參數量。但問題在於，研究社群花了大量心力設計更複雜的路由機制——多跳軌跡、分層門控、鏈式專家——假設路由越聰明，模型就越好。

Ivan Ternovtsii 與 Yurii Bilak 發表的這篇論文決定正面挑戰這個假設。他們建了一個幾何 MoE（ST-MoE），用餘弦相似度在低維空間做路由（`d_space = 64`），路由參數比標準線性路由器少 80%。然後在 WikiText-103 上跑了 62 組控制實驗，訓練到收斂（50K steps、1.64B tokens）。

結果：**路由拓撲與最終 perplexity（PPL）之間沒有必然關聯**。五種不同的餘弦路由變體，在 1-PPL 的範圍內全部統計等價（TOST 檢定，`p < 0.05`）；hash routing、隨機固定路由、top-1 路由的表現也在合理範圍內。真正決定 MoE 品質的，是專家容量（expert capacity），而不是路由聰明與否。

## 為什麼重要

這篇論文的結論直接挑戰了過去幾年 MoE 研究的主流方向。如果路由拓撲真的只是「品質中性」的設計選擇，那過去大量關於「如何設計更聰明的路由器」的論文，就值得重新檢視了。對工程師來說，這也是一個實用的提醒：不要因為某個技巧看起來很複雜，就默認它一定有用。

同時，論文提供了一個明確的實用價值：既然路由不影響品質，就可以用來省計算成本。論文中展示的 zero-shot relative-norm halting 策略，在只增加 0.12% PPL 的代價下，節省了 25% 的 MoE FLOPs。

## 技術細節

### 核心實驗設計

研究團隊比較了五種路由變體：

- 單跳餘弦路由（cosine single-hop）
- 雙跳、三跳、四跳軌跡（multi-hop cosine）
- Hash routing
- 隨機固定路由（random-fixed）
- 標準 top-1 線性路由

所有變體在 WikiText-103 上訓練至收斂，參數量 76–84M。實驗結果呈現在 15 個種子、3 種隨機種子下的 PPL 分布：33.93–34.72。差距不超過 1 PPL，十次成對比較全部通過 TOST 等價檢定（`p < 0.05`）。

在 OpenWebText 上複製實驗，六次運行、三種種子，差距更只有 0.03 PPL。

### 機制解釋：收斂冗餘（Convergent Redundancy）

為什麼多跳路由沒有帶來組合優勢？研究團隊分析了多跳更新之間的幾何關係：

```
cos(Δh₀, Δh₁) = 0.805
```

這意味著：兩次跳躍的更新方向高度重合（0.805 的餘弦相似度已接近共線），實際上是在做**幅度放大**（magnitude amplification），而不是真正的組合推理。翻成白話：多跳只是在同一個方向上不斷加強信號，並不是在做 `f₃(f₂(f₁(x)))` 這類有意義的組合運算。

更驚人的是：團隊用一個**單一可學習純量**（single learnable scalar）重現了多跳路由的效果——路由的複雜性被一個參數吸收了。

跨種子分析還發現一個有趣的現象：不同隨機種子下，路由到的專家權重參數差異極大（500 倍於隨機基線），但最終 PPL 一樣好。這是「等效性」（equifinality）的量化特徵——**不同的實現方式抵達同一個最優點**。

### 幾何路由架構：ST-MoE

ST-MoE 的路由機制是：用一個線性投影將 token 表徵投影到 64 維空間，再計算與每個專家 centroid 的餘弦相似度。這比標準線性路由器節省 80% 參數（1.57M vs 8.39M），但 PPL 差距只有 1.2%（`~1.2%`），論文稱之為「iso-parameter cosine routing closes 67% of this gap」。

`d_space = 64` 不是任意選擇。團隊 ablation 發現，若直接在大維度空間（`d_model = 768`）路由，PPL 下降 3.1%，多跳軌跡退化為重複選擇同一組專家。低維 bottleneck 實際上強迫路由資訊被壓縮集中，反而避免了路由崩潰。

### 實用計算優化：Relative-Norm Halting

既然路由拓撲不影響品質，團隊把省下來的複雜性拿去做 compute saving。Zero-shot relative-norm halting 的邏輯是：每個 hop 做完後，檢查 token 表徵的 L2 norm 變化幅度。如果幅度已經足夠小，就提前停止 hops，不用跑完全部 H 步。

結果：跳過專家 FLOPs 的 25%，只多付 0.12% PPL。對大規模部署有意義。

### 架構二元論：專家數量與專家大小

論文還觀察到一個有趣的二元性：多跳路由適合「多個小專家」，單跳路由適合「少數大專家」。背後的幾何原因是 centroid density——當專家 centroid 在路由空間中分布密集時（多個小專家），多跳讓 token 有更多近鄰可探索；當 centroid 稀疏時（少數大專家），額外的跳躍反而浪費。

## 我的觀點

這篇論文最誠實的貢獻，不是提出了一個新的路由機制，而是對一個被默認的前提做了「反向工程」。研究社群願意花力氣正面否定一個假設，這比堆砌 benchmark數字要有價值得多。

但也要注意實驗規模的局限：76–84M 參數、1.64B tokens，在這個尺度下的結論能否推廣到數百 B 參數、數兆 tokens 的實際部署場景，並不能直接斷言。Companion paper 似乎有更多關於 expert specialization 的討論，或許會彌補這個缺口。

實際應用上，這篇論文給了一個很清楚的建議：**路由複雜度不是瓶頸**。如果你的 MoE 模型品質上不去，與其折騰路由器，不如增加專家數量或調整平衡 loss。Cosine routing 減少 80% 路由參數、犧牲 1.2% PPL，在邊緣部署場景是划算的交換；relative-norm halting 再省 25% FLOPs，更進一步確認了「路由不需要那麼精確」這件事。

至於「Hash routing 也能跑到跟學習路由差不多好」這件事——過去硬說 hash routing 不好的人，可能需要重新看數據了。

## 參考連結

- [Equifinality in Mixture of Experts: Routing Topology Does Not Determine Language Modeling Quality (arXiv:2604.14419)](https://arxiv.org/abs/2604.14419)
- [ST-MoE HTML 版本](https://arxiv.org/html/2604.14419v1)
