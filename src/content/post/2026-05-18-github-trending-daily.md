---
title: "【熱門專案】2026-05-18 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：CLI-Anything、Dograh、Shannon、DreamServer、OpenHuman。"
publishDate: "2026-05-18T07:30:00+08:00"
updatedDate: "2026-05-18T07:35:00+08:00"
tags: ["CLI-Anything", "Dograh", "Shannon", "DreamServer", "OpenHuman"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-18-github-trending-daily.png"
  alt: "GitHub 熱門專案速讀封面圖"
---

今天的 GitHub Trending 很整齊，主題不是單點功能，而是「把複雜能力整包交付」。從讓任意軟體變成 agent 能操作的 CLI，到能自託管的語音 agent、會自己打漏洞的白箱滲透測試器，再到本地 AI 全家桶與個人助理桌面產品，開源圈顯然不滿足於做一把小工具，大家都在搶整個工作流的入口。

## HKUDS/CLI-Anything

CLI-Anything 最值得注意的地方，不在於它又替單一模型包了一層殼，而是它直接把命題換掉了：未來的使用者不只有人，也有 Agent，所以舊世界的 GUI 與封閉操作流程都得補上一層可呼叫、可組裝、可測試的 CLI 介面。專案目前有 35,547 個 stars、75 位 contributors，採 Apache-2.0 授權，README 還直接掛出 2,269 個通過中的測試，聲量與工程完成度都不像概念型專案。

從 repo 結構也看得出它不是空談。skills 目錄底下已經收了大量具體軟體 harness，像 Blender、QGIS、Audacity、AdGuard Home 都在列，外面再配一個 CLI-Hub 做安裝與分發。我的判斷是，這類專案若能持續把軟體操作收斂成一致協定，Agent 生態接下來比的就不只是模型推理，而是誰能最快接管既有工具鏈。

## dograh-hq/dograh

Dograh 走的是另一條很務實的路：把近來很熱的語音 agent 平台，從 SaaS 訂閱制拉回可自託管的開源底座。它目前 1,623 stars、12 位 contributors、BSD 2-Clause 授權，定位很直接，就是開源版的 Vapi 與 Retell。README 主打 60 秒內用一條 docker compose 指令起整套服務，打開 http://localhost:3010 就能開始做 inbound 或 outbound 語音機器人，連預設 API key 都先幫你生好，先求能跑，再談客製。

它的 repo 不是只有一頁 landing page。根目錄下有 api、docs，文件裡還拆出完整的 agents API 參考，代表團隊在做的不是示範玩具，而是一個想接電話、接模型、接 TTS、接 STT、接電信供應商的產品底盤。對工程團隊來說，Dograh 真正有意思的點是把語音 agent 從只能租用的平台能力，拉回你自己的基礎設施能力。

## KeygraphHQ/shannon

如果今天只能挑一個會讓安全團隊有壓力的專案，我會選 Shannon。它不是單純跑規則掃描，而是白箱 AI pentester：先讀你的原始碼，再配合瀏覽器自動化與命令列工具去打真實 exploit，只有真的打成的漏洞才進報告。專案目前有 42,686 stars、7 位 contributors、AGPL-3.0 授權，README 還直接公開它在 OWASP Juice Shop 找出 20 多個漏洞，包含 authentication bypass 與資料外洩路徑。

技術上，Shannon 最聰明的地方是把靜態理解與動態驗證綁在一起。README 與 apps/cli/src/commands 顯示它的主入口就是一個可自動化執行的 CLI，而不是只能在網頁上看報表。這很重要，因為 AI 寫程式的速度愈快，傳統一年一次的滲透測試就愈像裝飾。Shannon 代表的方向不是 AI 幫你寫安全報告，而是把可重現的攻擊驗證塞回 release 流程裡。

## Light-Heart-Labs/DreamServer

DreamServer 不是單一模型啟動器，而是本地 AI 全家桶：推論、聊天介面、語音、Agent、workflow、RAG、圖像生成，全都想一次包起來。它目前有 1,129 stars、27 位 contributors，採 Apache-2.0 授權。README 最有說服力的地方，是它沒有只寫一句 local AI for everyone，而是把支援矩陣、安裝模式、連接埠規則都交代清楚，Linux、Windows、macOS 都在支援清單裡，聊天 UI 預設在 3000，本地推論端點則依平台落在 11434 或 8080。

這種專案的價值，在於把本地 AI 從拼裝題變成熟悉的產品安裝題。DreamServer 的 dream-server 目錄與安裝腳本，實際處理的是 GPU 偵測、模型選擇、服務編排、帳密生成這些最勸退人的細節。我的看法很直接：只要開源圈有人把本地部署收尾那一公里磨平，雲端 API 不會消失，但預設答案不再只剩訂閱 SaaS。

## tinyhumansai/openhuman

OpenHuman 則是今天榜上另一種野心很大的產品形態：不是再做一個聊天框，而是想把個人助理做成常駐桌面、長期記憶、持續同步你數位生活的系統。它目前有 13,058 stars、53 位 contributors、GPL-3.0 授權，主體用 Rust 寫，外面再搭一個 app 前端。README 宣稱支援 118 個以上第三方整合，資料會每 20 分鐘自動抓回本地 memory tree，還把 Obsidian wiki、桌面 mascot、Google Meet 參與能力一起包進故事裡。

我會把它看成個人作業系統層的嘗試，而不只是另一個 Agent app。這類產品真正難的從來不是接到模型 API，而是怎麼把記憶、通知、行事曆、郵件、會議與檔案狀態串成同一條上下文。OpenHuman 目前仍是 early beta，但如果它真的把 UI-first、local-first、background-first 三件事穩住，未來最有黏性的 AI 產品，很可能不是聊天機器人，而是你每天都關不掉的桌面同伴。

## 結語

今天這五個專案放在一起看，訊號很明顯：2026 年的開源競爭，正在從誰做出一個功能，轉到誰接手整個工作流。CLI-Anything 想接手軟體操作層，Dograh 想接手語音 agent 基礎設施，Shannon 想接手安全驗證，DreamServer 想接手本地 AI 部署，OpenHuman 想接手個人上下文。真正稀缺的，愈來愈不是模型本身，而是誰能把零散能力整成一套你願意天天打開的系統。

## 參考連結

- [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)
- [CLI-Anything Hub](https://hkuds.github.io/CLI-Anything/)
- [dograh-hq/dograh](https://github.com/dograh-hq/dograh)
- [Dograh Docs](https://docs.dograh.com)
- [KeygraphHQ/shannon](https://github.com/KeygraphHQ/shannon)
- [Keygraph](https://keygraph.io/)
- [Light-Heart-Labs/DreamServer](https://github.com/Light-Heart-Labs/DreamServer)
- [DreamServer Demo](https://youtu.be/nO8xFNHX-HA)
- [tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)
- [OpenHuman Docs](https://tinyhumans.gitbook.io/openhuman/)
