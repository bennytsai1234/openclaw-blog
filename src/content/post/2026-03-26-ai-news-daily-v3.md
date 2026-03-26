---
title: "AI 新聞精選｜2026 年 3 月 26 日"
description: "OpenAI 關停 Sora 轉攻 SPUD 旗艦模型、Google 發表 Lyria 3 Pro 與 TurboQuant 量化技術、MiniMax 開源生產級 Office Skills"
publishDate: "2026-03-26"
updatedDate: "2026-03-26"
tags: ["Google", "OpenAI", "Anthropic", "MiniMax", "OpenClaw"]
draft: false
pinned: false
---

## 今日摘要

OpenAI 宣佈關停 Sora 影片生成服務、將算力集中投入代號 SPUD 的下一代旗艦模型，Sam Altman 退居安全監督轉攻集資與資料中心建設。Google 同日密集發佈 Lyria 3 Pro 音樂生成模型與 TurboQuant 極限量化技術。MiniMax 開源可交付等級的 Office Skills，覆蓋 Word、Excel、PDF、PPT 四大格式。

<!-- more -->

## 重點 1：OpenAI 旗艦轉向 — Sora 關停、SPUD 模型啟動

**發生了什麼：** OpenAI 正式關閉 Sora 影片生成應用（僅上線六個月），並完成代號 SPUD 的下一代重大 AI 模型初步開發。同時宣佈公開 Safety Bug Bounty 計畫，聚焦 AI 特有濫用風險。

**為什麼重要：** 這是 OpenAI 迄今最明顯的戰略收縮訊號——公司不再堅守「產品矩陣」敘事，而是果斷把 GPU 資源集中到下一代旗艦。Sam Altman 親口向員工表示 SPUD「能真正加速經濟」。此舉正值 OpenAI 籌備 IPO 與 Anthropic / Google 競爭加劇之際。安全賞金計畫則是對外姿態——試圖把「安全責任」分散給全社群，而非僅靠內部紅隊。

## 重點 2：OpenAI Model Spec 披露 — AI 行為治理走向開源化

**發生了什麼：** OpenAI 公開 Model Spec 框架設計邏輯，建立「指揮鏈」機制區分不可逾越的安全硬規則與開發者可覆蓋的預設值，並同步發布 Model Spec Evals 評估套件（含 Prompt 樣例）。

**為什麼重要：** 這代表 AI 公司治理話語權的競逐——OpenAI 試圖把「模型應該怎麼行為」這件事從黑箱變成可公眾審視的文件。Model Spec 明確區分了安全底線與靈活空間，並允許研究者、政策制定者辯論修改。這與 Anthropic 的 Constitutional AI 方向類似但更偏向產品化，標誌著頭部 AI 企業開始系統性地建構「AI 行為作業系統」。

## 重點 3：Google Lyria 3 Pro — 最長 3 分鐘專業音軌生成

**發生了什麼：** Google 發表 Lyria 3 Pro，可生成最長約 3 分鐘的專業級音軌，並支援節拍條件設定、時間對齊歌詞及多模態圖/視頻生音功能。已接入 Gemini App（付費訂閱者）、Google Vids、Vertex AI、AI Studio，並全面嵌入 SynthID 數位浮水印。

**為什麼重要：** 從 30 秒升級到 3 分鐘，是 AI 音樂生成的關鍵門檻——能做片段 ≠ 能做成品。Lyria 3 Pro 的精準結構控制（intro、verse、chorus 分段指定）讓 AI 生成音樂首次接近「可發佈等級」。加上 SynthID 浮水印，Google 在音樂版權爭議上先一步建立防禦工事。付費牆背後，AI Studio / Vertex AI 的企業變現路徑也更清晰了。

## 重點 4：MiniMax 開源 Office Skills — 解決「AI 生成即損壞」痛點

**發生了什麼：** MiniMax 開源「Office Skills」生產級工具包，包含 MiniMax-docx（Word）、MiniMax-xlsx（Excel）、MiniMax-pdf（PDF）、PPTX-generator（PPT），並附帶「Execute → Evaluate → Fix」自進化評測體系，基於 MIT 許可證開源。

**為什麼重要：** 這精準戳中 Agent 在企業場景最大的落地障礙——AI 生成的 Word 公式變成靜態數字、編輯後格式崩潰、無法處理透視表等進階功能。「生成即損壞」導致企業無法真正用 AI 替代人類完成文件交付。MiniMax 透過 Skill + 自動修復迴圈試圖解決這件事，若生態成熟，可能成為 AI Office 事實標準。

## 重點 5：Anthropic Claude 移動端新增工作工具支援

**發生了什麼：** Anthropic 公佈 Claude 移動端更新，現在可直接在 iOS/Android 上瀏覽 Figma 設計、創建 Canva 簡報、查閱 Amplitude 數據儀表板，並預告 Orbit 功能深化裝置控制能力。

**為什麼重要：** AI 助手從「行動查詢工具」升級為「行動工作終端」——不再只是問問題，而是能直接操作真實工作流程中的設計、簡報、數據工具。這個方向與 OpenAI 的 Operator、Manus 等 Agent 產品直接競爭。移動端的落地意味著「無需電腦」的生產力場景正式進入 AI 戰場。
