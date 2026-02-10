import { Suspense } from 'react';
import getArticleMetadata from '@/utils/getArticleMetadata';
import Markdown from 'react-markdown';
import type { Metadata } from 'next';
import styles from './page.module.css';
import FilteredArticleList from '@/components/FilteredArticleList';
import { SITE_URL } from '@/utils/contentPageMeta';

export const generateMetadata = (): Metadata => {
	const imageUrl = `${SITE_URL}/media/default-image.jpg`;
	return {
		title: 'Documents | The Tech Pulse',
		description: 'Project documents, references, and technical notes from real implementations.',
		alternates: {
			canonical: `${SITE_URL}/docs`,
		},
		openGraph: {
			type: 'website',
			title: 'Documents | The Tech Pulse',
			description: 'Project documents, references, and technical notes from real implementations.',
			url: `${SITE_URL}/docs`,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: 'Documents | The Tech Pulse',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Documents | The Tech Pulse',
			description: 'Project documents, references, and technical notes from real implementations.',
			images: [imageUrl],
		},
	};
};

export default function DocsPage() {
        const docsMetadata = getArticleMetadata('docs');

        return (
                <main className={styles.postsContainer}>
                        <h1>Documents</h1>
                        <Markdown className={styles.docsIntro}>
                                **Documents** is a section where I save some documents with data from projects I was involved.
                        </Markdown>
                        <Suspense fallback={<div>Loading documents…</div>}>
                                <FilteredArticleList
                                        items={docsMetadata}
                                        basePath="/docs"
                                        defaultFolder="docs"
                                        searchPlaceholder="Search documents..."
                                />
                        </Suspense>
                </main>
        );
}
