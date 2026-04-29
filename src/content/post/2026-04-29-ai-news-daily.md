---
title: "AI 新聞精選｜2026 年 4 月 29 日"
description: "Claude 開放創意工具連接、螞蟻與 NVIDIA 同日開源新模型、Google 與國防部簽約獲准進入機密網路"
publishDate: "2026-04-29T12:00:00+08:00"
updatedDate: "2026-04-29T12:06:00+08:00"
tags: ["Anthropic", "Claude", "NVIDIA", "Google", "Gemini"]
coverImage:
  src: "@/assets/post-covers/2026-04-29-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-04-29"
series: "daily-ai-report"
seriesOrder: 28
draft: false
---

## 今日觀察

2026 年 4 月 29 日的 AI 業界有一個有趣的對比：一邊是模型廠商在創意工具與開源生態上的積極推進，另一邊是 Google 繞過自家員工反對、徑直與五角大廈簽約的爭議事件。兩件事發生在同一天，湊在一起看，剛好呈現出這波 AI 熱潮中技術自由與地緣政治張力同步升級的縮影。

---

## 主題一 — Claude 進入創意工作流：從聊天到實際操控專業軟體

Anthropic 在 4 月 28 日發布了「Claude for Creative Work」，一口氣推出九款創意軟體連接器，讓 Claude 可以直接透過對話介面操控 Blender、Adobe Creative Cloud、Ableton、Autodesk Fusion、Resolume Arena、SketchUp、Splice 等專業工具。

這不是那種「上傳一張圖讓 AI 幫你修」的淺層整合。以 Blender 為例，連接器直接暴露了 Blender 的 Python API，Claude 可以分析整個 3D 場景結構、批次修改物件屬性，甚至把自定義腳本寫進 Blender 介面。對一個每天都在跟 Blender 打交道的人來說，這意味著你可以用自然語言驅動一個本來需要手動操作的工作流程，而不是另外打開一個 AI 聊天視窗、截圖貼上、複製結果回去。

Anthropic 還資助了 Blender Development Fund，成為該開源專案的 patron。這步走得比大多數大廠的「AI 助手」策略更深入——不只是在產品層面接入，而是實際參與開源生態的長期建設。對比多數大廠宣稱「賦能創作者」但實際只做雲端封閉服務的做法，這個姿態值得注意。

值得觀察的是這套連接器是基於 MCP（Model Context Protocol）構建的，原則上其他 LLM 也可以接入。也就是說，Anthropic 選擇把整合框架開放出來，而非將 Blender 夥伴關係獨家綁定在 Claude 生態內。這對整個創意工具 AI 化的发展方向，是一個偏開放的信號。

---

## 主題二 — 同日兩個開源模型：螞蟻 Ling 與 NVIDIA Nemotron 的不同策略

4 月 29 日同時出現了兩個開源模型發布，而且路數完全不同。

**螞蟻的 Ling-2.6-flash** 來自螞蟻百靈團隊，之前代號 Elephant Alpha 在 OpenRouter 上做過內測。這是一個 104B 總參數、7.4B 激活參數的非推理模型，採用混合線性注意力與高度稀疏的 MoE 架構，原生支援 262K 上下文。官方數據在 4× H20 配置下可達約 340 tokens/s，峰值吞吐量相較同類主流模型最高提升約 4 倍。模型提供了 BF16、FP8、INT4 三種精度版本，已在 Hugging Face 與 ModelScope 開放下載，且獲得 SGLang 與 vLLM 的 Day-0 支援。

這個模型的核心設計思路是「面向真實世界 Agent 工作負載」——不是那種在 benchmark 上刷分的獵奇模型，而是實際拿來跑任務的。104B 的總量在部署成本上比動輒 400B 以上的巨無霸親民不少，7.4B 的激活參數意味著單卡或雙卡部署在某些場景下是現實的。262K 的上下文對需要處理長文件的開發者來說是實用規格，而非實驗性質。

**NVIDIA 的 Nemotron 3 Nano Omni** 也是開源，但切入點不同。它是一個 30B-A3B（總參數 30B、激活 3B）的 MoE 模型，核心賣點是「在單一推理循環中統一處理影片、音頻、圖像、文字」，設計目標是作為 Agent 系統中的感知子 Agent，而非終端用戶直接使用的聊天模型。

NVIDIA 在部落格中強調了它在 MMlongbench-Doc、OCRBenchV2、WorldSense、DailyOmni、VoiceBench 等多個跨模態基準上的領先表現，並特別指出在 MediaPerf（一個以實際製作任務評測影片理解模型的業界基準）上，它在每項任務都達到了最高吞吐量，且影片層級標記的推理成本最低。這些數字對在邊緣或對延遲敏感的場景部署多模態模型的團隊有直接參考價值。

兩個模型同一天開源，一個強調「 Agent 工作負載下的吞吐量」，一個強調「單一模型統一四種模態」，剛好代表了開源模型賽道中兩種不同的軍備競賽方向。

---

## 主題三 — Google 與國防部簽約：員工反對擋不住，地緣邏輯優先

4 月 28 日，多家媒體同步報導 Google 與美國國防部簽署協議，授權 Gemini AI 用於機密網路上的「任何合法政府目的」。根據 TechCrunch 的報導，這筆合約是去年已簽署的 2 億美元合約的一部分，條款與 OpenAI、xAI 此前達成的國防合約模式類似——允許政府請求 Google 協助調整 AI 的安全設置與過濾器。

值得注意的是，Anthropic 此前拒絕了國防部類似的合作要求，理由是反對將 AI 用於「國內大規圍監控與自主武器」。約 950 名 Google 員工簽署了聯名信，要求公司效仿 Anthropic 的立場。然而 Google 管理層顯然選擇了另一套邏輯，直接繞過了內部反對聲音。

對開發者而言，這個趨勢有幾層意涵：

第一層是「AI 模型的軍工複合體化」已不再是假設，而是正在快速發生的結構性轉變。OpenAI、xAI、Google 先後與美國國防部簽約，這個名單事實上在擴大，而不是縮小。

第二層是模型輸出的「可控性」正在成為一種談判籌碼。 Anthropic 的拒絕與 Google 的接受，中間的差異不只是道德立場，而是對「模型可控性」的不同估價。國防部門願意為这种 access 付出的代價，會影響整個產業對模型安全規格的投入方向。

第三層對日常開發者的影響比較間接，但不容忽視：當主要模型供應商陸續進入國防供應鏈，未來 API 的使用條款、數據處理政策、合規框架，都可能受到這條業務線的規範要求影响。關注模型供應商的業務結構而不是只盯技術規格，會越來越重要。

---

## 其他值得關注

- **OpenAI 擴大與 AWS 合作，GPT-5.5 與 Codex 上線 Bedrock**：企業現在可以直接在 Amazon Bedrock 上调用 OpenAI 模型，並將 Codex 配置為使用 Bedrock 作為模型提供商。根據 OpenAI 官方說明，4 百萬人每週使用 Codex，主要場景從程式碼補全一路延伸到簡報與文件生成。這次合作讓有 AWS 採購承諾的企業可以在內部合規框架下直接啟用這些能力，而非繞過企業 IT 直接用消費版。

- **DeepSeek V4-Pro 優惠延長至 5 月 31 日**：2.5 折的價格優惠延期，意味著 DeepSeek 在 API 價格戰上仍處於主動进攻姿态。對成本敏感的開發團隊，這個時間窗口值得注意。

- **OpenClaw 2026.4.26 重構插件系統**：首次輸出時間從 1 秒降至 43 毫秒，啟動時間從 265 毫秒降至 8 毫秒。這個改動幅度對日常使用體驗的影響，比多數「模型更新」來得更直接。已安裝 OpenClaw 的使用者建議升級。

- **LiteLLM 修補 SQL 注入漏洞（CVE-2026-42208）**：受影響版本為 1.81.16 至 1.83.7，如果你是 LiteLLM Proxy 的管理者，請立即升級至 1.83.7-stable，並更換所有已暴露的 API 金鑰。攻擊者無需任何有效憑證即可讀取資料庫中的金鑰，這個漏洞的威脅程度不容輕視。

---

## 參考連結

- [Claude for Creative Work](https://www.anthropic.com/news/claude-for-creative-work)
- [螞蟻 Ling-2.6-flash（Hugging Face）](https://huggingface.co/inclusionAI/Ling-2.6-flash)
- [NVIDIA Nemotron 3 Nano Omni 官方部落格](https://developer.nvidia.com/blog/nvidia-nemotron-3-nano-omni-powers-multimodal-agent-reasoning-in-a-single-efficient-open-model/)
- [Google 與五角大廈合約（TechCrunch）](https://techcrunch.com/2026/04/28/google-expands-pentagons-access-to-its-ai-after-anthropics-refusal/)
- [OpenAI on AWS 官方公告](https://openai.com/index/openai-on-aws/)
- [OpenClaw v2026.4.26 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.4.26)