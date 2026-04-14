---
title: "AI 新聞精選｜2026 年 4 月 14 日"
description: "Claude Mythos 展現 32 步網攻能力、Cloudflare 與 OpenAI 深化 Agent 合作、OpenClaw v2026.4.12 強化本地模型支援"
publishDate: "2026-04-14T12:00:00+08:00"
updatedDate: "2026-04-14T16:50:00+08:00"
tags: ["Anthropic", "Cloudflare", "OpenAI", "OpenClaw", "Claude"]
series: "daily-ai-report"
seriesOrder: 13
draft: false
---

## 今日觀察

2026 年 4 月 14 日的 AI 界迎來多條重量級消息：英國 AI 安全研究所發布評估報告，證實 Anthropic Claude Mythos 已能自主執行含 32 步驟的企業網絡模擬攻擊；Cloudflare 與 OpenAI 宣布將 GPT-5.4 與 Codex 接入 Agent Cloud 平台；而 OpenClaw 也在同一天發布 v2026.4.12，針對本地模型支援與系統安全做出大幅強化。以下整理三條主線及其餘值得關注的動態。

---

## 主題一 — Claude Mythos 的網絡安全能力評估：AI 離「自主攻擊」還有多遠？

英國 AI Security Institute（AISI）稍早發布了對 Anthropic Claude Mythos Preview 模型網絡安全能力的獨立評估報告，結果引發業界高度關注。

在專家級 Capture-the-flag（CTF）資安挑戰中，Claude Mythos 取得了 **73% 成功率**；更關鍵的是，它成為首個能完整穿越 AISI 模擬靶場「The Last Ones」（TLO）—— 一個包含 **32 個步驟的複雜企業網絡攻擊模擬環境**—— 的 AI 模型，在 10 次嘗試中成功 3 次。

這代表什麼？TLO 靶場的設計目的在於模擬真實企業環境中的多層次防�縱深，從初始存取、橫向移動到資料竊取，涵蓋完整 kill chain。Claude Mythos 能完成其中多數步驟，結果是現有 AI 系統已具備對防禦薄弱企業進行端對端滲透的潛力。

AISI 也坦承，本次測試環境中缺乏主動防御機制，且 OT（操作技術）環境的表現相對受限。報告結論較為謹慎，但明確指出這是迄今為止對 AI 網絡攻擊能力最完整的獨立驗證。Anthropic 本身將此定位為「研究預覽」階段，距離真實世界濫用仍有距離。

---

## 主題二 — Cloudflare 與 OpenAI 深化合作：GPT-5.4 與 Codex 進駐 Agent Cloud

Cloudflare 與 OpenAI 正式對外宣布合作協議，將 GPT-5.4 與 Codex 模型引入 Cloudflare Agent Cloud 平台。雙方的目標很明確：讓企業開發者能直接在 Cloudflare 基礎設施內調用 OpenAI 前沿模型，構建、部署和擴展 AI Agent。

此次合作的核心產品包括：GPT-5.4 的 API 接入，以及 Codex harness 已於 Cloudflare Sandboxes（安全虛擬環境，用於構建、運行和測試 AI 應用）正式商用。Cloudflare 方面表示，Codex harness 計劃在近期登陸 Workers AI，屆時開發者將可直接在 edge 環境調用程式碼生成能力。

對企業而言，具體的好處是可以在同一個平台上整合 Cloudflare 的網絡安全能力與 OpenAI 的語言與程式碼模型，用於處理真實任務的 AI Agent。這個策略讓 Cloudflare 將自己定位為「AI Agent 基礎設施」，也將 OpenAI 的模型觸角從雲端 API 延伸到了邊緣節點。

---

## 主題三 — OpenClaw v2026.4.12：本地模型支援與安全修復並進

OpenClaw 在 4 月 12 日發布 v2026.4.12 版本，這是該專案近來幅度最大的更新之一。

本次版本最值得注意的新功能是**內建 LM Studio provider**，讓 OpenClaw 可直接對接本地運行的大語言模型，不再完全依賴雲端 API。同時為 macOS Talk Mode 引入實驗性的**本地 MLX speech provider**，以蘋果晶片的神經網絡加速框架實現語音處理。此外，新增**Active Memory 插件**，可在主回復前自動提取相關偏好與上下文；`openclaw exec-policy` 命令則用於同步本機執行批准文件。

在安全性方面，開發團隊集中修復了大量涉及 Gateway、憑證安全與多平台通信組件的缺陷，涵蓋從網絡媒體發送到敏感資料保護等多個層面。

對使用 OpenClaw 作為日常開發伴侶的工程師而言，LM Studio provider 的加入是本版最大亮點——本地模型延遲低、隱私強，配合蘋果 MLX speech provider，標誌著 OpenClaw 在「端側 AI」方向邁出實質一步。

---

## 其他值得關注

- **Qwen OAuth 免費配額驟降**：阿里 Qwen 宣布自 4 月 15 日起，Qwen Code OAuth 每日免費請求額從 1,000 次砍至 100 次，官方建議用戶遷移至 OpenRouter、Fireworks AI 或阿里雲百煉。對重度仰賴免費額度的個人開發者影響顯著。

- **MiniMax M2.7 許可證爭議**：針對近期社群對 M2.7 模型商業服務授權限制的批評，MiniMax 官方澄清是因第三方托管服務屢次提供劣質或假冒介面、損害品牌與用戶體驗所致。自托管、本地運行及公司內部工作流仍免費，只有大規模商業蒸餾才需授權。

- **Anthropic 回應提示詞緩存爭議**：開發者發現關閉 Claude Code 遙測後，prompt cache 時長從 1 小時降至 5 分鐘，質疑為隱私換性能的懲罰機制。Anthropic 工程師澄清是實驗開關失效導致讀取預設值，並預告將提供環境變量讓用戶自行切換 1 小時或 5 分鐘模式。

- **Cursor Agent SDK 爭議**：有開發者逆向發現 Cursor 3.0 內建完整 Claude Agent SDK 並全面置換標識。Cursor 創辦人 Michael Truell 表示這是小於 1% 流量的 A/B 測試，旨在對比原生 Claude Code harness 與 Cursor 預設 harness 的表現差異。

---

## 參考連結

- [AISI - Claude Mythos Cyber Capabilities Evaluation](https://www.aisi.gov.uk/blog/our-evaluation-of-claude-mythos-previews-cyber-capabilities)
- [Cloudflare + OpenAI Agent Cloud 公告](https://openai.com/index/cloudflare-openai-agent-cloud/)
- [OpenClaw v2026.4.12 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.4.12)
- [Qwen Code GitHub](https://github.com/QwenLM/qwen-code)
- [MiniMax M2.7 License 聲明](https://x.com/RyanLeeMiniMax/status/2043573044065820673)
- [Anthropic Prompt Cache 爭議回應](https://x.com/bcherny/status/2043715713551212834)
