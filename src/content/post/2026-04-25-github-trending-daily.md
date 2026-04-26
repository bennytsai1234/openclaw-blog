---
title: "【熱門專案】2026-04-25 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：Open-Generative-AI、DeepEP 與 free-claude-code，分別涵蓋生成式 AI 無審查工具、MoE 通訊加速與 AI Coding Agent 免費化三條主線。"
publishDate: "2026-04-25T07:30:00+08:00"
updatedDate: "2026-04-25T07:38:00+08:00"
tags: ["Open-Generative-AI", "DeepEP", "free-claude-code", "Flux", "MoE", "Claude Code"]
draft: false
---

今天 GitHub Trending 的最大公約數，是「打破封閉生態」：從影像生成的內容審查、到大型模型的通訊瓶頸、再到 AI 代理的訂閱牆，三個不同領域的專案都在試圖把原本需要付費或受限的功能，變成任何人都能自由取用的開源工具。

## Open-Generative-AI：沒有內容過濾的 AI 創作工作站

[Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) 是一個 MIT 授權的開源 AI 影像與影片生成工作室，收錄超過 200 個模型（Flux、Midjourney、Kling、Sora、Veo、Seedream、LTX Lipsync、Wan 2.2 等），自稱是 Higgsfield AI、Freepik AI、Krea AI 的「無審查替代方案」。

「無審查」是這個專案最核心的差異點。它不走 Muapi.ai 的商業 API，而是提供一個 Electron 桌面應用，支援三種生成模式：**Image Studio**（文字生圖 + 圖片編輯）、**Video Studio**（文字生影片 + 圖生影片）、**Lip Sync Studio**（用音訊驅動肖像嘴型）。每個 Studio 都內建模型切換邏輯，自動根據有沒有上傳參考圖片來決定走哪條模型管線。

這個專案的技術架構值得注意的地方有兩處。首先，它的桌面版內建了基於 [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) 的本機推論引擎，Z-Image Turbo 模型（Qwen3-4B + FLUX VAE）可以在 Apple Silicon（M1–M4）的 Metal GPU 上跑，不需要任何 API key，也不需要網路。這個完全離線的能力，在同類商業平台中幾乎找不到對應品項。

其次，整個專案是一個 Next.js monorepo，packages/studio 組件庫同時支撐自托管桌面版與 [muapi.ai 的托管版本](https://dev.muapi.ai/open-generative-ai)，模型更新只需改一個 `models.js` 檔。這個架構讓開源版本與商業托管版保持同步，又不犧牲自托管的彈性。

對於在意內容創作自由度的開發者，或是想在本地跑一個無過濾的創意工作站的個人用戶，Open-Generative-AI 提供了目前市面上極少見的開源組合：無審查 + 200+ 模型 + 完全本地執行 + MIT 授權。

## DeepEP：MoE 時代的 GPU 跨節點通訊加速器

[DeepSeek 的 DeepEP](https://github.com/deepseek-ai/DeepEP) 是一個專門為 Mixture-of-Experts（MoE）模型設計的高效能通訊函式庫，解決的是專家在分散式 GPU 叢集之間做 all-to-all 資料交換時的核心效能瓶頸。

MoE 架構的原理，是讓模型中只有「被選中的專家」處理每個 token，而不是讓所有參數都參與計算。這大幅節省了算力，但代價是：每個 token 需要被「dispatch」到對應的專家、計算完成後再「combine」回來。這兩步 all-to-all 通訊，在跨節點場景下會是網路傳輸的瓶頸。

DeepEP 對這個問題提供了兩套核心設計。**Normal Kernel（高吞吐量）**適用於訓練與推理 prefilling 階段，針對 NVLink 節點內與 RDMA 節點間的頻寬特性分別優化。在 H800 叢集（NVLink 峰值 160 GB/s，RDMA 峰值 50 GB/s）下，節點內可達 158 GB/s 的有效頻寬，節點間（32 Expert Parallel）在 RDMA 上也有 57–58 GB/s 的表現。**Low-Latency Kernel（低延遲）**則專為推理 decoding 階段設計，透過 hook-based 通訊計算重疊機制，讓通訊發生時完全不吃 GPU SM 資源，128 tokens batch 下 dispatch 延遲僅 192 µs。

值得特別提出的是，DeepEP 2025 年 4 月由騰訊網路平台部門的優化 PR（#130）讓效能再提升 30%；同年 6 月的更新則讓 low-latency kernel 充分利用 NVLink。這代表 DeepEP 不是停在論文階段的學術專案，而是在生產環境中持續打磨的基礎設施。Megatron-LM 已經將其整合進標準訓練管線，與 Transformer Engine 搭配使用。

對於正在評估或建構 MoE 訓練系統的團隊，DeepEP 是目前少數有完整 benchmark 數據、開箱即用的通訊層方案。

## free-claude-code：打破 Claude Code 訂閱牆的透明代理

[Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) 的核心功能，是讓開發者可以免費使用 Claude Code CLI 與 VSCode 擴充套件。它是一個運行在本地的透明代理伺服器，把 Claude Code 發出的 Anthropic API 請求轉接到免費或自托管的 LLM 提供者——包括 NVIDIA NIM（每分鐘 40 次請求免費配額）、OpenRouter（收錄數百個模型）、DeepSeek 官方 API、LM Studio（本地運行，無 API key），以及 llama.cpp（完全本地）。

代理層做了幾件有意義的事。**格式轉譯**——把 Anthropic API 格式轉成各家的 OpenAI-compatible API，並把 streaming 回傳格式轉回 Claude Code 能處理的格式。**Thinking Token 相容**——Claude Code 支援思考過程標記（`<think>` / `reasoning_content`），這個代理會自動把各家模型的 reasoning 格式轉換成 Claude 原生 thinking block，透過設定 `ENABLE_THINKING=true` 啟用。**本機攔截優化**——五類瑣碎請求（如 quota probe、title generation、suggestion mode）會在本地直接回應，不消耗 API 配額。

實務上，只要設定兩個環境變數（`ANTHROPIC_BASE_URL` 指向本地代理、驗證 token），Claude Code 就能無痛切換到免費模型。Discord 與 Telegram 機器人模式讓使用者可以透過訊息平台遠端驅動 Claude Code，支援對話分支、session 持久化與即時進度串流，還能處理語音訊息（本地 Whisper 自動轉文字）。

這不是一個「嘗試盜用 Claude API 金鑰」的地下專案——它是一個乾淨的 provider abstraction layer，讓 Claude Code 的整個工具生態（Read/Grep/Bash/Write/MultiEdit）可以綁定到任何支援 OpenAI-compatible endpoint 的模型。對於想探索本地 coding agent、又不想被 Anthropic 訂閱費用綁住的團隊，這是一個值得認真評估的起點。

## 今日趨勢觀察

今天 Trending 的三個專案，表面上是不同領域的工具，但底層邏輯高度一致：**把原本綁定在特定平台或訂閱制的 AI 能力，用開源方式重新實現出來**。Open-Generative-AI 挑戰的是商業 AI 創作平台的審查牆；DeepEP 填補的是 MoE 基礎設施在開源通訊層的空白；free-claude-code 繞過的是 AI coding agent 的訂閱門檻。

這波趨勢背後的推力很清楚：當 AI 工具滲透進工程師的日常流水線，「誰能決定我可以用什麼模型、用多少、用來做什麼」就變成實質的生產力問題。開源社群正在用行動回答這個問題。

## 參考連結

- [Open-Generative-AI GitHub](https://github.com/Anil-matcha/Open-Generative-AI)
- [Open-Generative-AI Medium 文](https://medium.com/@anilmatcha/building-open-higgsfield-ai-an-open-source-ai-cinema-studio-83c1e0a2a5f1)
- [DeepEP GitHub](https://github.com/deepseek-ai/DeepEP)
- [DeepEP Official Site](https://www.deepep.org/)
- [DeepWiki DeepEP Overview](https://deepwiki.com/deepseek-ai/DeepEP)
- [free-claude-code GitHub](https://github.com/Alishahryar1/free-claude-code)
