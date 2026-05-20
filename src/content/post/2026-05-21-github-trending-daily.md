---
title: "【熱門專案】2026-05-21 GitHub 趨勢速讀"
description: "今天最值得看的四個 GitHub 熱門專案，從 coding agent 到本地知識工作台。"
publishDate: "2026-05-21T07:30:00+08:00"
updatedDate: "2026-05-21T07:42:00+08:00"
tags: ["GitHub", "oh-my-pi", "files.md", "Agency Agents"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-21-github-trending-daily.png"
  alt: "GitHub 熱門專案｜2026-05-21"
---

## 今天的 GitHub Trending，不是在追新模型，而是在重做工程師的工作台

5 月 21 日早上的 GitHub Trending 很有意思：真正冒上來的，不是又一個只會包 API 的聊天殼，而是一批直接碰工作流核心的專案。有人在重寫終端 coding agent 的工具層，有人在把 AI 工程教育拆成可以實作的課程骨架，也有人回頭把最基本的 Markdown 檔案工作台重新做一遍。把這幾個專案放在一起看，會發現一個共同訊號：大家已經不滿足於「把模型接進來」，而是在問怎麼把日常開發、筆記、協作與自動化整套重新佈線。

## oh-my-pi：把 coding agent 從 prompt 玩具拉回工具工程

今天榜上我最想先看的，是 [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi)。它表面上是終端裡的 AI coding agent，但 README 一開場就直接把重點放在工具層：支援超過 40 個 provider、內建 32 個工具、13 個 LSP 操作、27 個 DAP 操作，底層還有大約 2.7 萬行 Rust 核心。這不是單純把模型包成 CLI，而是把「模型如何安全又穩定地碰到程式碼、編輯器知識與除錯能力」當成主問題來處理。

它值得注意的地方，在於作者把失敗率歸因到 harness，而不是模型本身。README 與作者的技術文章都在講同一件事：很多 coding agent 不是真的不聰明，而是 edit format、read/search 預設值、重試回圈與工具回傳格式把模型拖垮。oh-my-pi 的做法是把檔案讀取摘要化、把搜尋結果收斂到更可消化的片段，再把 LSP 與 DAP 能力直接接進 agent。對平常寫大型 repo 的人來說，這比單純再換一次模型更實際，因為真正卡住生產力的，往往不是回答能力，而是 agent 能不能在第一輪就拿到夠乾淨的上下文。

從適用對象來看，這個專案比較像給已經在重度使用 Claude Code、Codex 或其他代理式開發工具的人。它現在大約有 5,378 顆星、190 位 contributor，授權是 MIT。這組數字不只代表聲量，也代表它不是一個只有 prompt 文件的薄殼專案，而是有人持續往底層補工具、補平台支援、補工作流的人在維護。

## AI Engineering from Scratch：把「看懂 demo」升級成「真的能交付」

第二個值得看的是 [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch)。這個 repo 的切法很直接：不是再做一門泛泛的 AI 入門課，而是把整條 AI 工程路徑拆成 435 個 lessons、20 個 phases、約 320 小時的實作路線，還把 Python、TypeScript、Rust、Julia 都放進去。對照 README 裡那句「84% 的學生已經在用 AI 工具，但只有 18% 覺得自己準備好專業使用」，它要解的其實不是知識缺口，而是交付能力缺口。

技術上它有意思的地方，是每一課都要求產出可重用 artifact，例如 prompt、skill、agent 或 MCP server。這和大多數教學 repo 最大的差別在於，學習成果不是一篇心得，而是一個之後可以繼續裝回工作流的元件。從根目錄也看得出這個設計不是口號而已：除了 README，還有 ROADMAP.md、LESSON_TEMPLATE.md、.claude/ 這類明顯是拿來支撐課程結構與 agent 開發習慣的骨架。

如果你是正在補 AI 工程能力、又不想再被「三天做一個聊天機器人」這種內容浪費時間的工程師，這個 repo 很值得追。它目前大約有 9,498 顆星、5 位 contributor，MIT 授權，還有獨立網站整理課程入口。我的判斷是，這類專案會紅，不是因為大家突然愛上教學內容，而是團隊真的開始需要可培訓、可複製、可 onboarding 的 AI 工程方法，而不是只靠一兩個會寫 prompt 的人撐著。

## files.md：當 everyone is building agents，本地 Markdown 反而變成稀缺品

第三個我覺得很醒目的，是 [zakirullin/files.md](https://github.com/zakirullin/files.md)。它沒有追逐 agent，也沒有塞滿炫技 benchmark，而是把目標寫得很克制：一個給 Markdown 檔案用的簡單 app，local-first、LLM-friendly，而且資料不送到伺服器。README 甚至直接說，你可以把筆記、文件、專案、日記、清單都放在純 Markdown 裡，讓檔案壽命比軟體本身還長。

這種專案今天會上榜，我覺得很能反映另一個反作用力。過去兩年大家不停把知識、工作流與上下文丟進雲端 SaaS，再期待模型替我們整理；但只要你真的用久一點，就會發現可攜性、可搜尋性與隱私會一起回來找你。files.md 的答案不是再做一個大而全的第二大腦平台，而是回到 Go 寫的簡單結構：cmd、server、docs、tests 都在 repo 裡，軟體本體與資料格式都盡量保持樸素。這種選擇在產品 demo 上可能不花俏，卻非常對工程師胃口，因為你知道五年後還打得開自己的資料。

它目前大約有 2,192 顆星、7 位 contributor，同樣是 MIT 授權。適合的人很明確：如果你想要的是可長期保存的個人知識空間，又希望未來能讓 LLM 直接讀懂你的檔案結構，這比再把人生綁進另一個閉源筆記服務更有延展性。坦白說，今天榜單裡最成熟的產品判斷，未必來自最像 AI 的專案，反而可能是這種願意把野心收斂到「把 Markdown 打磨好」的作品。

## Agency Agents：Prompt 資產開始被當成真正的流程模組

另一個值得放進今天清單的，是 [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)。這個 repo 第一眼很像大型 agent prompt 收藏，但如果只把它看成模板包，會低估它為什麼能衝到今天的榜前。它的結構已經不是零散 persona，而是按 academic、design、engineering、examples 這些工作域拆開，強調每個 agent 都有明確角色、流程與 deliverables。更準確地說，作者想做的不是「幫你變有靈感」，而是把一段原本散落在資深操作者腦中的 workflow，整理成能被團隊複製的模組。

這類 repo 的風險當然也很明顯。Prompt 與 persona 類資產很容易爆紅，但也很容易變成一次性熱潮，因為真正難維護的不是字句，而是環境差異、工具邊界與任務驗收標準。不過 agency-agents 至少踩對了一件重要的事：當大家開始把 agent 當工作夥伴時，最缺的不是更多形容詞，而是更清楚的責任切分與輸出格式。這也是它和一般 prompt list 不一樣的地方。

目前這個 repo 大約有 102,798 顆星、72 位 contributor，MIT 授權。它不一定適合每個人直接拿來用，但非常適合工程經理、顧問團隊，或正在整理內部 AI playbook 的人拿來參考。你不必照抄那些角色設定，真正值得學的是它把模糊任務拆成可交付工序的方式。

## 今天的共通主題：開源圈開始爭奪「工作面」而不只是「模型面」

把今天這四個專案擺在一起看，最有意思的不是它們都跟 AI 有關，而是它們都在搶同一塊位置：工程師每天真正停留最久的工作面。oh-my-pi 往終端與 IDE 之間鑽，ai-engineering-from-scratch 想把人才訓練流程標準化，files.md 把個人知識工作台拉回本地檔案，agency-agents 則把 prompt 經驗整理成可複製的流程模組。這比單純比較哪個模型又贏了 benchmark 更值得看，因為它更接近接下來一年的真戰場：誰能把模型接進既有工作流，而且接得夠穩、夠久、夠能交付。

## 參考連結

- https://github.com/trending?since=daily
- https://github.com/can1357/oh-my-pi
- https://omp.sh
- https://blog.can.ac/2026/02/12/the-harness-problem/
- https://github.com/rohitg00/ai-engineering-from-scratch
- https://aiengineeringfromscratch.com
- https://github.com/zakirullin/files.md
- https://files.md
- https://app.files.md
- https://github.com/msitarzewski/agency-agents
