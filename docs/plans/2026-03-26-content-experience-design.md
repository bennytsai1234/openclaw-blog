# 部落格內容體驗全面優化 PRD

## 目標

全面提升文章頁的閱讀體驗，從字體排版到程式碼區塊、從章節層次到圖文搭配、從元數據呈現到動效細節，每個環節都優化到位。

---

## A. 字體與段落優化

### 現況問題
- 段落行高偏窄，讀長文眼睛疲勞
- 正文和副文對比度不夠，層次不明
- blockquotes 視覺區分度低

### 實作項目

**A-1. 段落行高與間距**
- `prose` 的 line-height 從預設值調整到 `1.8`
- 段落間距增加 `margin-bottom: 1.5em`
- 段落首行縮排（indent）不明顯，維持現在的对齐方式

**A-2. Blockquote 重新設計**
- 左邊 4px 紫色豎線（`border-left: 4px solid var(--color-accent)`）
- 背景微微渐層（`background: linear-gradient(to right, var(--color-accent-soft), transparent)`）
- 斜體字體
- 左側 padding 增加

**A-3. 弱化連結底線視覺噪音**
- 連結底線從 solid 改為 dotted，或使用 `text-decoration-color` 讓底線更細緻
- Hover 時底線變紫色 solid，不晃眼

---

## B. 程式碼區塊增強

### 現況問題
- 缺少語言標示（如 `TypeScript / Bash`）
- 沒有行號顯示
- 複製按鈕目前是透明 idle，讀者不知道有複製功能

### 實作項目

**B-1. 語言標示（Language Label）**
- 在程式碼區塊左上角加入語言名稱（如 `typescript`、`bash`）
- 使用 `--color-accent` 背景 + 白色字，小型 pill 樣式
- 位置絕對定位在區塊頂部外層

**B-2. 行號顯示（Line Numbers）**
- Astro Expressive Code 已支援 `showLineNumbers`，在 `expressiveCodeOptions` 中啟用
- 行號顏色用 muted 色，與程式碼正文拉開對比

**B-3. 複製按鈕 UI 改善**
- Idle 狀態顯示一個小的「複製」icon（不是透明），位置在區塊右上角
- 點擊後變成綠色打勾，2 秒後回覆
- 加上「Copied!」tooltip

**B-4. 程式碼標題（Filename/Title）**
- 支援 `// filename.ts` 或 code block title
- 顯示在區塊頂部，深色背景條

---

## C. 章節閱讀體驗

### 現況問題
- 標題層次（H1/H2/H3）視覺區分不夠明顯
- 標題前的 `#` 符號 hover 後才出現，有點慢
- 沒有「章節概覽 / 迷你目錄」

### 實作項目

**C-1. 標題層次強化**
- H2：`font-size: 1.5rem`，左邊紫色豎線（`border-left: 3px solid var(--color-accent)`），padding-left
- H3：`font-size: 1.25rem`，粗體紫色
- H4+：維持現狀

**C-2. `#` 符號常駐顯示**
- 從 hover 才顯示改為預設就顯示，但透明度降低（`opacity: 0.3`）
- Hover 時 `opacity: 1`，並變成紫色

**C-3. 閱讀進度資訊增強**
- 在文章頂部（Masthead 下方）加入「預估閱讀時間」大字顯示（`font-size: 1.1rem`，不只是一行小字）
- 顯示「約 N 分鐘閱讀」

---

## D. 圖文排版

### 現況問題
- 圖片沒有陰影，浮在文字上沒有層次
- 圖片說明（figcaption）沒有專屬樣式
- 圖片點擊燈箱已有，但過渡動效偏慢

### 實作項目

**D-1. 文章圖片加陰影**
- `<img>` in `.prose` 加 `box-shadow: 0 4px 20px rgba(0,0,0,0.1)`
- 深色模式適用：`box-shadow: 0 4px 20px rgba(0,0,0,0.4)`

**D-2. 圖片說明樣式（figcaption）**
- 解析 `<figcaption>` 或 `<p><em>圖：xxx</em></p>` 格式
- 樣式：灰色小字 `font-size: 0.8rem`，置中，margin-top: 0.5rem

**D-3. 燈箱過渡動效加速**
- 將燈箱的 fade 過渡時間從 300ms 改為 200ms，更靈敏

**D-4. 寬圖片支援**
- 文章內超過 700px 的圖片自動 `data-astro-image="full-width"`
- 在大螢幕上圖片可以寬於正文

---

## E. 元數據增強

### 現況問題
- 閱讀時間只在 Masthead 小字顯示，不夠顯眼
- 發布日期格式單調，沒有相對時間（如「3 天前」）
- 標籤（Tags）在文章頂部，但尺寸偏小

### 實作項目

**E-1. 顯眼的閱讀時間**
- 在 Masthead 內，日期旁邊的閱讀時間改為較大字體（`font-size: 0.95rem`），並加 📖 emoji

**E-2. 相對時間顯示**
- 發布日期同時顯示「YYYY/MM/DD」+「（N天前）」
- 用 JS 在客戶端計算，format: `X 天前`

**E-3. 標籤視覺強化**
- 文章頂部 Tags 的字體從 `text-xs` 改為 `text-sm`
- 每個 tag 從 `border: 1px solid` 改為 `background: var(--color-accent-soft)` 背景
- Hover 時背景加深

**E-4. 更新日期提示**
- 如果文章有 `updatedDate`，在 Masthead 顯示「更新於 MM/DD」，並用綠色小 badge

---

## 驗收標準（所有 stories 通用）

- Build 成功（`npm run build`）
- Lighthouse Performance > 90（在有動效的情況下）
- 深色模式外觀正常
- 響應式（320px ~ 1440px）都正常
- Typecheck passes

---

## 技術約束

- 不引入新的 npm 依賴
- 所有樣式使用現有 CSS 變數（`--color-*`）
- 動效使用 CSS transitions（不引入 JS 動效庫）
- 優先修改 `global.css`，避免改太多 astro 元件
