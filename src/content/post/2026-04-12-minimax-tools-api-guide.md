---
title: "【技術解析】MiniMax 工具調用完整攻略：Text Generation、Music 2.6、Coding Plan"
description: "深入解析 MiniMax API 的六個核心工具：文字生成、music-2.6、music-cover、lyrics_generation、coding-plan-vlm 與 coding-plan-search 的調用方式與額度策略。"
publishDate: "2026-04-12T16:18:00+08:00"
updatedDate: "2026-04-12T16:18:00+08:00"
tags: ["MiniMax", "API", "Music Generation", "Coding Plan"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-12-minimax-tools-api-guide.png"
  alt: "MiniMax 工具調用完整攻略"
---

## 這篇文章在說什麼

MiniMax 不只是對話模型，它是一個涵蓋文字、程式碼、圖片、影片、音樂的全矩陣 AI 平台。本文從一次實際用量截圖出發，深入研究 MiniMax 目前最實用的六個工具：Text Generation、music-2.6、music-cover、lyrics_generation、coding-plan-vlm、coding-plan-search。每一個工具都有獨立的 API Endpoint、模型參數與額度限制，混用會出事。

## 為什麼重要

MiniMax 的 Token Plan 與 Coding Plan 是兩套獨立的計費系統，共用 API Key 不等於共享額度。開發者最常踩的坑是：拿著一般 API Key 想去戳 Coding Plan 端點，或者把 music-2.6 的額度拿去當 Text Generation 用。這篇一次說清楚。

## 技術細節

### Text Generation

MiniMax 的文字模型走 **Claude API 相容** 端點，支援 MiniMax-M2.7、M2.5、M2.1 系列。

**Endpoint：**
```
POST https://api.minimax.io/anthropic/v1/messages
```

**Header：**
```
Authorization: Bearer <API_KEY>
anthropic-version: 2023-06-01
Content-Type: application/json
```

**可用模型：**

| 模型 | 特色 | 輸出速度 |
|------|------|----------|
| `MiniMax-M2.7` | 旗艦推理能力 | ~60 tps |
| `MiniMax-M2.7-highspeed` | 同性能，更快 | ~100 tps |
| `MiniMax-M2.5` | 程式碼優化 | ~60 tps |
| `MiniMax-M2` | Agent 能力 | - |

值得注意的是，M2.7-highspeed 與 M2.7 的差異**只有速度**，模型智商相同。對需要低延遲的 Agent 工作流，高速版是首選。

---

### music-2.6

MiniMax 在 2026 年 4 月 10 日發布了 Music 2.6，是目前最新一代的音樂生成模型。中國風樂器終於有「橫向時間進行」而非樣本機械拼接，中低頻也經過專門優化，適用於 House、Trap、Drum & Bass 與遊戲配樂。

**Endpoint：**
```
POST https://api.minimax.io/v1/music_generation
```

**必填參數：**

| 參數 | 說明 |
|------|------|
| `model` | `"music-2.6"` 或 `"music-2.6-free"` |
| `prompt` | 音樂風格描述，1–3500 字元 |

**選填參數：**

| 參數 | 說明 |
|------|------|
| `lyrics` | 歌詞內容，用 `\n` 換行 |
| `is_instrumental` | `true` = 無人聲純音樂 |
| `lyrics_optimizer` | `true` = 自動優化 prompt 生成的歌詞 |
| `audio_setting` | sample_rate（44100）、bitrate（256000）、format（mp3）|

**免費額度：Beta 期間每天 100 首，每首上限 5 分鐘。**

---

### music-cover

music-cover 的核心能力是**傳一首參考歌曲，AI 提取旋律骨架，再給你完全不同的風格編曲**。民謠可以變金屬，古典交響可以變賽博龐克。適合想要「保留旋律但換風格」的創作場景。

**Endpoint：** 同 music-2.6，共用同一個 `/v1/music_generation`

**差異在參數：**

| 參數 | 說明 |
|------|------|
| `model` | `"music-cover"` 或 `"music-cover-free"` |
| `audio_url` | 參考音檔的公開 URL |
| `audio_base64` | 或直接傳 Base64 編碼的音檔 |

> 注意：`audio_url` 和 `audio_base64` 必須二選一，不能都不選。

```bash
curl -X POST https://api.minimax.io/v1/music_generation \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "music-cover",
    "prompt": "Convert to epic orchestral metal",
    "audio_url": "https://example.com/original-song.mp3"
  }'
```

---

### lyrics_generation

歌詞生成是 music-2.6 工作流的**第一步**（可選）：先讓 AI 根據主題產生完整歌詞，再拿歌詞去生成歌曲。

**Endpoint：**
```
POST https://api.minimax.io/v1/lyrics_generation
```

**參數：**

| 參數 | 說明 |
|------|------|
| `mode` | 目前已知值：`"write_full_song"` |
| `prompt` | 歌曲主題描述 |

產出的歌詞已包含結構標記（`[Verse]`、`[Chorus]`、`[Bridge]` 等），直接傳給 music-2.6 的 `lyrics` 參數即可。

---

### coding-plan-vlm 與 coding-plan-search

這兩個是 MiniMax 給 Coding Plan 用戶的專用端點，配額獨立計算。從用量截圖來看，兩者**共享 1500 requests/5 小時的額度**（不是各自 1500）。

**用量查詢 Endpoint：**
```
GET https://platform.minimax.io/v1/api/openplatform/coding_plan/remains?GroupId={GROUP_ID}
```

**Header：**
```
Authorization: Bearer <CODING_PLAN_API_KEY>
referer: https://platform.minimax.io/user-center/payment/coding-plan
```

> 這組 API Key 與一般 Text Generation 的 Key **不同**，不能混用。Coding Plan Key 需要在平台上另外建立。

**Token Plan 額度參考：**

| 方案 | M2.7 | M2.7-highspeed | Speech 2.8 | image-01 |
|------|------|----------------|-------------|----------|
| Starter | 1,500 req/5h | 4,500 req/5h | — | — |
| Plus | 4,500 req/5h | 15,000 req/5h | 4,000 字/天 | 50 張/天 |
| Max | 15,000 req/5h | 30,000 req/5h | 11,000 字/天 | 120 張/天 |

---

## 我的觀點

MiniMax 的工具矩陣設計有個明確的方向：**從「一個模型打天下」走向「每個場景專用優化」**。music-2.6 與 music-cover 的分工就是最好例子——一個從零創作，一個風格遷移，兩個場景的需求邏輯完全不同，硬塞進同一個 API 反而不直覺。

對於開發者來說，最關鍵的是搞清楚手上的 API Key 是哪一類。Coding Plan 的 Key 只能用來查用量和戳 Coding Plan 端點，拿去跑 Text Generation 會吃閉門羹。反過來，一般 API Key 也不能用優惠的 Coding Plan 額度。這點如果沒搞清楚，月底帳單會說話。

另外，Music 2.6 的 Beta 免費額度（每天 100 首）是認真的，對個人開發者或小型工作室來說，初期做原型足夠了。Beta 結束後的定價策略會是關鍵觀察點。

## 參考連結

- [MiniMax Music Generation API 文件](https://platform.minimax.io/docs/guides/music-generation)
- [MiniMax Music 2.6 發布公告](https://www.minimax.io/news/music-26)
- [MiniMax API Overview](https://platform.minimax.io/docs/api-reference/api-overview)
- [Token Plan 額度說明](https://platform.minimax.io/docs/token-plan/intro)
- [MiniMax Models 總覽](https://platform.minimax.io/docs/guides/models-intro)
