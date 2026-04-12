---
title: "【技術解析】當 AI Agent 不再聽懂你在問什麼：RAGEN-2 與推理崩潰問題"
description: "強化學習訓練多輪對話 Agent 時，模型可能出現「模板崩潰」——輸出看似流暢但完全忽略輸入內容。RAGEN-2 首次系統性研究這個問題，並提出以互信息作為早期預警訊號。"
publishDate: "2026-04-10T09:36:00+08:00"
updatedDate: "2026-04-10T09:36:00+08:00"
tags: ["AI", "強化學習", "Agent", "LLM", "研究"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-10-ragen2-reasoning-collapse.png"
  alt: "RAGEN-2: Reasoning Collapse in Agentic RL"
---

## 這篇文章在說什麼

訓練多輪對話的 LLM Agent，通常會用強化學習（RL）來優化推理鏈與行動決策。過程中，工程師習慣觀察兩個指標：任務成功率（reward）與推理多樣性（entropy）——前者代表有沒有做對，後者代表推理過程是否健康。

RAGEN-2 發現了一個**極容易被忽略的失敗模式**：模型可以在 entropy 維持高檔的情況下，悄悄停止聆聽輸入，輸出表面多樣但實質上與輸入無關的「模板化」推理。他們把這個現象稱為 **Template Collapse（模板崩潰）**。

核心問題在於：現有指標壓根測不出這件事。entropy 只測「同一個輸入下輸出有多多樣」，卻無法告訴你「輸出到底有沒有真的回應不同的輸入」。不同輸入餵進去，推理看起來各有變化，但實際上模型只是在套用一個通用模板。

## 為什麼重要

這個問題對任何正在用 RL 訓練 AI Agent 的開發者都有直接影響。

目前的做法是：觀察 reward 曲線有沒有穩定上升、entropy 有沒有不要跌太快，如果兩個都 healthy，就假設訓練順利。但 RAGEN-2 的實驗顯示，即使 MI（互信息，測輸入依賴性）已經顯著下降，任務成功率可能還在上升——代表問題已經在累積，但現有儀表板完全沒有亮紅燈。

更糟的是，Template Collapse 在多輪設定下特別容易發生：稀疏 reward 無法區分「真正回應輸入的推理」與「剛好僥倖成功的模板化推理」，而推理鏈又難以直接監督。這導致問題可以持續存在好幾百個 training iteration，Agent 表面上越做越好，實際上越來越不會真正「聽話」。

## 技術細節

### 推理質量的資訊論分解

論文把推理多樣性做了严格的數學分解：

$$H(Z) = I(X;Z) + H(Z|X)$$

- **H(Z)**：輸出的邊際 entropy（現有指標試圖追蹤的）
- **H(Z|X)**：條件 entropy，代表「同一個輸入下輸出有多多樣」
- **I(X;Z)**：互信息，代表「輸出與輸入之間的依賴程度」

問題在於 entropy-based metrics（無論是 H(Z) 還是 H(Z|X)）都完全追蹤不到 I(X;Z) 的下降。當 I(X;Z) 趨近於零時，H(Z|X) 可能仍然很高——看起來推理很多樣，但全部都是輸入無關的 boilerplate。

### MI Proxy：不靠外部模型的在線診斷

既然真正的互信息在高維 token 序列上沒有閉式解，論文提出了一套**基於 batch 交叉評分**的 MI 近似方法，稱為 MI Proxy Family。

做法是：在同一個 batch 裡，把每個推理樣本 Z 拿去對**所有**輸入 X 計算 log-likelihood，形成一個評分矩陣 L。對角線上是「Z 在它真正來源的 X 下的分數」，其他位置是「Z 在其他 X 下的分數」。兩者差距越大，代表模型輸出越能區分不同輸入，也就是 I(X;Z) 越高。

最具體的兩個 proxy：
- **Retrieval-Acc**：如果推理真的與輸入無關，從 X_i 生出來的 Z 會隨機散落在任意 X_j 上，所以正確檢索率會趨近 1/P（chance level）。實驗中可以低到 1.56%（P=64），遠低於健康狀態
- **MI-ZScore-EMA**：連續量，經過 z-score 正規化與指數移動平均，可以在 training dashboard 上直接監控

實驗中，MI family metrics 與最終任務成功率的 Spearman 相關性達到 +0.39，而 entropy metrics 是 -0.11 到 -0.14（負相關，方向完全錯誤）。

### SNR 機制：為什麼會發生模板崩潰

論文進一步用**信噪比（Signal-to-Noise Ratio, SNR）** 解釋模板崩潰的成因。

梯度可以分解為三部分：
$$g_{total} = g_{signal} + g_{task-noise} + g_{reg}$$

- **g_signal**：有意義的 reward 差異產生的任務梯度（輸入相關）
- **g_task-noise**：採樣隨機性帶來的噪聲
- **g_reg**：KL 散度 + entropy 正則化（對所有推理鏈一視同仁，與輸入無關）

關鍵觀察：
1. Task gradient 的幅度與 **within-input reward variance** 成正比——reward 差異越大，梯度越尖銳
2. g_reg 是**平的**：對所有 prompt 都一樣，完全不看輸入內容
3. 當 reward variance 低的時候，task gradient 趨近於零，但 g_reg 仍然存在——梯度更新幾乎全部由輸入無關的正則化噪聲主導

這就是為什麼低 SNR 會把推理推向模板：當任務信號消失，正則化噪聲開始把輸出拉向一個「處處通用」的方向，而且 entropy 仍然維持很高（因為正則化本來就包含 entropy bonus），所以完全瞞過了現有監控。

### SNR-Aware Filtering：解法

知道了機制，解法就很直覺：**只更新那些 reward variance 高的 prompts**。

在每個 training iteration：
1. 對每個 prompt 採樣多條軌跡，計算回報的樣本方差 Var(R|X)
2. 根據 variance 排序，只保留 top-ρ fraction（例如 ρ=0.5 就保留前一半）
3. 只在這 subset 上跑 PPO/GRPO 更新

Reward variance 高，代表同一個 prompt 下軌跡之間 reward 差異大， advantage 估計有意義，任務梯度強烈，g_reg 無法主導。Filtering 掉低 variance 的 prompt，就是去除那些 task-useless 但 regularization-active 的更新。

這個方法**不需要額外模型或額外 rollouts**，只是選擇性地忽略一部分現有的採樣結果。實驗顯示它在 Sokoban（規劃）、FrozenLake（導航）、MetaMathQA（數學推理）、WebShop（網頁導航）、DeepCoder（代碼生成）等任務上都有一致的提升，平均 +2.9% 到 +6.9% 的 task success rate，無論用 PPO、DAPO、GRPO 還是 Dr. GRPO。

## 我的觀點

這篇論文最讓我佩服的，不是提出 SNR-Aware Filtering 這個解法，而是**重新定義了「什麼是觀察 RL 訓練的健康狀態」**。

多數 RL 監控儀表板的核心邏輯是：reward 上升 + entropy 不崩 = 健康。但這個邏輯預設了「輸出多樣性等於輸出品質」，而這在多輪設定下根本是錯的。Template Collapse 的詭異之處在於：它是少數「所有現有指標都看起來正常的失敗」，累積時間長，破壞性高，工程師還以為一切順利。

SNR-Aware Filtering 的實用價值大於理論價值：它幾乎是零成本的手術刀——不改演算法，不加模型，只在 gradient update 前多做一個 ranking 和 filter，就能對抗 collapse。但我更感興趣的是 MI Proxy 本身：如果把它常駐在 training dashboard 上，能省下多少「訓了 300 steps 才發現模型已經不會聽話」的時間？

我認為這篇論文會是 2026 年 Agent 訓練領域的重要里程碑，因為它第一次用資訊理論的語言，系統性地描述了一個每個人都隱約感覺到、但沒有人好好量化的問題。

## 參考連結

- [RAGEN-2: Reasoning Collapse in Agentic RL (arXiv)](https://arxiv.org/abs/2604.06268)
- [RAGEN-2 Project Page](https://ragen-ai.github.io/v2/)
- [RAGEN-2 PDF](https://ragen-ai.github.io/v2/pdf/RAGEN-v2.pdf)
