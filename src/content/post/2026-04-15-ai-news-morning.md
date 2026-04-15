---
title: "AI 晨間精選｜2026 年 4 月 15 日"
description: "UK AISI 實測 Claude Mythos 首次自主完成全鏈路網路攻擊；史丹福 AI 指數顯示中美模型實力已無差距，22-25 歲開發者就業驟降近 20%；Anthropic 將 Claude Code 自動化工作流推向雲端。"
publishDate: "2026-04-15T08:00:00+08:00"
updatedDate: "2026-04-15T08:05:00+08:00"
tags: ["Anthropic", "Claude Mythos", "Claude Code", "Stanford HAI", "OpenAI"]
series: "daily-ai-report"
seriesOrder: 4
draft: false
---

## 今日觀察

**Claude Mythos 拉開了 AI 網路安全的新紀元。** 英國 AI 安全研究所（AISI）本週公布實測結果：Anthropic 的 Claude Mythos Preview 是首款在受控環境下自主完成 32 步全鏈路滲透攻擊的 AI 模型。與此同時，OpenAI 宣布 GPT-5.4-Cyber 正式上線，兩家公司的網路安全軍備競賽正式開打。史丹福 AI 指數 2026 的數據則從宏觀視角補了一刀：中美模型性能差距已收窄至 2.7%，但開發者的就業市場正在以同樣的速度萎縮。

---

## Claude Mythos 實測揭曉：AI 第一次從開頭打到結尾

英國 AI 安全研究所（AISI）4 月 14 日發布對 Anthropic Claude Mythos Preview 的網路安全評測報告，這是迄今最完整的「AI 能不能真的打穿企業網路」實證。

**核心數據：**

- 在 CTF（奪旗）挑戰中，Mythos Preview 初階正確率達 85%，實務級達 93%，專家級來到 **73%**——而就在 2025 年 4 月之前，沒有任何模型能解開專家級題目
- 在代號「The Last Ones（TLO）」的 32 步完整攻擊模擬中，Mythos 成功完成全部 32 步的機率為 **3/10**，平均完成 **22/32 步**；對比下一名 Claude Opus 4.6 平均僅 16 步
- AISI 評估，人類資安專家完成同樣攻擊約需 20 小時

Mythos Preview 目前僅開放約 50 家企業使用，AISI 指出，模型「能夠在弱防禦的小型企業網路中自主執行完整攻擊」。不過實測環境沒有主動防禦、沒有安全工具、也沒有誤操作代價——現實世界的表現仍是未知數。

**為什麼重要：** 這不只是「模型變強了」這麼簡單。過去 AI 在網路安全領域的能力上限大約是「找到一個漏洞」，現在 Mythos 可以「鏈結數十個步驟從偵察到橫向移動到拿下管理員權限」。AISI 明確警告：隨著推論算力增加，這些數字還會繼續上升。基礎資安衛生——定期修補、嚴格存取控制、日誌監控——的重要性比以往任何時候都更高。

---

## 史丹福 AI 指數 2026：中美已無差距，但就業市場正在反噬

史丹福人類中心 AI 研究所（Stanford HAI）本週發布年度 AI 指數報告，涵蓋研究、產業、社會影響三大維度。以下是對開發者群體最直接的幾個數據點：

**模型性能：** US 與 China 的頂尖模型實力差距已收窄至 **2.7%**（以 Anthropic 領先模型為 US 代表），雙方自 2025 年初以來輪流交換榜首位置。Gemini Deep Think 在國際數學奧林匹亞競賽中獲金牌。

**開發者就業：** 這是最刺耳的數字。在軟體開發領域，22-25 歲美國開發者就業人數自 2024 年以來**下降了近 20%**——而同一份報告同時記錄了 14-26% 的生產力提升。

**AI 採用速度：** 生成式 AI 在三年內達到 53% 人口覆蓋，速度超越 PC 與網際網路。軟體開發的 AI agent 企業採用率仍停留在個位數，但「單點任務」的滲透已相當可觀。

**值得关注的矛盾：** 73% 的美國 AI 專家對 AI 影響就業市場持樂觀態度，但僅 23% 的一般民眾同意。專家與公眾活在兩個截然不同的 AI 世界裡。

---

## Claude Code Routines：開發自動化從本地端走向雲端

Anthropic 本週為 Claude Code 推出「Routines」功能——將原本本地端的自動化工作流搬上雲端，意味著開發者不再需要保持機器開機，自動化就可以持續運作。

**能做什麼：**

- 夜間 bug 分類（nightly bug triage）
- 根據團隊規範自動 code review
- 不同程式語言之間的程式碼移植
- 部署後錯誤檢查

觸發方式支援三種：排程（schedule）、GitHub 事件（pull request opened、branch merged 等）、API 直接呼叫。外部服務整合目前支援 Slack 與 Asana，未來將開放更多 webhook 來源。

Routines 目前以研究預覽形式提供，Pro、Max、Team、Enterprise 方案每日分別有 5-25 次執行配額。這是 Anthropic 過去數週對 Claude Code 密集更新的最新一環：桌面版自動啟動開發伺服器、/loop 本地背景任務、到現在的雲端 Routines——開發自動化的基礎建設正在快速補全。

---

## OpenAI 估值 8,520 億美元，內部投資人開始有疑慮

就在 OpenAI 完成 1,220 億美元創紀錄融資後不久，部分內部投資人對公司 8,520 億美元估值開始出現疑慮。FT 報導指出，CEO Sam Altman 正帶領 OpenAI 從消費者市場轉向企業端 AI，試圖抵禦來自 Anthropic 日益激烈的競爭。

這與 OpenAI 原本的「AI 為所有人」的定位存在戰略張力：企業市場強調可控性、客製化與合规，而消費者市場強調規模與易用性。Anthropic 近期以 Claude Mythos 搶佔資安高地、Claude Code Routines 搶攻開發者工作流，雙方在產品線上的交錯越來越密集。

值得觀察的是，Anthropic 同時正面反對一個由 OpenAI 支持的伊利諾伊州 AI 責任法案，聲稱該法案將讓 AI 實驗室對「大規模死亡與金融災害」基本免於問責。監管戰場與產品戰場正在同步升溫。

---

## 其他值得關注

- **Google Chrome「Skills」功能**：Gemini 整合进 Chrome，使用者可將常用 AI prompt 儲存為一鍵工具，跨網站重複使用
- **NousResearch Hermes-Agent**：GitHub Trending 上的自改進 AI agent，內建從經驗中建立技能（skill）的學習迴圈
- **OpenAI 收購 Hiro**：OpenAI 買下打造「個人 AI CFO」的金融新創，ChatGPT 加入財務規劃能力的路徑越來越清晰
- **GPT-5.4-Cyber**：OpenAI 正式向通過審核的防御者釋出新款網路安全模型，劍指 Claude Mythos 的同類能力

---

## 參考連結

- [AISI - Claude Mythos Preview Cyber Evaluation](https://www.aisi.gov.uk/)
- [The Decoder - Claude Mythos autonomously compromises enterprise networks](https://the-decoder.com/claude-mythos-can-autonomously-compromise-weakly-defended-enterprise-networks-end-to-end/)
- [Stanford HAI - AI Index Report 2026](https://hai.stanford.edu/ai-index/2026-ai-index-report)
- [The Decoder - Stanford AI Index 2026](https://the-decoder.com/stanfords-ai-index-2026-shows-rapid-progress-growing-safety-concerns-and-declining-public-trust/)
- [The Decoder - Claude Code Routines](https://the-decoder.com/claude-code-routines-let-ai-fix-bugs-and-review-code-on-autopilot/)
- [Reuters - OpenAI investors question $852B valuation](https://www.reuters.com/legal/transactional/openai-investors-question-852-billion-valuation-strategy-shifts-ft-reports-2026-04-14/)
- [Wired - Anthropic opposes Illinois AI liability bill](https://www.wired.com/story/anthropic-opposes-the-extreme-ai-liability-bill-that-openai-backed/)
- [The Decoder - Claude Mythos cyber capabilities](https://the-decoder.com/claude-mythos-can-autonomously-compromise-weakly-defended-enterprise-networks-end-to-end/)
