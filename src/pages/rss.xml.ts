import rss from "@astrojs/rss";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { displayTitle, displayDescription, displaySiteTitle, displaySiteDescription } from "@/utils/traditionalize";

export const GET = async () => {
	const posts = await getAllPosts();

	return rss({
		title: displaySiteTitle(siteConfig.title),
		description: displaySiteDescription(siteConfig.description),
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: displayTitle(post.data.title),
			description: displayDescription(post.data.description),
			pubDate: post.data.publishDate,
			link: `posts/${post.id}/`,
		})),
	});
};
