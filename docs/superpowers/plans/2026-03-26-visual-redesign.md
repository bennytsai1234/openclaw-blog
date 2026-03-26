# Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 openclaw-blog 的色彩系統、資訊密度全面對齊 Ghost Casper 風格（以 tbbbk.com 為參考），微調 Accent 色形成差異，深色模式使用 Ghost 精準配色。

**Architecture:** 純 CSS 變數替換 + 小幅元件修改，不動頁面結構。在 `global.css` 集中替換所有 OKLCH 灰階值為 Ghost Casper hex 色彩。PostPreview 加入閱讀時間（從 `post.body` 以 reading-time 套件計算），日期改為 `23 Mar 2026` 格式（en-GB locale）。

**Tech Stack:** Astro 5, Tailwind v4, TypeScript, reading-time (已安裝)

---

### Task 1: 更新全局色彩系統

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: 替換 `@property` 初始值與 `@theme` 色彩變數（淺色模式）**

將 `@property` 區塊和 `@theme` 區塊的色彩從 oklch 灰階改為 Ghost Casper 精準值：

```css
/* @property 初始值（fallback，不影響實際顯示） */
@property --color-global-bg {
  syntax: "<color>";
  inherits: true;
  initial-value: #ffffff;
}
@property --color-global-text {
  syntax: "<color>";
  inherits: true;
  initial-value: #333333;
}
@property --color-muted {
  syntax: "<color>";
  inherits: true;
  initial-value: #999999;
}
@property --color-link {
  syntax: "<color>";
  inherits: true;
  initial-value: #333333;
}
@property --color-accent {
  syntax: "<color>";
  inherits: true;
  initial-value: #2a9d8f;
}
@property --color-accent-2 {
  syntax: "<color>";
  inherits: true;
  initial-value: #15171a;
}
@property --color-quote {
  syntax: "<color>";
  inherits: true;
  initial-value: #555555;
}

/* @theme（淺色模式） */
@theme {
  --color-global-bg: #ffffff;
  --color-global-text: #333333;
  --color-muted: #999999;
  --color-link: #333333;
  --color-accent: #2a9d8f;
  --color-accent-hover: #21867a;
  --color-accent-soft: #e8f6f5;
  --color-accent-2: #15171a;
  --color-quote: #555555;
  --color-surface: #f6f6f6;
  --color-surface-hover: #eeeeee;
  --font-sans: "Inter", "Noto Sans TC", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

- [ ] **Step 2: 替換深色模式色彩（`[data-theme="dark"]` 區塊）**

```css
&[data-theme="dark"] {
  color-scheme: dark;
  --color-global-bg: #282c35;
  --color-global-text: #e2e2e2;
  --color-muted: #868686;
  --color-link: #e2e2e2;
  --color-accent: #2a9d8f;
  --color-accent-hover: #35b8a8;
  --color-accent-soft: #1a3d3a;
  --color-accent-2: #f0f0f0;
  --color-quote: #aaaaaa;
  --color-surface: #2f333c;
  --color-surface-hover: #3b3e46;
}
```

- [ ] **Step 3: 確認 transition 清單保持不變，確認龍蝦 hover 特效不受影響（`--color-accent-soft` 和 `--color-surface` 使用 oklch drop-shadow → 保持現有 filter 語法不動）**

- [ ] **Step 4: Commit**

```bash
cd /home/benny/.openclaw/workspace/projects/openclaw-blog-cactus
git add src/styles/global.css
git commit -m "style: replace grayscale oklch with Ghost Casper teal palette"
```

---

### Task 2: 修正 expressiveCode 複製按鈕色 + webmanifest theme_color

**Files:**
- Modify: `src/site.config.ts`
- Modify: `astro.config.ts`

- [ ] **Step 1: 更新 `src/site.config.ts` 中 expressiveCodeOptions 的按鈕顏色**

找到 `frames` 區塊，將 purple oklch 改為 teal：

```ts
frames: {
  frameBoxShadowCssValue: "none",
  inlineButtonBackground: "#2a9d8f",
  inlineButtonForeground: "#ffffff",
  inlineButtonBorder: "#2a9d8f",
  inlineButtonBackgroundIdleOpacity: "1",
  inlineButtonBackgroundHoverOrFocusOpacity: "1",
  inlineButtonBackgroundActiveOpacity: "1",
  inlineButtonBorderOpacity: "0.3",
},
```

- [ ] **Step 2: 更新 `astro.config.ts` 中 webmanifest 的 `theme_color`**

```ts
theme_color: "#2a9d8f",
```

- [ ] **Step 3: Commit**

```bash
git add src/site.config.ts astro.config.ts
git commit -m "style: update code block and manifest accent color to teal"
```

---

### Task 3: 更新日期格式（含年份，Ghost 風格）

**Files:**
- Modify: `src/utils/date.ts`
- Modify: `src/site.config.ts`
- Modify: `src/components/blog/PostPreview.astro`

- [ ] **Step 1: 在 `src/utils/date.ts` 中為 `getFormattedDate` 加入 locale 參數**

```ts
export function getFormattedDate(
  date: Date | undefined,
  options?: Intl.DateTimeFormatOptions,
  locale?: string,
): string {
  if (date === undefined) {
    return "Invalid Date";
  }
  return new Intl.DateTimeFormat(locale ?? siteConfig.date.locale, {
    ...(siteConfig.date.options as Intl.DateTimeFormatOptions),
    ...options,
  }).format(date);
}
```

- [ ] **Step 2: 在 `src/components/blog/PostPreview.astro` 中，直接用 en-GB locale 格式化日期，不依賴 FormattedDate 元件**

目前 PostPreview 使用 `<FormattedDate>` 元件。改為在 frontmatter 計算格式化日期字串：

```ts
// In frontmatter
const dateStr = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
}).format(post.data.publishDate);
// 結果: "23 Mar 2026"
```

Template 中替換 `<FormattedDate>` 為直接輸出 `{dateStr}`，並加上 `<time datetime={post.data.publishDate.toISOString()}>` 包裹。

- [ ] **Step 3: Commit**

```bash
git add src/utils/date.ts src/components/blog/PostPreview.astro
git commit -m "style: update post date format to Ghost style (23 Mar 2026)"
```

---

### Task 4: PostPreview 加入閱讀時間

**Files:**
- Modify: `src/components/blog/PostPreview.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: 在 `src/components/blog/PostPreview.astro` 中計算並顯示閱讀時間**

使用 `post.body`（原始 markdown 字串）直接計算：

在 frontmatter：
```ts
import getReadingTime from "reading-time";
// post.body 是原始 markdown
const readingStats = getReadingTime(post.body ?? "");
const readingTimeStr = `${Math.ceil(readingStats.minutes)} min`;
```

Template 新增右對齊閱讀時間：

```astro
<FormattedDate class="text-muted min-w-24 font-medium" date={post.data.publishDate} />
<Tag class="flex-1">
  {post.data.draft && <span class="text-red-500">(Draft) </span>}
  <a class="hover:text-accent font-semibold transition-colors duration-200" href={`/posts/${post.id}/`}>
    {post.data.title}
  </a>
</Tag>
<span class="text-muted shrink-0 text-sm">{readingTimeStr}</span>
```

- [ ] **Step 2: 確認 `src/pages/index.astro` 的 PostPreview 呼叫不需要改動（post 物件已包含 body）**

- [ ] **Step 3: 同步更新 `src/pages/posts/index.astro` 加入閱讀時間顯示**

在現有 posts list 中，於 `FormattedDate` 旁邊加入：

```astro
const readingStats = getReadingTime(post.body ?? "");
const readingTimeStr = `${Math.ceil(readingStats.minutes)} min`;
```

並在模板中 date 欄位後加上：
```astro
<span class="text-muted text-xs">{readingTimeStr}</span>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/PostPreview.astro src/pages/posts/index.astro
git commit -m "feat: add reading time to post preview and posts list"
```

---

### Task 5: 建置驗證

- [ ] **Step 1: 執行建置確認無錯誤**

```bash
cd /home/benny/.openclaw/workspace/projects/openclaw-blog-cactus
npm run build 2>&1 | tail -20
```

Expected: `✓ Completed in X.XXs`，無 TypeScript 或 Astro 錯誤。

- [ ] **Step 2: 若有 TypeScript 錯誤，修正後再 build**

- [ ] **Step 3: 最終 commit（若有修正）**

```bash
git add -A
git commit -m "fix: resolve build errors from visual redesign"
```
