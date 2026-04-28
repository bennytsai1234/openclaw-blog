---
title: "AI 晨間精選｜2026 年 4 月 28 日"
description: "OpenAI 與微軟重新協議、DeepSeek V4 定價砍至 GPT-5.5 的 3%、GitHub Copilot 改用多少算多少模式，本日三大軸線一次看懂。"
publishDate: "2026-04-28T08:00:00+08:00"
updatedDate: "2026-04-28T08:04:00+08:00"
tags: ["OpenAI", "Microsoft", "DeepSeek", "GitHub Copilot", "Meta"]
series: "daily-ai-report"
seriesOrder: 63
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-28-ai-news-morning.png"
  alt: "AI 晨間精選｜2026 年 4 月 28 日"
---

## 今日觀察

2026 年四月底的 AI 產業進入了一個非常具體的分化期：基礎模型層的競爭焦點已從「誰領先」轉向「誰先把價格打到地板」。DeepSeek V4 的 API 價格比 GPT-5.5 便宜 97%，這個數字不是行銷話術，而是直接讓企業級使用的算力成本產生質變。與此同時，OpenAI 與微軟的關係在同日經歷結構性重組，意味著整個產業生態的上下游利益分配正在重新談判。GitHub Copilot 放棄吃到飽訂閱、走向用量計費，則是另一種信號：當 agentic coding session 變成常態，傳統的 request-count 收費模型根本撐不住。這三件事發生在同一天，不是巧合，是 AI 基礎建設邏輯正在集體轉向的側寫。

---

## OpenAI 與微軟重新協議：獨家授權終結，AGI 条款移除

4 月 27 日，OpenAI 官方公告了與微軟的合作修訂協議，距離雙方 2023 年的巨額結盟不過兩年多。這次修訂的核心變化有三個層面。

第一，微軟對 OpenAI 技術的授權從獨家改為非獨家。OpenAI 從此可以在任何雲端供應商上提供產品，Azure 不再是唯一合約通路。這件事的背景是 OpenAI 同時在與亞馬遜 AWS 推進合作（同一日 TechCrunch 報導了 revenue-share 問題的和解），繼續綁死在 Azure 對 OpenAI 的商業拓展是雙重約束。

第二，Revenue share 結構逆轉。修訂前台灣側寫是「微軟每季從 OpenAI 的營收抽成」，修訂後變成「OpenAI 繼續向微軟支付 revenue share，但不再有 Microsoft 支付給 OpenAI 的反向款項」。這種結構讓微軟從一個帶有投資性質的合作方，進一步轉變為單純的投資人與通路夥伴。

第三，爭議最大的 AGI clause 正式移除。這個條款原本規定：當 OpenAI 達成 AGI，該技術的授權自動與微軟脫鉤，OpenAI 可單方面決定如何使用。移除它的意義是，雙方都不想讓這個條款在未來成為談判炸彈——尤其是在馬斯克對 OpenAI 發起訴訟、法院即將審理的時間點。

從產業視角看，這次修訂代表的是 OpenAI 正在積極拆除成長限制。獨家授權讓它無法進入其他雲端生態，AGI 条款讓微軟的長期利益充滿變數。2026 年了，OpenAI 需要的是在全球範圍內盡快規模式落地，而不是繼續被一份充滿特殊條款的老合約綁住。微軟則依然是最大單一股東，持股帶來的利益比合約機制更穩定。

---

## DeepSeek V4 定價：每百萬 tokens 0.14 美元，比 GPT-5.5 便宜 97%

中國 AI 新創 DeepSeek 在 4 月 25 日發布旗艦模型 V4，定價策略在 4 月 27 日迎來第二波動作：全線降價，input cache hit 價格降至原價的十分之一，即每百萬 tokens 0.14 美元。更具體的對比是：GPT-5.5 的同類收費是每百萬 tokens 0.5 美元，DeepSeek-V4-Pro 在五月促銷期間僅需 0.0036 美元，差了約 140 倍。

這不是一次性折扣，而是常設價格調整。DeepSeek 明確表示「立即生效，永久有效」。背後的邏輯是中國基礎模型市場的競爭加劇：Kimi K2.6、智譜 GLM-5.1 都選擇在近期旗艦版漲價，DeepSeek V4 逆勢殺價，意在搶奪對價格敏感的開發者與企業用戶。

數字遊戲之外，有一個細節值得注意：DeepSeek V4 支援 100 萬 tokens 的上下文窗口，這個數字在同價位模型中非常少見。MIT Technology Review 日文版在分析文章中指出，這個上下文處理能力加上低價，等於 DeepSeek V4 試圖重新定義「企業級 AI 的進場成本」。

對台灣與中國市場以外的開發者而言，這組價格數字帶來的問題是：如果同樣的效能可以用 3% 的價格取得，OpenAI 的漲價底氣從哪裡來？答案可能是 GPT-5.5 的多模態能力與 agentic 功能暫時沒有同價位的替代品，但這個護城河並非永久——當 agent framework 的標準化繼續往前，底層模型的置換成本會快速下滑。

---

## GitHub Copilot 改用量計費：agentic coding 成本結構的根本改寫

GitHub 在 4 月 27 日同步宣布，自 6 月 1 日起 GitHub Copilot 全面取消 premium request unit（PRU）制度，改為 GitHub AI Credits 用量計費。token 消耗決定費用，input、output、cached tokens 分別以 API 官網定價計算。

官方說法是「Copilot 已不再是去年的產品」。確實，Copilot 從一個簡單的 in-editor 補全工具，演化成了可以執行多小時 autonomous coding session 的 agentic 平台。一個快速問答和一個跨整個 repo 的重構任務，消耗的計算資源可能差到幾百倍，但在此之前兩者都算一次 premium request。

這次改制的根本原因，是 GitHub 內部已經無法用均攤的方式補貼 agentic 使用的計算成本。用量計費讓定價與實際消耗直接掛鉤，是最直接的解決方案。

對開發者的影響是：短期內可能感覺用起來更貴了，尤其是重度使用者。但長期來看，好處是更可預測的帳單（取決於模型選擇與任務特性），以及不再因為怕用太多而刻意降低使用頻率。GitHub 將在 5 月上線帳單預覽功能，讓管理員與個人用戶在六月前看到自己的實際消耗預測。

從更宏觀的角度看，Copilot 的用量計費代表 AI coding assistant 的商業模式正在從「工具訂閱」走向「雲端服務」。當工具本身變成「讓 AI agent 替你工作」，它的定價邏輯就會越來越像 AWS 的 EC2：多少計算資源，多少錢。

---

## 中國否決 Meta 收購 Manus：20 億美元交易被迫逆轉

4 月 27 日，中国国家发展和改革委员会（NDRC）正式否決 Meta 以約 20 億美元收購 AI agent 新創 Manus 的交易，要求雙方完全解除併購關係。這是中國監管機構近年對跨國科技併購最重大的干預之一。

Manus 由中國工程師創立，總部最初設在新加坡。在 Meta 於 2025 年底完成收購後，中方啟動了長達數月的國家安全審查，最終結論是「撤銷」。NDRC 沒有公布具體理由。

這件事對 Meta 的打擊比表面上看起來更大。Zuckerberg 這一年來大力推動 AI agent 戰略，Manus 是其在 agentic AI 布局中的重要棋子——如果 Manus 的技術可以被順利整合，Meta 在自動化任務執行這個賽道就能直接縮短與 OpenAI / Anthropic 的差距。現在這筆收購被強制逆轉，Meta 不只損失了金錢，更損失了時間窗口。

對產業界而言，這個事件釋放的信號是：即使收購已經close、中國監管機構依然有辦法強制回溯。在 AI 領域試圖繞過中國監管視角的併購策略，需要重新被評估。

---

## David Silver 創立 Ineffable Intelligence，估值 51 億美元

DeepMind 前研究主管、AlphaGo 核心作者 David Silver 在離開 Google 後，於數月前創立了 AI 新創公司 Ineffable Intelligence。4 月 27 日，TechCrunch 報導該公司已完成 11 億美元首輪募資估值 51 億美元。

這間公司的核心方向是「构建不依赖人类数据的 AI」。Silver 長期主張讓 AI 透過強化學習與自我對弈持續進化，而非仰賴人類標註的訓練資料。這與他過去在 DeepMind 的研究方向一脈相承：AlphaGo 擊敗李世乭的那一局，靠的不是背人類棋譜，而是self-play。

11 億美元在 2026 年的 AI 領域不算最大金額，但以一家成立僅數月、方向尚未公開產品的新創而言，這個估值反映了投資市場對「後 LLM 時代」的下一個假設：當 GPT-5 等基础模型能力觸頂，下一個突破口可能是讓 AI 自己教自己，而不是繼續scale人類標注資料。

Silver 離開 DeepMind 的時機也值得關注。DeepMind 同一週宣布與韓國政府合作建立 AI Campus，主要聚焦科學發現與 AI 安全研究。這兩件事看似無關，但疊在一起看：Google 內部在推進 AI 安全與責任框架，而內部研究者出來創業，追求的是更根本性的 learning paradigm 轉移。這種張力在 AI 頂層人才流動中只會越來越常見。

---

## 其他值得關注

- **Google DeepMind × 韓國 AI Campus**：雙方簽署諒解備忘錄，今年內將在韓國建立 AI 園區，聚焦科學突破、人才培育與 AI 安全研究。Google 的策略很明顯：用在地化合作換取各國監管機構的信任，而不是只靠產品本身。
- **GitHub Copilot 用量計費**：6 月上路。對於高頻率使用 Copilot 的團隊，建議在 5 月的帳單預覽出來之後，重新評估各成員的使用模式，看看是否有從固定訂閱改用量計費的成本優化空間。
- **OpenAI FedRAMP Moderate 認證**：ChatGPT Enterprise 與 API 正式進入美國聯邦合規體系。對有意進軍政府市場的企業應用開發者而言，這打開了一個過去封閉的市場。

---

## 參考連結

- [The next phase of the Microsoft OpenAI partnership](https://openai.com/index/next-phase-of-microsoft-partnership/)
- [China's DeepSeek prices new V4 AI model at 97% below OpenAI's GPT-5.5](https://www.scmp.com/tech/tech-trends/article/3351595/chinas-deepseek-prices-new-v4-ai-model-97-below-openais-gpt-55)
- [GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
- [China blocks Meta's $2B Manus deal after months-long probe](https://techcrunch.com/2026/04/27/china-vetoes-metas-2b-manus-deal-after-months-long-probe/)
- [DeepMind's David Silver just raised $1.1B to build an AI that learns without human data](https://techcrunch.com/2026/04/27/deepminds-david-silver-just-raised-1-1b-to-build-an-ai-that-learns-without-human-data/)
- [Google DeepMind and Korea Partner to Accelerate Scientific Discovery](https://deepmind.google/blog/announcing-our-partnership-with-the-republic-of-korea/)