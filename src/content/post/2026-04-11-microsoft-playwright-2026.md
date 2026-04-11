---
title: "Microsoft Playwright 2026 完整解析：從入門到 MCP AI 自動化"
description: "深入解析 Microsoft Playwright 2026 最新進展：1.58 版本新功能、HTML Speedboard、Playwright MCP、AI 測試生態，以及與 Cypress、Selenium 的完整比較。"
publishDate: 2026-04-11
tags: [Playwright, E2E測試, Microsoft, AI測試, 自動化測試, MCP]
draft: false
---

本篇文章同步發布於 [Playwright 官方網站](https://playwright.dev/)。

## 1. 專案總覽

Microsoft Playwright 是微軟開源的端對端（E2E）測試框架，讓開發者可以用一套程式碼在 Chrome、Firefox、Safari 三個主流瀏覽器上執行自動化測試。自 2020 年發布以來，2026 年迎來了爆發性成長——根據 TestGuild 調查，**45% 的 QA 團隊現在使用 Playwright**（從 2023 年的 9% 成長為 5 倍），包括 Amazon、Microsoft、Walmart、NVIDIA、IBM 等一線大廠都已實際投入生產環境。

```
2023 年：「要不要試試 Playwright？」
2024 年：「我們正在規劃遷移。」
2025 年：「遷移完成了。」
2026 年：Playwright 已成新專案預設選擇
```

**目前版本：1.58.x（2026 年 3 月最新）**

---

## 2. 核心功能解析

### 2.1 Auto-Wait 機制

Playwright 最大的核心優勢：所有操作都自帶智能等待。點擊按鈕時，框架會自動等待元素變得可見且可交互後才執行，**不需要手動寫 `sleep()` 或複雜的等待條件**。這讓測試穩定性和執行速度大幅領先 Selenium。

```typescript
// Playwright：自動等待，不需要額外設定
await page.getByRole('button', { name: 'Login' }).click();
await expect(page.getByText('Welcome')).toBeVisible();

// Selenium：需要手動等待（容易產生 flaky tests）
WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, 'login-btn'))
)
```

### 2.2 跨瀏覽器原生支援

一個 API，覆蓋三個瀏覽器引擎（Chromium、WebKit、Firefox），不需要各自安裝 driver：

```typescript
import { chromium, firefox, webkit } from '@playwright/test';

const browsers = [chromium(), firefox(), webkit()];
for (const browser of browsers) {
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await browser.close();
}
```

### 2.3 Trace Viewer 除錯利器

Playwright 內建強大的追蹤檢視器，可以記錄每一步操作的截圖、網路請求、主控台輸出，讓失敗的測試可以完全重現：

```typescript
import { test } from '@playwright/test';

test('login flow', async ({ page }) => {
    await page.context().tracing.start({
        snapshots: true,
        screenshots: true,
    });
    await page.goto('/login');
    // ... 操作
    await page.context().tracing.stop(
        { path: './trace.zip' }
    );
});
// 用 npx playwright show-trace ./trace.zip 開啟檢視器
```

### 2.4 Locator 智慧定位

Playwright 推薦使用語義化定位（role、text、label），而非脆弱的 CSS selector：

```typescript
// ✅ 推薦：語義化定位，DOM 變更時較穩定
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Email address').fill('test@example.com');
await page.getByText('Welcome back').waitFor();

// ⚠️ 避免：CSS selector 容易因結構改變而斷掉
await page.locator('#login-form > div.button-area > button.primary').click();
```

---

## 3. 2026 年版本新功能

### 3.1 HTML Report Speedboard（最大亮點）

Playwright 1.58 的核心功能是 HTML 報告中全新的 **Timeline Speedboard** 分頁。過去想分析測試效能，需要 export CSV 再匯入其他工具；現在直接在瀏覽器裡就能看到每個測試的時間軸和效能瓶頸。

### 3.2 testConfig.tag 批量標籤

```typescript
// playwright.config.ts
export default defineConfig({
    use: {
        testConfig: {
            tag: '@smoke',  // 所有測試自動標記，方便 merge-reports
        },
    },
});
```

### 3.3 worker.on('console') 主控台事件

可以直接監聽測試 worker 中的 console 輸出，適用於除錯和日誌收集：

```typescript
test('console monitoring', async ({ page, worker }) => {
    const logs: string[] = [];
    worker.on('console', msg => logs.push(msg.text()));
    await page.goto('/app');
    expect(logs).toContain('App initialized');
});
```

### 3.4 Locator.description() 自訂描述

```typescript
const loginButton = page.getByRole('button', { name: 'Login' });
loginButton.describe('登入按鈕（表單右上方）');
console.log(loginButton.description()); // 輸出：登入按鈕（表單右上方）
```

### 3.5 Service Worker 網路監控

現在可以截獲 Service Worker 發出的網路請求，適用於 Progressive Web App（PWA）的測試場景：

```typescript
// 預設開啟，可透過環境變數關閉
process.env.PLAYWRIGHT_DISABLE_SERVICE_WORKER_NETWORK = '1';
```

### 3.6 CDP isLocal 優化

```typescript
// 連接到本地 CDP 伺服器時啟用檔案系統優化
const browser = await chromium.connectOverCDP('ws://localhost:9222', {
    isLocal: true,  // 告知 Playwright 同機器執行，啟用優化
});
```

---

## 4. Playwright MCP：AI 測試的殺手級功能

### 4.1 MCP 是什麼？

Playwright MCP（Model Context Protocol）於 2025 年推出，2026 年成為 AI 測試生態的核心。**它讓任何 AI Agent 可以直接透過標準協議控制 Playwright，** 不需要自己寫瀏覽器操控層，也不依賴昂貴的視覺模型 API。

```bash
# 30 分鐘就能架起 AI 驅動的瀏覽器測試
npx @playwright/mcp@latest --headless --no-sandbox
```

### 4.2 運作原理

MCP Server 運作在**無障礙訪問樹（Accessibility Tree）**上，而非截圖。AI 模型收到的不是像素，而是結構化的 DOM 角色、名稱、狀態。這帶來三個關鍵優勢：

1. **不需要視覺能力** — AI 直接解析 DOM，不需要昂貴的 vision model
2. **行為確定性高** — 不會「看到」模糊元素而失誤
3. **減少幻覺行為** — AI 只在工程師定義的範圍內操作

### 4.3 在 CI/CD 中的應用

```yaml
# GitHub Actions 範例
- name: Run Playwright MCP Tests
  run: npx @playwright/mcp@latest --headless --no-sandbox
```

常見問題處理：
- Timeout：加 `--timeout-navigation 90000` 延長導航超時
- 狀態異常：刪除 `~/.cache/ms-playwright/mcp-chrome-profile` 重置

### 4.4 對測試策略的影響

| 維度 | 舊思維 | MCP 時代 |
|------|--------|---------|
| 建置時間 | 12+ 個月自建 | 一個 sprint 完成 demo |
| 維護成本 | 高（自負）| 標準協議，降低長期維護負擔 |
| 供應商選擇 | 「支援 tech stack 嗎？」| 「維護方案清楚嗎？」|

---

## 5. Playwright 與對手的完整比較（2026）

| 維度 | Playwright | Cypress | Selenium |
|------|-----------|---------|---------|
| 速度 | 最快 | 快（在瀏覽器內執行）| 較慢（HTTP 層）|
| 瀏覽器支援 | Chromium、Firefox、WebKit | Chromium、Firefox、Edge | 所有瀏覽器，含舊版 |
| 語言支援 | JS/TS、Python、.NET、Java | 僅 JS/TS | Java、Python、C#、Ruby、JS、Kotlin |
| Auto-wait | 內建，所有操作 | 內建，可鏈式 | 需手動（BiDi 在改善中）|
| 多分頁/視窗 | 完全支援 | 不支援 | 支援 |
| 手機測試 | 僅模擬 | 僅模擬 | 透過 Appium 支援原生 |
| 除錯工具 | Trace Viewer、Inspector | Time-travel、截圖 | 記錄、截圖 |
| GitHub Stars | 74K+（成長中）| 較大、成熟 | 最大、最成熟 |
| AI 整合 | MCP 支援 | 有限 | 取決於第三方 |

**結論：**
- 新專案 → Playwright（預設選擇）
- 只想測 JS/TS 前端 → Cypress 也 OK
- 龐大 legacy Selenium 基礎 → 沒必要遷移，但新專案別再選 Selenium

---

## 6. 市場格局與產業採用

### 6.1 數據說話

根據 TestGuild 2026 年調查數據：

- **45%** 的 QA 團隊使用 Playwright（2023 年僅 9%）
- **5 倍** 成長，2 年內從 9% 到 45%
- **4,484 家** 企業已完成遷移驗證
- Amazon、Microsoft、Walmart、NVIDIA、IBM 都在生產環境運行
- **40%** 執行速度提升，Flakiness 大幅降低

### 6.2 Azure Playwright Testing 即將退役

值得注意的是：**Microsoft Azure Playwright Testing Preview 將於 2026 年 3 月 8 日退役**。這讓一些使用者疑惑是否影響到 Playwright 本身——答案是**完全不受影響**。Azure Playwright Testing 只是一個 Azure 雲端託管服務，開源的 Playwright Core 繼續由微軟全力支持，沒有任何變化。

### 6.3 競爭態勢

```
┌──────────────────────────────────────────┐
│     E2E 測試框架市場份額（2026）          │
├────────────┬───────────┬────────────────┤
│ Playwright │ Selenium │    Cypress     │
│   45%      │   39%    │     其餘       │
│ (快速成長) │ (仍最大)  │               │
├────────────┼───────────┼────────────────┤
│ 2023 年：9% → 2026 年：45%              │
│ 新專案選 Playwright：3 : 1              │
└────────────┴───────────┴────────────────┘
```

---

## 7. AI 測試生態現況

### 7.1 Playwright 為何適合 AI？

Playwright 的結構化輸出（traces、videos、reports、snapshots）讓 AI Agent 可以：
- **自動規劃測試流程**：基於頁面結構生成測試步驟
- **自我修復失敗測試**：檢測失敗原因並重構 locator
- **人類可審計**：所有 AI 行為都有 trace 可查

### 7.2 Codegen 的角色

`npx playwright codegen` 可以記錄操作並自動生成 Playwright 程式碼，是很好的入門工具：

```bash
npx playwright codegen  # 開啟 UI 錄製工具
```

輸出已改進（v1.55+）：自動插入 `expect(locator).toBeVisible()`，減少手動斷言。

### 7.3 AI 輔助維護

AI 的價值不是取代測試工程師，而是降低維護成本：

| 問題 | 過去 | AI 時代 |
|------|------|---------|
| 失敗測試分類 | 手動看 log | AI 自動歸類並建議修復 |
| Locator 維護 | 手動更新 selector | AI 檢測 DOM 變更並重構 |
| 測試覆蓋評估 | 人工估算 | AI 分析存取樹找出盲點 |

---

## 8. 優缺點分析

### 優點

- **✅ Auto-wait 大幅降低 flakiness**：自動等待是 Playwright 最大的穩定性來源
- **✅ 微軟全力支持**：每週更新，1.58 版本節奏快速
- **✅ Trace Viewer 極強**：不只是截圖，是完整的時間軸重現
- **✅ MCP 生態成型**：AI Agent 可以直接整合
- **✅ 跨瀏覽器真正無痛**：一個 API 三個引擎，不需要 driver 管理
- **✅ 文件極佳**：`playwright.dev` 的文件是業界最好的測試框架文件之一

### 缺點

- **⚠️ 僅 JS/TS、Python、.NET、Java**：Ruby、C# 等其他語言沒有官方支援
- **⚠️ 行動原生測試僅模擬**：無法像 Selenium + Appium 那樣測試原生移動應用
- **⚠️ 無官方 Microsoft 認證**：沒有微軟官方的 Playwright 認證（LambdaTest 有第三方）
- **⚠️ 1.58  Breaking Changes**：`_react` 和 `_vue` selector、`:light` suffix、`devtools` 選項在升級時需要移除
- **⚠️ WebKit 不支援 macOS 13 以下**：舊版 macOS 用戶需要注意

---

## 9. 常見問題 FAQ

**Q：Playwright 有官方認證嗎？**
A：**沒有**。Microsoft 沒有發布官方的 Playwright 認證。LambdaTest 有第三方 Playwright 認證，但業界普遍認為實作經驗比認證更有說服力。

**Q：Selenium 已經投資很多，還需要遷移到 Playwright 嗎？**
A：如果 legacy 系統穩定運作，不需要急著遷移。但對於**新專案**，Playwright 在新團隊中是預設選擇。新專案選 Playwright 的比率是 Selenium 的 3:1。

**Q：Playwright 適合網頁爬蟲嗎？**
A：適合，而且比傳統爬蟲更強大。Playwright 可以處理 JavaScript 渲染的頁面、SPA、登入後的內容，還有截圖、PDF 生成等附加功能。

**Q：Auto-wait 會影響測試速度嗎？**
A：不會。事實上因為不需要手動等待超時，整體執行速度反而**更快**，通常比其他框架快 40%。

**Q：Azure Playwright Testing 退役會影響我嗎？**
A：**幾乎不會**。這只是一個 Azure 雲端託管服務，開源 Playwright Core 完全不受影響，持續正常更新。

---

## 10. 版本演化時間線

```
2020 年     Playwright 正式發布（微軟開源）
2022 年     Playwright v1.30+ 開始被廣泛採用
2023 年     TestGuild 調查：僅 9% QA 團隊使用
           Codegen 工具正式加入
2024 年     MCP 協議概念開始滲透
2025 年     Playwright MCP 正式發布
           採用率快速爬升
2026 年     v1.58.x：HTML Speedboard、Timeline
           採用率達 45%（5 倍成長）
           Azure Playwright Testing 退役
           Amazon/Walmart/NVIDIA/IBM 生產驗證
```

---

## 11. 個人觀點

用了一段時間 Playwright，最真實的感想是：**它解決的不是技術問題，是溝通問題。**

過去 QA 和開發者之間最大的摩擦點是「測試到底可不可信」——Selenium 的 flaky tests 讓大家對自動化測試失去信心。Playwright 的 Auto-wait + Trace Viewer 把這個問題幾乎解決了，團隊重新開始信任自動化測試的結果。

**三個值得關注的趨勢：**

1. **MCP 讓 AI 測試民主化**：過去要 12 個月才能建好的 AI 測試系統，現在一個 sprint 就能跑 demo。雖然 production-ready 還是需要時間，但進入門檻已經大幅降低。

2. **Playwright 成為 AI Agent 的標準瀏覽器層**：幾乎所有 AI 測試工具都建在 Playwright 上，因為它的結構化輸出是 AI 最容易理解的格式。

3. **文件是它的競爭壁壘**：很多框架功能很強但文件混亂，Playwright 的文件 quality 讓它難以被取代——新進工程師的學習曲線比其他框架低很多。

---

## 12. 入門指南

### Step 1：安裝

```bash
# npm（推薦）
npm init playwright@latest

# 或在現有專案加入
npm install -D @playwright/test
npx playwright install --with-deps
```

### Step 2：建立第一個測試

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('首頁標題正確', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
});

test('登入流程', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Welcome')).toBeVisible();
});
```

### Step 3：設定 Config

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});
```

### Step 4：執行測試

```bash
# 單次執行
npx playwright test

# UI 模式（視覺化互動）
npx playwright test --ui

# 查看 HTML 報告
npx playwright show-report
```

### Step 5：探索 Codegen

```bash
# 錄製操作生成測試程式碼
npx playwright codegen http://localhost:3000
```

---

**相關資源：**

- [官方網站](https://playwright.dev/)
- [官方文件](https://playwright.dev/docs/intro)
- [GitHub 仓库](https://github.com/microsoft/playwright)
- [Playwright MCP 設定指南](https://github.com/microsoft/playwright-mcp)
