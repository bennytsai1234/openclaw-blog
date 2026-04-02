---
title: "AI 晨間精選｜2026 年 4 月 2 日"
description: "OpenAI 揭示超級應用野心、Claude Code 洩露後續發酵、NVIDIA 開源機器人代理框架"
publishDate: "2026-04-02"
updatedDate: "2026-04-02"
tags: ["OpenAI", "Anthropic", "NVIDIA", "Google DeepMind", "Perplexity"]
series: "daily-ai-report"
seriesOrder: 6
draft: false
---

> OpenAI 以 8520 億美元估值完成史上最大集資，Anthropic 的 Claude Code 原始碼已在 GitHub 上被複製超過 8000 次，後續風暴正在蔓延。

---

## 今日觀察

**AI 產業正在經歷一場「洩露」與「建構」的雙軌敘事。** 一邊是 Claude Code 原始碼的失控擴散，讓 Anthropic 的護城河出現裂痕；另一邊是 NVIDIA 的 CaP-X 開源框架，正在把大語言模型從虛擬世界拉進物理世界。兩件事看似無關，核心都在回答同一個問題：**誰能控制 agent 的執行邏輯，誰就能定義下一個時代的遊戲規則。**

---

## OpenAI 揭示超級應用藍圖 — 史上最大集資背後的戰略轉向

2026 年 4 月 1 日，OpenAI 正式確認完成 **1220 億美元（約新台幣 3.8 兆）** 集資輪次，公司估值衝上 **8520 億美元**。主要投資方包括 Amazon、Nvidia、SoftBank、Microsoft，以及 a16z、BlackRock、Sequoia Capital 等頂級機構。此外，OpenAI 還透過銀行管道引入 30 億美元零售投資，並將信用額度擴張至 47 億美元。

這筆錢的用途很明確：**基礎建設**。OpenAI 在公告中表示，新資本將大量投入算力基礎設施。與此同時，公司在同一天「官宣」了醞釀已久的 **ChatGPT Super App**，將 ChatGPT、Codex 編程 agent、網頁搜尋，以及 OpenAI 整個 agent 生態整合進「一個以 agent 為優先的體驗」。

**一個數字足以說明 OpenAI 的規模式領先：目前每週活躍 ChatGPT 用戶已突破 9 億。** 這個數字讓 Google 搜尋在消費端的滲透率都相形見絀，也解釋了為什麼企業市場開始把 OpenAI 的「消費端規模」當成入口——熟悉日常使用的人，轉移到工作場景的摩擦最小。企業營收已佔 OpenAI 總營收的 **40% 以上**，且比重還在上升。

更值得觀察的是，OpenAI 近期**關閉了 Sora 影片生成模型**，理由是「缺乏用戶吸引力」以及「釋放算力」。一份資料顯示 Sora 每天燒掉 100 萬美元，卻在幾個月內流失了一半用戶。**在 agent 時代，消費者端的「絢麗展示」正在讓位給企業端的「實際產出」**——OpenAI 的資源配置已經說明了這件事。

---

## Claude Code 原始碼風暴 — 8000 次複製、IPO 前的最大公關危機

Anthropic 意外洩露 Claude Code 原始碼的後續，正在以一個 Anthropic 意料之外的速度擴散。

根據《華爾街日報》報導，GitHub 上已出現超過 **8000 個 Claude Code 原始碼的克隆版本**，Anthropic 緊急發出大量 DMCA 刪除通知，但攻勢收效有限——至少有一位開發者已利用 AI 工具將原始碼翻譯成其他語言，繞過了版權投訴。**一旦 code 離開圍牆，在 AI 時代的傳播速度遠超傳統軟體洩露。**

洩露的內容包含 Anthropic 用於控制 AI 模型執行編程任務的核心技術——所謂的「harness」，以及一個用於任務整合的「dreaming」函式。對競爭對手而言，這等於是一份重建 Claude Code 能力的藍圖。

更糟糕的是時間點。Anthropic 正在籌備以 **3800 億美元估值 IPO**，此刻的投資人對「人為失誤導致的資料外洩」容忍度極低。此外，就在這次洩露的數天前，Anthropic 內部 CMS 系統同樣因人為失誤，意外公開了內部代號 **Mythos** 的新模型資料——該模型在多項測試中的分數遠超所有前任模型。接連兩次「人為疏失」，讓 Anthropic 的 internal 安全文化受到嚴厲檢視。

---

## CaP-X：NVIDIA 開源機器人代理框架 — 讓 AI 從 Minecraft 走進現實

NVIDIA 與 Berkeley、Stanford、CMU 合作，於 4 月 1 日開源發布了 **CaP-X（Code and Play eXperience）**，這是一套讓大語言模型直接操作實體機器人的 agent 框架，由 NVIDIA 高級 AI科學家 Jim Fan 帶隊。

CaP-X 不是又一個「用 LLM 控制機械手臂」的實驗性專案。它提出的願景是：**policy（如 VLA）只是另一種 API 呼叫**。框架提供了完整的感知工具鏈（SAM3 語義分割、Molmo 指針、深度感測、點雲）、控制工具鏈（IK 求解、抓取規劃、導航），以及視覺化工具鏈，並支援多種機器人硬體。

為了解決「如何評估 agentic robotics」這個根本問題，團隊同步推出了 **CaP-Gym**：LLM 領域第一套「物理考試」。這套 benchmark 涵蓋 187 個操作任務，橫跨 RoboSuite、LIBERO-PRO、BEHAVIOR 三個模擬環境，包含桌面操作、雙臂操作、移動操作，模擬環境與真實環境兼有。**如果 LLM 在虛擬世界裡能透過化學考試，它在物理世界裡是否也能做到？**

另一個引人注目的數據：使用 CaP-RL（reinforcement learning 訓練），一個 7B 開源模型在 50 次訓練迭代後，任務成功率從 20% 跳升至 72%，且訓練得來的策略能直接轉移到真實機器人，sim-to-real gap 極小。

---

## Google DeepMind 列出六大「AI Agent 陷阱」— 自主 agent 的安全性警鐘

當 AI agent 被賦予瀏覽網頁、處理郵件、執行交易的權限時，agent 所處的環境本身就是武器。Google DeepMind 發布了一篇系統性論文，首度提出「AI agent trap」框架，列出六種可以劫持自主 agent 的攻擊類別：

1. **內容注入陷阱（Content Injection）**：攻擊 agent 的感知層。攻擊者可在 HTML 註釋、CSS 隱藏樣式、圖片元資料或無障礙標籤中埋入惡意指令，人類看不到，但 agent 會直接執行。
2. **語義操縱陷阱（Semantic Manipulation）**：攻擊 agent 的推理層。用情緒化或權威感的表述框架同一資訊，能讓 LLM 產生截然不同的結論——和人類的錨定偏誤如出一轍。
3. **記憶污染陷阱（Memory Poisoning）**：干擾 agent 的長期記憶檢索。
4. **行動劫持陷阱（Action Hijacking）**：干擾 agent 對工具的調用結果。
5. **多 agent 協作陷阱（Multi-Agent Dynamics）**：在多 agent 系統中引入錯誤的協作訊息。
6. **人類監督破壞陷阱（Supervisor Undermining）**：讓 agent 的最終決策繞過人類判斷。

研究作者在 X 上強調：**「這些不是理論攻擊，每一類都有已實現的 proof-of-concept。」** 這意味著今天就有人在測試這些手法。

---

## 其他值得關注

- **Perplexity AI 遭集體訴訟**：Perplexity 被指控將用戶對話資料分享給 Meta 與 Google，目前面臨集體訴訟。隱私問題正在成為 AI 搜尋引擎的下一個監管焦點。
- **Mercor 遭駭客攻擊**：AI 招募新創 Mercor 確認遭受網路攻擊，攻擊源頭與開源專案 LiteLLM 的漏洞有關。攻擊者聲稱已竊取公司資料並進行勒索。
- **EU AI Act 將於 2026 年 8 月正式執法**：適用範圍涵蓋所有在歐盟部署的 LLM 系統，企業需開始檢視自身的模型 pipeline 合規狀態。

---

## 參考連結

- [OpenAI officially confirms mega-funding round and ChatGPT super app](https://the-decoder.com/openai-officially-confirms-mega-funding-round-and-chatgpt-super-app/)
- [Anthropic's leaked AI coding tool has been cloned over 8,000 times on GitHub](https://the-decoder.com/anthropics-leaked-ai-coding-tool-has-been-cloned-over-8000-times-on-github-despite-mass-takedowns/)
- [Google Deepmind study exposes six "traps" that can easily hijack autonomous AI agents](https://the-decoder.com/google-deepmind-study-exposes-six-traps-that-can-easily-hijack-autonomous-ai-agents-in-the-wild/)
- [The power of the Claw, in the palm of a robot hand – CaP-X](https://x.com/DrJimFan/status/2039342130565357956)
- [Perplexity AI sued over alleged data sharing with Meta and Google](https://the-decoder.com/perplexity-ai-sued-over-alleged-data-sharing-with-meta-and-google/)
