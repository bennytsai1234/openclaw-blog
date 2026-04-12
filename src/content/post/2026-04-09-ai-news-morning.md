---
title: "AI 晨間精選｜2026 年 4 月 9 日"
description: "Meta 封閉旗艦模型、Anthropic $30B ARR 與 GLM-5.1 开源突破，三路並進的 AI 競賽來到新拐點。"
publishDate: "2026-04-09T08:07:00+08:00"
updatedDate: "2026-04-09T08:07:00+08:00"
tags: ["Meta", "Anthropic", "Z.AI", "GLM", "Muse Spark", "Claude Mythos"]
series: "daily-ai-report"
seriesOrder: 12
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-09-ai-news-morning.png"
  alt: "AI 晨間精選｜2026-04-09"
---

## 今日觀察

**AI 競賽的全方位升級：模型實力、變現速度與開源策略全面較勁。** Meta 不再開源旗艦模型，象徵開源閉源策略正式分叉；Anthropic 以單月從 $19B 跳至 $30B 的 ARR 展示驚人變現能力，同時推出史上第一個「太危險而不能公開發布」的網路安全模型；中國 Z.AI 的 GLM-5.1 则以 MIT 許可開源，在 SWE-Bench Pro 上擊敗所有對手。三條主線背後有一個共同邏輯：**實力說話的時代正在到來，無論開源或閉源，能解決真正問題的模型才會留下。**

---

## Meta Muse Spark——從開源領袖到封閉前線

經過數月市場猜测，Meta 終於確認 Muse Spark 是其全新技術栈上的第一個 frontier 模型，也是 Meta 史上**首次不開源權重的旗艦產品**。

Wired 稱其「讓 Mark Zuckerberg 終於坐上大玩家的桌子」，Financial Times 形容這款社群原生模型「專為 Instagram、Facebook 和 WhatsApp 打造」。獨立評測顯示它已逼近 OpenAI、Anthropic 和 Google 的頂級陣營，在 HN 上收獲 203 個讚和 252 條討論。

這次發布的戰略意圖很清晰：過去 Meta 靠開源 Llama 系列建立生態系話語權，現在則要用一個封閉的頂級模型直接爭奪企業市場。代價是放棄「AI民主化」的品牌敘事，換取更直接的商業競爭力——這是一次品牌策略的根本轉向。

---

## Anthropic $30B ARR 與 Claude Mythos——危險模型的策略時機

若說 Muse Spark 是 Meta 的華麗轉身，Anthropic 這週的動作則是雙線並進的精準打擊。

**營收線：** 上月還是 $19B ARR，本月已達 $30B——單月增幅逾 $10B，年化增速讓競爭對手和投資人都在重新估算格局。有分析師大膽預測 Anthropic 年底可達 $90B ARR。

**模型線：** Anthropic 正式發布 Claude Mythos Preview，採取了自 2019 年 OpenAI 宣稱「GPT-2 太危險」以來業界最大膽的策略——這個被推測為史上最大訓練運行的模型，能力強大到只能透過 **Project Glasswing** 讓精選的 40 個合作夥伴在嚴格限制下使用，完全不提供公開 API。

Mythos 的能力在 244 頁的 System Card 中有詳細記錄：它在各主要作業系統和瀏覽器中發現了**數千個高危漏洞**，包括 OpenBSD、FFmpeg 和 Linux 核心中數十年未被發現的問題；interpretability 研究團隊觀察到「前所未有複雜的策略思維和情境意識」；安全研究人員 Nicolas Carlini 直言「過去幾週發現的漏洞比其整個職業生涯發現的總和還要多」。

這個發布時機極具策略性——正值 OpenAI 陷入 IPO 困境、ChatGPT 成長停滯傳聞、高層相繼離開之際，Anthropic 成功搶走了輿論主導權。

---

## Z.AI GLM-5.1——開源生態的實力宣言

與兩家美國巨頭的華麗敘事不同，GLM 團隊背後的 Z.AI 選擇用硬數據說話。

GLM-5.1 是一個 **754B 參數的 MoE 模型**，專為 agentic 工程打造，在 SWE-Bench Pro 上達到 **58.4 分**，擊敗了 GPT-5.4、Claude Opus 4.6 和 Gemini 3.1 Pro，創下該基準的新紀錄。在真實複雜任務中，它展現了令人矚目的可持續性：能夠連續工作 **8 小時**完成從規劃到交付的完整流程，包括從零構建完整 Linux 桌面環境，或將一個 CUDA 內核優化從 2.6 倍加速提升到 35.7 倍。

支撐這些數字的是創新的架構設計：**MoE + DSA**（動態結構化架構）配合異步強化學習訓練。這種架構讓 GLM-5.1 在長時段複雜任務中保持穩定策略執行，而不是像前代產品那樣在初期快速嘗試後就陷入瓶頸。更重要的是，這是一個 **MIT 許可的开源項目**，在 Hugging Face 上公開可用，任何人都能部署。

---

## 其他值得關注

- **OpenAI 發布企業 AI 下一階段藍圖**：涵蓋 Frontier、ChatGPT Enterprise、Codex 和全公司範圍的 AI agent，是目前最完整的企業級 AI 部署框架。
- **Safetensors 加入 PyTorch 基金會**：Hugging Face 的主流模型序列化格式正式加入 PyTorch 基金會治理，象徵開源 AI 基礎設施走向更成熟的多方治理。
- **AWS 負責人談對 Anthropic 和 OpenAI 的雙重投資**：AWS 高層公開解釋為何同時投資兩家競爭對手，並強調 AWS 內部文化向來能與合作夥伴競爭。

---

## 參考連結

- [AI Meta Blog — Introducing Muse Spark](https://ai.meta.com/blog/introducing-muse-spark-msl/)
- [Wired — Meta's New AI Model Gives Mark Zuckerberg a Seat at the Big Kid's Table](https://www.wired.com/story/muse-spark-meta-open-source-closed-source/)
- [Financial Times — Meta releases first AI model since Zuckerberg's spending spree](https://www.ft.com/content/0efb912a-8bac-4655-ad6c-7c27d4ebbf50)
- [Latent Space — Anthropic @ $30B ARR & Claude Mythos Preview](https://www.latent.space/p/ainews-anthropic-30b-arr-project)
- [The Decoder — From GPT-2 to Claude Mythos: The return of AI models deemed 'too dangerous to release'](https://the-decoder.com/from-gpt-2-to-claude-mythos-the-return-of-ai-models-deemed-too-dangerous-to-release/)
- [MarkTechPost — Z.AI GLM-5.1: 754B Open-Weight Agentic Model](https://www.marktechpost.com/2026/04/08/z-ai-introduces-glm-5-1-an-open-weight-754b-agentic-model-that-achieves-sota-on-swe-bench-pro-and-sustains-8-hour-autonomous-execution/)
- [Hugging Face Blog — Safetensors Joins PyTorch Foundation](https://huggingface.co/blog/safetensors-joins-pytorch-foundation)
- [OpenAI — The Next Phase of Enterprise AI](https://openai.com/index/next-phase-of-enterprise-ai/)
