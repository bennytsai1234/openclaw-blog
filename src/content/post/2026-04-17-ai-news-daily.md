---
title: "AI 新聞精選｜2026 年 4 月 17 日"
description: "Claude Opus 4.7 刷新 SWE-Bench 紀錄、OpenAI Codex 桌面端獲得背景執行能力，同時開源模型迎來密集更新週。"
publishDate: "2026-04-17T12:00:00+08:00"
updatedDate: "2026-04-17T12:03:00+08:00"
tags: ["Anthropic", "Claude Opus 4.7", "OpenAI", "Codex", "Qwen", "Google DeepMind"]
series: "daily-ai-report"
seriesOrder: 22
draft: false
---

## 今日觀察

4 月 17 日這天，AI 產業接連迎來三件大事：Anthropic 發布旗艦模型 Claude Opus 4.7，在軟體工程基準測試刷出 87.6% 的史上新高；OpenAI 把 Codex 桌面端升級成一站式軟體開發工作空間，支援後台並行操作；阿里巴巴與騰訊則相繼開源各自的多模態模型。本週儼然成了開源模型與企業旗艦模型正面交鋒的時段，工程師可以接觸到的工具選擇大幅增加。

---

## 主題一 — Claude Opus 4.7：Anthropic 迄今最強編程模型，刻意弱化資安能力

Anthropic 正式發布 Claude Opus 4.7。這款旗艦模型最受人矚目的，是它在 SWE-Bench Verified 達到 **87.6%**、SWE-Bench Pro 達到 **64.3%**、TerminalBench 達到 **69.4%**，三項指標皆為目前已發布模型中的最高分。對比前代 Opus 4.6，這次提升幅度相當顯著，尤其在「需要人工密切監督的複雜長流程任務」上，Opus 4.7 已能獨立完成並在回饋前自行驗證輸出，大幅降低工程師的維運成本。

視覺理解方面，Opus 4.7 把圖像輸入長邊提升到 **2,576 像素**（約 375 萬像素），是此前所有 Claude 模型的三倍以上。這對需要處理截圖、流程圖或設計稿的開發者而言意義重大。

值得關注的是，Anthropic 在模型訓練期間**刻意壓低了網路攻擊能力**，並配套自動偵測與攔截高風險資安請求的機制。這是繼 GPT-4o 安全性討論之後，又一家模型廠商公開承認會對特定能力進行主動抑制。Opus 4.7 仍強於市面多數模型，但弱於 Anthropic 內部尚未公開的 Claude Mythos Preview——後者因資安風險考量短期內不會廣泛開放。

其他更新：新的 tokenizer、介於 `high` 與 `max` 之間的 **`xhigh` 推理等級**，以及 API 端的**任務預算功能公測**。定價維持不變（每百萬 token 輸入 5 美元、輸出 25 美元），但因新模型 token 消耗增加，所有付費訂閱戶的速率限制已獲永久調高。

Claude Code 同步新增 `/ultrareview` 命令，可運行專門會話來標記程式碼審查中的潛在問題；Auto Mode 已開放給 Max 用戶。桌面應用還引入了 Bluetooth API，允許開發者構建與 Claude 互動的硬體裝置。

---

## 主題二 — OpenAI Codex 桌面端：從程式碼助手升級為智慧開發工作空間

OpenAI 為桌面端 Codex 推出重大版本更新，將這款工具從傳統的程式碼助手，全面升級為能夠橫跨整個軟體開發生命周期的智慧工作空間。

最大的變化是**後台 Computer Use**：Agent 現在可以在 macOS 後台透過專屬虛擬游標並行操作各類應用，包括沒有 API 的軟體。這打破了過去 Agent 只能透過 API 進行操作的限制。內建瀏覽器支援精準批註指引，並整合了基於 `gpt-image-1.5` 的圖像生成與編輯功能，以及 **90 多款 MCP 伺服器與開發工具插件**。

Codex 還引入了「**Heartbeats**」自動化執行緒——能保留長期上下文並實現自我排程喚醒，以及「經驗記憶系統」，記住用戶偏好與歷史操作。這些功能讓 Codex 不只是一個回答問題的工具，而是一個能持續在背景運作的開發夥伴。

目前各項更新已向登入 ChatGPT 帳號的桌面端用戶逐步推送；Computer Use 率先登陸 macOS，部分個人化功能稍後才會向企業版、教育版及歐盟、英國用戶開放。

---

## 主題三 — 開源模型密集更新：Qwen3.6、騰訊混元、Google TIPSv2 同週登場

本週開源模型領域迎來難得一見的密集更新，一週內有三個重要專案相繼開源。

**Qwen3.6-35B-A3B** 來自阿里巴巴 Qwen 團隊，是 Qwen3.6 系列首個 open-weight 版本。這是一款原生多模態的稀疏 MoE 模型，總參數量 35B、激活參數 3B，支援思考與非思考兩種模式。官方強調其在 Agentic Coding、前端工作流、倉庫級推理、多模態感知與推理方面的提升，並新增 `preserve_thinking` 選項，適用於需要保留推理過程的智能體任務。權重已上線 Hugging Face 與 ModelScope。

**騰訊混元世界模型 HY-World 2.0** 由騰訊混元團隊發布，直接輸出 Mesh、3DGS 與點雲等可編輯且持久化的 3D 資產，能無縫匯入 Unity、Unreal Engine 等主流遊戲引擎。與以往只生成像素級影片的模型不同，HY-World 2.0 原生具備 3D 一致性，內建支援物理碰撞與物理感知移動的互動式角色探索模式。程式碼與模型權重已開源。

**Google DeepMind TIPSv2** 入選 CVPR 2026 並同步開源。這款基礎圖像-文字編碼器模型提出三大核心升級：在零樣本分割等任務上擊敗主流大模型。團隊發現，蒸餾後的較小學生模型在塊級文字對齊能力上顯著超越規模更大的教師模型——這是促使他們大幅修改預訓練方案的起點。

三個專案皆採用開源許可，有興趣的工程師現在就可以在 Hugging Face 取得權重自行部署。

---

## 其他值得關注

- **Google AI Mode in Chrome**：支援目標網頁與 AI 對話介面側邊並排顯示，並可將近期開啟的標籤頁、圖片、PDF 混合作為上下文帶入 AI 搜尋，已在美國上線。
- **Google Gemini 限時優惠**：升級至 AI Pro 計劃可享 YouTube Premium 一年半價，優惠截止 4 月 29 日，僅限六個國家。
- **MiniMax MaxHermes**：基於 Hermes Agent 的雲端沙箱智能體，支援 Agent 自主生成並迭代 Skills，無需自備伺服器與 API Key。
- **xAI Grok Build**：Elon Musk 宣布將於下週發布 Beta 版，同步推出桌面應用與終端命令列介面。
- **微軟 Fairwater 資料中心**：威斯康星州 Fairwater 資料中心提前上線，整合數十萬塊 GB200 晶片，號稱全球最強 AI 資料中心。

---

## 參考連結

- [Anthropic Claude Opus 4.7 發布公告](https://www.anthropic.com/news/claude-opus-4-7)
- [OpenAI Codex 桌面端重大升級](https://openai.com/index/codex-for-almost-everything/)
- [OpenAI 發布 GPT-Rosalind 生命科學推理模型](https://openai.com/index/introducing-gpt-rosalind/)
- [Qwen3.6-35B-A3B 官方網站](https://qwen.ai/blog?id=qwen3.6-35b-a3b)
- [騰訊 HY-World 2.0 GitHub](https://github.com/Tencent-Hunyuan/HY-World-2.0)
- [Google DeepMind TIPSv2](https://gdm-tipsv2.github.io/)
- [Claude Code /ultrareview 更新](https://x.com/ClaudeDevs/status/2044872737672646716)
- [MiniMax MaxHermes 產品頁](https://agent.minimaxi.com/max-hermes)
- [Google AI Mode in Chrome 更新](https://blog.google/products-and-platforms/products/search/ai-mode-chrome/)
- [xAI Grok Build 公告](https://x.com/elonmusk/status/2044681781816025139)
