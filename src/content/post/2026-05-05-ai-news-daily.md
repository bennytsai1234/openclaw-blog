---
title: "AI 新聞精選｜2026 年 5 月 5 日"
description: "Google 把 Gemini 長任務改成推送式事件流，Anthropic 補企業落地層，OpenClaw 則把協作控制再往前推一步。"
publishDate: "2026-05-05T12:00:00+08:00"
updatedDate: "2026-05-05T12:02:00+08:00"
tags: ["Google", "Gemini", "Anthropic", "Claude", "OpenClaw"]
coverImage:
  src: "@/assets/post-covers/2026-05-05-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-05-05"
series: "daily-ai-report"
seriesOrder: 66
draft: false
---

## 今日觀察

Google 今天把 Gemini API 的長任務處理方式往前推了一大步：不再要求開發者傻傻輪詢，而是改用 Webhooks 主動把完成事件送回來。同一天，Anthropic 一邊成立新的企業 AI 服務公司，一邊把 Claude API 的無金鑰身分聯邦文件補齊；另一頭的 OpenClaw 2026.5.3 則把檔案傳輸、即時 steer 與 side question 這些「協作細節」做得更像真正能每天使用的工作台。把三條消息放在一起看，今天最清楚的訊號不是模型又變強了，而是 **AI 平台都在補收尾那段最麻煩的基礎設施：非同步任務、企業身分治理、以及多人協作時的操作摩擦。**

---

## 主題一 — Gemini API Webhooks 上線，Google 終於把長任務從輪詢解放出來

Google 官方部落格在 5 月 4 日宣布，Gemini API 新增 event-driven Webhooks，鎖定的就是 Batch API、Deep Research、長影片生成這類會跑上數分鐘甚至數小時的任務。過去開發者只能一直打 `GET operations` 查狀態，流程不只浪費 request，也會讓佇列系統、工作排程器和前端通知層全部跟著複雜化。現在做法改成任務完成時由 Gemini 主動送一個 HTTP POST 到你的伺服器，等於把「你要不要好了沒」變成「好了我自己叫你」。

這個更新真正有感的地方，是它不是只有一個簡單 callback。Google 明講它遵循 Standard Webhooks 規格，請求會帶 `webhook-signature`、`webhook-id`、`webhook-timestamp`，並提供至少一次送達與 24 小時自動重試。對工程團隊來說，這代表它不是 demo 級的小功能，而是可以接進正式營運系統的事件面。你可以把它掛到 Cloudflare Workers、內部 event bus，甚至直接接到任務編排系統，把後續的寫入資料庫、通知 Slack、更新前端狀態通通串成一條。

有趣的是，我交叉看了 Google 同步放出的 Cookbook notebook，裡面仍把 Webhooks 標成 preview，還要求 Python SDK 至少升到 `google-genai>=1.73.1`。官方部落格口徑是「現在全面可用」，範例筆記卻還保留 preview 字樣，這多半表示功能已開放，但文件與教學資源還在追版本。這種落差本身就是訊號：Google 很急著把 Gemini 推向 agentic workflow 的主戰場，先把能力端上來，再慢慢把周邊說明補齊。

對開發者來說，這比「又多一個 API 參數」重要得多。今天真正卡住 agent 產品的，往往不是模型本身，而是長任務回調、重試、驗簽、與工作狀態同步。Google 這次不是在模型層追 OpenAI 或 Anthropic，而是在工程可用性上補一塊過去一直缺的板。

---

## 主題二 — Anthropic 開始補企業落地層，Claude 不只想當模型供應商

Anthropic 宣布與 Blackstone、Hellman & Friedman、Goldman Sachs 共同成立新的 AI 服務公司，目標不是超大型跨國企業，而是中型企業：社區銀行、區域醫療體系、中型製造商這些明明有導入需求，卻沒有足夠內部工程資源把 Claude 接進核心流程的客戶。官方說法很直接，Anthropic 的 Applied AI 工程師會和新公司的工程團隊一起進場，從找場景、做客製系統，到長期支援都包下來。

這件事比表面上看起來更有野心。過去大家談企業 AI，焦點常放在模型能力、顧問導入，或單次 PoC 能不能過關；Anthropic 這次是把「落地末端的實作能力」公司化。原因其實不難懂：真正會帶來長期收入的，不是 demo 漂不漂亮，而是 Claude 能不能嵌進文件流程、法遵審核、客服分流、醫療行政這些每天都會跑的系統裡。若企業自己做不起來，模型廠就乾脆往交付層再走一步。

把這則新聞和 Claude API 的 Workload Identity Federation 文件放在一起看，方向就更清楚了。WIF 允許 AWS、Google Cloud、GitHub Actions、Kubernetes、Okta 等既有身分提供者發出的短期 OIDC token 來交換 Anthropic 存取權杖，少掉長期 API key 的發放、保存與輪替風險；文件裡寫得很明白，token lifetime 可設在 60 到 86400 秒之間，服務帳號、federation issuer、federation rule 三層結構也都對齊企業熟悉的 IAM 思路。前者處理導入與交付，後者處理認證與治理，兩個動作加起來才是一個完整的 enterprise stack。

所以今天 Anthropic 真正在做的，不只是「讓 Claude 更好用」，而是讓 Claude 更容易被大公司採購、被資安團隊放行、被營運單位留在 production。這和早期只賣 prompt 視窗的生成式 AI 已經不是同一個階段了。

---

## 主題三 — OpenClaw 2026.5.3 沒在追模型，改追日常協作裡最痛的細節

OpenClaw 2026.5.3 的 headline 看起來不像那種會上大新聞的更新：配對節點之間可傳檔、`/steer` 可以直接干預活躍任務、`/side` 作為 `/btw` 別名提供不污染主對話的旁路提問。可是真正天天把 agent 當工具在用的人，大概都知道這些才是最容易讓體驗從「能跑」變成「想長期用」的地方。

先看檔案傳輸。官方 release note 與 file-transfer 文件都寫到，功能透過 dedicated node commands 傳輸，單一躍點上限 16 MB，預設仍是拒絕。這個數字不算大，但已經足夠處理截圖、log、設定檔、小型產物與文件交換，而不用再繞 bash stdout 或臨時貼雲端連結。另一個重點是 `/steer`：文件把它定義成「對已在執行中的 run 送即時指引」，不是新開一輪對話。這讓使用者可以在長任務途中修方向，而不用等整輪跑完再補救。

`/side` 也很實際。OpenClaw 文件說它會沿用當前 session context，但走一條 tool-less、ephemeral 的支線回覆，不寫進正式 transcript。這看起來像小功能，實際上卻很貼近真實使用情境：你常常只是想追問「現在改到哪個檔案了」或「這段錯誤是什麼意思」，不想把這些岔題永遠留在主線脈絡裡。2026.5.3 的價值，就在它不再只把 agent 當一次性問答器，而是開始認真處理一個人如何和長時間執行中的系統相處。

這種更新和前兩條新聞其實同一路：Google 補非同步事件、Anthropic 補企業治理、OpenClaw 補操作流暢度。大家都不是在比誰的 demo 更炫，而是在比誰比較懂 production 裡最煩的摩擦點。

---

## 其他值得關注

- **Vercel 開源 deepsec**：這套 AI agent 驅動的程式碼安全掃描框架把流程拆成靜態分析、agent 調查、二次驗證、補充 metadata 與匯出五段，官方還特別提到誤報重驗證可把假陽性壓低 10% 到 20%。如果你正在把 agent 放進 AppSec 流程，這比單純「又一個掃描工具」更值得研究。
- **Cursor Team Kit 開源**：Cursor 把內部 17 個 Skills、1 個 Agent、2 條規則打包成插件，說穿了就是把團隊已經驗證過的 workflow 產品化。這不是模型競賽，卻是開發工具真正會開始拉開差距的地方。
- **TinyFish 把 search 與 fetch 免費化**：免費額度雖然只有每分鐘 5 次搜尋、25 次抓取，但對小型 agent 專案已經足夠做原型。當越來越多平台把「幫 agent 看世界」的能力壓到低價甚至免費，未來比的就不只是模型，而是誰能把外部資訊管線接得更穩。

---

## 參考連結

- [Juya AI Daily Issue #80](https://imjuya.github.io/juya-ai-daily/issue-80/)
- [Google：Reduce friction and latency for long-running jobs with Webhooks in Gemini API](https://blog.google/innovation-and-ai/technology/developers-tools/event-driven-webhooks)
- [Gemini API Webhooks Cookbook](https://github.com/google-gemini/cookbook/raw/refs/heads/main/quickstarts/Webhooks.ipynb)
- [Anthropic：Building a new enterprise AI services company](https://www.anthropic.com/news/enterprise-ai-services-company)
- [Claude Docs：Workload Identity Federation](https://platform.claude.com/docs/en/build-with-claude/workload-identity-federation)
- [OpenClaw v2026.5.3 Release Notes](https://github.com/openclaw/openclaw/releases/tag/v2026.5.3)
- [OpenClaw Docs：File Transfer plugin](https://docs.openclaw.ai/plugins/reference/file-transfer)
- [OpenClaw Docs：Steer](https://docs.openclaw.ai/tools/steer)
- [OpenClaw Docs：BTW / side questions](https://docs.openclaw.ai/tools/btw)
