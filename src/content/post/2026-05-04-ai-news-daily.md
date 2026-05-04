---
title: "AI 新聞精選｜2026 年 5 月 4 日"
description: "OpenClaw 2026.5.2 重寫插件架構、Google 測試 Omni 影片模型，商湯與 DeepSeek 持續深化開發者佈局。"
publishDate: "2026-05-04T12:00:00+08:00"
updatedDate: "2026-05-04T12:04:00+08:00"
tags: ["OpenClaw", "Google", "Gemini", "商湯", "DeepSeek"]
series: "daily-ai-report"
seriesOrder: 79
draft: false
---

## 今日觀察

上週五是 AI 開發工具鍊快速整合的一週。OpenClaw 正式邁入 2026.5.2，插件系統全面轉向 npm-first；Google 的 Omni 模型流出，暗示 Gemini 可能打破延續多年的「影像是 Gemini、影片是 Veo」分工；商湯和 DeepSeek 則同時在 API 層面釋出善意，一個免費公測搶開發者，一個修 bug 修到讓人願意重新接入。這三條主線湊在一起，剛好構成一個共同主題：**2026 年中的 AI 工具鍊正在從「能做什麼」進化到「好不好用」。

---

## 主題一 — OpenClaw 2026.5.2：插件架構全面重寫，npm 時代正式到來

2026.5.2 是 OpenClaw 近期幅度最大的結構性更新，核心改動繞著一個目標打轉：**擺脫依賴路徑的歷史包袱，讓插件安裝與執行環境現代化**。

最大的變化是插件架構全面轉向 npm-first。以往插件系統繞過了 npm 生態，導致依賴衝突、版本錯亂、安裝失敗等問題層出不窮；新版本把 npm 當成預設安裝路徑，解決了長久以來「插件裝了跑不起來」的痛點。同時加入 Beta 通道回退機制——當官方發布 v2026.5.2-beta.1/beta.2 時，外部插件更新會優先試 beta，沒有 beta 版才 fallback 到 stable，這讓想搶先測試的開發者有了正式的升級階梯。

效能面，Gateway 啟動延遲和 Agent 熱路徑的優化最值得注意。官方指出此次修改涵蓋 session 列表刷新、任務維護、prompt 準備、插件載入多個環節，降低了重複的 CPU 消耗。對於長期跑在伺服器上的使用者而言，啟動延遲從幾秒鐘降到接近即時，體驗差距明顯。

另一個實用更新是「醫生修復」功能（doctor repair）——當插件安裝失敗、依賴缺漏、或設定檔損壞時，OpenClaw 現在可以自動嘗試修復，而不只是跳出錯誤訊息。這是那種「出問題時才感受到價值」的功能。

這次一併支援 Grok 4.3 為預設 xAI 模型，並集中修補了 Discord、Slack、Telegram、WhatsApp 等訊息通道的邊緣情況。對仍在用 OpenClaw 做多通道整合的團隊，這波修復涵蓋的範圍相當廣。

### 對開發者意味著什麼

如果你之前因為依賴問題而對插件系統又愛又恨，2026.5.2 是一次正面的重新開始。npm-first 不只是解決安裝問題，同時讓社群插件生態（從 ClawHub 安裝）與 npm 生態正式打通，開發者終於可以用 `npm install` 思維管理 OpenClaw 插件了。強烈建議跑一次 `openclaw doctor` 確認環境狀態，再試著更新一次插件。

---

## 主題二 — Google Omni 流出：I/O 前夕，Gemini 準備統一影像與影片？

科技媒體 TestingCatalog 在 I/O 大會前挖到一個截圖：Gemini 的影片生成頁面出現了「Powered by Omni」字樣，搭配代號 Toucan（目前的 Veo 3.1 驅動方案）。

這則消息最值得注意的訊號不是「Google 做了一個新模型」，而是**它可能改變 Google 維持多年的 split-model 策略**。

目前 Gemini 的生成功能是這樣分工的：影片由 Veo 3.1 驅動，影像則由 Gemini 3（Nano Banana Pro）和 Gemini 3.1 Flash Image（Nano Banana 2）處理。兩個模組各自獨立，沒有共享骨幹。如果 Omni 是真正整合的「全能」模型（能同時處理影像和影片），這將是 Google 第一次把頂級多模態能力統一進同一個系統。

對比競爭格局：ByteDance 的 Seedance 2.0 目前在影片生成 benchmark 領先，OpenAI 的 Sora 持續迭代，Runway 和 Pika 也在搶奪創作者市場。Google 選擇在這個時間點讓 Omni 進入 UI 可見字串，暗示產品團隊有意在 I/O 2026（5月19–20日）正式公開，這與 Google 表示 I/O 將有「Gemini 與更廣泛 AI 更新」的口徑一致。

**但要注意**：目前資訊來自洩漏截圖，Omni 是 Veo 包裝、全新模型、或真正的 omni-model 還沒有定論。適合保持關注但不要現在就重寫你的技術選型。

### 為什麼現在重要

如果 Omni 是真正的統一多模態模型，它將簡化目前需要分別串接 Gemini API（影像）和 Veo API（影片）的開發者流程。一個 endpoint、統一定價、相同的能力範圍——這對做內容生成的工具鏈是顯著的降低複雜度。但最終要看 Google 官方怎麼說。

---

## 主題三 — 商湯 Token Plan 公測：SenseNova 與 DeepSeek 同步免費呼叫

商湯科技 SenseNova 平台推出 Token Plan 服務，目前進入限量免費公測階段。公測期間的免費額度涵蓋兩個層次：

**SenseNova 自有模型**（6.7 Flash-Lite 與 U1 Fast）：每 5 小時各 1500 次額度。**DeepSeek-V4-flash**：每 5 小時 150 次額度。雖然 DeepSeek-V4-flash 的額度比 SenseNova 自有模型少，但作為第三方模型出現在公測套餐裡，這件事本身就透露了一個訊號：商湯願意在自家平台上為競爭對手的模型导流。

這個策略有點像手機廠商在系統相簿裡內建對手品牌滤镜——用免費額度把開發者拉進來，再用平台其餘付費服務（Lite/Pro）變現。Lite 與 Pro 等付費方案即將上線，公測期結束後的定價策略會是觀察重點。

產品層面，Token Plan 原生支援 Cowork-Skills 辦公技能體系，並可透過 Hermes Agent 與 OpenClaw 整合。這意味著在 OpenClaw 生態內，已經有直接的方式呼叫商湯模型——對已經在用 OpenClaw 的開發者，設定成本相對低。

---

## 其他值得關注

- **DeepSeek API 修復 400 錯誤**：DeepSeek 在官方微信群宣布已解決部分第三方框架呼叫時的 400 錯誤問題，並邀請之前受阻的用戶重新嘗試接入。這不是新功能，但對已整合 DeepSeek API 的開發者而言，修復意味著你的自動化流程可以重新正常運作了。官方同時表示歡迎持續回饋問題，姿態比多數中國模型廠商透明。
- **Codex Security 插件正式發布**：Codex 團隊推出的安全掃描插件現已可用，內建五個標準化 AppSec 工作流（安全掃描、威脅建模、漏洞發現、驗證、攻擊路徑分析），覆蓋 PR、分支、Repo 層級的自動化安全審查。如果你在寫的是 Code Agent 或開發工具鍊相關產品，這個插件值得評估是否整合進你的開發流程。

---

## 參考連結

- [OpenClaw v2026.5.2 Release Notes](https://github.com/openclaw/openclaw/releases/tag/v2026.5.2)
- [OpenClaw v2026.5.2 官方公告](https://x.com/openclaw/status/2050735037230801042)
- [TestingCatalog — Google Omni 模型報導](https://www.testingcatalog.com/google-is-testing-new-omni-model-for-video-generation-ahead-of-i-o/)
- [商湯 Token Plan 公測頁面](https://www.sensenova.cn/token-plan)
- [Codex Security 插件發布推文](https://x.com/reach_vb/status/2051019108028969251)