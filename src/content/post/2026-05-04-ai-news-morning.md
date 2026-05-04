---
title: "AI 晨間精選｜2026 年 5 月 4 日"
description: "奧斯卡禁 AI、小米追上 Claude Opus、哈佛研究 AI 診斷勝過醫生——產業界集體面對責任歸屬問題的一天"
publishDate: "2026-05-04T08:00:00+08:00"
updatedDate: "2026-05-04T08:03:00+08:00"
tags: ["Xiaomi", "MiMo", "Mistral", "Vibe", "OpenAI", "Oscars"]
series: "daily-ai-report"
seriesOrder: 77
draft: false
---

## 今日觀察

五月的第一個週一，AI 業界同時傳來三條分屬不同維度的消息，湊在一起剛好構成一張完整的切片：小米發表 MiMo-V2.5-Pro，把 open-weight 模型的能力邊界直接推到接近 Claude Opus 4.6 的水準；奧斯卡新規則把 AI 生成演員與劇本踢出競賽資格；同一時間，一份哈佛研究讓 OpenAI o1 在急診分類場景裡與主治醫師的診斷準確率對尬，數字出來了，但責任框架連影子都還沒有。三件事各自代表一種正在集體成形的焦慮：工程師焦慮模型能不能打、創作者焦慮飯碗怎麼算、機構焦慮出事誰負責。沒有任何一個答案是現成的。

---

## 小米 MiMo-V2.5-Pro 追上 Claude Opus——代價是六成低的 token 消耗

小米上週悄悄公布的 MiMo-V2.5-Pro，這幾天陸續被外媒實測拆解之後，現在輪到 coding agent 社群認真看待它了。

這是一個混合專家架構（MoE）的 open-weight 模型，總參數量 1.02 兆，每次請求只激活 420 億參數。它在 SWE-Bench Verified 拿到 78.9%，只落後 Claude Opus 4.6（77.1%）大約兩个百分点——但 token 消耗少了 40% 到 60%，這是官方自己的 ClawEval benchmark 量出來的數字。

光看分數已經足夠讓人好奇，但真正讓這個數字有意義的是小米展示的三個 demo。第一個 demo 在 4.3 小時內用 672 次 tool call 跑完一個北大課程的完整編譯器專案，第一次編譯就通過 137/233 個測試，最後來到 233/233，覆蓋率從 59% 拉到 100%。第二個 demo 用 11.5 小時、1870 次 tool call 生成了一个包含約 8000 行程式碼的桌面影片編輯器。第三個 demo 接著 Claude Code 的電路模擬器，在一小時內設計出一個通過全部六項技術規格的穩壓器，其中四項比初版好上一個數量級。

對比同樣走長時 autonomous coding 路線的 Claude Opus 4.6，MiMo-V2.5-Pro 的差異主要有兩層。第一層是效率：同樣的 coding task，它用的 token 少了近一半，對需要一小時以上、多達數千次 tool call 的場景，這個數字直接換算成運算成本。第二層是架構——小米在 MiMo-V2.5-Pro 上用了一種 local 加 global attention 混合的機制，聲稱可以把長文本的記憶體需求降低接近七倍，同時用 parallel token prediction 把輸出速度加快三倍。Pre-training 吃了 27 兆 tokens，之後分段把 context window 撐到 100 萬 tokens。

另外三個配套模型也值得順便提一下：MiMo-V2.5（310B 總參數，開放權重）、MiMo-V2.5-TTS（三種變體，API only，目前免費）、以及 MiMo-V2.5-ASR（中英雙語，開源，Word Error Rate 5.73%）。其中 ASR 在中文方言（吳語、粵語、閩南語）上的 Word Error Rate 領先 Gemini 3.1 Pro 超過 16 個百分點，這個數字在實際產品整合時不是小細節。

---

## Mistral Vibe 上線遠端 Agent——工程師終於可以下班了，程式還在跑

Mistral AI 選擇在差不多的時間點把他的 coding agent 平台 Vibe 做了一次幅度不小的升級，核心是兩件事：遠端 Agent 模式和 Mistral Medium 3.5 模型。

Vibe 原本是 local 跑的一個 CLI coding agent，概念類似加強版的 junior developer，可以接手寫程式、重構、測試、查 CI 失敗等任務。現在 Vibe 支援把 session 丢到雲端跑，工程師可以在 CLI 或 Le Chat 裡啟動、檢視進度（file diffs、tool calls、狀態更新），然後去睡覺或開下一個會。已經在 local 跑的 session 也可以隨時「搬家」到雲端，session 歷史與任務狀態無縫帶過去。這解決了一個很實際的痛點：過去 coding agent 必須綁在 terminal 前面，一旦任務需要幾小時，工程師反而成了瓶頸。

每個雲端 session 跑在隔離的 sandbox 裡，包括廣域編輯和套件安裝都安全。任務完成之後，agent 會自動幫你開一個 GitHub pull request。平台支援 GitHub、Linear、Jira、Sentry，以及 Slack 或 Teams 的通知串。

模型端是 Mistral Medium 3.5，這是一個 128B 的 dense 模型，256k context，訓練從頭打造的 vision encoder——不是像多數多模態模型那樣複用 CLIP，而是針對輸入圖片尺寸和長寬比做原生支援。SWE-Bench Verified 分數 77.6%，領先 Devstral 2 與 Qwen3.5 397B A17B。這個數字讓它進入 coding agent 實用模型的第一梯隊。

值得注意的一個設計細節：Mistral Medium 3.5 的 reasoning effort 可以針對每個 request 單獨調整，同一個模型可以回答快速客服問題，也可以跑複雜的 multi-step agentic 任務，不需要切換模型。這對 API 整合者來說是個不錯的彈性設計——簡單問題省運算，複雜問題直接拉滿。

Le Chat 也同時上線了 Work mode，讓 Mistral Medium 3.5 在一個統一的 orchestration 層上驅動多步跨系統工作流：串聯 email、calendar、documents、Jira、Slack，同一個 task 裡同時開多個工具，所有 tool call 與 reasoning 步驟都透明可查，敏感操作需要 explicit approval 才會執行。

---

## 哈佛研究讓 OpenAI o1 與主治醫師急診分類同台——數字是真的，框架是缺的

這個週末燒得最熱的新聞不是哪個模型上市，而是一份哈佛與 Beth Israel Deaconess Medical Center 合作、發表在《Science》上的研究。團隊找來 76 名實際進急診的病人，把電子病歷中的文字資訊同時丢給兩位內科主治醫師與 OpenAI o1、GPT-4o 模型，讓另外兩位主治醫師在不知道來源的情況下評估診斷品質。

結果在初始 triage 階段（資訊最少、決策最急迫的環節），o1 給出「完全正確或非常接近」診斷的比率是 67%，兩位醫師分別是 55% 與 50%。整體而言，o1 在每個診斷接觸點的表現都與或優於兩位醫師。

然而研究本身，以及多位臨床醫師後續的解讀，都指向同一個問題：這個數字怎麼讀。研究沒有宣稱 AI 已準備好做出生死決策，而是說明「迫切需要前瞻性試驗來評估這些技術在真實臨床環境中的表現」。緊急醫師 Panthagani 在部落格文章中指出，這個研究比較的對象是內科醫師而非急診專科醫師，她說：「我不意外 LLM 可以在神經外科筆試題打敗皮膚科醫師，但那不是一個有用的資訊。」急診醫師的核心任務不是猜最終診斷，而是在最短時間內確認「有沒有任何症狀可能致死」。

對軟體工程師而言，這個研究的啟示不在 AI 能不能看病，而在部署後的責任鍊。o1 的數字已經跑出來了，但醫療體系目前「沒有任何正式的问責框架」（Adam Rodman，論文作者之一）。當演算法在急診 triage 拿出的判斷影響了後續治療方向，環節上的每一個角色——模型提供方、醫院資訊系統整合方、開發這個流程的 IT 人員——是否以及如何被問責，目前沒有答案。

---

## 其他值得關注

- **蘋果封殺 vibe coding 類 App 上架**：Financial Times 報導蘋果開始對大量主打 AI vibe coding 的應用程式進行審查攔截，理由是安全風險。這代表 iOS 生態對 AI coding 工具的官方立場正在收緊。
- **Microsoft VS Code 悄悄在 commit message 裡加入「Co-Authored-by Copilot」**：即便用戶把 AI 功能完全關閉，VS Code 仍然在 commit 裡加上這個標記，疑似為了墊高 Copilot 使用數據。社群反彈後微軟已承諾在 1.119 版 revert 這個行為。
- **DeepSeek V4 Pro 遭 US 政府機構測試落後 US 模型約 8 個月**：NIST 下屬 CAISI 的報告指出 DeepSeek V4 Pro 在資安、軟體開發、數學、抽象推理等領域落後美國頂尖模型；但同期 independent benchmark（Artificial Analysis Intelligence Index）顯示差距大致持平，價格競爭力仍是中國模型最大的武器。

---

## 參考連結

- [Xiaomi MiMo-V2.5-Pro — The Decoder](https://the-decoder.com/xiaomis-open-weight-mimo-v2-5-pro-takes-aim-at-claude-opus-with-hours-long-autonomous-coding/)
- [Mistral AI Vibe Remote Agents + Mistral Medium 3.5 — MarkTechPost](https://www.marktechpost.com/2026/05/02/mistral-ai-launches-remote-agents-in-vibe-and-mistral-medium-3-5-with-77-6-swe-bench-verified-score/)
- [Academy Oscars Rules on AI — TechCrunch](https://techcrunch.com/2026/05/02/ai-generated-actors-and-scripts-are-now-ineligible-for-oscars/)
- [Harvard Study: AI vs ER Doctors — TechCrunch](https://techcrunch.com/2026/05/03/in-harvard-study-ai-offered-more-accurate-diagnoses-than-emergency-room-doctors/)
- [Harvard Study Original Paper — Science](https://www.science.org/doi/10.1126/science.adz4433)
- [Microsoft VS Code Copilot Co-Author Commit — The Decoder](https://the-decoder.com/co-pilot-becomes-a-co-author-in-vs-code-without-being-asked/)
- [China Falling Behind US AI Benchmark — The Decoder](https://the-decoder.com/china-is-falling-behind-in-the-ai-race-according-to-a-us-government-benchmark/)
