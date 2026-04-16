---
title: "【技術解析】PERA：把 LoRA 的線性結構掰成多項式，ACL 2026 找到了新的突破口"
description: "LoRA 的 Bilinear 形式只能捕捉一階相依性，PERA 在低秩因子空間直接做多項式展開，在零額外推論成本下讓微調效果追上一個更高 rank 的模型。"
publishDate: "2026-04-16T10:00:00+08:00"
updatedDate: "2026-04-16T10:15:00+08:00"
tags: ["PERA", "LoRA", "PEFT", "ACL 2026"]
draft: false
---

## 這篇文章在說什麼

2026 年 4 月，來自安徽大學與中國科學技術大學的研究團隊在 arXiv 上發表了 **PERA（Polynomial Expansion Rank Adaptation）**，並被 ACL 2026 Findings 接收。論文的核心問題並不複雜：LoRA 之所以省參數，是因為把權重更新限制成兩個低秩矩陣的乘積——但這個 Bilinear 結構本質上只能捕捉「一階」相依性，相當於用一條直線去擬合一條曲線。PERA 的解法是把多項式展開（Polynomial Expansion）直接做到低秩因子矩陣裡，讓更新矩陣也能含有二次項與交叉項，**不打開推論時的延遲，也不增加 rank 數**。

## 為什麼重要

每一個拿 Llama、Mistral 做下游任務微調的工程師，都在用 LoRA 或它的各種變體。問題在於：當任務足夠複雜時，LoRA 的表達能力就是有上限。你當然可以把 rank 從 8 加到 64，但那又回到浪費記憶體的原點。PERA 指出了一條新路：**不改變 rank，只改變「用 rank 的方式」**。在 rank=4 這種極限設定下，PERA 仍然能在 LLaMA3-8B 上維持 87.01% 的平均準確率，只比 rank=16 的巔峰低 0.37 個百分點。對資源受限的場景來說，這是實實在在的收益。

## 技術細節

### 從一階到高階

LoRA 把權重更新寫成：
```
ΔW = BA = Σᵣ bᵢ aᵢᵀ
```
這是一堆 rank-1 矩陣的線性組合，沒有任何地方能捕捉「b₁ 和 b₂ 同時活躍時會怎樣」這類高階交互。

PERA 在兩個低秩因子 **B ∈ ℝᵐˣʳ** 和 **A ∈ ℝʳˣⁿ** 上分別做二次多項式展開：

```
Poly²(B) = [bᵢ, bᵢ ⊙ bⱼ | 1 ≤ i ≤ j ≤ r]
Poly²H(A) = [aᵢ, hᵢⱼ(aᵢ ⊙ aⱼ) | 1 ≤ i ≤ j ≤ r]
ΔW = Poly²(B) · Poly²H(A)
```

其中 ⊙ 為 Hadamard 積（元素별乘法）。展開後的維度從原本的 r 變成 **2r + C(r,2)**——例如 rank=8 時變成 2×8 + 28 = 44。**矩陣乘法維度擴大了，但實際 trainable 參數只多了 Hadamard 向量 h 的 O(r²) 筆**。

### 推論零成本是怎麼做到的

關鍵在於：實作上 B̂ 和 Â 是透過**拼接（concatenation）**而非順序矩陣加法得到的，所以前向傳播只需要一次矩陣乘法，不需要多做一次 forward pass。這讓 PERA 在 RTX 5090 上的訓練記憶體和 total training time 幾乎與 LoRA 相同，卻能有更低的最終 loss（0.0425 vs DoRA 的 0.0915）。

### 理論支撐

論文同時給出了兩個分析：
1. **Rank 上界**：LoRA → W' 的 rank 上界是 r₀ + r；PERA → r₀ + 2r + C(r,2)。當 r 越大，差距越明顯。
2. **特徵利用率**：ΔW 在 LoRA 裡是 rank-1 矩陣的線性組合；在 PERA 裡變成了含有 square term `bᵢ ⊙ bⱼ` 與 cross term `aᵢ ⊙ aⱼ` 的高階形式。這解釋了為什麼 Hessian 交互強度矩陣（Figure 5）裡 PERA 的 global interaction strength 全面高於 LoRA。

### 實驗結果

論文在兩個任務上測試：

**Commonsense Reasoning（LLaMA 系列）**

| Model | Method | Avg Accuracy |
|-------|--------|-------------|
| LLaMA2-7B | LoRA | 77.61% |
| LLaMA2-7B | **PERA** | **82.61%** |
| LLaMA3-8B | LoRA | 82.80% |
| LLaMA3-8B | HiRA | 86.83% |
| LLaMA3-8B | **PERA** | **87.38%** |

值得注意的是，PERA 在 rank=4 時 LLaMA3-8B 仍達 87.01%，幾乎不亞於 rank=16 的水準，顯示出極強的低 rank 適應力。

**NLU（RoBERTa / GLUE）**

在 r=8 的公平設定下，PERA 比 LoRA 在 RoBERTa-base 上高 **+1.70%**，在 RoBERTa-large 上高 **+0.83%**，且在六個 GLUE 子任務上全面第一。

**Low-resource 情境**

只拿 10% 的 Commonsense170K 資料訓練，PERA 就有 83.07% 的平均準確率——**打敗了 LoRA 在全量資料上的 82.80%**。這個資料效率在實際專案中非常實用。

### Ablation：誰的功勞最大

| Variant | LLaMA3-8B Avg |
|---------|--------------|
| LoRA | 82.80% |
| + Square terms only | **87.48%** |
| + Cross terms only | 86.83% |
| PERA (both) | 87.38% |

Square term（也就是 x² 項）貢獻了大部分的收益，cross term 有些許幫助，但兩者疊加反而因為過度交互建模而有輕微回落。這是一個相當意外的發現。

## 我的觀點

PERA 解決的不只是「LoRA 表達能力不足」的問題，它更大的貢獻在於把「多項式特徵展開」這個在傳統機器學習裡被用爛了的想法，正確地移植到了神經網路的參數空間。過去很多 PEFT 改進（DoRA、MoRA、HiRA）都是在 LoRA 的線性框架上打補丁，PERA 是少數直接挑戰這個假設的論文。

對工程師而言，最實際的價值是：**在不改架構、不加推論成本的前提下，用同樣的記憶體預算達到更好的微調效果**。尤其是那些 rank 設在 4 或 8 這個區間的專案，PERA 的提升幅度最明顯。等官方 code 整備好之後，替換掉你的 `peft.LoLA` 或 `lora_x` 應該是值得一試的。

當然，論文目前只在 commonsense reasoning 和 GLUE 上驗證，作者也承認在算術推理或多模態生成上尚未測試。這個方向值得持續關注。

## 參考連結

- [PERA Paper (arXiv 2604.11841)](https://arxiv.org/abs/2604.11841)
- [PERA GitHub Repository](https://github.com/zhangwenhao6/PERA)
- [LoRA 原論文 (Hu et al., 2022)](https://arxiv.org/abs/2106.09685)
- [HiRA: Hadamard High-Rank Adaptation (ICLR 2025)](https://openreview.net/forum?id=TwJrTz9cRS)
