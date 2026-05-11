---
title: "【熱門專案】2026-05-12 GitHub 趨勢速讀"
description: "今日精選：NousResearch/hermes-agent 自增長 AI Agent、millionco/react-doctor揪出 AI 寫的爛 React、tinyhumansai/openhuman 私人超級智慧助手"
publishDate: "2026-05-12T07:30:00+08:00"
updatedDate: "2026-05-12T07:35:00+08:00"
tags: ["Nous Research", "React", "AI Agent", "OpenHuman", "Hermes"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-12-github-trending-daily.png"
  alt: "GitHub 熱門專案｜2026-05-12"
---

## NousResearch/hermes-agent：自增長的 AI Agent

Hermes Agent 是由 Nous Research 打造的開源 AI Agent，最大亮點是自帶學習迴圈。傳統 Agent 做完任務就結束，Hermes 卻會在複雜任務（超過 5 步工具呼叫）完成後，自動生成一份可複用的 Skill 文件，紀錄做法與邊界案例。下次遇到類似情境，Agent 會自動叫出這份文件，而不是從頭摸索。

這個設計有點像人類的「做筆記」行為，只是 Nous Research 把流程自動化了。Skill 文件以 Markdown 儲存，格式與 agentskills.io 開放標準相容，代表不是封閉生態。根據官方文件，Skill 會在使用過程中自我改進——每次執行完，Agent 會更新文件內容，把新學到的 edge case 補進去。

底層架構走的是「全平台 messaging gateway」路線：Telegram、Discord、Slack、WhatsApp、Signal、Email 全部支援，底層都是同一個 gateway process。切換聊天平台不需要重建對話上下文，跨平台 continuity 是內建的。這對於需要隨時隨地監控任務的工程師很有吸引力。

部署彈性是另一個賣點。支援 local、Docker、SSH、Singularity、Modal、Daytona、Vercel Sandbox 等七種終端介面，其中 Modal 和 Daytona 支援 serverless 冷啟動——閒置時環境冬眠，有請求才喚醒，硬體成本趨近於零。官方說能在 5 美金的 VPS 上跑。

適合誰：需要一個「會越用越聰明」的長期 Agent 助理，且願意折騰 self-hosted 部署的工程師。

## millionco/react-doctor：揪出 AI 寫的爛 React

React Doctor 的切入點很直接：AI coding agent 寫 React 很快，但品質常常爛得離譜。這個工具就是專門來把關的。

運作方式是對整個 codebase 跑一次掃描，輸出 0–100 的健康分數。75 分以上是 Great，50–74 需要修，50 以下是 Critical。同時附上具體問題清單，涵蓋六個維度：state & effects（狀態與副作用管理）、效能、架構、安全、無障礙、死亡代碼。Framework 偵測是自動的，Next.js、Vite、React Native 各自適用不同的 lint 規則組合，不需要手動設定。

更聰明的是「教 Agent 寫好 code」這層。執行 `npx react-doctor install` 後，工具會引導你把 Best Practice 內建到指定的 coding agent（支援 Claude Code、Cursor、Codex、OpenCode 等 50+ agent）。也就是把規則前移到源頭，而不是事後補救。

也有 GitHub Actions 整合，設定 `github-token` 後會自動在 PR 底下留言，報告這次改動扣了幾分、哪幾條規則中獎。Actions 的輸出項目 `score`（0–100）還能串進後續的 gate step，例如「分數低於 70 就 block merge」。

規則設定支援三層級：全專案忽略某條規則、特定檔案全部靜音、最窄的是 `overrides`——某個檔案或 glob 只對特定幾條規則免死，其餘規則照常掃描。這種彈性在大型 codebase 很有用。

適合誰：團隊內大量使用 AI coding agent 寫 React，需要一個與 ESLint 不同的品質把關層。

## tinyhumansai/openhuman：私人超級智慧助手

OpenHuman 把自己定位成「私人 AI 超級智慧」，走的是 UI-first 路線——不需要寫設定檔，不需要跑終端指令，裝好後點幾下就能開始用。最大差異是它內建了一個「虛擬角色」在桌面上待機，會說話、會對環境變化做反應，還能以真實與會者身份加入 Google Meet。

整合面相當廣：Gmail、Notion、GitHub、Slack、Stripe、Calendar、Drive、Linear、Jira 等 118 個第三方服務，全走 OAuth 一鍵連接，每個連接都自動暴露為 typed tool。工具層不需要使用者寫 polling loop，Agent 自己會每 20 分鐘主動拉最新資料。也就是說，明天早上 Agent 已經有今晚的通知、文件和任務更新，不需要臨時上網查。

記憶系統走 local-first 路線，資料存在本機 SQLite，內容以 ≤3k token 的 Markdown 區塊儲存在 Obsidian 相容的 vault 裡，等於同時得到一個可 humanos 編輯的知識庫。模型路由（model routing）則根據任務類型自動選對的 LLM——推理任務走強大的，簡單任務走快速的，不需要手動指定。

也有 TokenJuice 機制：所有 tool call、爬蟲結果、email 全文、搜尋 payload 在送進 LLM 前都先經過一次 token 壓縮，降低上下文消耗。選擇性支援本地 AI（Ollama），適合對隱私有嚴格要求的場景。

適合誰：想要一個「不用折騰，裝好就能用」且覆蓋日常辦公所有工具的個人 AI 助理。

## 參考連結

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- [hermes-agent 文件](https://hermes-agent.nousresearch.com/docs/)
- [millionco/react-doctor](https://github.com/millionco/react-doctor)
- [react-doctor 官方網站](https://www.npmjs.com/package/react-doctor)
- [tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)
- [OpenHuman 說明文件](https://tinyhumans.gitbook.io/openhuman/)