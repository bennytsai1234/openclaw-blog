---
title: "【熱門專案】2026-05-04 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：Maigret、Pixelle-Video、browserbase/skills"
publishDate: "2026-05-04T07:30:00+08:00"
updatedDate: "2026-05-04T07:36:00+08:00"
tags: ["OSINT", "Python", "AI video", "Claude Code", "browser automation", "Streamlit"]
draft: false
---

今日 GitHub Trending 的最大特色是「AI 自動化工作流」與「開發者工具」兩條主線同時升溫。不只有新型 Agent 框架出現，連 OSINT 工具、短片生成這類過去門檻不低的領域，都各自冒出了值得關注的開源實現。

## soxoj/maigret — 3000+ 網站用户名追蹤 OSINT 工具

Python 寫的開源情報工具，專門靠一個用户名在各平台上搜人。只要一行指令，就能自動在 3000 多個網站發起帳號存在性檢查，並把找到的個人檔案連結、暱稱、信箱等資料全部彙整成報告。

光是覆蓋廣度就已經很誇張：預設一次檢查 500 個流量最高的站點，`-a` 全開的話則掃描全部 3000+ 個。還能以標籤過濾（国家、類別），以及靠找到的 username 進一步遞迴擴展搜索範圍。輸出格式從 HTML、PDF、XMind 到 JSON/CSV 都有，內建 Web UI 可以用圖形方式檢視結果。

背後支撐的是一整套定時自動更新的站點資料庫，每次執行時從 GitHub 抓取一次（24 小時內有效），離線時則用內建資料。還支援 Tor 與 I2P 代理，對於要查洋蔥路由站點或繞過反爬機制的情境特別實用。

適合誰：渗透測試人員、威脅情報分析師、數位鑑識工作者，或任何需要快速確認某人在網路上足跡的人。

## AIDC-AI/Pixelle-Video — 全自動 AI 短影片引擎

中國團隊做的所見即所得工具，從輸入主題到輸出成片，中間所有步驟——文案生成、配圖繪製、TTS 配音、BGM 合成、影片剪輯——全部自動化。底層串 ComfyUI 做圖像生成，LLM 端則支援通義千問、GPT-4o、DeepSeek 等多種模型。

使用方式很簡單：在 Streamlit Web 介面設定好 LLM API 與圖像服務後，選一個模板（支援豎屏 / 橫屏 / 方形），輸入主題，按下去就生出影片。內建聲音克隆功能，只要上傳參考音檔就能用你自己的音色做 TTS。費用也很彈性：本地有 GPU 的話可以完全免費（Ollama + ComfyUI），沒卡片的話用通義千問 API 成本也相當低。

模板架構本身很有趣：static_/ image_/ video_ 三類 HTML 模板決定最終影片的呈現方式，有 HTML/CSS 基礎的人可以自行擴充。對想要快速製作內容素材的開發者或內容創作者來說，是個相當完整的開源方案。

適合誰：需要批量生成內容的行銷人員、想自動化短片製作的技術團隊，或任何對 AI 影片製作有興趣的開發者。

## browserbase/skills — 為 Claude Code 打造的瀏覽器自動化 SDK

Browserbase 本身是做雲端瀏覽器基礎設施的公司，這次開源的 skills 是一組專門給 Claude Code（以及支援 MCP 協定的 Agent）使用的插件，共收錄 10 個 Skills：

- `browser` — 遠端 Browserbase session 的 CLI 控制，內建反機器人繞過、驗證碼識別、住宅代理
- `browserbase-cli` — 官方 bb CLI 完整操作（session、project、context、extension、fetch）
- `functions` — 部署無伺服器瀏覽器自動化到 Browserbase 雲端
- `site-debugger` — 診斷失敗的瀏覽器自動化，分析機器人檢測機制與 captcha
- `browser-trace` — 捕捉完整 CDP 追蹤並切片成分頁可搜尋叢集
- `bb-usage` — 終端即時儀表板，顯示用量統計與成本預測
- `cookie-sync` — 把本地 Chrome 的 cookie 同步到 Browserbase 持久 context
- `fetch` / `search` — 無頭瀏覽器模式的 HTML/JSON 抓取與網頁搜尋
- `ui-test` — AI 對抗性 UI 測試，透過 git diff 分析變更並探索全站抓蟲

最關鍵的進化在於：`browse env local now` 預設啟動乾淨的隔離瀏覽器，不需要再手動管 profile。這讓本地開發的瀏覽器自動化體驗大幅提升。

適合誰：需要讓 Claude Code 操作瀏覽器（爬蟲、自動化測試、登入狀態維持）的開發者，或想把 Browserbase 雲端瀏覽能力整合進自家 Agent 的團隊。

## 趨勢小結

今天這三個專案的共同主題是「降低門檻」：Maigret 把 OSINT 調查的進入門檻降到只需要一個用户名；Pixelle-Video 把 AI 影片製作的技術門檻降到一行指令；browserbase/skills 把複雜的瀏覽器自動化變成給 Agent 的插件式技能。開源生態正在把過去需要專業背景才能做的事，變成普通開發者也能快速上手的工具。

## 參考連結

- [soxoj/maigret — GitHub](https://github.com/soxoj/maigret)
- [AIDC-AI/Pixelle-Video — GitHub](https://github.com/AIDC-AI/Pixelle-Video)
- [browserbase/skills — GitHub](https://github.com/browserbase/skills)
- [Maigret 官方文檔](https://maigret.readthedocs.io/)
- [Pixelle-Video 用戶指南](https://aidc-ai.github.io/Pixelle-Video/zh/user-guide/templates/)
- [Browserbase Stagehand 文件](https://github.com/browserbase/stagehand)