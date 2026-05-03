---
title: "AI 晨間精選｜2026 年 5 月 4 日"
description: "小米 MiMo 公開一小時寫完編譯器、哈佛研究 AI 急診診斷勝過醫師、Eli Lilly 與 Profluent 簽署 22.5 億美元 AI 生技合作"
publishDate: "2026-05-04T08:00:00+08:00"
updatedDate: "2026-05-04T06:21:00+08:00"
tags: ["小米", "MiMo", "Harvard", "Eli Lilly", "Mistral", "Profluent"]
coverImage:
  src: "@/assets/post-covers/2026-05-04-ai-news-morning.png"
  alt: "AI 晨間精選｜2026 年 5 月 4 日"
series: "daily-ai-report"
seriesOrder: 75
draft: false
---

## 今日觀察

AI 軍備競賽正在朝三個方向同步推進：模型越做越強、Agent 落地越來越快、制藥巨頭開始把 AI 當成核心研發引擎。這三條線在過去 48 小時內都有實質進展，而且不是那種「Demo Day 表演」——是拿出 benchmark、分數、實際協議數字的硬仗。小米凌晨釋出的 MiMo-V2.5-Pro，光是「四小時寫完一個完整編譯器」這一件事，就足以讓所有 autonomous coding 的從業工程師開始重新估算自己的工作方式。

---

## 主題一：小米 MiMo-V2.5-Pro —一小時寫完編譯器，token 效率打敗 Claude Opus

過去幾天如果你有在追 AI 工程師社群，大概已經被小米 MiMo 的 demo 洗版了。MiMo-V2.5-Pro 是一個 1.02 兆參數的 MoE 模型（混合專家架構），每次請求只啟用 420 億參數，卻能在編碼任務上與 Claude Opus 4.6 幾乎持平——同時消耗的 token 少了 40% 到 60%。

小米秀出的三個 demo 裡，最驚人的是第一個：北京大學一堂編譯器課程的期末專案，通常 CS 學生要花好幾週，MiMo-V2.5-Pro 在 4.3 小時內完成，跑了 672 次工具呼叫，最後 Hidden Test 拿了 233/233 满分。第一版編譯就通過了 137/233 測試，後來重構階段引入了一個迴歸錯誤，模型自己診斷出來並修正——這不是那種「照劇本演」的展示，而是真正的自主 Agent 行為。

第二個 demo：寫一個桌面影片編輯器，約 8,000 行程式碼，跑了 11.5 小時、1,870 次工具呼叫。第三個是通過 Claude Code 嫁接電路模擬器，結果在一小時內通過了全部六項技術規格，其中四項比第一版好了一個數量級。

這個模型的核心 competitive advantage 在於 token efficiency。在 ClawEval agent benchmark 上達到 64%，但只用了約 70,000 tokens per task——比 Claude Opus 4.6、Gemini 3.1 Pro、GPT-5.4 少了四到六成。這在實際部署時意味著：同樣的算力預算，MiMo 能支撐更長的任務、更大的 context window、更複雜的 multi-step 推理。

技術架構上，MiMo 用了一種 local + global attention 混合機制，把長文本的記憶體需求壓到原本的約 1/7；並行 token 預測機制讓輸出速度提升三倍。Pre-training 用了 27 兆 tokens，Context Window 分階段擴展到 100 萬 tokens。

配套還有另外三個模型：MiMo-V2.5（非 Pro 版，310B 總參數，開放权重）、MiMo-V2.5-TTS（一個語音合成家族，支援從文字描述生成聲音或克隆聲音，可透過 API 调用，目前限時免費）、MiMo-V2.5-ASR（開源的語音識別模型，中英文都支援，還能處理吳語、粵語、閩南語，方言差距最高領先 Gemini 3.1 Pro 超過 16 個百分點）。

對開發者來說，這次發布最值得注意的訊號是：**中國开源模型的全方位落地能力正在快速追平西方頂級模型，而且是以更低的資源消耗做到。** 如果你正在評估 coding agent 的底層模型，MiMo-V2.5-Pro 值得放進你的 benchmark 比較清單。

---

## 主題二：哈佛研究 — AI 在急診 triage 診斷勝過兩位内科主治醫師

這個研究禮拜二發表在 *Science*，團隊來自哈佛醫學院與 Beth Israel Deaconess Medical Center。研究找了 76 個實際進過急診的病人個案，把 OpenAI o1 與 4o 模型的診斷結果，與兩位内科內科主治醫師的診斷做雙盲比對——由另外兩位醫師評估，但不知道哪個結果來自人類或 AI。

結果：在每一個診斷接觸點，o1 的表現都等於或略優於兩位醫師。差異最顯著的是第一線 triage 階段——那正是資訊最少、 urgency 最高的時刻。o1 在 triage 個案中，有 67% 给出「完全正確或非常接近」的診斷，而兩位醫師分別是 55% 與 50%。

這個數字媒體效果很強，但研究者自己出來踩剎車：研究作者 Arjun Manrai 強調數據「沒有經過任何前處理」，AI 拿到的就是電子病歷裡當下可取得的相同資訊，這點很關鍵——代表它不是那種「精心挑選過的理想情境」。然而共同作者 Adam Rodman 也在 Guardian 的訪問中說，目前「沒有任何正式的问責框架」適用於 AI 輔助診斷，病人仍希望人類來主導生死關頭的決定。

急診醫師 Kristen Panthagani 的回應更值得讀者注意：這個研究比較的基準是「内科」醫師，不是急診科醫師。她打了個比方：「我不會對 LLM 在神經外科 board 考試打敗皮膚科醫師感到驚訝，但這不是一個有用的資訊。」對急診醫師而言，第一線目標不是猜出最終診斷，而是確認病人有沒有立即危及生命的狀況。

對工程師而言，這個研究的啟示在於：**模型的能力邊界正在進入高風險決策領域，但 deployment 的制度基礎設施遠遠落後。** 這不是「AI 什麼時候會取代醫生」的問題，而是「在問責框架還沒有的時候，我們怎麼評估這類工具的可部署性」。如果你在醫療 AI 這個領域，這個研究是繞不過的討論起點。

---

## 主題三：Mistral Vibe 開放遠程 Agent，Medium 3.5 登場 — 程式碼助理進入脫機時代

Mistral 這次同時發布了兩件事，且兩件事是綁在一起的。

第一，Vibe 的遠程 Agent 模式正式上線。之前 Vibe 只能綁在你的本地 terminal 跑，現在可以把手邊的任務放到雲端，Sessions 在隔離沙盒中運行，你可以離開辦公室，任務完成後它會自動開一個 GitHub PR 通知你。更實用的是：在地的 CLI session 可以隨時「傳送」（teleport）到雲端，session 歷史與任務狀態不會因此斷掉。這對需要跑幾小時甚至過夜的長任務是實質性的解放。

第二，Mistral Medium 3.5 正式公開。這是一個 128B dense 模型（不是 MoE），作為 Vibe 與 Le Chat 的預設模型。256k context window、視覺編碼器從頭訓練（大多數 VLMs 复用 CLIP，這代表 Mistral 想處理的輸入是彈性的，不假設固定解析度）、77.6% SWE-Bench Verified 分數，打敗了 Devstral 2 與 Qwen3.5 397B A17B。

值得關注的設計選擇：reasoning effort 可以逐 API 請求配置。這代表同一個模型可以回答一個簡單的即時問題，也可以承擔一個需要多步推理的 Agent 任務，開發者無需切換模型。這對想要在產品層次整合 Mistral 的團隊是直接的成本最佳化。

Le Chat 新增的 Work mode 是更廣義的 Agent 模式——不再是只在程式碼情境，而是橫跨 email、calendar、文件、Jira、Slack，任務可以同時多用多個工具，而且所有工具呼叫與推理步驟都對使用者可見，敏感操作需要明確授權。這與 Anthropic 的 Claude Code、MCP 生態系正在走的路線方向一致，只是 Mistral 把 CLI 體驗直接做進了 consumer 產品。

---

## 其他值得關注

- **Eli Lilly + Profluent（22.5 億美元）**：Lilly 與 AI 生技公司 Profluent 簽署最高可達 22.5 億美元的藥物開發合作，聚焦於「kilobase-scale DNA editing」——這是遺傳醫學領域長期以來被稱為「聖杯」的目標。Profluent 用 AI 模型設計定點重組酶（site-specific recombinases），Lilly 取得獨家授權並推進臨床。Profluent 去年十一月才剛集資 1.06 億美元，投資方包括貝佐斯 Expeditions。這代表製藥巨頭已經開始把「AI 模型設計生物分子」當成實質 R&D 管道，而不是實驗性探索。

- **微軟 VS Code 悄悄在 Git commits 裡加入「Co-Authored-by Copilot」**：開發者發現即使把 Copilot 關掉，VS Code 仍會在 commit 訊息裡偷偷加入 AI共同作者的簽名。這是一個 developer trust 問題，在所有「AI 輔助開發」的工具逐漸成為預設值的時候，這種靜默行為會侵蝕 open source 社群的信任基礎。

- **MIT 研究：為什麼語言模型 Scaling 效果如此穩定**：MIT 研究者提出了一種 механизм 解释，認為模型 performance 的規律性與「superposition」現象有關。語言模型之所以 scale 得這麼可靠，不是因為更大的模型「更聰明」，而是因為更大的空間讓更多的概念能在同一個網路中被乾淨地表徵而不互相干擾。這個解释與過去主流的「湧現」說法不同，提供了更結構性的理解。

---

## 參考連結

- [MiMo-V2.5-Pro 官方頁面](https://mimo.xiaomi.com/mimo-v2-5-pro/)
- [MiMo-V2.5 Hugging Face](https://huggingface.co/XiaomiMiMo/MiMo-V2.5)
- [哈佛研究（Science 發表）](https://www.science.org/doi/10.1126/science.adz4433)
- [哈佛新聞稿](https://hms.harvard.edu/news/study-suggests-ai-good-enough-diagnosing-complex-medical-cases-warrant-clinical-testing)
- [Mistral Vibe 遠程 Agent + Medium 3.5 公告](https://mistral.ai/news/vibe-remote-agents-mistral-medium-3-5)
- [Mistral Medium 3.5 on Hugging Face](https://huggingface.co/collections/mistralai/mistral-medium-35)
- [Lilly + Profluent 合作公佈（Business Wire）](https://www.businesswire.com/news/home/20260428698315/en/Profluent-Announces-Strategic-Partnership-with-Lilly-to-Develop-AI-Designed-Recombinases-for-Genetic-Medicine)