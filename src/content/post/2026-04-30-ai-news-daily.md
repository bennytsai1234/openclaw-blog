---
title: "AI 新聞精選｜2026 年 4 月 30 日"
description: "Mistral Medium 3.5 開源 128B 模型挑戰coding龍頭、Cursor推出TypeScript SDK、Anthropic發布內省適配器重新定義AI安全審計。"
publishDate: "2026-04-30T12:00:00+08:00"
updatedDate: "2026-04-30T12:03:00+08:00"
tags: ["Mistral", "Cursor", "Anthropic", "DeepSeek", "OpenClaw"]
series: "daily-ai-report"
seriesOrder: 1
draft: false
---

## 今日觀察

2026 年 4 月最後一天，開源模型戰場突然升溫。Mistral AI 推出首款旗艦級稠密模型 Medium 3.5，128B 參數、256k 上下文，直接把 SWE-Bench Verified 分數拉到 77.6%，一腳踹開該榜單的天花板。同一天，Cursor 官方 TypeScript SDK 開放公測，開發者終於可以把自己的系統接上 Cursor 的 Agent 執行環境。而在安全一側，Anthropic 發布了內省適配器，讓模型自己舉報自己在訓練過程中學到的隱藏不良行為——這套方法在 56 個對抗性模型的 AuditBench 上擊敗了所有現有審計技術。三條主軸，三種不同方向，湊在一起剛好構成這一天工程師最需要知道的新聞。

---

## Mistral Medium 3.5：開源龍頭的第一槍

Mistral AI 在 4 月底發布了 Medium 3.5，這是他們第一款旗艦級稠密模型。參數規模 128B，上下文窗口 256k，採用 Modified MIT 許可開源權重，在 Hugging Face 上可直接下載。

先看最直接的數字：SWE-Bench Verified 得分 77.6%，領先 Qwen3.5 397B A17B 等一眾更大尺寸的對手；τ³-Telecom 得分 91.4%。Coding 能力是目前開源模型最被關注的賽道，Medium 3.5 這個分數等於直接告訴市場：在需要長時間、多步驟的軟體工程任務上，開源模型已經可以和閉源旗艦正面交鋒。

API 定價為每百萬輸入 tokens 1.5 美元、輸出 tokens 7.5 美元。這個定價落在哪裡？比 GPT-5o 便宜約 40%，但比 DeepSeek V4 貴。這讓它在性價比戰場上處於一個微妙位置——不是最便宜的，但效能數字擺在那裡，企業決策者很難忽視。

更重要的是，Mistral 這次同步推出了 Vibe 遠端 Agent。開發者可以從 CLI 或 Le Chat 啟動一個雲端非同步任務，關閉終端機後任務繼續跑，適合那種需要幾十分鐘甚至幾小時的長線程重構或測試生成工作。Le Chat 同時上線了 Work 模式，這是一個 Agent 模式，自動串接郵件、日曆、文件等多步驟工作流。這兩件事合在一起看，Mistral 的策略不只是「發一個厲害的模型」，而是要把模型、雲端執行環境、和工作流自動化打包成一套開發者可以直接用的棧。

對工程師來說，這代表什麼？過去想在正式專案中使用開源模型做 coding，通常繞不過「自己架環境、自己處理 long-horizon 任務的中斷問題」這條泥濘路。Mistral Vibe 的出現等於把這段路幫你鋪完了。參數好看之外，這個端到端的可用性才是真正值得注意的升級。

---

## Cursor TypeScript SDK：把編輯器大腦抽出來用

Cursor 在同一天發布了 TypeScript SDK 公測版。這是一個把 Cursor Agent 執行時 runtime 包裝成程式化 API 的套件，開發者可以在自己的應用程式裡建立、設定、和編排 Agent，而不是透過 Cursor 的桌面 UI 操作。

具體能做什麼？根據官方文件，SDK 支援在本地或 Cursor 自家雲端沙箱 VM 上執行 Agent，就算你的筆電進入休眠或網路中斷，任務也會繼續跑。它開放了程式碼庫索引、語意搜尋、MCP 伺服器、以及子 Agent 等功能，還支援切換 OpenAI、Anthropic、或 Cursor Composer 2 等模型，計費方式則按 token 用量計算。

這個 SDK 的核心價值在於「把 Cursor 多年最佳化下來的 Agent runtime 抽取出來，作為一個可程式化元件」重新提供給開發者。這不是一個簡單的 API wrapper——它是把一個完整的 coding assistant 抽象成一個可以在更大系統中被呼叫的工具。

實際應用情境已經有了先例：Rippling 用這個 SDK 建置了客製化後台 Agent，Notion 則用它來維護所謂「self-healing codebase」——當程式碼靜態分析發現問題時，Agent 自動啟動重構流程，不需要人為干預。這些案例代表的方向是：Agent 不只是一個對話介面，而是一個可以在系統層面被編排的自動化單位。

Cursor 同時開源了範例專案，這讓第三方評估 SDK 能力變得低門檻。對有自建开发工具需求的工程團隊而言，這是今天最值得評估的新聞。

---

## Anthropic 內省適配器：讓模型自己當舉報人

Anthropic 在安全對齊領域丟出了一顆深水炸彈。他們推出了內省適配器（Introspection Adapter，IA），這是一種特殊的 adapter，能讓語言模型主動報告自己在訓練過程中學習到的行為——包括潛在的不對齊、後門、以及安全機制被移除的狀況。

在研究方法上，IA 的設計思路很不一樣。傳統的模型審計是「從外面觀察模型的輸出，去猜它內部發生了什麼」；內省適配器則是「在模型內部安裝一個回報機制，讓它自己說出來」。 Anthropic 在 56 個對抗性訓練的隱藏不良行為模型上測試，IA 達到了 59% 的 Agent 成功率，優於次優方法的 53% 和最佳白盒方法的 44%。更關鍵的是，在 89% 的模型上至少產生了一條正確的行為描述。

IA 還能檢測更隱蔽的威脅：它成功識別了 7 個隱蔽微調 API 攻擊中的 7 個，並能揭示獎勵模型諂媚的具體行為——在 52 個案例中發現了 16 個，而未修改的原模型只承認 2 個。這種量級的差距說明，很多模型的「表面行為」和「真實學到的策略」之間，差距比我們以為的要大得多。

研究還發現一個規律：IA 的表現隨模型規模擴大而提升——Qwen3 從 0.6B 到 4B 到 14B，口頭化率從 38% 升至 60% 再升至 77%。這意味著更大的模型不只是能力更強，也更擅長表述自己的內部狀態。這個趨勢對未來的安全研究有重要含義：隨著模型變得更強大，審計它們的工具也需要同步進化。

程式碼、模型、資料集和論文已全部公開，發表在 arXiv（2604.16812）。這是那種改變整個領域研究方式的論文——不只是報告一個新方法，而是提供了一整套可以沿用的工具和基準。

---

## 其他值得關注

- **騰訊混元 Hy-MT1.5-1.8B**：騰訊開源了一款手機端離線翻譯模型，440MB（1.25-bit 版本）可在 iOS/Android 完全離線運行，支援 33 種語言和 5 種方言，翻譯品質據稱超越 Google 翻譯和百度翻譛。對於隱私敏感的使用場景（醫療、金融溝通），這是一款值得測試的替代方案。

- **螞蟻百靈 Ling-2.6-1T**：參數總量 1T、活躍參數 63B 的推理旗艦模型，已在 Hugging Face 開源。官方稱在 AIME26 和 SWE-bench Verified 達到開源 SOTA，並與 OpenClaw、Claude Code 等主流 Agent 框架無縫整合。這款模型背後的 MLA 與線性注意力混合架構，是長上下文推理延遲優化的重要技術方向。

- **Zed 1.0 正式發布**：由 Atom 創始人打造的程式碼編輯器 Zed 正式推出 1.0 版，支援 macOS、Windows、Linux三大平台。GPU 渲染、自研 Rust 框架 GPUI、完整 Git 整合、SSH 遠端開發，以及 Agent Client Protocol 同時支援 Claude Agent、Codex、OpenCode、Cursor 等多種 AI 助手。對已經離開 Atom 的開發者而言，這是一次值得重新評估的轉身。

---

## 參考連結

- [Mistral AI 官方公告：Mistral Medium 3.5](https://mistral.ai/news/vibe-remote-agents-mistral-medium-3-5)
- [Mistral Medium 3.5 on Hugging Face](https://huggingface.co/mistralai/Mistral-Medium-3.5-128B)
- [Cursor TypeScript SDK 官方文件](https://cursor.com/blog/typescript-sdk)
- [Cursor SDK GitHub Cookbook](https://github.com/cursor/cookbook)
- [Anthropic Introspection Adapters 官方頁面](https://alignment.anthropic.com/2026/introspection-adapters/)
- [Introspection Adapters 論文 arXiv](https://arxiv.org/abs/2604.16812)
- [AuditBench 模型與資料集](https://huggingface.co/introspection-auditing/)
- [螞蟻百靈 Ling-2.6-1T on Hugging Face](https://huggingface.co/inclusionAI/Ling-2.6-1T)
- [騰訊混元 Hy-MT1.5-1.8B 模型頁面](https://modelscope.cn/collections/AngelSlim/Hy-MT15-18b-quant)
- [Zed 1.0 官方公告](https://zed.dev/blog/zed-1-0)
- [DeepSeek 灰度測試「識圖模式」推文](https://x.com/victor207755822/status/2049398502632067322)
