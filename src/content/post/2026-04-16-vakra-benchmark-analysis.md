---
title: "【技術解析】VAKRA：IBM 用 8000 個 API 實測告訴你，現在的 Agent 到底爛在哪"
description: "VAKRA 是 IBM Research 推出的企業級 Agent 評測基準，覆蓋 8,000+ API 與 62 個領域，專門用來找出多步推理 Agent 的斷鏈位置。"
publishDate: "2026-04-16T15:00:00+08:00"
updatedDate: "2026-04-16T17:58:00+08:00"
tags: ["IBM Research", "LLM Agent", "VAKRA", "Benchmark", "Tool Use"]
draft: false
---

## 這篇文章在說什麼

2026 年 4 月 15 日，IBM Research 在 Hugging Face 發布了 VAKRA 的詳細分析報告。VAKRA（eValuating API and Knowledge Retrieval Agents）是一個**可執行的工具導向基準**，用來評測 LLM Agent 在企業級多步推理場景下的真實可靠度。

這個 benchmark 有幾個數字值得記住：超過 8,000 個本地托管的 API、橫跨 62 個領域的真實資料庫、任務鏈最長需要 7 步推理。不同於其他只測單一能力的評測，VAKRA 把 API 串聯、工具選擇、多跳推理、文件檢索、政策約束全部塞進同一個環境裡，模擬真實企業部署時會遇到的組合地獄。

## 為什麼重要

市面上主流的 Agent 評測，大多是 isolated skill 測試——讓模型做一次工具呼叫、完成一個獨立的 RAG 檢索。這種測法會讓分數很好看，但工程師實際上線時遇到的不是這種乾淨題目，而是：**「先用這三個 API 拿到資料，再對比那份文件，最後根據公司政策選擇要不要叫第四個 API」**。

VAKRA 指出來的 gap 正是這個：表面工具能力與端到端可靠度之間，有一道很深的裂縫。對正在建構 Production Agent 系統的工程師來說，這份錯誤分析（error analysis）比任何 benchmark 分數都更有參考價值。

## 技術細節

VAKRA 的架構分成四個 Capability，分別測試不同的組合能力：

**Capability 1 — API Chaining（BI APIs）**：2,077 個測試樣本，來自 54 個領域。模型要串接 1 到 12 步的工具呼叫才能得到答案。這段測的是**工具呼叫序列規劃**。IBM 提供了 SLOT-BIRD（通用工具，參數多）和 SEL-BIRD（專用工具，數量多但參數少）兩種工具集合，測試不同維度的難度。

**Capability 2 — Tool Selection（Dashboard APIs）**：1,597 個樣本，17 個領域。每個領域最少 6 個、最多 328 個工具，平均 116 個。這段測的是**在大量工具中選對正確子集**。這裡出現了一個工程實務限制：OpenAI API Specification 把工具列表上限卡在 128 個，實際建系統時必須自己實作 shortlisting 機制。

**Capability 3 — Multi-Hop Reasoning**：869 個樣本，38 個領域。問題類型從 1-hop 到 5-hop 都有，分數分佈跟 hop 數量明顯負相關。

**Capability 4 — Multi-Hop Multi-Source + Policy**：644 個樣本，41 個領域。加入文件索引後，問題變成 API-RAG 混合型，同時還有所謂「Tool-usage Policies」——plain text 形式的約束規則，例如：「如果問題涉及 Technology & Software 主題，只准用文件檢索，不准叫其他工具」。模型在這裡的表現最差，政策約束明顯讓多數模型準確率下滑。

### 錯誤分類的方法論

VAKRA 設計了一套**階段性錯誤歸因**框架，按順序檢查每個失敗樣本：

1. **Tool Selection**：選對工具了嗎？
2. **Argument Errors**：該填的參數有沒有漏填或 hallucinate？
3. **Parameter Value Errors**：參數值正確嗎？
4. **Synthesis Errors**：工具輸出都拿對了，最後的回答正確嗎？

每個樣本只歸到第一個失敗的階段，避免 double-counting。

### 實測結果亮點

- **GPT-OSS-120B** 在 API Chaining 領先幅度最大，優於其他模型的主因是對 tool schema 的理解更穩健，特別是在一堆 optional parameters 面前知道該填哪幾個。
- **Gemini-3-flash-preview** 在 Tool Selection 維度擊敗所有對手，但在多步推理後的答案合成（synthesis）階段仍然出現顯著掉點。
- hop 深度對所有模型都有負面影響，3-hop 以上的題目全體衰退。
- Policy 約束測試中，除了 Granite-4.0-h-Small-32B 之外，所有模型在「政策限制必須繞路取得資訊」的題目上都有明顯準確率下滑。

## 我的觀點

VAKRA 這份分析最誠實的地方，是它**沒有只報告數字**。錯誤分類的方法論讓讀者看到瓶頸在哪：多數人直覺會覺得 Agent 的問題是「選錯工具」，但 VAKRA 的數據顯示，即使工具選對了，**合成正確答案**這最後一步仍然是多數模型的斷裂點。

這對實際建系統的人有兩個直接啟示。第一，tool selection 固然重要，但答案合成（response synthesis）模組值得 equally significant 的工程資源。第二，Policy-constrained 場景是目前最被低估的難關——多數 agent framework 把 policy 當成 prompt instruction 處理，但 IBM 的實驗說明這種方式的失敗率高得驚人。企業部署場景下，光靠 system prompt 是不夠的。

另外一個值得关注的点是 GPT-OSS-120B 的出现——这是非美国大厂（非 OpenAI/Google/Anthropic）的模型在特定维度拔尖的迹象。如果你在评估选型，这档「非主流旗舰」的表现值得放进评估矩阵。

## 參考連結

- [Inside VAKRA: Reasoning, Tool Use, and Failure Modes of Agents（Hugging Face Blog）](https://huggingface.co/blog/ibm-research/vakra-benchmark-analysis)
- [VAKRA Dataset（Hugging Face）](https://huggingface.co/datasets/ibm-research/VAKRA)
- [VAKRA GitHub](https://github.com/IBM/vakra)
- [VAKRA Leaderboard](https://ibm-research-vakra.hf.space/)
- [Introducing VAKRA（IBM 官方公告）](https://www.ibm.com/new/announcements/introducing-vakra-benchmark)
