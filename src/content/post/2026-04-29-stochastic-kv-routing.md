---
title: "【技術解析】模型會壓縮訓練資料，卻管不好一個 Token 的快取：Apple 的隨機跨層注意力"
description: "Apple 團隊提出 R-CLA 訓練方法，讓模型在推理時能跨層共享 KV 快取，硬體支援度再低都不至於崩潰。"
publishDate: "2026-04-29T15:00:00+08:00"
updatedDate: "2026-04-29T15:00:00+08:00"
tags: ["Apple", "LLM", "KV Cache", "Inference Optimization", "Transformer"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-29-stochastic-kv-routing.png"
  alt: "模型會壓縮訓練資料，卻管不好一個 Token 的快取：Apple 的隨機跨層注意力"
---

你有沒有想過一件事：語言模型號稱是「資料壓縮機器」，可以把幾兆筆文字壓進幾十億個參數裡，但推理的時候，光是一個 Token 的 KV 快取就可以吃掉 512 KB 的 GPU 記憶體。

512 KB 是什麼概念？Llama-2-7B 的權重大小大約是 14 GB。如果把《愛丽丝梦游仙境》這本書的全部上下文快取起來，記憶體用量會來到約 20 GB——幾乎等於模型本身的重量。這就是為什麼很多人說 KV cache 是 LLM 推理最大的隱形成本：模型把訓練資料壓得極小，卻在執行階段把那麼多張浮點數表全部保留在記憶體裡，而且每生成一個新 Token 都要從記憶體裡面載入一次。

這個問題現在主流的處理方式，是沿著**時間軸**做快取淘汰：H2O、SnapKV、PyramidKV、CAKE……這些方法各有巧妙之處，但它們都有一個共同的弱點——**查詢依賴（query-dependent）**。現在覺得這個 Token 不重要，說不定下一個問題就很重要了，於是你得要動態重算，否則就要承擔幻覺的風險。而且這些方法在 prefill 階段的峰值記憶體用量，其實根本沒有減少。

沿著另一條軸——**深度軸**——做優化的方法，長期以來比較少人注意。研究者早就提出層與層之間有高度冗餘，整組 KV 快取每層都存一份，其實不太必要。但要實際做到跨層共享，目前有兩種做法都不太行：一種需要多加一個 encoder 來維護統一的 KV 集合，導致每次更新快取都要跑一整個前向傳播，運算代價太高；另一種是在推論時靠估算上層輸出來繞過這個問題，代價則是拖慢了 prefill 的速度。

**那有沒有辦法在訓練階段就把「某層可以偷用別層的 KV」這件事學會，讓模型在部署時完全不吃力？**

Apple 的四名研究者——Filippova、Grangier、Cuturi、Monteiro——在四月提出來的論文 [Stochastic KV Routing: Enabling Adaptive Depth-Wise Cache Sharing](https://arxiv.org/abs/2604.22782)，就是在回答這個問題。做法乾脆到有點令人意外：**在訓練時，讓每一層隨機決定這次到底要用自己的 KV，還是用前一層的 KV**。就這樣。

## 訓練時的隨機跨層注意力（R-CLA）

具體來說：對於第 $l$ 層，在每一次前向傳播時，以機率 $p$ 正常使用自己的 KV 狀態（即 $l' = l$）；以機率 $1-p$ 強制去取用某一個隨機選擇的前層 $l'$（其中 $l' < l$）的 KV 狀態。這個隨機過程模擬的是「快取被犧牲掉」的結構層級故障，迫使模型在訓練時就學會「就算拿不到自己的 KV，從前層那邊還是可以拿到有用的語意資訊」。

論文把這個方法叫做 **R-CLA（Random Cross-Layer Attention）**。

這個隨機策略有一個關鍵的好處：訓練完成之後，模型對於**多種不同的快取共享策略**都有一定的穩健性。你可以在部署的時候動態決定要快取多少層——保留 50% 可以跑，保留 25% 也可以跑，模型都見過這種狀況。同一個模型，高端 GPU 集群全量快取能跑，邊緣裝置只保留四分之一層也能跑，不需要針對不同硬體訓練不同的版本。

研究者也觀察到一個饒有趣味的副作用：對於較大的模型，以及資料相對受限的訓練場景，這個隨機干擾的過程反而類似一種**正規化（regularization）**效果。很多任務上，R-CLA 版本在全量快取時的表現不輸基線模型，甚至還更好。

## 與既有做法比較

目前主流的 KV 快取優化研究方向有三：

**時間軸淘汰**——H2O、FastGen 這類方法在生成過程中動態丟棄覺得不重要的 Token，但 prefill 階段的峰值記憶體並沒有減少；且 Token 的重要性會隨查詢不同而改變，動態淘汰決策始終是個困難問題。

**架構改進**——MQA、GQA 在同一層內部讓多個 query head 共享同一組 KV，讓 Llama-2-7B 從 512 KB/token 降到 Llama-3-8B 的 128 KB/token；Qwen3-8B 靠 GQA 進一步壓到 144 KB/token。CLA（Cross-Layer Attention）則讓相鄰的兩層共享一組 KV，但仍然需要 decoder 端的支撐才能正常工作。

**深度軸共享（這篇）**——R-CLA 在訓練階段解決了跨層 KV 共享的核心瓶頸，不再需要 decoder 或 multiple forward pass，部署彈性大幅提升。

比較值得注意的是，R-CLA 提出的 depth-wise 優化與時間軸淘汰是**正交**的，兩條路可以同時走。

## 數據說了什麼

論文報告的實驗涵蓋預訓練與微調兩個階段，測試了 Llama 系列與 Qwen 系列多個模型。在保留 25% 層快取（即只快取每四層中的第一層）的設定下，R-CLA 微調版本的 Question-Answer F1 分數明顯優於原始模型直接套用相同快取策略的版本，後者在此設定下幾乎崩潰。這種差距在 50% 保留率時同樣存在，但幅度收窄。

額外的發現是：較大的模型在 R-CLA 訓練下，不只不妨礙效能，還常出現全量快取時分數比基線高一點的情況。作者認為這是隨機 KV 借用帶來的正規化效益——有點像 dropout，只是作用的對象是 KV 狀態而非權重。

## 這件事值得在意嗎

如果你對 LLM 推理部署有實際接觸，這個研究方向應該會讓你停一下。

目前業界對 KV cache 的處理方式，幾乎一面倒向時間軸方向的淘汰與壓縮。depth-wise 的視角長期被忽略，主要是因為「模型訓練的時候從來沒想過有人會這樣用它」——所以只要真的用到別層的 KV，模型表現就會快速退化。R-CLA 直接在訓練階段補上這塊，邏輯上乾淨，實驗數據也支援。

但也有幾件事值得觀察。第一，R-CLA 目前只在「只取前一層 KV」這類相對保守的共享策略上驗證，實際上如果想更 aggressive 地把同一組 KV 廣播給更多層，模型的穩健性還需要更多 study。第二，R-CLA 對預訓練成本有一定影響——每次前向傳播時有隨機的注意力來源切換，這會改變梯度更新的方向，完全平等的層級訓練是否能完全對等於原始預訓練，這件事尚未被充分討論。

最後，這個方向或許也會對硬體設計產生影響：當快取可以更動態地在層級之間共享，記憶體子系統的頻寬分配策略也需要對應調整，才能真正把 depth-wise 共享的延遲優勢吃進去。

整體來說，這是一篇提出乾淨、簡單、部署彈性極高的論文。R-CLA 本身不是什麼複雜的機制，卻有效解決了 depth-wise cache sharing 長期以來卡在部署端的問題。如果你的推理基礎建設有興趣探索 KV cache 優化的下一個維度，這篇值得放在讀書清單的前面。

## 參考連結

- [Stochastic KV Routing: Enabling Adaptive Depth-Wise Cache Sharing (arXiv:2604.22782)](https://arxiv.org/abs/2604.22782)
- [Random Cross-Layer Attention Training (R-CLA) – Apple](https://arxiv.org/html/2604.22782v1)
- [TokenBurn 摘要報導](https://www.tokenburn.fyi/article/stochastic-kv-routing-enabling-adaptive-depth-wise-cache-sharing)
- [PyramidKV: Automatic KV Cache Compression](https://arxiv.org/abs/2604.22067)
- [H2O: Heavy-Hitter Oracle for Efficient KV Cache Eviction](https://arxiv.org/abs/2604.22067)
- [Grouped-Query Attention (GQA)](https://arxiv.org/abs/2307.03223)