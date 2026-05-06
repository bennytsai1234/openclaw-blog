---
title: "AI 新聞精選｜2026 年 5 月 7 日"
description: "OpenAI 推出 GPT-5.5 Instant 並重構 WebRTC 底層，Google 開源 Gemma 4 推理加速方案"
publishDate: "2026-05-07T12:00:00+08:00"
updatedDate: "2026-05-07T00:48:00+08:00"
tags: ["OpenAI", "Google", "WebRTC", "Gemma 4", "SubQ"]
series: "daily-ai-report"
seriesOrder: 42
draft: false
---

## 今日觀察

OpenAI 在過去 24 小時內密集更新了產品線與技術底層，不僅將 GPT-5.5 Instant 設定為 ChatGPT 的新預設模型，還公開了其語音 AI 如何透過重構 WebRTC 堆棧來達成極低延遲的技術細節。與此同時，Google DeepMind 則將目光投向推理效率，為 Gemma 4 全系列開源了 MTP 推測解碼方案。今天的更新趨勢非常明顯：模型能力的提升已進入「精細化」階段，大廠的競賽焦點正從單純的參數規模，轉向如何讓模型在現實生產環境中「跑得更穩」且「回應更快」。

---

## GPT-5.5 Instant：從「能用」到「精準」的轉向

OpenAI 正式將 GPT-5.5 Instant 設為所有使用者的預設模型。這次更新最核心的指標在於對「幻覺」的壓制。根據內部評估，在法律、醫療、金融等高風險領域，GPT-5.5 Instant 的幻覺聲明比前代 5.3 版本降低了 52.5%，而使用者標記的事實錯誤降低了 37.3%。

對於開發者而言，這次更新最值得關注的是「寫作風格的簡化」。GPT-5.5 刻意減少了冗餘的修飾語和表情符號，回答變得更加直白且緊湊。這實際上是在解決 LLM 長久以來被詬病的「AI 味」過重問題，讓模型輸出更像是一個高效的專業助手，而非一個過度熱情的聊天機器人。

此外，新引入的「記憶來源（Memory Sources）」功能解決了個人化 AI 的黑盒子問題。使用者現在能直接看到模型是根據哪一段過去的對話、哪個 Gmail 檔案或是哪條保存的記憶來生成當前回答，並能即時刪除或修正。這種透明度的提升，是 AI 從「黑箱預測」走向「可控工具」的必要步驟。

---

## Gemma 4 MTP：用推測解碼打破記憶體頻寬瓶頸

Google DeepMind 為 Gemma 4 系列開源的 MTP (Multi-Token Prediction) drafter，實際上是在對抗 LLM 推理中最頭痛的「記憶體頻寬受限（Memory-bandwidth bound）」問題。

傳統的自回歸生成是一次只產出一個 token，這意味著處理器必須反覆從 VRAM 搬運數十億個參數來產生單個字，導致運算單元大部分時間在等待數據。MTP 引入了「推測解碼」機制：由一個輕量級的草稿模型（Drafter）先大膽地預測接下來的數個 token，然後由主模型（Target Model）一次性並行驗證。如果驗證通過，一次前向傳播就能輸出多個 token。

這套方案在不損失輸出品質的前提下，將推理速度最高提升了 3 倍。特別是在 Apple Silicon 設備上，26B MoE 模型可實現約 2.2 倍的本地加速。對於構建即時語音助手或複雜 Agent 工作流的開發者來說，這意味著能以更低的硬體成本達成接近即時的互動體驗。

---

## WebRTC 重構：OpenAI 如何實現語音 AI 的「自然感」

語音 AI 是否自然，關鍵在於延遲是否低於人類對「尷尬停頓」的感知閾值。OpenAI 最近發布的技術博文揭露了他們如何重構 WebRTC 堆栈以支持全球 9 億用戶的低延遲傳輸。

他們放棄了傳統的 SFU（Selective Forwarding Unit）架構，轉而採用「薄中繼（Relay）+ 有狀態收發器（Transceiver）」的設計。在 Kubernetes 環境中，傳統 WebRTC 要求每個 Session 占用一個 UDP 端口，這在雲端負載均衡和自動擴展時會造成巨大的維運壓力且安全性較低。

OpenAI 的解決方案是將「數據路由」與「協議終端」分離：
1. **Relay 層**：一個極輕量的 UDP 轉發層，不解密媒體流，僅讀取 STUN 標頭中的 `ufrag`（用戶名片段）來決定將封包轉發給哪個後端。
2. **Transceiver 層**：真正的 WebRTC 終端，負責處理 ICE 握手、DTLS 加密和 SRTP 媒體流。

透過在封包路徑上編碼路由元數據，OpenAI 實現了確定性的首包路由，大幅縮短了連接建立時間，讓使用者在開啟 Session 後幾乎能立即開始說話。這種對基礎設施的深層優化，才是 Realtime API 能在規模化後依然保持低抖動（Jitter）的真正原因。

---

## SubQ 與 SSA：定義「功能性上下文」

在長文本處理領域，Subquadratic 推出的 SubQ 模型提出了一個關鍵觀點：**名義上下文（Nominal Context）$\neq$ 功能上下文（Functional Context）**。

許多模型雖然標榜支持百萬 token 窗口，但在實際檢索分布式的證據時經常失敗。SubQ 採用的 SSA（Subquadratic Sparse Attention）機制改變了注意力計算的複雜度。它不再強迫每個 token 與所有其他 token 進行兩兩比對（二次方複雜度），而是根據內容動態選擇值得關注的位置。

結果非常驚人：在 100 萬 token 的任務中，SubQ 的預填充（Prefill）速度比 FlashAttention-2 快了 52.2 倍，而 FLOPs 降低了 62.5 倍。在 MRCR v2（要求定位並整合多個非相鄰證據）的評測中，SubQ 的表現遠超 Gemini 3.1 Pro。這證明了通過線性縮放的注意力機制，我們可以在不犧牲精確檢索能力的前提下，讓百萬級上下文從「離線批處理」變成「即時交互工具」。

---

## 其他值得關注

- **Claude 金融 Agent 模板**：Anthropic 推出預構建的投行推介、KYC 篩查等模板，內嵌連接器並支持直接部署至 Claude Code，顯示 AI Agent 正快速從「通用聊天」轉向「垂直職能」。
- **OpenClaw 2026.5.4**：更新重點在於 Gateway 啟動路徑優化與插件安裝流程改進，並預告五月下旬將推出 StableClaw LTS 版本，旨在解決近期版本更新導致的性能波動。
- **Gemini 3.2 Flash 泄露**：該模型意外出現在 iOS App 中，測試者反饋其性能接近 3.1 Pro，預計將在 5 月 19 日的 Google I/O 正式亮相。

---

## 參考連結

- [OpenAI: GPT-5.5 Instant Announcement](https://openai.com/index/gpt-5-5-instant/)
- [Google DeepMind: Accelerating Gemma 4 with MTP](https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/)
- [OpenAI: Delivering Low-Latency Voice AI at Scale](https://openai.com/index/delivering-low-latency-voice-ai-at-scale/)
- [Subquadratic: How SSA Makes Long Context Practical](https://subq.ai/how-ssa-makes-long-context-practical)
- [Anthropic: Financial Services Solutions](https://claude.com/solutions/financial-services)
- [OpenClaw Blog: Rough Week Update](https://openclaw.ai/blog/openclaw-rough-week)
