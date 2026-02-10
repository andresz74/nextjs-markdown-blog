import getArticleContent from '@/utils/getArticleContent';
import Markdown from '@/components/Markdown';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/utils/contentPageMeta';

export const generateMetadata = async (): Promise<Metadata> => {
	return {
		title: 'About | The Tech Pulse',
		description: 'About Andres Zenteno and The Tech Pulse: what this blog covers and how content is created.',
		alternates: {
			canonical: `${SITE_URL}/about`,
		},
		openGraph: {
			type: 'website',
			title: 'About | The Tech Pulse',
			description: 'About Andres Zenteno and The Tech Pulse.',
			url: `${SITE_URL}/about`,
		},
		twitter: {
			card: 'summary',
			title: 'About | The Tech Pulse',
			description: 'About Andres Zenteno and The Tech Pulse.',
		},
	};
};

const ArticlePage = () => {
	const about = getArticleContent('assets/md/', 'about');
	if (!about) return notFound();
	return (
		<main>
			<article>
				<Markdown>{about.content}</Markdown>
			</article>
		</main>
	);
};

export default ArticlePage;
