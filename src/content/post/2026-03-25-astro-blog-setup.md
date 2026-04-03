---
title: "使用 Astro 建構高效能部落格"
description: "從零開始架設技術部落格，Astro 6 + Tailwind CSS v4 + Vercel 完整攻略，附上完整程式碼與主題客製化技巧。"
publishDate: "2026-03-25"
updatedDate: "2026-03-26"
tags: ["frontend", "astro", "tailwind", "故障排除"]

---

## 前言

架部落格這件事，選擇比努力重要。一個好的框架能讓你專注在內容上，而不是和工具糾纏。

Astro 就是這樣的存在。它是專為內容驅動網站設計的靜態框架，**預設零 JavaScript**，效能表現極為優秀。這篇文章用我的實際部落格為範例，帶你從零架設一個完整的技術部落格。

**技術棧預覽：**
- Astro 6.0.8 + TypeScript
- Tailwind CSS v4
- 程式碼高亮：astro-expressive-code（dracula + github-light 雙主題）
- 搜尋：Pagefind（純靜態全文搜尋）
- 留言：Giscus（GitHub Discussions 驅動）
- 部署：Vercel

---

## 初始化專案

```bash
# 建立新專案
npm create astro@latest

# 選擇範本（這裡用 Empty）
# 啟用 TypeScript / 安裝依賴 / 初始化 git

cd your-project
pnpm add astro @astrojs/check @astrojs/mdx @astrojs/rss @astrojs/sitemap
pnpm add -D @biomejs/biome @tailwindcss/typography
```

本部落格使用 [Cactus 主題](https://github.com/chrismwilliams/astro-theme-cactus) 為基底修改而來。

---

## 目錄結構

```
src/
├── assets/          # 圖片等靜態資源
├── components/      # Astro 元件
├── content/
│   ├── post/        # 文章（Markdown/MDX）
│   ├── note/        # 短筆記
│   └── tag/         # 分類標籤
├── data/            # 資料檔案
├── layouts/         # 頁面佈局
├── pages/           # 路由頁面
├── plugins/         # Vite 插件
├── styles/          # 全域樣式
├── types.ts         # TypeScript 類型
├── utils.ts         # 工具函式
└── content.config.ts # Content Layer 配置
```

---

## Content Layer 設定

Astro 6 引入全新的 Content Layer API，用法更直覺：

```typescript
// src/content.config.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const post = defineCollection({
  loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string(),
      coverImage: z.object({ alt: z.string(), src: image() }).optional(),
      draft: z.boolean().default(false),
      ogImage: z.string().optional(),
      tags: z.array(z.string()).default([]),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      pinned: z.boolean().default(false),
    }),
});

export const collections = { post };
```

---

## Tailwind CSS v4 設定

Astro 6 配合 Tailwind CSS v4，設定方式大幅簡化：

```bash
pnpm add @tailwindcss/vite tailwindcss
```

```typescript
// astro.config.mjs
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

在 `src/styles/global.css` 中直接使用 `@theme` 覆寫預設值：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@theme {
  /* 主題色 */
  --color-primary: #2a9d8f;
  --color-primary-hover: #21867a;
  --color-accent: #8338ec;

  /* 字體 */
  --font-sans: "Noto Sans TC", system-ui, sans-serif;
  --font-mono: "Fira Code", monospace;
}
```

---

## 程式碼高亮：astro-expressive-code

語法高亮是技術部落格的靈魂，astro-expressive-code 是目前最優雅的方案：

```bash
pnpm add astro-expressive-code
```

```typescript
// astro.config.mjs
import expressiveCode from "astro-expressive-code";

export default defineConfig({
  integrations: [
    expressiveCode({
      themes: ["dracula", "github-light"],
      styleOverrides: {
        borderRadius: "4px",
        codeFontFamily: "Fira Code, monospace",
        codeFontSize: "0.875rem",
        frames: {
          frameBoxShadowCssValue: "none",
          inlineButtonBackground: "#2a9d8f",
          inlineButtonForeground: "#ffffff",
        },
      },
    }),
  ],
});
```

支援：
- 標題檔名
- 複製按鈕
- 程式碼行高亮
- 雙主題切換（淺色/深色）

---

## 搜尋功能：Pagefind

Pagefind 是一個純靜態的全文搜尋方案，不需要後端：

```bash
pnpm add -D pagefind
```

在 `package.json` 加入 postbuild 指令：

```json
{
  "scripts": {
    "postbuild": "pagefind --site dist"
  }
}
```

在搜尋頁面注入 Pagefind UI：

```astro
<div id="search" data-pagefind-body></div>
<link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
<script src="/pagefind/pagefind-ui.js" is:inline></script>
```

---

## OG Image 生成

社群分享的視覺效果很重要。使用 Satori 在建置時自動生成 OG 圖：

```bash
pnpm add satori satori-html @resvg/resvg-js
```

```typescript
// src/pages/og-image/[...slug].png.ts
import { ImageResponse } from "astro-og";
import satori from "satori";
import satoriHtml from "satori-html";

export async function GET({ props }: { props: { title: string } }) {
  const font = await fetch(
    "https://cdn.jsdelivr.net/font-fira-code@2/FiraCode-Regular.ttf"
  ).then((r) => r.arrayBuffer());

  const html = satoriHtml(`
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%; background: linear-gradient(135deg, #2a9d8f 0%, #8338ec 100%); padding: 40px;">
      <h1 style="color: white; font-size: 48px; font-weight: bold; text-align: center;">${props.title}</h1>
    </div>
  `);

  return new ImageResponse(satori(html, { fonts: [{ name: "Fira Code", data: font }] }), {
    width: 1200,
    height: 630,
  });
}
```

---

## Vercel 部署

Vercel 是 Astro 最順暢的部署選擇，支援 SSR 和靜態部署：

### 1. 安裝 Vercel CLI

```bash
pnpm add -g vercel
```

### 2. 建立 vercel.json

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist"
}
```

### 3. 部署

```bash
vercel --prod
```

### 自訂網域與 HTTPS

在 Vercel Dashboard 的 Domains 設定，自動附帶 SSL 憑證。

---

## SEO 優化

### Sitemap

```bash
pnpm add @astrojs/sitemap
```

```typescript
// astro.config.mjs
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://your-blog.vercel.app",
  integrations: [sitemap()],
});
```

### robots.txt

```bash
pnpm add astro-robots-txt
```

```typescript
import robotsTxt from "astro-robots-txt";

export default defineConfig({
  integrations: [robotsTxt()],
});
```

---

## 自訂 Remark Plugin

技術文章常用 Callout、程式碼卡片等增強語法。寫一個簡單的 remark directive：

```typescript
// src/plugins/remark-admonitions.ts
import { visit } from "unist-util-visit";

export function remarkAdmonitions() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      const data = node.data || (node.data = {});
      data.hName = `div`;
      data.hProperties = {
        class: `admonition admonition-${node.name}`,
      };
    });
  };
}
```

---

## 深色模式

Astro 配合 View Transitions 實現無閃爍的深色模式切換：

```astro
<script>
  const theme = localStorage.getItem("theme");
  if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.dataset.theme = "dark";
  }
</script>
```

CSS 中使用 `data-theme` 屬性區分：

```css
[data-theme="dark"] {
  --bg: #282c35;
  --text: #abb2bf;
}
```

---

## 效能監控

使用 Lighthouse 檢測分數，目標：全部 100。

常見優化：
- 圖片使用 `loading="lazy"` + `decoding="async"`
- 字體使用 `font-display: swap`
- 靜態資源預測性載入
- CSS 壓縮（cssnano）

---

## 結語

Astro 生態系已經非常成熟，現在架設技術部落格比以前容易太多了。從初始專案到完整上線，大概只需要一個下午的時間。

重點不是工具，而是開始寫。🎉

---

**相關資源：**
- [Astro 文件](https://docs.astro.build)
- [astro-expressive-code](https://github.com/rafaelmontelius/astro-expressive-code)
- [Pagefind](https://pagefind.app)
- [Vercel 部署](https://vercel.com/docs/frameworks/astro)
