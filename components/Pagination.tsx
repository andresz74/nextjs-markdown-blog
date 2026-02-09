'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
    query?: {
        q?: string;
    };
}

const buildUrl = (basePath: string, page: number, query?: { q?: string }) => {
    const params = new URLSearchParams();
    if (query?.q) {
        params.set('q', query.q);
    }
    if (page > 1) {
        params.set('page', page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath, query }) => {
    if (totalPages <= 1) return null;
    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;

    return (
        <nav className={styles.pagination} aria-label="Pagination">
            {isPrevDisabled ? (
                <span className={styles.pageLink} aria-disabled="true">
                    Previous
                </span>
            ) : (
                <Link className={styles.pageLink} href={buildUrl(basePath, currentPage - 1, query)}>
                    Previous
                </Link>
            )}
            <span className={styles.pageIndicator}>
                Page {currentPage} of {totalPages}
            </span>
            {isNextDisabled ? (
                <span className={styles.pageLink} aria-disabled="true">
                    Next
                </span>
            ) : (
                <Link className={styles.pageLink} href={buildUrl(basePath, currentPage + 1, query)}>
                    Next
                </Link>
            )}
        </nav>
    );
};

export default Pagination;
