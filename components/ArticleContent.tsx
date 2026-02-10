import React from 'react';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import ShareButtons from '@/components/ShareButtons';
import getDateFormat from '@/utils/getDateFormat';
import styles from './ArticleContent.module.css';

interface RelatedItem {
	title: string;
	slug: string;
	folder: string;
}

interface ArticleContentProps {
    articleContent: string | null;
    articleTitle?: string;
    folder?: string;
    slug?: string;
    date?: string;
    tags?: string[];
    loading: boolean;
    relatedItems?: RelatedItem[];
}

const estimateReadTimeMinutes = (content: string) => {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
};

const ArticleContent: React.FC<ArticleContentProps> = ({
	articleContent,
	articleTitle = 'The Tech Pulse',
	date,
	folder = 'articles',
	loading,
	slug = '',
	tags = [],
	relatedItems = [],
}) => {
	const readTime = articleContent ? estimateReadTimeMinutes(articleContent) : 0;
	const formattedDate = date ? getDateFormat(date) : 'N/A';
	const shareUrl = `https://blog.andreszenteno.com/${folder}/${slug}`;

    return (
        <main>
            {loading ? (
                <div className={styles.loaderWrapper}>
                    <div className={styles.spinner} data-testid="spinner"></div>
                </div>
            ) : (
                <article>
                    {articleContent ? (
                        <>
                            <section className={styles.metaBar} aria-label="Article metadata">
                                <div className={styles.metaRow}>
                                    <span className={styles.metaLabel}>Date</span>
                                    <span>{formattedDate}</span>
                                    <span className={styles.separator}>•</span>
                                    <span className={styles.metaLabel}>Read time</span>
                                    <span>{readTime} min</span>
                                    <span className={styles.separator}>•</span>
                                    <details className={styles.metaDetails}>
                                        <summary>Tags <span className={styles.caret}>▼</span></summary>
                                        <div className={styles.metaPanel}>
                                            {tags.length ? (
                                                <ul className={styles.tagsList}>
                                                    {tags.map((tag) => (
                                                        <li key={tag}>{tag}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className={styles.emptyHint}>No tags</span>
                                            )}
                                        </div>
                                    </details>
                                    <span className={styles.separator}>•</span>
                                    <details className={styles.metaDetails}>
                                        <summary>Share <span className={styles.caret}>▼</span></summary>
                                        <div className={styles.metaPanel}>
                                            <ShareButtons title={articleTitle} url={shareUrl} variant="menu" />
                                        </div>
                                    </details>
                                </div>
                            </section>
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
