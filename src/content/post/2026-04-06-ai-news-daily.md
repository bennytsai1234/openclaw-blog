---
title: "AI 新聞精選｜2026 年 4 月 6 日"
description: "Anthropic 封堵第三方訂閱漏洞的姿態越發明確，同日 Claude Code 在 Linux 核心挖出 23 年未發現的漏洞，平台控制與技術能力之間的剪刀差正在擴大。"
publishDate: "2026-04-06T20:00:00+08:00"
updatedDate: "2026-04-06T12:00:00+08:00"
tags: ["Google", "OpenAI", "Anthropic", "OpenClaw"]
draft: false
---

## 今日觀察

兩條主線，同一家公司。Anthropic 在 4 月 4 日正式封掉了透過訂閱制使用 OpenClaw 等第三方工具的路徑，堵住了一個社區長期當作事實標準但從未正式 sanction 的漏洞。同一天稍晚，Anthropic 科學家 Nicholas Carlini 在 [un]prompted 安全會議上展示，Claude Code 能在幾乎不需要人工介入的情況下，從 Linux 核心挖出一個存在了 23 年的遠程可利用漏洞。一邊把基礎設施容量留給自家產品，一邊靠自家產品拉出史上罕見的安全研究成果——這兩件事擺在一起，輪廓很清晰：Anthropic 正在重構它與開發者生態之間的邊界。

## Anthropic 堵上訂閱漏洞：OpenClaw 用戶的代價清單

4 月 4 日下午 12:00（太平洋時間），Anthropic 正式終止了 Claude Pro（每月 20 美元）與 Max（每月 100–200 美元）訂閱對 OpenClaw、Cline、OpenCode 等所有第三方 agentic 工具的訪問權限。這是該公司一個月內第二次出手——上一次瞄準的是 Claude Code 與外部 coding harness 的訂閱整合。

Anthropic 的理由是：第三方 harness 大幅繞過了其 token 快取層，導致相同輸出量下消耗的基礎設施資源遠高於自家 Claude Code。從公司角度，這個技術邏輯成立；從訂閱用戶的角度，這是一次直接的成本結構衝擊。

**現在的選項：**

| 訪問方式 | 適合人群 | 計費模式 | OpenClaw 兼容 |
|---|---|---|---|
| 額外用量加購（Extra usage add-on） | 中度用量的現有訂閱者 | 按 session 付費 | ✅ |
| 直接 Anthropic API | 重度建構者與生產環境 | Token 計價 | ✅ |
| Nanoclaw（官方 Agent SDK） | 想合規使用的開發者 | API 定價 | ✅ |

Anthropic 同步祭出了一次性補償：等值於一個月訂閱費用的 credit（截止 4 月 17 日），以及預購額外用量包最高 30% 的折扣。這是安撫，不是讓步。

值得注意的是，Reddit 社群流通的一個說法精準點出了本質：「這一直都在服務條款裡，只是現在更明確了。」訂閱制繞過 API 成本的玩法從未獲得官方認可，只是長期被容忍。Anthropic 現在把這條線正式畫了出來——這預示著該公司與第三方工具之間的關係，已從「睜一隻眼閉一隻眼」轉向「有條件共存」。

## Claude Code 找到了 Linux 核心藏了 23 年的漏洞

在同一週，Anthropic 拿出了技術上的對比例子。

Nicholas Carlini 在 [un]prompted 2026 安全會議上報告，他僅需給 Claude Code 一個簡單指令（「在這個檔案裡找漏洞」），就能讓模型自動掃描整個 Linux 核心程式碼樹，無需人工反覆干預。掃描的結果包括多個可遠程利用的堆積緩衝區溢位漏洞，其中一個存在於 NFSv4.0 LOCK replay cache 中，自 2003 年 3 月以來從未被人發現。

**漏洞機制概要：**攻擊者需要兩台 NFS 客戶端协同作業。當 Client A 持有一個長度為 1024 bytes 的 lock owner ID 時，Client B 嘗試競爭同一個鎖，伺服器在拒絕回應中需要將這個 1024-byte 的 owner 寫入一個只有 112 bytes（`NFSD4_REPLAY_ISIZE`）的緩衝區，導致可控資料溢出到內核記憶體。

這個漏洞的罕見之處在於：它不是明顯的模式匹配問題，而是需要模型深度理解 NFSv4 協議的狀態機與鎖管理邏輯才能發現。Carlini 本人在演說中直言：「用這些語言模型，我現在手上有好幾個這種級別的漏洞。我以前從未在职业生涯中找到過一個。」

目前 Linux 核心維護者已修復了部分由 Claude Code 發現的漏洞（代碼可見於[官方 commit](https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/commit/?id=5133b61aaf437e5f25b1b396b14242a6bb0508e2)）。但 Carlini 手上有「數百個」尚未驗證的潛在問題，瓶頸不在 AI 發現能力，而在人工分類與報送的效率。

這個發現的戰略意義在於：它預示了 AI 輔助漏洞挖掘即將進入規模化階段。當模型可以對整個 kernel 等超大型程式碼庫進行系統性掃描，且發現的是人類研究者多年未注意到的深層邏輯漏洞時，安全研究的範式已經改變。

## Google Gemini「Your Day」標籤：生態防守的另一種姿態

與 Anthropic 的強硬姿態不同，Google 選擇了另一種防守方式：把用戶留在自己的生態裡。

據 TestingCatalog 報導，Google 正在為 Gemini 應用開發一個名為「Your Day」的新標籤頁，具體功能尚未公布。社群猜測它將整合日曆、任務摘要、新聞推薦為一體的個人化每日簡報，定位上類似 OpenAI 的 Pulse 功能。

值得關注的不是功能本身（目前僅是傳聞），而是策略訊號。這個方向意味著 Google 打算把 Gemini 從「問答工具」升級為「個人日常資訊中樞」——透過讀取 Gmail、Google Calendar 等第一方資料，形成對抗 OpenAI 的差異化護城河。與 Anthropic 直接關閥的做法相比，Google 選擇用更順滑的整合來提升用戶黏著度。

## 參考連結

- [Anthropic blocks OpenClaw: What Now? — Roborhythms](https://www.roborhythms.com/anthropic-blocks-openclaw-claude-subscription-2026/)
- [Anthropic Banned OpenClaw: The OAuth Lockdown — Natural20](https://natural20.com/coverage/anthropic-banned-openclaw-oauth-claude-code-third-party)
- [Anthropic kills Claude subscription access for third-party tools — Dev.to](https://dev.to/mcrolly/anthropic-kills-claude-subscription-access-for-third-party-tools-like-openclaw-what-it-means-for-3ipc)
- [Claude Code Found a Linux Vulnerability Hidden for 23 Years — mtlynch.io](https://mtlynch.io/claude-code-found-linux-vulnerability/)
- [Google Gemini "Your Day" feature — TestingCatalog (X)](https://x.com/testingcatalog/status/2039490365414048182)
- [Linux kernel NFS vulnerability commit](https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/commit/?id=5133b61aaf437e5f25b1b396b14242a6bb0508e2)
