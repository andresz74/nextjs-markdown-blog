import type { MetadataRoute } from 'next';
import getAllContentMetadata from '@/utils/getAllContentMetadata';
import normalizeTag from '@/utils/normalizeTag';
import { getCachedArticles } from '@/utils/getAllArticles';

const BASE_URL = 'https://blog.andreszenteno.com';

const staticRoutes = [
	'/',
	'/about',
	'/notes',
	'/docs',
	'/tags',
	'/fb-articles',
	'/rss.xml',
	'/atom.xml',
	'/feed.json',
];

export default function sitemap(): MetadataRoute.Sitemap {
	const contentRoutes = getAllContentMetadata().map(item => ({
		url: `${BASE_URL}/${item.folder}/${item.slug}`,
		lastModified: item.date ? new Date(item.date) : new Date(),
		changeFrequency: 'weekly' as const,
		priority: item.folder === 'articles' ? 0.8 : 0.7,
	}));

	const tagSet = new Set<string>();
	getAllContentMetadata().forEach(item => {
		(item.tags ?? []).forEach(tag => {
			const slug = normalizeTag(tag);
			if (slug) tagSet.add(slug);
		});
	});

	const tagRoutes = Array.from(tagSet).map(tag => ({
		url: `${BASE_URL}/tags/${tag}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.6,
	}));

	const fbArticleRoutes = getCachedArticles().articles.map(article => ({
		url: `${BASE_URL}/fb-articles/${article.slug}`,
		lastModified: article.date ? new Date(article.date) : new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.7,
	}));

	const staticEntries = staticRoutes.map(route => ({
		url: `${BASE_URL}${route}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: route === '/' ? 1 : 0.7,
	}));

	return [...staticEntries, ...contentRoutes, ...tagRoutes, ...fbArticleRoutes];
}
