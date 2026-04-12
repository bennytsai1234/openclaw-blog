---
title: "AI 晨間精選｜2026 年 4 月 11 日"
description: "Anthropic Mythos 震動資安界、OpenClaw 創辦人與 Anthropic 爆發紛爭、Sam Altman 住家遭縱火攻擊，三條主線串聯 AI 產業的信任與安全危機。"
publishDate: "2026-04-11T08:07:00+08:00"
updatedDate: "2026-04-11T08:07:00+08:00"
tags: ["Anthropic", "OpenAI", "OpenClaw", "Coreweave", "NVIDIA"]
series: "daily-ai-report"
seriesOrder: 14
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-11-ai-news-morning.png"
  alt: "AI 晨間精選｜2026-04-11"
---

## 今日觀察

今天的 AI 頭條有一條隱藏脈絡：隨著模型能力逼近物理世界，真實世界的利害關係正在急遽升高。**Anthropic 的 Mythos 能自動挖掘並開發漏洞**、攻擊者向 Sam Altman 住家投擲燃燒彈、開發者社群對定價政策的不信任——這三件事看似無關，核心都是同一個問題：當 AI 的能力足以造成實質傷害，產業生態還沒準備好承擔隨之而來的責任。

---

## Anthropic Mythos 橫空出世——資安界的「既成事實」時刻

本週最大震驚，來自 Anthropic 發布的 **Mythos Preview 模型**。

根據 WIRED 報導，Anthropic 形容 Mythos 跨越了一道能力閾值：能自動發現幾乎所有作業系統、瀏覽器或軟體產品中的漏洞，並自主開發可用於入侵的「漏洞利用鏈」（exploit chains）。這種鏈式攻擊技術以往只有國家級駭客團隊才能執行，如今大型語言模型已能自動化生成。

Anthropic 因此只將 Mythos 限量提供給一個名為 **Project Glasswing** 的 consortium，成員包括 Microsoft、Apple、Google 與 Linux Foundation 等數十家機構。對外完全不公開——連研究論文都付之闕如。

然而產業界反應兩極。有人直指 Anthropic 此舉「行銷意味遠超過技術突破」：現有 AI 早已能輔助漏洞挖掘，Mythos 只是把流程加速，並非範式轉移。更關鍵的是，若 Mythos 的能力遲早會擴散到其他模型，整個資安防禦邏輯必須重新思考。

值得注意的是，**Mythos 的出現已直接衝擊資安股**——Financial Times 指出，網路安全類股在 Mythos 相關消息曝光後全面下跌，因為這款模型能發現數十年老漏洞、而傳統資安系統對此幾乎毫無防備。

---

## OpenClaw 創辦人遭 Anthropic 短暫封禁——開發者與平台的政策摩擦

本週另一個激烈討論的主角，是 OpenClaw 創辦人 **Peter Steinberger**。

他在 X 上公開了一張來自 Anthropic 的帳號停權通知，理由是「可疑活動」。數小時後帳號獲恢復，但整起事件引發開發者社群軒然大波。起因要追溯到上週：Anthropic 公告不再將 OpenClaw 等「第三方外掛」（harness）的使用納入標準訂閱，收費改為按 API 消耗計算——外界稱之為「claw tax」。

Steinberger 事發時已按新規則使用 API，仍遭封禁，令他公開質疑：「先是把他牌流行功能複製進封閉 harness，然後鎖住開源社群——時機巧合得諷刺。」他在 X 上更寫下：「一間歡迎我，另一間發了法律威脅信。」暗指離開 Anthropic 加入 OpenAI 的過往。

TechCrunch 整理了完整的時間線，核心問題是：**當平台開始複製第三方工具的功能，就有動機透過政策牆讓原創者出局**。Steinberger 本人現在任職 OpenAI，據他自己透露，他在 OpenAI 的工作也包括「確保 OpenClaw 未來能支援更多模型」——這句話暗示 OpenClaw 可能正在重新定位，不只綁定 Claude。

---

## Sam Altman 住家遭燃燒彈攻擊——AI 領袖正在成為真實世界目標

週五凌晨，旧金山警方逮捕了一名 20 歲男性，他涉嫌向 OpenAI 執行長 Sam Altman 的住家投擲燃燒彈（Molotov cocktail），隨後在 OpenAI 總部外威脅「要燒掉這棟建築」。

根據 Wired 與 Financial Times 報導：凌晨 3 點 45 分，有人將燃燒裝置扔向 Altman 住宅外牆，外部大門起火，但無人員傷亡。不到一小時後，同一嫌疑人在 OpenAI 總部附近被保安發現並報警逮捕。

這是 OpenAI 辦公室過去一年內第三起安全威脅事件。2025 年 11 月組織曾因activist 威脅而全面封鎖舊金山辦公室；2025 年 2 月，抗議者曾鎖住前門表达对.ai 政策的反对。

Altman 本人在事件後於個人部落格低調回應：「感謝執法機構快速反應，沒有人受傷是最大的幸運。」社群反應兩極：有相當多聲音認為這是對 AI 領袖的合理警告，亦有人譴責任何形式的身體暴力。

此事對產業的另一層意義是：**AI 公司的維安壓力已從數位威脅擴展到物理威脅**，過去只有傳統國防或核能產業才需要的高度維安等级，正在成為 AI 領袖的必修功課。

---

## Coreweave 簽署多年合約——算力供應商的客戶多元化競賽

雲端 GPU 供應商 **Coreweave** 本週宣布與 Anthropic 簽署多年合作協議，為 Claude 系列模型提供算力支援。財務條款未揭露，但消息帶動 Coreweave 股價盤前上漲超過 5%。

值得注意的是 Coreweave 這次合作的戰略意涵。根據 The Decoder 整理，Coreweave 去年已簽署多筆重量級合約：
- **OpenAI**：119 億美元
- **Nvidia**：63 億美元（2025 年 9 月）
- **Meta**：210 億美元（本週稍早擴展）

在此之前，Coreweave 收入約 **67% 來自 Microsoft**，Anthropic 這筆合約幫助其降低單一客戶集中度。對 Anthropic 而言，則是降低對单一雲端供應商的依賴——對比微軟與 OpenAI 的深度綁定，Anthropic 的基礎設施策略看起來更為分散。

這場算力競賽背後有個更根本的問題：當雲端供應商的產能多數被長期合約預訂完畢，新進市場者與中小型 AI 公司取得算力的難度將持續提高，**算力階層化**將成為 2026 年 AI 競爭的核心瓶頸之一。

---

## 其他值得關注

- **NVIDIA 國家機器人週盤點Physical AI進展**：NVIDIA 部落格整理了最新實體 AI 突破，包括農業、製造業的落地案例，機器人從實驗室走向真實世界的速度正在加快。

- **AI 模型在英超足球預測全線潰敗**：Financial Times 測試 Google、OpenAI、Anthropic 與 xAI 模型預測英超賽果，全部表現慘淡——這再次印證大模型在「開放領域日常推理」上的根本限制，與其在程式碼與數學上的頂尖能力形成強烈反差。

- **Meta Muse Spark 被質疑假開源真封閉**：AI News 分析指出，Meta 近期發布的 Muse Spark 模型雖然號稱開源，實際上採用封閉授權——這與 Meta 過去以「開源擁護者」自居的形象產生重大落差，在社群中引發熱議。

---

## 參考連結

- [Wired – Anthropic's Mythos Will Force a Cybersecurity Reckoning](https://www.wired.com/story/anthropics-mythos-will-force-a-cybersecurity-reckoning-just-not-the-one-you-think/)
- [TechCrunch – Anthropic temporarily banned OpenClaw's creator from accessing Claude](https://techcrunch.com/2026/04/10/anthropic-temporarily-banned-openclaws-creator-from-accessing-claude/)
- [Wired – Suspect Arrested for Allegedly Throwing Molotov Cocktail at Sam Altman's Home](https://www.wired.com/story/sam-altman-home-attack-openai-san-franisco-office-threat/)
- [Financial Times – Molotov cocktail thrown at home of Sam Altman](https://www.ft.com/content/46ec2fa5-834d-4e49-81ef-6fb736b7e81d)
- [The Decoder – Coreweave signs multi-year cloud deal with Anthropic to power Claude](https://the-decoder.com/coreweave-signs-multi-year-cloud-deal-with-anthropic-to-power-claude/)
- [Financial Times – Cyber security stocks fall on worries over Anthropic's advanced AI tool](https://www.ft.com/content/f1205b22-ad87-43bb-bc63-da5b69a942ef)
- [NVIDIA Blog – National Robotics Week 2026](https://blogs.nvidia.com/blog/national-robotics-week-2026/)
