---
title: "【技術解析】為什麼「想過再回答」不夠：Deliberative Alignment 的新發現"
description: "研究發現即使模型學會推理安全原則，藏在基底模型裡的不安全行為依然會洩漏。學者提出 Latent Space Attribution 方法，在推理時把這些行為揪出來，平均攻擊成功率下降超過 30%。"
publishDate: "2026-04-14T15:00:00+08:00"
updatedDate: "2026-04-14T15:40:00+08:00"
tags: ["Deliberative Alignment", "LLM Safety", "Inference-Time", "Alignment", "arXiv"]
draft: false
---

## 這篇文章在說什麼

2025 年，OpenAI 在 o 系列模型上驗證了一個思路：與其直接訓練模型「不要做某件事」，不如讓模型先把安全原則想一遍，再決定要不要回答。他們把這個方法叫做 *Deliberative Alignment*——翻成白話就是「先想清楚後再說不」。

這聽起來很合理。模型既然能在複雜數學題上做 CoT（Chain-of-Thought），為什麼不能同樣在安全議題上來一段推理？OpenAI 的實驗也確實顯示，這種訓練出來的模型比傳統的 Refusal Training（直接餵「這個不行，那個可以」的範例）更能泛化到從沒見過的攻擊方式。

但是，馬里蘭大學與斯里蘭卡資訊學院的研究者最近上傳了一篇論文（arXiv:2604.09665，現正審查於 COLM 2026），對這個假設做了系統性的壓力測試。他們的結論不那麼樂觀：**模型學會了「想」安全原則，不等於它真正把那些原則內化了；不安全行為可以躲在基底模型裡，繼續在推理鍊之外洩漏出來。**

## 為什麼重要

對任何在 production 環境部署 LLM 的人來說，這件事直接關係到系統到底有多安全。

現有兩種主流安全訓練路线：傳統 Refusal Training 像是背口徑，面對從沒見過的 prompt 就破功；Deliberative Alignment 像是教模型自己判斷，理論上更有擴展性。但如果後者只是「更會包裝答案」，那麼越複雜的推理模型反而越危險——它在說服人類這段推理很靠譜，實際上unsafe 輸出照樣輸出。

研究者提出另一個更根本的問題：不只是「會不會想」，而是「想了之後， unsafe 的東西藏在哪裡」。

## 技術細節

### 訓練流程（Deliberative Alignment 原始框架）

1. 先用一個更強的 reasoning LLM（例如 o1），對每個危險 prompt 生成一條 safety reasoning CoT + 拒絕回答
2. 過濾掉低質量樣本後，用這些 CoT + Refusal 來 instruction-tune 一個普通 LLM
3. 最後再做一輪 RL（例如 PPO）

這套流程的目標是：學生模型不只學會「什麼情況要拒絕」，更學會「為什麼要拒絕」——所以遇到新穎的 prompt 也能推理。

### 研究者的新發現

**發現一：Alignment Gap 存在**
即使教師模型（teacher）比學生模型（student）大很多，學生在安全與通用能力上仍然落後教師。這不意外，但研究者量化了這個差距。

**發現二：Unsafe 行為藏在基底模型裡**
這是核心。他們把一個經過 Deliberative Alignment 的模型，和它的原始 base model（訓練前的版本）做 latent space 對比，發現：**即使經過了 reasoning distillation，模型依然繼承了 base model 內的 unsafe activation pattern**。翻成白話：模型「會想安全」和「底層真的安全」是兩回事。

**發現三：BoN + Latent Space Attribution 方法**

研究者基於這個觀察，提出了一套 Best-of-N（BoN）抽樣 + Latent Space Attribution 的補救方法：

- 對同一個 prompt 生成 N 個候選 response
- 在 latent space 裡測量這 N 個 response 與 base model unsafe 行為分佈的「距離」
- 距離越近 = 越可能是 unsafe behavior 殘留 → 打較低分
- 最後選總分最高的回答

結果（横跨 7 個 teacher 模型、6 個不同大小與架構的 student 模型）：

| Benchmark | 平均攻擊成功率（ASR）下降幅度 |
|---|---|
| DAN | **28.2%** |
| WildJailbreak | **31.3%** |
| StrongREJECT | **35.4%** |

更關鍵的是：這些安全提升在後續 RL 訓練後依然保持，代表這不是暫時的捷徑，而是真正改善了模型的內在安全特性。

## 我的觀點

這篇論文最值得關注的不是那 30% 的 ASR 下降數字，而是它重新框架了問題：**安全對齊的挑戰不只是「怎麼訓練」，更是「不安全到底藏在哪一層」。**

過去幾年，社群花了大量精力在 training-time 做對齊（RLHF、DPO、Refusal Training、Deliberative Alignment），但 inference-time 的 safety 在實際部署中往往更關鍵——模型在用的時候是靜態的，但威脅是動態的。這篇論文把 latent space attribution 這個工具引進來，意味著未來的安全系統可能是「training + inference 雙層把關」，而不只是訓練時盡量做好。

當然，這等於是對目前主流的「training-time safety」方案開了第一槍。Anthropic 提出的 Constitutional AI、OpenAI 的 Deliberative Alignment，這些看起來優雅的方案都被證明在 base model latent space 層面有漏洞。對 AI 安全研究者來說，這打開了一個新的研究維度；對 deployment 工程師來說，這提醒我們：**模型上線後的 inference-time guardrail 跟 training-time 對齊一樣重要，不能只靠其中一個。**

## 參考連結

- [Deliberative Alignment is Deep, but Uncertainty Remains (arXiv:2604.09665)](https://arxiv.org/abs/2604.09665)
- [Deliberative Alignment: Reasoning Enables Safer Language Models (OpenAI)](https://openai.com/index/deliberative-alignment/)
- [Paper Github Repository](https://pankayaraj.github.io/)
