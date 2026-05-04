---
title: "【熱門專案】2026-05-05 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：The Agency、Dexter、qBittorrent、Jellyfin"
publishDate: "2026-05-05T07:30:00+08:00"
updatedDate: "2026-05-05T07:33:00+08:00"
tags: ["The Agency", "Dexter", "qBittorrent", "Jellyfin", "GitHub Trending"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-05-github-trending-daily.png"
  alt: "GitHub 熱門專案｜2026-05-05"
---

## 今天的 Trending 很有意思：一半在補 Agent 團隊編排，一半在證明老牌開源基建還是有人追

今天 GitHub Trending 前排很明顯還是被 AI Agent 佔住視線，但如果只看新鮮的 Agent 專案，會漏掉另一條更務實的線：開發者也在回頭收藏那些已經做出產品完成度、部署經驗與跨平台能力的老牌開源系統。前者想解的是「怎麼把 AI 變成一組可分工的助手」，後者想解的是「怎麼把日常基礎軟體重新拿回自己手上」。放在同一天看，反差其實很值得玩味。

## msitarzewski/agency-agents — 把「提示詞包」往真正的職能分工再推一步

The Agency 的做法不是再發明一個 Agent runtime，而是直接把「一群專職 AI 角色」整理成可安裝、可搬運、可跨工具使用的 agent library。README 裡列出的 division 很完整，工程、設計、行銷、產品、專案管理到銷售都有對應角色，而且每份 agent 檔案不只寫 persona，還附上工作流程、交付物型態與成功指標。這讓它比一般 prompt collection 更像一個可直接佈署的作業手冊。

從 repo 結構也看得出作者有把它往產品化整理：根目錄就能看到 `engineering`、`design`、`marketing`、`sales` 等分類資料夾，還有 `scripts/install.sh` 與 `scripts/convert.sh`，直接把同一批 agents 轉成 Claude Code、Gemini CLI、Cursor、OpenClaw 等不同工具能吃的格式。以今天 92,602 星、約 66 位貢獻者、MIT 授權、單日再衝 828 星來看，這已經不是「分享幾個 prompt」的等級，而是團隊開始把 AI 分工知識模組化收藏。

我自己的判斷是，這類專案真正的價值不在角色名單有多長，而在它把 AI 協作的單位從「一個全能聊天視窗」切回「一組邊界清楚的職能」。對正在搭內部 AI 工作流的團隊來說，這個方向比再堆一層 orchestration UI 還實用。

適合誰：想快速建立多角色協作流程、又不想自己從零整理 agent persona 與 SOP 的產品團隊。

## virattt/dexter — 金融研究 Agent 開始從 demo 邁向可驗證的工作流

Dexter 的定位很直接：它不是泛用聊天助手，而是專門做深度金融研究的 autonomous agent。README 一開頭就把核心能力講得很清楚——任務規劃、自我檢查、即時金融資料、循環保護——而且不是停在概念層，專案裡真的把 eval、debug 與訊息閘道一起放進來。你在根目錄會同時看到 `src/evals`、`scripts`、`env.example` 與 WhatsApp gateway 相關文件，代表作者在意的不只是「能跑」，還有「怎麼驗證它有沒有亂講」。

它最值得注意的地方，是把金融研究這種高幻覺成本場景拆成比較工程化的流程。依照 README，Dexter 會把複雜問題拆成研究步驟，搭配即時 market data 去取財報、現金流與其他指標，再把工具呼叫記進 `.dexter/scratchpad/` 的 JSONL 檔案裡。這種 scratchpad 設計很重要，因為金融分析最怕的不是模型慢，而是你回頭查不到它到底引用了哪些數字。它目前有 23,172 星、約 19 位貢獻者，今天再多 497 星；雖然 repo 還沒掛清楚的 GitHub license metadata，但 README 寫的是 MIT License。

如果說前一波 Agent 熱潮重點是「會不會自己找工具」，Dexter 這種專案比較像下一步：針對單一高價值垂直場景，把資料來源、評測方式與審計痕跡一起包進去。這種路線比較慢，卻也更像真產品。

適合誰：做投研、量化研究、金融內容分析，或想研究垂直領域 autonomous workflow 的工程師。

## qbittorrent/qBittorrent — 老牌工具重新上榜，提醒大家成熟度本身就是護城河

qBittorrent 其實不是新專案，2012 年就開倉，今天還能回到 Trending，靠的不是話題感，而是那種很多新工具短期內補不起來的完成度。官方網站把它定位成 µTorrent 的開源替代品，核心基底是 Qt 與 libtorrent-rasterbar；README 則補上更多工程細節，像是跨平台支援、PGP 簽章、公用 IP-to-country 資料庫，以及獨立的 Web API 變更紀錄。根目錄還保留 `CMakeLists.txt`、`WebAPI_Changelog.md`、`COPYING` 與完整開發規範，整體很明顯是長年維護下來的產品型 repo。

從使用面來看，它最強的地方不是某個單一花招，而是把搜尋、RSS、自動下載規則、Web UI、頻寬排程、IPv6、UPnP/NAT-PMP 這些日常需求全部打磨完整。今天它在 GitHub 有 37,034 星、超過 400 位貢獻者，單日新增 68 星，雖然聲量不如前面的 AI 題目，但我反而覺得這種回潮更有訊號：當開源使用者開始重新收藏老牌基建，往往代表大家對「可靠、能長期跑」的興趣又升上來了。

適合誰：想自架下載工作流、需要跨平台 BitTorrent 客戶端，或偏好可審計、無廣告工具鏈的進階使用者。

## jellyfin/jellyfin — 自架媒體系統還在持續吸粉，產品完整度遠比新奇更有說服力

Jellyfin 跟 qBittorrent 一樣不是新面孔，但它能一直留在開源收藏清單裡，靠的是很扎實的系統能力。官方把它定義成自由軟體媒體系統，主打自主管理與串流自己的內容庫，對標的是 Emby 與 Plex 這類封閉式方案。repo README 與官方文件都很完整：你能直接看到 .NET 9 SDK、Docker/Kubernetes/Podman 安裝、外掛、備份、硬體轉碼與監控等章節，這不是單純的 media server 程式碼，而是一整套已經能讓人長期營運的服務堆疊。

從程式碼結構看也很成熟，根目錄有 `Jellyfin.Server`、`Jellyfin.Api`、`Jellyfin.Data`、`Emby.Server.Implementations` 等多個專案模組，顯示它把 API、資料層與伺服器實作拆得很清楚。它目前累積 51,141 星、超過 400 位貢獻者、GPL-2.0 授權，今天再多 35 星。數字不算爆炸，但這類專案真正的吸引力從來不是單日星數，而是你要找一套能長期掌控影片、音樂、照片庫，又不想被雲端平台綁住時，Jellyfin 幾乎總會被提到。

我覺得 Jellyfin 今天還能上榜，某種程度也在提醒一件事：2026 年大家談開源，不只是在追最新的 AI 介面，還是在重新評估哪些服務值得自己掌控。這股自架回潮，未必比 Agent 熱潮小。

適合誰：打算自架家庭媒體伺服器、重視資料主控權，或需要可延伸串流平台的開發者與 homelab 玩家。

## 趨勢小結

今天這份 GitHub Trending 很像兩條開源路線同時升溫：一條是在想辦法把 AI 分工做細、把垂直工作流做實，另一條則是在替成熟基礎軟體重新定價。The Agency 與 Dexter 代表的是前者，qBittorrent 與 Jellyfin 代表的是後者。我的感覺很簡單：現在最值得收藏的 repo，不一定最炫，卻常常最接近「你下週真的會拿來用」。

## 參考連結

- [GitHub Trending](https://github.com/trending?since=daily)
- [msitarzewski/agency-agents — GitHub](https://github.com/msitarzewski/agency-agents)
- [virattt/dexter — GitHub](https://github.com/virattt/dexter)
- [qbittorrent/qBittorrent — GitHub](https://github.com/qbittorrent/qBittorrent)
- [jellyfin/jellyfin — GitHub](https://github.com/jellyfin/jellyfin)
- [qBittorrent 官方網站](https://www.qbittorrent.org/)
- [Jellyfin 官方文件](https://jellyfin.org/docs/)
