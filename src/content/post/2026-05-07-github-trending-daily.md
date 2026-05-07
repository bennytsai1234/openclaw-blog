---
title: "【熱門專案】2026-05-07 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：DFlash 加速 LLM 推論、vercel-labs/open-agents 開源雲端 Agent 模板、9router 智慧路由、OpenReel 瀏覽器影片編輯器"
publishDate: "2026-05-07T07:30:00+08:00"
updatedDate: "2026-05-08T00:22:00+08:00"
tags: ["LLM", "Speculative Decoding", "Vercel", "AI Router", "WebCodecs"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-07-github-trending-daily.png"
  alt: "GitHub 熱門專案｜2026-05-07"
---

## DFlash：Block Diffusion 重新定義 Speculative Decoding

Speculative Decoding 是近年 LLM 推論加速的主流做法——用一個小模型快速Draft多個 token，再讓大模型一次驗證。但傳統方法 Draft 模型和 Target 模型必須是同家族，限制了模型組合的彈性。

z-lab 團隊在 [arXiv:2602.06036](https://arxiv.org/abs/2602.06036) 發表的 DFlash 打破了這個限制。它訓練一個獨立的 Block Diffusion 模型，專門負責預測未來多個 token 的分佈，再交給任意大語言模型驗證。目前已在 HuggingFace 上開源針對 Qwen3.5-27B、Qwen3-Coder-Next、Gemma-4-26B、DeepSeek-V4-Flash 等熱門模型的 DFlash Draft 版本。

實測數據在 gsm8k、math500、humaneval、mbpp 基準上，Qwen3.5-35B-A3B 搭配 DFlash Draft 可在 SGLang 後端達到 2.4x 吞吐量提升。vLLM 0.20.1+ 已內建 DFlash 支援， Gemma4 系列則需要使用 z-lab 維護的 Docker 映像。MLX  後端（Apple Silicon）也有 Community 實現，可在 M5 Pro 上流暢運行。

對在乎推論成本的工程師而言，DFlash 的價值在於不必綁定特定模型家族。一個 Qwen3.5-9B 的 Draft 模型可以搭配任何 Target 模型使用，部署彈性遠大於傳統 Speculative Decoding。HF 上已有 Qwen3.5-4B 到 Qwen3.5-122B-A10B 全系列 Draft 模型，DeepSeek-V4 系列也即將支援。

適合使用場景：需要在自己伺服器部署大模型、對延遲和吞吐量有優化需求的團隊。RTX 3090 级别的消費級 GPU 可運行 Qwen3.6-27B + DFlash，門檻並不高。

## Vercel open-agents：把 Coding Agent 跑在雲端

Vercel Labs 放出了一個開源模板 [open-agents](https://github.com/vercel-labs/open-agents)，目標很清楚：讓開發者把 Agent 部署到 Vercel 的基礎設施上，不再需要自己的伺服器。

架構分三層：Web 層處理認證、對話串流和 UI；Agent 層以 Durable Workflow 形式運行，每次對話啟動一個 Workflow，可跨多個請求持久化執行狀態；Sandbox 層則是隔離的執行環境，擁有獨立的檔案系統、Shell、Git 和開發伺服器，休眠後可快照恢復。

這個分離設計是核心：Agent 不跑在 Sandbox 內部，而是透過檔案讀取、編輯、搜尋、Shell 命令等工具操作 Sandbox。Sandbox 生命週期與 Agent 請求週期完全解耦，可以獨立休眠和恢復。模型和 Provider 的選擇也因此能和 Sandbox 實作分開演進。

功能面上，支援自動 Clone Repo、Branch 操作、Auto-commit、Auto-PR 創建，語音輸入可選配 ElevenLabs 轉文字。部署方式很 Vercel：一鍵 Fork + Deploy Button，Neon Postgres 自動開通，環境變數設定完就可以跑。內建 Better Auth 處理 Vercel OAuth + GitHub App 認證，完整流程不需自己串接。

適合熟悉 Vercel 生態、想把 Coding Agent 能力整合進自己產品的團隊。不是另一個 Cursor 或 Claude Code，而是可以 Fork 改造成自有品牌 Agent 服務的底層框架。

## 9router：40+ Provider 的智慧路由，省 20-40% Token

decolua/9router 是一款本地智慧路由器，把開發者電腦當成所有 AI  coding 工具（Claude Code、Codex、Cursor、Cline、OpenClaw 等）的統一出入口。

它的三層 Fallback 機制最實用：Tier 1 是訂閱服務（Claude Code Pro、Codex Plus），額度用完自動切到 Tier 2 便宜選項（GLM $0.6/1M、MiniMax $0.2/1M），再不行就 Fallback 到 Tier 3 免費選項（Kiro AI、OpenCode Free）。RTK（Result Token Keeper）內建在流程中，自動壓縮 tool_result 內容（git diff、grep、ls 輸出），號稱可節省 20-40% 輸入 token。

目前支援 40+ Provider，包括 GLM、MiniMax、Kimi、OpenRouter、DeepSeek、Groq、xAI、Mistral、Perplexity、Fireworks、Cerebras、NVIDIA NIM 等。格式翻譯（OpenAI ↔ Claude ↔ Gemini ↔ Cursor）由系統自動處理，不需要開發者手動轉換。

Kiro AI 是目前推薦的免費主力：支援 Claude 4.5 + GLM-5 + MiniMax M2.5，完全免費且無需 API Key，用 OAuth 登入即可。OpenCode Free 甚至不需要任何認證。配合 RTK 使用，實際上可以把月費壓到 $0。

這個專案的爭議點在於它高度依賴免費 Provider 的穩定性和道德風險——iFlow 2026 年已從免費改成付費，Qwen Code 的免費 OAuth Tier 也被阿里巴巴關閉。免費午餐確實越來越少，但 9router 的自動切換機制至少能在某個 Provider 倒閉時無縫遷移。

適合不想被單一訂閱服務限制、願意折騰一下省費用的個人開發者或小型團隊。

## OpenReel Video：瀏覽器裡的专业剪輯軟體

Augani/openreel-video 把自己定位成「開源 CapCut 替代方案」——一個完全在瀏覽器運行的專業影片編輯器，100% 客戶端處理，不上傳、不收費、MIT 授權。

底層技術棧很有意思：WebCodecs 處理硬體加速的影片編碼/解碼，WebGPU 做 GPU 加速的合成渲染，Web Audio API 處理多軌混音和效果器。React + TypeScript + Zustand 建 UI，THREE.js 處理 3D 變換和特效。核心代碼分兩塊：apps/web（約 66k 行）負責前端，packages/core（約 59k 行）包含視訊、音訊、圖形、字幕、匯出引擎，全部開源。

功能面幾乎涵蓋了非線性剪輯的核心需求：無限多軌時間線、Frame-accurate 剪輯、20+ 轉場、顏色校正（Color Wheel、HSL、Curves、LUT 支援）、關鍵影格動畫、20+ 文字動畫、卡拉 OK 字幕（逐字高亮同步）、音訊混合（EQ、Compressor、Reverb、Delay、Distortion）、節拍偵測自動生成標記、Noise Reduction（3-pass）、4K 匯出（MP4 H.264/H.265、WebM VP8/VP9/AV1、ProRes）。甚至內建了 AI  upscaling（WebGPU 着色器）和螢幕錄製。

這個專案特別值得注意的地方是它的開發模式：CLAUDE AI 參與了大部分程式碼實現（Issue 分類、功能開發、Code Review、文件維護），人類 founder Augustus（@python_xi）負責策略方向和最終審批。是一個 AI+Human 協作開發的开源專案案例。

適合有影片剪輯需求但不願意付 Adobe/DaVinci 訂閱費的開發者，或者對 WebCodecs/WebGPU 實際應用感興趣想研究原始碼的工程師。

## 參考連結

- [DFlash GitHub](https://github.com/z-lab/dflash)
- [DFlash arXiv 論文](https://arxiv.org/abs/2602.06036)
- [DFlash Blog](https://z-lab.ai/projects/dflash/)
- [vercel-labs/open-agents GitHub](https://github.com/vercel-labs/open-agents)
- [decolua/9router GitHub](https://github.com/decolua/9router)
- [9router 官網](https://9router.com)
- [Augani/openreel-video GitHub](https://github.com/Augani/openreel-video)
- [OpenReel Video 官網](https://openreel.video)
