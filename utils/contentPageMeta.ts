import type { Metadata } from 'next';

export const SITE_URL = 'https://blog.andreszenteno.com';
const DEFAULT_DESCRIPTION = 'Explore tech articles on web development, programming, and more.';
const DEFAULT_IMAGE = '/media/default-image.jpg';
const DEFAULT_AUTHOR = 'Andres Zenteno';
const USE_DYNAMIC_OG = process.env.NEXT_PUBLIC_DYNAMIC_OG_ENABLED === 'true';

export interface ContentFrontmatter {
	title?: string;
	date?: string;
	description?: string;
	image?: string;
	tags?: string[];
	author?: string;
}

const toAbsoluteImageUrl = (image?: string) => {
	const resolvedImage = image || DEFAULT_IMAGE;
	const isAbsoluteUrl = resolvedImage.startsWith('http://') || resolvedImage.startsWith('https://');
	return isAbsoluteUrl ? resolvedImage : `${SITE_URL}${resolvedImage}`;
};

const getPreferredImageUrl = (title: string, image?: string) => {
	if (image) {
		return toAbsoluteImageUrl(image);
	}

	if (USE_DYNAMIC_OG) {
		return `${SITE_URL}/og?title=${encodeURIComponent(title)}`;
	}

	return toAbsoluteImageUrl(DEFAULT_IMAGE);
};

export const buildContentMetadata = ({
	slug,
	sectionPath,
	data,
	fallbackTitle = 'The Tech Pulse | Tech Insights',
}: {
	slug: string;
	sectionPath: 'articles' | 'notes' | 'docs';
	data?: ContentFrontmatter | null;
	fallbackTitle?: string;
}): Metadata => {
	if (!data) {
		return {
			title: fallbackTitle,
			description: DEFAULT_DESCRIPTION,
		};
	}

	const title = data.title || 'Untitled Article';
	const description = data.description || DEFAULT_DESCRIPTION;
	const imageUrl = getPreferredImageUrl(title, data.image);
	const keywords = data.tags?.join(', ');
	const canonical = `${SITE_URL}/${sectionPath}/${slug}`;

	return {
		title: title.replaceAll('_', ''),
		description,
		keywords,
		openGraph: {
			type: 'article',
			title,
			description,
			url: canonical,
			site_name: 'The Tech Pulse',
			locale: 'en_US',
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: `${title} - featured image`,
				},
			],
			article: {
				tags: data.tags || [],
				authors: [data.author || DEFAULT_AUTHOR],
				publishedTime: data.date || new Date().toISOString(),
			},
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [imageUrl],
			site: '@andresz',
			creator: '@andresz',
		},
		alternates: {
			canonical,
		},
	};
};

export const buildArticleJsonLd = ({
	data,
	content,
}: {
	data?: ContentFrontmatter | null;
	content: string;
}) => {
	const title = data?.title || 'Untitled Article';
	const description = data?.description || 'Explore tech articles...';
	const imageUrl = getPreferredImageUrl(title, data?.image);
	const wordCount = content.split(' ').length;

	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		image: [imageUrl],
		author: {
			'@type': 'Person',
			name: data?.author || DEFAULT_AUTHOR,
		},
		publisher: {
			'@type': 'Organization',
			name: 'The Tech Pulse',
			logo: {
				'@type': 'ImageObject',
				url: `${SITE_URL}/logo.png`,
			},
		},
		datePublished: data?.date || new Date().toISOString(),
		keywords: data?.tags || [],
		wordCount,
	};
};
