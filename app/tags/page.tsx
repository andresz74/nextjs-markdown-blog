import React from 'react';
import getAllContentMetadata from '@/utils/getAllContentMetadata';
import normalizeTag from '@/utils/normalizeTag';
import TagFilter from '@/components/TagFilter';
import styles from './page.module.css';

const TagsPage = () => {
    const allContent = getAllContentMetadata();
    const tagMap = new Map<string, { label: string; slug: string; count: number }>();

    allContent.forEach((item) => {
        (item.tags ?? []).forEach((tag) => {
            const slug = normalizeTag(tag);
            if (!slug) return;
            const existing = tagMap.get(slug);
            if (existing) {
                existing.count += 1;
            } else {
                tagMap.set(slug, { label: tag, slug, count: 1 });
            }
        });
    });

    const tags = Array.from(tagMap.values()).sort((a, b) => a.label.localeCompare(b.label));

    return (
        <main className={styles.container}>
            <h1>Tags</h1>
            <p className={styles.subtitle}>
                Browse articles, notes, and docs by topic.
            </p>
            <TagFilter tags={tags} />
        </main>
    );
};

export default TagsPage;
