import { notFound } from 'next/navigation';
import getArticleContent from '@/utils/getArticleContent';
import getArticleMetadata from '@/utils/getArticleMetadata';
import ArticleContent from '@/components/ArticleContent';
import { buildArticleJsonLd, buildContentMetadata } from '@/utils/contentPageMeta';

export const generateStaticParams = async () => {
	const articles = getArticleMetadata('articles');
	return articles.map(article => ({ slug: article.slug }));
};

interface Params {
	slug?: string;
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

const ArticlePage = (props: any) => {
	const slug = props.params.slug;
	const articleContent = getArticleContent('articles/', slug);
	if (!articleContent) return notFound();
	const metadata = articleContent.data || {};
	const title = metadata.title || 'Untitled Article';
	const jsonLd = buildArticleJsonLd({
		data: metadata,
		content: articleContent.content,
	});

	// Use ArticleContent for client-side logic
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<ArticleContent articleTitle={title} articleContent={articleContent.content} folder='articles' slug={slug} loading={false} />
		</>
	);
};

export default ArticlePage;
