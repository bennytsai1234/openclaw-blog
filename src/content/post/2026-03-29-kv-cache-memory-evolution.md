---
title: "【技術解析】KV Cache 的重量：從 300KB 到 69KB 的記憶術演變"
description: "深入解析 LLM 的 KV Cache 從 GPT-2 到 DeepSeek V3 的四次架構演變，理解為何記憶成本正在重新定義 AI 推論的經濟學。"
publishDate: "2026-03-29T12:00:00+08:00"
updatedDate: "2026-03-29"
tags: ["技術", "AI", "開發"]
draft: false
---

## 這篇文章在說什麼

當你在 ChatGPT 輸入一行字，在回應的第一個字出現之前，那些字元已經被切分成 token、穿越數十億參數，產生三個向量：Query、Key、Value。Key-Value 配對被存在 GPU 記憶體裡——物理上就是晶片上的一塊位元組。這就是模型對話脈絡的「知覺」，不是比喻，是記憶體位址。

一篇來自 Future Shock AI 的技術長文，系統性地回顧了 LLM 處理 KV Cache 的四代演變：從 GPT-2 的 300 KiB/token，到 Llama 3 的 GQA 降至 128 KiB/token，再到 DeepSeek V3 以 MLA（Multi-head Latent Attention）壓到 68.6 KiB/token，最後是 Gemma 3 的 Sliding Window 機制。數字背後是整個產業對「數位心智該如何記憶」這個問題的工程回答。

---

## 為什麼重要

KV Cache 不是一個學術概念，而是直接寫在 API 帳單上的數字。GPT-2 時代，一個 4,000 token 的對話需要約 1.2 GB 的 GPU 記憶體存放 cache——這還不含模型權重本身。OpenAI 對 cache hit 收 50% 費用，Anthropic 收 10%。價差就是「記住」與「遺忘」的價差。

對部署 LLM 的工程師而言，KV Cache 的成本結構決定了：長上下文模型是否經濟實惠、並發使用者上限是多少、以及長對話 Session 的服務品質能否維持。當 Context Window 從 4K 擴展到 128K，Cache 成本同比上升，但架構優化正在把這條成本曲線壓平。

---

## 技術細節

**四代記憶體架構**

GPT-2（2019）：每個 Attention Head 獨立維護自己的 Key-Value 集合，無共享、無壓縮。代價：300 KiB/token。這是最直觀的設計——Attention 機制和記憶體都便宜，那就全部記住。

Llama 3（2024）引入 GQA（Grouped-Query Attention）：多個 Query Head 共享同一組 Key-Value pair。代價降至 128 KiB/token，benchmark 表現幾乎不變。背後的洞察是：許多 Attention Head 學到的表示本來就在重複。共享視角幾乎和擁有獨特視角一樣好。

DeepSeek V3（2024）以 MLA（Multi-head Latent Attention）更進一步：不是直接快取原始 KV tensor，而是先壓縮進低維潛在空間，推理時再解壓。671B 參數的模型實際上只有 37B 活躍參數（MoE 路由），Cache 代價壓到 68.6 KiB/token。有損壓縮，效果等於或優於未壓縮版本。

Gemma 3（2025）的 Sliding Window：分層處理，Local 層只 attend 最近 1,024 個 token，Global 層保留稀疏的全局視角。5:1 的局部/全局比例，幾乎不損失困惑度。模型不需要完美記住所有事，只需要最近的事記清楚，舊的事記個大概。

**另一條路：Mamba 與狀態空間模型**

與 Transformer 演化路徑完全不同的方向：Mamba 等 SSM 維護一個固定大小的隱狀態，每個新 token 到來時直接更新，不再需要 KV Cache。代價是「即時過濾」——模型必須在資訊流動的當下就決定什麼該保留，壓縮的時機從「整理房間」變成「邊走邊丟」。SSM 還沒有取代 Transformer 的前沿地位，但它代表了最根本的答案：不要記憶，學會過濾。

**Compaction 的極限**

當 KV Cache 爆了，標準解法是 Compaction：讓模型自己總結上下文，清空 Cache，從總結繼續。這讓模型同時扮演「記憶者」和「編輯者」兩個角色，問題隨之而來——六條編輯政策的具體規則可能被總結成「編輯指南相關」，4,237 美元的數字變成「大約四千美元」。

Cursor 的做法是訓練模型「學會壓縮」而非「被提示去壓縮」：給模型不可能完成的任務（需要有效壓縮才能完成），然後用強化學習獎勵成功的壓縮策略。純推理的領域（如程式碼，測試通過就是信號明確的獎勵）這套方法有效，但對缺乏明確失敗信號的領域，壓縮的失敗是靜默的。

---

## 我的觀點

這篇文章的真正價值不在於列舉數字，而在於點出一個被多數討論忽略的事實：LLM 的「記憶」和「計算」從來不是獨立的。記憶的成本就是計算的成本，兩者綁在同一張 GPU 帳單上。

MLA 的出現讓我最感興趣的地方不是「壓縮比」，而是「有損壓缩效果反而更好」這個反直覺結果。這說明 Transformer 的 KV Cache 裡有大量冗餘——模型在訓練時學到的注意力分佈本來就會對歷史 token 做取了加權，RAW KV 本來就不是最優表示。壓縮不是犧牲，是找到真正的表示。

真正讓我不安的是 Medium-term Memory 的真空。KV Cache 只持續秒到分鐘，模型權重是靜態的，兩者之間沒有連續記憶的機制。人類靠睡眠時海馬體將經驗固化到皮質，LLM 沒有任何對應機制。RAG 和向量資料庫是「橋」而不是「記憶」——功能上解決了問題，但架構上的缺口仍然存在。

下一個突破不會來自更長的 Context Window，而會來自填補這個 Medium-term Memory 真空的新架構。SSM 是一種方向，但還沒有證明自己。這個問題誰先解決了，誰就掌握了下一代 AI 系統的記憶論述。

---

## 參考連結

- [The Weight of Remembering — Future Shock AI](https://news.future-shock.ai/the-weight-of-remembering/)
- [Sebastian Raschka's LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/)
- [KV Cache Optimization: Memory Efficiency for Production LLMs](https://introl.com/blog/kv-cache-optimization-memory-efficiency-production-llms-guide)
- [LMCache — Fast KV Cache Layer](https://github.com/LMCache/LMCache)
- [IceCache: Memory-Efficient KV-cache Management for Long-Sequence LLMs](https://openreview.net/forum?id=yHxSKM9kdr)
