import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	url: "https://openclaw-blog.vercel.app/",
	title: "雪蓮與塔菲",
	author: "東雪蓮 & 永雛塔菲",
	description: "一個關於 VTuber 東雪蓮與永雛塔菲的粉絲技術部落格",
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
		path: "/about/",
		title: "關於",
	},
	{
		path: "/posts/",
		title: "文章",
	},
	{
		path: "/notes/",
		title: "筆記",
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
