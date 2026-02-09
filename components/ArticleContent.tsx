import React from 'react';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import ShareButtons from '@/components/ShareButtons';
import styles from './ArticleContent.module.css';

interface RelatedItem {
	title: string;
	slug: string;
	folder: string;
}

interface ArticleContentProps {
    articleContent: string | null;
    articleTitle: string;
    folder: string;
    slug: string;
    loading: boolean;
    relatedItems?: RelatedItem[];
}

const estimateReadTimeMinutes = (content: string) => {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
};

const ArticleContent: React.FC<ArticleContentProps> = ({
	articleContent,
	articleTitle,
	folder,
	loading,
	slug,
	relatedItems = [],
}) => {
	const readTime = articleContent ? estimateReadTimeMinutes(articleContent) : 0;

    return (
        <main>
            {loading ? (
                <div className={styles.loaderWrapper}>
                    <div className={styles.spinner} data-testid="spinner"></div>
                </div>
            ) : (
                <article>
                    <ShareButtons title={articleTitle} url={`https://blog.andreszenteno.com/${folder}/${slug}`} />
                    {articleContent ? (
                        <>
                            <p className={styles.readingTime}>{readTime} min read</p>
                            <Markdown>{articleContent}</Markdown>
                            {relatedItems.length > 0 ? (
                                <section className={styles.relatedSection}>
                                    <h2>Related Posts</h2>
                                    <ul className={styles.relatedList}>
                                        {relatedItems.map((item) => (
                                            <li key={`${item.folder}-${item.slug}`}>
                                                <Link href={`/${item.folder}/${item.slug}`}>{item.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : null}
                        </>
                    ) : (
                        <p>Article not found.</p>
                    )}
                </article>
            )}
        </main>
    );
};

export default ArticleContent;
