---
title: "AI 晨間精選｜2026 年 4 月 4 日"
description: "Anthropic 4 億美元收購生物科技公司並成立 PAC、DeepSeek V4 將全面使用華為晶片"
publishDate: "2026-04-04"
updatedDate: "2026-04-04"
tags: ["Anthropic", "DeepSeek", "OpenClaw", "Microsoft", "Security"]
series: "daily-ai-report"
seriesOrder: 8
draft: false
---

> Anthropic 以 4 億美元收購生物科技新創 Coefficient Bio 並成立 AI 政策 PAC；DeepSeek V4 據報將完全使用華為晶片運行；系統提示詞大規模外洩事件持續發酵。

---

## 今日觀察

**AI 實驗室正在從「純技術公司」變成「綜合性權力實體」。** Anthropic 收購生物科技公司、成立政治行動委員會；OpenAI 高層人事地震、收購媒體；中國 AI 供應鏈正在以華為為核心重建。這些動作的共同方向：掌握自己的命運，而不是被政策、硬體供應鏈或公關危機牽著走。

---

## Anthropic 雙線擴張 — 4 億美元收購生物科技 + 成立政策 PAC

Anthropic 在同一天宣佈兩項重大擴張動作。

**第一筆：收購 Coefficient Bio**，這是一家隱身模式（stealth）的生物科技 AI 新創，收購金額為 4 億美元股票交易。這是 Anthropic 首次大型收購，訊號很明確：Anthropic 不只想做語言模型，它想要佔據生命科學領域的 AI 應用高地。生物製藥的數據量級和複雜性，恰好是 AI 的下一個爆發點——而 Anthropic 要從最上游的模型層直接滲透到製藥研發。

**第二筆：成立專屬 PAC（政治行動委員會）**。距離期中選舉不到幾個月，Anthropic 的新組織將資助支持 AI 公司政策議程的候選人。這代表 AI 產業的政策遊說正式進入有組織化階段——不只是派人去國會聽證，而是直接用錢影響選舉結果。

兩件事加在一起：左手拿制藥數據、右手拿政策影響力。Anthropic 的野心不只是「安全的 AI」，而是「在多個維度建立不可替代性」。

---

## DeepSeek V4 將完全使用華為晶片 — 中國 AI 自主化里程碑

據 The Decoder 獨家報導，DeepSeek V4 將在發布時完全使用華為 Ascend 晶片運行，而非 NVIDIA。這將是中國最大規模的旗艦模型完全在國產硬體上運行的案例。

據悉字節跳動、騰訊等中國科技巨頭已向華為下訂數十萬片 Ascend 晶片。這不只是 DeepSeek 的選擇，而是整個中國 AI 生態在美國晶片出口管制壓力下的集體轉向。NVIDIA 的中國營收將持續受到擠壓，而華為 Ascend 的軟體生態（MindSpore、CANN）在這一壓力下將被迫快速成熟。

對全球 AI 硬體競爭格局而言，這是一個結構性轉折點： Nvidia 的護城河在中國市場正在以比預期更快的速度被腐蝕。

---

## 系統提示詞大規模外洩 — 你的 AI 可能在「裸奔」

GitHub 出現了一個名為 `system_prompts_leaks` 的開源專案（`asgeirtj/system_prompts_leaks`），已提取並公開了以下系統提示詞：

- GPT-5.4、GPT-5.3、Codex
- Claude Opus 4.6、Sonnet 4.6、Claude Code
- Gemini 3.1 Pro、3 Flash、CLI
- Grok 4.2、4
- Perplexity 及更多

這些不是猜測或逆向工程，而是從實際 API 響應中提取的真實系統指令。對於企業用戶而言，這意味著：你付費使用的 AI 系統，其內部運作邏輯已經公開在網路上——任何人都可以知道 Claude Code 是如何被設計來控制 agent 行為的。

這與前幾天 Claude Code 原始碼洩露事件形成連環效應：先是程式碼，再是指令系統。安全研究者擔憂，這些資訊的組合可以讓攻擊者更精準地設計「提示詞注入」和「系統提示詞繞過」攻擊。

---

## 其他值得關注

- **Meta 暫停與 Mercor 合作**：Mercor 資料外洩事件影響擴大，Meta 等主要 AI 實驗室正在評估資料安全風險——受影響的不只是 Mercor 本身，而是整個 AI 訓練資料供應鏈的信任。
- **OpenAI 高層變動**：COO Brad Lightcap 被任命領導「特殊項目」，CMO Kate Rouch 因健康因素離開。Fidji Simo 請假數週，CEO of AGI Deployment 職位面臨重構。
- **Ars Technica 報導 OpenClaw 安全問題**：文章提及「攻擊者可無認證獲得管理員權限」——建議儘快確認 OpenClaw v2026.4.1/4.2 的安全更新是否已套用。

---

## 參考連結

- [Anthropic buys biotech startup Coefficient Bio (TechCrunch)](https://techcrunch.com/2026/04/03/anthropic-buys-biotech-startup-coefficient-bio-in-400m-deal-reports/)
- [Anthropic ramps up political activities with new PAC (TechCrunch)](https://techcrunch.com/2026/04/03/anthropic-ramps-up-its-political-activities-with-a-new-pac/)
- [DeepSeek V4 on Huawei chips (The Decoder)](https://the-decoder.com/deepseek-v4-will-reportedly-run-entirely-on-huawei-chips-in-a-major-win-for-chinas-ai-independence-push/)
- [System prompts leaks repo (GitHub)](https://github.com/asgeirtj/system_prompts_leaks)
- [Meta pauses work with Mercor (Wired)](https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/)
- [OpenClaw security concerns (Ars Technica)](https://arstechnica.com/security/2026/04/heres-why-its-prudent-for-openclaw-users-to-assume-compromise/)
