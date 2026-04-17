---
title: "AI 晨間精選｜2026 年 4 月 17 日"
description: "Claude Opus 4.7 強化編碼能力並主動收斂網安風險、OpenAI Codex 變身常駐桌面 Agent、Physical Intelligence π0.7 在機器人領域實現組合泛化突破。"
publishDate: "2026-04-17T08:00:00+08:00"
updatedDate: "2026-04-17T12:47:00+08:00"
tags: ["Anthropic", "OpenAI", "Physical Intelligence", "Claude Opus 4.7", "機器人"]
series: "daily-ai-report"
seriesOrder: 42
draft: false
---

## 今日觀察

**OpenAI 與 Anthropic 的代理人戰爭**在這週短兵相接：OpenAI 把 Codex 武裝成一隻能在背景操控你桌面的常駐 Agent，直接劍指 Claude Code；同一時間 Anthropic 端出 Opus 4.7，在編碼基準大幅躍進的同時卻主動削弱網安能力——這不是技術退步，而是一套經過計算的商業與安全策略。兩條新聞擺在一起，勾勒出當前 AI 競賽的核心矛盾：能力愈強，社會風險愈高，而各實驗室處理的姿態截然不同。

---

## Claude Opus 4.7 編碼大幅躍進，但刻意收斂網安能力

Anthropic 週四正式釋出旗艦模型 Claude Opus 4.7。根據官方公告，這一代最顯著的改進集中在**進階軟體工程**——特別是那些過去需要 close supervision 的高難度任務，現在可以放心交給 Opus 4.7 獨力完成。模型在長上下文、複雜多步推理上的穩定性提升，工程團隊應該會有感。

**視覺能力也同步升級**：Opus 4.7 能以更高解析度處理圖像，在介面設計、投影片、文件生成等專業場景的品味與創意表達更細緻。API 定價維持不變（輸入 $5／輸出 $25 每百萬 token），對既有用戶幾乎是無痛升級。

值得特別注意的是這次 Anthropic 的**網安能力策略**。Opus 4.7 是第一個針對網安應用實施「差異化降級」的模型：訓練過程中團隊刻意削弱了部分網安能力，並在釋出時加入自動偵測與阻擋高風險網安請求的防護機制。有合法需求的資安專業人士（滲透測試、紅隊演練）可透過 Anthropic 的 Cyber Verification Program 申請解除限制。這套做法的核心邏輯是：先把強大能力做出來，再選擇性地鎖起來，藉此累積真實世界部署數據，為日後 Mythos 等級模型的廣泛釋出做準備。

對工程師而言，Opus 4.7 的訊號很清楚：**Anthropic 在告訴企業用戶「拿我寫生產程式是安全的」，而非拿我當攻擊工具**。這是差異化定位，也是監管壓力下的被動選擇。

---

## OpenAI Codex 升級成常駐桌面 Agent，直接瞄準 Claude Code

OpenAI 同一天讓 Codex 來了一次大幅改造，直接把槍口對準 Anthropic 的 Claude Code。

新版 Codex 的核心能力是**背景多 Agent 協作**：現在可以在你的 Mac 上同時派駐多個 Agent，各自獨立操作不同應用，而不會干擾你本人正在進行的工作。Codex 現在能開啟任何桌面程式、用游標點擊、輸入文字，概念上接近「幫你操作滑鼠鍵盤的 AI 代理人」。

除此外，Codex 还新增了圖像生成、持久記憶，以及外掛系統。OpenAI 在官方公告中將其定調為「不只是 coding assistant，而是企業工作流程的多功能整合層」——從迭代前端改動、測試應用程式，到操作沒有 API 的軟體，場景一口氣拓寬。

這次升級的戰略意圖很明顯：Claude Code 靠著「直接內嵌開發者環境」的體驗，已在許多企業攻城略地；OpenAI 不打算讓這個市場拱手讓人。兩個實驗室現在進入了一個新的競爭維度：**不再是比誰的模型更強，而是在比誰的 Agent 生態更能無縫嵌入真實工作流**。

---

## Physical Intelligence π0.7：機器人也能「觸類旁通」了

機器人 AI 新創 Physical Intelligence 週四發表論文，展示了旗下最新模型 **π0.7** 能夠執行從未明確訓練過的任務——這在機器人領域是一個長期以來只聞樓梯響的能力。

過去機器人訓練的基本範式是「專家模式」：收集特定任務的資料，訓練一個只會這件事的模型，每個新任務就重新再來一次。π0.7 的核心突破是**組合泛化（compositional generalization）**——把在不同情境學到的技能重新混合，拼出從沒見過的解法。Physical Intelligence 共同創辦人、UC Berkeley 教授 Sergey Levine 形容：「一旦跨過那個臨界點——從『只會你收集資料的那些事』到『能把技能重新調配』——能力成長就不再只是線性了。」

論文中最戲劇性的展示是一台從未在訓練資料中出現過的氣炸鍋。研究團隊追查後發現，模型之所以能操作它，是因為訓練資料中只有兩個不相關的片段：某個機器人把氣炸鍋的蓋子「推」關上，以及另一個開源資料集中的機器人「放」了一個塑膠物體在平台上——π0.7 把這兩個技能自動組合成了解決從未見過任務的能力。

對工程師來說，π0.7 的意義在於：它預示了機器人智慧的 scaling law 可能正在重演當年 LLM 的軌跡。如果這條曲線成立，通用機器人智慧的到來時間點，會比多數人預期的更近。

---

## Anthropic 倫敦辦公室擴編四倍，劍指歐洲 AI 人才爭奪戰

Wired 同日报导，Anthropic 正在大幅擴張倫敦據點。新辦公室佔地 158,000 平方英尺，容納人數從目前的 200 人一口氣提升至 800 人——整整四倍的擴編空間。

這個時間點的選擇不是偶然。隨著美國政府對 AI 實驗室的監管壓力升溫，Anthropic 正在用倫敦作為防範單一監管風險的戰略支點。更直接的原因則是**人才競爭**：Google DeepMind、OpenAI、Meta、Wayve、Isomorphic Labs、Synthesia 全部匯集在倫敦同一個區塊，Anthropic 不想在這場歐洲 AI 人才爭奪戰中缺席。

對於關注 AI 產業動態的開發者，這則新聞傳遞的訊息是：即使在美國監管環境最不確定的此刻，頂級 AI 實驗室依然願意大筆投資歐洲據點。地理分散化已成為 AI 公司的集體選擇。

---

## 其他值得關注

- **Upscale AI 估值達 $2B**：成立僅七個月的 AI 基礎設施新創正在洽談新一輪融資，估值較上次成長明顯。基礎設施層的資金集結速度絲毫不減。
- **Qwen3.6-35B-A3B 圖像生成打敗 Opus 4.7**：Alibaba 的 35B 小引數模型在 Simon Willison 的「pelican 騎腳踏車」圖生成基準上擊敗了 Claude Opus 4.7，提醒我們模型大小與特定能力未必正相關，開源社群繼續以小搏大。
- **Jane Street 與 CoreWeave 簽署 $6B AI 雲端合約**：量化交易巨頭將大量 AI 算力需求外包給 CoreWeave，並同步對 CoreWeave 投資 $1B。金融與 AI 基礎設施的深度整合正在加速。

---

## 參考連結

- [Anthropic 官方公告：Claude Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7)
- [OpenAI：Codex for (almost) everything](https://openai.com/index/codex-for-almost-everything)
- [TechCrunch：Physical Intelligence π0.7](https://techcrunch.com/2026/04/16/physical-intelligence-a-hot-robotics-startup-says-its-new-robot-brain-can-figure-out-tasks-it-was-never-taught/)
- [Wired：Anthropic London Expansion](https://www.wired.com/story/anthropic-plots-major-london-expansion/)
- [Simon Willison：Qwen3.6 beats Opus 4.7](https://simonwillison.net/2026/Apr/16/qwen-beats-opus/)
- [TechCrunch：Upscale AI $2B valuation](https://techcrunch.com/2026/04/16/upscale-ai-in-talks-to-raise-at-2b-valuation-says-report/)
