---
title: "AI 新聞精選｜2026 年 3 月 29 日"
description: "Google 超 50 億美元支持 Anthropic 得州資料中心建設、OpenAI Codex 用例庫上線、fnOS 原生支援 OpenClaw 安裝。"
publishDate: "2026-03-29T20:00:00+08:00"
updatedDate: "2026-03-29T12:00:00+08:00"
tags: ["Google", "OpenAI", "Anthropic", "OpenClaw"]
draft: false
---

## 今日觀察

三月的尾巴，AI 行業的資本敘事與產品敘事正在同步加速。一方面，Google 對 Anthropic 超 50 億美元的資金支持即將落定，讓「AI 基礎設施」這個詞的量級直接跳到電網建設的規模；另一方面，OpenAI 的 Codex 用例庫上線與 fnOS 對 OpenClaw 的原生支援，則是把工具下沉到「任何人只要打開應用中心就能用」的level。這兩件事說的是同一個訊號：建構 AI 能力的門檻，正在從「有沒有 GPU」變成「會不會打開一個應用」。

---

## [Google + Anthropic] — 50 億美元電網：AI 基礎設施的規模跳級

本週 AI 行業最大筆的資金新聞，不是哪家模型屠榜，而是 Google 即將敲定一項超過 50 億美元的建設融資協議，支持 Anthropic 在得克薩斯州占地面積 2,800 英畝的超大型資料中心。

這個數字的物理意義需要被認真看待。初期容量預計在 2026 年第四季達到 500 百萬瓦（MW），最終擴建至 7.7 吉瓦（GW）。7.7 GW 是什麼概念？大約相當於 600 萬戶家庭同時用電的峰值功率。這個設施不是一個「伺服器房」，是一個「數位電廠」。

資金結構本身也值得注意：Google 母公司 Alphabet 不是直接持有，而是透過建設貸款的方式支持場地營運商 Nexus Data Centers。這種「基礎設施金融」模式，讓 Google 獲得戰略性算力承諾，同時不用把固定資產放在自己的資產負債表上——這是雲端巨頭綁定 AI 公司的標準打法，也是 Anthropic 能以較低成本撬動超大規摸資本的原因。

而 Anthropic 自身也同步宣布了 500 億美元的美國 AI 基礎設施投資計畫，與 Fluidstack 合作在得州和紐約興建資料中心。這兩筆資金敘事加在一起，意味著 2026 年將是 AI 基礎設施從「電腦公司」升級為「公用事業」的轉折點。

---

## [OpenAI] — Codex 用例庫：技能沉積的產品化信號

OpenAI 正式推出 Codex Use Cases 示例庫，這是 Skills 系統從開發者圈層走向主流使用者的關鍵一步。

根據官方頁面，用例庫涵蓋六個主要類別：數據分析、工程、評估、前端、整合（外部應用集成）以及移動端。每一個用例都可以直接在 Codex 應用中打開並代入專屬的輸入提示詞——這不是文件，是一個可以馬上執行的起點。

幾個值得注意的用例：從截圖生成響應式 UI（Figma 到程式碼）、從 Slack 對話串直接發起雲端任務、對大型程式碼庫進行請求追蹤和模組映射、以及用評分反饋迴圈來解決高難度問題。這些場景的共同點是：它們都不是「寫程式」，而是「用 AI 完成一個真實工作流」。Codex 的定位，正在從「會寫程式碼的 AI」轉變為「會執行專業工作流的數位同事」。

值得注意的是，這套用例庫的出現，正好與 Anthropic 最早推動 Skills 框架、OpenAI 後續跟進、Google 也推出 Gemini Agent Skill 的時間線形成呼應。三家公司同時間把「技能沉積」這件事做成產品，說明這不是一個臨時的功能更新，而是對 AI Agent 工作方式的行業級共識。

---

## [OpenClaw] — fnOS 原生支援：NAS 系統的主動擁抱

飛牛作業系統 fnOS 推送新版更新，新增了 OpenClaw 的應用頁面路由，並支援使用者從系統應用中心直接下載並安裝 OpenClaw。

這件事的意義不在於「OpenClaw 又多了一個安裝選項」，而在於.fnOS 是一個以個人和家庭用戶為主的 NAS 作業系統，它的應用中心代表的是「普通使用者對工具的可信度門檻」。一個工具能進入 fnOS 應用中心，意味著它的安裝流程、穩定性、依赖管理都已經被系統維護者審查通過。

對 OpenClaw 而言，這是生態系統擴張的典型路徑：先讓開發者用起來，再讓開發者社群自發將其包裝成普通用戶可以接觸到的產品形態——最終出現在一個 NAS 系統的應用中心頁面。這與 Hugo、WordPress 等開源工具的普及路徑高度一致：專業用戶沉積技能，大眾用戶透過包裝好的分發渠道接觸工具。

---

## [Google] — Gemma 4 蹤跡：開源模型的下一個台階

Google DeepMind 的新一代開源模型 Gemma 4 的蹤跡開始浮現。社區討論透露，該模型代號「significant-otter」，正在 Arena 平台接受測試，對話中自稱由 Google DeepMind 開發。與此同時，Google DeepMind 員工開始發布只有 Emoji 的行銷預熱帖子——這在 Google 內部是模型發布前的標準預熱節奏。

Gemma 3 的口碑在開源社群中已經相當正面，如果 Gemma 4 保持提升軌跡，它與 Llama 系列、Mistral 系列的競爭將進一步壓低開源模型的能力水位。對於在本地部署模型的開發者而言，每一次開源模型的更新，都是一個「可以更少花費維持相同能力」的機會窗口。

---

## 參考連結

- [Google Backs $5B+ Texas Data Center in Major Anthropic Infrastructure Deal](https://computing.net/news/stocks/google-backs-5b-texas-data-center-in-major-anthropic-infrastructure-deal/)
- [Anthropic invests $50 billion in American AI infrastructure](https://www.anthropic.com/news/anthropis-invests-50-billion-in-american-ai-infrastructure)（Anthropic 官方）
- [Codex Use Cases](https://developers.openai.com/codex/use-cases)（OpenAI）
- [fnOS 更新說明](https://github.com/orgs/FlyTech-video/discussions/categories/announcements)（GitHub）
- [Gemma 4 Arena 討論](https://x.com/_philschmid/status/2037984829522772268)（X @_philschmid）
