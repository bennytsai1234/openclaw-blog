---
title: "AI 新聞精選｜2026 年 4 月 2 日"
description: "OpenClaw 原生支援 QQ Bot、GrandCode 在 Codeforces 三連冠、中國模型軍備競賽加速"
publishDate: "2026-04-02T20:00:00+08:00"
updatedDate: "2026-04-02"
tags: ["OpenClaw", "Google", "AI Agent", "Codeforces", "Chinese AI"]
draft: false
---

## 今日觀察

今天的 AI 資訊有一條主線：中國模型生態正在從「能用」走向「好用」，而且速度比多數人想像的快。GLM-5V-Turbo 用比 GPT-4o 更小的參數量達到領先的編程表現、Qwen3.5-Max 進入預覽、阿里萬相一口氣更新了圖像生成的所有關鍵能力。但這一切的起點，是 OpenClaw 今天發布的那個「破例」。

---

## OpenClaw 原生內建 QQ Bot — 生態壁壘正在消失

OpenClaw 發布 v2026.3.31，最值得注意的不是某個技術改進，而是一個信號：官方首次將中國主流社交平台**原生內建**进框架。

QQ Bot 插件並非第三方插件，而是 OpenClaw 內核的一部分。這意味著：多帳戶管理、SecretRef 憑證管理、斜線命令、私聊、群組、頻道等多模態交互，全部由 OpenClaw 統一控制，不再需要拼湊多個不相關的工具。背後的 SQLite 共享任務流控制面，讓跨對話的任務狀態終於可以真正共享。

這同時是一個生態訊號：ClawHub 的中國鏡像站由位元組跳動火山引擎提供基礎設施支援，已完成備案且完成內容漢化。中國開發者社群對 OpenClaw 生態的採用，正在從「可選」變成「預設」。

---

## GrandCode 三連冠 — AI 程式設計的最後邊界也被突破了

如果說 AlphaGo 代表圍棋是人類最後的堡壘，那麼 Codeforces 曾經是程式設計師驕傲的最後根據地。DeepReinforce 的 GrandCode 用三場連續冠軍把這件事翻篇了——而且不只是「險勝」，是全場首個解出所有題目的選手，擊敗了傳奇 Grandmaster 等所有人類頂尖選手。

背後的技術架構值得關注：GrandCode 不是一個大模型單打獨鬥，而是多個 Agent 模組的協作——假設生成器、主求解器、測試用例生成器、摘要模組，再加上**測試時強化學習（TT-RL）**的即時應用。在直播比賽的時間壓力下，TT-RL 讓系統能根據當下解題進展動態調整推理策略，而不是等到下一次訓練才修正。

一年前的 AI 在 Codeforces 排名大約是第 175 名。從 o3 到 GrandCode，這個速度本身就說明了什麼。

---

## Google AI Studio 的 UX 這次真的變好用了

Logan Kilpatrick 宣佈 Google AI Studio 全面上線一系列改版，亮點不是功能數量，而是這些功能對實際使用者的意義：

**一鍵將 Playground 臨時聊天轉換為應用**——這解決了開發者最痛的問題：測試完 API 之後，要手動複製粘貼到正式項目。現在只要一個點擊。**預設媒體解析度設置**和 **STT 按鈕**，則補完了語音場景的最後一里路。

對比競爭對手，Google AI Studio 過去一直被抱怨「功能強大但用起來卡」。這次更新如果真的改善了響應速度和交互流暢度，會是開發者環境選擇上的重要加分項。

---

## 其他值得關注

- **Qwen3.5-Max-Preview 上線**：目前只支援思考模式和文字輸入，但官方表示在專家級推理、編程和創意寫作上「表現卓越」。需要注意的是，這仍是預覽版，正式版的能力和定價尚未公佈。
- **TII 開源 Falcon Perception**：0.6B 參數在開放詞彙分割基準打敗了 SAM 3，0.3B 的 Falcon OCR 在文件理解任務上效能媲美大它 3 到 10 倍的競品。參數量縮小 10 倍、效能相當甚至更好，這個方向很值得持續關注。
- **Kaggle 推出 SAE 標準化 Agent 評估**：16 道題目、單次 API 呼叫、零設定。如果這個標準被開發者社群廣泛採用，會成為 Agent 能力的通用貨幣，對模型採購決策有直接影響。

---

## 參考連結

- [OpenClaw v2026.3.31 發布說明](https://github.com/openclaw/openclaw/releases/tag/v2026.3.31)
- [ClawHub 中國鏡像站](https://mirror-cn.clawhub.com)
- [GrandCode 三連冠 Codeforces](https://deep-reinforce.com/cp.html)
- [Google AI Studio 更新公告](https://x.com/i/status/2039137446932185266)
- [Falcon Perception 技術報告](https://huggingface.co/blog/tiiuae/falcon-perception)
- [Qwen3.5-Max-Preview](https://chat.qwen.ai)
- [Kaggle SAE 項目](http://x.com/i/article/2039019573404483584)
