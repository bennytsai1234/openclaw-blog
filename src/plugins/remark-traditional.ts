// @ts-nocheck
import { visit } from "unist-util-visit";
import { toTraditional } from "../utils/traditionalize";

/**
 * Remark 插件：自動將 Markdown 正文中的簡體中文轉換為繁體
 * 
 * 使用方式：
 *   import remarkTraditional from "./src/plugins/remark-traditional";
 *   // 在 astro.config.ts 的 remarkPlugins 中加入
 *   remarkPlugins: [remarkTraditional],
 * 
 * 注意：
 *   - 此轉換僅影響 Markdown 正文內容
 *   - 不會修改程式碼區塊、程式碼語法等
 *   - 標題、描述等 frontmatter 需透過另外的 utility 處理
 */
export default function remarkTraditional() {
	return (tree: any) => {
		visit(tree, "text", (node: any, index: number | null, parent: any) => {
			// 跳過程式碼區塊
			if (parent?.type === "mdxFlowExpression" || parent?.type === "mdxTextExpression") {
				return;
			}

			// 跳過 code 標籤內的文字 (避免破壞程式碼)
			const parentTag = parent?.tagName;
			if (parentTag === "code" || parentTag === "pre" || parent?.type === "code") {
				return;
			}

			// 跳過包含 "ignore-traditional" 類別的元素
			if (parent?.properties?.className?.includes("ignore-traditional")) {
				return;
			}

			// 轉換文字
			if (node.value) {
				const converted = toTraditional(node.value);
				if (converted !== node.value) {
					node.value = converted;
				}
			}
		});
	};
}