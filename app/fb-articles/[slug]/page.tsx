import ArticleContent from '@/components/ArticleContent';
import { ensureArticlesCacheFresh } from '@/utils/getAllArticles';
import logger from '@/utils/logger';
import { ArticlestInterface } from '@/types/ArticleInterface';
import { notFound } from 'next/navigation';

interface Params {
	slug?: string;
}

interface FbArticlePageProps {
	params: {
		slug: string;
	};
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export const generateStaticParams = async () => {
	const articles: ArticlestInterface[] = await ensureArticlesCacheFresh();
	return articles.map(article => ({ slug: article.slug }));
};

export const generateMetadata = async ({ params }: { params: Params }) => {
	const slug = params?.slug || '';
	const baseUrl = 'https://blog.andreszenteno.com';
	const articles: ArticlestInterface[] = await ensureArticlesCacheFresh();
	const article = articles.find((a: ArticlestInterface) => a.slug === params.slug);

	try {
		// Fetch the article content and metadata
		const metadata: { title: string; description: string; image: string } = article
			? { title: article.title, description: article.bio, image: article.image }
			: { title: '', description: '', image: '' };
		const title = metadata.title || 'Untitled Article';
		const description = metadata.description || 'Explore tech articles on web development, programming, and more.';
		const image = metadata.image || '/media/default-image.jpg';
		const isAbsoluteUrl = image.startsWith('http://') || image.startsWith('https://');
		const imageUrl = isAbsoluteUrl ? image : `${baseUrl}${image}`;

		return {
			title: `${title.replaceAll('_', '')}`,
			description,
			openGraph: {
				type: 'article',
				title,
				description,
				url: `${baseUrl}/fb-articles/${slug}`,
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
				canonical: `${baseUrl}/fb-articles/${slug}`,
			},
		};
	} catch (error) {
		logger.error('fb-articles/[slug]/metadata', `Error fetching metadata for slug: ${slug}`, error);
		return {
			title: 'The Tech Pulse',
			description: 'Explore tech articles on web development, programming, and more.',
		};
	}
};

const ArticlePage = async ({ params }: FbArticlePageProps) => {
	const slug = params.slug;
	const articles: ArticlestInterface[] = await ensureArticlesCacheFresh();
	const article = articles.find((a: ArticlestInterface) => a.slug === slug);
	if (!article) return notFound();
	return (
		<>
			<ArticleContent
				articleContent={article.content}
				articleTitle={article.title}
				folder="fb-articles"
				loading={false}
				slug={slug}
			/>
		</>
	);
};

export default ArticlePage;
