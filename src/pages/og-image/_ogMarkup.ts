import { html } from "satori-html";
import { siteConfig } from "@/site.config";

// OG image markup, use https://og-playground.vercel.app/ to design your own.
export const ogMarkup = (title: string, pubDate: string, description: string) =>
	html`<div
		tw="flex flex-col w-full h-full"
		style="background: linear-gradient(135deg, #0f0a1e 0%, #1a0f2e 40%, #0d1b3e 100%)"
	>
		<div tw="flex flex-col flex-1 w-full px-14 py-12 justify-center">
			<p tw="text-2xl mb-4" style="color: #a78bfa">${pubDate}</p>
			<h1 tw="text-5xl font-bold leading-snug mb-6" style="color: #f1f5f9">${title}</h1>
			<p tw="text-2xl leading-relaxed" style="color: #c4b5fd; max-width: 900px">${description}</p>
		</div>
		<div
			tw="flex items-center justify-between w-full px-14 py-8"
			style="border-top: 2px solid; border-image: linear-gradient(90deg, #7c3aed, #3b82f6) 1"
		>
			<div tw="flex items-center">
				<svg height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 2L2 7l10 5 10-5-10-5z"
						fill="#8b5cf6"
						stroke="#a78bfa"
						stroke-width="1.5"
						stroke-linejoin="round"></path>
					<path
						d="M2 17l10 5 10-5"
						stroke="#6366f1"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M2 12l10 5 10-5"
						stroke="#818cf8"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
				</svg>
				<p tw="ml-3 font-semibold text-xl" style="color: #e2e8f0">${siteConfig.title}</p>
			</div>
			<p tw="text-xl" style="color: #94a3b8">by ${siteConfig.author}</p>
		</div>
	</div>`;
