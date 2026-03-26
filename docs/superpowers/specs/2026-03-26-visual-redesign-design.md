# Design Spec: openclaw-blog 視覺重設計

**日期**: 2026-03-26
**版本**: A（色彩系統 + 資訊密度對齊，保留 Hero 佈局）
**參考**: tbbbk.com（Ghost Casper 主題），加入原創優化

---

## 目標

以 tbbbk.com 的整體視覺風格為靈感來源，調整 openclaw-blog 的色彩系統、資訊密度與深色模式配色，同時加入自訂優化，形成獨特風格，非直接複製。

---

## 色彩系統

### Accent 色（微調）
- tbbbk 原色：`#318c96`
- **本站調整**：`#2a9d8f`（略偏綠青、更沉穩飽和）
- 理由：保持 teal 家族但與原站形成差異

### 淺色模式
| 變數 | 值 |
|------|-----|
| `--color-global-bg` | `#ffffff` |
| `--color-global-text` | `#333333` |
| `--color-muted` | `#999999` |
| `--color-link` | `#333333` |
| `--color-accent` | `#2a9d8f` |
| `--color-accent-hover` | `#21867a` |
| `--color-accent-soft` | `#e8f6f5` |
| `--color-accent-2` | `#15171a` |
| `--color-quote` | `#555555` |
| `--color-surface` | `#f6f6f6` |
| `--color-surface-hover` | `#eeeeee` |

### 深色模式（Ghost Casper 精準值）
| 變數 | 值 |
|------|-----|
| `--color-global-bg` | `#282c35` |
| `--color-global-text` | `#e2e2e2` |
| `--color-muted` | `#868686` |
| `--color-link` | `#e2e2e2` |
| `--color-accent` | `#2a9d8f` |
| `--color-accent-hover` | `#35b8a8` |
| `--color-accent-soft` | `#1a3d3a` |
| `--color-accent-2` | `#f0f0f0` |
| `--color-quote` | `#aaaaaa` |
| `--color-surface` | `#2f333c` |
| `--color-surface-hover` | `#3b3e46` |

### 邊框色
- 淺色：`#e6e6e6`
- 深色：`#3b3e46`

---

## 字型

保持現有字型不變：
- Sans: `"Inter", "Noto Sans TC", system-ui, sans-serif`
- Mono: `"JetBrains Mono", ui-monospace, monospace`

---

## PostPreview 元件改動

### 日期格式
- Before: `Mar 23, 2026`（英文月份在前）
- After: `23 Mar 2026`（日 月縮寫 年，Ghost 風格含年份）
- 日期文字色：accent 色

### 閱讀時間
- 新增右對齊閱讀時間（`X min`）
- 色：`--color-muted`
- 計算方式：`Math.ceil(wordsCount / 200)` min（200 字/分鐘）
- 需在 `getAllPosts()` 或 frontmatter 層加入 `readingTime` 計算

### 版面
```
[日期 teal]  [文章標題]  [tag pill]     [X min]
```
- 日期 min-width: 80px
- 閱讀時間右對齊，whitespace-nowrap

---

## 優化項目（超越 tbbbk.com）

1. **日期含年份**：tbbbk 只顯示「23 Mar」，本站顯示「23 Mar 2026」，更清晰
2. **閱讀進度條顏色**：改為 accent teal，與整體一致
3. **TOC active 色**：改為 accent teal
4. **Blockquote 左線**：改為 accent teal
5. **H2 左側豎線**：改為 accent teal
6. **Code block 複製按鈕**：從 purple oklch(60% 0.18 280) 改為 teal accent
7. **Tag pill hover**：bg → accent, text → white（已有，確認 teal）
8. **深色模式 surface 邊界感**：輕微 border 增加層次感

---

## 修改檔案清單

| 檔案 | 修改內容 |
|------|---------|
| `src/styles/global.css` | 全局色彩變數替換 |
| `src/site.config.ts` | expressiveCodeOptions 複製按鈕色 → teal |
| `src/components/blog/PostPreview.astro` | 日期格式 + 閱讀時間 |
| `src/components/FormattedDate.astro` | 日期格式調整（含年份）|
| `src/utils/` 或 `src/data/post.ts` | 新增 readingTime 計算 |

---

## 不改動項目

- Hero 佈局（龍蝦 Logo + 大標題）
- 頁面整體結構
- 字型系統
- 導覽列結構
- Footer
