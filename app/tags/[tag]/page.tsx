import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import FilteredArticleList from '@/components/FilteredArticleList';
import getAllContentMetadata from '@/utils/getAllContentMetadata';
import normalizeTag from '@/utils/normalizeTag';
import styles from '../page.module.css';

export const generateStaticParams = async () => {
    const allContent = getAllContentMetadata();
    const tagSlugs = new Set<string>();

    allContent.forEach((item) => {
        (item.tags ?? []).forEach((tag) => {
            const slug = normalizeTag(tag);
            if (slug) {
                tagSlugs.add(slug);
            }
        });
    });

    return Array.from(tagSlugs).map((tag) => ({ tag }));
};

interface TagPageProps {
    params: {
        tag: string;
    };
}

const TagPage = ({ params }: TagPageProps) => {
    const tagSlug = normalizeTag(params.tag);
    const allContent = getAllContentMetadata();
    const matchedContent = allContent.filter((item) =>
        (item.tags ?? []).some((tag) => normalizeTag(tag) === tagSlug)
    );

    if (matchedContent.length === 0) {
        return notFound();
    }

    const displayTag = matchedContent
        .flatMap((item) => item.tags ?? [])
        .find((tag) => normalizeTag(tag) === tagSlug) ?? params.tag;

    return (
        <main className={styles.container}>
            <h1>Tag: {displayTag}</h1>
            <p className={styles.subtitle}>
                {matchedContent.length} post{matchedContent.length === 1 ? '' : 's'} tagged with {displayTag}.
            </p>
            <Suspense fallback={<div>Loading posts…</div>}>
                <FilteredArticleList
                    items={matchedContent}
                    basePath={`/tags/${tagSlug}`}
                    searchPlaceholder="Search within this tag..."
                />
            </Suspense>
        </main>
    );
};

export default TagPage;
