---
title: "【技術解析】DFlash：區塊擴散如何讓 LLM 推論加速 6 倍"
description: "NVIDIA z-lab 發表的 DFlash 用輕量區塊擴散模型取代自迴歸草稿生成，在 Qwen3-8B 上實現無損 6 倍加速，領先 EAGLE-3 達 2.5 倍。"
publishDate: "2026-04-19T10:00:00+08:00"
updatedDate: "2026-04-19T10:00:00+08:00"
tags: ["Speculative Decoding", "Block Diffusion", "LLM Inference"]
draft: false
---

## 這篇文章在說什麼

LLM 推論有個根本瓶頸：token 必須一個接一個依序生成，無論 GPU 算力多強，電路圖就是長這樣。Speculative Decoding（推測解碼）是目前最廣泛採用的繞路方法——讓一個小模型先快速猜測下一串 token，再讓大模型一口氣驗證。但 State-of-the-art 的 EAGLE-3 仍然是自迴歸的：雖然「猜測」比大模型快，卻仍然是一個 token、一個 token 順序產生，latency 上限卡在 2–3 倍。

NVIDIA z-lab 的研究團隊（Jian Chen、Yesheng Liang、Zhijian Liu）在 2026 年 2 月發表的 [DFlash](https://arxiv.org/abs/2602.06036)，用一個關鍵洞察翻轉了這個限制：**讓擴散模型（diffusion model）在單一 forward pass 裡平行預測一整個 block 的 token**，再交給目標模型做一次性驗證。實驗結果：在 Qwen3-8B 上實現 **6.17 倍無損加速**，比 EAGLE-3 高出 2.5 倍。

## 背景脈絡

在 DFlash 出現之前，Speculative Decoding 的演进经历了两个阶段。第一代方法用小模型逐 token 猜測，大模型驗證，代表是 Medusa 和後續的 Hydra；第二代則在驗證機制上優化，EAGLE 系列是其中的翹楚，特別是 EAGLE-3 透過 target conditioning 顯著提升了 acceptance rate。

**但所有這些方法都有一個共同的限制**：無論草稿模型多小，自迴歸的本質決定了草稿成本隨 token 數線性成長。這讓 EAGLE-3 不得不採用極淺的架構——僅用單層 transformer——來控制延遲，代價是草稿質量受限。

同時，擴散模型用於 LLM 生成並非新想法。Google 的 [DiffuSpec](https://arxiv.org/abs/2510.02358) 和 [SpecDiff-2](https://arxiv.org/abs/2511.00606) 都嘗試過，但這些方法使用的草稿模型高達 7B 參數，遠超目標模型本身的規模，實際 serving 成本過高。

業界卡在這裡：**自迴歸草稿 quality 與 speed 無法兼顧，擴散草稿規模又太肥**。

## 為什麼重要

DFlash 的意義在於它**同時解決了三個問題**：

第一，它讓草稿生成擺脫了「每多一個 token 就多一份延遲」的成本結構。Block diffusion 在單次 forward pass 裡生成固定數量的 token，無論是 8 個還是 16 個，latency 幾乎不變。

第二，它用一個**極輕量的 diffusion model** 做到了高 acceptance rate，沒有規模的問題。草稿模型只需要訓練 few intermediate layers，復用了目標模型的 embedding 和 LM head，訓練代價極低。

第三，它是真正意義上的**lossless 加速**：輸出品質由目標 LLM 背書，speculative decoding 的驗證機制保証最終結果與自迴歸解碼完全一致，沒有任何近似誤差。

對於實際提供 LLM 服務的團隊，這直接轉化為：**相同的 GPU 硬體，支撐 2–6 倍的並發請求量**。在 GPU 算力昂貴、需求持續成長的現在，這幾乎是必看的優化方向。

## 技術細節

DFlash 的核心設計有三個模塊：

**Feature Fusion：** 在 prefill 或驗證完成後，從目標模型的多層 hidden features 均勻取樣，經過輕量 projection 融合後，提取出蘊含「目標模型已經知道未來 token 輪廓」的語意特徵。

**KV Injection：** 這是 DFlash 與 EAGLE-3 的關鍵差異。EAGLE-3 只在第一層注入 target features，訊號隨層數遞減；DFlash 把融合後的特徵直接注入**每一層**的 Key/Value projections，並存入 KV cache。這讓草稿模型的每一層都能持續獲得目標模型的深層語意指導，acceptance length 得以隨模型深度 scale。

**Parallel Drafting：** 有了 rich context 之後，草稿模型在單次 forward pass 中用 block diffusion 預測下一個 block（block size = 16）的 token。這是純並行的，latency 與 block 內的 token 數量無關。

草稿模型只訓練 few intermediate layers，復用目標模型的 embedding 與 LM head，參數量極小。實際上 DFlash 的 draft model 遠小於目標模型，卻能產生 16 個 token 的高質量草稿。

論文中在 Qwen3-8B + DFlash（block size = 16）上測試貪心解碼（temperature=0），結果涵蓋 GSM8K、Math500、AIME24、AIME25、HumanEval、MBPP、LiveCodeBench、SWE-Bench、MT-Bench 等多個 benchmarks，最高加速來到 **6.17×**，全面領先 EAGLE-3（最高 2.48×）。在 sampling 模式（temperature=1）和 thinking mode 下也有約 4.5× 的穩定加速。

DFlash 目前支援 SGLang（production serving）、Transformers（Hugging Face 生態）、vLLM（nightly build）和 MLX（Apple Silicon），覆蓋了主流推論框架。已在 HuggingFace 上開放大模型對應的 draft model：Qwen3-8B、Qwen3.5-27B、Qwen3-Coder-30B-A3B、LLaMA-3.1-8B-Instruct 等。

## 跟既有做法相比

這裡用 EAGLE-3 作為主要對照組，因為它正是 DFlash 論文裡的 benchmark baseline。

**架構上的根本差異**：EAGLE-3 是單層自迴歸草稿，latency 隨 speculation length 線性成長；DFlash 是多層 block diffusion 草稿，latency 幾乎不隨 block size 成長。論文的關鍵實驗證明了這點：DFlash 生成 16 個 token 的延遲，反而比 EAGLE-3 生成 8 個 token 還低——更深、更多 token，延遲反而更少。

**Quality vs. Quantity 的取捨**：EAGLE-3 因為淺架構的先天限制，每個草稿 token 的正確率必須極高（否則浪費），這讓它在數學推理等需要精確長程邏輯的任務上表現較差；DFlash 的深層架構讓每個草稿 token 的語意品質更高，加上 block-level 的驗證機制，即使 acceptance rate 略低，overall speedup 仍然更高。

**規模與通用性的取捨**：DiffuSpec 等方法用 7B 擴散草稿，必須同時承擔訓練與 serving 的龐大計算成本；DFlash 的草稿模型極輕（相當於只在目標模型骨架上長了幾層 projection），部署成本幾乎可以忽略。

當然，代價也是有的：DFlash 需要對每個目標模型各自訓練對應的 draft model，目前開源的 draft model 數量仍有限。但論文提到即將開源訓練配方，讓大家能為自己的模型訓練 DFlash draft——這會是個重要的里程碑。

## 我的觀點

DFlash 之所以讓我注意，不只是那個 6.17× 的數字，而是它**重新框架了 diffusion model 在 LLM 生態中的角色**。過去的討論是「diffusion LLM 能不能打敗自迴歸 LLM」，答案幾乎都是「不能」；DFlash 的做法是：既然打不過，就不要比了，讓 diffusion model 當助教，讓自迴歸 LLM 當教授，術業有專攻。

這個思路的優雅之處在於它不試圖用一個模型解決所有問題，而是利用 speculative decoding 本身的驗證機制來保証輸出品質，同時把生成速度的瓶頸外包給一個專門優化過的 diffusion block。Lossless 這件事因此變得代價極低。

有幾個細節值得工程師持續關注：KV injection 機制在實際 serving 時的 memory overhead（論文假設 KV cache 代價由目標模型吸收，但 production 環境中如果 target + draft 共同佔用有限的 KV cache，是否會有衝突？）；以及即將開源的訓練配方能否讓一般團隊在合理時間內煉出自己的 draft model。

如果這兩個問題有滿意的答案，DFlash 的框架很可能會成為下一代 LLM serving 的標準底層之一。

## 參考連結

- [DFlash: Block Diffusion for Flash Speculative Decoding（arXiv 2602.06036）](https://arxiv.org/abs/2602.06036)
- [DFlash 官方技術部落格（z-lab.ai）](https://z-lab.ai/projects/dflash/)
- [DFlash GitHub 與 HuggingFace 模型庫](https://github.com/z-lab/dflash)
- [EAGLE-3 Speculative Decoding](https://arxiv.org/abs/2401.15077)（對照組）
