---
title: "AI 晨間精選｜2026 年 5 月 7 日"
description: "Anthropic 借用馬斯克 22 萬顆 GPU、OpenAI 開源 AI 超算網路協議、中國 Moonshot AI 估值 200 億美元——三條主線看懂這週 AI 基建競賽的真實溫度。"
publishDate: "2026-05-07T08:00:00+08:00"
updatedDate: "2026-05-07T00:25:00+08:00"
tags: ["Anthropic", "SpaceX", "Claude", "OpenAI", "MRC", "Moonshot AI", "Kimi"]
series: "daily-ai-report"
seriesOrder: 83
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-07-ai-news-morning.png"
  alt: "AI 晨間精選｜2026 年 5 月 7 日"
---

## 今日觀察

過去 48 小時的 AI 產業接連爆出三件硬底層新聞：Anthropic 與 SpaceX/xAI 達成算力租借協議、OpenAI 攜手晶片五巨人開源新一代網路協議 MRC、以及中國 Moonshot AI 完成 20 億美元集資。它們的共同軸心只有一個——**誰能拿到最多 GPU、誰能把 GPU 串成更快的叢集，誰就能在模型效能競賽裡卡到有利位置**。算力匱乏與基建瓶頸不再是配角，而是這輪 AI 競爭的核心變數。以下從三個維度拆解背後的邏輯。

---

## Anthropic 借調 SpaceX 超算：80 倍成長逼出來的算力窘境

Anthropic 在年度開發者大会上宣布，已與 SpaceX/xAI 成立的新實體 SpaceXAI 簽訂協議，將獨家取用位於孟菲斯的 Colossus 1 超算中心全部產能。根據 Wired 與紐約時報的報導，該設施提供超過 **300 百萬瓦特的電力容量與約 22 萬顆 NVIDIA GPU**，預計在「未來幾天內」正式上線。Anthropic 內部估算此協議價值約 **每年 50 億美元**，使 xAI 一躍成為「新型雲端業者」（neocloud）。

這次合作最諷刺的地方在於：馬斯克去年還在 X 上稱 Anthropic 是「邪惡」（evil）且帶有偏見的公司，今年卻親自為這筆交易背書。他在同一週的 OpenAI 訴訟作證時間公開表示「與 Anthropic 高層深入交流後印象深刻」。市場解讀並不複雜——Colossus 1 造價昂貴，單靠 xAI 內部模型 Grok 的用量根本無法充分攤提建設成本，而 SpaceXAI 正在籌備 IPO，帳面上需要一個重量級企業客戶作為營收支柱。

對 Anthropic 來說，驅動這次交易的真正原因是**成長速度遠超內部預測**。執行長 Dario Amodei 在台上透露，Anthropic 原本預期今年營收成長約十倍，實際卻走在可能達到 **80 倍成長**的軌道上。年度經常性收入（ARR）已從 2025 年底的 90 億美元攀升至超過 300 億美元，關鍵燃料之一是 Claude Code——開發者平均每週在該工具上花費至少 20 小時。需求爆炸的速度遠快過自建資料中心的時程，算力缺口於是變成產品瓶頸。這次協議的直接效果，是將 Claude Code 付費使用者的 5 小時限額提升為原來的兩倍，並移除尖峰時段限制。

對台灣的 AI 開發者而言，這個訊號值得注意：即使是估值最高、陣容最整齊的 AI 新創，在算力需求爆發時仍得向外求援。這意味著中小型團隊若想在模型應用層做出差異化，**必須正視推理成本的結構性壓力**，而不能只依賴「模型會越來越便宜」假設。

---

## OpenAI 開源 MRC 協議：GPU 叢集網路瓶頸終於有解

同一天，OpenAI 正式對外發布了 Multipath Reliable Connection（MRC）網路協議，並將規格文件移交給開放運算計畫（Open Compute Project）。參與共同開發的成員名單幾乎是半導體與軟體業的全明星陣容：AMD、Broadcom、Intel、Microsoft 與 NVIDIA。這是一個訊號很強的聯手——晶片設計商、網路設備商、雲端平台與 AI 模型公司全員到齊，目標只有一個：**消除大型 AI 超算內部 GPU 互聯的網路瓶頸**。

MRC 的核心設計邏輯是：不走傳統單路徑傳輸，而是把資料封包分散到**數百條路徑同時傳送**。這解決了什麼問題？訓練大型語言模型時，成千上萬顆 GPU 必須同步交換資料，任何一條網路鏈結或交換器故障，都可能讓整個訓練任務停滯。傳統乙太網路 fabric 在故障後需要數秒到數十秒的穩定時間，而 MRC 可以在**微秒層級**偵測失敗並繞路重建。OpenAI 估計，在部署 MRC 後，交換器重啟不再需要暫停訓練任務，甚至可以用「不中斷」的方式進行例行維護。

這次協議的落地細節也值得關注：MRC 已經部署在 OpenAI 最大的 GB200 超算上，包括位於德州阿比林的 Oracle Cloud 設施與微軟 Fairwater 超算。在近期一次真實訓練中，OpenAI 需要重啟四顆 tier-1 交換器，過程完全不需要協調訓練任務團隊，過去這類操作往往需要數小時的窗口溝通。

MRC 採用兩個層級的乙太網路交換器就能連接超過 10 萬顆 GPU，相較於傳統 800 Gb/s 網路需要三到四層交換器，減少了網路整體的功耗、零件數量與成本。這對台灣的 AI 基礎設施供應鏈有直接含義——未來超算的網路架構將高度標準化，與其關注少數獨家協議，不如追蹤哪些廠商能進入這個新生態。

---

## 中國 Moonshot AI 估值 200 億美元：開源模型的商業邏輯正在重寫

來自北京的大語言模型公司 Moonshot AI 在本週宣布完成了新一輪約 **20 億美元**的集資，公司估值一舉達到 200 億美元，成為中國 AI 生態中估值次高的私營實驗室（僅次於傳聞中的 DeepSeek 450 億美元談判估值）。主導本輪投資的是美團旗下的長續資本，參與者包括清華資本、中國移動與 CPE 元豐。 Moonshot 在過去六個月內累計集資 **39 億美元**，估值從 2025 年底的 43 億美元翻了近五倍。

Moonshot 的核心產品是 Kimi 系列開源模型，最新的 Kimi K2.6 目前是 OpenRouter 平台上用量第二大的 LLM。這意味著它的應用範圍不只在中國——開發者社群願意為了較低的推理成本犧牲些許效能領先，選擇 Moonshot 的開源模型作為部署選擇。Kimi K2.5 早些時候在程式碼任務上的 benchmark 表現，已經逼近 OpenAI 與 Anthropic 同時期的閉源模型。

更值得關注的是背後的貨幣化速度：Moonshot 的年度經常性收入在 2026 年 4 月已突破 **2 億美元**，全數來自付費訂閱與 API 呼叫。這與西方 AI 公司靠企業級授權補貼研發成本的路徑不同，Moonshot 幾乎靠開發者付費撐起了商業模式。這解釋了為什麼投資人在開源模型需求暴漲之際願意給出如此高的估值。

一個橫向比較讓這個數字更有感：Moonshot 本輪 200 億美元估值，對應大約 2 億美元的 ARR，市銷比（P/S）約 100 倍。相比之下，Anthropic 以 300 億美元 ARR 支撐同樣倍數的估值——市場對 AI 模型公司的定價邏輯，正在以驚人的速度國際化。

對台灣工程師的實際意義是：**Kimi API 是目前性價比最高的開源模型選項之一**，而中國開源模型的快速迭代（K2.5 → K2.6 的節奏）代表著另一條不容忽視的技術推進路徑。把所有開發需求押在同一個模型供應商上，風險管理上並不明智。

---

## 其他值得關注

- **Amazon Bedrock AgentCore Payments**：AWS 宣布 AgentCore 平台內建支付功能，AI 代理可以即時以穩定幣（小額支付）存取付費 API、MCP 伺服器與網頁內容，合作方包括 Coinbase 與 Stripe。x402 協議成為第一個支援的支付標準。對 agents 經濟生態的影響值得持續追蹤。
- **Anthropic Claude「Dreaming」功能**：Anthropic 為托管代理新增非同步記憶�清理機制，代理可以在背景回溯過去工作階段、蒸餾洞見並更新記憶體狀態。這個功能的出現標誌著代理已從「即時推理」向「持續學習」演進。
- **vLLM V0 → V1 版本**：Hugging Face 部落格詳細描述了從 V0 到 V1 的正確性優先策略，特別是在 RL 推理任務下的穩定性改進。這是目前最被廣泛使用的 LLM 推理引擎之一，版本迭代方向值得注意。

---

## 參考連結

- [How Anthropic's 80x growth blew past its own infrastructure and straight into Musk's data center — The Decoder](https://the-decoder.com/how-anthropics-80x-growth-blew-past-its-own-infrastructure-and-straight-into-musks-data-center/)
- [AINews — Anthropic-SpaceXAI's 300MW/$5B/yr deal — Latent Space](https://www.latent.space/p/ainews-anthropic-spacexais-300mw5byr)
- [China's Moonshot AI raises $2B at $20B valuation — TechCrunch](https://techcrunch.com/2026/05/07/chinas-moonshot-ai-raises-2b-at-20b-valuation-as-demand-for-open-source-ai-skyrockets/)
- [OpenAI built a networking protocol with AMD, Broadcom, Intel, Microsoft, and NVIDIA — The Decoder](https://the-decoder.com/openai-built-a-networking-protocol-with-amd-broadcom-intel-microsoft-and-nvidia-to-fix-ai-supercomputer-bottlenecks/)
- [Introducing Amazon Bedrock AgentCore Payments — AWS ML Blog](https://aws.amazon.com/blogs/machine-learning/agents-that-transact-introducing-amazon-bedrock-agentcore-payments-built-with-coinbase-and-stripe/)
- [MRC (Multipath Reliable Connection) Specification — Open Compute Project](https://www.opencompute.org/documents/ocp-mrc-1-0-pdf)
