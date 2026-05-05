---
title: "【熱門專案】2026-05-06 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：context-mode、local-deep-research、Scrapling、TabPFN"
publishDate: "2026-05-06T07:30:00+08:00"
updatedDate: "2026-05-06T02:27:00+08:00"
tags: ["Claude Code", "local LLM", "web scraping", "tabular ML"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-06-github-trending-daily.png"
  alt: "GitHub 熱門專案速讀｜2026-05-06"
---

今天的 GitHub Trending 有一個明確主題：讓 AI agent 做事更聰明、更本土、更少負擔。四個專案剛好從不同維度切進這個問題。

## context-mode：讓 AI coding agent 不再爆 context

每一個 MCP tool call 都會把資料傾倒進 context window。Playwright snapshot 吃掉 56 KB。二十個 GitHub issue 吃掉 59 KB。開了半小時之後，40% 的 context 空間就這樣被工具輸出占走了。

context-mode 從四個方向同時解決這個問題。

第一，**沙盒隔離**：工具輸出不再直接寫入 context，而是寫进 SQLite，再透過 FTS5 BM25 檢索。只把「當前任務相關」的片段動態拉回 context。315 KB 的工具輸出變成 5.4 KB，壓縮率 98%。

第二，**會話連續性**：每次檔案編輯、git 操作、錯誤、使用者決策都被追蹤存入資料庫。當模型壓縮對話騰出空間時，不需要把全部歷史灌回去，按需檢索就好。

第三，**Think in Code**：要求模型把「分析」變成「程式」。與其讓模型讀 50 個檔案去數 function 數量，不如叫它寫一行 script 做完這件事，再把結果 console.log 出來。一個 ctx_execute 取代十次 tool call，省下約 100 倍的 context。

第四，**輸出 compression**：輸出時去掉 articles、filler、pleasantries、hedge words，只保留技術實質。Security warning 和不可逆操作時才完整展開。預計可節省 65–75% 的 output token。

目前支援 14 個平台，包括 Claude Code（全自動 plugin）、Gemini CLI、Cursor、Cline、windsurf、OpenCode、Continue.dev，以及多個 MCP-based 環境。Claude Code 安裝只需 `/plugin marketplace add mksglu/context-mode`。

## local-deep-research：把 AI 研究助理完全安裝在你機器上

一個能在 3090 顯示卡上跑到 SimpleQA 準確率約 95% 的本地研究工具。支援所有本地與雲端 LLM（llama.cpp、Ollama、Google、OpenAI），以及 10 個以上的搜尋引擎。

核心設計是一套 pipeline：下載來源 → 存入加密資料庫 → 索引並向量化 → 允許使用者跨私人文件與即時網路同時提問。資料庫採用 SQLCipher， AES-256 加密，密鑰不回傳，連 server 管理員都無法讀取你的資料。

新的 LangGraph Agent 策略讓模型自主決定何時搜尋、動態切換搜尋引擎（arXiv、PubMed、Semantic Scholar），並在收集到足夠資訊後才做綜合報告。初步結果顯示這種 agentic 模式比 pipeline 模式的資訊覆蓋範圍明顯更廣。

供共鏈安全也做得扎實：Docker image 有 Cosign 簽章、SLSA  provenance 與 SBOM，可透過 `cosign verify` 驗證完整性。官方說 SimpleQA 準確率約 95%（使用 GPT-4.1-mini + SearXNG + focused-iteration 策略），與狀態前沿的雲端研究系統相當。

三種安裝方式：Docker 完整包（Linux GPU 最推薦）、docker-compose（支援 CPU 模式）、或直接 pip install。Windows/Mac/Linux 皆可。

## Scrapling：版面改了也不用改爬蟲

傳統爬蟲最大的痛點：網站改一個 class name，整套爬蟲就掛了。Scrapling 的核心賣點正是這個——**adaptive parsing**，parser 會學習網站結構變化，自動重新定位目標元素。

底層做了三件事。

**無頭瀏覽器級 fetch**：內建 StealthyFetcher，可繞過 Cloudflare Turnstile，預設 `adaptive=True`。Fetch 回來的頁面無論結構怎麼改，只要 pass `adaptive=True` 就能找到目標元素。官方號稱能處理從單一 request 到大規模 crawl 的所有情境。

**爬蟲框架**：基於 asyncio 的 Spider 類別，支援 concurrent 爬取、pause/resume、千萬級 URL 的排程。內建自動 proxy rotation，遇到封鎖時自動切 IP，不中斷爬蟲。

**MCP server**：提供 AI agent 用的 MCP 介面，讓 AI coding agent 可以直接呼叫 Scrapling 做網頁抓取。

文件有 9 種語言翻譯，包含繁體中文。底層基於 Playwright，生態相容性廣，PyPI 安裝 `pip install scrapling` 即可。

## TabPFN：表格資料的 Foundation Model

表格資料 ML 是 Kaggle 競賽裡最常見的題型，但多數團隊還停留在 XGBoost / LightGBM 的 tuning 地獄。TabPFN 想做的事，是讓工程師像用 text model 一樣簡單地處理表格分類與回歸問題。

用法極簡：安裝後 `from tabpfn import TabPFNClassifier`，`clf.fit(X_train, y_train)`，直接 predict。不需要 feature scaling，不需要 one-hot encoding，模型自己處理。

背後原理是 Transformer architecture 在大量合成資料上訓練，學會了表格資料的通用模式，然後 inference 時直接在新資料上預測，不需要再微調。適合的資料範圍是少於 10 萬樣本、少於 2000 features，超出這個範圍另有 large datasets guide。

需要 GPU（舊卡 8GB VRAM 也能跑），沒有 GPU 的話可以用 TabPFN Client 做雲端推論。Colab notebook 有完整的分類、回歸、迴歸範例。

官方 Extensions repo 提供了 SHAP 解釋、outlier detection、Synthetic data generation、Feature embeddings、many-class 擴展、與 Random Forest 混合等多種工具。

## 結語

今天的四個專案共同反映一個趨勢：工具層正在快速成熟。context-mode 解決 agent 的資源浪費、local-deep-research 把研究能力還給使用者本機、Scrapling 把爬蟲的脆弱性降下來、TabPFN 把表格 ML 的進入門檻抹平。這不是 AI 模型本身的進展，而是應用層基礎建設集體往前滾的訊號。

## 參考連結

- https://github.com/mksglu/context-mode
- https://github.com/LearningCircuit/local-deep-research
- https://github.com/D4Vinci/Scrapling
- https://github.com/PriorLabs/TabPFN
- https://news.ycombinator.com/item?id=47193064（context-mode HN 討論）
- https://scrapling.readthedocs.io
- https://priorlabs.ai/docs