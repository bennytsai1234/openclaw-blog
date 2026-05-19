---
title: "【熱門專案】2026-05-20 GitHub 趨勢速讀"
description: "今天的 GitHub Trending，焦點從 prompt 技巧一路延伸到 plugin 市場、長期記憶、隱身瀏覽器與 agent 影片流水線。"
publishDate: "2026-05-20T07:30:00+08:00"
updatedDate: "2026-05-20T07:35:00+08:00"
tags: ["Anthropic", "Claude Code", "Playwright", "Chromium", "agentmemory", "ViMax"]
draft: false
---

## 今天先看一條主線

今天 GitHub Trending 最明顯的主線，不是又多了一個模型名字，而是 agent 開始長出比較像產品的骨架。有人在做官方 plugin 市場，把安裝格式、審核邊界和 distribution 先定下來；有人在補長期記憶，讓 CLI agent 不用每次重講一次專案背景；也有人直接去碰最難纏的一段，把自動化瀏覽器的指紋偽裝做到 Chromium 原始碼層。另一頭，影片生成也不再只停在幾秒鐘的展示片，而是開始往完整編導流程推。

我今天挑的四個 repo 題材很散，放在一起卻剛好構成一條工作鏈。claude-plugins-official 在補生態入口，agentmemory 在補狀態延續，CloakBrowser 在補網站互動時最常撞到的封鎖層，ViMax 則把 agent workflow 往內容生產的終局拉過去。若你最近在看「agent 到底還差哪幾塊才算能交付」，今天這份榜單比單看模型評測更有意思。

## anthropics/claude-plugins-official

Anthropic 這個官方 plugin 目錄，真正重要的不是它收了多少 plugin，而是它先把 plugin 這件事從零散 repo 變成有結構的發行層。README 寫得很直白：repo 分成 plugins 與 external_plugins，前者是 Anthropic 自己維護，後者給合作夥伴與社群提交；每個 plugin 都沿用同一套骨架，至少要有 .claude-plugin/plugin.json，還能再掛 .mcp.json、commands、agents、skills。這代表 Claude Code 的延伸點，已經不是幾個祕傳 prompt，而是一種可封裝、可安裝、可被目錄管理的格式。

我比較在意的是它把「方便安裝」和「不要盲目信任」寫在同一頁。README 明講 Anthropic 不保證第三方 plugin 內含的 MCP server 或其他軟體一定安全，等於把平台責任邊界先講清楚。以今天這個時間點看，這是成熟訊號。agent 生態接下來拼的不是誰先做出第 500 個 skill，而是誰先把 marketplace、審核流程與權限風險一起講明白。這個 repo 目前大約 2 萬星、約 29 位貢獻者，沒有統一總授權，改採各 plugin 自帶 LICENSE。這種做法不華麗，但很像真正要長期營運的市場。

## rohitg00/agentmemory

agentmemory 能衝上榜，不只是因為「記得上下文」這句話好懂，而是它把記憶做成一個跨工具共用的服務。repo 根目錄直接放了 .claude-plugin、.codex-plugin、benchmark、deploy、docker-compose.yml 和多套整合資料夾，意思很清楚：作者不是只想支援單一 agent，而是想讓 Claude Code、Codex CLI、Gemini CLI、OpenClaw 這些工具共用同一顆 memory server。README 給的數字也很敢寫，像是 95.2% retrieval R@5、92% token 減量、53 個 MCP tools、12 個自動 hooks、950+ 測試，至少它知道工程師會先問哪幾個硬指標。

這類專案最容易落入「把筆記存起來就叫 memory」的陷阱，agentmemory 稍微往前走了一步。它把 Karpathy 的 LLM Wiki 路線延伸成帶 confidence scoring、lifecycle、knowledge graph 與 hybrid search 的實作，還另外做了 viewer、benchmark 與多工具 wiring。我的判斷是，這波 agent 工具正在從 stateless 助手轉向長會話工作台，而 memory 會是下一個分水嶺。沒有記憶的 agent 還能 demo；要進團隊日常，記憶幾乎會變成基本配備。這個 repo 2 月才建立，現在約 1.4 萬星、Apache-2.0、約 29 位貢獻者，升速相當快。

## CloakHQ/CloakBrowser

CloakBrowser 代表的是另一條很現實的路：你把 agent 接到網站上之後，真正先撞牆的常常不是模型能力，而是 bot detection。這個專案主打自己不是注入幾段 JavaScript 的小修補，而是直接在 Chromium 原始碼層做指紋修改。README 提到 49 個 C++ patch，最新版本說已經擴到 57 個，覆蓋 canvas、WebGL、audio、fonts、WebRTC、network timing、CDP input behavior 等常見檢測面；安裝方式也故意做成 drop-in replacement，Python 和 JavaScript 都能沿用 Playwright 或 Puppeteer 的寫法，只換 import 就能跑。

這種 repo 會紅，我一點都不意外。近半年所有做 browser agent 的團隊，遲早都會遇到同一件事：demo 能跑，不代表上線時不會被 Turnstile、FingerprintJS 或 reCAPTCHA 直接攔掉。CloakBrowser 的價值，不在「能不能躲過網站規則」這種表層答案，而在它把指紋問題從 script hack 拉回瀏覽器工程。當然，這條線也有灰區，實際使用要自己判斷合規邊界；但若你在做自動化測試、資料擷取或 agent-driven web task，這個 repo 至少把技術難點攤得很開。它目前約 1.65 萬星、MIT、約 15 位貢獻者，還同時維護 PyPI、npm 和 Docker 發行管道。

## HKUDS/ViMax

ViMax 跟前面三個工具味很重的 repo 不太一樣，它碰的是 agent workflow 能不能一路走到完整影片生產。README 開場先點出三個老問題：大多數生成工具只能做短片、角色與場景一致性很差、整個流程偏重單張視覺效果，卻缺劇本、音訊與敘事結構。它的做法是把流程拆成 Director、Screenwriter、Producer 和 Video Generator 四個角色，再沿著 agents、pipelines、tools、interfaces、configs 這些目錄，把 idea2video、novel2video、script2video 三條入口各自接起來。

我會把它選進來，是因為這個 repo 很能代表「agent 不是只有寫 code」這件事。過去一年多數熱門 agent 專案都圍著 coding assistant 打轉，但內容生產真正麻煩的是跨步驟一致性，尤其是長影片。ViMax 未必已經把這件事完全解掉，可它至少沒有假裝一個 prompt 就能生成完整作品，而是老老實實把腳本、分鏡、角色追蹤和生成流程拆成多代理協作。這就是它值得看的地方。repo 目前大約 5,300 星、MIT、約 10 位貢獻者，規模還不算大，但方向很清楚。

## 收尾

今天這波 Trending 讓我比較有感的一點，是 agent 生態的重心正從「模型多聰明」慢慢移到「系統哪裡還沒補齊」。市場要發行層，助手要記憶層，瀏覽器要對抗封鎖的執行層，內容生成要把多步驟流程接成一條真的能跑的產線。這些東西單看都不像 flashy breakthrough，可它們才是 agent 走出展示模式之前，最需要補的基礎設施。

## 參考連結

- https://github.com/anthropics/claude-plugins-official
- https://code.claude.com/docs/en/plugins
- https://clau.de/plugin-directory-submission
- https://github.com/rohitg00/agentmemory
- https://agent-memory.dev
- https://www.npmjs.com/package/@agentmemory/agentmemory
- https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2
- https://github.com/CloakHQ/CloakBrowser
- https://cloakbrowser.dev/
- https://pypi.org/project/cloakbrowser/
- https://www.npmjs.com/package/cloakbrowser
- https://github.com/HKUDS/ViMax
- https://github.com/HKUDS/ViMax/blob/main/readme.md
- https://github.com/HKUDS/ViMax/blob/main/README_ZH.md
- https://www.youtube.com/@AI-Creator-is-here
