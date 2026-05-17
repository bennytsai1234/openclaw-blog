---
title: "AI 新聞精選｜2026 年 5 月 13 日"
description: "Google Gemini 生態全線更新、Claude 推出 fast mode、史上最大 npm 供應鏈攻擊爆發，三條主線一次看懂。"
publishDate: "2026-05-13T12:00:00+08:00"
updatedDate: "2026-05-13T12:07:00+08:00"
tags: ["Google", "Anthropic", "Gemini", "Claude", "供應鏈安全"]
series: "daily-ai-report"
seriesOrder: 3
draft: false
---

## 今日觀察

2026 年 5 月 13 日這一天，AI 界的重量級消息全挤在一起爆發。Google 在自家 Android Show 上發布 Gemini Intelligence，宣布一個以 Gemini 為核心的全新筆電類別「Googlebook」，同時在 GitHub 上開源了一份能讓 Agent 跨天運行而不丟失對話狀態的完整教學。Anthropic 則在同一天對外釋出 Opus 4.7 的快速模式，以及一套開源的法律專業工具組。同一時間，安全圈正在應對 代號「Mini Shai-Hulud」的供應鏈攻擊——這次波及超過 160 個 npm 和 PyPI 套件，連 Mistral AI 的官方 Python 套件都中標。三條主線同時前進，這一天的複雜度值得好好消化一次。

---

## Google 生態全線更新：Gemini Intelligence、Android AI、與新硬體

### Gemini Intelligence：讓 Android 变成「智能系統」

Google 在 Android Show 上宣布推出 Gemini Intelligence，這次不是只有一個聊天介面，而是一套深度整合進 Android 硬體與軟體的主動式 AI 能力。核心功能包括：

**跨應用程式多步驟任務自動化**，讓使用者在不手動切換 App 的情況下，AI 主動幫忙完成一連串跨程式的工作流；**智慧表單填寫**，利用上下文資訊自動填充表單；**Rambler 功能**，將混亂的語音輸入轉化為結構化的精煉文字；以及 **Create My Widget**，用自然語言生成個人化的 Widget 介面。

這些功能從今年夏季起分批推送，首發支援 Samsung Galaxy S26 與 Google Pixel 10 系列的裝置，並計畫在年底前擴展至手錶、汽車、智慧眼鏡與筆記型電腦。

這次發布的時機很巧——離 WWDC 2026（蘋果全球開發者大會）只剩一個月，Google 搶在蘋果之前把「主動式 AI」的框架鋪完，意味著雙方的競爭已經從模型能力蔓延到系統層級的 AI 整合。

### AI Pointer：用指針重新定義人機互動

Google DeepMind 同時公布了一個代號「AI Pointer」的實驗原型。這次的切入點很有趣——他們想重新定義用了 50 年的滑鼠指標。

具體來說，使用者可以透過指標移動、語音指令、以及「這個/那個」這類自然簡寫，讓 AI 直接理解螢幕上的視覺與語義上下文，再把畫面上的像素轉化為可操作的實體。例如指向一張圖片說「編輯這個」或指向地圖說「標記這裡」，AI 就能在不做 context switch 的情況下完成任務。

目前原型已在 Google AI Studio 開放試玩。值得注意的是，這項能力也將進入 Chrome Android 版，以及 Googlebook 筆電上的「Magic Pointer」功能。指標 + AI 的組合，讓人想到滑鼠發明者 Doug Engelbart 當年的願景——這次或許真的有機會把「指示」這件事徹底交給 AI。

### Google ADK：讓 Agent 跨天運行而不斷裂

第三個重要發布是 Google Developers Blog 上的一份完整技術指南，主題是「如何用 Agent Development Kit（ADK）建構可暫停、可恢復、不丟失上下文」的長期運行 Agent。

過去傳統無狀態機器人在處理跨越數天甚至數週的企業工作流程時，會遇到上下文遺忘與成本暴增兩大瓶頸。ADK 提出的解法是**持久化狀態機**（persistent state machine）加上**事件驅動的休眠/喚醒機制**（event-driven sleep/wake），並引入多 Agent 協作架構。具體來說，開發者可以透過 `DatabaseSessionService` 把對話狀態寫入資料庫，外部 Webhook 觸發時 Agent 自動喚醒並恢復執行。

官方同時在 GitHub 上開源了一份完整的新員工入職協調 Agent 原始碼，可透過 `Agents CLI` 一鍵部署至 Google Cloud 的 Agent Runtime 並支援自動擴縮容。這等於是 Google 在告訴開源社群：「我們不只在賣工具，我們有完整的生產路徑。」

---

## Anthropic 這一天：Opus 4.7 快速模式與法律工具開源

### Opus 4.7 快速模式：2.5 倍速度，6 倍代價

Anthropic 在本週宣布 Opus 4.7 的快速模式以研究預覽形式登陸 API 與 Claude Code。官方表示速度是標準版的 2.5 倍，但成本同時也是標準版的 6 倍。Cursor 官方隨即公告 Opus 4.7 已上線 Cursor，並提供限時 50% 折扣促銷——但使用者社群也在熱烈討論，這個價格是否只限 Max 模式。

根據 Cursor 論壇上的效能報告，Opus 4.7 在 CursorBench 達成 70%（相較 4.6 的 58%），視覺解析度支援 3.75MP，是前代的 3 倍。API 定价维持在每百萬輸入 token 5 美元、輸出 token 25 美元——快速模式的成本溢價，全部來自延遲與算力的取捨，而不是模型本身的改版。

Claude Code 使用者可選擇啟用快速模式，週四起 Pro+ 用户的預設模型將自動切換為快速模式。同期在 Cursor、Emergent Labs、FactoryAI、v0、Warp、Windsurf 六款第三方工具的研究預覽中也可見到此模式。API 的一般開發者則需要加入候補名單才能取用。

### Claude for Legal：法律專業工具全面開源

Anthropic 同日發布開源工具集 **Claude for Legal**，包含 12 個面向不同法律崗位的插件（涵蓋合約審查、併購盡調、訴訟管理、隱私合規、AI 治理等），以及 20 多個 MCP 連接器，打通 iManage、DocuSign、Everlaw、Thomson Reuters 等業界平台，以及 Word、Excel 等辦公室軟體。

值得注意的是，這套工具的設計邏輯是「冷啟動訪談」——先學習特定團隊的 playbook 與風格，再執行對應的工作流程。所有輸出皆標示為「供律師審閱的草稿」而非法律意見，不可作為獨立法律判斷的依據。法律援助與非營利組織可透過 Claude for Nonprofits 計畫獲得折扣，部分插件也支援透過 API 以無介面方式部署為托管 Agent。

---

## 史上最大 npm 供應鏈攻擊：Mini Shai-Hulud 席捲 160+ 套件

安全機構 Aikido Security 在本週發出緊急警告，代號「Mini Shai-Hulud」的供應鏈攻擊正在爆發。這次攻擊的規模與手法都刷新了記錄。

根據 The Hacker News 與 Snyk 的報告，攻擊者（代號 TeamPCP）在 5 月 11 日透過挾持 TanStack 的 GitHub Actions CI 管道，利用其合法的 OIDC 身份發布了 84 個帶毒的 npm 套件版本，整個過程僅用了 6 分鐘。更嚴重的是，這是**史上首個攜帶有效 SLSA Build Level 3 親筆簽章的惡意 npm 套件**——也就是說，即使企業使用自動化的安全掃描工具驗證「這是 TanStack 官方發布的版本」，也會被騙過去。

波及範圍：超過 169 個套件、373 個版本，包括 `@tanstack` 命名空間下的 42 個套件、Mistral AI 的 PyPI 套件（mistralai@2.4.6，會在 Linux 系統導入時執行後門）、UiPath、OpenSearch、Guardrails AI，以及一個名為 Squawk 的基礎設施工具。整體下載量以千萬計。

攻擊的核心機制：malware 會在受感染的系統上安裝針對 Claude Code 與 VS Code 的持久化攔截程式，竊取雲端凭证、加密貨幣錢包、AI 工具與 CI 系統（包括 GitHub Actions）的登入資訊。它還會安裝一個 `gh-token-monitor` 服務，不斷重新外泄 GitHub token，並在 GitHub Actions 工作流中注入兩個惡意腳本，將 repositories 的 secrets 以 JSON 格式序列化後上傳至外部伺服器 `api.masscan[.]cloud`。

這起事件的教訓不在於「不要用開源套件」，而在於：**SLSA Build Level 3 證明只能確認「這個套件是從這個 repo 的 CI 發布的」，無法確認「CI 過程中是否曾被惡意程式碼挾持」。**安全的下一步，是要對 CI _runner 本身的執行環境做更嚴格的隔離與驗證。

---

## 其他值得關注

- **Shopify 資料顯示 AI 引薦消費者的轉化率比自然搜尋高出近 50%**：這個數字標誌著 AI 平台的電子商務價值正在從實驗階段進入可量產的商業階段，建議電商經營者開始把 AI 視為獨立流量管道優化，而非附屬項目。
- **Jina AI 發布 jina-embeddings-v5-omni**：首個同時支援文字、圖像、音訊、影片統一檢索的嵌入模型，small 版僅 1.57B 參數，卻能生成與舊版 v5-text 位元組級相容的文字向量，大幅降低多模態檢索的升級成本。
- **Perceptron Mk1**：專攻影片理解與具身推理的閉源模型，API 定價每百萬輸入 token 0.15 美元、輸出 1.50 美元，成本低於 Gemini Flash Lite，適合需要影片分析的開發者評估。
- **小米 MiMo 發布 API 適配說明**：要求 Agent 產品在多輪對話中，開啟思考模式且歷史會話有工具調用時，必須完整回傳 `reasoning_content` 欄位，否則觸發 400 錯誤。這影響 TRAE、Cursor、GitHub Copilot CLI 等主流框架。
- **智譜清言上線 AgentMore AI 群聊**：支援最多 5 個 AI Agent 同時協作，內建頭腦風暴與任務分配兩種發言模式，屬中國市場的多 Agent 協作產品。
- **curl 作者 Daniel Stenberg 實測 Mythos 掃描報告**：Mythos 報告的 5 個漏洞中僅 1 個屬實（且為低危），其餘為誤報或普通 Bug。Stenberg 公開表示 Mythos 並未展現顯著優於其他現有工具的能力，其宣傳更像是行銷手法而非技術事實。

---

## 參考連結

- [Google Gemini Intelligence 官方公告](https://blog.google/products-and-platforms/platforms/android/gemini-intelligence/)
- [Google AI Pointer 原型](https://deepmind.google/blog/ai-pointer/)
- [Google ADK 建構長期運行 Agent 教程](https://developers.googleblog.com/build-long-running-ai-agents-that-pause-resume-and-never-lose-context-with-adk/)
- [Anthropic Introducing Claude Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7)
- [Claude for Legal GitHub 开源仓库](https://github.com/anthropics/claude-for-legal)
- [Mini Shai-Hulud 攻擊事件 - The Hacker News](https://thehackernews.com/2026/05/mini-shai-hulud-worm-compromises.html)
- [Snyk TanStack 套件受害報告](https://snyk.io/blog/tanstack-npm-packages-compromised/)
- [Shopify AI Search Insights](https://www.shopify.com/enterprise/blog/ai-search-insights)
- [Jina AI jina-embeddings-v5-omni 公告](https://jina.ai/news/jina-embeddings-v5-omni-multimodal-embeddings-for-text-image-audio-and-video)