---
title: "【技術解析】用 MCTS 優化 Agent Skills：Anthropic 雙層優化框架的工程意義"
description: "一篇 NUS 與 UC Berkeley 合作的論文，用雙層優化框架與 MCTS 搜索演算法，系統性改善 LLM Agent 的技能模組設計。"
publishDate: "2026-04-22T10:00:00+08:00"
updatedDate: "2026-04-22T10:00:00+08:00"
tags: ["LLM Agent", "Monte Carlo Tree Search", "Anthropic", "Agent Skills"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-22-agent-skill-mcts-optimization.png"
  alt: "MCTS 搜索 Agent Skills 結構的示意圖"
---

## 這篇文章在說什麼

一篇由新加坡國立大學（NUS）與加州大學柏克萊分校（UC Berkeley）合作、2026 年 4 月中旬發表在 arXiv 的論文（arXiv:2604.15709），提出用**雙層優化（bilevel optimization）**框架來改善 LLM Agent 的技能模組（Agent Skills）設計。

論文的核心想法是：Agent 的 Skills（即附有指令、工具、輔助資源的結構化資料夾）對任務表現有決定性影響，但過去沒有系統性的優化方法。他們把 Skill 拆成「結構配置」與「內容填充」兩個子問題，外層用 Monte Carlo Tree Search（MCTS）搜索結構、內層則對固定結構做內容細調，兩層皆由 LLM 輔助。

在 Operations Research 問答資料集上的實驗顯示，優化後的 Skill 能顯著提升 Agent 任務表現。

---

## 背景脈絡

Anthropic 在 2025 年 12 月將 Agent Skills 開放為開放標準（agentskills.io），定義了以 `SKILL.md` 為核心的目錄結構——包含 YAML frontmatter（中繼資料）、Markdown 本體（給 Agent 看的指令）、以及 `scripts/`、`references/`、`assets/` 三個可選子目錄。這套規格後來被 SkillsBench 等 benchmark 證實：Skill 的品質會大幅影響 Agent 的下游表現，但效應因任務而異，高度不可預測。

然而，過去業界優化 Skill 的方式多停留在「人工試錯」——工程師根據觀察調整指令、用新 prompt 覆蓋舊 prompt，既沒有結構化搜索，也缺乏系統性評估。SkillsBench 的研究更指出，Skill 的設計缺陷（諸如資訊冗餘、context window 浪費、指令模糊）會直接導致 Agent 行為偏差。

這篇論文的切入點正是：能不能把 Skill 優化問題數學化、用演算法搜索取代人工經驗？

---

## 為什麼重要

這篇論文觸及的是 LLM Agent 部署中一個長期被忽略、但其實非常關鍵的問題：**Skill 的設計品質高度依賴人工，但回饋迴路極慢。**

現實中，開發者往往根據任務需求寫一個初版 Skill，然後觀察 Agent 的執行結果，再迭代修改。這種 loop 的問題在於：
1. 結構（要有哪些 subdirectory、要不要拆成 references/）和內容（指令怎麼寫、要用哪些工具）是**強耦合**的，改動一個會連帶影響另一個。
2. 評估信號（任務成敗）高度雜訊，單一任務失敗不代表 Skill 設計不良，單一成功也不代表 Skill 足夠好。
3. 離散、組合性的搜尋空間，讓窮舉或暴力搜索變得不可行。

論文提出的雙層框架，恰好對應這三個挑戰：外層 MCTS 處理結構搜索的組合爆炸、內層做內容細調、保守選擇規則（conservative selection rule）對抗雜訊。對 Agent 開發平台（Anthropic、OpenAI、LangChain 等）而言，這套框架如果可規模化，能直接成為「Skill Store」背後的自動化品質控制層。

---

## 技術細節

### 問題建模

論文將一個 Skill 建模為二元組 $S = (\theta, \phi)$：
- $\theta$：結構配置（structure），即 Skill 目錄包含哪些 components、以什麼方式組織
- $\phi$：內容填充（content），即在該結構下實際寫入的指令、腳本、參考文件

結構空間 $\Theta$ 是離散且組合性的；對每個固定 $\theta$，內容空間 $\Phi(\theta)$ 仍然極為龐大。這給出了自然的雙層公式：

$$\max_{\theta \in \Theta} \max_{\phi \in \Phi(\theta)} R_{S_0}(\theta, \phi)$$

其中 $R_{S_0}$ 是給定 Seed Skill $S_0$ 的下游任務表現評估分數，拘束於結構有效性（符合 agentskills.io specification）與 token budget（指令長度、整體目錄大小）。

### 外層：MCTS 結構搜索

MCTS 的四個步驟在這裡對應：

1. **Selection**：根據目前蒐集的統計量，選擇最有希望的結構節點往下擴展
2. **Expansion**：對選中節點提出候選結構編輯（admissible edit）
3. **Simulation（Evaluation）**：把候選結構交給內層做內容優化與下游評估，獲得 reward signal
4. **Backpropagation**：更新搜尋樹的統計量，引導後續 Exploration/Exploitation 取捨

之所以選 MCTS，是因為結構編輯具有**路徑依賴**性——先加 `references/` 目錄可能讓後續的章節拆分變得可行，反之亦然。樹狀結構能自然表達這種依賴，而 MCTS 的延遲評估特性讓它能在回饋訊號極度雜訊的環境下持續探索。

### 內層：內容細調

對每個候選結構 $\theta$，內層先初始化與 $\theta$ 對齊的內容 $\phi_0$，再透過**有限次數的改動嘗試**來細調。關鍵設計是：內層的 refinement family 會根據結構編輯的類型 dispatch 到對應的內容家族，而不是用單一 generic procedure 處理所有情況。這反映了結構與內容的高度耦合——在 `SKILL.md` 中加一個章節，可能需要對應修改 `scripts/` 中的處理邏輯，或在 `references/` 中補充說明文件。

所有 attempts 的 outcome 會用**保守選擇規則（conservative selection rule）**排名，取第一名連同 evaluation signal 回傳給外層。這個規則的設計是為了在 LLM 生成內容天然具有高變異性的情況下，盡量選到穩定的候選而非僥倖一次高分。

### LLM 輔助

外層的結構提議與內層的內容生成，兩個步驟皆由 LLM 協助。這呼應了近期多篇論文的趨勢——LLM 不只當推理引擎，也當優化搜尋的策略幫手（Yang et al., 2023）。

### 實驗設定

論文明確在**Operations Research Question Answering** 資料集上做評估（名稱細節需查閱原文），以優化後 Skill 配備的 Agent 任務表現為指標。實驗結果顯示雙層優化框架能顯著改善 Agent 表現，但論文尚未揭露完整的 benchmark 數字或與 baseline 的詳細對比。

---

## 跟既有做法相比

這篇論文的直接對手是 **AFlow**（Zhang et al., 2025），也是用 MCTS 優化 Agent  artifacts 的先驅。AFlow 把 workflow 優化建模成對 code-represented workflows 的搜索，強調迭代 refine 與執行回饋。

本文與 AFlow 的關鍵差異：

| 維度 | AFlow | 本文 |
|------|-------|------|
| 優化對象 | Code-represented workflows | Structured skill packages（指令 + 腳本 + 參考文件 + 資產） |
| 架構 | 單層 | 雙層（結構 / 內容分離） |
| 內層策略 | 統一 code-modification | 根據結構編輯類型 dispatch 到對應 refinement family |
| 選擇機制 | 貪心 / 啟發式 | 保守選擇規則 |

簡單說：AFlow 是「workflow 等價於程式碼」，本文是「Skill 是異質構件的組合，結構和內容要分開優化」。這個區分在實務上很重要——一個 `SKILL.md` 的指令文字和一支 `scripts/` 裡的 Python 脚本，修改邏輯完全不同，不能用同一套 code-modification procedure 處理。

---

## 我的觀點

這篇論文提出了一個重要的問題：LLM Agent 的「技能設計」能不能系統化、自動化？答案看起來是「可以，但代價不低」。

雙層 MCTS 框架的直覺很乾淨，但在實務上有一個根本的瓶頸：**每一步 evaluation 都要跑一次完整的下游任務**，才能得到有意義的 reward signal。這在研究設定下是可接受的（論文用 OR QA dataset），但要規模化到 production 環境中的多元任務，工程複雜度會大幅上升。

另外，論文的實驗僅在 OR QA 這一個 domain 上驗證，而 Skill 的表現在不同任務類型間差異極大（SkillsBench 已有數據支持）。從一個 dataset 的正向結果推論通用性，仍需要更多 cross-domain 驗證。

這個觀察的實際意義在於：Anthropic 的 Agent Skills 開放標準（agentskills.io）已經建立了目錄結構的 schema，這篇論文的框架恰好是對這個 schema 的自動化 Quality Assurance 機制。如果 Anthropic 或其生態系廠商（e.g., AWS Bedrock、Azure AI Agent Service）要打造「Skill Store」，這套雙層優化框架幾乎是必然的幕後基礎設施。

短期內，我認為這篇論文的方法論意義大於實務部署價值。它提供了一個框架，讓我們可以把「Skill 設計」從 art 变成 systematic search；具體的工程落地（怎麼規模化 evaluation、怎麼整合進 Agent 開發平台）還需要更多基礎設施投入。

---

## 參考連結

- [arXiv:2604.15709 - Bilevel Optimization of Agent Skills via Monte Carlo Tree Search](https://arxiv.org/abs/2604.15709)
- [Agent Skills Specification - agentskills.io](https://agentskills.io/specification)
- [Anthropic - Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [AFlow - Agentic Workflow Optimization via MCTS (Zhang et al., 2025)](https://arxiv.org/abs/2604.15509) （同作者團隊，相關工作）
- [SkillsBench - Agent Skill Generalization Benchmark (Li et al., 2026)](https://arxiv.org/abs/2604.15456)
