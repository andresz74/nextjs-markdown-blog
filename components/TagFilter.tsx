'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import styles from './TagFilter.module.css';

interface TagItem {
    label: string;
    slug: string;
    count: number;
}

interface TagFilterProps {
    tags: TagItem[];
}

const TagFilter: React.FC<TagFilterProps> = ({ tags }) => {
    const [query, setQuery] = useState('');
    const normalizedQuery = query.trim().toLowerCase();

    const filteredTags = useMemo(() => {
        if (!normalizedQuery) return tags;
        return tags.filter((tag) => tag.label.toLowerCase().includes(normalizedQuery));
    }, [normalizedQuery, tags]);

    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor="tag-search">
                Search tags
            </label>
            <input
                id="tag-search"
                className={styles.searchInput}
                type="search"
                placeholder="Filter tags..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <ul className={styles.tagList}>
                {filteredTags.map((tag) => (
                    <li key={tag.slug}>
                        <Link className={styles.tagLink} href={`/tags/${tag.slug}`}>
                            {tag.label} <span className={styles.count}>({tag.count})</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagFilter;
