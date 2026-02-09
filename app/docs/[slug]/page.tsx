import { notFound } from 'next/navigation';
import getArticleContent from '@/utils/getArticleContent';
import getArticleMetadata from '@/utils/getArticleMetadata';
import ArticleContent from '@/components/ArticleContent';
import { buildArticleJsonLd, buildContentMetadata } from '@/utils/contentPageMeta';

export const generateStaticParams = async () => {
	const docs = getArticleMetadata('docs');
	return docs.map(doc => ({ slug: doc.slug }));
};

interface Params {
	slug?: string;
}

export const generateMetadata = async ({ params }: { params: Params }) => {
	const slug = params?.slug || '';
	const articleContent = getArticleContent('docs/', slug);
	return buildContentMetadata({
		slug,
		sectionPath: 'docs',
		data: articleContent?.data,
		fallbackTitle: 'The Tech Pulse | Tech Insights',
	});
};

const ArticlePage = (props: any) => {
	const slug = props.params.slug;
	const docContent = getArticleContent('docs/', slug);
	if (!docContent) return notFound();
	const metadata = docContent.data || {};
	const title = metadata.title || 'Untitled Article';
	const jsonLd = buildArticleJsonLd({
		data: metadata,
		content: docContent.content,
	});

	// Use ArticleContent for client-side logic
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<ArticleContent articleContent={docContent.content} articleTitle={title} folder='docs' loading={false} slug={slug} />
		</>
	);
};

export default ArticlePage;
