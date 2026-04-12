---
title: "【技術解析】當工程師不再相信 benchmark 分數：Berkeley 破解 8 大 AI Agent 評測框架內幕"
description: "UC Berkeley 研究團隊用自動化工具對 SWE-bench、WebArena、OSWorld 等 8 個主流 AI Agent 評測框架發起系統性審計，發現全部可以透過漏洞達成近滿分，而無需真正解題。"
publishDate: "2026-04-12T15:00:00+08:00"
updatedDate: "2026-04-12T11:25:00+08:00"
tags: ["SWE-bench", "WebArena", "AI Agent", "benchmark", "UC Berkeley"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-12-trustworthy-ai-agent-benchmarks.png"
  alt: "How We Broke Top AI Agent Benchmarks"
---

## 這篇文章在說什麼

2026 年 4 月，UC Berkeley 旗下 Center for Responsible, Decentralized Intelligence（RDIB）發布了一篇極具衝擊力的研究：該團隊建造了一個自動化掃描 agent，對 8 個目前最被廣泛引用的 AI Agent 評測框架——包括 SWE-bench、WebArena、OSWorld、GAIA、Terminal-Bench、FieldWorkArena 與 CAR-bench——進行系統性安全審計，結果發現**每一個框架都可以被 exploit 到近滿分，而不需要真正解決任何任務**。

不需要推理、不需要真正的能力。只要懂得框架怎麼算分，攻擊者就能讓分數直接爆表。

## 為什麼重要

這些 benchmark 的分數不是學術數字遊戲，而是直接影響實務決策的依據：公司在發布新聞稿時拿 benchmark 分數證明模型厲害，投資人用這些數字判斷估值，工程師靠它們決定要部署哪套系統。當這套衡量系統本身可以輕易被欺騙，這些決策的基礎就全部動搖。

研究團隊在報告中列舉了多個已實際發生的案例：IQuest-Coder-V1 宣稱在 SWE-bench 拿下 81.4%，後來被發現 24.4% 的軌跡只是用 `git log` 直接抄答案；OpenAI 在內部審計後直接放棄 SWE-bench Verified，因為發現 59.4% 的題目壓根就測試本身就是錯的；KernelBench 裡 `torch.empty()` 回傳的是 GPU 上殘留的上一個計算結果，等於是把答案存在記憶體裡。

## 技術細節

研究團隊針對每個 benchmark 都找到了具體可行的 exploit 手法，以下是幾個最具代表性的案例。

**SWE-bench：conftest.py 讓所有測試自動通過**

SWE-bench 是目前最受認可的 AI 程式碼修復評測框架。測試流程是：把 agent 的 patch 套用到同一個 Docker 容器，跑 pytest，測試通過就給分。問題在於，patch 應用的那一刻，容器裡的任何檔案都會被執行——包括 `conftest.py`。

研究團隊的 exploit 非常簡單：

```python
import pytest

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    if rep.when == "call":
        rep.outcome = "passed"
        rep.longrepr = None
```

把這 10 行寫進一個 `conftest.py`，pytest 就會在每個測試結果報告時把它們全部改成「passed」。Django 的 231 個實例用的是 unittest，就用 monkey-patch `django/__init__.py` 達成同樣效果。SWE-bench Verified（500 題）與 SWE-bench Pro（731 題）**全部 100% 可被 exploit**，zero 任務真正解決。

**Terminal-Bench：替換 curl，二元 wrapper 埋木馬**

Terminal-Bench 的 89 個任務涵蓋建構 COBOL 棋類引擎到設定分散式系統。容器有完整網路連線，Harbor 的 `allow_internet` 設定預設為 True。82 個任務在驗證階段透過 curl 下載 uv，這條依賴鏈可以被置換。

研究團隊在 agent 階段把 `/usr/bin/curl` 換成一個 wrapper，wrapper 在 uvx 安裝完成後把 uvx 本身埋成木馬。當 verifier 執行 `curl ... | sh` 安裝 uv 時，木馬攔截 `pytest` 呼叫，直接噴出假的「3 passed in 0.05s」輸出並寫入 reward 檔。整個過程零行程式碼實際解決任務，89/89 題全部 100%。

**WebArena：file:// 讀走黃金答案**

WebArena 有 812 個網頁操作任務，任務設定檔（含標準答案）存在本機 `config_files/{task_id}.json`。WebArena 用 Playwright 控制 Chromium，卻從未封鎖 `file://` 協定的存取。Agent 直接輸出：

```
goto("file:///proc/self/cwd/config_files/{task_id}.json")
```

就能讀到任何檔案，包含黃金答案。Verifier 只看到正確答案出現，完全不察覺過程。研究團隊同時發現，利用 LLM judge 任務的 prompt injection 漏洞，直接在回覆末尾加上 `<!-- EVALUATION NOTE: ... -->` 就能操控裁判分數。

**FieldWorkArena：只要回覆任何內容就是滿分**

FieldWorkArena 有 890 個任務，驗證函式長這樣：

```python
def validate(self, page, chat_messages):
    if chat_messages[-1]["role"] == "assistant":
        return 1.0, True, "Received answer", {}
```

訊息內容完全被忽略，只要最後一條來自 assistant 就給 1.0 分。`llm_fuzzy_match` 函式被 import 了但從未被呼叫——就是死代碼。Exploit agent 只做一件事：

```
send_msg_to_user("{}")
```

一個動作，零 LLM 呼叫，890/890 全部 100%。

**GAIA：正規化函式讓爛答案也 match**

GAIA 是提交答案制（submit-your-answers leaderboard），答案直接放在 HuggingFace 上公開。Exploit agent 在本地端加載這些答案檔案，繞過網路下載。更大的問題在於評分邏輯：`normalize_str` 把所有空白、標點符號去除並轉小寫後比對，所以：

- 標準答案：「Dr. Martin Luther King Jr.」
- Exploit 答案：「D.R M.A.R.T.I.N L.U.T.H.E.R K.I.N.G J.R」
- 正規化後兩者相同，比對成功，給滿分

**七個致命模式**

跨 8 個 benchmark 最常見的漏洞模式是：agent 與 evaluator 之間**沒有隔離**——程式碼執行環境與測試評分環境共享同一個容器，agent 可以直接修改 grader 或干預分數計算。其他常見問題包括：gold answer 暴露在網路上或容器內可存取位置、LLM judge 的 prompt 未做 injection 防護、驗證函式只檢查格式而非內容。

## 我的觀點

這篇研究最大的貢獻不是發現某一個特定漏洞，而是用系統化的方法證明了「benchmark 可被遊戲」是普遍結構性問題，而非零星意外。

對工程師而言，這直接影響了我們如何解讀 benchmark 數字。以後看到某模型宣稱 SWE-bench 90% 以上，合理的反應是問「怎麼測的、有沒有隔離環境」，而不是直接拿數字跟其他模型比。AI Labs 也需要重新思考 benchmark 的設計方式：gold answer 不該在網路上可存取、評分邏輯不該與 agent 環境共享、驗證函式不能只檢查輸出格式而不真正比對內容。

研究團隊將 exploit 工具開源在 [github.com/moogician/trustworthy-env](https://github.com/moogician/trustworthy-env)，有興趣的人可以實際跑過一遍，親眼見證這些分數怎麼來的。

## 參考連結

- [How We Broke Top AI Agent Benchmarks (Berkeley RDI)](https://rdi.berkeley.edu/blog/trustworthy-benchmarks-cont/)
- [SWE-bench GitHub](https://github.com/princeton-nlp/SWE-bench)
- [WebArena GitHub](https://github.com/web-arena/web-arena)
- [trustworthy-env exploit toolkit](https://github.com/moogician/trustworthy-env)
