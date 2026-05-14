---
title: "AI 新聞精選｜2026 年 5 月 14 日"
description: "Anthropic 拆分 Claude Code 訂閱計費結構、OpenAI 企業版 Codex 免費兩個月、Minimax Mavis 多智體協作正式上線。"
publishDate: "2026-05-14T12:00:00+08:00"
updatedDate: "2026-05-14T12:03:00+08:00"
coverImage:
  src: "@/assets/post-covers/2026-05-14-ai-news-daily.png"
  alt: "AI 新聞精選｜2026 年 5 月 14 日"
tags: ["Anthropic", "Claude Code", "OpenAI", "Codex", "MiniMax"]
series: "daily-ai-report"
seriesOrder: 89
draft: false
---

## 今日觀察

Anthropic 在本週拋出今年影響最深遠的計費變動——將 Agent SDK 等程式化呼叫從訂閱配額中拆分出來，改成獨立 monthly credit，June 15 正式生效。這不是單純的價格調整，而是直接堵死了一個持續多年的定價漏洞：過去 $200 Max 方案透過自動化工具耗用的 Token，實際價值被估為 $2,000 到 $5,000 的 API 等效用量，現在這個補貼空間被完全移除。同一時間，OpenAI 啟動了企業版 Codex 限時免費兩個月促銷，瞄準正在觀望的企業團隊。這兩條新聞加在一起，勾勒出 AI coding 工具市場正在從「先用再說」進入「認真算帳」的階段。

---

## Anthropic 拆分訂閱計費：補貼時代結束

多年來，Anthropic 的付費方案其實藏著一個隱性福利：只要把訂閱配額拿來跑 Agent SDK、claude-p 或 Claude Code GitHub Actions，就能以遠低於 API 費率的價格消耗大量 Token。社群估算過，一個 $200 Max 方案透過自動化腳本跑出來的等效價值，最高可達 $2,000 到 $5,000 API 額度——這個缺口現在被完全堵上。

**新制 6 月 15 日上路**。Anthropic 將程式化呼叫從訂閱配額中獨立出來，改成三級月租 credit：$20 Pro 方案給 $20、$100 Max 5x 方案給 $100、$200 Max 20x 方案給 $200，涵蓋 Agent SDK for Python/TypeScript、claude-p 非互動式命令列、Claude Code GitHub Actions，以及所有建立在 Agent SDK 上的第三方工具（包括 Conductor 與 OpenClaw）。Credit 按月重置、不可跨月結轉、不可跨帳號共享，耗盡後若不主動開啟 extra usage，就會暫停直到下個週期。

與此同時，Anthropic 宣布 Claude Code 每週限額即日起臨時上調 50%，一路持續到 7 月 13 日。這是短期舒壓，不是結構性放寬：兩週後當 credit 制正式上路，那些靠自動化吃配額的用戶會發現，實際可用量比過去縮水了一半以上。

**對誰影響最大**？高度依賴 Agent SDK 跑長任務的開發團隊過去是最爽的用戶，現在要重新算成本。這也是 Anthropic 推出 Claude for Small Business 套件的背景——他們正在把中小型企業市場當成新的成長引擎，而不是繼續靠重度用戶的補貼定價。

值得注意還有收購傳聞：The Information 報導 Anthropic 正就以超 9,000 億美元估值募集至少 300 億美元新資金，並洽談收購開發者工具新創公司 Stainless。若收購成真，會是 Anthropic 從模型公司走向完整開發者平台的關鍵一步。

---

## OpenAI Codex 企業版促銷：搶佔企業心智

OpenAI 本週宣布，未來 30 天內加入的企業新用戶，可獲得兩個月 Codex 免費使用。Sam Altman 亲自發文：「Codex 是目前最好的 AI 編程產品」，希望透過這個窗口期吸引還在觀望的團隊轉換過來。這不是降價，這是直接免費——以企業用量估算，兩個月試用期內的 Codex 成本可能輕鬆破萬美元。

這次促銷的背景是 Codex 正在建立一套完整的企業生態。OpenAI 同時發布了兩份工程文件：一份詳細說明 Codex 在 Windows 上的專屬沙箱建置方案，針對 Agent 工作負載組合防火牆與 ACL 權控，強制隔離檔案寫入與網路邊界；另一份則是給財務團隊的十大使用場景指南，展示如何將原始財務資料自動轉化成月度審查報告，全程不寫一行程式碼。這兩份文件加起來，說明 OpenAI 不只是想賣 Codex，而是想讓 Codex 成為企業內每個部門的日常工具。

值得注意的是，OpenAI 在 4 月推出了 $100 ChatGPT Pro 新方案，直接瞄準 Anthropic $100 Claude Max 的相同價位帶，提供了五倍於 Plus 的 Codex 使用配額，並在 5 月 31 日前暫時提供十倍配額。整個 AI coding 工具市場的價格戰，硬體已經從「多少錢能用到」演化到「多少錢能長期、穩定、大量地用」。

---

## MiniMax Mavis：多智體協作的正式落地

MiniMax 本週宣布將旗下 Agent 品牌升級為 Mavis（MiniMax as a Jarvis），並正式上線 Agent Teams 功能。這次升級的核心是三種角色分工：Owner（規劃任務流程）、Worker（執行具體子任務）、Verifier（對抗性品質把關），透過確定性狀態機管理，試圖解決單一 Agent 在長任務中常見的中斷、漂移、響應延遲等問題。多個 Worker 可以並行協作，組成一個真正有意義的團隊。

更重要的是，MiniMax 宣布將原有的 TokenPlan 與 Agent Plan 統一為單一訂閱方案，打通 CLI、API 與 Agent 三種介面，模型額度共享。這對原本同時付兩個方案的開發者來說是直接降低成本，MiniMax 還大方地給舊用戶加贈一個月會員作為過渡禮。產品目前已開放桌面端下載。

從商業邏輯上看，MiniMax 這次升級的回應對象非常明確：用過單一 Agent、覺得還不夠可靠的開發者。Agent Teams 用對抗性品質門禁（adversarial quality gate）来確保輸出不會被某個幻觉帶偏，這在某種程度上借鏡了 multi-agent deliberation 的思路，但把它包裝成開箱即用的產品功能。這也是 MiniMax 與其他中國 AI 公司在 Agent 方向上少見的差異化路径。

---

## 其他值得關注

- **騰訊微信聊天記錄一鍵轉發元寶**：騰訊宣布微信已支援將最多 100 條聊天記錄直接轉發至元寶進行摘要或生成回覆，以臨時對話形式處理，退出後不保存記錄。對需要跨應用 AI 輔助的用戶來說是實用的小功能打通，也是騰訊內部產品協作的具體案例。

- **Notion 開放 External Agents API**：Notion 發布開發者平台，核心是 External Agents API，可將 Claude 等外部 Agent 引入 Notion 任務編排與監控。官方數據顯示 MCP 可降低 91% token 消耗，這對需要跨系統串接的企業應用是重要訊號。Workers 運行時與 Beta CLI 也同步開放。

- **百度提出 DAA（日活智慧體數）指標**：百度在 AI 開發者大會上宣布 DuMate、秒達 3.0、百度一鏡、伐謀 2.0 等智慧體矩陣，李彥宏提出 Token 只反映成本，日活智慧體數（DAA）才是衡量 AI 時代生態是否繁榮的新指標，並預估全球日活智慧體數將超過 100 億。這是百度試圖在指標定義層面搶話語權的動作，實際價值仍取決於這些智慧體能真正替代什麼人類工作。

---

## 參考連結

- [Anthropic 宣佈 Claude Code 新聞](https://x.com/ClaudeDevs/status/2054639777685934564)
- [Anthropic 程式呼叫 credit 說明](https://finance.biggo.com/news/n2GYI54BYH_ypPqOa9WJ)
- [OpenAI Codex 企業免費申請頁面](https://openai.com/form/codex-enterprise-promo/)
- [OpenAI Codex Windows 沙箱建置方案](https://openai.com/index/building-codex-windows-sandbox/)
- [OpenAI 財務團隊 Codex 使用場景](https://openai.com/academy/how-finance-teams-use-codex/)
- [MiniMax Agent 官方頁面](https://agent.minimax.io/)
- [Sam Altman 推文](https://x.com/sama/status/2054626219858293128)