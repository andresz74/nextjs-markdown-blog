import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';
import { ArticleInterface } from '@/types/ArticleInterface';
import { ensureArticlesCacheFresh } from '@/utils/getAllArticles';
import { SITE_URL } from '@/utils/contentPageMeta';
import logger from '@/utils/logger';
import Markdown from 'react-markdown';
import styles from './page.module.css';

export const generateMetadata = (): Metadata => {
	const imageUrl = `${SITE_URL}/media/default-image.jpg`;
	return {
		title: 'Firebase Articles | The Tech Pulse',
		description: 'Articles sourced from Firebase Firestore.',
		alternates: {
			canonical: `${SITE_URL}/fb-articles`,
		},
		openGraph: {
			type: 'website',
			title: 'Firebase Articles | The Tech Pulse',
			description: 'Articles sourced from Firebase Firestore.',
			url: `${SITE_URL}/fb-articles`,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: 'Firebase Articles | The Tech Pulse',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Firebase Articles | The Tech Pulse',
			description: 'Articles sourced from Firebase Firestore.',
			images: [imageUrl],
		},
	};
};

const ArticlePage = async () => {
    logger.info('fb-articles/page', 'Rendering articles page');
    const articles: ArticleInterface[] = await ensureArticlesCacheFresh();
    const sortedArticles = articles.sort((a: ArticleInterface, b: ArticleInterface) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  
    return (
        <main className={styles.postsContainer}>
            <h1>Articles</h1>
            <Markdown className={styles.notesIntro}>
                **Articles** form Firebase Firestore.
            </Markdown>
            {sortedArticles.map((article, i) => (
                <ArticleCard key={i} article={article} folder={'fb-articles'} />
            ))}
        </main>
    );
};

export default ArticlePage;
