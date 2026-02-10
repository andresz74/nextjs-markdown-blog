import { Suspense } from 'react';
import getArticleMetadata from '@/utils/getArticleMetadata';
import Markdown from 'react-markdown';
import type { Metadata } from 'next';
import styles from './page.module.css';
import FilteredArticleList from '@/components/FilteredArticleList';
import { SITE_URL } from '@/utils/contentPageMeta';

export const generateMetadata = (): Metadata => {
	return {
		title: 'Notes | The Tech Pulse',
		description: 'Quick summaries and notes from videos, experiments, and practical tech learnings.',
		alternates: {
			canonical: `${SITE_URL}/notes`,
		},
		openGraph: {
			type: 'website',
			title: 'Notes | The Tech Pulse',
			description: 'Quick summaries and notes from videos, experiments, and practical tech learnings.',
			url: `${SITE_URL}/notes`,
		},
		twitter: {
			card: 'summary',
			title: 'Notes | The Tech Pulse',
			description: 'Quick summaries and notes from videos, experiments, and practical tech learnings.',
		},
	};
};

export default function NotesPage() {
        const notesMetadata = getArticleMetadata('notes');

        return (
                <main className={styles.postsContainer}>
                        <h1>Notes</h1>
                        <Markdown className={styles.notesIntro}>
                                **Notes** is a section where I share **quick summaries of YouTube videos** that I’ve recently watched and enjoyed. These videos cover a variety of topics—from **tech and DIY builds** to **creative ideas** and **curious discoveries**. If a video was **inspiring, insightful, or just plain cool**, you’ll likely find a note about it here.
                        </Markdown>
                        <Suspense fallback={<div>Loading notes…</div>}>
                                <FilteredArticleList
                                        items={notesMetadata}
                                        basePath="/notes"
                                        defaultFolder="notes"
                                        searchPlaceholder="Search notes..."
                                />
                        </Suspense>
                </main>
        );
}
