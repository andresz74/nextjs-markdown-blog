import ArticleContent from '@/components/ArticleContent';
import { ensureArticlesCacheFresh } from '@/utils/getAllArticles';
import logger from '@/utils/logger';
import { ArticleInterface } from '@/types/ArticleInterface';
import { notFound } from 'next/navigation';
import { buildArticleJsonLd, buildContentMetadata } from '@/utils/contentPageMeta';

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
	const articles: ArticleInterface[] = await ensureArticlesCacheFresh();
	return articles.map(article => ({ slug: article.slug }));
};

export const generateMetadata = async ({ params }: { params: Params }) => {
	const slug = params?.slug || '';
	const articles: ArticleInterface[] = await ensureArticlesCacheFresh();
	const article = articles.find((a: ArticleInterface) => a.slug === params.slug);

	try {
		if (!article) {
			return buildContentMetadata({
				slug,
				sectionPath: 'fb-articles',
				data: undefined,
				fallbackTitle: 'The Tech Pulse',
			});
		}

		return buildContentMetadata({
			slug,
			sectionPath: 'fb-articles',
			data: {
				title: article.title,
				description: article.bio,
				image: article.image,
				date: article.date,
				author: article.author,
				tags: article.tags,
			},
			fallbackTitle: 'The Tech Pulse',
		});
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
	const articles: ArticleInterface[] = await ensureArticlesCacheFresh();
	const article = articles.find((a: ArticleInterface) => a.slug === slug);
	if (!article) return notFound();
	const tags = article.tags ?? [];
	const relatedItems = articles
		.filter((item) => item.slug !== slug)
		.filter((item) => item.tags?.some((tag) => tags.includes(tag)))
		.slice(0, 3)
		.map((item) => ({ title: item.title, slug: item.slug, folder: 'fb-articles' }));
	const jsonLd = buildArticleJsonLd({
		data: {
			title: article.title,
			description: article.bio,
			image: article.image,
			date: article.date,
			author: article.author,
			tags: article.tags,
		},
		content: article.content,
	});
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<ArticleContent
				articleContent={article.content}
				articleTitle={article.title}
				date={article.date}
				folder="fb-articles"
				loading={false}
				slug={slug}
				tags={tags}
				relatedItems={relatedItems}
			/>
		</>
	);
};

export default ArticlePage;
