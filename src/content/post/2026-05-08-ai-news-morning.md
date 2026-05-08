---
title: "AI 晨間精選｜2026 年 5 月 8 日"
description: "Anthropic 入住 xAI 超算、Moonshot 估值翻四倍、OpenAI 發布開源網路協議，三條主線串起 AI 基礎設施搶奪戰的實質升級。"
publishDate: "2026-05-08T08:00:00+08:00"
updatedDate: "2026-05-08T08:22:00+08:00"
tags: ["Anthropic", "SpaceX", "Moonshot AI", "OpenAI", "MRC"]
series: "daily-ai-report"
seriesOrder: 83
draft: false
---

## 今日觀察

五月的第一周接連出現了三件看似獨立、實則同屬一條主線的新聞：Anthropic 宣布進駐 xAI 的 Colossus 1 超算中心、Moonshot AI 以 200 億美元估值完成新一輪鉅額融資、以及 OpenAI 攜手五大晶片與系統廠商發布開源網路協議 MRC。這三件事湊在一起，說的不是某個模型又刷了什麼 benchmark，而是**算力這個 AI 生產資料的分配邏輯正在重寫**。搶 GPU 的戰爭已經打到下一個階段——不是誰能做出更強的模型，而是誰能確保 GPU 供應不中斷。

---

## Anthropic 入住 xAI 超算：80 倍成長逼出來的現實

Anthropic 在五月的第二屆開發者大會上宣布，與 xAI 與 SpaceX 合併後的新實體 SpaceXAI 達成協議，將全面使用後者位於孟菲斯的 Colossus 1資料中心。根據 Wired 與紐約時報的報導，這筆交易讓 Anthropic 取得超過 300 百萬瓦（MW）的算力、接近 22 萬顆 NVIDIA GPU，且所有容量將在「未來幾天內」上線。

這件事最諷刺的地方在於：馬斯克今年稍早还在 X 上稱 Anthropic 是「邪惡」（evil）且有種族與性別偏見的公司。六個月後，他的公司把整座超算租給了同一個競爭對手。背後的原因很樸實：Colossus 1 主力服務 Grok，但光靠自用模型撐不起這座設施的資本支出，而 SpaceXAI 正籌備在未來一個月內 IPO——此時一份大型企業客戶合約比任何口水仗都值錢。

而 Anthropic 選擇借道外部算力的原因，同樣赤裸：CEO Dario Amodei 在台上透露，Anthropic 今年初預估成長約十倍，實際卻走到了可能 80 倍的軌道。「我希望 80 倍的成長不要再繼續了，因為這太瘋狂，處理不過來。」年度經常性營收（ARR）從 2025 年底的 90 億美元，已經突破到 300 億美元以上。驅動這個數字的關鍵產品是 Claude Code——Anthropic 透露，平均每位開發者每週使用超過 20 小時。高需求碰上內部 GPU 庫存不足，結果就是長期以來用戶不斷抱怨限速與服務中斷。與 SpaceXAI 的這筆交易，將直接轉化為 Claude Pro 與 Claude Max 訂戶的限額提升。

對 SpaceXAI 而言，Anthropic 也是一個敘事資產。該公司在官方 blog 中寫道，Anthropic 已「表達興趣」參與「軌道 AI 算力」——也就是太空資料中心的合作。IPO 前夕，這個敘事相當於一張額外的安全牌。

**這件事為什麼重要**：過去 AI 公司之間的竞争体现在模型能力上，现在算力本身已经成为战略资源，而且即便是直接竞争对手，也可能因为商业现实而走到一起。Anthropic 的 80 倍成长是个甜蜜的烦恼——用户增长到基础设施跟不上的程度，反而要向竞争对手借 GPU，这种局面在科技史上极为罕见。

---

## Moonshot AI 估值 200 億美元：中國開源模型的資金鍊正在加速

同一天，來自中國的 Moonshot AI 宣布完成約 20 億美元的新一輪融資，由美團旗下 VC 部門 Long-Z Investment 領投，參與者包括清華資本、中國移動、CPE 元峰等。根據 Huafeng Capital 的資料，Moonshot 在過去六個月內累計融資已達 39 億美元，估值從 2025 年底的 43 億美元，一路翻到現在的 200 億美元。

Moonshot成立於 2023 年，由前 Meta AI 與 Google Brain 研究員楊之琳創辦。其 Kimi 系列開源大語言模型在年初幾乎拿下各項 benchmark 前段班，分數逼近 OpenAI 與 Anthropic 的閉源旗艦產品。最新的 Kimi K2.6目前在 OpenRouter 排行榜上，是用量第二大的 LLM。支撐這個估值的數字：2026 年 4 月，Moonshot 的年度經常性營收已突破 2 億美元，來自付費訂閱與 API 呼叫的雙重成長。

這輪融資的大背景是：投資人對中國 AI 實驗室的開源模型需求正在飆升。Moonshot 不是特例——據報導 DeepSeek 目前正在進行首次外部融資談判，估值約 450 億美元；已經在香港上市的 Zhipu AI（市值約 559 億美元）與 MiniMax（市值約 330 億美元）都在新模型發布後股價大漲。整個中國 AI 開源生態的資金鍊，正在從「燒錢撐研究」轉向「以營收證明商業價值」的階段。

**比較視角**：對比 2025 年底的估值，Moonshot 在不到六個月內翻了四倍有餘。同一時期，西方 AI 新創多數還在靠一輪又一輪的風險投資撐場面，而 Moonshot 已經開始向投資人展示真正的營收數字。這是中國 AI 公司獨特的後來居上路徑——先用開源模型搶開發生態，再用生態規模變現。

---

## OpenAI MRC 網路協議：五大廠聯手為超算神經網路重新設計高速公路

回到基礎設施層面，OpenAI 在本週發布了一項低調但實質意義深遠的技術產出：名為 MRC（Multipath Reliable Connection）的網路協議，與 AMD、Broadcom、Intel、Microsoft 和 NVIDIA 五家公司共同開發，規格已通過開放計算計畫（OCP）公開。

MRC 解決的問題是：當數萬顆 GPU 要同時协作訓練一個大型模型時，網路核心的頻寬拥塞與故障恢复時間是兩個致命瓶頸。傳統網路在骨幹交換機出問題時，可能需要數秒甚至數十秒才能稳定——對需要嚴格同步訓練的 AI 超算而言，每一次這樣的抖動都可能導致整個訓練任務停滯。MRC 將資料封包分散到數百條路徑同時傳輸，並在微秒級別檢測故障並繞行，目標是**讓網路故障從「災難」變成「可以被忽略的背景噪音」**。

MRC 已經部署在 OpenAI 最大的 NVIDIA GB200 超算上，包括甲骨文雲端位於德州阿比林的資料中心，以及 Microsoft 的 Fairwater 超算。OpenAI 在訓練一個近期的前沿模型時，遭遇四次 tier-1 交換機重啟——使用 MRC 後，整個過程不需要與正在跑訓練任務的團隊做任何協調，訓練絲毫未中斷。根據估算，該協議將 800 Gb/s 網路所需的交換機層數從三到四層降到兩層，相應節省了功耗、元件數量與整體網路成本。

這件事的戰略意涵在於：過去網路協議這個領域，NVIDIA 的 NVLink 家族占據主導地位，廠商之間的壁壘明確。MRC 的開源規格選擇透過 OCP 公開，等於是明确告訴整個產業：「我們這次不打算把路堵死。」對 AMD、Intel 乃至於整個供應鏈上的其他玩家而言，這打開了一個可以進入的路口。NVIDIA 在官方 blog 中也為 MRC 背書，說明這件事對他們同樣有商業價值——協議的優化目標是讓 GPU 之間的資料傳輸更順暢，而 NVIDIA 作為 GPU 供應商是直接受益者。

**比較視角**：如果用公路網路來比喻，傳統的做法是建一條超寬的收費站交流道，所有車流必須排隊通過；MRC 的做法是同時開放數百條並行車道，讓流量均勻分散，且任何一條車道出狀況時立刻有備援路線補上。這種設計思路在電信領域並不新鮮，但把它做到超算級別的規模並開源出來，是這次不一樣的地方。

---

## 其他值得關注

- **OpenAI 語音模型三連發**：OpenAI 同步推出 GPT-Realtime-2、GPT-Realtime-Translate、GPT-Realtime-Whisper 三款語音模型。Realtime-2 在 Big Bench Audio 達到 96.6% 準確率（比前代 81.4% 顯著提升），context window 從 32K 撐到 128K token，並支援五段推理強度調節，翻譯覆蓋超過 70 種語言。即將登陸 ChatGPT 音訊模式。
- **歐盟 AI 法規延後**：歐盟通過「數位 Omnibus」簡化版 AI 法規，將高風險 AI 規範期限延至 2027 年底至 2028 年，並對中小企業放寬要求。對想進歐洲市場的美國 AI 公司而言，這代表暫時少了一層合規障礙。
- **IMF 警告 AI 模型對金融業構成系統性風險**：國際貨幣基金組織發布報告，點名新一代 AI 模型可能對金融機構的網路防禦造成不可避免的衝擊，各國監管機構需提前準備應對機制。

---

## 參考連結

- [How Anthropic's 80x growth blew past its own infrastructure and straight into Musk's data center](https://the-decoder.com/how-anthropics-80x-growth-blew-past-its-own-infrastructure-and-straight-into-musks-data-center/)
- [AINews: Anthropic-SpaceXai's 300MW/$5B/yr deal for Colossus I](https://www.latent.space/p/ainews-anthropic-spacexais-300mw5byr)
- [China's Moonshot AI raises $2B at $20B valuation](https://techcrunch.com/2026/05/07/chinas-moonshot-ai-raises-2b-at-20b-valuation-as-demand-for-open-source-ai-skyrockets/)
- [OpenAI built a networking protocol with AMD, Broadcom, Intel, Microsoft, and NVIDIA](https://the-decoder.com/openai-built-a-networking-protocol-with-amd-broadcom-intel-microsoft-and-nvidia-to-fix-ai-supercomputer-bottlenecks/)
- [OpenAI advancing voice intelligence with new models in the API](https://openai.com/index/advancing-voice-intelligence-with-new-models-in-the-api/)
- [OpenAI MRC specification via Open Compute Project](https://www.opencompute.org/documents/ocp-mrc-1-0-pdf)
