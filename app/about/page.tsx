import getArticleContent from '@/utils/getArticleContent';
import Markdown from '@/components/Markdown';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
	return {
		title: `My Blog - About`,
	};
};

const ArticlePage = () => {
	const about = getArticleContent('assets/md/', 'about');
	return (
		<main>
			<article>
				<Markdown>{about.content}</Markdown>
			</article>
		</main>
	);
};

export default ArticlePage;
