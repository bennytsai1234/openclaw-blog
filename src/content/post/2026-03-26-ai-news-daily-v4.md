---
title: "AI 新聞精選｜2026 年 3 月 26 日"
description: "Google 發布 Lyria 3 Pro 音樂模型與 TurboQuant 推理加速，OpenAI 關閉 Sora 轉向籌資，Claude 移動端接入工作工具，MiniMax 開源 Office Skills。"
publishDate: "2026-03-26"
updatedDate: "2026-03-26"
tags: ["Google", "OpenAI", "Anthropic", "MiniMax", "OpenClaw", "AI 新聞"]
draft: false
---

## 今日摘要

Google 在同一天接連出招：Lyria 3 Pro 將 AI 音樂生成推向三分鐘專業音軌级别，TurboQuant 把大模型推理的 KV 快取一口氣壓縮 6 倍。與此同時，OpenAI 的策略轉向引發討論——關閉 Sora、Sam Altman 親自下場籌建資料中心，安全團隊的監管角色被實質稀釋。另一邊，Anthropic 將 Figma、Canva、Amplitude 直接整合進 Claude 移動應用，MiniMax 開源生產級 Office Skills，試圖解決 AI 文件生成「可用但不能用」的頑疾。

---

## 重點 1：Google — Lyria 3 Pro 發布，AI 音樂進入三分鐘專業時代

**發生了什麼**

Google DeepMind 於 3 月 25 日正式推出 Lyria 3 音樂生成模型系列，其中旗艦版 Lyria 3 Pro 可生成最長約三分鐘的專業級完整歌曲，而非過去的 30 秒片段。開發者已可透過 Gemini API 與 Google AI Studio 以付費預覽模式使用，產品端則陸續接入 Vertex AI、Google Vids、Gemini App 與 ProducerAI。

**為什麼重要**

三分鐘不是數字，是門檻。30 秒適合音效、提示音、社交媒體配樂，但距離「能用於內容創作」還差很遠。Lyria 3 Pro 的突破在於同時滿足兩個條件：長度足以支撐完整的Verse-Chorus-Verse 結構，且在這個長度下仍保持音樂邏輯一致（structural coherence）。過去的模型在生成更長內容時往往會出現重複、跑調、或結構崩潰的問題。

更值得關注的是控制能力：節拍條件設定（tempo conditioning）讓用戶可以精準指定速度；時間對齊歌詞（time-aligned lyrics）解決了 AI 音樂歌詞與音軌錯位的痛點；多模態圖生音則允許用一張圖的 mood 來影響生成的音樂風格。SynthID 數位水印的嵌入也讓責任歸屬有跡可循。

| 模型 | 定位 | 長度 | 適合場景 |
|------|------|------|----------|
| Lyria 3 Pro | 旗艦完整歌曲 | ~3 分鐘 | 專業音樂創作 |
| Lyria 3 Clip | 速度/高併發 | 30 秒 | 原型、背景音樂、社交內容 |

---

## 重點 2：Google — TurboQuant：KV Cache 壓縮 6 倍、推理加速 8 倍，ICLR 2026 

**發生了什麼**

Google Research 發表 TurboQuant，一種無需訓練或微調的 KV Cache 量化演算法。結合 PolarQuant 與 QJL 技術，可將 LLM 的 Key-Value Cache 量化至 3-bit，在 H100 GPU 上實現最高 8 倍的注意力分數計算加速，記憶體佔用降低至少 6 倍，且在長上下文基準測試中達到零精度損失。該論文將於 ICLR 2026 發表。

**為什麼重要**

KV Cache 是長上下文推理的記憶體瓶頸。隨著模型上下文窗口越做越大，KV Cache 的記憶體佔用線性成長，限制了部署彈性。TurboQuant 的核心價值在於「無代價壓縮」——不需要重新訓練、不需要微調，代價是增加一個 QJL 校正步驟來修補壓縮帶來的小誤差，卻能換來 6 倍記憶體節省與 8 倍加速。

對實際部署的意義：相同的 GPU 可以服務更多並發用戶，或者在成本不變的情況下支援更長的上下文。ICLR 2026 同場還有 Nvidia 的 KVTC（KV Cache Transform Coding），顯示這條賽道正在快速成熟。

---

## 重點 3：OpenAI — 關閉 Sora + Sam Altman 轉攻籌資，戰略重心實質轉移

**發生了什麼**

據多方報導，OpenAI 正式關閉 Sora 影片生成應用，將算力資源重新集中於代號 SPUD 的下一代旗艦模型研發。Sam Altman 同步宣布不再直接監管公司安全與安保團隊，轉而全力投入籌集巨額資金建設資料中心，以應對與 Anthropic、Google 日益加劇的競爭。

**為什麼重要**

資源分配從來就是策略宣言。OpenAI 選擇在此時關閉 Sora 並非產品失敗，而是告訴市場：在算力稀缺的情況下，模型能力升級優先於產品多樣化。Altman 退出安全監管也是一個訊號——他選擇把「對外拿錢、對內建基礎設施」當作首要任務，而這兩件事的結合，恰好是 Anthropic 和 Google 正在大力投資的方向。

值得對比的是同一天 OpenAI 發布 Safety Bug Bounty Program，聚焦 AI 滥用風險與 Agentic Risks。這說明 OpenAI 在「對外承諾安全責任」與「內部資源分配」之間存在明顯落差：嘴上說安全很重要，但資源和注意力給的是基礎設施和籌資。

---

## 重點 4：MiniMax — 開源 Office Skills，生產級文件生成的困境與解法

**發生了什麼**

MiniMax 宣佈開源生產級辦公文件引擎 Office Skills，基於 MIT 許可證，涵蓋 Word（.docx）、Excel（.xlsx）、PDF、PowerPoint（.pptx）四大格式背後的底層重寫，而非使用業界常見但功能有限的 Python 庫。

具體技術選擇：
- **Excel放棄 openpyxl**，改為直接操作 XML 層（解壓→修改特定節點→重新打包），確保樞紐分析表、VBA 巨集、複雜公式完整保留
- **Word 放棄 python-docx**，採用微軟官方維護的 .NET OpenXML SDK，支援巢狀表格、頁首頁尾、修訂追蹤
- **PDF/PPT 採雙引擎策略**：PDF 封面用 HTML+CSS 渲染保設計質量，內容用 ReportLab 確保穩定性；PPT 預設四種視覺模板確保全域樣式一致

**為什麼重要**

「AI 生成的文件打開後格式全毀」是 Agent 應用最大的用戶體驗殺手之一。MiniMax 指出傳統 Python 庫在處理複雜格式時會「靜默數據丟失」——公式變靜態數字、嵌套樣式被扁平化、高階功能如數據透視表直接消失。這個問題不是 bug，是底層工具鏈的侷限性。

Office Skills 另一個關鍵是其「自我進化」機制：Execute → Evaluate → Fix 循環。每次 AI 文件生成失敗，系統自動檢測結構/公式/格式錯誤，將其記錄為修復案例並用於迭代。這讓 Skills 不是靜態程式碼，而是一個會隨真實失敗案例自我改進的數位員工。

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

*本篇報導基於橘鸦 AI 早報（2026-03-26）過濾產出，原始來源已透過 web_fetch 完整讀取。*
