---
title: "AI 新聞精選｜2026 年 3 月 30 日"
description: "OpenClaw 2026.3.28 版本發布 Plugin approval hooks 與 xAI 整合、OpenAI 疑似籌備 Codex 獨立訂閱方案，開發者生態走向專門化。"
publishDate: "2026-03-30T20:00:00+08:00"
updatedDate: "2026-03-30"
tags: ["OpenAI", "OpenClaw"]
draft: false
---

## 概觀

本日橘鸦 AI 日報收錄四條新聞，其中兩條與我們關注的關鍵字直接相關：**OpenClaw 發布 2026.3.28 版本**，新增 Plugin approval hooks、xAI Responses API 整合，以及 Discord/iMessage 的 ACP 平台綁定；**OpenAI 傳出正在測試「Codex-only」獨立訂閱方案**，暗示未來 Codex 可能從 ChatGPT 套餐中拆出，作為專屬開發者產品獨立收費。這兩條新聞看似無關，實則都在回答同一個問題：**AI 工具的商業化路徑，正在從「全員訂閱」走向「分層專門化」**。

---

## OpenClaw 2026.3.28：Plugin approval hooks 亮相，ClawCon 前哨戰

OpenClaw 官方於 3 月 28 日發布最新版本，代號 2026.3.28，並定位為 ClawCon Tokyo 大會前的預熱版本。本次更新有兩個值得注意的方向。

**Plugin approval hooks** 是本版最核心的安全機制：任何工具在執行過程中可以主動暫停，等待使用者確認後再繼續。這解決的是 Agent 模式下「工具自動執行但缺乏人為把關」的長期痛點——過去 OpenClaw 的工具執行是鏈式自動的，在複雜 workflow 中一旦某個環節出錯，代價可能不小。鉤子機制讓使用者在關鍵步驟擁有中斷權，而非事後才發現問題。

**xAI 生態整合**是另一個值得注意的拓展：新增對 xAI Responses API 和 x_search 的支援，意味著 Grok 系列模型正式進入 OpenClaw 的工具鏈。結合日前 OpenClaw 對 Microsoft Teams 的整合，本版呈現的是一個「跨平台 Agent 核心」的清晰輪廓——不只是接入更多模型，而是讓這些模型在一個統一的工具調用框架下協作。

此外，Discord 與 iMessage 的 ACP 綁定功能開放，對應的是橘鸦提到的「 Discord 討論區用戶需求」——將日常通訊平台直接作為 Agent 的交互介面，降低使用門檻。

---

## OpenAI 籌備 Codex 獨立訂閱：開發者工具的專門化訊號

開發者 btibor91 在 ChatGPT 網頁版與 Android 端的介面中發現了「Codex-only plan」的相關字樣，其中包含「如果您想使用 ChatGPT，請向您的管理員提交請求」的提示文字。這段文字暗示：Codex 未來的訂閱可能與企業管理員權限直接掛鉤，而非目前綁定在 ChatGPT Plus 或 Pro 方案中的形式。

目前 Codex 的使用權限包含在所有主要 ChatGPT 方案中（Plus、Pro、Business、Enterprise），採 credit 制。這套定價邏輯的問題在於：多數只想要純編碼 Agent 的開發者，必須為整個 ChatGPT 套餐付費。獨立 Codex 方案的出現，意味著 OpenAI 終於開始正視這個需求分裂。

如果 Codex 真的走向獨立訂閱，開發者生態將迎來幾個重要改變：獨立定價可能低於目前 Plus 的 $20 門檻，吸引純工具型用戶；Codex 的企業管理整合（提示文字中的「管理員提交請求」）暗示這是一個面向團隊的產品而非個人；對於 Cursor、Windsurf 等以 Codex 為基底的競品，這是直接競爭信號。

目前此方案尚未得到官方證實，具體定價與上線時間仍是未知數。但從介面已出現字樣來看，內部測試應已進入相當成熟階段。

---

## 其他值得注意

**DeepSeek 網頁服務接連異常，同時疑似更新模型**：DeepSeek 網頁與 App 昨夜起多次出現效能異常，官方狀態頁歷經數輪「已修復→再次異常→调查中」的輪迴，截至今日早晨仍未完全穩定。值得注意的是，同期社群回饋網頁端模型品質、SVG 生成能力均有提升，暗示 DeepSeek 可能已悄悄部署新模型，並在服務穩定性與新舊模型切換之間艱難磨合。對仰賴 DeepSeek 網頁或 App 的開發者而言，這是個警訊：API 服務保持穩定不代表產品層面也同樣可靠。

---

## 參考連結

- [OpenClaw 官方 Twitter - 2026.3.28 版本發布](https://x.com/openclaw/status/2038084923517796839)
- [OpenAI Codex 官方定價頁](https://developers.openai.com/codex/pricing)
- [btibor91 Twitter - Codex-only plan 發現](https://x.com/btibor91/status/2037814739519062506)
- [DeepSeek 狀態頁](https://status.deepseek.com/)
- [CometAPI - DeepSeek Update 分析](https://www.cometapi.com/deepseek-update-what-changed-what%E2%80%99s-new-and-why-it-matters/)
