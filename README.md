# 技術筆記 🦞

一個專注於前端技術、後端技術、網路技術、開發工具與工作流程優化的個人技術部落格。使用 [Astro](https://astro.build) 建構，🦞 以 OpenClaw 龍蝦為品牌形象。

## ✨ 特色

- **Astro 6** 靜態生成，極速載入
- **Tailwind CSS v4** + CSS `@property` 自訂漸變過渡
- **響應式設計** — 完整支援手機、平板、桌面
- **淺色 / 深色模式** — 自動偵測，亦可手動切換
- **MDX 支援** — Markdown + 元件威力
  - ⚠️ **Admonitions**（提示、警告、注意事項等）
  - 📦 **GitHub Card**（`::github{repo="user/repo"}`）
- **程式碼區塊** — [Expressive Code](https://expressive-code.com/)，dracula + github-light 雙主題
- **OG Image 自動生成** — [Satori](https://github.com/vercel/satori)
- **Giscus 留言系統** — GitHub Discussions 驅動
- **Webmentions** 支援
- **站內搜尋** — [Pagefind](https://pagefind.app/) 靜態搜尋
- **RSS 訂閱** — `/rss.xml`
- **Sitemap + robots.txt** 自動產生
- **Web App Manifest** — 可安裝至主畫面
- **Dark mode 啞色 → 白色系** — 對比度符合 WCAG AA 標準

## 🚀 快速開始

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 建構生產版本
pnpm build

# 預覽建構結果
pnpm preview
```

## 📝 文章格式

檔案命名規範：`YYYY-MM-DD-slug.md`

```
src/content/post/
├── 2026-03-25-astro-blog-setup.md
├── 2026-03-25-chrome-update-loop-fix.md
├── 2026-03-25-cloudflare-zerotrust-warning.md
├── 2026-03-25-dev-environment-setup.md
├── 2026-03-25-git-worktrees.md
└── 2026-03-25-youtube-cleaner-intro.md
```

### 文章 Frontmatter

| 欄位 | 必填 | 說明 |
|------|------|------|
| `title` | ✅ | 文章標題（最多 60 字） |
| `description` | ✅ | SEO 描述（用於 meta description） |
| `publishDate` | ✅ | 發布日期 `YYYY-MM-DD` |
| `updatedDate` | ❌ | 更新日期 `YYYY-MM-DD` |
| `tags` | ❌ | 標籤陣列，自動產生分類頁 |
| `coverImage` | ❌ | 封面圖片 `{ src, alt }` |
| `ogImage` | ❌ | 自訂 OG 圖片 URL（不填則自動生成） |
| `draft` | ❌ | `true` = 草稿，不在正式環境顯示 |
| `pinned` | ❌ | `true` = 置頂（首頁最多顯示 3 篇） |

### 短筆記 Frontmatter

| 欄位 | 必填 | 說明 |
|------|------|------|
| `title` | ✅ | 標題 |
| `description` | ❌ | 描述 |
| `publishDate` | ✅ | ISO 8601 格式 |

## 🎨 自訂

### 站台設定

編輯 `src/site.config.ts`：

- `url` — 站點網址（OG Image 生成需要）
- `title` / `description` — 站點名稱與描述
- `menuLinks` — 導航列連結

### 主題配色

編輯 `src/styles/global.css` 中的 `@theme` 區塊與 `data-theme="dark"` 覆蓋。

目前採用 **Ghost Casper Teal** 配色：
- 主色：`#2a9d8f`
- 深色模式啞色已調整為 `#cccccc`（符合 WCAG AA）

### 程式碼主題

編輯 `src/site.config.ts` 中的 `expressiveCodeOptions`，可替換 `themes` 陣列。預設 `["dracula", "github-light"]`。

支援主題一覽：https://expressive-code.com/guides/themes/#available-themes

### 社群連結

編輯 `src/components/SocialList.astro`，使用 [Icônes](https://icones.js.org/) 圖示庫。

## 🔧 指令

| 指令 | 說明 |
|------|------|
| `pnpm dev` | 啟動開發伺服器（`localhost:4321`） |
| `pnpm build` | 建構生產版本至 `./dist/` |
| `pnpm postbuild` | 使用 Pagefind 建立靜態搜尋索引 |
| `pnpm preview` | 預覽建構結果 |
| `pnpm check` | 執行 Astro TypeScript 檢查 + Biome 格式化 |
| `pnpm lint` | Biome 檢查 |
| `pnpm format` | Biome 自動修復格式化 |

## 📁 專案結構

```
src/
├── components/          # Astro 元件
│   ├── blog/           # 部落格相關（Masthead、TOC、分享按鈕等）
│   ├── layout/         # Header、Footer
│   └── note/          # 短筆記元件
├── content/
│   ├── post/          # 文章（Markdown/MDX）
│   ├── note/          # 短筆記
│   └── tag/           # 標籤 metadata
├── layouts/            # 頁面佈局
│   ├── Base.astro     # 全站基礎佈局
│   └── BlogPost.astro # 文章頁佈局（含 TOC、相關文章、燈箱）
├── pages/             # 頁面
│   ├── index.astro    # 首頁
│   ├── about.astro    # 關於
│   ├── posts/         # 文章列表與文章頁
│   ├── notes/         # 短筆記列表與頁面
│   ├── category/      # 分類頁
│   ├── tags/          # 標籤頁
│   └── og-image/      # OG 圖片生成
├── plugins/           # 自訂 remark 外掛
│   ├── remark-admonitions.ts   # 警示區塊
│   ├── remark-github-card.ts    # GitHub 卡片
│   └── remark-reading-time.ts   # 閱讀時間
├── styles/
│   └── global.css     # 全域樣式 + Tailwind 主題
├── site.config.ts     # 站台設定
└── content.config.ts  # Content Layer 設定
```

## 🚢 部署

Vercel 自動部署 `main` 分支，亦支援 Netlify。

```bash
# 綁定 Vercel
vercel --prod
```

## 📦 技術棧

- **框架：** Astro 6.0.8
- **樣式：** Tailwind CSS v4 + @tailwindcss/typography
- **語言：** TypeScript
- **圖片：** Sharp（處理與優化）
- **OG Image：** Satori + resvg-js
- **程式碼高亮：** astro-expressive-code
- **搜尋：** Pagefind
- **留言：** Giscus
- **格式化：** Biome
- **部署：** Vercel

## 🔗 相關連結

- 部落格：https://openclaw-blog.vercel.app/
- GitHub：https://github.com/BennyTsai1234/openclaw-blog
- Astro 文件：https://docs.astro.build/

---

*以 OpenClaw AI 助理 建構與維護 🦞*
