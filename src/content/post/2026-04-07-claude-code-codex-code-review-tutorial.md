---
title: "【技術教學】AI 程式碼審查完全指南：Claude Code × Codex 雙劍合璧實戰"
description: "完整解析 OpenAI Codex 與 Anthropic Claude Code 的程式碼審查功能，從安裝設定到 CI/CD 整合，助你打造高效 AI 驅動的 Code Review 流程。"
publishDate: "2026-04-07"
updatedDate: "2026-04-07"
tags: ["AI", "Code Review", "Claude Code", "Codex", "開發工具", "CI/CD"]
draft: false
---

## 這篇文章在說什麼

AI 程式碼審查不再是科幻情節。2025-2026 年，OpenAI Codex 與 Anthropic Claude Code 相繼推出企業級自動審查功能，讓團隊能在 PR 合併前自動抓到臭蟲、安全漏洞、效能問題。本文從實戰角度出發，解析這兩套工具的核心能力、整合方式、價格模型，以及如何將它們無縫接軌進你的 Git 工作流程。

**適合誰看**：後端/前端工程師、Tech Lead、DevOps 工程師、想要用 AI 提升程式碼品質的開發團隊。

---

## 為什麼重要

手動 code review 是瓶頸。當團隊產出大幅成長——Anthropic 內部數據顯示過去一年 AI 輔助 coding 讓每位開發者產出增加 200%——傳統的雙人審查流程開始吃不消。工程師疲於應付大量 PR，審查品質下滑，臭蟲就這樣溜進 production。

AI code review 解決的不是「要不要審查」的問題，而是「如何在不犧牲品質的前提下加快審查速度」的問題。Codex 與 Claude Code 各自拿出不同策略：Codex 強調工作流整合的零摩擦，Claude Code 強調發現問題的準確度。

---

## 技術細節

### 一、OpenAI Codex CLI — 工作流內建的快速審查

#### 1.1 安裝與環境

Codex CLI 支援 macOS、Linux、Windows（建議用 WSL）。

```bash
# macOS / Linux
npm install -g @openai/codex

# Windows（建議用 WSL）
# 在 WSL 終端執行
npm install -g @openai/codex
```

> **注意**：Windows 原生模式的沙箱功能仍是實驗階段，程式碼放 Linux home 目錄（`~/projects/`）而非 `/mnt/c/` 效能最佳。

#### 1.2 `/review` 指令詳解

Codex CLI 的核心審查命令，在互動 session 內輸入 `/review` 即可叫出審查選單：

```
/review
```

Codex 提供四種審查模式：

| 模式 | 適用情境 |
|------|----------|
| **Review against a base branch** | 準備開 PR 前，全面審查與 main/develop 的差異 |
| **Review uncommitted changes** | 提交前檢查 staged + unstaged + untracked 所有變更 |
| **Review a commit** | 審查特定 commit 的 changeset |
| **Custom review instructions** | 自訂審查焦點（安全、效能、無障礙等） |

#### 1.3 自訂審查規則

可在 `~/.codex/config.toml` 指定專用審查模型：

```toml
# 審查專用模型，與一般對話模型分開
review_model = "gpt-5.2-codex"
```

自訂審查指令範例：

```bash
# 安全焦點審查
/review
# 輸入：Focus on SQL injection, XSS, and auth bypasses

# 效能審查
/review
# 輸入：Find N+1 queries and unnecessary database calls

# 測試覆蓋率審查
/review
# 輸入：Identify untested code paths and suggest test cases
```

#### 1.4 CI/CD 整合（GitHub Actions）

將 Codex 無痛嵌进 GitHub Actions：

**方式一：直接用 CLI**

```yaml
name: Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Codex
        run: npm install -g @openai/codex

      - name: Run Review
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          codex exec --json "Review the diff between origin/main and HEAD. Focus on security issues and code quality."
```

**方式二：用官方 GitHub Action**

```yaml
- uses: openai/codex-action@v1
  with:
    api-key: ${{ secrets.OPENAI_API_KEY }}
    command: review
```

#### 1.5 Codex Automations — 自動化背景審查

Codex 支援排程自動執行任務，可在專案閒置時自動掃描問題：

- **觸發條件**：可設定每小時/每日/每週執行
- **隔離環境**：Git repos 可選擇在 worktree 或本地專案執行
- **Skills 整合**：搭配自訂 skill 實現複雜自動化流程

---

### 二、Claude Code Review — 多代理人深度審查

#### 2.1 架構設計

Claude Code Review（2026 年 3 月推出）採用**多代理人平行分析架構**，是與 Codex 最大的差異：

```
PR 觸發
  ├── 邏輯錯誤 Agent（平行）
  ├── 安全性 Agent（平行）
  ├── 效能 Agent（平行）
  ├── 邊界 case Agent（平行）
  └── 驗證 Pass → 過濾假陽性 → 排名輸出
```

每個 Agent 同時分析同一份 diff，最後經過驗證步驟過濾誤報，才輸出最終結果。

#### 2.2 觸發方式

| 命令 | 行為 |
|------|------|
| `@claude review` | 開始審查，並訂閱後續 push 自動觸發審查 |
| `@claude review once` | 單次審查，不訂閱未來 push |

#### 2.3 嚴重性分級

| 等級 | 標記 | 意義 |
|------|------|------|
| **Important** | 🔴 | 必須在合併前修復的臭蟲 |
| **Nit** | 🟡 | 值得修但不阻擋的小問題 |
| **Pre-existing** | 🟣 | 原本就存在於 codebase、非本 PR 引進的問題 |

#### 2.4 設定流程（Organization 管理員）

1. 前往 [claude.ai/admin-settings/claude-code](https://claude.ai/admin-settings/claude-code)
2. 點擊 **Setup** → 安裝 Claude GitHub App
3. 選擇要啟用審查的 repositories
4. 設定觸發行為：

```
- Once after PR creation：PR 開啟時觸發一次
- After every push：每次 push 都觸發（成本最高）
- Manual：只在 comment `@claude review` 時觸發
```

#### 2.5 自訂審查規則（REVIEW.md）

在 repo 根目錄建立 `REVIEW.md`，Code Review 會自動讀取：

```markdown
# Code Review Guidelines

## Always check
- New API endpoints have corresponding integration tests
- Database migrations are backward-compatible
- Error messages don't leak internal details to users

## Style
- Prefer `match` statements over chained `isinstance` checks
- Use structured logging, not f-string interpolation

## Skip
- Generated files under `src/gen/`
- Formatting-only changes in `*.lock` files
```

#### 2.6 輸出格式

Claude Code Review 的輸出有兩個層面：

**1. Check Run 摘要**（可被 CI 讀取）：

```
🔴 Important  |  src/auth/session.ts:142  |  Token refresh races with logout
🟡 Nit        |  src/auth/session.ts:88   |  parseExpiry silently returns 0
```

用 `gh` 讀取機器可讀的摘要：

```bash
gh api repos/OWNER/REPO/check-runs/CHECK_RUN_ID \
  --jq '.output.text | split("bughunter-severity: ")[1] | split(" -->")[0] | fromjson'
# 輸出：{"normal": 2, "nit": 1, "pre_existing": 0}
```

**2. Inline Comments**：直接在 PR diff 的問題行上留言，方便對照程式碼審查。

---

### 三、Codex × Claude Code 雙軌並行策略

#### 3.1 比較總覽

| 維度 | OpenAI Codex | Claude Code Review |
|------|-------------|-------------------|
| 審查架構 | 單一對話式模型 | 多代理人平行分析 |
| 假陽性率 | 無公開 benchmark | <1%（Anthropic 官方數據）|
| GitHub 整合 | 原生（@codex review）| VS Code / JetBrains 擴充 |
| GitLab 整合 | 有限 | 支援（一般模式）|
| 定價 | 訂閱制含括（ChatGPT Plus $20/月起）| 按次計費（$15-25/審查）|
| 可用平台 | macOS 桌面 App、CLI | Web、VS Code、JetBrains、CLI |
| 資料保留 | 未說明 | **不支援 Zero Data Retention** |

#### 3.2 混合使用建議

```
日常小 PR  → Codex（速度快，訂閱內含，零額外成本）
重大功能 PR → Claude Code Review（深度分析，假陽性低）
安全相關   → 兩者都跑（互補盲點）
```

#### 3.3 實測效能數據

| Benchmark | Claude Code | Codex |
|-----------|------------|-------|
| HumanEval | **92%** | 90.2% |
| SWE-bench | **72.7%** | 69.1% |
| SWE-bench Verified（1M token）| **80.8%** | N/A |

---

### 四、整合實戰流程

#### 4.1 個人開發者最佳流程

```bash
# 1. 開始新功能
cd ~/projects/myapp
codex

# 在 Codex 內：寫 code → /review → 對比 base branch
/review
# 選擇：Review against a base branch → main

# 2. 確認無問題後 commit
git add -A
git commit -m "feat: feature with reviewed changes"

# 3. 推送並在 GitHub 開 PR
git push origin feature-branch

# 4. 若為重大變更，在 PR comment 手動觸發 Claude 深度審查
# @claude review once
```

#### 4.2 團隊 CI/CD 完整 pipeline

```yaml
# .github/workflows/code-review.yml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  # 快速審查：每次 push 都跑（Codex）
  codex-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Install Codex
        run: npm install -g @openai/codex
      - name: Run Codex Review
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: codex exec --json "/review"

  # 深度審查：只在標籤或特定條件觸發（Claude）
  claude-deep-review:
    if: contains(github.event.pull_request.labels.*.name, 'needs-deep-review')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Claude Code Review 透過 GitHub App 自動觸發
      # 此處只需確保 checkout 乾淨
```

---

### 五、已知限制與雷區

#### Codex
- **使用量上限不明**：用戶反映很快就撞到獨立的 Code Review 上限，但官方文件語焉不詳
- **macOS 桌面 App 限制**：桌面 App 僅 macOS 可用，CLI 全平台支援但功能略有差異
- **偶發 Script exited with code 1**：@codex review 有時會無故失敗

#### Claude Code Review
- **Research Preview 階段**：2026 年 3 月才推出，真實世界可靠性數據不足
- **不支援 Zero Data Retention**：金融、醫療等監管產業需注意資料治理
- **Team/Enterprise 限定**：個人用戶無法使用
- **GitLab 多代理人審查尚未確認**：一般模式支援 GitLab CI，但新功能是否支援待驗證

---

## 我的觀點

這兩套工具代表不同的哲學：Codex 把 AI 審查當成開發流程的自然延伸，強調「零摩擦、隨時可用」；Claude Code Review 把 AI 審查當成高紀律的品質關卡，強調「發現就要有意義，寧缺勿濫」。

**Codex 更適合**：小型團隊、預算有限、已經深度使用 GitHub 的專案。  
**Claude Code Review 更適合**：中大型團隊、程式碼品質要求高的 production 系統、願意為深度分析付費的企業。

兩者並非互斥。我自己會用 Codex 做即時的 pull request 內對話，解決「這個 function 怎麼改比較好」這類問題；用 Claude Code Review 做正式 merge 前的把關，確保沒有邏輯漏洞。

**最大的盲點**：兩者都把程式碼送到外部基礎設施處理。任何有資料主權需求的團隊，在啟用前都應該仔細評估合規風險。

---

## 參考連結

- [Codex App - Automations](https://developers.openai.com/codex/app/automations) — OpenAI 官方
- [Claude Code Review 文件](https://code.claude.com/docs/en/code-review) — Anthropic 官方
- [How to Use Codex CLI for Code Review](https://inventivehq.com/knowledge-base/openai/how-to-use-codex-for-code-review) — Inventive HQ
- [Codex Code Review vs Claude Code: AI Code Review Comparison](https://dev.to/mcrolly/codex-code-review-vs-claude-code-ai-code-review-comparison-58jk) — DEV Community
- [OpenAI Codex Pricing](https://developers.openai.com/codex) — 官方定價頁
