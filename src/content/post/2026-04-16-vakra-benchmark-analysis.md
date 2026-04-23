---
title: "VAKRA 真正殘酷的，是它不只測會不會叫 API"
description: "IBM Research 用 8,000 多個 API 和多步企業場景，拆開 agent 在工具選擇、參數填寫與答案合成上的真實斷點。"
publishDate: "2026-04-16T15:00:00+08:00"
updatedDate: "2026-04-23T10:30:00+08:00"
tags: ["IBM Research", "LLM Agent", "VAKRA", "Benchmark", "Tool Use"]
draft: false
---

現在每個 agent demo 看起來都很能幹。

它會找工具、會查文件、會回你一段像模像樣的結論，偶爾還會自己說「我來一步一步處理」。如果你只看單回合展示，很容易真的相信，工具使用這件事大概快成熟了。

VAKRA 讓人清醒的地方，是它不陪你看 demo。它直接把 agent 丟進一個比較像企業現場的環境，讓它去面對多個 API、不同領域資料庫、文件檢索、政策限制，還有最討厭的多步鏈條。結果很直白，現在的模型不是完全不會用工具，而是只要事情一長、一雜、一受限，就開始掉鏈子。

## 為什麼這個 benchmark 看起來特別重

因為它不是在考單點技能。

IBM Research 把超過 8,000 個本地托管 API、62 個領域的資料庫、最長 7 步的推理任務，塞進同一套評測裡。這不是一般「選對工具就算過」的練習，而是比較接近真實企業系統會遇到的麻煩。你可能得先查甲系統，再用結果去問乙系統，接著翻一份文件，最後還得遵守公司政策，知道哪類題目根本不能叫某些工具。

這種題目最大的殘酷，不在於每一步都很難，而在於每一步都不能錯。前面參數填歪一點，後面就全歪。工具明明選對了，最後合成答案時理解錯，也一樣前功盡棄。

## VAKRA 真正有價值的是錯誤拆解

很多 benchmark 喜歡最後報一個整體分數，然後大家再拿來排行。VAKRA 做得更像除錯。

它把失敗樣本按順序拆成四類。先看工具有沒有選對，再看參數有沒有漏填或幻想，再看參數值對不對，最後才看答案合成是不是出錯。每個樣本只記第一個失敗點，這樣你就不會把同一個錯重複算很多次。

這種設計非常工程師。因為你真正想知道的不是「模型只有 47 分」，而是「它到底死在哪一關」。如果錯主要集中在 tool selection，你就去做 shortlist 或 schema 壓縮。如果錯主要卡在 synthesis，那你就知道光把工具鏈拉通還不夠，後面的推理整理也要重做。

## 研究結果最刺眼的地方在哪

在於大家原本以為最明顯的問題，不一定是最痛的問題。

直覺上，多數人會猜 agent 最大的弱點是選錯工具。VAKRA 確實證明工具選擇很難，尤其當每個領域有幾十到幾百個工具時，OpenAI API 規格甚至還有 128 個工具上限，逼得你在系統外自己做 shortlisting。但更值得注意的是，即使模型選對了工具、參數也大致填對，最後的答案合成仍然很常出錯。

這代表很多 agent 看起來會操作，其實不一定會收尾。它把資料搬回來了，卻沒辦法穩定把資料變成正確回答。

另外一個很真實的發現，是 policy 約束一上來，幾乎所有模型的表現都會掉。這點對企業很關鍵。因為真實系統裡，限制從來不是附屬條件，而是主體本身。哪些資料能查，哪些工具不能碰，哪些情況必須走文件檢索而不是直接呼叫 API，這些規則一旦只靠 prompt 口頭交代，模型常常會在壓力下忘掉。

## 那些排行榜背後，該怎麼讀

論文裡 GPT-OSS-120B 在 API chaining 很強，Gemini-3-flash-preview 在 tool selection 很亮眼，這些都值得記。但如果只把重點放在誰第一，反而會錯過 VAKRA 最有用的部分。

這個 benchmark 真正告訴我們的是，agent 的能力不是一個整體名詞。它至少拆成規劃、選擇、參數化、檢索整合、答案合成、政策服從幾個段落。你某一段很強，不代表端到端就可靠。特別是 hop 數一上去，所有模型都掉分，這說明現在多數 agent 還是很依賴題目短、鏈條淺、環境乾淨。

## 對要做產品的人，最該帶走什麼

第一，別再把 tool use 當成「模型會不會 function calling」這麼簡單。第二，response synthesis 值得單獨當成系統模組來設計，不要以為前面都做對了，最後自然會對。第三，policy enforcement 不能只放在 prompt 裡祈禱，它更像需要顯式約束、外部檢查，甚至路由層硬限制的事情。

我讀完 VAKRA 的感覺很像看一份誠實的事故報告。它沒有把 agent 說得一無是處，但也不幫大家維持那種「已經差不多能上 production」的幻覺。現在的 agent 確實會做事了，只是離穩定、可依賴、能承受企業規則的程度，還有一段路。

而這段路，最難補的通常不是模型不夠會叫工具，而是整條鏈子裡，還有太多地方會在你以為沒問題的時候悄悄斷掉。

## 參考連結

- [Inside VAKRA: Reasoning, Tool Use, and Failure Modes of Agents（Hugging Face Blog）](https://huggingface.co/blog/ibm-research/vakra-benchmark-analysis)
- [VAKRA Dataset（Hugging Face）](https://huggingface.co/datasets/ibm-research/VAKRA)
- [VAKRA GitHub](https://github.com/IBM/vakra)
- [VAKRA Leaderboard](https://ibm-research-vakra.hf.space/)
- [Introducing VAKRA（IBM 官方公告）](https://www.ibm.com/new/announcements/introducing-vakra-benchmark)
