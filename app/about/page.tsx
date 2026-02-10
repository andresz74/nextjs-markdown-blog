import getArticleContent from '@/utils/getArticleContent';
import Markdown from '@/components/Markdown';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/utils/contentPageMeta';

export const generateMetadata = async (): Promise<Metadata> => {
	const imageUrl = `${SITE_URL}/media/default-image.jpg`;
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
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: 'About | The Tech Pulse',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: 'About | The Tech Pulse',
			description: 'About Andres Zenteno and The Tech Pulse.',
			images: [imageUrl],
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
