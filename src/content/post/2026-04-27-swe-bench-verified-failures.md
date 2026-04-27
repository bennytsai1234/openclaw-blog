---
title: "【技術解析】當 benchmark 分數不再可信：SWE-bench Verified 為何被 OpenAI 放棄"
description: "SWE-bench Verified 是 AI 編碼能力的黃金標準，但 OpenAI 在 2026 年 2 月斷然放棄了它。背後的原因，比多數人想像的更根本。"
publishDate: "2026-04-27T10:00:00+08:00"
updatedDate: "2026-04-27T10:00:00+08:00"
tags: ["SWE-bench", "AI 編碼", "Benchmark", "OpenAI", "軟體工程"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-27-swe-bench-verified-failures.png"
  alt: "當 benchmark 分數不再可信：SWE-bench Verified 為何被 OpenAI 放棄"
---

OpenAI 在 2026 年 2 月 23 日丟出一篇內部分析，標題直接：「為什麼我們不再用 SWE-bench Verified 測量前緣編碼能力」。這句話從曾經大力推广這個 benchmark 的公司口中說出來，算是相當不尋常的自我否定。

問題的起點倒不複雜。自 2024 年 8 月 SWE-bench Verified 推出以來，所有前緣模型發布都會順便報一個分數，從最早的墊底逐步爬升到八成。這個數字儼然成了某種通行證——GPT-5.2 解決了九成任務、Claude Opus 4.6 接近、DeepSeek V4 也不落後。但數字走到這裡，忽然沒人知道它到底在測什麼。

## 那些「失敗」並不是真正的失敗

SWE-bench Verified 的運作方式很直覺：從真實的 GitHub issue 抽出問題，讓模型只根據問題描述去修改代碼，然後用測試用例判斷對錯。模型看不到測試，要自己推敲「這個 bug 到底在哪裡」。

問題出在測試本身。OpenAI 的團隊對 138 個 OpenAI o3 一直無法穩定通過的任務做了逐案審查，每個案例至少六位資深工程師獨立判讀。結果發現當中 59.4% 的測試本身就有問題，導致正確的解法一樣會被拒絕。

這些壞掉的測試大致分兩類。第一類叫「太窄的測試」（narrow test cases），占了審查樣本的 35.5%：測試不只檢查 bug 修沒修好，還要求特定函式名稱或特定實作細節，但這些細節在問題描述裡壓根沒提過。以 pylint-dev/pylint#4551 為例，PR 引入了一個新函式 `get_annotation`，這個名字在 issue 裡完全沒出現，純粹是測試自己需要它。模型如果照常理解問題、修了實質 bug，一樣會因為 `ImportError` 失敗。

第二類叫「太寬的測試」（wide test cases），占 18.8%：測試檢查的功能壓根不在問題描述裡。以 sympy/sympy#18199 為例，這個任務來源的 PR 一次修了三個不相關的 bug，但 SWE-bench Verified 只取了其中一個 issue 的描述。模型把指定的那個修對了，測試卻還要去驗另外兩個不在範圍內的功能，於是失敗。工程師看到的是「模型沒通過」，但模型其實做對了。

這就引出了一個很根本的問題：如果 benchmark 裡有接近六成的「失敗」是測試本身的問題，那分數停在八成，究竟是模型厲害，還是運氣好剛好抽到測試沒那麼爛的題目？

## 模型不只是「記得答案」

測試設計問題已經夠麻煩了，但 OpenAI 發現的的第二個問題更棘手。

SWE-bench Verified 的題目全部來自開源 Python 專案的 GitHub issue。這些 code base 本身就公開在 GitHub 上，而前幾代模型的訓練語料很大一部分正是這些公開代碼。SWE-bench Verified 推出兩年後，所有前緣模型在訓練時都已經看過這些問題——只是它們自己不一定有自覺。

OpenAI 做了一個對抗性實驗：讓 GPT-5 去「套話」，試圖從其他模型（GPT-5.2 Chat、Claude Opus 4.5、Gemini 3 Flash Preview）口中挖出 SWE-bench Verified 題目的標準答案。實驗設計很嚴謹，15 輪對話，允許調整 system prompt、user prompt、assistant prefill 與各种套話策略，最後由裁判模型評估有多少新題目資訊被洩漏出來。

結果幾乎每個前緣模型都有高比例的「強烈污染」案例。以 GPT-5.2 為例，給它一個 SWE-bench Verified 任務的 ID 加上部分問題描述，它就能還原出完整的 gold patch——包括精確的類別名稱、方法名稱，以及那段「在 username 為 None 時提前返回」的具體邏輯，而這些從來沒有出現在提供給模型的問題描述裡。GPT-5.2 的 CoT（思鏈）甚至顯示，它知道 Django 在哪個版本引入了 `edit_only` 參數，理由是「看過 release notes」。它不是考試時現想的，它是真的見過。

這個 contamination 的意義在於：高分不代表模型真的會解決問題，而是代表它訓練時接觸過多少相關內容。兩個模型分數差五個百分點，也許只是其中一個模型在預訓練時多看了一些相關 repo，不代表兩者的實際能力有差距。

## 分數誤導了什麼

把這兩個問題擺在一起，邏輯就清楚了。SWE-bench Verified 剩下的可通過題目，剛好是那些（a）測試沒那麼嚴苛且（b）模型沒看過剛好一模一樣的問題的交集。在這個交集裡，分數測量的與其說是「軟體工程能力」，不如說是「誰的訓練資料庫碰巧覆蓋得比較廣」。

OpenAI 在分析裡提到一個數字：同樣的 top 模型，在 SWE-bench Verified 上拿到 70–80%，但到了 Scale AI 推出的 SWE-bench Pro——號稱無污染、任務更多樣、難度更高的版本——只有 23–58%。二十到三十個百分點的落差，不可能是模型突然變笨了。

這裡有一個教訓是給所有 AI 工程師的：當你看到一個 benchmark 分數，先別急著用它横量你的模型好不好。先去問，這個 benchmark 有多少比例的「失敗」是因為題目本身的問題，有多少模型實際上是在「考試前就已經看過答案」。

## 然後呢：SWE-bench Pro 與新的衡量方向

OpenAI 的聲明並不是說「我們放棄衡量 AI 編碼能力了」，而是說「這個工具已經不夠用了」。他們推薦的過渡方案是 SWE-bench Pro，這個由 Scale AI 維護的版本號稱「更難、更乾淨、更隔離」——任務更多（1,865 題），且刻意選了模型還沒看過的 code base。OpenAI 自己也在開發新的內部評估方式，試圖在更乾淨的環境裡測量真正的能力。

對於在日常工作中參考這些 benchmark 的工程師，這背後有一個更廣的提醒：任何一個數字，如果不知道它怎麼來的，都不值得拿來當作判斷依據。SWE-bench Verified 兩年來承載了太多重量——模型發布會的新聞稿、學術論文的對比基線、投資人的技術估值——但它測量的從來就不是一個乾淨的訊號。當一個工具被用爛了，繼續引用它的數字就是在引用一個已經失效的儀器。

更重要的問題或許不是「下一個 SWE-bench 在哪裡」，而是我們有沒有可能建立一個對 contamination 有免疫力的評估框架。一個思路是：與其讓模型在一個靜態的題庫上作答，不如讓它在一個持續有新問題流入的動態環境裡操作——就像真正的軟體工程，問題本身不會等你準備好了才出現。這條路目前還沒有成熟的 benchmark，但 SWE-bench Pro 起碼是一個比 Verified 更誠實的起點。

## 參考連結

- [Why SWE-bench Verified no longer measures frontier coding capabilities (OpenAI)](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)
- [SWE-Bench Pro: Raising the Bar for Agentic Coding (Scale AI)](https://scale.com/blog/swe-bench-pro)
- [SWE-Bench Explained: Benchmarks, Verified, Pro, and the 2026 Leaderboard](https://www.morphllm.com/swe-benchmark)
- [Is SWE-bench Verified Contaminated? (CodeSota)](https://www.codesota.com/news/swe-bench-contamination-debate)
