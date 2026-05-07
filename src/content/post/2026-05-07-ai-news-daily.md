---
title: "AI 新聞精選｜2026 年 5 月 7 日"
description: "Anthropic 借 SpaceX Colossus 1 算力全面放寬 Claude 限制，OpenAI 開源 MRC 網路協議重構超算底層，Unsloth 聯手 NVIDIA 帶來訓練提速 25%。"
publishDate: "2026-05-07T12:00:00+08:00"
updatedDate: "2026-05-08T00:36:00+08:00"
tags: ["Anthropic", "OpenAI", "Claude", "SpaceX", "NVIDIA"]
series: "daily-ai-report"
seriesOrder: 44
draft: false
---

## 今日觀察

本週 AI 基礎設施接連出現實質進展，而非只是模型發布數字的競賽。Anthropic 拿下 SpaceX 超過 300MW 的算力，讓 Claude Code 的使用限額直接翻倍；OpenAI 則聯手一票硬體廠商開源了 MRC 網路協議，把萬卡集群的網路複雜度從三到四層交換機砍成兩層；Unsloth 與 NVIDIA 合作的優化則從軟體視角切入，用三項具體技術把訓練速度又往上推了約 25%。這三件事的共同點是：都發生在模型層以下、在實際跑訓練的工程師群體之外很少被注意到，但加總起來，正在改變訓練 frontier model 需要多少時間與成本。

---

## 主題一 — Anthropic × SpaceX：Colossus 1 算力進駐，Claude Code 限額全面放寬

本週最大宗的基礎設施新聞，來自 Anthropic 與 SpaceX 達成的一項算力合作協議。Anthropic 將全面接管 SpaceX 旗下 Colossus 1 資料中心的全部算力——超過 300MW，相當於 22 萬張以上 NVIDIA GPU，預計本月內部屬上線。

這不是一筆小交易。Colossus 1 原本是 xAI 用來訓練 Grok 模型的超級電腦，後來隨著 SpaceX 收購 xAI，以及 xAI 將訓練重心轉移至 Colossus 2，這座設施才空出來讓 Anthropic 整棟租下。背後的地緣政治脈絡也值得注意：Anthropic 執行長 Dario Amodei 先前多次公開呼籲民主國家聯手確保 AI 供應鏈安全，如今取得 SpaceX 設施，算是把这句话落了地。

**限額調整的實質影響**

配合這項算力協議，Anthropic 同步調整了三項使用限制，即日生效：

第一，Claude Code 的五小時滾動速率限制在 Pro、Max、Team 以及按席位計費的 Enterprise 方案全面翻倍。第二，Pro 與 Max 方案在高峰時段的限額縮減正式移除。第三，API 中 Opus 系列的速率限制大幅提升，具體數字已在 Anthropic 官方文件中更新。

值得注意的是，這次放寬的是**速率限制**（rate limits），而非**每週總量上限**（weekly limits）。兩者是不一樣的指標：速率限制影響的是短時間內能發出多少請求，總量上限則決定整週能跑多少token。Anthropic 並未同步放寬總量上限，意味著重度使用者的排程規劃邏輯不變，只是排程可以排得更連續、不會那麼容易碰到天花板。

這項變動對誰最有影響？答案並不是所有用戶。目前 rate limit 瓶頸最明顯的是 Max 方案的重度開發者——他們往往一次對話跑幾十分鐘、連續好幾個 session，舊限制下會在半小時內陸續碰到牆。新限制讓這群人能在高負載工作日多撐將近一小時才需要換帳戶或暫停。

---

## 主題二 — OpenAI × NVIDIA / AMD：MRC 網路協議開源，萬卡集群網路架構從三層砍成兩層

OpenAI 本週正式開源了一項名為 **MRC（Multipath Reliable Connection）** 的網路傳輸協議，透過開放計算項目（OCP）向業界公開。參與共同開發的還有 AMD、Broadcom、Intel、Microsoft 與 NVIDIA 五家公司，歷時兩年。

MRC 解決的是超大規模同步訓練時的根本問題：當一個訓練 step 涉及數百萬次 GPU 間資料傳輸，任何一次傳輸延遲都可能產生連鎖反應，讓整批 GPU 空等。網路擁塞、鏈路失效、交換機故障是三個最常見的延遲源；在數萬張 GPU 的規模下，這些問題的頻率與修復難度都會上升。

**MRC 的核心設計**

MRC 並非從零發明，而是在 RoCE（RDMA over Converged Ethernet）基礎上加入 SRv6 源路由，並借用了 Ultra Ethernet Consortium（UEC）的部分技術思路。具體來說：

**封包噴灑（packet spraying）+ 多路徑**：MRC 把單次傳輸的資料分散到數百條路徑同時傳送，而非傳統的一條路徑排隊。這讓網路頻寬利用率大幅提升，也天然具备了繞過故障路徑的能力。

**兩層交換機拓撲**：傳統設計需要三到四層交換機才能連接約 13.1 萬張 GPU；MRC 的多平面（multi-plane）設計把一條 800Gb/s 鏈路拆分為八條 100Gb/s 平面並行，相同硬體下能以兩層交換機覆蓋幾乎相同數量的 GPU。交換機層數減少，直接等於功耗下降、零件數量減少、以及故障點變少。

**微秒級故障繞路**：SRv6 源路由讓路由器能在硬體層面即時繞開失效鏈路，無需等待上層協定的路由收斂。OpenAI 在內部測試中，即使四台核心交換機同時重啟，訓練任務也幾乎不受影響。

MRC 目前已部署在 OpenAI 所有最大型的 GB200 超算系統，包括 Oracle Cloud Infrastructure 在德州阿比林（Abilene）的站點，以及 Microsoft 的 Fairwater 超算。OpenAI 在官方文件中指出，用這套協議訓練過多個模型，硬體夥伴涵蓋 NVIDIA 與 Broadcom。整體而言，這次開源把訓練超大模型的網路基礎設施從各家私有的優化方案，變成業界可以共同採用的標準構建模組——對整個生態系的影響會比單一模型發布更深、更慢顯現。

---

## 主題三 — Unsloth × NVIDIA：三大優化帶來約 25% 訓練提速，開源代碼已上架

Unsloth AI 本週聯手 NVIDIA 發布了一份技術指南，詳細說明三項針對大語言模型訓練的優化，最終在 B200 顯示卡上實測約 25% 的端到端訓練提速。三項技術都已在 GitHub 開源，且不損失模型精度。

**第一項：封裝序列元資料快取（packed-sequence metadata caching）**

目前主流訓練框架在處理多筆短句時，會把它們串聯成一個封裝序列（packed sequence），以節省 padding 浪費的運算資源。但問題在於：模型每一層都需要知道每個原始句子的邊界在哪裡，這份元資料（長度、偏移量、注意力結構）過去是每一層各自重新計算一次。對於 28 層的模型，這代表同一份資料被重建 28 次，其中部分路徑還會觸發 GPU-CPU 同步點，進一步拖累效能。

Unsloth 的解法是把這份元資料在第一層計算後快取起來，後續 27 層直接取用。在 Qwen3-14B QLoRA SFT 任務上，這項改動帶來了 +43.3% 的 forward pass 提速與 +14.3% 的單批次訓練提速。

**第二項：雙緩衝非同步梯度檢查點（double buffered async gradient checkpointing）**

梯度檢查點是訓練大模型時節省記憶體的標準技術，代價是需要在 forward 與 backward pass 時重新計算部分層的激活值。傳統實作中這兩件事必須順序執行；雙緩衝則讓激活值拷貝與實際計算並行，在 8B 至 32B 規模的 B200 任務上帶來 4.6% 至 8.4% 的吞吐量提升。

**第三項：MoE 路由一次分組（one-time grouping for MoE routing）**

對於混合專家模型（MoE），動態路由查詢是每次推理都必須做的開銷。Unsloth 將專家分組一次計算完畢，後續 token 只需查表而無需重複計算，在 MoE 架構上實現約 10% 至 15% 的整體提速。

三項優化都已以 Pull Request 形式開源，任何人只要更新 Unsloth 到最新版本即可在 RTX 筆電、資料中心 GPU 與 DGX Spark 機器上自動啟用。對於正在做 fine-tuning 的團隊來說，這次更新的實質意義比帳面上的 25% 數字更重要：它不是新模型，而是幾乎零成本的工程改良。

---

## 其他值得關注

- **豆包 Doubao-Seed-2.0-lite 全模態升級**：字節火山引擎本週將 Doubao-Seed-2.0-lite 升級為豆包家族首款全模態理解模型，支援影片、圖像、音頻、文字的原生統一推理。視覺理解在物理與醫療推理性質上超越前代 pro 版，部分領域達 SOTA，音頻支援 19 語種轉寫與情緒識別。已在火山方舟上線。對需要跨模態工作流的開發者而言，這是值得列入評估的新選項。

- **Kimi 傳將完成 20 億美元新融資，估值突破 200 億美元**：據《晚點 LatePost》與多方報導，月之暗面即將完成新一輪 20 億美元融資，由美團龍珠領投。Kimi 在 K2.5 模型更新後，ARR 從今年 3 月的 1 億美元增長至 4 月的超過 2 億美元，四個月內翻了一倍。這是中國 AI 公司在商業化變現上目前最清晰的訊號之一，也讓 Kimi 在估值上與美國頭部新創的距離顯著縮小。

- **Manus Projects 自學更新功能**：Manus 本週為 Projects 功能新增「從每個任務學習」能力，能自動識別對話中出現的可復用指令、檔案與工作流模式，經使用者審核批准後更新專案上下文。這不是普通的「記憶」功能，而是把重複團隊協作的節奏（每次任務結束後檢查是否需要更新指示、範本、術語）自動化。對有長期專案維護需求的工程團隊有一定實用價值。

---

## 參考連結

- [Anthropic 官方公告：Higher usage limits for Claude and a compute deal with SpaceX](https://www.anthropic.com/news/higher-limits-spacex)
- [OpenAI：Supercomputer networking to accelerate large scale AI training (MRC)](https://openai.com/index/mrc-supercomputer-networking/)
- [OCP：MRC 1.0 Specification (PDF)](https://www.opencompute.org/documents/ocp-mrc-1-0-pdf)
- [Unsloth × NVIDIA：How to Make LLM Training Faster](https://unsloth.ai/blog/nvidia-collab)
- [XDA Developers：Anthropic doubling Claude Code rate limits](https://www.xda-developers.com/anthropic-is-doubling-claude-codes-hourly-rate-limits-removing-peak-hours-andworking-with-spacex/)
- [TNW：Anthropic raises Claude Code and Opus API rate limits, citing SpaceX Colossus 1 deal](https://thenextweb.com/news/anthropic-claude-code-rate-limits-spacex-colossus-1)
- [TechNode：Kimi reportedly nears $2 billion funding round at over $20 billion valuation](https://technode.com/2026/05/07/kimi-reportedly-nears-2-billion-funding-round-at-over-20-billion-valuation/)
- [Manus Blog：Projects That Learn From Every Task](https://manus.im/blog/manus-projects-self-updating)
