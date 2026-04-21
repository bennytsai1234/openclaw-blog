---
title: "【技術解析】你的 Logits 比你以為的知道的更多：Apple ML Research 揭露視覺語言模型的資訊洩漏風險"
description: "Apple ML Research 最新研究發現，即便只是模型輸出的 top-k logits，都可能洩漏任務無關的影像資訊——這對模型部署與資安政策有深遠影響。"
publishDate: "2026-04-21T15:00:00+08:00"
updatedDate: "2026-04-21T15:00:00+08:00"
tags: ["資訊洩漏", "模型可解釋性", "視覺語言模型", "Probing"]
draft: false
---

## 這篇文章在說什麼

Apple ML Research 在 2026 年 4 月發表的論文《What Do Your Logits Know?》系統性地探討了一個核心問題：當視覺語言模型（VLM）對一張圖片提問時，模型的最終輸出（logits）究竟保留了圖片中多少資訊？

研究團隊以 CLEVR 合成資料集（可控場景，含立方體、球體、圓柱體與多種屬性：尺寸、材質、顏色）進行實驗。他們向模型輸入如「Is there a blue sphere in the image? Reply in one word」的二元封閉式問題，並檢查模型在各個壓縮階段——殘差流（residual stream）、tuned lens 投影、最終 top-k logits——中，能夠解碼出哪些圖片屬性。

結果發現：即便是最容易被取得的 top-2 logits（即「Yes」與「No」對應的兩個 logit 值），都能可靠地解碼出任務無關的資訊——包括查詢中從未提及的目標屬性（如只問「藍色球體」卻能從 logits 解碼出該球體的「材質」與「尺寸」），以及背景物體的屬性。在某些設定下，這種洩漏量甚至與完整殘差流的投影相當。

---

## 背景脈絡

理解這件事，得從「資訊瓶頸原則」（Information Bottleneck, IB）說起。IB 原則認為：一個好的表示（representation）應當只保留對預測目標相關的資訊，而丟棄所有無關的變異。在理想的壓縮下，模型應該逐步丟棄「不相關」的資訊，只在最終輸出留下答案。

然而，既往的 probing 研究早已顯示，語言模型的殘差流編碼了遠比最終答案豐富得多的資訊——包括事實知識、句法結構，甚至在模型產生幻覺（hallucination）時，部分 layer 的 hidden state 仍藏有正確答案。這些發現暗示：transformer 的殘差連接（residual connections）其實抑制了資訊的壓縮，使得大量「無關」資訊一路傳遞到最後。

問題在於：這些多餘的資訊究竟在哪個階段才被丟棄？最終抵達 logit space 之後，還剩下多少殘留？

---

## 為什麼重要

這項研究的價值有三個層面：

**對模型部署者而言**：如果只是提供模型 API、只讓使用者取得最終 logits，都可能已經構成資訊洩漏漏洞。攻擊者可以透過重複採樣（repeated sampling）或設計特定 prompt，逐步還原模型內部編碼的圖片屬性——而這些資訊從未出現在模型回覆的文字中。

**對模型可解釋性研究者而言**：top-k logits 中殘存的任務無關資訊，提供了一個新的窗口，幫助理解模型的偏置與幻覺來源。這是比查看 hidden states 更容易取得的信號。

**對資安與監管政策而言**：論文中展示的「logit 洩漏」意味著，目前許多廠商提供的「只有最終輸出」的 API 服務模式，其實並未真正隔離敏感資訊。這對合規（如 GDPR、AI Act）和企業資安框架有直接衝擊。

---

## 技術細節

研究使用三個主流 VLM 作為測試對象：**Qwen3-VL-8B-Instruct**、**Llama-3.2-11B-Vision-Instruct** 與 **LLaVA-Next**，並在 CLEVR 合成資料集上產生 2,400 張圖片（每張含 3–10 個物件），各有正例與負例查詢。

研究者訓練了三類 probing classifier（均為神經網路），從不同的「表示層級」解碼圖片屬性：

| 表示層級 | 說明 |
|---|---|
| Hidden States（殘差流） | 各層殘差向量，維度最高 |
| Tuned Lens | 學習過的仿射變換，將殘差流投影到 logit 空間 |
| Final Top-k Logits | 模型輸出層的 top-k logit 值，k 可變 |

CLEVR 資料集的優點在於，每張圖片包含多屬性可控的物件，能清楚區分「任務相關」與「任務無關」的資訊——例如問「有沒有藍色球體」時，藍色與球形是決策相關，但球體的「材質」與「尺寸」在查詢中從未提及，屬於任務無關。

三種 corruption 等級（Gaussian blur、Motion blur、Glass blur）用來測試模型決策的穩健性。

---

## 跟既有做法相比

既有的 logit lens 與 tuned lens 方法，已被用來展示 LLM 輸出可以解碼出「被明確指示不要透露」的事實。然而這些攻擊都需要取得模型內部 hidden states 或 intermediate projections，屬於白盒或灰盒攻擊。

本論文的新發現在於：**最終輸出的 logits（即最容易被取得的 API 回傳值）本身，已足以進行資訊洩漏攻擊**。這比之前的 logit lens 攻擊更輕量——攻擊者無需取得模型內部狀態，只需要反覆查詢並收集 logit 值。

對比維度：

| 攻擊方式 | 所需存取層級 | 取得難度 |
|---|---|---|
| Tuned Lens 攻擊 | 中間層投影 | 需要白盒存取 |
| Logit Lens 攻擊 | 各層 pseudo-logits | 需要白盒存取 |
| **Top-k Logits 洩漏（本論文）** | **最終輸出 logits** | **黑盒 API 即可** |

此外，研究也發現 tuned lens 與 final logits 兩者在洩漏「目標相關資訊」上的程度相當，但 tuned lens 會洩漏更多的「背景無關資訊」——這是因為 tuned lens 是全殘差流的投影，而 final logits 僅取了與回答最相關的前 k 個維度。

---

## 我的觀點

這篇論文的核心貢獻，不是提出新的攻擊手法，而是用系統性的實驗，確認了一件許多研究者懷疑但未充分量化的現象：**模型的「答案」並非最小資訊瓶頸**。

對開發者的啟發是：如果你在建構涉及影像輸入的 AI 應用，千萬不要以為「不把模型的 hidden states 暴露出去」就等於安全。即便是看似無害的 top logits，在反覆查詢下都可以重構出圖片中的任務無關屬性。

一個被低估的觀察是：**這種洩漏在非零溫度（non-zero temperature）生成時會更嚴重**。因為 top logits 中的資訊會以非確定性方式影響最終 token 的採樣——這意味著幻覺（hallucination）與資訊洩漏，可能共享同一個根本機制。

一個值得深思的方向：如果資訊在最終 logit 層都無法被充分壓縮，那麼我們到底應該要求模型「學會忽略」哪些資訊，還是應該從架構層面重新設計這種壓縮的機制？這是 IB 原則在大型 transformer 時代尚未解決的根本問題。

---

## 參考連結

- [原文：What Do Your Logits Know? (Apple ML Research, arXiv:2604.09885)](https://arxiv.org/abs/2604.09885)
- [論文 HTML 版本（含附錄）](https://arxiv.org/html/2604.09885v1)
- [Apple ML Research 官方頁面](https://machinelearning.apple.com/research/what-do-your-logits-know)
- [Tuned Lens (Belrose et al., 2023)](https://arxiv.org/abs/2310.18181)
- [CLEVR 資料集原文](https://arxiv.org/abs/1612.05090)
