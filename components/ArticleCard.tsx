'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Markdown from '@/components/Markdown';
import getDateFormat from '@/utils/getDateFormat';
import type { ArticleMetadata } from '@/types/ArticleMetadata';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
	article: ArticleMetadata;
	folder: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, folder }) => {

	return article ? (
		<Link className={styles.articleLink} href={`/${folder}/${article.slug}`}>
			<div className={styles.articleCard}>
				<div className={styles.cardContent}>
					<h3>{article.title}</h3>
						<div className={styles.bioWrapper}>
							<Markdown type={'card'}>{article.bio ?? ''}</Markdown>
						</div>
					{article.tags?.length ? (
						<ul className={styles.tagList}>
							{article.tags.map((tag: string) => (
								<li key={tag} className={styles.tag}>
									{tag}
								</li>
							))}
						</ul>
					) : null}
					<div className={styles.cardFooter}>
						<div className={styles.articleDate}>{getDateFormat(article.date)}</div>
					</div>
				</div>
				<Image
					src={article.image || `/media/default-image.jpg`}
					alt={article.title}
					width={160}
					height={107}
					className={styles.cardImage}
				/>
			</div>
		</Link>
	) : null;
};

export default ArticleCard;
