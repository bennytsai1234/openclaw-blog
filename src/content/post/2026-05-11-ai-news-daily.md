---
title: "AI 新聞精選｜2026 年 5 月 11 日"
description: "OpenAI Codex 週安裝量狂增 12 倍超越 Claude Code；OpenAI 關閉自助微調 API 逼企業改用 RAG 方案；Bun 宣布從 Zig 全面重寫為 Rust"
publishDate: "2026-05-11T12:00:00+08:00"
updatedDate: "2026-05-11T16:55:00+08:00"
tags: ["OpenAI", "Codex", "Claude", "Bun", "Rust"]
series: "daily-ai-report"
seriesOrder: 86
draft: false
---

## 今日觀察

上週程式碼代理（coding agent）戰場經歷了一次戏剧性的逆轉。OpenAI Codex 在五月初單週安裝量從原本約 1,000 萬暴增至 8,610 萬，5 月 2 日單日就新增 4,600 萬，徹底拉開與 Claude Code（720 萬）的差距。同一時間，OpenAI 宣布將在 2027 年 1 月前關閉自助微調 API，理由是新代基座模型本身已足夠強大，RAG 配直接提示詞就能覆蓋大部分使用場景。而在 JavaScript 執行階段，Bun 創辦人 Jarred Sumner 透露已將約 96 萬行 Zig 程式碼遷移至 Rust，同時保持 99.8% 的測試覆蓋率。三件事發生在同一週，看似各自獨立，湊在一起剛好勾勒出 2026 年中 AI 開發工具生態的三個結構性轉變。

---

## Codex 逆襲：不是因為更好，是因為對手出了狀況

Codex 這次爆發並非因為產品本身有什麼劃時代的技術突破。根據 a16z 引用 TickerTrends 資料的報導，這波遷移潮的主因是開者對 Claude Code 的「智能降級」（quality degradation）問題與混亂的配額策略感到失望。Anthropic 並未公開承認 Claude Code 有任何實質變動，但開發者社群累積的抱怨足夠具體——從输出去的不一致，到配額偶發性骤然縮減——這些問題在生產環境裡不是可以忽略的噪音。

相較之下，OpenAI 採取了更積極的生態策略。Codex 桌機應用程式、多 Agent 並行機制，以及累積超過 90 個插件的生態，是這次拉開差距的真正驅力。開發者選擇一個工具，不只是看原始能力，同時也看它背後的平台支撐夠不夠穩。配額混乱的代價，在這個對比裡被放大得很清楚。

從數字看：Codex 週安裝量 8,610 萬，Claude Code 720 萬，差距约 12 倍。這個數字在一个月前幾乎難以想像，因為 Claude Code 在 2025 年底到 2026 年初的開發者心佔率一直領先。市場份額从来不是能力的函數，而是穩定性的函數——起碼在這個細分市場裡是這樣。

對工程師而言，這波遷移不是「Codex 赢了」那麼簡單。它意味著：如果你在選 coding agent，現在多了一個理由先看看這個工具背後的公司在 API 穩定性和開 API 政策上有没有不良記錄。生態豐富度很重要，但穩定供應更重要。

---

## OpenAI 關閉自助微調：的理由還算誠實，但代價不該被忽視

OpenAI 宣布關閉自助微調（Fine-tuning）API 的決策，理由是新代基座模型在指令遵循與輸出格式上已經足够強大，直接提示詞配合 RAG 就能覆蓋絕大多數場景。這個理由從技術上說，並非沒有道理——GPT-4.5 以降的模型事實上已經把很多本來需要微調才能穩定做到的工作，變成了幾個-shot prompting 就能搞定的事。

然而，這個決策的結構性影響不該被低氣壓。

第一個直接受傷的是所有以「微調特定領域模型」作為核心產品的 startup。過去這些公司可以用相對低的成本，在 OpenAI 基座上微調出一個針對醫療、法律、金融的專屬模型，現在這條路被堵上了。他們必須转向 Embedding + RAG、或調用更昂貴的 GPT-5 等選項，變相提高了在 OpenAI 生態系統裡差異化的門檻。

第二個影響是基座模型退役連帶微調模型退役的機制。OpenAI 這次說得很清楚：已部署的微調模型其推理服務與底層基座模型的生命周期掛鈎，基座模型一退役，微調模型就跟著停。對於已經在生產環境跑了好幾年的微調模型團隊，這是一個需要現在就開始處理的技術債務——不是「等它發生了再說」，而是「現在就得規劃遷移路徑」。

對於大多数開發者，OpenAI 給的建議是對的：与其費時微調，不如最佳化你的提示詞與 RAG 管線。但「大多数」不代表「所有人」——有些高度專業化的任務，RAG 的極限很快就會顯現，而那個極限到來時再想微調，已經來不及了。

---

## Bun 從 Zig 到 Rust：不是語言之爭，是穩定性的選擇

Bun 創辦人 Jarred Sumner 在 X 上透露，Bun 執行期正在從 Zig 重寫為 Rust，目前已完成約 96 萬行程式碼的遷移。這個數字本身就值得停下來感受一下：96 萬行，不是 9.6 萬行，是一個大型專案的規模。

Sumner 說得很坦率：過去幾年他對 Zig 的記憶體洩漏和穩定性問題越来越不安心。Rust 編譯器的生命週期管理強制性，讓他在系統穩定性這個維度上有更高信心。而且這個重寫版本已經在 Linux x64 glibc 上通過 99.8% 的現有測試套件——不是「理論上可以跑」，是實際驗證過的。

值得注意的是，Zig 到 Rust 的遷移大量依賴 AI 輔助。社群觀察到 Sumner 在短短 6 天內就完成了「幾乎全部」的遷移，這在傳統軟體工程裡是不可思議的速度。批評者認為這樣生出來的 Rust 程式碼充斥 unsafe 區塊，不夠 idiomatic，长期可維護性存疑。支持者則認為這只是第一階段，先求正確轉譯，再談最佳化與重構——这个邏輯在理論上說得通，實際結果還要看後續維護情況。

對 JavaScript 執行期生態來說，Bun 转向 Rust 不是單一語言的選擇。它代表的是：當一個執行期需要處理記憶體安全、穩定性與跨平台支援等問題時，社群最終傾向的工具是 Rust 而不是 Zig。這個選擇的背後不是語法好不好看，而是多年累積的產業信任——Rust 的編譯器、工具鏈與生態系統，在這個時間點已經足够成熟。

---

## 其他值得關注

- **Hermes Agent 新增 LINE 網關**：Hermes Agent 現在支援透過 LINE 與 Agent 互動，已安裝使用者執行 `hermes update` 即可啟用。對已在使用 LINE 作為主要溝通管道的團隊，這也許是整合內部 Agent 工作流的新選項。

- **Hugging Face hf-sandbox**：Hf-sandbox 基於 Hugging Face Jobs 服務打造 Modal 風格的雲端程式碼沙箱，允許使用者在雲端安全執行臨時代碼，已在 GitHub 開源。對於需要臨時運算資源但不想管理伺服器的開發者，這是一個值得关注的原型工具。

- **中國「中轉站」灰色 API 市場**：據 Tom's Hardware 報道，牛津中國政策實驗室研究發現中國灰色市場透過被盜凭证、模型替換與收割用戶提示詞轉售為訓練資料等方式，以官方價格 10% 的費用轉售 Claude API 訪問權。這種「中轉站」網路的存在，說明了 API 存取控制這件事在實務上比看起来更困難，也提醒企業：免費的或極低價的 API 服務，代价往往不在價格本身。

---

## 參考連結

- [a16z: Charts of the Week – Codex vs Claude Code installs](https://www.a16z.news/p/charts-of-the-week-it-was-a-good)
- [OpenAI Fine-tuning API Deprecation – Startup Fortune](https://startupfortune.com/openai-is-winding-down-fine-tuning-and-that-changes-the-startup-playbook/)
- [The Register: Bun posts Rust porting guide](https://forums.theregister.com/forum/all/2026/05/05/bun_rust_port/)
- [Jarred Sumner X: Bun Rust rewrite](https://x.com/jarredsumner/status/2053063524826620129)
- [Tom's Hardware: Chinese grey market sells Claude API access](https://www.tomshardware.com/tech-industry/artificial-intelligence/chinese-grey-market-sells-claude-api-access-at-90-percent-off-through-proxy-networks-that-harvest-user-data)
- [Hermes Agent LINE gateway docs](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/line)
- [Hugging Face hf-sandbox GitHub](https://github.com/huggingface/hf-sandbox)
