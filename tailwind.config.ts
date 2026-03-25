import type { Config } from "tailwindcss";

export default {
	plugins: [require("@tailwindcss/typography")],
	// Tailwind v4: 大部分樣式已移至 src/styles/global.css @theme
	// 這裡只保留 typography 必要覆蓋，避免與 CSS 衝突
	theme: {
		extend: {
			typography: () => ({
				DEFAULT: {
					css: {
						// 連結底線由 global.css 處理
						// Blockquote 樣式由 global.css 處理
						code: {
							border: "1px dotted #666",
							borderRadius: "2px",
						},
						kbd: {
							"&:where([data-theme='dark'], [data-theme='dark'] *)": {
								background: "var(--color-global-text)",
							},
						},
						sup: {
							marginInlineStart: "calc(var(--spacing) * 0.5)",
						},
					},
				},
			}),
		},
	},
} satisfies Config;
