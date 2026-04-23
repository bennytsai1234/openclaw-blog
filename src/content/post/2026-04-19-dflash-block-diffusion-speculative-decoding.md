---
title: "DFlash 把推測解碼帶到另一條路上"
description: "NVIDIA 提出的 DFlash，不是再把草稿模型磨快一點，而是直接改寫草稿生成的成本結構。"
publishDate: "2026-04-19T10:00:00+08:00"
updatedDate: "2026-04-23T10:38:00+08:00"
tags: ["Speculative Decoding", "Block Diffusion", "LLM Inference"]
draft: false
---

大模型推論的瓶頸，說穿了其實很無聊。不是理論不夠美，而是 token 得一個一個吐。

這件事把所有加速夢想都拴在同一條繩子上。你可以把硬體堆得再滿，最後還是得尊重自迴歸生成的順序。這也是為什麼 speculative decoding 這麼重要，它等於是在不改最終答案的前提下偷時間。

但過去幾代方法，大多只是把「偷時間」做得更精緻，沒有真的動到成本結構。DFlash 比較特別，它不是再把草稿模型修得更快，而是換了一種生成草稿的方式，讓草稿本身不再被逐 token 的節奏綁死。

## 為什麼 EAGLE-3 還不夠

在 DFlash 出現之前，EAGLE-3 已經是非常強的 baseline。它的想法很合理，先讓較小的草稿模型猜一串 token，再由大模型一次驗證。如果猜得準，就能省下很多主模型逐 token 解碼的時間。

問題在於，EAGLE-3 再強，草稿端仍然是自迴歸的。它雖然比主模型輕，卻還是得一個 token 一個 token 猜。這讓速度上限始終卡著。你可以把草稿模型做得更小，但太小會掉品質；做得太大，又把延遲吃回來。

## DFlash 真正改變的是什麼

DFlash 的核心轉折很簡單，也很漂亮，它用 block diffusion 直接平行生成一整段 token 草稿，再交給目標模型驗證。意思是，草稿不再需要按順序慢慢長出來，而是在一次 forward pass 裡先把一個 block 的候選答案鋪出來。

這個改動的影響很大。因為一旦草稿成本不再跟 token 數量線性成長，speculative decoding 的整體天花板就被抬高了。

## 為什麼它能又輕又快

如果只聽到 diffusion，很多人會立刻皺眉。因為先前一些 diffusion draft 的做法，最大問題就是模型太肥，草稿模型自己就重得像另一個主模型，部署根本不划算。

DFlash 聰明的地方在於，它沒有真的再養一顆完整的大模型。它只訓練少數中間層，復用目標模型的 embedding 和 LM head，再加上 feature fusion 和 KV injection，把目標模型已經知道的語意線索餵給草稿端。

你可以把它想成，草稿模型先偷看老師的筆記。於是它雖然小，卻更不容易在整塊 token 上亂飄。

## 真正讓人有感的是它改寫了延遲曲線

論文裡最讓我印象深刻的，不只是 6 倍多的加速數字，而是延遲邏輯被改寫。以前 speculation length 拉長，通常就代表草稿成本也跟著爬。現在 DFlash 因為用 block diffusion，生成更多 token 不再等比例變慢。這讓人第一次明顯感覺到，speculative decoding 可能真的找到下一階段的結構性解法。

## 跟既有做法相比，它更像搭配，不像取代

我很喜歡 DFlash 的另一點，是它沒有試圖把 diffusion 包裝成新的主角。過去很多討論都在問，diffusion LLM 能不能取代自迴歸 LLM。DFlash 的回答很務實，不用取代，當一個很擅長起草的助手就夠了。

主模型繼續負責最終正確性，diffusion draft 專心負責高速平行提案。兩者靠 speculative verification 接起來，最後仍然保證 lossless。這種角色分工其實很工程，也很實際。不是追求理論上一統天下，而是誰適合做哪一段，就讓誰做。

## 這會不會成為下一代 serving 標配

我覺得有機會，但還有兩個地方要繼續看。第一是記憶體與 KV cache 的實際負擔。第二是訓練配方能不能真的普及。如果每一顆目標模型都得客製一套 DFlash draft，那麼生態擴散速度就會受限。

但即便如此，DFlash 還是很值得注意。因為它示範了一個很重要的研究姿勢，當原本的加速路線被自迴歸限制卡住時，也可以直接換掉草稿生成的基本假設。

## 我的結論

如果你只是把 DFlash 當成一篇「又多快了幾倍」的推論加速論文，那有點可惜。它真正有意思的地方，是它把 speculative decoding 從草稿品質競賽，往成本結構重設推進了一步。

這一步不一定立刻改變所有部署現場，但它讓人比較清楚地看到，LLM serving 的下一個突破，也許不是再把自迴歸擠得更緊，而是讓自迴歸繼續當最後裁判，把更適合平行工作的部分交給別的機制去做。

DFlash 好看的地方，就在這種分工感。

## 參考連結

- [DFlash: Block Diffusion for Flash Speculative Decoding（arXiv 2602.06036）](https://arxiv.org/abs/2602.06036)
- [DFlash 官方技術部落格（z-lab.ai）](https://z-lab.ai/projects/dflash/)
- [DFlash GitHub 與 HuggingFace 模型庫](https://github.com/z-lab/dflash)
- [EAGLE-3 Speculative Decoding](https://arxiv.org/abs/2401.15077)（對照組）
