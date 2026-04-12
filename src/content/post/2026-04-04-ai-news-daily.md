---
title: "AI 新聞精選｜2026 年 4 月 4 日"
description: "Anthropic 變更計費政策，OpenClaw 等第三方工具不再涵蓋、小米 MiMo Token Plan 上線"
publishDate: "2026-04-04T20:00:00+08:00"
updatedDate: "2026-04-04T12:00:00+08:00"
tags: ["Anthropic", "OpenClaw", "Netflix", "Gemini CLI", "小米"]
draft: false
---

## 今日觀察

今天的主軸是**計費模式戰爭**。Anthropic 的訂閱不再覆蓋第三方工具，直接影響 OpenClaw 數萬用戶；同時小米推出 MiMo Token Plan、以 Credit 點數制進入 API 訂閱市場；Netflix 終於開源了它的第一個 AI 模型，但焦點不是技術實力而是社群動能。

---

## Anthropic 變更計費政策：OpenClaw 等第三方工具不再涵蓋

Anthropic 宣佈，自太平洋時間本週五中午起，Claude 訂閱不再覆蓋 OpenClaw 等第三方工具的用量。用戶需單獨開通「Extra Usage」或使用 API Key 才能繼續接入。

官方理由是「第三方工具帶來系統壓力，需優先保障核心產品算力」。過渡補償方案：Pro、Max、Team 訂閱者獲得等同於月費的一次性抵扣額（90 天有效），並提供最高 30% 折扣的預購用量包。

這對 OpenClaw 社群是實質影響。OpenClaw 的 CLI 工具長期以來使用 Anthropic 的訂閱額度來驅動，現在這條路被堵上了。官方建議用戶切換至 Sonnet 4.6（而非旗艦 Opus 4.6），並限制上下文窗口大小來控制成本。

更深層的訊號：Anthropic 正在試圖把用戶鎖定在自，生態系統內，第三方工具消耗了「核心產品的算力份額」——這與其說是容量問題，不如說是商業策略：逼用戶在「繼續用 OpenClaw」和「直接用 Claude」之間二選一。

---

## 小米 MiMo 推出 Token Plan — 中國手機廠商搶佔 API 市場

小米 MiMo 正式上線 Token Plan 訂閱服務，提供 39 元至 659 元四檔方案，採用 Credit 點數制，按不同倍率調用不同模型。MiMo-V2-Pro：上下文 <256k 消耗 2 倍 Credit，256k-1M 消耗 4 倍 Credit。首購 88 折優惠。

這是中國主流硬體廠商首度以「封閉生態+API 服務」的組合進入 AI 訂閱市場。與其競爭的不是 iPhone 生態的 Siri，而是直接與 OpenAI、Anthropic 和各家中國大模型廠商的 API 服務競爭。結合小米硬體的出貨量，未來可能出現「買小米手機送 AI 訂閱」的捆綁模式。

---

## Netflix 開源首個 AI 模型 VOID — 不是最強，但是第一步

Netflix 終於發布了它的第一個開源 AI 模型 VOID（Video Object and Interaction Deletion），基於 CogVideoX 架構微調，專注於影片物體智慧擦除和物理交互修正。40GB 以上顯存需求（相當於 A100 等級）。

這個模型本身不是技術突破——熱門的影片編輯工具已有類似功能。但訊號意義是：Netflix 終於承認 AI 模型是需要开源社群參與建設的資產，而不是純粹的競爭優勢。結合 Netflix 在影視娛樂資料上的獨有優勢，未來在影片理解、多模態生成方向的開源動作值得持續關注。

---

## Gemini CLI v0.36.0 — Subagents 正式上線

Gemini CLI 發布 v0.36.0，核心引入 Subagents 功能：用戶可通過目錄配置或 @agent 指令呼叫 Subagent，支援本地、遠端及並行操作，且每個 Subagent 在獨立上下文窗口運行以節省主會話的 token。

Subagent 在獨立環境中執行是合理的設計選擇——主會話的上下文不受 Subagent 思考過程污染，減少意外的干擾。但對複雜工作流而言，多個 Subagent 的協調和依賴管理將是下一個需要關注的工程問題。

---

## 其他值得關注

- **ElevenLabs Scribe v2**：新增自動實體脫敏功能（姓名、信用卡號等敏感個資），關鍵詞提示容量從 100 個擴展至 1000 個。對隱私有高要求的企業應用場景是直接加分項。
- **Anthropic 發布應用構建三模式**：官方建議優先使用 bash/text editor 等基礎工具組合、將編排控制權交還給模型、以及用宣告式工具掌控安全邊界。算是對近期各種 Claude Code 疑難的官方回應。
- **LMArena 下架頂級模型**：為維護平台穩定，Claude Opus 4.6、GPT 5.4、Gemini 3.1 暫時下架。這個信號值得關注：當最強的模型開始拖垮平台資源時，benchmark 平台的永續性就成了一個問題。

---

## 參考連結

- [Anthropic Extra Usage Credit 公告](https://support.claude.com/en/articles/14246053-extra-usage-credit-for-pro-max-and-team-plans)
- [小米 MiMo Token Plan](https://platform.xiaomimimo.com)
- [Netflix VOID 模型 (GitHub)](https://github.com/Netflix/void-model)
- [Gemini CLI v0.36.0](https://x.com/geminicli/status/2040081894495437068)
- [ElevenLabs Scribe v2](https://elevenlabs.io/blog/scribe-v2-just-got-an-upgrade)
- [Anthropic 三模式構建應用](https://claude.com/blog/harnessing-claudes-intelligence)
