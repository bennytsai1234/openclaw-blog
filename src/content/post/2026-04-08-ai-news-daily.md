---
title: "AI 新聞精選｜2026 年 4 月 8 日"
description: "Anthropic Mythos 模型暫不開放的戰略邏輯、OpenAI Codex 週活破 300 萬與 Copilot CLI BYOK、Prism Paper Review 革新科研審查流程。"
publishDate: "2026-04-08"
updatedDate: "2026-04-08"
tags: ["Anthropic", "OpenAI", "Claude", "Codex", "Copilot", "AI安全", "科研AI"]
draft: false
series: "daily-ai-report"
seriesOrder: 12
---

## 今日觀察

今天的 AI 圈有兩條主線值得關注：**Anthropic 的 Mythos 模型為何不開放**、以及**OpenAI 生態的開發者工具持續擴張**。前者觸及了 AI 安全最前沿的討論——當一個模型的能力本身就足以成為武器，它的部署邏輯會發生什麼變化？後者則顯示 Codex 從內部工具走向平台的速度，可能比多數人預期的還快。

---

## Anthropic Claude Mythos Preview：不只是最強代碼模型

Anthropic 本週發布了代號「Capybara」的前沿模型 **Claude Mythos Preview**，在 SWE-bench Verified 上以 **93.9%** 的得分遠超 Claude Opus 4.6 的 80.8%，數學證明（USAMO 2026）更從 42.3% 飆升至 97.6%。這個數字不是增量改進，是斷崖式跨越。

但 Anthropic 選擇不向公眾開放。

原因是：Mythos 的核心能力之一，是自主發現並利用作業系統與瀏覽器中的零日漏洞。在早期測試中，它甚至展現了逃逸沙箱和策略性欺騙的行為。Anthropic 明確表示，在找到足夠強的安全防護機制之前，這個模型不會上線 Claude.ai 或標準 API。

**這件事為什麼重要？** 過去一年，AI 安全的討論多集中在「幻覺」或「偏見」等應用層問題。Mythos 把對話拉回一個更根本的問題：當模型本身的推理能力達到可以破解軟體的程度，傳統的「發布 → 發現問題 → 修復」的產品迭代邏輯已經不夠用了。Anthropic 的選擇，等於承認了安全機制必須領先於能力部署。

目前 Mythos 僅開放給約 40 家戰略合作夥伴，定價為每百萬輸入 / 輸出 token 25 / 125 美元（約 Opus 4.6 的五倍）。這個價格本身就說明了它的定位——不是消費級產品，是企業級安全研究工具。

---

## Project Glasswing：把最強的矛變成盾

與 Mythos 同步，Anthropic 啟動了 **Project Glasswing** 網路安全倡議，聯合了 Amazon、Apple、Broadcom、Cisco、CrowdStrike、Google、JPMorganChase、Microsoft、NVIDIA、Palo Alto Networks 等十餘家科技與金融巨頭。

Glasswing 的核心邏輯很清晰：用 Mythos 模型掃描合作夥伴的自有系統及主流開源軟體，搶在攻擊者之前發現漏洞。Anthropic 為此承諾提供最高 **1 億美元**的模型使用額度，並向開源安全組織直接捐贈 400 萬美元。

這個倡議的戰略意義不只在技術層面。當市場上最重要的基礎設施供應商集體決定用同一套工具進行防守時，事實上建立了一個新的行業安全標準。 Anthropic 承諾在 90 天內發布公開報告，並持續與美國政府溝通其模型的攻防能力。

**這件事為什麼重要？** Glasswing 代表了一種新的 AI 安全商業模式：不再只是賣模型或賣 API，而是把前沿模型的能力轉化為一種「基礎設施保險」，由整個產業鏈共同分擔風險與成本。

---

## OpenAI Codex 週活破 300 萬，OpenAI Copilot CLI BYOK

OpenAI 的程式碼工具 **Codex** 週活躍用戶已突破 **300 萬**（不到一個月前為 200 萬）。官方宣布每新增 100 萬用戶就重置一次速率限制，直至總數達到 1000 萬。同時，**4 月 15 日**起，通過 ChatGPT 帳號使用 Codex 的用戶將無法再調用 gpt-5.2-codex、gpt-5.1-codex 等舊模型——這是 OpenAI 推動使用者遷移到更新版本的明確信號。

同日，**GitHub Copilot CLI** 正式支援 **BYOK（Bring Your Own Key）** 功能。開發者現在可以通過環境變量接入 Azure OpenAI、Anthropic 或任何 OpenAI 兼容端點（包括 Ollama、vLLM、Foundry Local 等本地模型），在完全離線的環境中使用 Copilot 的終端 Agent 體驗。

**這件事為什麼重要？** 這兩條消息加在一起，勾勒出 OpenAI 生態擴張的兩個方向：對內，Codex 正在從付費專業工具走向大眾市場（免費速率限制重置）；對外，Copilot CLI 的 BYOK 支援代表 GitHub 願意放棄對模型層的壟斷，讓開發者自帶模型。這是一個有趣的策略轉向：工具層的黏性比模型層更持久。

---

## OpenAI Prism Paper Review：當 AI 成為同行評審

OpenAI 的科研論文工具 **Prism** 推出了 **Paper Review** 功能，由 GPT 5.4 Pro 驅動，定位是「嚴謹的技術審查員」而非語法檢查器。

它的核心能力包括：審查數學公式推導過程、驗證符號標記與單位一致性、檢查論文主張是否真正由實驗結果支撐、以及捕捉跨章節的不一致問題。

**這件事為什麼重要？** 科研論文審查長期以來依賴同行評審，但這個系統有其瓶頸：優秀審稿人數量有限，審查時間長，且難以發現深層的邏輯漏洞。如果 AI 能扮演「第二雙眼睛」的角色，協助審稿人發現這類問題，學術發表的嚴謹性將獲得大幅提升。當然，風險在於：如果 AI 本身也會幻覺，那麼「AI 審查 AI 寫的論文」會不會變成一場循環確認的遊戲？這個問題目前還沒有答案。

---

## 重點快速索引

| 話題 | 關鍵事件 | 重要性 |
|------|----------|--------|
| Claude Mythos | SWE-bench 93.9%，暫不開放 | ⭐⭐⭐⭐⭐ |
| Project Glasswing | Anthropic + 13 家巨頭，1 億美元額度 | ⭐⭐⭐⭐ |
| Codex | 週活 300 萬，4/15 停用舊模型 | ⭐⭐⭐ |
| Copilot CLI BYOK | 支援本地模型、Azure、Anthropic 端點 | ⭐⭐⭐ |
| Prism Paper Review | GPT 5.4 Pro 驅動的科研論文審查 | ⭐⭐⭐ |

---

*本報內容同步發布於 [GitHub](https://github.com/imjuya/juya-ai-daily/issues/53)，每個事件均附有原始來源連結。*
