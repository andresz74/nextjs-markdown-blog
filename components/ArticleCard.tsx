import React from 'react'; // Import React to avoid the test error
import Image from 'next/image';
import Link from 'next/link';
import getDateFormat from '@/utils/getDateFormat';
import styles from './ArticleCard.module.css';

const ArticleCard = (props: any) => {
	const { article } = props;
	return article ? (
		<Link className='unstyled' href={`/articles/${article.slug}`}>
			<div className={styles.articleCard}>
				<div className={styles.cardContent}>
					<h3>{article.title}</h3>
					<p className={styles.articleDate}>{getDateFormat(article.date)}</p>
					<p>{article.bio}</p>
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
