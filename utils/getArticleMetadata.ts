import fs from 'fs';
import matter from 'gray-matter';
import slugify from 'slugify';
import type { ArticleMetadata } from '@/types/ArticleMetadata';
import sanitizeTags from '@/utils/sanitizeTags';

const metadataCache: Record<string, ArticleMetadata[]> = {};

const sortByDateDesc = (a: ArticleMetadata, b: ArticleMetadata) => {
        const dateA = new Date(a.date ?? 0).getTime();
        const dateB = new Date(b.date ?? 0).getTime();
        return dateB - dateA;
};

const getArticleMetadata = (basePath: string): ArticleMetadata[] => {
        if (metadataCache[basePath]) {
            return [...metadataCache[basePath]];
        }

        const folder = `${basePath}/`;
        const files = fs.readdirSync(folder);
        const markdownArticles = files.filter((file) => file.endsWith('.md'));

        const articles = markdownArticles.map((filename: string) => {
                const articleContent = fs.readFileSync(`${basePath}/${filename}`, 'utf8');
                const matterResult = matter(articleContent);
                const rawSlug = filename.replace('.md', '');
                const slug = slugify(rawSlug, { lower: true });
                return {
                        title: matterResult.data.title,
                        date: matterResult.data.date,
                        bio: matterResult.data.description,
                        slug,
                        image: matterResult.data.image,
                        tags: sanitizeTags(matterResult.data.tags),
                };
        });

        const sortedArticles = articles.sort(sortByDateDesc);
        metadataCache[basePath] = sortedArticles;

        return [...sortedArticles];
};

export const clearArticleMetadataCache = () => {
        Object.keys(metadataCache).forEach((cacheKey) => delete metadataCache[cacheKey]);
};

export default getArticleMetadata;
