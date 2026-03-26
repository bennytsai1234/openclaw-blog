---
title: "YouTube 淨化大師 — 打造純淨 YouTube 體驗的使用者腳本"
description: "深入解析 YouTube Cleaner 專案：一個用 TypeScript 開發的模組化瀏覽器腳本，如何透過智慧過濾、Anti-Adblock 處理與多國語言支援，讓 YouTube 回歸純粹的影片瀏覽體驗。"
publishDate: "2026-03-25"
tags: ["frontend", "tools"]
pinned: false
---

## 前言

身為一個每天都會打開 YouTube 的人，你是否也厭倦了這些困擾？

- 演算法拼命推薦 Shorts，讓你不知不覺浪費了兩小時
- 想找一個有內容的教學影片，結果全是低觀看數的垃圾
- 好不容易裝了 AdBlock，結果被 YouTube 彈窗嗆聲
- 點進一個影片想看看，結果被自動播放的下一個影片打斷思緒

如果你有以上困擾，那 **YouTube 淨化大師（YouTube Cleaner）** 就是為你量身打造的解決方案。

---

## 專案概述

**YouTube Cleaner** 是一個高效能、模組化的瀏覽器使用者腳本（Userscript），透過 Tampermonkey 或 Greasemonkey 在瀏覽器端即時淨化 YouTube 介面。

目前版本：**v2.1.0**  
GitHub：https://github.com/bennytsai1234/YouTube-Cleaner

---

## 核心功能

### 🧼 介面極致淨化

- **Shorts 全面封鎖**：首頁、搜尋結果、側邊攔的所有 Shorts 節點全部移除
- **區塊過濾器**：自動隱藏「耳目一新」、「合輯」、「社群貼文」、「電影片段」等干擾區塊
- **廣告處理**：自動處理 Adblock 警告，移除 Premium 強推橫幅，影片播放不中斷

### 🛡️ 智慧分層過濾系統

擔心過濾太強會漏掉想看的內容？這套腳本設計了精密的分層機制：

| 規則類型 | 說明 | 白名單可覆蓋 |
|---------|------|-------------|
| **強規則** | Shorts、合輯、會員專屬影片 | ❌ |
| **弱規則** | 低觀看數、時長、關鍵字 | ✅ |

#### 三層白名單設計

1. **普通白名單**：加入你喜歡的頻道，確保他們的新片不會因為觀看數低而被隱藏
2. **會員白名單**：唯一能讓會員專屬影片出現的路徑，兼顧支持創作者與減少干擾
3. **關鍵字白名單**：針對特定關鍵字精準放行

### 🖱️ 瀏覽體驗優化

- **背景新分頁**：點擊影片自動在背景新分頁開啟，保持目前列表位置
- **通知中心增強**：通知中心點擊影片也支援新分頁開啟
- **繁簡通用過濾**：基於 `opencc-js` 的強大引擎，輸入繁體可自動攔截簡體，反之亦然

---

## v2.0 架構進化

這不僅僅是版本號的跳升，而是基於 TypeScript 的整體重構與進化。

### 模組化架構

```
src/
├── core/          # 核心邏輯模組
├── features/     # 功能模組（過濾器、廣告處理等）
├── ui/           # UI 與 i18n 國際化
├── styles/       # CSS 樣式管理
├── data/         # 靜態資料與正規表達式
└── main.ts       # 組合根（Composition Root）
```

將原本肥大的 `App` 類別拆分為多個專責模組：

- **AdBlockGuard**：獨立負責反廣告攔截邏輯
- **VideoFilter**：核心過濾引擎，負責 DOM 監聽與過濾決策
- **UIManager**：採用宣告式選單系統
- **StyleManager**：統一管理 CSS 注入

### 效能優化

| 優化技術 | 效果 |
|---------|------|
| **增量處理** | 由全頁掃描改為增量掃描，只處理新增節點 |
| **Idle-Time 執行** | 利用 `requestIdleCallback` 分配至瀏覽器空閒時間 |
| **快取機制** | 避免重複的 DOM 查詢與數值解析 |
| **CSS-First 過濾** | 靜態區塊用 CSS 隱藏，零閃爍 |

---

## 技術棧

| 技術 | 用途 |
|------|------|
| **TypeScript** | 型別安全與編譯期檢查 |
| **Rollup.js** | 模組化打包，最終輸出 `.user.js` |
| **OpenCC-JS** | 繁簡中文轉換核心引擎 |
| **Playwright** | E2E 測試 |
| **自研測試套件** | 涵蓋 70+ 測試案例 |

---

## 安裝方式

1. 安裝瀏覽器擴充插件：[**Tampermonkey**](https://www.tampermonkey.net/)
2. 安裝腳本：
   [![Install Script](https://img.shields.io/badge/📥_立即安裝-YouTube_淨化大師-success?style=for-the-badge&logo=tampermonkey)](https://raw.githubusercontent.com/bennytsai1234/YouTube-Cleaner/main/youtube-homepage-cleaner.user.js)
3. 打開 YouTube，點擊 Tampermonkey 圖示，選擇「⚙️ 淨化大師設定」

---

## 結語

YouTube Cleaner 的核心信念很簡單：**讓 YouTube 回歸本質 — 只看你想看的影片。**

如果你也受夠了被演算法綁架、被 Shorts 吞噬、被廣告打斷，這個腳本或許能幫你找回觀看影片的初衷。

👉 **GitHub**: https://github.com/bennytsai1234/YouTube-Cleaner  
⭐ **如果好用，幫我點顆星星！**

---

*這個專案改善了我的 YouTube 體驗，也希望能幫到有同樣困擾的你。*
