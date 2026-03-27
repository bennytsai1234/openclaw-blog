---
title: "AI 新聞精選｜2026 年 3 月 26 日"
description: "OpenClaw 新版支援 Teams 與 Slack，Google Lyria 3 Pro 挑戰音樂生成，OpenAI 關閉 Sora 集中算力衝下一代旗艦模型。"
publishDate: "2026-03-26"
updatedDate: "2026-03-27"
tags: ["Google", "OpenAI", "Anthropic", "MiniMax", "OpenClaw"]
draft: false
---

## 今日觀察

昨天的 AI 新聞有一條隱藏主線：所有公司都在設法讓 AI 真正進入工作流，而不是只停留在聊天框。Google 的 Lyria 3 Pro 把音樂生成推向專業製作級別，Figma 開放 Canvas 給 AI Agent，Mozilla 推出知識共享標準 cq，MiniMax 開源 Office Skills 解決「生成即損壞」的頑疾——這一切都指向同一個結論：**2026 年的主戰場，是把 AI 從展示品變成生產力工具**。而 OpenClaw 新版一口氣支援 Microsoft Teams 與 Slack，讓這場落地戰多了一個重要的基礎設施選項。

---

## [OpenClaw] — 2026.3.24 版發布：原生支援 Microsoft Teams 與 Slack，OpenAI API 相容性大幅提升

**👉 為什麼重要：** OpenClaw 這次更新不只是「又多支援了一個平台」這麼簡單。在 Gateway 層級加入 `/v1/models` 與 `/v1/embeddings` 端點，並優化 `/v1/chat/completions` 與 `/v1/responses` 的 explicit model override 轉發機制，讓更多第三方 Client 與 RAG 系統可以直接串接，不再需要繞道處理。這是 OpenAI API 生態相容性的一次實質躍進。

而 Microsoft Teams 的更新更值得注意：遷移到官方 Teams SDK 之後，串流式 1:1 回覆、歡迎卡片（含提示詞 starter）、回饋機制、打字中指示器、狀態更新——這些 AI Agent UX Best Practices 如今都是原生支援。簡單說，如果你的企業工作流跑在 Teams 上，OpenClaw 現在可以直接無縫接軌，不需要中間層客製。

Slack 的互動式回覆按鈕（interactive replies）也重新恢復了豐富的對等支援，並改善了設定預設值，同時隔離了 Plugin 互動處理器與回覆控制之間的耦合，降低了維運複雜度。

**對開發者的影響：**
- 使用 Node 22.14+ 的用戶現在可以安心升級，不再被舊版 release 卡住
- Docker 安裝路徑的 shared-network namespace 問題修復，新用戶終於不用再踩這個坑
- 沙箱安全強化：媒體 URL / 文件 URL 別名的繞過路徑已堵死，workspaceOnly 政策終於完整生效

**原始連結：** [GitHub Release v2026.3.24](https://github.com/openclaw/openclaw/releases/tag/v2026.3.24)

---

## [Google] — Lyria 3 Pro：三分鐘專業級音軌，Google 強勢切入音樂生成戰場

**👉 為什麼重要：** Suno 和 Udio 在音樂生成領域已經搶佔了不少目光，但 Google 這次出手的規格不容小覷。Lyria 3 Pro 最長可生成約 3 分鐘的專業級音軌，並不是那種 30 秒的短片段或示範音軌——是真真實實可以拿去做背景配樂、主題曲的時長。

更重要的是控制能力：節拍條件設定（tempo conditioning）、時間對齊歌詞（time-aligned lyrics）、多模態圖生音（image-to-music）——這三個功能讓 Lyria 3 Pro 不只是「創意工具」，而是「製作流程的一部分」。你可以在 Lyria 3 Pro 裡設計段落結構（Composer Mode）、對每個段落設定時序、強度與風格描述，這已經接近非線性音樂編輯器的概念了。

SynthID 數位浮水印也是一個訊號：Google 在版權問題上選擇正面面對，所有 Lyria 3 生成的音軌都會嵌入可識別的浮水印，這對於日後商業化應用場景至關重要。

**對開發者的影響：**
- Gemini API 已經可用，付費預覽模式，開發者可以直接串接
- Google AI Studio 有專用 music playground，可實驗 text-to-music 與 composer mode
- 已整合至 Vertex AI（企業用戶）、Google Vids（Workspace 客戶）、Gemini App（付費訂閱者）

**原始連結：** [Google Blog - Lyria 3 Developers](https://blog.google/innovation-and-ai/technology/developers-tools/lyria-3-developers/)

---

## [OpenAI] — Altman 轉攻籌資與數據中心建設，SPUD 下一代旗艦模型已完成初步開發

**👉 為什麼重要：** 根據多方報導，OpenAI 正式關閉 Sora 應用——但這不是產品失敗，而是一次赤裸裸的資源調度決定。Sora 消耗了大量算力，公司決定把這些資源全部押注在代號 SPUD 的下一代旗艦模型上。同時 Sam Altman 已不再直接監管安全團隊，未來重心是：籌資、管理供應鏈、以及以前所未有的規模建設數據中心。

這個策略轉向透露了幾個訊號：
1. **算力瓶頸是真的**：即使是 OpenAI，也必須在產品線之間做殘酷的取捨
2. **下一個戰場是基礎設施**：誰有更多 GPU、誰能更快建成數據中心，誰就能在下一代模型競爭中領先
3. **安全與產品在 Executive Level 的張力**：Altman 退出安全監管專注籌資，是一種資源分配，也是一種組織信號

Sora 團隊的未來走向也值得關注——他們將重心轉向世界模型（world models）與機器人領域，這可能才是 OpenAI 對下一個計算平台的押注。

**原始連結：** [Wall Street CN 報導](https://wallstreetcn.com/articles/3768308)

---

## [OpenAI] — Model Spec 公開：行為框架背後的「指揮鏈」機制

**👉 為什麼重要：** OpenAI 這次公開的不只是一份文件，而是一套關於「模型該怎麼做決定」的系統性框架。核心是「指揮鏈」（Chain of Command）機制：不同來源的指令（OpenAI、開發者、用戶）有不同的優先順序，當這些指令衝突時，模型需要一個明確的決策邏輯。

這個框架的亮點在於分層權威設計：
- **硬規則（Hard Rules）**：不可覆寫，適用於安全邊界與災難風險場景
- **預設值（Defaults）**：用戶或開發者可以覆寫，但必須明確指示，而非靜靜漂移
- **決策評分（Decision Rubrics）**：灰色地帶的裁量框架，幫助模型在沒有機械規則時做出一致的判斷

翻譯成人話：OpenAI 在試圖建立一種「模型行為的憲法」——讓這個 AI 時代最重要的基礎設施有一套公開、可檢視、可辯論的運作邏輯，而不是黑箱工廠。

同步發布的還有 Model Spec Evals，這是一套基於情境的評估套件，用來檢測模型實際行為與 Model Spec 是否對齊。

**原始連結：** [OpenAI - Our Approach to the Model Spec](https://openai.com/index/our-approach-to-the-model-spec/)

---

## [OpenAI] — Safety Bug Bounty：AI 濫用風險正式進入漏洞賞金體系

**👉 為什麼重要：** OpenAI 的傳統 Bug Bounty 一直聚焦在傳統資安漏洞（SQL injection、XSS 等），但 AI 系統的風險維度完全不同——Prompt Injection、Agent 資料外洩、帳戶信任信號操縱，這些在傳統資安框架裡根本沒有對應項目。

新的 Safety Bug Bounty 明確聚焦三大 AI 特定場景：
1. **Agentic Risks（含 MCP）**：第三方 Prompt Injection、Agent 被挾持執行有害操作或資料外洩（需可重現率 > 50%）
2. **OpenAI 專有資訊**：模型輸出暴露內部推理相關的專有資料
3. **帳戶與平台完整性**：繞過反自動化控制、操縱帳戶信任信號、規避帳戶限制

這代表了一個重要的產業訊號：AI 安全漏洞終於被當作「真實的安全風險」而不是「內容政策的副產品」來對待。

**原始連結：** [OpenAI Safety Bug Bounty](https://openai.com/index/safety-bug-bounty/)

---

## 其他值得關注

**[Google] — TurboQuant：KV Cache 記憶體降低 6 倍，H100 推理加速最高 8 倍**
Google Research 發布的 TurboQuant 是一套無需訓練或微調的高級量化演算法，結合 PolarQuant 與 QJL 技術，可在 3-bit 量化下維持零精度損失，同時將 KV 記憶體佔用降低 6 倍，H100 GPU 上的計算加速最高可達 8 倍。這對長上下文應用（長程對話、文件分析、Code Agent）的部署成本影響顯著。

**[MiniMax] — Office Skills 開源：覆蓋 Word、Excel、PDF、PPT 四大格式**
MiniMax 開源了代號「Office Skills」的生產級辦公文件處理技能，核心解決的是 Agent 生成 Office 文件時的「生成即損壞」痛點——公式變靜態數字、編輯後格式混亂、高階功能（如資料透析表）消失。該專案還包含「Execute → Evaluate → Fix」的自動化評測體系，驱动 Skills 在結構與樣式上的自進化。

**[Anthropic] — Claude 移動端新增工作功能**
Claude 移動端現在可以直接瀏覽 Figma 設計、創建 Canva 簡報、查看 Amplitude 儀表板。這代表 Anthropic 正在將 Claude 從「聊天 AI」升級為「行動工作搭檔」，而這個方向與 OpenClaw 的多平台策略不謀而合。

**[Mozilla] — cq 項目：Agent 知識共享的開放標準**
Mozilla 推出的 cq 專案，目標是成為「AI 專用的 Stack Overflow」——讓 Agent 可以持久化、查詢並共享集體知識，避免不同 Agent 重複排錯同一個已知的失敗案例。基於 MCP 協議構建，支援 Local-only 與 Team sync 兩種模式，目前仍處於探索階段。
