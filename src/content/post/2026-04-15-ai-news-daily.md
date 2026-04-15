---
title: "AI 新聞精選｜2026 年 4 月 15 日"
description: "GPT-5.4-Cyber 瞄準網路防御、Gemini Robotics-ER 1.6 賦予機器人儀表閱讀能力、Claude Code Routines 推動雲端自動化開發"
publishDate: "2026-04-15T12:00:00+08:00"
updatedDate: "2026-04-15T12:06:00+08:00"
tags: ["OpenAI", "Google DeepMind", "Anthropic", "NVIDIA", "Meta"]
series: "daily-ai-report"
seriesOrder: 14
draft: false
---

## 今日觀察

4 月 15 日這天，各家 AI 實驗室同時在「專業化」這個方向集體加速。OpenAI 推出 GPT-5.4-Cyber，把大語言模型的能力邊界推到網路安全防御場景；Google DeepMind 的 Gemini Robotics-ER 1.6 讓機器人第一次能精準讀取工業儀表；Anthropic 的 Claude Code Routines 則把 AI 編碼助手從本地工具升級成可脫機運行的雲端自動化系統。三條新聞發生在同一天，不是巧合——這預示著 AI 的下一階段競爭，已經從「誰的基底模型更強」轉移到「誰能把模型能力落地到更窄的垂直場景」。

---

## GPT-5.4-Cyber：OpenAI 的網路防御新陣地

OpenAI 在 4 月 15 日宣布擴大「網路安全信任訪問計劃」（Trusted Access for Cyber，TAC），並同步推出 GPT-5.4-Cyber。這款模型並非 GPT-5.4 的通用版本，而是一款專為合法網路防御微調的變體，最大的改變在於安全攔截邊界大幅放寬，讓安全研究人員能夠執行過去被禁止的高級操作。

其中最值得注意的能力是**二進位逆向工程**。過去即使安全研究人員想要分析一段編譯後的二進位程式是否包含惡意程式碼，往往會因為模型「過度保守」而無法獲得有意義的輸出；GPT-5.4-Cyber 在這裡特別放寬了限制，允許模型在看不見原始碼的情況下對編譯過的軟體進行漏洞分析。這項能力對於防御勒索軟體、APT 攻擊等需要快速逆向樣本的場景，實用價值極高。

目前 GPT-5.4-Cyber 採用**有限迭代部署**的方式，僅向最高層級 API 客戶、通過審查的安全供應商與研究人員開放，個人防御者與企業團隊可透過特定身份驗證流程申請。這個節奏意味著 OpenAI 目前仍在觀察模型在真實防御場景中的表現，尚未準備好大規模開放。對 AI 安全社群而言，這款模型的推出代表大語言模型在網路安全領域從「輔助工具」正式邁入「核心工作流」——它的影響力將取決於 OpenAI 後續開放的速度與範圍。

---

## Gemini Robotics-ER 1.6：機器人第一次讀懂工業儀表

Google DeepMind 同日發布了 Gemini Robotics-ER 1.6，這是 DeepMind 機器人系列中首款以「推理優先」為核心設計理念的型號。和過去偏重「感知—行動」直接映射的機器人模型不同，1.6 版本將視覺空間推理與多視角理解列為主軸能力，並新增了一項在工業場景中極具價值的技能：**儀表讀取（instrument reading）**。

所謂「儀表讀取」，指的是機器人能夠精準辨識並讀取複雜工業設備上的指針式或數位儀表數值——這在傳統工廠自動化中是相當困難的任務，因為此類儀表往往缺乏標準化的數位輸出介面，依賴純視覺解析。Gemini Robotics-ER 1.6 在這項任務上的突破，等於為工廠、電廠等場景的智慧化改造打開了一條捷徑。

DeepMind 官方同時強調，這是迄今為止其發布過的「最安全」機器人模型，在對抗性空間推理任務中展現出對安全政策的高度遵守——這個表述在當前人形機器人頻傳工安意外的背景下，格外值得觀察。模型現已向開發者全面開放，可透過 Gemini API 與 Google AI Studio 調用，官方同步提供了包含配置範例的 Colab。

---

## Claude Code Routines：把 AI 開發助手變成雲端自動化系統

Anthropic 這天一口氣更新了兩項與 Claude Code 相關的功能。首先是**桌面版 Claude Code 的全面重構**：新版支援單一視窗內並排運行多個 Claude 會話，並內建終端、程式碼編輯器、HTML 與 PDF 預覽器以及更快速的 diff 查看器，布局支援拖拽自訂，完全相容命令行插件。這次重構解決了過去桌面版長期被認為功能遠落後於 CLI 版本的問題。

更重要的是，Anthropic 推出了 **Claude Code Routines**——這是一項將 Claude Code 配置打包後放到雲端全自动運行的功能。開發者可以把自己寫好的提示詞、代碼庫快照與 MCP 連接器打包成一個「Routine」，然後透過三種觸發器啟動任務：**定時觸發**（按小時或天數週期執行）、**API 觸發**（發送帶有 Bearer Token 的 HTTP POST 請求），以及 **GitHub 事件觸發**（響應 push、Pull Request 等倉庫操作）。這意味著開發團隊可以在本地設備關閉的情況下，讓 AI 自動完成每日的程式碼審查、測試執行或錯誤修復——過去需要自己架 CI/CD pipeline 才能做到的事，現在變成了一個配置即有的功能。

Routines 目前處於研究預覽版階段，已向開通 Claude Code 網頁版的 Pro、Max、Team 與 Enterprise 計劃用戶開放。

---

## 其他值得關注

- **Meta 攜手 Broadcom 研發 MTIA 晶片**：部署規模已超 1GW，代表雲端大廠自研 AI 晶片的趨勢正進入下一階段。
- **NVIDIA Ising 開放模型**：用於量子處理器校準與解碼，350 億參數視覺語言模型在 QCalEval 基準上平均領先 GPT-5.4 約 14.5%。
- **Vercel 開源 Open Agents**：採用 Agent 與沙箱解耦架構，提供雲端全自動化程式設計的參考實現，不綁定特定大模型。
- **百度 ERNIE-Image 開源**：8B 參數單流 Diffusion Transformer，支援中英文長文本渲染，已上線 Hugging Face。

---

## 參考連結

- [OpenAI — Scaling Trusted Access for Cyber Defense](https://openai.com/index/scaling-trusted-access-for-cyber-defense/)
- [Google DeepMind — Gemini Robotics-ER 1.6](https://deepmind.google/blog/gemini-robotics-er-1-6/)
- [Anthropic — Claude Code Routines](https://claude.ai/code/routines)
- [Anthropic — Claude Code Desktop Redesign](https://x.com/claudeai/status/2044131493966909862)
- [Meta & Broadcom — MTIA AI Silicon Partnership](https://about.fb.com/news/2026/04/meta-partners-with-broadcom-to-co-develop-custom-ai-silicon/)
- [NVIDIA — Ising Open Models for Quantum Computing](https://developer.nvidia.com/blog/nvidia-ising-introduces-ai-powered-workflows-to-build-fault-tolerant-quantum-systems)
- [Vercel Labs — Open Agents](https://github.com/vercel-labs/open-agents)
- [Baidu — ERNIE-Image on Hugging Face](https://huggingface.co/Baidu/ERNIE-Image)
