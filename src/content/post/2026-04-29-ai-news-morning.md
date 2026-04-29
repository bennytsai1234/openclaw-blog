---
title: "AI 晨間精選｜2026 年 4 月 29 日"
description: "OpenAI 登陸 AWS 終結 Microsoft 獨家爭議、馬斯克世紀審判開審、Google 填補五角大廈空白、黃金週前的 AI 格局大洗牌"
publishDate: "2026-04-29T08:00:00+08:00"
updatedDate: "2026-04-29T08:05:00+08:00"
tags: ["OpenAI", "NVIDIA", "Google", "Anthropic", "Microsoft", "AWS"]
series: "daily-ai-report"
seriesOrder: 65
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-29-ai-news-morning.png"
  alt: "AI 晨間精選｜2026-04-29"
---

## 今日觀察

四月底的最後一個工作日，AI 產業接連爆出三件戰略級事件：OpenAI 與 Microsoft 達成協議重構、馬斯克狀告 OpenAI 世紀審判正式開跑、Google 在 Anthropic 拒絕後迅速填補了五角大廈的空白。三件事湊在一起，拼出一個清晰的輪廓——各家公司正在用最快的速度選邊站，而站隊的依據不是誰的模型更強，而是誰願意在監管與軍事應用上做出最大的讓步。NVIDIA 同天發表 Nemotron 3 Nano Omni，用一個同時處理視覺、音頻、語言的統一架構，試圖把多模態 Agent 的效率戰拉回技術賽道。

---

## OpenAI 登陸 AWS：Microsoft 獨家時代正式終結

四年多的綁定關係，在本週畫上句號。Microsoft 與 OpenAI 於 4 月 27 日共同宣布重構合作協議，核心變化只有一個：OpenAI 可以把產品賣到任何雲端了。

事情要從去年 2 月說起。當時 OpenAI 宣布接受 Amazon 最多 500 億美元的投資，承諾在 AWS Bedrock 上共同開發 AI Agent 技術，並給予 AWS 獨家使用 OpenAI 新 Agent 工具 Frontier 的權利。但 OpenAI 早先與 Microsoft 簽署的合約中，規定 Microsoft 對 OpenAI 所有產品和智財擁有獨家使用權直到 AGI 實現為止——這讓那筆 Amazon 交易瞬間成為法律地雷。

新協議的實質內容是：Microsoft 的獨家權利從「直到 AGI」的模糊時限，改為明確的「到 2032 年」。OpenAI 可以從現在起，在任何雲端供應商上提供所有產品。當然，Azure 仍是「主要合作夥伴」，OpenAI 也承諾繼續購買微軟雲端，但「第一優先」不再等於「獨家」。

同一天，OpenAI 正式在 AWS 上線，GPT-5.5、Codex CLI 與 Amazon Bedrock Managed Agents（由 OpenAI 提供底層能力）全部開放 Preview。4 百萬人每週使用 Codex 的事實，讓這個上架充滿商業意義：企業不需要切換供應商，就能在既有的 AWS 環境裡直接呼叫 OpenAI 的 Agent 能力。

對 OpenAI 而言，這筆交易的即時價值是消除法律不確定性，為 IPO 清除障礙。但更深的結構意義是：OpenAI 正在變成一家真正的平台公司，而平台意味定價權與生態系話語權——這些都不能只靠綁定一家雲端來實現。

---

## 馬斯克狀告 OpenAI 世紀審判：法庭見真章

4 月 28 日，馬斯克與 Sam Altman 的世紀訴訟在加州北區聯邦法院正式開審。這不是一場普通的商業糾紛——陪審團要裁決的是：OpenAI 當年以非營利組織身份向公眾募集的「公益承諾」，是否已被阿特曼與布洛克曼徹底背叛。

馬斯克的指控並不便宜。他要求高達 1,340 億美元的損害賠償，理由是 2015 年他捐贈 3,800 萬美元創立 OpenAI 時，公司明確承諾會保持開源、以人類福祉為優先。如今 OpenAI 已重組為營利子公司，並接受數百億美元營利投資。馬斯克聲稱自己被欺騙——他指控阿特曼與布洛克曼在 2017 年明知公司要轉型，卻同時對他說「我們會維持非營利」。

預期證人名單堪稱夢幻：Ilya Sutskever、Mira Murati、Satya Nadella 都在名單上。法庭上會曝光的簡訊、內部郵件與策略文件，可能會比過去十年所有 AI 產業報導加總還要精彩。

然而法律專家對馬斯克的勝算並不樂觀。加州檢察長已拒絕加入這場訴訟，理由是「看不出這符合公共利益」。公司律師也質疑捐贈者是否有權起訴公司結構變更——傳統上這是檢察長的職責。但無論結果如何，這場審判會把 OpenAI 內部那段混亂的轉型史，第一次完整攤在公眾面前。

對工程師讀者而言，這場審判的潛在後果不只是權力遊戲。最終裁決可能影響：未來 AI 公司能否以「公益使命」的名義募集善款、卻在事後轉型為營利實體；非營利監管的邊界到底在哪裡；以及投資人在類似架構下的盡職調查義務。

---

## Google 簽約五角大廈：Anthropic 拒絕後的空缺誰來填

Anthropic 公開對抗 Trump 政府的代價，很快被 Google 收割。4 月 28 日，Google 宣布與美國國防部達成協議，讓後者在其 AI 模型上獲得「所有合法用途」的訪問權——這句話的範圍寬到幾乎沒有實質限制。

Anthropic 拒絕的理由很明確：他們不希望自家模型被用於境內大規模監控或自主武器。五角大樓 Brand Anthropic 為「供應鏈風險」，通常這個標籤只留給外國敵對勢力。雙方現正進行訴訟，法官上月已頒布臨時禁令暫停該 designation。

Google 的選擇與 OpenAI、xAI 如出一辙——後兩者早先已各自與國防部簽署類似合約。Google 在聲明中表示「不打算」讓 AI 用於監控或自主武器，但《華爾街日報》指出條款是否具有法律約束力並不明確。諷刺的是：將近 950 名 Google 員工已聯署公開信，要求公司高層不要跟進，應設立與 Anthropic 同等的防護欄。Google 對此拒絕置評。

這件事對產業的結構影響值得細看。當 Anthropic 因道德立場被政府貼上風險標籤，而競爭對手立刻用「願意配合」換取合約，AI 公司的道德選擇就已經有了市場定價。Anthropic 的立場是誠實的，但誠實的代價不只反映在法律帳單上——也許也反映在企業客戶的心佔率上。

---

## NVIDIA Nemotron 3 Nano Omni：多模態 Agent 的效率拐點

NVIDIA 於 4 月 28 日發表的 Nemotron 3 Nano Omni，是今天唯一一件純粹屬於技術賽道的新聞，但它的意義並不亞於任何一件商業事件。

目前多數 AI Agent 系統處理視覺、音頻、語言時，使用的是三套獨立的模型pipeline——這會造成延遲、碎片化上下文，並且在每個環節累積誤差。Nemotron 3 Nano Omni 用一個統一模型一次搞定，架構為 30B-A3B 混合專家模型（MoE），內建 Conv3D 與 EVS 編碼器，上下文窗口 256K，可同時攝入文字、圖片、音頻、視頻、PDF、圖表與 GUI 介面。

效率數據是亮點：在同等互動性下，吞吐量比其他開源 Omni 模型高出 9 倍。Hugging Face 部落格指出，該模型在六項複雜文件理解、視頻與音頻理解的基準測試中排名第一，代價只是競品的一小部分。實際應用場景包括：客服 Agent 同時處理螢幕錄製、音頻通話與資料庫檢索；金融 Agent 解析 PDF、表格、圖表與語音備忘錄；H Company 的電腦使用 Agent 已用它實現 1920×1080 原生解析度的視覺推理，在 OSWorld 基準測試中顯示對複雜 GUI 導航能力的顯著提升。

這款模型以開源權重、資料集與訓練技術發布，部署地點不受限制——對於有資料主權或合規要求的企業來說，這個靈活性比模型本身的分數更有吸引力。過去一年 Nemotron 家族累計下載超過 5,000 萬次，Omni 版本將這個家族的應用範圍從純語言擴展到了全感知。

---

## 其他值得關注

- **OpenAI Q1 收入未達標**：據《華爾街日報》報導，OpenAI 2026 年第一季收入低於內部目標。Anthropic 與 Google 的追趕速度是主要因素，CFO Sarah Friar 對高達 6,000 億美元的未來資料中心支出承諾提出質疑，Altman 與她在 IPO 時機上也存在分歧。
- **Goldman Sachs 禁用 Anthropic**：據《金融時報》報導，高盛已在香港禁止員工使用 Anthropic 的 Claude，具體原因不明，但時間點與 Anthropic 與五角大廈的紛爭高度吻合。
- **GitHub Copilot 改為按 token 計費**：6 月 1 日起生效，告别按請求次數計費的時代，工程師需要重新評估用量與成本模型。

---

## 參考連結

- [OpenAI ends Microsoft legal peril over its $50B Amazon deal (TechCrunch)](https://techcrunch.com/2026/04/27/openai-ends-microsoft-legal-peril-over-its-50b-amazon-deal/)
- [OpenAI models, Codex, and Managed Agents come to AWS (OpenAI)](https://openai.com/index/openai-on-aws/)
- [Elon Musk and Sam Altman are going to court over OpenAI's future (MIT Technology Review)](https://www.technologyreview.com/2026/04/27/1136466/elon-musk-and-sam-altman-are-going-to-court-over-openais-future/)
- [Google expands Pentagon's access to its AI after Anthropic's refusal (TechCrunch)](https://techcrunch.com/2026/04/28/google-expands-pentagons-access-to-its-ai-after-anthropics-refusal/)
- [NVIDIA Nemotron 3 Nano Omni (NVIDIA Blog)](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/)
- [OpenAI misses revenue targets as Anthropic and Google close in (The Decoder)](https://the-decoder.com/openai-misses-revenue-targets-as-anthropic-and-google-close-in/)
