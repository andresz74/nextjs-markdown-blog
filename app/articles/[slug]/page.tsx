import Head from 'next/head';
import { notFound } from 'next/navigation';
import getArticleContent from '@/utils/getArticleContent';
import getArticleMetadata from '@/utils/getArticleMetadata';
import ArticleContent from '@/components/ArticleContent';

export const generateStaticParams = async () => {
	const articles = getArticleMetadata('articles');
	return articles.map(article => ({ slug: article.slug }));
};

interface Params {
	slug?: string;
}

interface SearchParams {
	[key: string]: string | string[];
}

interface DataMetadata {
	title?: string;
	date?: string;
	description?: string;
	image?: string;
	tags?: string[];
	canonical_url?: string;
	author?: string;
}

export const generateMetadata = async ({ params }: { params: Params }) => {
	const slug = params?.slug || '';
	const baseUrl = 'https://blog.andreszenteno.com';

	try {
		// Fetch the article content and metadata
		const articleContent: { data: DataMetadata; content: string } | null = getArticleContent('articles/', slug);
		if (!articleContent) {
			return {
				title: 'The Tech Pulse',
				description: 'Explore tech articles on web development, programming, and more.',
			};
		}

		// Extract metadata
		const metadata = articleContent?.data || {};
		const title = metadata.title || 'Untitled Article';
		const description = metadata.description || 'Explore tech articles on web development, programming, and more.';
		const image = metadata.image || '/media/default-image.jpg';
		const isAbsoluteUrl = image.startsWith('http://') || image.startsWith('https://');
		const imageUrl = isAbsoluteUrl ? image : `${baseUrl}${image}`;
		const keywords = metadata.tags?.join(', ');

		return {
			title: `${title.replaceAll('_', '')}`,
			description,
			keywords,
			openGraph: {
				type: 'article',
				title,
				description,
				url: `${baseUrl}/articles/${slug}`,
				site_name: 'The Tech Pulse',
				locale: 'en_US',
				images: [
					{
						url: imageUrl,
						width: 1200,
						height: 630,
						alt: title + ' - featured image',
					},
				],
				article: {
					tags: metadata.tags || [],
					authors: [metadata.author || 'Andres Zenteno'],
					publishedTime: metadata.date || new Date().toISOString(),
				}
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
				canonical: `${baseUrl}/articles/${slug}`,
			},
		};
	} catch (error) {
		console.error(`Error fetching metadata for slug: ${slug}`, error);
		return {
			title: 'The Tech Pulse',
			description: 'Explore tech articles on web development, programming, and more.',
		};
	}
};

const ArticlePage = (props: any) => {
	const slug = props.params.slug;
	const articleContent = getArticleContent('articles/', slug);
	if (!articleContent) return notFound();
	const metadata = articleContent?.data || {};

	const title = metadata.title || 'Untitled Article';
	const description = metadata.description || 'Explore tech articles...';
	const image = metadata.image || '/media/default-image.jpg';
	const isAbsoluteUrl = image.startsWith('http://') || image.startsWith('https://');
	const imageUrl = isAbsoluteUrl ? image : `https://blog.andreszenteno.com${image}`;
	const wordCount = articleContent.content.split(' ').length;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: title,
		description,
		image: [imageUrl],
		author: {
			"@type": "Person",
			name: metadata.author || 'Andres Zenteno',
		},
		publisher: {
			"@type": "Organization",
			name: "The Tech Pulse",
			logo: {
				"@type": "ImageObject",
				url: `https://blog.andreszenteno.com/logo.png`,
			},
		},
		datePublished: metadata.date || new Date().toISOString(),
		keywords: metadata.tags || [],
		wordCount,
	};

	// Use ArticleContent for client-side logic
	return (
		<>
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</Head>
			<ArticleContent articleTitle={title} articleContent={articleContent.content} folder='articles' slug={slug} loading={false} />
		</>
	);
};

export default ArticlePage;
