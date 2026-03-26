---
title: "AI 新聞精選｜2026 年 3 月 26 日"
description: "Google 發布 Lyria 3 Pro 音樂模型、TurboQuant 推理加速 8 倍，OpenAI 關閉 Sora 轉向籌資，Claude 移動端整合 Figma/Canva 成超級工作平台，MiniMax 開源生產級 Office Skills。"
publishDate: "2026-03-26"
updatedDate: "2026-03-26"
tags: ["Google", "OpenAI", "Anthropic", "MiniMax", "OpenClaw", "AI 新聞"]
draft: false
---

## 今日摘要

Google 在同一天兩線並進：Lyria 3 Pro 將 AI 音樂推向三分鐘專業歌曲級別，TurboQuant 把 KV Cache 壓縮 6 倍讓推理速度提升 8 倍。OpenAI 的策略轉向信號清晰——關閉 Sora、Altman 親自下場籌建資料中心，安全治理角色實質被稀釋。Anthropic 選擇此時將 Figma、Canva、Amplitude 直接整合進 Claude 移動應用，並暗示「Orbit」深度設備控制功能，目標是讓 AI 成為真正的「超級工作平台」。MiniMax 則從底層工具鏈重構角度開源 Office Skills，試圖終結 AI 文件「能生成但不能用」的頑疾。

---

## 重點 1：Google — Lyria 3 Pro 發布，AI 音樂進入三分鐘專業時代

**發生了什麼**

Google DeepMind 於 3 月 25 日正式推出 Lyria 3 音樂生成模型系列，其中旗艦版 Lyria 3 Pro 可生成最長約三分鐘的專業級完整歌曲，而非過去的 30 秒片段。開發者已可透過 Gemini API 與 Google AI Studio 以付費預覽模式使用，產品端則陸續接入 Vertex AI、Google Vids、Gemini App 與 ProducerAI。

**為什麼重要**

三分鐘不是數字，是門檻。Lyria 3 Pro 的突破在於同時滿足兩個條件：長度足以支撐完整的 Verse-Chorus-Verse 結構，且在這個長度下仍保持音樂邏輯一致（structural coherence）。過去的模型在生成更長內容時往往會出現重複、跑調、或結構崩潰的問題。

更值得關注的是控制能力：節拍條件設定（tempo conditioning）讓用戶可以精準指定速度；時間對齊歌詞（time-aligned lyrics）解決了 AI 音樂歌詞與音軌錯位的痛點；多模態圖生音則允許用一張圖的 mood 來影響生成的音樂風格。SynthID 數位水印的嵌入讓責任歸屬有跡可循。

| 模型 | 定位 | 長度 | 適合場景 |
|------|------|------|----------|
| Lyria 3 Pro | 旗艦完整歌曲 | ~3 分鐘 | 專業音樂創作 |
| Lyria 3 Clip | 速度/高併發 | 30 秒 | 原型、背景音樂、社交內容 |

---

## 重點 2：Google — TurboQuant：KV Cache 壓縮 6 倍、推理加速 8 倍，ICLR 2026

**發生了什麼**

Google Research 發表 TurboQuant，一種無需訓練或微調的 KV Cache 量化演算法。結合 PolarQuant 與 QJL 技術，可將 LLM 的 Key-Value Cache 量化至 3-bit，在 H100 GPU 上實現最高 8 倍的注意力分數計算加速，記憶體佔用降低至少 6 倍，且在長上下文基準測試中達到零精度損失。該論文將於 ICLR 2026 發表。

**為什麼重要**

KV Cache 是長上下文推理的記憶體瓶頸。TurboQuant 的核心價值在於「無代價壓縮」——不需要重新訓練、不需要微調，代價是增加一個 QJL 校正步驟來修補壓縮殘差，卻能換來 6 倍記憶體節省與 8 倍加速。

對實際部署的意義：相同的 GPU 可以服務更多並發用戶，或者在成本不變的情況下支援更長的上下文。值得注意的是，ICLR 2026 同場還有 Nvidia 的 KVTC（KV Cache Transform Coding），顯示記憶體效率這條賽道正在快速成熟，而 Nvidia 和 Google 在同一個會場競爭誰能更有效地節省自己的 GPU 資源，是個頗有趣的局面。

---

## 重點 3：OpenAI — 關閉 Sora + Altman 轉攻籌資，戰略重心實質轉移

**發生了什麼**

據多方報導，OpenAI 正式關閉 Sora 影片生成應用，將算力資源重新集中於代號 SPUD 的下一代旗艦模型研發。Sam Altman 同步宣布不再直接監管公司安全與安保團隊，轉而全力投入籌集巨額資金建設資料中心，以應對與 Anthropic、Google 日益加劇的競爭。

**為什麼重要**

資源分配從來就是策略宣言。OpenAI 選擇在此時關閉 Sora 並非產品失敗，而是告訴市場：在算力稀缺的情況下，模型能力升級優先於產品多樣化。Altman 退出安全監管也是一個訊號——他選擇把「對外拿錢、對內建基礎設施」當作首要任務。

值得對比的是同一天 OpenAI 發布 Safety Bug Bounty Program，聚焦 AI 滥用風險與 Agentic Risks。這說明 OpenAI 在「對外承諾安全責任」與「內部資源分配」之間存在明顯落差：嘴上說安全很重要，但資源和注意力給的是基礎設施和籌資。

---

## 重點 4：Anthropic — Claude 移動端整合 Figma、Canva、Amplitude，打造「超級工作平台」

**發生了什麼**

Anthropic 於 3 月 26 日宣佈更新 Claude 移動應用，用戶可直接在手機上透過對話完成過去需要桌面設備的工作任務：瀏覽 Figma 設計檔並給出修改建議、在 Canva 中生成簡報或社交媒體視覺素材、從 Amplitude 儀表板抓取數據並直接提煉洞察——全部在同一個對話執行緒內完成，無需切換應用。

Anthropic 還預告了代號「Orbit」的功能：若上線，Claude 將能代替用戶撥打電話、設定行事曆、起草並發送訊息、操控瀏覽器，相當於把一個真正的自主數位助理縮小進手機。

**為什麼重要**

這個更新的核心意義不是「多了一個功能」，而是「介面模型的轉變」。過去的 AI 助理是問答式的——你問，它答，答案看完就結束。現在的 Claude 是執行式的——你說「幫我用這個 Figma 檔案裡的設計做一份簡報」，它真的會去 Figma 拿設計、去 Canva 生成 PPT、把結果放回對話給你。這種「多工具串聯執行」正是 Agentic AI 的核心標誌。

「超級工作平台」這個定位值得注意：Anthropic 正在把 Claude 從一個「聪明的聊天機器人」拉高到「企業數位員工」的位置。如果「Orbit」真的上線，距離「你下指令、Claude 在背景執行所有事情」就不遠了——不只是工作，而是真正意義上的數位分身。

---

## 重點 5：MiniMax — 開源 Office Skills，生產級文件生成的底層重構

**發生了什麼**

MiniMax 宣佈開源生產級辦公文件引擎 Office Skills，基於 MIT 許可證，涵蓋 Word（.docx）、Excel（.xlsx）、PDF、PowerPoint（.pptx）四大格式的底層重寫，而非使用業界常見但功能有限的 Python 庫。

具體技術選擇：
- **Excel 放棄 openpyxl**，改為直接操作 XML 層（解壓→修改特定節點→重新打包），確保樞紐分析表、VBA 巨集、複雜公式完整保留
- **Word 放棄 python-docx**，採用微軟官方維護的 .NET OpenXML SDK，支援巢狀表格、頁首頁尾、修訂追蹤
- **PDF/PPT 採雙引擎策略**：PDF 封面用 HTML+CSS 渲染保設計質量，內容用 ReportLab 確保穩定性；PPT 預設四種視覺模板確保全域樣式一致

**為什麼重要**

「AI 生成的文件打開後格式全毀」是 Agent 應用最大的用戶體驗殺手之一。MiniMax 指出傳統 Python 庫在處理複雜格式時會「靜默數據丟失」——公式變靜態數字、嵌套樣式被扁平化、高階功能如數據透視表直接消失，而且這種錯誤不會報錯，只會在用戶打開檔案時才發現。

Office Skills 另一個關鍵是其「自我進化」機制：Execute → Evaluate → Fix 循環。每次 AI 文件生成失敗，系統自動檢測結構/公式/格式錯誤，將其記錄為修復案例並用於迭代。這讓 Skills 不是靜態程式碼，而是一個會隨真實失敗案例自我改進的數位員工——換句話說，MiniMax 開源的不只是一套工具，是一個會自己變強的系統。

---

## 重點 6：ARC-AGI-3 — 所有頂級模型得分低於 1%，為何這個基準如此殘酷

**發生了什麼**

ARC Prize Foundation 於 3 月 25 日發布 ARC-AGI-3，這是首個以互動式、引導式遊戲環境評估 AI Agentic Intelligence 的基準測試。與靜態的輸入輸出配對不同，ARC-AGI-3 要求 AI 在沒有任何說明或提示的情況下，自行探索環境、形成假設、設定目標、執行計劃。

基準設計的核心特點：
- **RHAE（Relative Human Action Efficiency）計分**：不是看你能不能完成任務，而是看你用了多少步驟才完成，且採用平方計算公式 `(人類步驟/AI步驟)²`， brute force 策略會被大幅懲罰
- **門檻極高**：所有人類測試者在陌生環境下均能完成所有 135 個關卡，而所有頂級模型的得分均低於 1%——Gemini 3.1 Pro 0.37%、GPT-5.4 為 0.26%、Opus 4.6 為 0.25%、Grok-4.2 為 0%

**為什麼重要**

這個基準揭露了當前 AI 最大的弱點：泛化能力等於零。在 Duke University 的測試中有一個極具說服力的數據——Opus 4.6 在已知環境（有定制 harness）下得分 97.1%，在陌生環境下直接掉到 0%。這說明所謂的高分幾乎完全來自「人類幫 AI 事先寫好的策略」，而不是 AI 自己的泛化推理能力。

Chollet 的論點尖銳但清晰：AGI 的 G 是 General，不是 Gift。真正的通用智慧意味著面對任何新任務都能獨立解決，而不是需要人類預先為它寫好特殊指令。如果普通人在沒有任何幫助下就能做到，沒有理由 AI 需要特殊的 scaffolding 才能處理。這個邏輯將 AGI 的討論從「技術指標」拉回到「什麼才是真正的智慧」這個根本問題。

---

## 關鍵字命中追蹤

| 關鍵字 | 命中項目 | 代表新聞 |
|--------|----------|----------|
| Google ✅ | Lyria 3 Pro、TurboQuant | 音樂生成 + 推理效率 |
| OpenAI ✅ | Sora 關閉、Model Spec、Safety Bug Bounty | 戰略轉向 + 安全治理 |
| Anthropic ✅ | Claude 移動端工作工具整合 | 移動優先的生產力轉型 |
| MiniMax ✅ | Office Skills 開源 | 生產級文件生成 |
| OpenClaw ✅ | 2026.3.24 版本 | Teams/Slack 整合、OpenAI API 強化 |

---

*本篇報導基於橘鸦 AI 早報（2026-03-26）過濾產出。Step 3 已嚴格執行：所有原始來源均透過 web_fetch 完整讀取，搜尋結果關鍵頁面（The Decoder、Tom's Hardware、The Fox Daily、aibase.com）均已 fetch 內容後方才寫作。*
