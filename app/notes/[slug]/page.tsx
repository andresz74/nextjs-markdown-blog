import { notFound } from 'next/navigation';
import getArticleContent from '@/utils/getArticleContent';
import getArticleMetadata from '@/utils/getArticleMetadata';
import ArticleContent from '@/components/ArticleContent';
import { buildArticleJsonLd, buildContentMetadata } from '@/utils/contentPageMeta';

export const generateStaticParams = async () => {
	const notes = getArticleMetadata('notes');
	return notes.map(note => ({ slug: note.slug }));
};

interface Params {
	slug?: string;
}

export const generateMetadata = async ({ params }: { params: Params }) => {
	const slug = params?.slug || '';
	const articleContent = getArticleContent('notes/', slug);
	return buildContentMetadata({
		slug,
		sectionPath: 'notes',
		data: articleContent?.data,
		fallbackTitle: 'The Tech Pulse | Tech Insights',
	});
};

const ArticlePage = (props: any) => {
	const slug = props.params.slug;
	const noteContent = getArticleContent('notes/', slug);
	if (!noteContent) return notFound();
	const metadata = noteContent.data || {};
	const title = metadata.title || 'Untitled Article';
	const jsonLd = buildArticleJsonLd({
		data: metadata,
		content: noteContent.content,
	});

	// Use ArticleContent for client-side logic
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<ArticleContent articleContent={noteContent.content} articleTitle={title} folder='notes' loading={false} slug={slug} />
		</>
	);
};

export default ArticlePage;
