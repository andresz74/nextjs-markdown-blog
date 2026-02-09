'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Markdown from '@/components/Markdown';
import getDateFormat from '@/utils/getDateFormat';
import normalizeTag from '@/utils/normalizeTag';
import type { ArticleMetadata } from '@/types/ArticleMetadata';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
	article: ArticleMetadata;
	folder: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, folder }) => {
	const visibleTags = article?.tags?.slice(0, 3) ?? [];
	const remainingTagCount = (article?.tags?.length ?? 0) - visibleTags.length;

	return article ? (
		<div className={styles.articleCard}>
			<div className={styles.cardContent}>
				<Link className={styles.articleTitleLink} href={`/${folder}/${article.slug}`}>
					<h3>{article.title}</h3>
				</Link>
				<div className={styles.bioWrapper}>
					<Markdown type={'card'}>{article.bio ?? ''}</Markdown>
				</div>
				{visibleTags.length ? (
					<ul className={styles.tagList}>
						{visibleTags.map((tag: string) => {
							const tagSlug = normalizeTag(tag);
							return (
								<li key={tagSlug} className={styles.tag}>
									<Link className={styles.tagLink} href={`/tags/${tagSlug}`}>
										{tag}
									</Link>
								</li>
							);
						})}
						{remainingTagCount > 0 ? (
							<li className={`${styles.tag} ${styles.tagOverflow}`}>+{remainingTagCount}</li>
						) : null}
					</ul>
				) : null}
				<div className={styles.cardFooter}>
					<div className={styles.articleDate}>{getDateFormat(article.date)}</div>
					<Link className={styles.readMore} href={`/${folder}/${article.slug}`}>
						Read post
					</Link>
				</div>
			</div>
			<Link className={styles.cardImageLink} href={`/${folder}/${article.slug}`}>
				<Image
					src={article.image || `/media/default-image.jpg`}
					alt={article.title}
					width={160}
					height={107}
					className={styles.cardImage}
				/>
			</Link>
		</div>
	) : null;
};

export default ArticleCard;
