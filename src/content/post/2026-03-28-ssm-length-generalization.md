---
title: "【技術解析】SSM 的致命弱點被 Apple 找到了：一個理論證明與解法"
description: "State Space Models 的固定記憶體機制在「真正長文本生成」上有根本限制，Apple ML Research 用外部工具彌補了這個缺口，讓 SSM 在推理、數學、編碼任務上實現任意長度泛化。"
publishDate: "2026-03-28T12:00:00+08:00"
updatedDate: "2026-03-28T10:00:00+08:00"
tags: ["技術", "AI", "ML"]
draft: false
---

## 這篇文章在說什麼

State Space Models（SSMs），以 Mamba 為代表，被譽為 Transformer 的高效接班人——計算量隨序列長度線性成長，不像 Transformer 那樣是二次方成長。這篇 Apple ML Research 的論文從一個極為基礎的理論問題出發：既然 SSM 的 hidden state 大小是固定的（fixed-size），那麼當一個任務需要輸出的資訊量超過 hidden state 的承載量時，會發生什麼事？

論文的答案是：**會失敗**。研究團隊證明，SSM 無法準確解決任何「真正的長文本生成問題」（truly long-form generation problem）——這是一個他們給出嚴格數學定義的概念。簡單說：當你需要輸出的東西（無論是完整的程式碼、一長串推理步驟，還是複雜計算的中間結果）不能被壓縮進固定大小的記憶體時，SSM 就會崩潰。

這個結論直接打在 SSM 最大的賣點上：號稱適合長文本，卻連長文本都做不好。怎麼辦？研究團隊的解法是**給 SSM 接上外部工具**——實驗上就是一個可以讀寫的外部記憶�（essentially an external memory tape）。當 SSM 能互動式地存取外部工具時，理論上就能解決任何可計算的問題，並對任意長度實現泛化（length generalization）。在算術、推理、編碼等任務上的實驗結果也驗證了這條路徑的可行性。

---

## 為什麼重要

這篇論文的重要性有兩個層次。

**第一層：對 SSM 社群是當頭棒喝。** 過去幾年 SSM 的敘事一直是「Transformer 太貴，SSM 是平替，而且更適合長文本」。這篇論文用理論證明把這個敘事撕開了一個口子：SSM 的線性複雜度是以固定記憶體為代價換來的，而這個代價在某些任務上會讓你付出更大的隱性成本。如果你的應用場景需要 SSM 生成大量無法壓縮的輸出——比如完整的代码文件、詳細的數學證明——SSM 的表現在理論上就有一個天花板。知道極限在哪，比假裝它不存在更重要。

**第二層：工具增強（tool-augmented）是突破固定記憶限制的可行路徑。** 這與 AI Agent 的主流方向不謀而合。Anthropic 和 OpenAI 都在推 tool-use、function calling、memory extension，現在 Apple 從理論上為這條路徑提供了支撐：不是這些公司在追逐熱點，而是 fixed-state 的模型架構確實需要這個。這對工程師的啟發是：如果你在用 SSM 做長文本任務，你應該認真考慮加上外部記憶機制，否則你遲早會遇到那個 hidden state 容量不足的瓶頸。

---

## 技術細節

這篇論文的方法論值得多说几句，因為它不走「大力出奇蹟」的路線，而是用理論先驅動實驗設計。

**理論結果**：研究團隊形式化定義了「truly long-form generation problem」——指的是輸出內容的資訊量Ω(n)随输入规模 n 增长，而 hidden state 大小是固定 O(1)。在這個定義下，SSM 在這類任務上的錯誤率不會收斂到零。這不是 Emperical 的觀察，而是 complexity theory 的結果。

**工具增強框架**：給 SSM 一個 external memory tape，讓它可以讀寫中間狀態。SSM 不再需要在 hidden state 裡壓縮整個計算過程，而是把需要長期保存的資訊外部化。論文的訓練方式是 task-dependent 的——針對不同任務設計不同的 tool access 方式，並用對應數據訓練。

**實驗任務**包括：
- **算術任務**（加法、乘法、括號匹配）：需要精確追踪中間結果，是 fixed-state 的典型弱點
- **推理任務**（多步邏輯推導）：需要維護跨步驟的事實一致性
- **編碼任務**（生成符合規範的代碼）：輸出資訊密度極高

實驗顯示，tool-augmented SSM 在這些任務上都實現了明顯的長度泛化，而原始 SSM 在超出訓練長度後效能驟降。

---

## 我的觀點

這篇論文最讓我欣賞的地方，是它拒絕了「benchmark 碾壓」作為唯一證明價值的手段。AI 論文現在有個很糟糕的趨勢：拼命刷現有排行榜，卻不說清楚為什麼這個方法在概念上成立。Apple 這篇從理論壞消息出發，再找工程解法，反而讓人更信任它的結論。

但我也有質疑：**工具增強 SSM 的訓練成本是否真的比 Transformer 低？** 論文的優勢論述是「SSM + tools vs Transformer」，但工具介面本身也是 engineering complexity。如果最後系統複雜度接近 Agent 系統，那省下來的計算量是否還值得，是個需要實際數字回答的問題。

另外，論文選擇 ICLR 2026 投稿，這說明社群對這條路徑有興趣，但尚未有共識。如果被收了，會是 SSM 陣營重新定義遊戲規則的時刻；如果被拒，這個理論框架的影響力會延後。

對工程師而言，這篇論文傳遞的實用訊息很清楚：**如果你在評估 SSM 陣營的工具或框架，要注意它的外部記憶機制是否完善**——沒有這個的 SSM，長期來看會是殘缺的。

---

## 參考連結

- [To Infinity and Beyond: Tool-Use Unlocks Length Generalization in State Space Models — Apple ML Research](https://machinelearning.apple.com/research/to-infinity)
- [arXiv:2510.14826 — Apple SSM Paper](https://arxiv.org/abs/2510.14826)
- [ICLR 2026 Review Discussion](https://openreview.net/forum?id=sSfep4udCb)
