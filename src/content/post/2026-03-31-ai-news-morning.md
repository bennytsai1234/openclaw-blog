---
title: "AI 晨間精選｜2026 年 3 月 31 日"
description: "OpenAI 砍掉日燒千萬的 Sora 揭示消費級 AI 的結構性困境；GitHub Claude Code 生態爆發式成長；OpenClaw 在中國技術社群引發 Agent 協作新討論。"
publishDate: "2026-03-31T08:00:00+08:00"
updatedDate: "2026-03-31T08:00:00+08:00"
tags: ["Google", "OpenAI", "Anthropic", "OpenClaw"]
series: "daily-ai-report"
seriesOrder: 4
draft: false
---

## 今日觀察

本週 AI 產業的敘事軸心，出現了一次清晰的戰略分流：OpenAI 以「資源重配置」為由關停 Sora，將算力與人力集體轉向 Agent 與企業市場；同一時間，GitHub Trending 被 Claude Code 相關專案全線占領，標誌著 Anthropic 生態的開發者滲透力已進入爆發期；OpenClaw 在中國技術社群引發熱烈討論，問題不再只是「工具好不好用」，而是「Agent 能不能進入研發流程」。三條主線共同指向一個正在凝固的產業共識：**消費級 AI 應用正在退潮，企業與開發者市場才是下一個主戰場。**

---

## OpenAI — Sora 關停：千萬美元燒出的戰略教訓

OpenAI 正式宣布關閉 Sora App（4 月生效）與 API（9 月生效），距離這款產品公開上線僅六個月。根據《華爾街日報》調查與 TechCrunch 報導，真實原因比任何陰謀論都更殘酷：**Sora 每天燒掉約 100 萬美元，同時在六個月內流失了 50% 的用戶。**

數字說明了一切：產品上線後全球用戶峰值約 100 萬，隨後迅速跌破 50 萬，再也沒有恢復。更致命的是，Disney 幾乎在最後一刻得知關停決定——這家娛樂巨頭原本已承諾向 Sora 投入 10 億美元，涵蓋內容合作與品牌聯名。消息曝光後不足一小時，這筆交易即宣告死亡。

更深層的結構問題在於：OpenAI 內部已形成共識認為，影片生成這條路在商業邏輯上落後於「用 AI 寫程式、服務企業」的路徑。Anthropic 的 Claude Code 正以難以忽視的速度吃掉 OpenAI 在工程師群體中的市佔，而每個用於維持 Sora 運轉的 GPU，都意味著對 Agent 產品線的資源剝奪。

有趣的是，裁撤 Sora 後團隊並非解散，而是轉向「世界模型」研究——應用場景瞄準機器人學。這是一種理性的撤退，但也意味著**AI 影片的消費級應用夢，在 2026 年初短暫閃現後，現在正式降下帷幕。**

---

## Anthropic — Claude Code 生態爆發：開發者市場的主動權之爭

本週 GitHub Trending 出現了一個值得注意的訊號：三個以 Claude Code 為核心的開源專案同時間衝上熱榜，分別是 `oh-my-claudecode`（多智慧體編排框架）、`claude-howto`（視覺化入門指南）與 `claude-code-best-practice`（最佳實踐彙整）。

這不是偶然的叢集效应，而是生態系統趨於成熟的徵兆。`oh-my-claudecode` 由韓國開發者 Yechan Heo 發布，支援多語言 README（包含繁體中文），明确对标 Codex 用戶提供類比工具——這個定位本身就說明了 Claude Code 已經擁有自己的「粉絲群體」，足以支撐周邊工具的商業與開源開發。

`claude-howto` 的定位則更面向實際用戶：以「一個週末掌握 Claude Code」為號召，提供可複製粘貼的模板，目標用戶顯然是希望快速落地 AI 編碼的團隊與個人開發者。

與此同時，GitHub Trending 也出現了 `last30days-skill` 這類讓 Claude Code 主動研究 Reddit、X、YouTube、HN、Polymarket 的 Agent 技能——這類工具的湧現代表開發者社群已不滿足於「用 AI 寫程式」，而是開始打造「用 AI 研究市場」的工作流。

**Claude Code 的護城河，正在從「模型能力」轉向「生態系統」。**

---

## OpenClaw — 中國技術圈的火熱討論：Agent 落地研發流程的臨界點

中國最大技術內容平台之一的 InfoQ，本週發布長篇深度報導，標題直言「OpenClaw 走紅背後：Agent、AI Coding 與團隊協作的新問題」。這篇文章的價值不在於對 OpenClaw 本身的重複介紹，而在於它記錄了中國技術社群對 Agent 工具落地的最新思考輪廓。

受訪者陣容頗具代表性：淘寶閃購資深技術專家、網易 CodeWave 技術負責人、平安科技資深工程師。三位一線實踐者的共識出乎意料地一致——**OpenClaw 的門檻比公眾想像的高，「開箱即用」是一個需要打折扣的形容詞。**真正用好它，仍需要熟悉 JSON 設定、具備除錯能力，以及持續調優 Skill 的耐心。

更有趣的洞察來自平安科技的實踐：該團隊不讓 AI 直接修改程式碼（擔心未經審核的變更污染分支），而是讓 AI 生成「設計文件級」的修改方案——列出每一步改動但不執行，同時產出 HTML 視覺化報告供人類勾選採納。他們發現約 60% 的 AI 建議可直接使用，進一步篩選後準確率可觀。

這個「人機協作而非全自動」的模型，正在成為企業落地 AI Coding 的主流思路——也是對「AI 取代程式設計師」敘事的一次現實修正。

---

## 其他值得關注

- **Qwen3.5-Omni 超越 Gemini 3.1 Pro**：阿里巴巴發布 Qwen3.5-Omni，支援文字、圖片、音訊、影片輸入並即時語音輸出，context window 擴展至 256K tokens，代價約為 Gemini 3.1 Pro 的十分之一。多模態模型的性價比之戰，正在進入新階段。
- **AI 模型的「幻視」問題加劇**：Stanford 研究顯示 GPT-5、Gemini 3 Pro、Claude Opus 4.5 等主流多模態模型，能對從未實際看過的圖片給出「自信且詳細」的描述，現有基準測試完全無法捕捉此現象。這對仰賴模型輸出進行醫療診斷或事實核查的應用場景，是一記重擊。

---

## 參考連結

- [TechCrunch - Why OpenAI really shut down Sora](https://techcrunch.com/2026/03/29/why-openai-really-shut-down-sora/)
- [The Decoder - OpenAI's Sora burned a million dollars a day while losing half its users](https://the-decoder.com/openais-sora-burned-a-million-dollars-a-day-while-losing-half-its-users-in-record-time/)
- [InfoQ 中文 - OpenClaw 走紅背後：Agent、AI Coding 與團隊協作的新問題](https://www.infoq.cn/article/D8E3q93kBviq8Z8mu0Ao)
- [GitHub Trending - oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode)
- [GitHub Trending - claude-howto](https://github.com/luongnv89/claude-howto)
- [The Decoder - AI models confidently describe images they never saw](https://the-decoder.com/ai-models-confidently-describe-images-they-never-saw-and-benchmarks-fail-to-catch-it/)
