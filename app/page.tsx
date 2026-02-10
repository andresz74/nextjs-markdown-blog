import getArticleMetadata from '@/utils/getArticleMetadata';
import ArticleCard from '@/components/ArticleCard';

export default function Home() {
	const articleMetadata = getArticleMetadata('articles');
	// Sort articles by date from newest to oldest
	const sortedArticles = articleMetadata.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<main className='postsContainer'>
			{sortedArticles.map((article, i) => {
				return <ArticleCard key={i} article={article} folder='articles'></ArticleCard>;
			})}
		</main>
	);
}
