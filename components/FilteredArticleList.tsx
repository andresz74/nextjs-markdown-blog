'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import SearchForm from '@/components/SearchForm';

interface FilterableItem {
    title: string;
    bio?: string;
    slug: string;
    tags?: string[];
    folder?: string;
}

interface FilteredArticleListProps {
    items: FilterableItem[];
    basePath: string;
    defaultFolder?: string;
    perPage?: number;
    searchPlaceholder?: string;
    emptyMessage?: string;
}

const matchesQuery = (query: string, value?: string) => {
    if (!value) return false;
    return value.toLowerCase().includes(query);
};

const FilteredArticleList: React.FC<FilteredArticleListProps> = ({
    items,
    basePath,
    defaultFolder,
    perPage = 8,
    searchPlaceholder,
    emptyMessage = 'No posts found.',
}) => {
    const searchParams = useSearchParams();
    const query = (searchParams.get('q') ?? '').trim().toLowerCase();
    const page = Number(searchParams.get('page') ?? 1);

    const filteredItems = useMemo(() => {
        if (!query) return items;
        return items.filter((item) => {
            const inTitle = matchesQuery(query, item.title);
            const inBio = matchesQuery(query, item.bio);
            const inTags = (item.tags ?? []).some((tag) => matchesQuery(query, tag));
            return inTitle || inBio || inTags;
        });
    }, [items, query]);

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (currentPage - 1) * perPage;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + perPage);

    return (
        <>
            <SearchForm query={query} placeholder={searchPlaceholder} />
            {filteredItems.length === 0 ? (
                <p>{emptyMessage}</p>
            ) : (
                <div className="postsContainer">
                    {paginatedItems.map((item, index) => {
                        const folder = item.folder ?? defaultFolder ?? '';
                        return <ArticleCard key={`${folder}-${item.slug}-${index}`} article={item} folder={folder} />;
                    })}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={basePath}
                query={{ q: query }}
            />
        </>
    );
};

export default FilteredArticleList;
