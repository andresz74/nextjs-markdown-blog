import fs from 'fs';
import path from 'path';
import getArticleContent from '@/utils/getArticleContent';
import getArticleMetadata from '@/utils/getArticleMetadata';

const CACHE_PATH = path.join(process.cwd(), 'cache', 'articles.json');

export interface CachedArticle {
  slug: string;
  author: string;
  canonical: string;
  content: string;
  date: string;
  bio: string;
  image: string;
  tags: string[];
  title: string;
}

const buildArticlePayload = (docData: Record<string, unknown>, slug: string): CachedArticle => ({
  slug,
  author: String(docData.author ?? ''),
  canonical: String(docData.canonical ?? ''),
  content: String(docData.content ?? ''),
  date: String(docData.date ?? ''),
  bio: String(docData.description ?? ''),
  image: String(docData.image ?? ''),
  tags: Array.isArray(docData.tags) ? docData.tags.filter((tag): tag is string => typeof tag === 'string') : [],
  title: String(docData.title ?? ''),
});

const CACHE_TTL_MS = 1000 * 60 * 10;

interface CachePayload {
  generatedAt: number;
  articles: CachedArticle[];
}

const isCachePayload = (value: unknown): value is CachePayload => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<CachePayload>;
  return typeof candidate.generatedAt === 'number' && Array.isArray(candidate.articles);
};

const isLegacyArticlesArray = (value: unknown): value is CachedArticle[] => {
  return Array.isArray(value);
};

const hasFirebaseConfig = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
};

const getLocalMarkdownFallbackArticles = (): CachedArticle[] => {
  return getArticleMetadata('articles').map(item => {
    const article = getArticleContent('articles/', item.slug);
    return {
      slug: item.slug,
      author: '',
      canonical: '',
      content: article?.content ?? '',
      date: item.date ?? '',
      bio: item.bio ?? '',
      image: item.image ?? '',
      tags: item.tags ?? [],
      title: item.title ?? '',
    };
  });
};

export async function fetchAndCacheArticles() {
    if (!hasFirebaseConfig()) {
      const cachedArticles = getCachedArticles().articles;
      return cachedArticles.length > 0 ? cachedArticles : getLocalMarkdownFallbackArticles();
    }
    const { getDocs, collection } = await import('firebase/firestore');
    const { db } = await import('@/firebase.configuration');
    const snapshot = await getDocs(collection(db, 'articles'));
    const articles = snapshot.docs.map(doc => {
      const docData = doc.data();
      return buildArticlePayload(docData, doc.id);
    });

  // Cache to disk (or memory if you prefer)
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  const payload: CachePayload = { generatedAt: Date.now(), articles };
  fs.writeFileSync(CACHE_PATH, JSON.stringify(payload, null, 2));

  return articles;
}

export function getCachedArticles(maxAgeMs: number = CACHE_TTL_MS) {
  if (!fs.existsSync(CACHE_PATH)) return { articles: [], isStale: true };
  const raw = fs.readFileSync(CACHE_PATH, 'utf-8');
  const cached = JSON.parse(raw) as unknown;

  if (isCachePayload(cached)) {
    const isStale = Date.now() - cached.generatedAt > maxAgeMs;
    return { articles: cached.articles, isStale };
  }

  // Backward compatibility: old cache files were stored as plain article arrays.
  if (isLegacyArticlesArray(cached)) {
    return { articles: cached, isStale: true };
  }

  if (!cached) {
    return { articles: [], isStale: true };
  }

  return { articles: [], isStale: true };
}

export async function ensureArticlesCacheFresh(maxAgeMs: number = CACHE_TTL_MS) {
  const cached = getCachedArticles(maxAgeMs);
  if (cached.articles.length > 0 && !cached.isStale) {
    return cached.articles;
  }

  const refreshed = await fetchAndCacheArticles();
  if (refreshed.length > 0) {
    return refreshed;
  }

  return cached.articles;
}
