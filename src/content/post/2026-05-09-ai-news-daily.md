---
title: "AI 新聞精選｜2026 年 5 月 9 日"
description: "DeepSeek 籌備 500 億創紀錄融資、Anthropic 年化營收爆增 80 倍、螞蟻百靈發布 Ring-2.6-1T 思维模型。"
publishDate: "2026-05-09T12:00:00+08:00"
updatedDate: "2026-05-09T12:02:00+08:00"
tags: ["DeepSeek", "Anthropic", "螞蟻百靈", "MiniMax", "OpenClaw"]
series: "daily-ai-report"
seriesOrder: 84
draft: false
---

## 今日觀察

2026 年 5 月 8 日，DeepSeek 籌備首輪外部融資的消息占據了几乎所有 AI 產業媒體的版面。根據《華爾街日報》與多家中國財經媒體的報導，這家總部位於杭州的中國 AI 新創目標籌集人民幣 500 億元，若成事將創下中國 AI 企業史上最大單筆融資紀錄。同一天，Cloudflare 宣布全球裁員逾 1100 人，理由是過去三個月內部 AI 使用量激增超過 600%，必須為「agentic AI 時代」重新構建組織。這兩則新聞看似無關，卻指向同一個趨勢：AI 對產業結構的顛覆已經從實驗室滲透到公開市場與企業組織層面。

同一天稍晚，Anthropic CEO Dario Amodei 在舊金山的 Code with Claude 開發者大会上透露，公司第一季年化營收與使用量增長 80 倍，原本內部預測是 10 倍。這讓 Anthropic 的算力缺口成為輿論焦點，同時也讓 Mythos 模型引發的網路安全爭議顯得格外諷刺——專家陸續出來說，所謂「Mythos 能發現舊模型找不到的漏洞」，其實舊模型也能做到。

本週中國 AI 實驗室動態同样搶眼。螞蟻集團百靈團隊發布旗艦思維模型 Ring-2.6-1T，號稱在 PinchBench 擊敗 GPT-5.4 xHigh 與 Gemini-3.1-Pro，並在 OpenRouter 提供一週免費試用；阿里巴巴與高校團隊聯手提出 CDM 框架，將擴散模型蒸餾推進到連續時間優化，號稱 4 步推理就能達到 SOTA 等級影像生成。這兩件事加在一起，勾勒出中國 AI 在模型能力與底層架構兩個維度同步推進的意圖。

---

## 主題一 — DeepSeek 500 億籌資：中國 AI 超級獨角獸的誕生

過去 48 小時內，DeepSeek 的消息在矽谷與北京的 AI 社群同時引發熱議。根據 The Information 援引兩名直接了解討論情況的人士報導，DeepSeek 正尋求完成首輪外部融資，目標高達人民幣 500 億元（約 73.5 億美元）。若融資落地，連同本輪金額在內，整體估值可能突破人民幣 3500 億元（約 515 億美元）。

這個數字代表什麼意義？簡單對比：目前中國大模型領域最大的單筆融資來自階躍星辰即將完成的近 25 億美元，而月之暗面稍早的 20 億美元融資已經被刷新。若 DeepSeek 500 億人民幣的數字屬實，這將是第二名的兩倍以上，瞬間拉開差距。

知情人士透露，創辦人兼 CEO 梁文鋒計劃在這輪融資中個人出资最高額度，估計占總額的 40% 左右。國家集成電路產業投資基金（大基金）預計為第二大投資方，騰訊與阿里也傳出正在洽談入股。這個陣容顯示，DeepSeek 的首輪融資已經從純商業行為昇華為國家戰略意圖的體現。

這次融資正在推動 DeepSeek 加速商業化節奏。根據新浪財經取得的訊息，DeepSeek 已告知部分投資者，公司計劃提高模型發布頻率，使其更接近業界標準的迭代節奏。同時，公司計劃在 6 月推出 V4.1 版本，最大的改變是新增影像與音訊理解處理能力，並強化 MCP（模型上下文協定）適配，這是 AI 模型與其他軟體互聯互通的通用標準，目前在企業環境中的需求正在快速攀升。V4.1 的輸出形式仍將僅限文字生成，這表示多模態輸入不會立即改變 DeepSeek 的核心使用場景。

對產業觀察者而言，這輪融資最值得关注的不是金額本身，而是背後的信號意義：DeepSeek 一直以「不追求商業化」聞名，創辦人梁文鋒背後的幻方資本在量化交易領域有深厚積累，讓 DeepSeek 能夠長期以非營利導向的方式運營。如今這家以「閉源優先、研究驅動」姿態示人的公司，正在向投資人低頭——這預示著中國 AI 創業模式正在經歷一個根本性的轉向，從「技術理想國」走向「可持續商業路徑」。

---

## 主題二 — Anthropic 80 倍成長與 Cloudflare 裁員 1100 人：AI 取代工作的兩種真實切片

同一天（5 月 7 日），Cloudflare 執行長 Matthew Prince 向員工發出全員信件，宣布全球裁員逾 1100 人，約占員工總數的 20%。裁員的理由不是財務困難，而是「過去三個月內部 AI 使用量激增超過 600%」，公司需要為「agentic AI 時代」重新構建組織。Cloudflare 明確表示：「這不是削減成本的行動，也不是個人績效評估，而是 Cloudflare 在 agentic AI 時代如何運作並創造價值的定義。」

這個敘事與矽谷過去一年常見的「AI 導致裁員」論述有本質不同。Cloudflare 不是用 AI 工具取代人類工作者的單一崗位，而是整個組織的運作模式必須重新設計——600% 的 AI 使用量激增，意味著以前需要人類處理的 IT 運維、客戶服務、內部流程審批等工作，現在已經被 AI 自動化大量吸收。這種「組織重構」邏輯比「直接取代」更深層，也更難以逆轉。

同一天，Anthropic 在舊金山舉辦 Code with Claude 開發者大會，CEO Dario Amodei 透露，公司第一季年化營收與使用量增長了 80 倍，原本內部規劃的成長目標是 10 倍。這個數字讓 Amodei 本人在台上笑說「沒想到增長會變得這麼難以應付」。他提到，公司正在「盡可能快地提供更多算力容量，並盡快將其交付給用戶」。TechCrunch 此前報導，Anthropic 近期已與亞馬遜達成數十億美元的基礎設施協議，並宣布與 SpaceX 合作，將使用後者位於田納西州孟菲斯的 Colossus 1 資料中心全部計算容量，涉及超過 300 百萬瓦電力。

然而，爆炸性的成長也伴隨著爭議。Anthropic 的 Mythos 模型號稱能發現其他模型找不到的漏洞，引發網路安全社群熱議。但多名網路安全研究人員與專家隨即出來表示，Mythos 所發現的漏洞，使用 Anthropic 或 OpenAI 的舊有模型同樣能夠檢測到。這批專家認為 Mythos 的能力被嚴重夸大，更像是一種「基於恐懼的行銷敘事」。Anthropic CEO Amodei 在大會上為 Mythos 辯護，稱控制訪問權限的核心困難在於「誰可以獲得它」，而非算力限制，向過多組織開放可能帶來嚴重的網路安全風險。

把這兩則新聞放在一起，出現了一個極端的對比：Cloudflare 的例子說明，AI 正在以驚人的速度吸收白領例行工作的需求；Anthropic 的例子則說明，面對真正的 AI 龍頭廠商，市場需求遠遠超過供給，算力瓶頸比任何商業模式問題都更根本。

---

## 主題三 — 螞蟻百靈 Ring-2.6-1T：思維模型的 OpenRouter 試用賽

螞蟻集團百靈團隊在 5 月 9 日發布了其旗艦思維模型 Ring-2.6-1T，再次將開源與封閉模型之間的競爭推向新節點。這款模型並非完全意義上的開源——它是透過 API 收費提供服務，但即日起在 OpenRouter 與 Kilo Code 等平台提供一週免費試用，這種發布策略的意圖很明顯：吸引開發者實際測試，透過社群口碑擴散。

核心規格：Ring-2.6-1T 基於 63B 活躍參數（總參數量未公開），支持 262,144 token 上下文窗口，單次最大輸出 65,536 token。這個上下文長度在開源思維模型中屬於頂級配置，僅次於少數封閉模型。該模型最重要的技術創新是「自適應推理努力」（adaptive reasoning effort）機制，提供 high 與 xhigh 兩種模式，可根據任務複雜度動態分配算力。官方公布的基準測試結果顯示，該模型在 PinchBench 獲得 87.60 分，超越 GPT-5.4 xHigh 與 Gemini-3.1-Pro high；AIME 26 得分 95.83。

這個 benchmark 分數的可信度需要交叉驗證。PinchBench 並非主流基準，業界更常使用的數學推理基準是 MATH、AIME 與 ARC。螞蟻百靈選擇主動對標多個基準並列出分數，是一種透明的姿態，但缺乏第三方驗證。另外值得注意的是，OpenRouter 上的「免費試用」本身是一種行銷設計，而非嚴格的開源許可，這代表開發者社群無法真正下載模型 weights 進行本地部署或微調。

同一天，阿里巴巴與南開大學、吉林大學團隊聯手發表 CDM（連續時間分佈匹配）框架，將擴散模型蒸餾技術從離散時間點推向連續時間優化。傳統的 DMD（分佈匹配蒸餾）與一致性蒸餾都依賴少數預定義的離散時間步作為監督信號，而 CDM 引入動態連續調度與連續時間對齊目標，使監督信號可以落在採樣軌跡上的任意位置，而不僅限於固定錨點。官方在 SD3-Medium 與 Longcat-Image 架構上進行實驗，號稱 4 步推理就能達到與完整採樣相當的影像品質，且無需 GAN 或獎勵模型等輔助模組。這項研究已公開在 arXiv，程式碼在 GitHub 開源，對需要即時影像生成的 Web Agent 與遊戲場景有直接實用價值。

---

## 其他值得關注

- **AWS Agent Toolkit for AWS 上線**：AWS 在 GitHub 開源了一套幫助 Claude Code、Codex 等编程 Agent 在 AWS 環境構建應用的工具包，核心是一個托管式 AWS MCP Server，可通過單一端點操作 300 多項 AWS 服務，並隔離 Python 執行環境與即時文件檢索。這代表雲端廠商正在正式將 Agent 能力整合進企業開發工具鏈，而不是停留在紙上談兵階段。

- **MiniMax 修復 M2 模型低頻 Token 生成問題**：MiniMax 團隊成員 zhongyu 在知乎發布技術分析，說明 M2 系列模型無法生成「馬嘉祺」等低頻詞的問題根源——後訓練階段資料分佈不均導致輸出層 lm_head 表徵漂移，而輸入層幾乎未變。官方透過混入覆蓋全詞表的合成重複數據修復，成功將所有退化案例恢復，同時將日語等小語種的混淆率從 47% 降至 1%。這個修復路徑對其他有相似問題的模型團隊有參考價值。

- **AI2 開源 EMO 混合專家模型**：AI2 發布並開源 EMO 模型，總參 14B、活躍參數 1B，含 128 個專家，每 Token 激活 8 個。其創新在於利用文件邊界作弱監督，使專家按語義領域自發模組化，而非按表層句法聚類。保留 12.5%（16 個）專家時，性能僅下降約 3 個百分點，遠優於標準 MoE。這種「語義模組化」的思路，可能對日後部署效率優化有深遠影響。

- **三部門印發《智能體規範應用與創新發展實施意見》**：中國國家網信辦、發展改革委、工業和資訊化部聯合印發官方檔案，明確智能體是具備自主感知、記憶、決策、互動與執行能力的系統，並從五大方向提出 19 個典型應用場景。這是中國官方首次對 AI Agent 領域進行系統性的政策部署，後續影響值得持續追蹤。

---

## 參考連結

- [DeepSeek 籌備 500 億融資報導（The Information）](https://www.theinformation.com/articles/deepseek-to-raise-more-than-7-billion-as-startup-plots-revenue-efforts)
- [DeepSeek 500 億融資新浪財經報導](https://finance.sina.com.cn/tech/2026-05-08/doc-inhxewec4337137.shtml)
- [Cloudflare 裁員公告](https://blog.cloudflare.com/building-for-the-future/)
- [Cloudflare 裁員 Reuters 報導](https://www.reuters.com/business/world-at-work/cloudflare-cut-over-1100-jobs-2026-05-07/)
- [Anthropic CEO 80 倍成長發言（CNBC）](https://www.cnbc.com/2026/05/06/anthropic-ceo-dario-amodei-says-company-crew-80-fold-in-first-quarter.html)
- [螞蟻百靈 Ring-2.6-1T 發布推文](https://x.com/AntLingAGI/status/2052808934390661134)
- [OpenRouter Ring-2.6-1T 免費試用頁面](https://openrouter.ai/inclusionai/ring-2.6-1t:free)
- [CDM 框架論文與專案頁面](https://byliutao.github.io/cdm_page/)
- [CDM arXiv 論文](https://arxiv.org/abs/2605.06376)
- [AWS Agent Toolkit for AWS GitHub](https://github.com/aws/agent-toolkit-for-aws)
- [MiniMax M2 稀疏 Token 遺忘修復分析（知乎）](https://mp.weixin.qq.com/s/jAvdxWaE6AvYqx_drcSjGA)
- [AI2 EMO 模型部落格](https://allenai.org/blog/emo)
- [中國智能體規範實施意見](https://mp.weixin.qq.com/s/n-y34W_XZiV5lCKHOkok2g)
