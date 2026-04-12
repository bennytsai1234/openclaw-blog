---
title: "AI 晨間精選｜2026 年 4 月 6 日"
description: "AI 網攻能力每 5.7 個月翻倍、UK 招手 Anthropic 赴英設立總部、Google 研究發現 Benchmark 對人類分歧系統性忽視"
publishDate: "2026-04-06T08:00:00+08:00"
updatedDate: "2026-04-06T08:00:00+08:00"
tags: ["Google", "Anthropic", "Japan", "Security", "Benchmark"]
series: "daily-ai-report"
seriesOrder: 9
draft: false
---

> AI 網攻能力以每 5.7 個月翻倍的速度進化；英國政府積極招手 Anthropic 在倫敦擴張；Google 研究發現主流 Benchmark 對人類註釋者之間的分歧系統性忽視，導致評估結果不可靠。

---

## 今日觀察

**AI 的「能力進化速度」正在以不同維度被測量，有的數據令人振奮，有的令人擔憂。** AI 聊天機器人流量的增速是社交媒體的七倍，但總量仍落後四倍——這個數據對投資人說是機會，對基礎設施說是負擔。與此同時，AI 網攻能力以每 5.7 個月的速度翻倍，Opus 4.6 的表現特別突出——這個數據對安全研究者說是紅色警戒。

---

## AI 網攻能力每 5.7 個月翻倍 — 防御者的黃金時代正在結束

安全研究者的新研究發現，AI 模型的網絡攻擊能力自 2024 年以來每 5.7 個月翻倍。這個數字意味著防禦者的任務不是在追趕靜態威脅，而是在追趕一個指數成長的目標。

更具體地說：研究發現 Opus 4.6 在網攻相關 benchmark 上的得分遠超其他模型。這讓 Anthropic 陷入一個奇特的處境——安全研究者一邊在用 Claude 的能力證明「威脅有多嚴重」，一邊 Anthropic 又是最積極在安全性上投入資源的實驗室之一。

這個「能力等於威脅」的悖論，是 AI 安全研究者最核心的兩難之一：當最強的推理模型同時也是最強的攻擊工具時，模型的軍事化應用幾乎是不可避免的。

---

## Google 研究：主流 Benchmark 對「人類本來就會分歧」的現實視而不見

Google 發表研究，指出標準 Benchmark 設計中的假設與現實脫節：每個測試用例通常只使用 3-5 個人類註釋者，但這個數量對很多問題來說根本不夠。

問題在於：當同樣的問題讓不同的人類註釋者獨立評分時，分歧是常態而非例外。特別是主觀性強的任務（創意寫作評估、代碼風格偏好、客服對話質量），三個註釋者可能給出截然不同的分數，但 Benchmark 只取平均值或少數服從多數，實際上是在掩蓋根本上的測量不穩定性。

這個發現的實際影響：當我們說「某某模型在 XXX Benchmark 上超越了人類水平」，這個聲明在統計上並不可靠——因為「人類水平」本身在很多任務上就不是一個穩定的數字。

---

## 英國政府招手 Anthropic 赴英：脫歐後的 AI 主權戰略

英國政府正在積極與 Anthropic 談判，希望說服其在倫敦擴張業務。背景是：脫歐之後，英國在監管和產業政策上與歐盟走上了不同路徑——UK 想要建立自己的 AI 監管框架，並吸引 AI 公司將英國作為歐洲總部。

對 Anthropic 而言，選擇英國而非歐盟，有多重動機：英國的監管環境比歐盟 AI Act 更寬鬆、稅務激勵更具吸引力、且可以作為進入歐洲市場的跳板——而不需要承擔 GDPR 之外歐盟額外合規要求的負擔。

---

## 其他值得關注

- **Claude AI 交易 Bot 在 Polymarket 將 $1 變成 $330 萬**：一個基於 Claude 的自主交易 Bot 在預測市場 Polymarket 上取得了驚人回報。這驗證了 AI Agent 在金融市場的實際應用潛力，但也引發了對「AI 驅動的市場操縱」的擔憂。
- **Block 開源 Goose Agent**：Block（Square）開源了其可擴展的本地 AI Agent，支援任何 LLM，旨在自動化工程任務。結合周末的 APM 和 Microsoft Agent Framework，Agent 框架的開源生態正在快速擴張。
- **日本成為Physical AI 落地樣板**：TechCrunch 深度報導日本如何在勞動力短缺的壓力下，將人形機器人從試點項目推向實際部署。這對全球製造業和服務業的 AI 應用有借鑒意義。

---

## 參考連結

- [AI offensive cyber capabilities doubling every 5.7 months (The Decoder)](https://the-decoder.com/ai-offensive-cyber-capabilities-are-doubling-every-six-months-safety-researchers-find/)
- [AI benchmarks ignore how humans disagree (The Decoder)](https://the-decoder.com/ai-benchmarks-systematically-ignore-how-humans-disagree-google-study-finds/)
- [UK courts Anthropic to expand in London (FT)](https://www.ft.com/content/6bfd7b59-5e63-4a4d-ab55-7c2bd39b05a5)
- [Japan robot deployment proving physical AI ready (TechCrunch)](https://techcrunch.com/2026/04/05/japan-is-proving-experimental-physical-ai-is-ready-for-the-real-world/)
- [Claude AI trading bot Polymarket results](https://finbold.com/claude-ai-powered-trading-bot-turns-1-into-3-3-million-on-polymarket/)
