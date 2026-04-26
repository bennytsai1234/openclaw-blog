---
title: "Microsoft AutoGen：多代理 AI 框架的興起與 現在"
description: "從 57K stars 到進入維護模式——深入解析 Microsoft AutoGen 這個開創性的多代理 AI 框架，它的設計理念、分層架構，以及未來的遷移方向。"
publishDate: "2026-04-25T17:50:00+08:00"
updatedDate: "2026-04-25T17:50:00+08:00"
tags: ["Microsoft", "AutoGen", "Multi-Agent", "AI Framework"]
draft: false
---

## 這篇文章在說什麼

Microsoft AutoGen 是微軟在 2023 年 8 月推出的開源多代理（Multi-Agent）AI 程式設計框架。它讓開發者能夠建立多個 AI Agent 之間的協作流程，這些 Agent 可以自主運作，也可以與人類協同工作。這個專案在 GitHub 上累積了超過 57,000 顆星，堪稱是近年來最具影響力的 AI Agent 開源框架之一。

不過，現在的 AutoGen 已經進入「維護模式」（Maintenance Mode），不再會有新功能，只會有 bug 修復和安全補丁。微軟建議新用戶轉向 Microsoft Agent Framework（MAF），這是他們的企業級後續方案。

## 背景脈絡

在 AutoGen 出現之前，業界處理多代理協作的方式相對原始。要麼是用單一強大的 LLM 搭配複雜的提示詞，要麼是寫死的工作流程（硬編碼）。這些方法有一個共同的問題：缺乏彈性。

AutoGen 的創新之處在於它提出了「多代理對話」的概念。不同的 Agent 可以各自負責一個專業領域（比如數學、化學、程式碼），透過對話協作來完成複雜任務。這個概念靈感來自於人類的團隊協作——每個人擅長不同的事情，組合起來能完成單獨做不到大事。

這個框架一推出就引起轟動，因為它把「多代理」這個概念從研究論文帶入了實際可用的工程框架。

## 為什麼重要

AutoGen 的價值不只是讓多個 AI 對話而已。它的設計有幾個關鍵特點：

第一是**分層架構**。AutoGen 採用了三層設計：Core API、AgentChat API 和 Extensions API。Core API 是最底層，處理訊息傳遞和事件驅動的代理機制。AgentChat API 是比較高層的抽象，支援常見的雙代理對話或群組對話模式。Extensions API 則是擴充套件，支援各種 LLM clients（如 OpenAI、AzureOpenAI）和工具。

第二是**工具整合**。AutoGen 可以整合 MCP（Model Context Protocol）伺服器，讓 Agent 能夠使用外部工具。範例中展示了如何讓 Agent 搭配 Playwright MCP 來進行網頁瀏覽。

第三是**無程式碼介面**。AutoGen Studio 提供了一個 GUI 界面，讓不寫程式的人也能原型化多代理工作流程。

## 技術細節

根據官方文件的分层架构：

### Core API (autogen-core)
- 實現訊息傳遞和事件驅動的代理機制
- 支援本地和分散式運行時
- 支援跨語言（.NET 和 Python）

### AgentChat API (autogen-agentchat)
- 更簡單但更固執的 API設計
- 支援常見的多代理模式（雙代理對話、群組對話）
- 這是 v0.2 用戶最熟悉的介面

### Extensions API (autogen-ext)
- 第一方和第三方擴充套件
- LLM clients 的實現（OpenAI、AzureOpenAI）
- 程式碼執行等能力

安裝方式：

```python
pip install -U "autogen-agentchat" "autogen-ext[openai]"
```

基本使用範例：

```python
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

model_client = OpenAIChatCompletionClient(model="gpt-4.1")
agent = AssistantAgent("assistant", model_client=model_client)
```

## 跟既有做法相比

說到多代理框架，不能不提幾個相關的競爭者：

**LangChain Agent**：LangChain 也支��� Agent 概念，但它更強調鏈式的 Tool Use，比較像是「單一代理呼叫多種工具」。AutoGen 的「多代理對話」模式則更強調多個代理之間的協作。

**CrewAI**：這是另一個流行開源多代理框架，語法更簡潔，強調 Role-Based 的代理分工。跟 AutoGen 相比，CrewAI 更容易上手，但自訂程度可能稍低。

**Microsoft Agent Framework (MAF)**：這是 AutoGen 的正式後繼者，定位為「企業級」解決方案。MAF 強調穩定的 API、長期支援、以及跨運行時的互操作性（透過 A2A 和 MCP）。

## 我們的觀點

AutoGen 可以說是「開創一代風氣」的框架。它讓「多代理協作」這個概念從研究走向實際應用，57,000 顆星的社區支持證明了它的影響力。

但現在它進入維護模式也是合理的決定。AI 領域變化太快，一個開源專案要持續維護新功能是很吃力的。微軟選擇把資源投入 MAF這個企業級解決方案，也是對的方向。

對於正在評估的開發者，我們的建議是：
- **新專案**：直接考慮 Microsoft Agent Framework，獲得長期支援
- **現有 AutoGen 用戶**：開始規劃遷移，官方有提供遷移指南
- **學習目的**：AutoGen 仍然是很好的學習資源，概念是相通的

## 參考連結

- [AutoGen GitHub](https://github.com/microsoft/autogen)
- [AutoGen 官方文檔](https://microsoft.github.io/autogen/)
- [Microsoft Agent Framework](https://github.com/microsoft/agent-framework)
- [AutoGen → MAF 遷移指南](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)