---
title: "【技術解析】為什麼你的 AI Agent 老是「失憶」？Context Engineering 一次性說清楚"
description: "多數 LLM demo 看似神奇，但一進生產環境就開始胡言亂語——問題不在模型不夠強，而在於「上下文」沒有被系統性設計過。"
publishDate: "2026-04-11"
updatedDate: "2026-04-11"
tags: ["技術", "AI", "Agent", "Context Engineering"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-11-context-engineering-ai-agent-memory.png"
  alt: "為什麼你的 AI Agent 老是失憶？Context Engineering 一次性說清楚"
---

## 這篇文章在說什麼

大多數 AI demo 開始時都讓人驚艷——可以起草郵件、重寫程式碼、預訂機票，但只要任務稍微複雜一點，模型就會突然「失憶」：它不記得十條訊息前說了什麼，沒有辦法存取你的私人資料，乾脆開始胡亂猜測。

這篇文章的核心命題是：**所謂的「失憶」，根本不是模型的問題，而是上下文架構設計的問題。** 作者認為，要打造可靠的 production AI Agent，關鍵不在於換一個更強的模型，而是如何系統性地選擇、組織、和傳遞資訊給模型——這就是所謂的 **Context Engineering**。

文章把 Context Engineering 拆解成六大支柱：**Agents**（代理）、**Query Augmentation**（查詢增強）、**Retrieval**（檢索）、**Prompting**（提示詞）、**Memory**（記憶）、**Tools**（工具）。每一個支柱都是为了让 LLM 在有限的 context window 內，只看到高價值的 token。

---

## 為什麼重要

Context Window 是 LLM 的「工作記憶區」，所有輸入、輸出的 token 都會佔用這個空間。一旦空間滿了，舊的資訊就會被清除。這不是模型缺陷，而是物理限制。

多數開發者在原型階段會把對話歷史全部塞進 context window，湊合著能跑。但上了生產環境之後，問題就浮現了：檢索出來的上下文摻雜雜訊、過多的歷史干擾模型判斷、工具清單太長導致選錯工具、錯誤的資訊在對話鏈裡滾雪球越滾越大。

這篇文章點出四個常見的失敗模式：

- **Context Poisoning**：錯誤或幻覺資訊進入 context，之後一路傳播下去
- **Context Distraction**：過去資訊過多，模型開始重複過去行為而不是 fresh reasoning
- **Context Confusion**：不相關的工具或文件占用 context，導致用錯工具
- **Context Clash**：context 內有互相矛盾的資訊，讓模型卡在錯誤假設之間

這些問題不是靠更好的提示詞或更大的 context window 能解決的——必須從系統架構層面處理。對於正在建構 AI Agent 的工程師來說，這是一個觀念上的重構：**你不是選錯模型，你是選錯了上下文的設計方式。**

---

## 技術細節

### 六大支柱

**1. Agents**
Agent 是整個系統的中心樞紐，既是 context 的使用者，也是架構者。它動態決定知識庫範圍、工具使用方式、以及整個系統內的資訊流向。單一 Agent 系統中，一個 Agent 處理完整 pipeline；多 Agent 系統中，多個 Agent 各自負責專門角色，最後拼起來完成大目標。

**2. Query Augmentation**
使用者輸入通常混亂、不完整，但系統內不同元件需要的 query 格式並不相同——向量資料庫要的格式，跟給 LLM 看的格式完全不一樣。Query Augmentation 就是把使用者的原始輸入翻譯成適合不同下游任務的格式。例如 Weaviate Query Agent 就是一個把自然語言轉成資料庫查詢語法的實作。

**3. Retrieval**
RAG（檢索增強生成）的效果完全取決於檢索品質，而 chunking strategy 是最重要的一個決定：

- **小 chunk**：精確度高，embedding 集中，但缺乏周圍上下文，LLM 難以生成有意義的答案
- **大 chunk**：上下文豐富，但 embedding 容易平均化、噪音化，且占用太多 context 空間

找到 precision 和 context 的甜蜜點，是高效能 RAG 的關鍵。

**4. Prompting**
有了精確的檢索結果之後，還需要告訴模型「怎麼用」。Prompt 是控制層，定義任務目標：是從多個來源综合答案、还是從上下文中提取特定實體並以 JSON 格式輸出，還是僅根據提供的 context 回答以防止幻覺。沒有清楚的 prompt，即使有完美的 context，模型也會忽略它並產生幻覺答案。

**5. Memory**
Memory 分為三層：

- **Short-term memory**：就是 live context window，包含最近幾輪對話、工具輸出、檢索文件——空間極其有限，必須保持精簡
- **Long-term memory**：存在外部，通常是向量資料庫，儲存 episodic data（過往事件互動）、semantic data（領域知識）、procedural data（決策步驟）
- **Working memory**：處理多步驟任務時的臨時空間，任務完成後即可丟棄，不需要永久儲存

Memory 設計的關鍵原則是：**不是儲存越多越好，而是什麼值得出現在模型眼前**。過時的、低質量的、或有雜訊的記憶會在檢索時重新浮現，造成 context 污染，所以必須定期修剪、合併、刪除。

**6. Tools**
Tool use 把 Agent 從「只會想」變成「能執行動作」。Context Engineering 對工具的處理不只是丢一個 API 清單給 Agent，而是建立一個完整的工作流：Tool Discovery（讓 Agent 知道有哪些工具可用）、Tool Selection & Planning（決定用哪個工具）、Argument Formulation（正確格式化參數）、Reflection（根據工具輸出決定下一步）。這套循環稱為 **Thought-Action-Observation cycle**，是現代 Agent 推理框架的核心。

另外文章也提到趨勢：MCP（Model Context Protocol）正在試圖標準化工具生態系，減少每個 AI 應用程式需要針對每個工具客製化整合的負擔。

---

## 我的觀點

這篇文章的價值在於它把多數工程師隱約感受到、但沒有系統性整理的問題說清楚了。我在實際專案中看過太多那種「示範時很神奇，上線後變傻子」的 AI Agent，通常問題都出在 context 管理——開發者把所有希望都寄托在模型本身，而不是思考資訊傳遞的架構。

不過，我對文章的一個批評是：它偏重概念框架，具體實作細節相對少。例如 Memory 層的「什麼值得儲存」和「如何評估重要性」，文章只有原則性建議，沒有量化方法。這部分在 2026 年已經有 Mem0 這類專門的 agent memory 解決方案在試圖填補這個缺口，但整合方式仍不成熟。

另一個我認為值得注意的趨勢是：隨著 Claude Code、OpenAI Codex 這類 coding agent 的普及，context engineering 的概念正在從「聊天機器人」擴展到「軟體開發流程」。context window 的管理、工具的選擇與串接、記憶的持久化——這些問題在 coding agent 場景下更尖銳，因為替代模型錯誤造成的後果，比聊天機器人幻覺嚴重得多。

總的來說，如果你正在建構任何需要多步驟執行、跨 session 持久化、或依賴外部資料的 AI 應用，這篇文章是很好的系統性起點。先把框架放在對的位置，具體细节可以之後迭代。

---

## 參考連結

- [Context Engineering - LLM Memory and Retrieval for AI Agents](https://weaviate.io/blog/context-engineering)
- [State of AI Agent Memory 2026 - Mem0](https://mem0.ai/blog/state-of-ai-agent-memory-2026)
- [Weaviate Query Agent](https://docs.weaviate.io/agents/query)
