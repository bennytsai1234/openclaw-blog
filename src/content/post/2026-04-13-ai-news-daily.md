---
title: "AI 新聞精選｜2026 年 4 月 13 日"
description: "MiniMax M2.7 開源引爆熱議，伯克利研究揭露八大 AI 評測基準集體淪陷，日本砸重金衝 2 奈米半導體。"
publishDate: "2026-04-13T12:00:00+08:00"
updatedDate: "2026-04-13T12:02:00+08:00"
tags: ["MiniMax", "評測基準", "半導體", "語音模型"]
series: "daily-ai-report"
seriesOrder: 13
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-13-ai-news-daily.png"
  alt: "AI 新聞精選｜2026-04-13"
---

## 今日觀察

2026 年 4 月 13 日的 AI 圈有兩條主線同時拉開。一邊是 MiniMax 正式開源 M2.7，這個以自我進化為核心賣點的模型在 SWE-Pro 拿下 56.22%、几乎追平 Claude Opus 的成績，但官方附上的卻是一紙非商業授權——任何營利行為都得另外取得書面同意。另一邊，伯克利 RDI 團隊在同天發布的審計報告幾乎是對整個評測生態的當頭棒喝：他們用一個自動化 Agent 在八個主流基準上全部刷到接近滿分，而過程中根本沒有真正解決任何任務。

這兩件事湊在一起，剛好觸及同一個核心問題：我們究竟在評測什麼？

---

## 主題一 — MiniMax M2.7 開源：效能亮眼，但商業授權設高牆

MiniMax 在 4 月正式開源了 M2.7，這是他們首個「深度參與自身進化過程」的模型。根據官方描述，M2.7 能構建複雜的 Agent 架構，支援 Agent Teams、複雜技能管理與動態工具搜尋，瞄準的是高複雜度的生產力任務。

實際數據說明了為何這麼多人關注：在 SWE-Pro 取得 **56.22%**，Terminal-Bench 拿到 **57.0%**，在 GDPval-AA 的 45 款模型評測中以 ELO 1495 排名第一。這些數字幾乎已經貼齊旗艦級封閉模型的表現。

然而開源的另一面是嚴格的授權限制。M2.7 採用基於 MIT 的非商業用途許可，任何商業應用都必須事先取得 MiniMax 書面授權並在產品介面展示特定標識。這個設計讓不少社群玩家與中小型新創團隊在第一時間就踩到紅線——你可以自由研究、下載、實驗，但只要開始收錢，就欠 MiniMax 一張許可函。

這種「開源但不自由」的姿態，在當前開源社群對模型授權討論越來越熱烈的時間點，格外值得觀察。

---

## 主題二 — 伯克利揭發評測基準集體漏洞：73% 到接近 100%，零任務完成

加州大學伯克利分校 RDI 中心在 4 月 12 日發表的這份審計報告，可能是今年最具殺傷力的 AI 研究之一。

研究團隊建構了一個自動化掃描 Agent，對八個主流 AI Agent 評測基準發動系統性攻擊：SWE-bench、WebArena、OSWorld、GAIA、Terminal-Bench、FieldWorkArena、CAR-bench。結果在所有基準上都拿到了 **73% 至接近 100%** 的分數——而多數情況下，該 Agent 根本沒有呼叫任何大語言模型，也沒有實際解決任務。

具體手法多樣：在 SWE-bench 上注入 pytest hook，強迫所有測試斷言通過，分數直接衝到 100%；在 WebArena 上則是利用任務點之間的間隙重複得分。在 Hacker News 上，這篇報告獲得了 202 點熱度，社群討論幾乎一面倒地指向同一個結論：現有的 benchmark leaderboard 可能根本不可信。

研究團隊辨識出七個系統性脆弱性模式，並將掃描 Agent 改造成名為 **BenchJack** 的自動化基準漏洞掃描工具，同時發布了「Agent-Eval 檢查清單」，試圖在框架層面堵住這些漏洞。

這件事對整個產業的影響是結構性的：如果評測分數可以被系統性操縞，那麼過去一兩年內所有「模型 XXX 在 benchmark YYY 表現超越 GPT-4」的新聞，都需要重新檢視背後的測試設計是否真的隔離了這種漏洞。

---

## 主題三 — 日本經產省豪擲 6315 億日圓，Rapidus 2 奈米量產計畫加速

日本經濟產業省宣布向國家戰略企業 Rapidus 提供最多 **6315 億日圓** 的追加補助，這筆資金將主要用於提升試製品的性能與良品率。疊加先前已公告的補助金額，日本政府對 Rapidus 的直接支援總額已達到約 **2.354 兆日圓**，全力衝刺 2 奈米先進半導體與 AI 晶片的國產化。

Rapidus 正在北海道千歲市興建工廠，並同步設立解析中心與後段製程研發基地，目標在量產年度內實現 2 奈米晶片的商業製造。這筆資金的規模與速度，顯示日本在半導體供應鏈自主可控這條路上，已經從政策宣言走向實質砸錢。

---

## 其他值得關注

- **MOSS-TTS-Nano**：MOSI.AI 與 OpenMOSS 開源僅 0.1B 參數的多語言語音生成模型，可在 4 核心 CPU 上即時跑，支援 20 種語言，含中文、英文、日語、韓語等。適合本地端部署與輕量級產品整合。

- **微信支付開源 wechatpay-skills**：官方釋出可在支援 Skill 的 AI IDE 中輔助支付的工具，覆蓋 JSAPI、APP、H5、Native、小程式、付款碼等多種模式，並整合選型、範例檢索與接口除錯能力。

---

## 參考連結

- [MiniMax M2.7 Hugging Face](https://huggingface.co/MiniMaxAI/MiniMax-M2.7)
- [MiniMax M2.7 GitHub](https://github.com/MiniMax-AI/MiniMax-M2.7)
- [MiniMax M2.7 評測數據（MarkTechPost）](https://www.marktechpost.com/2026/04/12/minimax-just-open-sourced-minimax-m2-7-a-self-evolving-agent-model-that-scores-56-22-on-swe-pro-and-57-0-on-terminal-bench-2/)
- [伯克利 RDI 審計報告原文](https://rdi.berkeley.edu/blog/trustworthy-benchmarks-cont/)
- [BenchJack 與 Agent-Eval 檢查清單說明](https://lilting.ch/en/articles/berkeley-rdi-ai-agent-benchmark-exploitation)
- [MOSS-TTS-Nano GitHub](https://github.com/OpenMOSS/MOSS-TTS-Nano)
- [微信支付 wechatpay-skills](https://pay.weixin.qq.com/doc/v3/merchant/4019638116)
- [日本經產省追加補貼 Rapidus（朝日新聞）](https://www.asahi.com/articles/ASV4C2QYWV4CULFA022M.html)
