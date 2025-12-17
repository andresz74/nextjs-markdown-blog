'use client'; // Mark this component as client-side

import React from 'react';
import Markdown from '@/components/Markdown';
import ShareButtons from '@/components/ShareButtons';
import styles from './ArticleContent.module.css';

interface ArticleContentProps {
        articleContent: string | null;
        articleTitle?: string;
        folder?: string;
        loading: boolean;
        slug?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ articleContent, articleTitle, folder, loading, slug }) => {
        const shareUrl = folder && slug ? `${process.env.NEXT_PUBLIC_BASE_URL}/${folder}/${slug}` : undefined;

        return (
                <main>
                        {loading ? (
                                <div className={styles.loaderWrapper}>
                                        <div className={styles.spinner} data-testid="spinner"></div>
                                </div>
                        ) : (
                                <article>
                                        {shareUrl && articleTitle && (
                                                <ShareButtons title={articleTitle} url={shareUrl} />
                                        )}
                                        {articleContent ? <Markdown>{articleContent}</Markdown> : <p>Article not found.</p>}
                                </article>
                        )}
                </main>
        );
};

export default ArticleContent;
