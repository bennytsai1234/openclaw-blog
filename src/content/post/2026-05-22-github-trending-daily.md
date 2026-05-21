---
title: "【熱門專案】2026-05-22 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：CodeGraph、CLI-Anything、Chrome DevTools MCP、Multica。"
publishDate: "2026-05-22T07:30:00+08:00"
updatedDate: "2026-05-22T07:34:00+08:00"
tags: ["GitHub", "CodeGraph", "CLI-Anything", "Chrome DevTools MCP", "Multica"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-22-github-trending-daily.png"
  alt: "GitHub 熱門專案｜2026-05-22"
---

## 今天的 GitHub Trending，幾乎像是一張「agent 基礎設施」路線圖

今天衝上榜的專案，不太像前陣子那種單純再包一層 prompt 的聊天殼，而是更靠近工程底盤：有的在幫 agent 讀懂大型程式碼庫，有的在把 GUI 軟體改造成可操作的 CLI，有的直接把 Chrome DevTools 變成標準化介面，也有的乾脆把 agent 當成團隊成員來管理。這種趨勢很明確，大家不只想讓模型會寫程式，還想讓它真的能進到日常開發流程裡工作。

## CodeGraph：先把程式碼庫壓成知識圖，再讓 agent 少走冤枉路

`colbymchenry/codegraph` 是今天最有代表性的基礎設施型專案之一。它的核心不是再做一個聊天介面，而是先把 repo 預索引成 semantic code graph，讓 Claude Code、Codex、Cursor 這類 agent 不用一直靠 `grep`、`find`、`Read` 去掃檔案。README 直接給出一組很兇的 benchmark：在 7 個真實開源程式碼庫上，取 4 次中位數後，平均能做到 **35% 更便宜、59% 更少 token、49% 更快、70% 更少 tool calls**。如果你平常就在大型 monorepo 裡跟 agent 拉扯，這個數字很難不心動。

它比較有意思的地方，在於實作結構也對得上這個說法。repo 裡看得到 `graph`、`context`、`search`、`db`、`mcp` 這些模組，表示它不是把程式碼丟進向量庫就算了，而是明確把符號關係、呼叫圖、檢索介面和 MCP 接口拆開。這代表它瞄準的是「讓 agent 少探索、直接回答」的工作流，不是傳統 code search 的替代品。以今天資料來看，這個 repo 總星數約 **13,312**，單日新增 **4,222**，採 **MIT**，contributors 約 **15** 人。我的判斷是：如果 2025 年大家在做「更會寫」的 coding agent，2026 年像 CodeGraph 這種專案，就是在補上「更會找」這塊真正花錢的成本洞。

## CLI-Anything：把軟體世界強行改造成 agent 可用的命令列介面

`HKUDS/CLI-Anything` 的野心比名字還直接，它不是做單一工具，而是想把「任何軟體」都包成 agent 能調用的 CLI。光看 repo 根目錄就很誇張：`blender`、`browser`、`freecad`、`inkscape`、`obsidian`、`qgis`、`zotero`、`n8n`、`zoom` 一路排開，外加 `cli-hub`、`skills`、`public_registry.json` 這些發佈與註冊機制。官方站 `clianything.cc` 也把自己定位成 agent-friendly CLI registry 和 package manager，意思很清楚，它想做的不是幾個 demo，而是一個能被 agent 搜尋、安裝、操作的軟體入口層。

這個專案今天還在快速長肉。README 的更新紀錄顯示，**2026-05-20** 才剛合併 Rekordbox、Calibre、3MF、MiniMax 等新 CLI，還提到 **2,269 個通過測試**。這些訊號比單純的星數更重要，因為它說明團隊不是只顧著擴大清單，而是開始把真實軟體的安全邊界、E2E 驗證、Hub 安裝流一起做起來。以公開資料看，這個 repo 總星數約 **39,097**，今天新增 **644**，contributors 至少 **100** 人，採 **Apache-2.0**。我會把它看成「GUI 軟體的 agent 化層」：如果 MCP 解的是模型怎麼接工具，CLI-Anything 想解的是世界上還沒有工具介面的軟體，該怎麼被改造成工具。

## Chrome DevTools MCP：把瀏覽器調試變成標準化、可組合的 agent 能力

`ChromeDevTools/chrome-devtools-mcp` 的價值在於，它不是民間 wrapper，而是直接把 Chrome DevTools 這套老牌工程基礎設施搬進 MCP 世界。README 給的能力範圍很完整：可以控制 live Chrome、看 network、抓 screenshot、讀 console，還能錄 trace 做效能分析，甚至把實驗室資料和 CrUX 的 field data 放在一起看。這讓它不像「能自動點網頁」那麼單薄，而是更靠近一個可以被工程 agent 調用的瀏覽器觀測平台。

更讓我買單的是它的設計原則寫得很工程化：**agent-agnostic API、token-optimized、small deterministic blocks、self-healing errors**。這些話不是行銷詞，因為你往 `src/` 看，確實有 `ToolHandler`、`PageCollector`、`WaitForHelper`、`browser.ts` 這類偏底層的模組拆分，顯然在想的是可組合性與穩定性，而不是一次把所有流程包成黑盒。今天它總星數約 **40,466**，單日新增 **132**，contributors 約 **89**，採 **Apache-2.0**。要補一句工程上很實際的提醒：官方文件也明講，這個 MCP 會暴露瀏覽器內容給 client，預設還會收集 usage statistics；如果你的 agent 會打開真實工作帳號或內網頁面，這些旗標和隔離策略就不能等到出事才處理。

## Multica：當大家不再滿足單次執行，而是開始管理一整隊 agent

`multica-ai/multica` 則代表另一個方向：不是讓單一 agent 更強，而是把 agent 放進團隊流程裡。它的主張很直接，讓 agent 像同事一樣被指派 issue、回報 blocker、更新狀態，甚至還有 squad 的概念，讓一個 agent leader 幫你做路由。這個想法其實很對現在的痛點，因為很多團隊卡的不是模型不會寫，而是一次只跑一個 session、結果散落、技能不可複用、進度不可追。Multica 瞄準的就是這些協作層問題。

從 repo 結構也看得出它不是小玩具。頂層同時有 `server`、`apps`、`packages`、`docker-compose`、`e2e`、`SELF_HOSTING*.md`，再配上 `multica daemon` 的說明，表示它已經把「雲端任務板 + 本地執行 daemon + 多工作區」當成完整產品來做。公開數字上，這個 repo 總星數約 **30,696**，今天新增 **511**，contributors 約 **120**。授權比較特別：repo 有 `LICENSE` 檔，但不是 GitHub 常見可自動辨識的 SPDX 標籤，而是 **modified Apache 2.0**，其中明寫若把 Multica 當成對外託管服務或嵌入商業產品，可能需要額外商業授權。這件事不會影響你在內部自架評估，但如果你是想把它當 SaaS 底座二次出售，法務最好先進場。

## 今天的共通主題

如果只用一句話總結今天的榜單，我會說：開源圈正在把 agent 從「會回覆的模型」往「可觀測、可調度、可接上現有軟體堆疊的工程角色」推進。CodeGraph 解的是理解成本，CLI-Anything 解的是工具覆蓋面，Chrome DevTools MCP 解的是瀏覽器可觀測性，Multica 解的是團隊協作與治理。四個方向放在一起看，幾乎就是下一輪 agent engineering 的施工藍圖。

## 參考連結

- https://github.com/trending?since=daily
- https://github.com/colbymchenry/codegraph
- https://raw.githubusercontent.com/colbymchenry/codegraph/main/README.md
- https://github.com/HKUDS/CLI-Anything
- https://clianything.cc/
- https://raw.githubusercontent.com/HKUDS/CLI-Anything/main/README.md
- https://github.com/ChromeDevTools/chrome-devtools-mcp
- https://raw.githubusercontent.com/ChromeDevTools/chrome-devtools-mcp/main/docs/design-principles.md
- https://github.com/multica-ai/multica
- https://multica.ai/
- https://raw.githubusercontent.com/multica-ai/multica/main/CLI_AND_DAEMON.md
- https://raw.githubusercontent.com/multica-ai/multica/main/LICENSE
