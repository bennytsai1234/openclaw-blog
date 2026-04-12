---
title: "MiniMax Music 2.6 深度解析：Cover 功能與免費額度實測"
description: "深入解析 MiniMax Music 2.6 全新 Cover 功能（樂曲風格遷移）、全球 beta 免費額度，以及國際版 Starter 訂閱的 Music 額度說明。"
publishDate: "2026-04-10T19:52:00+08:00"
tags: [AI, MiniMax, 音樂生成, Music 2.6, Cover功能]
draft: false
---

本篇文章同步發布於 [MiniMax News](https://www.minimax.io/news/music-26)。

## 1. 專案總覽

MiniMax Music 2.6 已於今天（2026 年 4 月 10 日）正式發布。這次 MiniMax 選擇用四個人的真實故事來介紹新功能，而非純粹堆疊技術規格——他們想證明的是：「AI 音樂模型的價值不在 spec sheet，在於讓使用者做到以前做不到的事。」

2026 年的 AI 音樂生成市場已經有三個主要玩家：

| 平臺 | 最新版本 | 特點 | 適合場景 |
|------|---------|------|---------|
| Suno | v5.5（2026-03）| 最受歡迎，8 分鐘歌曲，語音克隆 | 大眾消費者 |
| MiniMax Music | 2.6（2026-04）| 專業控制，Cover 樂曲遷移，開放 beta | 專業創作、开发者 |
| Google Lyria 3 | Pro（2026-03）| 圖像引導生成，負面提示詞 | 企業級應用 |

MiniMax 的定位這次更清晰：**不是跟 Suno 搶大眾市場，而是搶專業創作者和开发者**。

---

## 2. 核心功能解析

### 2.1 Cover 功能：樂曲風格遷移

這是 Music 2.6 最重要、也最具差異化的新功能。

**Cover 是什麼：**
上傳一首現有歌曲，模型精確提取其旋律骨架（melodic skeleton），然後讓你決定除了骨架之外的所有元素——

- 風格：從民謠跳到重金屬
- 編制：從古典交響樂跳到後賽博電子
- 歌詞：保留旋律但完全替換歌詞

**Cover 的應用場景：**
- 把一首經典老歌換成新的音樂風格
- 為媽媽哼唱的旋律配上現代編曲
- 把外語歌保留旋律，翻譯成中文歌詞

過去這種需求幾乎不可能實現。現在只需要上傳參考音頻 + 幾個文字描述。

### 2.2 14 天全球 Creative Beta 免費額度

MiniMax Music 2.6 從今天起開放全球 Creative Beta，為期 14 天：

| 用戶類型 | 免費額度 |
|---------|---------|
| 一般消費者 | 每帳號每天 500 次免費生成 |
| 開發者 | 已加入 Token Plan 的用戶每天再送 100 次免費 API 調用 |

**這是非常慷慨的免費額度。** 以每首歌 1 Credit 計算，相當於每天都可生成 500 首歌曲，絕對足夠測試和創作使用。

### 2.3 純器樂支援（Music 2.5+ 延续）

Music 2.5+ 帶來的純器樂生成能力在 2.6 繼續支援，適合：
- 電影配樂
- 遊戲 BGM
- 氛圍音樂

### 2.4 模型家族一覽

| 模型 | 定位 | 價格（API）|
|------|------|---------|
| Music 2.6 | 最新旗艦，Cover + 純器樂 | 待定 |
| Music 2.5 / 2.5+ | 專業品質，人聲 + 純器樂 | $0.15/首歌 |
| Music 2.0 | 高性價比，輕量場景 | $0.03/首歌 |
| Music v1.5 | 經典穩定，4 分鐘歌曲 | 隨用付費 |
| Music v1 | 參考音頻學習，風格匹配 | 隨用付費 |

---

## 3. 實際應用案例

### 3.1 Cover 功能實測

以「Auld Lang Syne」為例：
- **原始版本**：蘇格蘭民謠，鋼琴伴奏
- **Cover 版本 1**：金屬風格，電吉他強力和弦
- **Cover 版本 2**：古典交響樂編制

全部保留原曲旋律骨架，只改變編曲風格。

### 3.2 遊戲配樂

```text
Prompt: Electric guitar-driven uplifting melody,
         adding passion to adventure and combat.
```

Music 2.6 可以在短時間內生成多個版本的遊戲 BGM，開發者可以根據遊戲情節切換情緒風格。

### 3.3 影視配樂

```text
Prompt: A minimalist cinematic score driven by pulsing
         synthesizers, with tight and precise rhythms.
```

模型根據場景描述生成完整配樂，匹配敘事節奏，涵蓋多種情緒和氛圍需求。

---

## 4. 橫向比較

| 維度 | Suno v5.5 | MiniMax Music 2.6 | Google Lyria 3 Pro |
|------|-----------|-------------------|-------------------|
| 歌曲時長 | 最長 8 分鐘 | 最長 4+ 分鐘 | 最長 3 分鐘 |
| Cover 風格遷移 | ❌ | ✅ | ❌ |
| 語音克隆 | ✅ | ❌ | ❌ |
| 純器樂 | ✅ | ✅ | ✅ |
| API 支援 | 受限 | ✅ | ✅（Vertex） |
| 免費額度 | 有限 | **500次/天（beta）** | 有限 |
| 商用授權 | 受限 | ✅ 無版權費 | ✅ |
| 跨風格融合 | 一般 | **強（巴洛克金屬等）** | 一般 |

---

## 5. 免費額度說明（針對你的問題）

### 5.1 MiniMax 國際版 Starter 訂閱是否有 Music 額度？

根據 MiniMax API Platform 官方定價頁面，MiniMax 的方案分為：

**MiniMax 國際版 Token Plan（平台.minimaxi.com）：**

| 方案 | 價格 | 內容 |
|------|------|------|
| Starter | $5/月 | 100,000 tokens/月 |
| Standard | $30/月 | 300,000 tokens/月 |
| Pro | $99/月 | 1,100,000 tokens/月 |
| Scale | $249/月 | 3,300,000 tokens/月 |
| Business | $999/月 | 20,000,000 tokens/月 |

這個 Token Plan 是**通用 tokens**，可用於 MiniMax M2.7、M2.5 等文字模型的 API 調用。

**⚠️ Music 額度需要另外购买：**
MiniMax Music 2.6 的 API 走的是「Pay as You Go」模式，並不包含在 Starter Token Plan 內：

| 模型 | API 價格 |
|------|---------|
| Music 2.5 / 2.5+ | $0.15/首（最長 5 分鐘）|
| Music 2.0 | $0.03/首（最長 5 分鐘）|
| 歌詞生成 | $0.01/首 |

換句話說，Starter 方案給你的 tokens 不能直接用來生成 Music，需要另外付費購買 Music API 額度。

### 5.2 如何免費用 MiniMax Music？

**目前最划算的方法：**

1. **14 天 Creative Beta（當前活動）：** 前往 [minimaxi.com/audio/music](https://www.minimaxi.com/audio/music)，使用一般消費者介面，每天有 **500 次免費生成額度**，不需要 API，無需付費訂閱。

2. **開發者方向：** 如果你已有 Token Plan 訂閱，每天再送 **100 次免費 API 調用**（這個是 MiniMax Music 2.6 Beta 活動特別提供的）。

3. **WaveSpeedAI 等第三方平臺：** 某些第三方平臺有免費額度可以嘗試 MiniMax Music。

### 5.3 MiniMax 國際版 App（minimaxi.com）是否有免費額度？

MiniMax 在 minimaxi.com 有專門的 Audio 頁面包含 Music 功能。根據官方活動說明，**一般消費者用戶每天 500 次免費創作**，這個額度在 14 天 beta 期內有效。這是目前最推薦的免費使用方式。

---

## 6. 常見問題 FAQ

**Q：Cover 功能支援哪些音頻格式？**
A：MiniMax 官方尚未明確列出所有支援格式，一般 MP3、WAV 等常見格式應可上傳。建議使用清晰的音頻文件以獲得最佳效果。

**Q：Beta 期結束後的定價是多少？**
A：目前官方尚未公布 Music 2.6 的正式 API 定價。可參考 Music 2.5 的 $0.15/首作為估算基準。

**Q：生成的音樂可以商用嗎？**
A：**可以。** MiniMax 所有輸出音樂均為無版權費（royalty-free），可用於商業用途。

**Q：Starter 方案（$5/月）可以用來調用 Music API 嗎？**
A：Token Plan 的 tokens 主要用於文字模型。Music API 需要另外付費購買，不走 tokens 額度。

**Q：500 次/天的免費額度用完了怎麼辦？**
A：Beta 期每天 500 次額度獨立計算，隔天會重置。如果需要更大用量，可購買 MiniMax Music 的一次性 Credits（$9.9 起）或等待正式定價公佈。

---

## 7. 個人觀點

今天（2026-04-10）剛發布就去研究，我最驚喜的不是 Cover 功能本身，而是 MiniMax 對 AI 音樂創作的態度——他們強調的是「讓每個人都能做到以前做不到的事」，而不是「模型又強了 10%」。

Cover 功能本質上解決的是一個很人性化的需求：**我不想重新創作，只想改變一首歌的風格，讓媽媽認得出來但又不那麼老派**。這種需求過去只有專業編曲師才能做到，現在每個人都可以。

**對開發者的建議：** 如果你在做需要背景音樂的應用（遊戲、短影片、平臺），MiniMax Music 的 API 性價比極高（$0.03/首起），而且有免費額度可以測試。相較於 Suno 的封閉生態，MiniMax 的開放 API 對开发者更友善。

---

## 8. 入門指南

### 如何使用免費額度（14 天 Beta）

**Step 1：** 前往 [minimaxi.com/audio/music](https://www.minimaxi.com/audio/music)

**Step 2：** 登入 MiniMax 帳號（國際版）

**Step 3：** 開始創作
- 在文字框輸入音樂描述（風格、情緒、場景）
- 或使用 Cover 功能上傳參考歌曲
- 每天 500 次免費，隨時可用

### 如何使用 API（開發者）

**Step 1：** 前往 [platform.minimaxi.com](https://platform.minimaxi.com)

**Step 2：** 申請 API Key（如已有 Token Plan 可直接使用）

**Step 3：** 查看 Music 2.6 API 文件

API 文件：[platform.minimaxi.com/docs/api-reference/music-generation](https://platform.minimaxi.com/docs/api-reference/music-generation)

**Beta 期間優惠：** 已是 Token Plan 用戶的開發者，每天再送 100 次免費 API 調用。

---

**相關資源：**

- [MiniMax Music 2.6 官方發布頁面](https://www.minimax.io/news/music-26)
- [MiniMax 國際版 Audio](https://www.minimaxi.com/audio/music)
- [API 平台](https://platform.minimaxi.com)
- [MiniMax Music API 定價](https://platform.minimax.io/docs/guides/pricing-paygo)
