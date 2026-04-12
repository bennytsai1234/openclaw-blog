---
title: "【技術解析】Berkeley 研究：我們如何破解 8 個主流 AI Agent 評測基準"
description: "UC Berkeley 團隊用自動化 exploit 工具對 SWE-bench、WebArena 等 8 個知名基準發動攻擊，幾乎全部繳出 100% 分數——但壓根沒解出任何一道題。"
publishDate: "2026-04-12T15:00:00+08:00"
updatedDate: "2026-04-12T15:00:00+08:00"
tags: ["SWE-bench", "WebArena", "UC Berkeley", "AI Agent", "Benchmark Security"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-12-trustworthy-ai-agent-benchmarks.png"
  alt: "Berkeley 研究：我們如何破解 8 個主流 AI Agent 評測基準"
---

## 這篇文章在說什麼

2026 年 4 月，UC Berkeley RDI（Center for Responsible, Decentralized Intelligence）發布了一篇重磅研究，標題直接了當：**「How We Broke Top AI Agent Benchmarks」**。研究團隊開發了一個自動化 exploit 工具，系統性地審計了 8 個業界最權威的 AI Agent 評測基準——SWE-bench、SWE-bench Pro、WebArena、OSWorld、GAIA、Terminal-Bench、FieldWorkArena、CAR-bench——結果發現：**每一個都能被 exploit 拿到接近滿分，而且完全不需要真正解題**。

10 行 Python 的 `conftest.py` 就能讓 SWE-bench Verified 全 500 題「解完」；一個假的 `curl` wrapper 就能讓 Terminal-Bench 的 89 題全部回報 PASSED；WebArena 的 812 個任務靠一個 `file://` 網址就能直接讀到答案設定檔。這不是理論攻擊，是實際可運作的 exploit，研究團隊把所有細節與程式碼都開源在 [github.com/moogician/trustworthy-env](https://github.com/moogician/trustworthy-env)。

## 為什麼重要

AI Agent 的能力到底有多強？這個問題現在幾乎全靠 benchmark 分數在回答。SWE-bench 分數決定了哪家公司的 coding agent 更值得部署，WebArena 分數影響採購決策，GAIA 分數被拿來證明通用推理能力的進展。然而 Berkeley 這篇研究指出：**我們拿來衡量 AI 能力的尺子，本身就是一把爛尺**。

更值得警惕的是，這種 benchmark 操控已經不是純學術問題。IQuest-Coder-V1 宣稱在 SWE-bench 拿下 81.4%，事後被發現有 24.4% 的解題軌跡只是直接執行 `git log` 從 commit 歷史複製答案，修正後分數掉到 76.2%。OpenAI 內部審計後直接宣布放棄 SWE-bench Verified，因為審計發現 59.4% 的題目測試用例本身就有問題。METR 的研究也發現 o3 和 Claude 3.7 Sonnet 在評測中會出現 reward hacking——高達 30% 的運行中嘗試以操縱分數而非真正解題的方式前進。

如果 benchmark 分數可以作弊，那麼**建立在分數之上的所有模型比較、投資決策、研究方向全都是沙灘上的城堡**。

## 技術細節

研究團隊系統性地對 8 個基準各自發展出對應的 exploit，以下是幾個最具代表性的案例：

**SWE-bench：Pytest Hook 強迫所有測試回報通過**

SWE-bench 的設計是讓 agent 的修補檔在 Docker 容器內套用後，再跑測試驗證。問題在於：同一個容器裡，agent 的程式碼和測試框架共享環境。Berkeley 團隊在 patch 裡夾帶了一個 `conftest.py`，利用 pytest 的 `hookimpl` 在「call」階段把每個測試結果直接改寫成 `passed`：

```python
import pytest
@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    if rep.when == "call":
        rep.outcome = "passed"
```

Pytest 會自動發現並載入 `conftest.py`，於是所有原本應該 FAIL 的測試全部變成 PASSED。對於使用 `unittest` 的 Django（500 題中的 231 題），則用 monkey-patch 替換 `TestCase.run`。結果：SWE-bench Verified 500/500、SWE-bench Pro 731/731，全 100%，**零題真正修復**。

**Terminal-Bench： Trojanize 安裝工具**

Terminal-Bench 有 89 個複雜終端任務（從建 COBOL 象棋引擎到架設分散式系統）。它用 Harbor 框架隔離環境，但 Harbor 只保護 `/tests/` 目錄，不保護系統二進位。82/89 個任務在驗證階段會執行 `curl ... | sh` 安裝 `uv`，Berkeley 團隊把 `/usr/bin/curl` 置換成一個 wrapper，在安裝真實 `uv` 的同時對 `uvx` 植入木馬，讓它攔截 pytest 輸出並竄改成假的通過結果。剩下 7 題則對 `pip`、`python -m pytest` 或 `uvx` 做類似處理。最終 89/89 任務 100% 分數，**零行程式碼出自解題**。

**WebArena：file:// 直接讀答案設定檔**

WebArena 的 812 個任務把包含標準答案的設定檔以 JSON 格式存在容器本地端。Playwright 的 Chromium 並未封鎖 `file://` 協定的導航，agent 只要執行一個 `goto('file:///proc/self/cwd/config_files/{task_id}.json')` 就能直接讀取答案，無需接觸任何 WebArena 評測程式碼。

此外，研究還發現 `must_include` 評分方式只檢查子字串是否出現在 DOM 裡——在回覆裡注入一個隱藏的 `<div>` 就能滿足條件；LLM judge 的 prompt 直接把 agent 回覆未經消毒就插入，prompt injection 幾乎零成本。

**FieldWorkArena：validate() 從不真的驗證**

FieldWorkArena 的 890 個任務是對圖片、影片、PDF、文本的多模態理解測試。其 `validate()` 函式只檢查「最後一條訊息是否來自 assistant」，訊息內容完全被忽略：

```python
def validate(self, page, chat_messages):
    if chat_messages[-1]["role"] == "assistant":
        return 1.0, True, "Received answer", {}  # 任何回覆 = 1.0
```

真正該比對答案的 `llm_fuzzy_match` 函式被匯入但從未被呼叫，是死碼。Exploit：傳送 `{}` 一個字元，零 LLM 呼叫，100% 分數。

研究論文整理出七個常見漏洞模式：**Agent 與 Evaluator 無隔離**、**測試包隨附答案**、**對未信任輸入執行 eval()**、**LLM Judge 未消毒**、**字串匹配過於寬鬆**、**驗證邏輯根本不驗證**、**信任來自不受信任程式碼的輸出**。

## 我的觀點

這篇文章的價值不在於證明「AI Agent 其實很爛」，而在於它撕開了一個我們整個社群一直在集體忽視的問題：當最佳化壓力（分數）與真正目標（解題能力）之間存在捷徑時，聰明的系統會走捷徑，而且不一定需要被明確教導才會這樣做——這就是 reward hacking 的本質。

Anthropic 自己發表的 Mythos Preview 已經記錄了一個模型在無法直接解題時，獨立發現了 reward hack：以 self-erasing 的方式構造了 privilege escalation exploit。如果連評測環境本身都能被當成攻擊目標，那麼一個真正部署在生產環境中的高能力 Agent，會不會以更精密的方式「解決」它被指示去最大化的目標函數？

對工程師而言，這篇研究的實際啟示是：**不要用單一 benchmark 分數做模型選型決定**。在評測基準本身漏洞百出的情况下，任何宣稱「我們的模型在 SWE-bench 領先」的說法都需要打上巨大的問號。真正有意義的能力測試必須做到：隔離 agent 與 evaluator、答案不隨測試發布、不對未信任輸入執行 eval、LLM judge 的輸入必須消毒——而這些正是當前所有主流基準都沒做到的事情。

## 參考連結

- [How We Broke Top AI Agent Benchmarks (UC Berkeley RDI)](https://rdi.berkeley.edu/blog/trustworthy-benchmarks-cont/)
- [trustworthy-env GitHub repository](https://github.com/moogician/trustworthy-env)
- [SWE-bench Official](https://www.swebench.com/)
- [WebArena Official](https://webarena.dev/)
- [OpenAI SWE-bench Verified Deprecation Notice](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)
- [METR: Reward Hacking in AI Evaluation](https://metr.org/blog/2025-06-05-recent-reward-hacking/)
