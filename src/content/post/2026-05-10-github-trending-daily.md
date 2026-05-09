---
title: "【熱門專案】2026-05-10 GitHub 趨勢速讀"
description: "今日 GitHub 熱門專案精選：MasterDnsVPN、SuperSplat、動手學大模型"
publishDate: "2026-05-10T07:30:00+08:00"
updatedDate: "2026-05-10T07:30:00+08:00"
tags: ["GitHub Trending", "DNS", "3D Splatting", "LLM"]
draft: false
---

今天 GitHub Trending 的主旋律依舊是 AI Agent 與開發工具，但有幾個專案的技術深度頗為可觀，值得深入看一下。

## MasterDnsVPN：DNS Tunnel 的極致優化

[MasterDnsVPN](https://github.com/MasterKing32/MasterDnsVPN) 是一個專為「高壓環境」設計的 DNS tunneling VPN。聽起來可能有點敏感，但純從技術角度，它的設計思路有不少值得學習的地方。

作者宣稱這套系統能在 DNSTT 和 SlipStream 的基礎上做到 **9 倍於 DNSTT、3.6 倍於 SlipStream** 的傳輸速度。關鍵差異在於：

- **自訂協議 + ARQ**：放棄 QUIC/KCP 那一套，用極簡協議頭（僅 5–7 bytes），把 DNS 傳輸效率往上拉。
- **Multi-resolver + 資料複製**：同時走多個 DNS resolver，並支援選擇性資料複製，確保在丟包嚴重的網路環境下仍能交付。
- **智慧負載均衡**：內建 8 種負載均衡策略，能根據 resolver 健康狀況自動切換。

值得一提的是，這個專案在伊朗長達 70+ 天的網路封鎖中实际運行過，當時國際頻寬被完全切断，標準 VPN 全數失效，只有 DNS tunnel 还能穿透封鎖線。

**適合誰**：對網路協議底層、censorship resistance 有興趣的工程師。

## SuperSplat：瀏覽器端的 3D Gaussian Splat 編輯器

[SuperSplat](https://github.com/playcanvas/supersplat) 是 PlayCanvas 出品的開源 3D Gaussian Splat 編輯工具，直接在瀏覽器裡運行，不需要下載安裝。

Gaussian Splatting（高斯潑濺）是這兩年3D重建領域的黑馬技術，Google、Meta 都有相關論文。它把場景当成一堆 3D Gaussian 分布來渲染，比傳統的 mesh 或 NeRF 更適合處理高解析度、新視角生成。SuperSplat 提供的功能包括：

- 檢視與編輯 splat 資料
- 優化與壓縮
- 發布為可直接嵌入網頁的格式

線上 demo 在 [superspl.at/editor](https://superspl.at/editor)，有興趣可以直接上去玩一下。

**適合誰**：遊戲開發者、3D 視覺工程師、以及對 NeRF/GS 技術感興趣的研究者。

## 動手學大模型：上海交大出品

[Lordog/dive-into-llms](https://github.com/Lordog/dive-into-llms) 是上海交通大學背景的開源教程系列，標靶是「讓學生動手寫 Code 來理解大模型」。

這個專案目前累積了 **36,000+ stars**，內容涵蓋：

- 預訓練模型微調與部署
- Prompt Engineering 與思維鏈
- 模型編輯（Knowledge Editing）
- 數學推理蒸餾
- 模型水印
- 越獄攻擊與安全對齊
- GUI Agent
- RLHF / PPO 實驗

教程形式是 Jupyter Notebook + 投影片 + 實驗手冊，配合華為昇騰的硬體做了國產化適配。對於想快速上手大模型實踐的開發者，這是一個結構完整的學習路徑。

**適合誰**：剛接觸大模型、想補實作經驗的開發者或學生。

---

今天的趨勢看似繞著 AI Agent 打轉，但其實網路協議層、3D 視覺、還是模型教育，都有具體的技術產出在冒出來。與其追逐熱門，不如定點挖下去。

## 參考連結

- [MasterDnsVPN repo](https://github.com/MasterKing32/MasterDnsVPN)
- [SuperSplat Editor](https://github.com/playcanvas/supersplat)
- [動手學大模型 repo](https://github.com/Lordog/dive-into-llms)