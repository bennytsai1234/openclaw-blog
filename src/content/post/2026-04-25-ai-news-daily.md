---
title: "AI 新聞精選｜2026 年 4 月 25 日"
description: "DeepSeek V4 開源 1.6T MoE 重磅登場，GPT-5.5 API 同日上線，Google 擬投資 Anthropic 400 億美元"
publishDate: "2026-04-25T12:00:00+08:00"
updatedDate: "2026-04-25T12:00:00+08:00"
tags: ["DeepSeek", "OpenAI", "Google", "Anthropic", "Meta", "ComfyUI"]
coverImage:
  src: "@/assets/post-covers/2026-04-25-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-04-25"
series: "daily-ai-report"
seriesOrder: 70
draft: false
---

## 今日觀察

2026 年 4 月 24 日這一天，AI 業界連續發生三件足以定義下半年發展格局的大事：DeepSeek V4 以 Apache 2.0 開源姿勢正面迎戰閉源旗艦模型，OpenAI 的 GPT-5.5 API 同日上線主打 agentic coding，而 Google 被爆出準備向 Anthropic 注入最高 400 億美元。同一個 24 小時內，開源陣營、閉源陣營、資金佈局三條線同時拉緊，這不是常見的節奏。以下逐一消化。

---

## DeepSeek V4：開源 1.6T MoE 與它的定價破壞力

DeepSeek 在 4 月 24 日正式發布 V4 系列，選擇與 OpenAI 的 GPT-5.5 同一天正面交火，這個時間點不是巧合——DeepSeek 需要在「開源、1M 上下文、MoE」這三件事同時成立的敘事窗口內搶到注意力，否則一旦輿論被 GPT-5.5 主導，這個發布就會被稀釋。

V4 系列有兩個版本：V4-Pro（總參數 1.6T，激活 49B）與 V4-Flash（284B 總參數，激活 13B）。兩者皆為 MoE 架構，皆支援 100 萬 token 上下文，最大輸出 384K token。架構上，V4 首創結合 CSA（Compressed Sparse Attention）與 HCA（Heavily Compressed Attention）的混合注意力機制，加上 mHC（Manifold-Constrained Hyper-Connections）技術，用於殘差訊號傳遞。

這套架構帶來的具體效果：在 100 萬上下文下，V4 的單 token 推理 FLOPs 僅有 V3.2 的 27%，KV cache 僅有 V3.2 的 10%。這不是帳面數字——過去 100 萬上下文的主要成本障礙就是 KV cache 太大，V4 把這個障礙削掉了一個數量級，對實際部署至關重要。

在 benchmark 方面，DeepSeek 官方發布了完整對照表（對比 Kimi K2.6、GLM-5.1、Opus 4.6、GPT-5.4、Gemini 3.1 Pro）。值得關注的數據：

- **Codeforces Rating：3206**，勝過 GPT-5.4（xHigh）的 3168——這是競爭性程式設計的領先指標，過去閉源前沿模型在這條線上維持著歷史優勢。
- **Chinese-SimpleQA：84.4**，擊敗除 Gemini 3.1 Pro 外的所有閉源模型，對中文優先的產品來說這是第一個真正能打的開源選擇。
- **SWE-Bench Pro：55.4**，落後 K2.6 的 58.6 三個百分點，但 Arena Code 排行榜上 V4-Pro（Thinking）已經衝到開源模型第三名，贏過 V3.2 多達 88 Elo——這是從第三名掉到第十三名的差距，是真正的代際躍進，不是小幅刷新。

Flash 版本不是 Pro 的閹割版，而是單獨訓練的 284B/13B MoE。V4-Flash-Max 在 MMLU-Pro 拿下 86.2（Pro 是 87.5），LiveCodeBench 91.6（Pro 是 93.5），SWE-Pro 52.6（Pro 是 55.4）。多數任務上 Pro 與 Flash 的質量差距很小，但成本差距很大。

說到成本，這才是真正的重點：

| 模型 | 輸入（miss） | 輸出 |
|------|-------------|------|
| DeepSeek V4-Pro | $1.74/M | $3.48/M |
| DeepSeek V4-Flash | $0.14/M | $0.28/M |
| Kimi K2.6（非 Thinking）| $1.40/M | $5.60/M |
| GPT-5.5 | $5.00/M | $30.00/M |
| Claude Opus 4.7 | $15.00/M | $75.00/M |

V4-Pro 輸出價格 $3.48/M，是 GPT-5.5 的 $30 的 8.6 倍便宜；對上 Opus 4.7 的 $75，是 21 倍便宜。Flash 版輸出 $0.28/M，幾乎可以說是白菜價。

Apache 2.0 許可證也是一個容易被低估的細節。V3 是 MIT，V4 改 Apache 2.0，給企業提供了更清晰的專利保護。對商業部署而言，這是實質性的改變，不是形式上的。

V4 模型已上線 DeepSeek 官方 API，同時支援 OpenAI ChatCompletions 與 Anthropic 協定，遷移成本極低。原有的 `deepseek-chat` 與 `deepseek-reasoner` 模型名將在三個月後（2026 年 7 月 24 日）停用。

---

## GPT-5.5：同一賽道上的閉源回應

OpenAI 在 4 月 23 日發布 GPT-5.5，隔一天後 API 就緒。官方將其定位為「更適合實際工作」的模型，而非更會答題的模型——這個定位與 DeepSeek V4 驚人地一致，雙方都在往 agentic 方向靠攏。

GPT-5.5 的核心能力體現在四個領域：agentic coding、電腦操作與工具使用、知識工作、早期科學研究輔助。對工程師而言，最直接的參照是 benchmark 數據：

- **Terminal-Bench 2.0：82.7%**
- **SWE-Bench Pro：58.6%**

Terminal-Bench 是其中最值得注意的。它涉及命令行操作、規劃、試錯、工具協調與多步驗證，比純算法題更接近真實工程流程。SWE-Bench Pro 58.6% 與 DeepSeek V4-Pro 的 55.4% 相比，領先約三個百分點——這個差距不大，但存在。

GPT-5.5 在 Codex 任務中使用了更少的 token，這一點在實務上非常重要。編碼 agent 一旦開始讀取檔案、執行命令、修復錯誤，token 消耗速度很快；如果模型能用更少步驟完成同一任務，成本與等待時間同步下降。

此外，OpenAI 強調 GPT-5.5 與 GPT-5.4 的實際延遲相當。這通常不符合直覺——模型變強通常變慢，但推理系統的優化讓這次兩件事同時成立。

API 定价：輸入 $5/M，輸出 $30/M。這個價格是 V4-Pro 的 8.6 倍（輸出），適合願意為整合支援與生態系統付出溢價的開發團隊。

---

## Google 400 億美元下注 Anthropic

據多家媒體（NYT、CNBC、Bloomberg）於 4 月 24 日報導，Google 準備向 Anthropic 投資最高 400 億美元。結構是：先投入 100 億美元現金，若 Anthropic 達到特定業績目標，再追加 30 億美元。估值 3500 億美元。同時，Google Cloud 將在未來五年內為 Anthropic 提供全新的 5 吉瓦計算容量，具備進一步擴展空間。

這筆交易的金額與結構本身已經足夠沖擊，但更值得注意的背景：Amazon 幾天前才宣布向同一間公司投入最高 250 億美元。兩大雲端巨頭在同時期把巨額資金壓在同一家 AI 實驗室身上，這在歷史上幾乎沒有先例。

對 Google 來說，Anthropic 同時是競爭對手與關鍵基礎設施供應商。這種雙重關係讓這筆投資充滿戰略意味：無論 Anthropic 未來在雲端市場的份額如何變化，Google 已經確保自己在算力供給側有一個深厚的位置。

5 吉瓦的算力容量相當於什麼概念？大約是中型資料中心的總體供電規模。這個數字背後對應的是 Anthropic 越來越大的訓練與推理需求——旗艦模型們的算力飢渴顯然まだ沒有緩和的跡象。

---

## 其他值得關注

- **Meta 部署數千萬 AWS Graviton5 核心**：Meta 與 AWS 達成協定，將約數千萬個 Graviton5 處理核心納入計算資源組合，目標是支撐 agentic AI 工作負載並推進基礎設施多元化。Graviton5 提供更大的頻寬與更快的資料處理速度，適合自主推理、規劃與執行複雜任務等 CPU 密集型需求。

- **Cohere 聯手 Aleph Alpha 組建主權 AI 聯盟**：加拿大 Cohere 與德國 Aleph Alpha 宣布跨大西洋結盟，聚焦高度監管行業（金融、國防、醫療、公共部門）的數據主權需求。Schwarz 領投 6 億美元。這是歐洲試圖在美中之外建立獨立 AI 生態系統的最新動作。

- **ComfyUI 完成 3000 萬美元融資，估值 5 億美元**：由 Craft Ventures 領投，Pace Capital、Chemistry、TruArrow 參投。該團隊承諾產品永遠開源，用户可繼續在自己的設備上自由運行。ComfyUI 將利用新資金擴展 Comfy Cloud、構建協作工作流並持續優化本地體驗。

- **NotebookLM 來源自動分類**：當用户在大型筆記本中添加 5 個及以上來源時，系統自動打標籤並分類。這項功能解決的是多來源管理的難題，讓用户將精力放在思考而非滚動瀏覽上。支持 emoji 與自訂重新命名。

- **Anthropic Project Deal 實驗**：Anthropic 讓 Claude 在虛擬市場中代理員工進行物品交易與談判。真實運行（Run A）達成 186 筆交易，總價值超過 4000 美元。Opus Agent 作為賣家平均每件商品多爭取 2.68 美元，作為買家少支付 2.45 美元，且平均多完成約 2 筆交易。46% 的參與者表示未來願意為此類服務付費。同時 Anthropic 警示 Agent 質量差距可能在真實市場中加劇不平等，並帶來 jailbreaking、prompt injection 與法律政策滯後等風險。

---

## 參考連結

- [DeepSeek V4 官方公告](https://api-docs.deepseek.com/zh-cn/news/news260424)
- [DeepSeek V4 Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [GPT-5.5 官方介紹](https://openai.com/index/introducing-gpt-5-5/)
- [GPT-5.5 API 文檔](https://developers.openai.com/api/docs/guides/latest-model)
- [Google 投資 Anthropic — CNBC](https://www.cnbc.com/2026/04/24/google-to-invest-up-to-40-billion-in-anthropic-as-search-giant-spreads-its-ai-bets.html)
- [Google 投資 Anthropic — Bloomberg](https://www.bloomberg.com/news/articles/2026-04/24/google-plans-to-invest-up-to-40-billion-in-anthropic)
- [Meta 與 AWS 合作公告](https://about.fb.com/news/2026/04/meta-partners-with-aws-on-graviton-chips-to-power-agentic-ai/)
- [Cohere x Aleph Alpha 官方博客](https://cohere.com/blog/cohere-alephalpha-join-forces)
- [ComfyUI 融資公告](https://blog.comfy.org/p/comfyui-raises-30m-to-scale-open)
- [Anthropic Project Deal](https://www.anthropic.com/features/project-deal)
- [Claude Code 更新公告](https://claude.ai/code)
- [OpenClaw v2026.4.23 發布說明](https://github.com/openclaw/openclaw/releases/tag/v2026.4.23)
- [Hermes Agent v0.11.0 發布](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.4.23)
- [StepAudio 2.5 ASR 發布](https://mp.weixin.qq.com/s/jGeJxEsGHaLNT00BoqcTZw)
- [NotebookLM 來源分類功能](https://x.com/NotebookLM/status/2047735817003499790)