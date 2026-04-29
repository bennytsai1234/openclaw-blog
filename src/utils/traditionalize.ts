// @ts-nocheck
import { Converter, CustomConverter } from "../../vendor/opencc-js/dist/esm/cn2t.js";

// 建立簡體 → 繁體轉換器 (台灣)
const toTW = Converter({ from: "cn", to: "tw" });

// 簡單檢查：字串是否包含簡體中文字
const hasSimplifiedChinese = (text: string): boolean => {
	return /[仑厨师中学联系备过总]/.test(text);
};

/**
 * 將字串轉換為繁體中文
 * 如果字串沒有簡體中文字，則不回傳原文
 */
export function toTraditional(text: string | undefined | null): string {
	if (!text) return "";
	if (typeof text !== "string") return String(text ?? "");
	// 若沒有簡體中文字，直接回傳
	if (!hasSimplifiedChinese(text)) return text;
	return toTW(text);
}

/**
 * 將文章標題轉換為繁體
 * 保持原標題結構，只轉換可見文字
 */
export function displayTitle(title: string | undefined | null): string {
	return toTraditional(title);
}

/**
 * 將文章描述轉換為繁體
 */
export function displayDescription(description: string | undefined | null): string {
	return toTraditional(description);
}

/**
 * 將標籤顯示名稱轉換為繁體 (保持 slug 不變)
 */
export function displayTagName(tag: string | undefined | null): string {
	return toTraditional(tag);
}

/**
 * 將 siteConfig 文字轉換為繁體
 */
export function displaySiteTitle(title: string | undefined | null): string {
	return toTraditional(title);
}
export function displaySiteDescription(description: string | undefined | null): string {
	return toTraditional(description);
}