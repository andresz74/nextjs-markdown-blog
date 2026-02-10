import getArticleContent from '@/utils/getArticleContent';
import Markdown from '@/components/Markdown';

export const generateMetadata = async () => {
	return {
		title: `My Blog - About`,
	};
};

const ArticlePage = () => {
	const about = getArticleContent('assets/md/', 'about');
	return (
		<main>
			<article>
				<Markdown>{about?.content ?? ''}</Markdown>
			</article>
		</main>
	);
};

export default ArticlePage;
