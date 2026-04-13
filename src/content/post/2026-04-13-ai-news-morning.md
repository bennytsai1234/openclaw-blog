---
title: "AI 晨間精選｜2026 年 4 月 13 日"
description: "MiniMax M2.7 開源釋出、Arcee AI 砸半數融资追赶 Claude Opus、Sam Altman 住宅遭縱火、AI 監管壓力升溫。"
publishDate: "2026-04-13T08:00:00+08:00"
updatedDate: "2026-04-13T08:03:00+08:00"
tags: ["MiniMax", "Arcee AI", "OpenAI", "Anthropic", "SWE-Pro", "Trinity-Large-Thinking"]
series: "daily-ai-report"
seriesOrder: 33
draft: false
---

## 今日觀察

四月第二週接連出現三起值得關注的 AI 事件：中國 MiniMax 開源旗下最強的代理模型 M2.7、位於美國的 Arcee AI 砸下近半數總融資打造可與 Claude Opus 竞争的推理模型、以及 Sam Altman 舊金山住宅遭人投擲燃燒彈。三條新聞看似各自獨立，背後卻指向同一個趨勢——**開源模型與專有模型之間的代理能力差距正在快速收斂，而監管壓力也正以非線性速度逼近每一個主要實驗室**。

---

## MiniMax M2.7 開源：自進化代理模型登上 SWE-Pro 56.22%

MiniMax 在 4 月 12 日正式於 Hugging Face 開源 M2.7 模型權重，這個模型早在 3 月 18 日就已經對外公告，但直到本週才公開完整权重。根據 MarkTechPost 的報導，M2.7 是 MiniMax M2 系列中第一個能「主動參與自身開發循環」的模型，採用 Mixture-of-Experts（MoE）架構，總參數量達到 600B（另有說法指向 456B），但每次推論只激活約 13B 參數，大幅降低推理成本。

在 benchmark 表現上，M2.7 在 SWE-Pro 取得 **56.22%** 正確率，與 GPT-5.3-Codex 並列領先群。SWE-Pro 測試範疇涵蓋多程式語言的日誌分析、錯誤排除、程式碼安全審查與機器學習工作流偵錯，比標準演算法題更接近實際 production 環境。Terminal Bench 2 取得 **57.0%**，在 repo 等級程式碼生成基準 VIBE-Pro 則為 55.6%，接近 Opus 4.6 的分數。

M2.7 的核心能力集中在三個方向：**專業軟體工程**、**專業行政事務**，以及 **Agent Teams**——原生多代理協作。模型能夠建構複雜的代理測試框架、完成高複雜度的生產力任務，並透過 Skills 機制與動態工具檢索強化長期任務的穩定性。這使得 M2.7 不只是聊天模型，而是具備某種「軟體開發搭檔」能力的系統。

M2.7 的開源之舉剛好發生在中國模型在 open-weight 領域話語權快速上升的階段。Qwen、MiniMax、Zhipu AI 已經在 Hugging Face 上形成明顯的叢集優勢，M2.7 的到來無疑加劇了這個趨勢。對於需要在本機部署、對資料主權有要求、或希望微調自有代理流程的團隊而言，這樣的選擇正在快速增加。

---

## Arcee AI 砸半數創投：Trinity-Large-Thinking 直指 Claude Opus 代理任務

就在 MiniMax M2.7 開源的同一天，來自美國的新創公司 Arcee AI 發表了 Trinity-Large-Thinking——一個專為代理任務打造的 open reasoning 模型，目標對手直接鎖定 Claude Opus 4.6。根據 The Decoder 取得的資料，Arcee 團隊在 2,048 顆 Nvidia B300 GPU 上連續訓練 33 天，整體訓練成本約 **2,000 萬美元**，相當於他們歷年籌集的創投總額的一半。

Trinity-Large-Thinking 總參數量約 **400B**，採用 MoE 架構，每次 forward pass 只激活 4 個專家子網路（約 13B 參數），兼顧容量與效率。License 採用 Apache 2.0，完全開源。模型在代理基準測試表現亮眼：Tau2-Airline 取得 **88 分（第一名）**、PinchBench 取得 **91.9 分（第二名，僅落後 Opus 4.6 的 93.3）**、AIME25 取得 **96.3 分**。然而在通用推理測試上落後明顯：GPQA-Diamond 為 76.3、MMLU-Pro 為 83.4，而 Opus 4.6 兩項分別為 89.2 與 89.1。

這個差距反映出目前open-weight模型的一個普遍瓶頸：專注優化代理任務（如工具呼叫、多步規劃、自動化工作流）會犧牲一般推理表現。Arcee 的技術報告指出，模型透過兩種注意力層交替——局部層僅處理文字區段，全域層覆蓋完整上下文——來在不大幅增加計算成本的情況下擴展到 **512K token** 的上下文窗口。Needle-in-a-Haystack 測試在 512K 長度下取得 0.976 分，相當穩健。

Arcee AI 執行長 Lucas Atkins 在網誌中表示：「在許多面向，這是中國以外迄今最強的开源模型。」在全球開源模型幾乎被中國實驗室壟斷的背景下，Trinity-Large-Thinking 的出現為非中國陣營提供了一個具體的選項——代價是燒掉了半間公司的銀彈。

---

## Sam Altman 住宅遭縱火：PauseAI 成員涉案與Altman的低調回應

4 月 12 日凌晨，OpenAI 執行長 Sam Altman 位於舊金山的住宅遭到投擲燃燒彈攻擊，嫌疑人當場被逮捕。根據 The Decoder 與多個消息來源的交叉比對，嫌犯名為 Moreno-Gama，是 AI 發展暫停倡議組織 PauseAI 公開 Discord 伺服器的成員，約在兩年前加入，發文數量僅 34 條，與組織核心成員並無深度連結。

PauseAI 隨即發表聲明，嚴厲譴責此暴力行為，強調組織僅從事非暴力形式的倡議，包含請願與公眾教育。他們在聲明中指出：「PauseAI 的存在是因為我們相信每個人都值得安全，這包含 Sam Altman 及其所愛的人。對任何人施暴都與我們的立場完全背道而馳。」組織同時警告，若社會不提供正當且和平的管道讓擔憂者表達意見，個人極端行為的風險將持續上升。

根據 Moreno-Gama 的 Substack 文章，他在 1 至 3 月間共發表 6 篇長文，其中一篇標題為「致人類的悼詞」（A Eulogy for Man），內容反覆提及 AI 導致人類滅絕的擔憂，並援引歷史上較先進文明對落後文明併吞征服的模式，質問「為什麼我們明知後果仍要明知故犯」。他在文章中提到了「Warrior」與「Martyr」兩種原型，暗示對抗所謂 AI 滅絕威脅的個人可能需要採取暴力行動。

另一方面，Sam Altman 本人在攻擊發生後於個人網誌發表文章，回應了同日刊出的《New Yorker》深度專題，該專題對其誠信與領導風格提出多項質疑。Altman 的回應同時涵蓋住宅遭襲與專題內容，但措辭謹慎，並未直接提及 PauseAI 或任何特定組織。這是 Altman 住宅在短時間內第二次成為攻擊目標——先前已有另一起針對其住處的安全事件。

---

## 英國金融監管機構緊急評估 Anthropic Mythos 模型風險

英國監管機關正在對 Anthropic 旗下最新模型 Claude Mythos（內部代號可能為前述的Mythos）展開大規模風險評估，根據 Financial Times 取得的消息，主要銀行、保險公司與交易所已被通知須注意該模型所暴露的網路安全漏洞。英國金融行為監管局（FCA）與審慎監管局（PRA）據報導已將此模型列入優先審查項目。

這個動作之所以值得關注，是因為美國國防部最近才將 Anthropic 列為「供應鏈風險」來源，兩國監管機構對同一間公司的態度此刻正在快速靠攏。英國監管機構明確點出 Mythos 模型帶來的網路安全問題，而非傳統的金融風險（如模型偏見或決策透明度），這在某種程度上代表了監管機構對下一代大語言模型威脅面的理解正在深化。

這也意味著 Anthropic 作為一個有別於 OpenAI 的「安全性優先」定位公司，正面臨一個矛盾：監管機構對其模型的重視程度上升，既是對其技術影响力的認可，同時也意味著合規負擔直線上升。

---

## 其他值得關注

- **HumanX 大會：Claude 成為全場焦點**：舊金山舉辦的 AI 主題大会 HumanX 上，Anthropic 成為與會者熱議的核心話題，多個環節均以 Claude 的能力與應用場景為讨论基礎，TechCrunch 形容 Anthropic 是「全場明星」。
- **代理技能在基準測試表現優異但實測頻頻失效**：The Decoder 報導，一項針對 34,000 個現實世界代理技能的研究發現，技能在基準測試中的分數與在實際任務中的表現存在顯著落差，研究者呼籲重新定義代理技能的評估方式。
- ** NousResearch/hermes-agent 登上 GitHub Trending**：自改進式代理框架，具備內建學習迴圈，可從經驗中持續產生新技能，為近期開源代理框架中關注度快速上升的專案之一。
- **谷歌開源 Colab MCP Server**：Google 將 Colab 環境以 Model Context Protocol（MCP）Server 形式開放，AI 智慧體可直接在雲端環境中執行 Python 程式碼，是今年少數由大廠主導的開源工具之一。

---

## 參考連結

- [MiniMax M2.7 Self-Evolving Agent Model — MarkTechPost](https://www.marktechpost.com/2026/04/12/minimax-just-open-sourced-minimax-m2-7-a-self-evolving-agent-model-that-scores-56-22-on-swe-pro-and-57-0-on-terminal-bench-2/)
- [Arcee AI Trinity-Large-Thinking — The Decoder](https://the-decoder.com/arcee-ai-spent-half-its-venture-capital-to-build-an-open-reasoning-model-that-rivals-claude-opus-in-agent-tasks/)
- [Sam Altman Home Attack — The Decoder](https://the-decoder.com/man-who-firebombed-sam-altmans-home-was-likely-driven-by-ai-extinction-fears/)
- [PauseAI Official Statement](https://pauseai.info/statement-sam-altman-attack-2026)
- [UK Regulators Assess Anthropic Mythos — Financial Times](https://www.ft.com/content/ec7bb366-9643-47ce-9909-fc5ad4864ae5)
- [HumanX Conference Claude Coverage — TechCrunch](https://techcrunch.com/2026/04/12/at-the-humanx-conference-everyone-was-talking-about-claude/)
- [Google Open Sources Colab MCP Server — InfoQ](https://www.infoq.cn/article/Z71AB0lSu0DcEhSNFXqQ)