import { visit } from "unist-util-visit";

export function rehypeInlineTerm() {
	return (tree: any) => {
		visit(tree, "element", (node: any, index: number | null, parent: any) => {
			if (!parent || node?.tagName !== "code") return;
			if (parent.tagName === "pre") return;

			node.tagName = "span";
			node.properties = {
				...(node.properties ?? {}),
				className: ["term-highlight"],
			};
		});
	};
}
