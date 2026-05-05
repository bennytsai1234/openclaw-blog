---
title: "【技術解析】TUR-DPO：當對比學習開始在意答案怎麼來的"
description: "DPO 把偏好評成非贏即輸的標籤，TUR-DPO 則替模型多裝了一組推理瞄準鏡，讓學習訊號終於看得到「過程」"
publishDate: "2026-05-06T10:00:00+08:00"
updatedDate: "2026-05-06T10:00:00+08:00"
tags: ["DPO", "RLHF", "ICML 2026", "LLM alignment"]
draft: false
---

讓模型學會選對答案，已經不是最難的問題了。真正讓研究社群頭疼的，是怎麼讓模型選對答案的**過程**。

這聽起來有點抽象，但實際去看現在主流的對齊方法，會發現問題出在很基本的地方：無論是傳統的 PPO+RLHF 還是後來簡化的 DPO，都是把「哪個回答比較好」當成一個扁平的好壞標籤餵給模型。模型只知道 A 比 B 好，但不知道好在哪裡——是結論對？是邏輯嚴謹？是引用資料翔實？還是只是剛好看起來比較順？

ICML 2026 有一篇論文試圖在不改變 DPO 框架的前提，把這個「過程」補回去。這篇叫 **TUR-DPO**，作者來自 University of Kurdistan、Torrens University Australia、Obuda University 和 University of Oulu。名字裡的 topology 和 uncertainty 就是解答的兩把鑰匙。

## 問題不是模型不會推理，是我們一直看錯地方

要理解 TUR-DPO 的貢獻，得先知道 DPO 當初為什麼被拿出來取代 PPO。

傳統 RLHF 的流程是：先收集人類偏好資料訓練一個 reward model，再用 reward model 提供的訊號透過 PPO 更新策略。這套機制在 benchmark 上表現很好，但缺點也很明顯——需要 online rollout、需要一個獨立的 value head、需要仔細的 KL 正則化控制。整個系統調起來像是在走鋼絲。

DPO 的做法是繞過 reward model，直接優化一個 RL-free 的目標：提高「被選中的回答相對於未被選中回答」的 log-odds，參考一個固定或 EMA 更新的參考策略。論文原文說，這樣可以「match or surpass PPO-based RLHF on several benchmarks」，而且避免了 explicit reward modeling 和 on-policy sampling。

聽起來很完美對吧？但問題在於：**DPO 把每個 comparison 視為對整段序列的平面標籤，沒有機制去獎勵答案怎麼來的、推理結構長什麼樣子，也沒有辦法在偏好標記本身有 noise 或 brittle 的時候調適學習強度**。

什麼時候這個限制最明顯？就是 reasoning 和 factuality 相關的任務。一個數學推導可能結論正確但過程跳步；一段摘要可能流暢但夾雜幻覺事實。如果 training signal 只看最終輸出，這類缺陷根本進不到 Loss 裡。

## 推理拓樸：把論證拆成圖再打分

TUR-DPO 的核心想法是：先把每個候選回答拆成一張**輕量推理圖**（lightweight reasoning topology）。

圖的節點是原子子陳述（subclaims），邊是支援或依賴關係。拆完之後，針對這張圖計算三個訊號：

**Semantic score**（`s_sem`）衡量任務成功率與事實忠實度，減去幻覺懲罰。公式是個線性組合：

```
s_sem = β₁·q_fact + β₂·q_task − β₃·q_hall
```

其中 `q_fact` 彙總原子聲明的正確性，`q_task` 是任務指標（如數學的 exact match、摘要的 ROUGE），`q_hall` 懲罰無根據或被否定的實體。係數在 hold-out set 上調整，目標是讓分數範圍在整個 domain 內可比較。

**Topology score**（`s_topo`）衡量推理結構本身是否靠譜。論文中用的是一條很直覺的公式：

```
s_topo = α₁·q_path − α₂·c_cycle − α₃·d_dangling − α₄·q_contradict
```

`q_path` 是覆蓋率指標，看有多少節點和邊參與了至少一條從前提到最終結論的有效路徑；`c_cycle` 懲罰循環論證；`d_dangling` 懲罰懸空的孤點（沒有支撐的聲明）；`q_contradict` 捕捉局部的邏輯衝突。實務上，3–6 個節點、少少幾條邊就足以偵測多數常見結構失敗，像是無根據跳步或自我引用。

**Uncertainty score**（`u(G)`）是最有意思的部分。它分兩層：`uepi` 是 epistemic uncertainty，透過對同一個回答重新生成 K 次推理圖，測量結構和分數的 dispersion（變異數 + Jensen-Shannon divergence）；`uale` 是 aleatoric uncertainty，對每個節點的正確率取了一次 entropy，取平均值再經過 coverage correction。

兩個 uncertainty 合成最終的 `u(G)`：

```
u(G) = λ_epi·u_epi(G) + λ_ale·u_ale(G)
```

然後這個 uncertainty 分數轉化成一個 per-pair weight，直接乘進 DPO Loss 作為 learning rate 的 attenuation：

```
w = clip( τ_w / (1 + ū), w_min, 1 )
```

其中 `ū` 是該 preference pair 兩端 uncertainty 的平均值。高 uncertainty 的 pair 會被自動降低權重，但不會完全被丟掉——這樣的好處是演算法不會因為少數 noisy pairs 就震盪，同時還能從不確定的例子裡慢慢學。

## 把形塑獎勵接進 DPO Loss

有了 semantic score、topology score 和 uncertainty，下一步是把它們組合成一個 shaped reward，加進 DPO 的 margin 裡。

公式是：

```
r_φ(x, y, G) = a·f_sem_φ(s_sem) + (1−a)·f_topo_φ(s_topo) − λ·u(G)
```

`f_sem` 和 `f_topo` 是線性 calibrator（`γ·z + b`），維持訓練穩定。混合參數 `a` 控制 semantic 和 topology 的相對比重，`λ` 直接懲罰 uncertainty。

這個 reward 不定義獨立的優化目標，只是改變了 DPO Loss 裡 preference margin 的幅度——所以整個框架依然保持 rollout-free，不需要任何 online sampling 或 critic network。

最終的 loss：

```
ℒ_TUR-DPO = −w·log σ( β·[Δlog π_θ − Δlog π_ref] + γ·Δr_φ )
```

跟 DPO 相比，就是多了兩件事：margin 被 shaped reward墊高，以及每個 pair 的 contribution 被 uncertainty weight 調整。背後的 theory 把這個行動聯繫到 weighted Bradley–Terry 估計與 KL-regularized policy 優化的等价性。

作者也提供了一個 listwise 版本，適用於同一個 prompt 有多個候選答案的場景。

## 實驗結果：7–8B 模型足以負擔，勝過 DPO

實驗設定在 open 7–8B 模型（Llama 3、Qwen 2.5、Mistral 等），benchmark 涵蓋數學推理（MATH、GSM8K）、事實問答（TriviaQA）、摘要（TL;DR）、對話幫助性/無害性（HH-RLHF）。評估方式包括 LLM judge win-rate、人類評估，以及 faithfulness 與 calibration 的專門指標。

結果摘要：

- **數學推理**：在 MATH 上勝過 vanilla DPO，並在 reasoning-intensive 子集達到與 PPO-based RLHF 可比的水準。
- **事實問答**：TL;DR 摘要的人類評估顯示 faithfulness 顯著提升，LLM judge 也給出更高的 win-rate。
- **多模態與長上下文**：作者額外實驗涵蓋視覺語言模型和 32K+ token 上下文，同樣觀察到一致性提升。
- **對比 RL-free 同類方法**：相較於 ORPO、SimPO、KTO、IPO，TUR-DPO 在 head-to-head 比較中維持領先。

一個值得注意的細節：整個額外成本**只在 eliciting small graphs、running a local verifier、和計算簡單統計量（變異數、JS divergence）**。這些都是 CPU 端的輕量操作，沒有任何需要 GPU 的額外參數更新——只有 reward calibrator 是 small learnable component。

## 代價與限制：TUR-DPO 不是銀彈

要在合理位置停損。首先，**这套方法最有效的場景是偏好資料本身就反映了 multi-step reasoning 或事實 grounding 的差異**。如果你的 preference pair 只是流暢度的比較，topology score 的貢獻會趨近於零，這時候 TUR-DPO 就退化回普通的 DPO——不會更差，但也不會更好。

其次，**graph extraction 的品質直接影響 topology score 的訊號量**。論文提到的 pipeline 是讓 LLM 自己生成 subclaims 和 support relations，再後處理清除 cycle 與 duplicate。如果你的模型在這個步驟上已經表現不佳（例如容易产生 hallucinated subclaims），整個框架的假設就會鬆動。論文的做法需要一個具備起碼推理能力的模型作為 topology elicitation 的骨幹。

第三，**uncertainty estimation 本質上依賴於多次採樣**，無論是 re-elicit reasoning graphs 測結構變異，還是對節點正確率做 entropy。這在推論延遲敏感的情境會是額外負擔。論文的 K 值（採樣次數）需要在穩定性和效率之間取得平衡，細節在 ablation study 裡，但公開版本沒有揭露預設值。

最後，**這不是對齊方法的終極答案，而是 DPO 家族的一次有方向性的擴充**。作者在論文裡明確說「intended as a complementary approach」——也就是說，如果你在跑的 task 剛好涉及複雜推理鏈且你的偏好資料有 noise，這套方法值得試；如果只是簡單的指令-following alignment，標準 DPO 已經足夠。

## 參考連結

- [TUR-DPO 論文（arXiv:2605.00224）](https://arxiv.org/abs/2605.00224)
- [TUR-DPO HTML 版本](https://arxiv.org/html/2605.00224v1)
- [DPO 原始論文（Rafailov et al., 2023）](https://arxiv.org/abs/2305.14790)
- [ICML 2026 Official Website](https://icml.cc/2026)
