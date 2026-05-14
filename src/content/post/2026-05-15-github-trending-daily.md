---
title: "【熱門專案】2026-05-15 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：Kronos 金融時序模型、gstack 單人工程師量產工具、科學 Agent 技能庫、NVIDIA 影片分析藍圖"
publishDate: "2026-05-15T07:30:00+08:00"
updatedDate: "2026-05-15T07:30:00+08:00"
tags: ["Kronos", "Claude Code", "Agent Skills", "NVIDIA NIM", "金融AI"]
coverImage:
  src: "@/assets/post-covers/2026-05-15-github-trending-daily.png"
  alt: "GitHub 熱門專案 2026-05-15"
draft: false
---

過去這一年，開源社群有個很清晰的趨勢：基礎模型從通用走向垂直，單人工程師的產出邊界正被大幅推高。本日 GitHub Trending 有四個專案正好從不同維度體現了這個方向——金融時序、影片智慧、智慧體技能庫，以及一個 YC 總裁本人親自分享的「一人艦隊」工具鏈。

## shiyu-coder/Kronos

[Kronos](https://github.com/shiyu-coder/Kronos) 是第一個開源金融 K 線語言基礎模型，2025 年 8 月發表論文，2025 年 11 月被 AAAI 2026 接受。團隊從 45 個全球交易所匯出 K 線資料（OHLCV）訓練，核心創新在於兩階段架構：首先用專屬 tokenizer 把連續、多維的 K 線資料量化為離散 token 序列，接著以此訓練一個 decoder-only 的 Transformer，解決金融資料高噪音、非正規分佈的特性。

模型族從 4.1M 參數的 Kronos-mini 到 499M 的 Kronos-large，開放開源的有 mini / small / base 三個規模，全部發布在 Hugging Face。Kronos-small 僅 24.7M 參數，在 512 長度的 context window 內表現已經能與大型時序模型比拚。實際用起來只需要準備含 open / high / low / close、volume 的 DataFrame，呼叫 `KronosPredictor` 就能得到未來 N 根 K 線的機率預測。對有量化交易需求的工程師來說，這是目前少數能直接整合進 Python 流水線的開源金融 LLM。

## NVIDIA-AI-Blueprints/video-search-and-summarization

[NVIDIA AI Blueprints for Video Search and Summarization（VSS）](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization)是 NVIDIA 針對視覺智慧體的參考架構，結合了 NIM 微服務、Vision Language Models（VLM）與 LLM，支援即時影片串流處理、歷史影片語意搜尋、異常 Alert 驗證、以及長影片分塊摘要。底層模型包括 Cosmos-Reason2-8B 與 Nemotron-Nano-9B-v2，透過 Model Context Protocol（MCP）統一對外暴露工具介面。

這個藍圖解決的問題很實際：過去企業想建一套影片分析流程，要自己串接 embedding 服務、VLM 推理、訊息中介層，門檻極高。VSS 把這整條 pipeline 包成可部署的 Docker Compose 棧，支援 Q&A、Alert 驗證、長期錄影摘要等五種工作流，且全部對接到 NVIDIA build 平台。唯一限制是本地部署需要 NVIDIA AI Enterprise 授權，否則要走 NGC API catalog。

## garrytan/gstack

[gstack](https://github.com/garrytan/gstack)是 Y Combinator 總裁 Garry Tan 在聽完 Andrej Karpathy 說出「我大概從去年 12 月開始就沒打過幾行程式碼」之後，花時間把自己與 Claude Code 的協作方式開源的產物。本質上它把一個 AI 程式設計工具武裝成一支虛擬團隊：CEO（產品方向）、Eng Manager（架構把關）、Designer（過濾 AI 生圖的粗糙感）、QA（開瀏覽器真實測試）、Security Officer（OWASP + STRIDE 審計）、Release Manager（發 PR）。

23 個斜線指令，涵蓋 /office-hours、/plan-ceo-review、/review、/qa、/ship、/land-and-deploy 等完整生命週期。安裝方式很簡單：`git clone` 到 ~/.claude/skills/gstack，執行 ./setup，給 CLAUDE.md 加幾行設定。Garry Tan 自己的數據更有說服力：2026 年到目前為止，他的 logical code change 是 2013 年的 240 倍——不是 LOK 灌水，是 normalize 之後的實質交付量。對於已經在用 Claude Code 的工程師，這套框架能把「和 AI 對話」升級成「管理一支 AI team」。

## K-Dense-AI/scientific-agent-skills

[K-Dense Scientific Agent Skills](https://github.com/K-Dense-AI/scientific-agent-skills)前身是 Claude Scientific Skills，現在改名是因為它已脫離單一 AI 平台的綁定，改走 [agentskills.io](https://agentskills.io/) 開放標準，能用在 Cursor、Claude Code、Codex 等任何支援該標準的智慧體上。

收藏了 135 個可立即使用的科學研究技能，覆蓋癌症基因體學、藥物發現、單細胞 RNA-seq、分子對接、LC-MS/MS 蛋白質分析、EHR 醫療資料處理、DICOM 醫學影像、 時間序列預測、地理空間分析、乃至於實驗室自動化等十幾個領域。每個 skill 都是獨立的 SKILL.md 文件，含文件、範例、最佳實踐。對研究中想引入 AI 輔助但不知道從哪裡下手的生科 / 化學 / 醫工背景研究人員，這是目前覆蓋最廣的開源技能庫。

他們同步開源了 [K-Dense BYOK](https://github.com/K-Dense-AI/k-dense-byok)，一個免費桌面 AI 共同科學家，支援 40+ 模型，資料完全留在本地，還可以 scale 到 Modal 做重型計算。

## 結語

今天 Trending 的四個專案湊在一起，剛好構成一條隱藏主線：「垂直基礎模型 + 高生產力工具鏈 + 領域專家技能庫」，這三層正在重構軟體開發與科學研究的生產邊界。金融時序有 Kronos、影片理解有 NVIDIA VSS、工程產出有 gstack、科研探索有 Scientific Agent Skills——每一層都有開源選手在搶佔位置，而且切入點都是降低實際應用門檻，而不是炫技。

## 參考連結

- [Kronos 論文 (arXiv:2508.02739)](https://arxiv.org/abs/2508.02739)
- [Kronos 官網](https://shiyu-coder.github.io/Kronos-demo/)
- [NVIDIA VSS 官方文件](https://docs.nvidia.com/vss/3.1.0/index.html)
- [gstack GitHub](https://github.com/garrytan/gstack)
- [Scientific Agent Skills](https://github.com/K-Dense-AI/scientific-agent-skills)
- [K-Dense BYOK](https://github.com/K-Dense-AI/k-dense-byok)
- [agentskills.io 標準](https://agentskills.io/)