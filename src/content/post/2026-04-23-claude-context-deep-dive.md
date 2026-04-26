---
title: "【技術解析】當 AI 第一次「看懂」你的整個 Codebase：Zilliz Claude Context 怎麼做到的"
description: "一個 MCP 插件，如何用 semantic search 打破 AI Coding Agent 的Context 飢荒？Zilliz 的答案是：把你的整個程式碼庫塞進向量資料庫。"
publishDate: "2026-04-23T22:15:00+08:00"
tags: ["MCP", "Zilliz", "semantic search", "AI coding", "vector database"]
draft: false
---

大多數人第一次讓 Claude Code 幫忙修 Bug 的時候，心裡都會浮現同一個畫面：你把一段看起來相關的程式碼貼給它，然後等它給你一個答案。

問題在於，那段「相關」的程式碼，其實是你自己猜的。

你不知道那個 function 到底在哪裡，不知道它的 caller 是誰，不知道有沒有其他地方正在修改同一筆資料。你只能靠「感覺」把 code 丟進 context，然後期待奇蹟。

這就是 Claude Context 想要解決的問題。

## 程式碼搜尋的兩個世界

在 Claude Context 出現之前，程式碼搜尋有兩條路：

第一條是傳統的關鍵字搜尋（grep、ripgrep）。你知道要找什麼關鍵字的時候，它很準。但当你只知道問題、不知道關鍵字的時候——例如「找出所有跟用戶認證有關的程式碼」——它就啞了。

第二條是把整個專案都塞進 context。理論上這樣最完整，但實際上幾十萬行的程式碼， token 費用會立刻爆炸。OpenAI 的 API 收費不便宜，沒有團隊可以每次都讓模型「讀完整個 repo」然後回答。

Zilliz（Milvus 向量資料庫的公司）做了一個看似簡單，但其實很聰明的決定：既然我們可以把文字轉成向量、拿向量做語意搜尋，那為什麼不把整個程式碼庫也轉成向量？

## 它是怎麼運作的？

Claude Context 本質上是一個 MCP（Model Context Protocol）伺服器，掛在 Claude Code 旁邊。當你對它說「Index this codebase」的時候，它會：

1. **解析你的程式碼**：用 AST（抽象語法樹）把程式碼切成有意義的 chunk，而不是隨便切一刀。這點很重要——如果把一個 function 切成兩半，向量就會失去語意。

2. **生成向量**：把每個 chunk 丟進 embedding model（預設用 OpenAI 的 text-embedding-3-small，也可以換成 VoyageAI 或 Ollama）。

3. **存進向量資料庫**：預設用 Zilliz Cloud（他們的托管 Milvus），但你也可以自己架 Milvus。

4. **等你要搜尋的時候**：把你說的話轉成向量，去向量資料庫裡找語意最相近的 code chunk，回傳給 Claude。

整個過程中，向量資料庫承擔了「外部記憶體」的角色。Claude 不需要自己記得整個專案，它只需要「問」這個外部記憶體。

## 一個具體的數字

官方做了一個 controlled evaluation，結論很有意思：在 retrieval quality 不變的前提下，Claude Context 能省下約 **40% 的 token**。

這不是「少用一點 context」的節省，而是「用更少的 token 得到一樣好的結果」的節省。背後的邏輯是：傳統做法是把整個目錄丟進去，讓 model 自己從大量不相關的程式碼中「撈」出有用的部分；Claude Context 直接把「最有可能是答案」的 code chunk 找出來，只給 model 那些真正相關的內容。

對於那種好幾十萬行的大型專案來說，這差價每個月可能差好幾百塊美金。

## 支援多少工具？

這也是 Claude Context 做得蠻漂亮的地方。它不只是給 Claude Code 用。

官方列出的支援清單包括：

- Claude Code（C 神的本尊）
- OpenAI Codex CLI
- Gemini CLI
- Qwen Code
- Cursor
- Windsurf
- VS Code（有 VS Code 擴充功能）
- Cline
- Augment
- Roo Code
- Cherry Studio
- Void
- Zencoder

基本上你能叫得出名字的 AI Coding Tool，它都支援了。所有支援 MCP 的 client 都可以透過同一個 server 接入。

## 值得注意的細節

1. **Node.js 版本**：文件特別提到不支援 Node.js 24.0.0 以上，必須用 20.x 或 22.x。這點很容易踩雷。

2. **增量索引**：如果你的專案每天都有 commits，它不會每次都重新索引整個 codebase，而是用 Merkle tree 追蹤變動，只重新索引改過的檔案。

3. **自定義 embedding**：預設用 OpenAI 的 embedding model，但你可以換成 Voyage Code 3 或 Ollama。如果你的程式碼庫是中文為主，可能需要實驗一下哪個 embedding model 效果比較好。

4. **檔案過濾**：它會自動忽略 node_modules、.git 這類不需要索引的目錄，但你也可以自己設定 include / exclude patterns。

## 誰應該用？

如果你符合以下任一條件，Claude Context 值得一試：

- 你的專案已經大到讓 Claude Code 常常「看不太懂整體結構」
- 你每次對話都要先花 5–10 分鐘找相關程式碼貼給它
- 你在意 token 費用，希望每次對話更精準、更省錢
- 你的專案是多模組、多 package 的 monorepo，傳統 grep 很難找到「語意相關」但「名字不同」的程式碼

如果你只是一個人用的小專案，幾百行程式碼，那它的價值可能沒那麼大——直接把所有程式碼丟進去也不會多少 token。

## 結語

Claude Context 最有趣的地方，不是它用了什麼新技術——向量搜尋、AST parsing、MCP，這些都不是新概念。

它厲害的地方在於**把這些技術組裝在一起，然後放進一個「大多數開發者實際會用的場景」**。

大多數團隊不缺向量資料庫的技術能力，缺的是「有人幫我把這些工具接好、讓我直接能用」的產品。Zilliz 這次做了這個角色。

或許未來的 AI Coding Agent，都會標配一個 external semantic memory。Claude Context 是第一個把這個方向走得比較完整的開源方案。