import ArticleCard from '@/components/ArticleCard';
import { ArticlestInterface } from '@/types/ArticleInterface';
import { ensureArticlesCacheFresh } from '@/utils/getAllArticles';
import Markdown from 'react-markdown';
import styles from './page.module.css';

const ArticlePage = async () => {
    console.log('Rendering articles page...');
    const articles: ArticlestInterface[] = await ensureArticlesCacheFresh();
    const sortedArticles = articles.sort((a: ArticlestInterface, b: ArticlestInterface) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  
    return (
        <main className={styles.postsContainer}>
            <h1>Articles</h1>
            <Markdown className={styles.notesIntro}>
                **Articles** form Firebase Firestore.
            </Markdown>
            {sortedArticles.map((article, i) => (
                <ArticleCard key={i} article={article} folder={'fb-articles'} />
            ))}
        </main>
    );
};

export default ArticlePage;
