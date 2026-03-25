import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	url: "https://openclaw-blog.vercel.app/",
	title: "技術筆記",
	author: "Benny",
	description: "記錄開發過程中的所見所得，專注於前端技術、後端技術、網路技術、開發工具與工作流程優化。",
	lang: "zh-TW",
	ogLocale: "zh_TW",
	date: {
		locale: "zh-TW",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
};

export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "首頁",
	},
	{
		path: "/posts/",
		title: "文章",
	},
	{
		path: "/category/",
		title: "分類",
	},
	{
		path: "/about/",
		title: "關於",
	},
];

export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
			// 複製按鈕可見（idle 時顯示）
			inlineButtonBackground: "oklch(60% 0.18 280)",
			inlineButtonForeground: "oklch(98% 0.01 280)",
			inlineButtonBorder: "oklch(60% 0.18 280)",
			inlineButtonBackgroundIdleOpacity: "1",
			inlineButtonBackgroundHoverOrFocusOpacity: "1",
			inlineButtonBackgroundActiveOpacity: "1",
			inlineButtonBorderOpacity: "0.3",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		return `[data-theme="${theme.name}"]`;
	},
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
