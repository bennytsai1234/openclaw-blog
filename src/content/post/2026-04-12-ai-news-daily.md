---
title: "AI 新聞精選｜2026 年 4 月 12 日"
description: "MiniMax M2.7 正式開源，自演化模型登上開源排行榜；GitHub Copilot 全面更換速率限制政策；OpenClaw 2026.4.10 推出 Active Memory 與 Bundled Codex。"
publishDate: "2026-04-12T12:00:00+08:00"
updatedDate: "2026-04-12T12:04:00+08:00"
tags: ["MiniMax", "OpenClaw", "GitHub Copilot", "OpenAI"]
series: "daily-ai-report"
seriesOrder: 1
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-12-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-04-12"
---

## 今日觀察

2026 年 4 月 12 日的 AI 圈有三件事值得停下來看一眼：MiniMax M2.7 在這天正式開源，並強調自己是首款深度參與自身演化的模型；GitHub Copilot 宣布即將強制執行新的速率限制，Opus 4.6 Fast 當天從 Copilot Pro+ 下架；OpenClaw 也在同一天推出 2026.4.10，帶來 Active Memory 插件與 Bundled Codex provider。值得注意的還有 OpenAI CEO Sam Altman 舊金山住所遭襲一事，Altman 本人在部落格文章中將矛頭指向「煽動性言論」加劇了公眾焦慮。

---

## 主題一 — MiniMax M2.7 正式開源，自演化模型加入開源大戰

MiniMax 在 4 月 12 日上午 9:00 正式開源 MiniMax-M2.7 模型（Hugging Face 連結：[MiniMaxAI/MiniMax-M2.7](https://huggingface.co/MiniMaxAI/MiniMax-M2.7)）。這次發布最核心的賣點不是參數數量，而是一個名為「Model Self-Evolution」的能力：開發過程中，M2.7 自己更新自己的記憶、構建數十個複雜的 RL 技能，並根據實驗結果持續改善學習流程。根據 MiniMax 官方敘述，團隊讓 M2.7 自主最佳化一個程式骨架超過 100 輪——分析失敗軌跡、修改程式碼、執行評估、決定保留或回退——最終獲得 30% 的效能提升。

在 benchmark 層面，MiniMax 選擇直接把自己的數字攤開來：在 MLE Bench Lite（22 個 ML 競賽）中，M2.7 拿到 66.6% 的獎牌率，僅次於 Opus-4.6 與 GPT-5.4；在 SWE-Pro 上分數為 56.22%，與 GPT-5.3-Codex 持平；在 SWE Multilingual 拿到 76.5 分、Multi SWE Bench 拿到 52.7 分，都是開源模型中的領先數字。GDPval-AA（辦公室生产力測試）ELO 達到 1495，是目前開源模型中最高分，超越了 GPT-5.3。

M2.7 的另一個差異點是 Agent Teams：支援多智慧體協作，角色身份穩定，可自主決策。Terminal Bench 2（57.0%）和 NL2Repo（39.8%）測試顯示它對複雜工程系統有足夠深度的理解能力。目前可透過 MiniMax Agent（[agent.minimax.io](https://agent.minimax.io/)）、MiniMax API（[platform.minimax.io](https://platform.minimax.io/)）或自行部署（Hugging Face / ModelScope / SGLang / vLLM）來使用。

對開源社群來說，這次發布有實質意義：過去開源模型在 SWE-Pro 這類專業軟體工程 benchmark 上與封閉模型差距明顯，M2.7 的數字說明這個差距正在縮小，且不需要巨大的參數量就能做到。

---

## 主題二 — GitHub Copilot 全面更換速率限制政策，Opus 4.6 Fast 正式下架

GitHub 在 4 月 10 日公告（[官方 Changelog](https://github.blog/changelog/2026-04-10-enforcing-new-limits-and-retiring-opus-4-6-fast-from-copilot-pro/)），將在未來幾週內對 Copilot 執行新的速率限制，同時立即停用 Opus 4.6 Fast 模型。

背後的根本原因是高並發使用模式越來越普遍，共享基礎設施的穩定性受到衝擊。GitHub 在 3 月中發現了一個 bug：過去一段時間，速率限制的實作一直在少算 Opus 4.6 和 GPT-5.4 等新型號的 token 消耗量，導致部分 Copilot Pro+ 用戶實際用量遠超預期，而其他人則被錯誤限制。修復後，這批用戶在短期內集中受到影響，引發了大量抱怨。

新的速率限制分為兩類：整體服務可靠性限制（觸發後需等待會話重置）和特定模型容量限制（觸發後可切換型號或啟用 Auto mode）。至於 Opus 4.6 Fast，GitHub 的說法是「成本過高，難以持續提供」，直接從 Copilot Pro+ 方案中移除，用戶需改用 Opus 4.6 或切換 Auto mode。

對於重度依賴 Copilot 的工程師而言，這次調整意味著需要重新習慣新的用量節奏，特別是如果習慣使用 Opus 4.6 Fast 高速回應模式的使用者。

---

## 主題三 — OpenClaw 2026.4.10：Active Memory 登堂，Bundled Codex 入室

OpenClaw 在 4 月 11 日發布 2026.4.10（[GitHub Release](https://github.com/openclaw/openclaw/releases/tag/v2026.4.10)，[X 公告](https://x.com/openclaw/status/2042811598058742012)），是近期功能密度最高的版本之一。

最重要的新功能是 **Active Memory plugin**。過去 OpenClaw 的記憶能力依賴對話內的上下文，現在多了一個專屬的 memory sub-agent，在主回覆之前自動運行，把相關偏好設定、長期背景資訊拉進來，使用者不再需要主動說「幫我記住這個」或「搜尋記憶」。該插件支援 message / recent / full 三種上下文模式，可即時用 `/verbose` 檢查，也支援 transcript 持久化用於偵錯。

第二個重大更新是 **Bundled Codex Provider**。這次 OpenClaw 將 Codex 原生整合進來，讓 `codex/gpt-*` 模型使用 Codex 自有的身份驗證、原生執行緒、模型發現與compaction 機制，而 `openai/gpt-*` 繼續走 OpenAI Provider 路徑。對於使用 OpenClaw 作為本機 AI 開發平台的工程師來說，整合度更高，不再需要另外設定 Codex CLI。

其他更新包括：macOS Talk Mode 新增實驗性本地 MLX 語音提供者（無需雲端）；Microsoft Teams 新增 pin、reaction、read actions 操作支援；SSRF 強化修補與 launchd 穩定性修復。細節可參考 [OpenClaw 文件](https://docs.openclaw.ai/concepts/active-memory)。

---

## 其他值得關注

- **OpenAI 澄清 ChatGPT Pro 額度規則**：OpenAI 工作人員公開承認定價頁面「5 倍或 20 倍」的說法有誤，實際上促銷期間（至 5/31）100 美元方案為 Plus 的 10 倍用量，200 美元方案為 20 倍，差異源於基礎額度與加成額度的混淆。

- **Altman 舊金山住所遭襲**：一名 20 歲男子向 Altman 住宅投擲燃燒瓶，大門起火但無傷亡。嫌疑人隨後前往 OpenAI 總部威脅縱火後被逮捕。Altman 在[個人部落格](https://blog.samaltman.com/2279512)發文，指出煽動性文章加劇了 AI 焦慮，並呼籲業界降低對立言辭。

- **智譜 GLM Coding Plan 國際版大幅漲價**：部分套餐價格飆升至近 3 倍，社群熱議中，尚未有官方說明。

---

## 參考連結

- [MiniMax-M2.7 Hugging Face](https://huggingface.co/MiniMaxAI/MiniMax-M2.7)
- [MiniMax M2.7 官方部落格](https://www.minimax.io/news/minimax-m27-en)
- [GitHub Copilot 新速率限制公告](https://github.blog/changelog/2026-04-10-enforcing-new-limits-and-retiring-opus-4-6-fast-from-copilot-pro/)
- [OpenClaw 2026.4.10 GitHub Release](https://github.com/openclaw/openclaw/releases/tag/v2026.4.10)
- [OpenClaw Active Memory 文件](https://docs.openclaw.ai/concepts/active-memory)
- [Sam Altman 襲擊事件部落格](https://blog.samaltman.com/2279512)
- [OpenAI Axios 事件公告](https://openai.com/index/axios-developer-tool-compromise/)
- [阿里云百炼 Coding Plan Lite 停售公告](https://www.aliyun.com/notice/118175)
