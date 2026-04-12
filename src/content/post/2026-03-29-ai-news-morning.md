---
title: "AI 晨間精選｜2026 年 3 月 29 日"
description: "OpenAI 宣布終止 Sora、Anthropic 被比擬為菸草產業的解毒劑、Google Gemini Agent Skill 讓成功率從 28% 飆至 97%。"
publishDate: "2026-03-29T08:00:00+08:00"
updatedDate: "2026-03-29T08:00:00+08:00"
tags: ["Google", "OpenAI", "Anthropic", "OpenClaw"]
series: "daily-ai-report"
seriesOrder: 4
draft: false
---

## 今日觀察

本日 AI 行業出現三個戰略性位移：OpenAI 確認終止 Sora 的時間表，代表生成式媒體的實驗階段正式結束；Anthropic 的高層敘事從「安全公司」升級為「產業良心」，用菸草工業的對照系來定義自己的品牌位置；與此同時，Google 的 Gemini Agent Skill 首次量化了「技能沉積」對推論效果的爆炸性提升——從 28% 到 97%，這不只是一個數字，而是對整個 Agent Skills 生態系統的原理級驗證。三件事說的是同一個故事：LLM 的戰爭下半場，正在從模型能力轉向生態系統黏性。

---

## [OpenAI] — Sora 確認終結：4月26日下架，9月24日關 API

OpenAI 正式確認了 Sora 的兩階段關閉時間表：web 版和 App 版將在 4 月 26 日下線，Sora API 跟進在 9 月 24 日終止服務。用戶被敦促在截止日期前下載所有內容，資料在期限後永久刪除。

這不是一個意外的失敗，而是戰略重心的果斷撤退。根據 The Decoder 的分析，OpenAI 的方向是將算力集中在程式碼工具和企業客戶——與 Anthropic 的策略高度類似——以及一個整合 ChatGPT、Codex 和 Atlas 瀏覽器的超級 App。Sora 將以研究項目的形式繼續存在，專注於世界模型，長期目標是「自動化實體經濟」。

迪士尼也在 Sora 下線消息後隨即退出與 OpenAI 的合作關係。一個上線僅數月的產品從應用市場和 API 同時撤退，同時合作夥伴跟進切割，這在 AI 行業仍是罕見的終局敘事。

---

## [Anthropic] — 被比擬為菸草工業的「解毒劑」：品牌定位戰的升級

Sam Altman 傳記作者 Keach Hagey 的一篇報導揭示了 Anthropic 成立背後更真實的歷史：不只是對 AI 安全風險的擔憂，更是 OpenAI 內部一段充滿個人嫌隙、權力鬥爭與策略分歧的故事，最終形成了 AI 行業史上最具影響力的分裂。

而 Anthropic 現在試圖將自己定調為 OpenAI「菸草工業模式」的解毒劑——菸草公司知道產品有害但繼續銷售，OpenAI 的批評者則指責它在安全與速度之間選擇了後者。這套論述與 Anthropic 拒絕國防部合約、聯邦法官叫停政府禁令的實際行動形成呼應，構成了一套「說什麼 + 做什麼」的品牌一致性。

同一套敘事正在用另一種形式變現：Google 借鑒了 Anthropic 的「記憶遷移」做法，允許 Gemini 用戶從 ChatGPT 和 Claude 匯入保存的提醒事項、偏好設定和完整聊天記錄，過程是將前一個 AI 應用的摘要貼入 Gemini，後者則重新建立自己的上下文。Google 甚至將「Past Chats」重新命名為「Memory」。

---

## [Google] — Gemini Agent Skill：28% 到 97% 的實證

Google 為 Gemini API 打造了一個「Agent Skill」，直指 AI 編碼助手的最核心缺陷：模型一旦訓練完成，就對自己的更新和當前最佳實踐一無所知。這個新 Skill 為編碼 Agent 提供即時的最新模型資訊、SDK 文件和範例程式碼。

在 117 項任務的測試中，Gemini 3.1 Pro Preview 的成功率從 28.2% 飆升至 96.6%。值得注意的是，2.5 系列等較舊模型的改善幅度極小，Google 將原因歸結為較弱的推理能力——這意味著 Agent Skill 的效果與模型本身的推理能力高度相關：推理越強，從外部知識注入中獲益越多。

值得關注的是，Vercel 的研究顯示 AGENTS.md 文字檔案（直接指令）可能比複雜的 Skill 系統更有效。Google 同時也在探索 MCP（Model Context Protocol）服務——而這個協議，正是 OpenClaw 生態系統的關鍵骨幹之一。Skills 生態正在成為各家公司——Anthropic、OpenAI、Google——的兵家必爭之地，而開源社群已經在推動 MCP 成為跨平台的標準。

---

## 其他值得關注

**Anthropic 的 Claude SDK for Python 登 GitHub Trending**。Anthropic 官方推出的 Claude Agent SDK for Python 現身 GitHub Trending，結合 oh-my-claudecode、claude-hud 等工具，Claude 的開源工具鏈正在快速補完。

**Cohere 推出開源轉錄模型 Transcribe**。加拿大 AI 公司 Cohere 發布了一款名為「Transcribe」的開源 ASR 模型，宣稱在 Hugging Face Open ASR Leaderboard 拿下榜首。

---

## 參考連結

- [OpenAI sets two-stage Sora shutdown](https://the-decoder.com/openai-sets-two-stage-sora-shutdown-with-app-closing-apr)（The Decoder）
- [Anthropic reportedly views itself as the antidote to OpenAI's "tobacco industry"](https://the-decoder.com/anthropic-reportedly-views-itself-as-the-antidote-to-opena-is-tobacco-industry/)（The Decoder）
- [Google's new Gemini API Agent Skill patches the knowledge gap](https://the-decoder.com/googles-new-gemini-api-agent-skill-patches-the-knowledge-gap/)（The Decoder）
- [Anthropic's new data shows AI skill builds over time](https://the-decoder.com/anthropics-new-data-shows-ai-skill-builds-over-time-and-that-could-widen-the-i/)（The Decoder）
- [Claude SDK for Python on GitHub](https://github.com/anthropics/claude-agent-sdk-python)（GitHub）
