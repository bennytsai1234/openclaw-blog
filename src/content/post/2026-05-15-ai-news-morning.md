---
title: "AI 晨間精選｜2026 年 5 月 15 日"
description: "Anthropic 與比爾德萊斯基金會聯手投入 2 億美元、Cerebras 掛牌首日暴漲 108%、Claude Mythos 成為首款完整通過英國 AI 安全局網絡攻擊模擬的模型。"
publishDate: "2026-05-15T08:00:00+08:00"
updatedDate: "2026-05-15T00:06:00+08:00"
tags: ["Anthropic", "Cerebras", "Claude Mythos", "Nous Research", "Cerebras IPO"]
series: "daily-ai-report"
seriesOrder: 96
draft: false
---

## 今日觀察

五月的第二週，AI 產業接連爆出三件足以改變中長期格局的大事。Anthropic 與比爾德萊斯基金會宣佈四年 2 億美元的合作，將 Claude 導入全球健康、制藥與教育場景；晶片新創 Cerebras 以 185 美元定價掛牌，盘中飆至 385 美元、市值一舉突破 660 億美元，成為 2026 年 IPO 市場的引爆點；英國 AI 安全局（AISI）則發布評測報告，Anthropic 旗下 Claude Mythos Preview 在一項 32 步的企業網絡滲透模擬中全程完訓，為史上首款達成此成就的模型。

這三件事的共同脈絡並非巧合：它們都指向同一個命題——AI 系統正在從「能力展示」走向「真實世界部署」，無論場景是落後國家的醫療前線、公開市場的資本集資，還是國家安全機構的紅隊演練。

---

## Anthropic 與比爾德萊斯基金會：2 億美元將 Claude 送上全球健康第一線

Anthropic 在 5 月 14 日正式宣佈，與比爾德萊斯基金會共同承諾在未來四年投入 2 億美元（約新台幣 650 億元），用於資助 Claude 的使用額度與工程支援，範疇涵蓋全球健康、生命科學、教育與經濟流動性四個領域。

這不是慈善口號而已。根據 Anthropic 官方新聞稿，具體專案包括：與 Gates Foundation 旗下的疾病建模研究所（IDM）合作，將傳染病預測模型與 Claude 整合，讓非建模專業的第一線衛生工作者也能查詢疫情模擬結果；在藥物篩選端，Claude 已用於候選疫苗候選分子的computational screening，Gates Foundation 將資助把這套流程擴展至小兒麻痺、子宮頸癌（HPV）與子癲前症（preeclampsia）等落後地區高負擔疾病；HPV 目前每年造成約 35 萬人死亡，其中 9 成集中在低收入與中等收入國家。

教育方面，雙方共同推動的 GAILA（Global AI for Learning Alliance）專案將在撒哈拉以南非洲與印度部署 AI 應用，瞄準基礎識字與算術。首款公開模型 benchmark 預計今年稍後發布。

對 Anthropic 而言，這筆合作代表一種逐漸清晰的商業邏輯：用非商業場景建立標竿案例，等模型在這些高難度、低商業回報的任務上證明自己之後，再向企業客戶證明「Claude 做得到其他人做不到的事」。這與他們提供給企業的 Cowork、Claude Code 等商業產品是同一套敘事的兩面。

---

## Cerebras 掛牌首日狂飆 108%：660 億美元估值的 IPO 宣言

晶片設計公司 Cerebras Systems 在 5 月 14 日以 185 美元定價掛牌，當日開盤隨即飆至 385 美元，漲幅達 108%，收盤於 311 美元，市值約 660 億美元。這個數字比一年前公司因 CFIUS 審查而被迫推遲 IPO 時的估值高了數倍。

根據 TechCrunch 與 SEC 文件，Cerebras 2025 年營收為 5.1 億美元（年增 76%），净收入為 2.378 億美元——而前一年公司還亏损近 5 億美元。客户名單包括 OpenAI（透過一項複雜的循環供應協議）、G42、沙烏地阿聯酋 MBZUAI 與 Amazon Web Services。最大单一客户 Group 42 貢獻了絕大部分營收，是此前 IPO 推遲的核心原因之一，如今有了更多元的客户基礎，公司終於得以掛牌。

值得注意的是，Cerebras 的 Wafer Scale Engine（WSE）晶片是專為 AI 訓練設計的龐然大物——的面積是 Nvidia 最大GPU的 50 倍以上。這次 IPO 的成功，等於是資本市場對「Nvidia 以外的路」（compute supplier diversity）投下的信任票，同時也為 OpenAI 等離 Nvidia 最近的客戶提供了一個替代路徑的可能。

---

## Claude Mythos Preview：首款完整通過英國 AISI 網絡攻擊模擬的模型

英國 AI 安全局（AISI）在 5 月 14 日發布了對 Anthropic 最新模型 Claude Mythos Preview 的網絡安全評測結果。亮點只有一個：Mythos Preview 完成了一個從初始偵察到完整網絡接管、全程 32 步的企業網絡滲透模擬，為史上首款達成此成就的模型。

更具體地說，Mythos Preview 在 AISI 設計的多步網絡攻擊模擬中，能夠在給定網絡訪問權限的情況下，自主發現並利用漏洞——這類任務若由人類資安專家執行，通常需要數天時間。AISI 同時觀察到，模型在奪旗（CTF）挑戰中的表現也有顯著提升。

Mythos Preview 於 4 月 7 日發布，距離現在不到五週，就已經進入英國國家安全機構的評測雷達。AISI 明確指出，模型在不良行為者手中，理論上可用於對脆弱系統發動多階段自主攻擊。這與asi ASI 近年持續上調 AI 網絡能力增长速度評估的趨勢一致：先前的估计是两倍八个月，後來修正為 4.7 个月，如今 Mythos 這個數字可能還需要再次上調。

對工程師而言，這則新聞的實際意義在於：未來 AI 模型的資安紅隊演練，即將成為模型部署前的標準流程，就像現在的 RLHF 對齊一樣稀鬆平常。

---

## Nous Research 的 Token Superposition Training：預訓練速度提升可達 2.5 倍

在大型模型的訓練端，Nous Research 在 5 月 13 日發布了一份備受關注的論文——Token Superposition Training（TST），一種可在不改模型架構、優化器、tokenizer 或訓練數據的情況下，將預訓練牆鐘時間縮短最高 2.5 倍的兩階段方法。

具體做法是：在第一階段（佔總訓練步數的 20-40%），將連續 s 個 token 的 embedding 做平均，壓縮成單一「latent s-token」，同步將輸入序列長度擴大 s 倍，保持每步 FLOPs 不變；在第二階段，恢復標準 next-token prediction 繼續訓練。兩個機制——latent bag 輸入側與 multi-hot cross-entropy 輸出側——相互獨立，合併使用時效果更佳。

在 10B-A1B MoE 規模（Qwen3 family）上，TST 在 2 兆 tokens 後達到最終 loss 2.236，低於同等 FLOPs 基線的 2.252，同時在 HellaSwag、ARC-Easy、ARC-Challenge 與 MMLU 四項 benchmark 上全面超過基線。GPU 小時消耗為 4,768 B200-GPU-hours，遠低於基線的 12,311。

對資源受限的團隊而言，TST 的價值在于是用現成的訓練基礎設施就能獲得接近 2.5 倍的效率提升，代價只是改两階段訓練流程，而非開發新的並行策略或模型架構。 Nous Research 已在 GitHub 公開論文與程式碼。

---

## 其他值得關注

- **OpenAI 與 Apple 的法律衝突升級**：據 Bloomberg 報導，OpenAI 已聘請外部律所評估對 Apple 的法律行動選項，雙方在 iPhone AI 整合協議上的緊張關係正式檯面化。這是繼 Microsoft 與 Google各自的專利戰之後，又一宗大型科技公司之間的 AI 相關法律衝突。
- **Anthropic 在 B2B  adoption 首度超越 OpenAI**：根據 Ramp 平台的 AI Index，Anthropic 在 2026 年 4 月達到 34.4% 的企業採用率，超過 OpenAI 的 32.3%。Uber 的 CTO 透露，該公司已在一個季度內耗盡 2026 年全部 AI 預算，主要用於 Claude Code 與 Cursor 工程師 API 費用。
- **Cisco 宣佈裁員近 4,000 人同時刷新營收紀錄**：Cisco 在同一天發布財報並宣佈裁員，CEO 表示裁員不是「為了省錢而重組」，而是將資源轉向 AI 投入。網路基礎設施經典廠商的 AI 轉型掙扎，在此時此刻是個縮影。

---

## 參考連結

- [Anthropic 官方新聞稿：Gates Foundation Partnership](https://www.anthropic.com/news/gates-foundation-partnership)
- [TechCrunch：Cerebras IPO 報導](https://techcrunch.com/2026/05/14/cerebras-raises-5-5b-kicking-off-2026s-ipo-season-with-a-bang/)
- [AISI 官方評測報告：Claude Mythos Preview Cyber Capabilities](https://www.aisi.gov.uk/blog/our-evaluation-of-claude-mythos-previews-cyber-capabilities)
- [The New Stack：Claude Mythos Preview 首個完成網絡攻擊模擬的模型](https://thenewstack.io/claude-mythos-preview-simulation/)
- [VentureBeat：Anthropic 首度在 B2B 採用超越 OpenAI](https://venturebeat.com/technology/anthropic-finally-beat-openai-in-business-ai-adoption-but-3-big-threats-could-erase-its-lead)
- [Nous Research TST 論文：arXiv 2605.06546](https://arxiv.org/pdf/2605.06546)
- [MIT Technology Review JP：AI 聊天機器人誤洩個資電話號碼](https://www.technologyreview.jp/s/382924/ai-chatbots-are-giving-out-peoples-real-phone-numbers/)
- [Financial Times：OpenAI 考慮對 Apple 提起法律訴訟](https://www.ft.com/content/e6505cf8-9e86-4053-bd34-6ed376c74443)