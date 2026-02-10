import { notFound } from 'next/navigation';
import getArticleContent from '@/utils/getArticleContent';
import getArticleMetadata from '@/utils/getArticleMetadata';
import getAllContentMetadata from '@/utils/getAllContentMetadata';
import ArticleContent from '@/components/ArticleContent';
import { buildArticleJsonLd, buildContentMetadata } from '@/utils/contentPageMeta';

export const generateStaticParams = async () => {
	const articles = getArticleMetadata('articles');
	return articles.map(article => ({ slug: article.slug }));
};

interface Params {
	slug?: string;
}

interface ArticlePageProps {
	params: {
		slug: string;
	};
}

export const generateMetadata = async ({ params }: { params: Params }) => {
	const slug = params?.slug || '';
	const articleContent = getArticleContent('articles/', slug);
	return buildContentMetadata({
		slug,
		sectionPath: 'articles',
		data: articleContent?.data,
		fallbackTitle: 'The Tech Pulse',
	});
};

const ArticlePage = ({ params }: ArticlePageProps) => {
	const slug = params.slug;
	const articleContent = getArticleContent('articles/', slug);
	if (!articleContent) return notFound();
	const metadata = articleContent.data || {};
	const title = metadata.title || 'Untitled Article';
	const tags = metadata.tags ?? [];
	const relatedItems = getAllContentMetadata()
		.filter((item) => item.folder === 'articles' && item.slug !== slug)
		.filter((item) => item.tags?.some((tag) => tags.includes(tag)))
		.slice(0, 3)
		.map((item) => ({ title: item.title, slug: item.slug, folder: item.folder }));
	const jsonLd = buildArticleJsonLd({
		data: metadata,
		content: articleContent.content,
	});

	// Use ArticleContent for client-side logic
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<ArticleContent
				articleTitle={title}
				articleContent={articleContent.content}
				date={metadata.date}
				folder='articles'
				slug={slug}
				tags={tags}
				loading={false}
				relatedItems={relatedItems}
			/>
		</>
	);
};

export default ArticlePage;
