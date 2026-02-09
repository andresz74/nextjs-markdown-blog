import fs from 'fs';
import mock from 'mock-fs';
import path from 'path';
import { getDocs, collection } from 'firebase/firestore';
import { fetchAndCacheArticles, getCachedArticles } from '@/utils/getAllArticles';

jest.mock('firebase/firestore', () => ({
  getDocs: jest.fn(),
  collection: jest.fn(),
  getFirestore: jest.fn(),
}));

jest.mock('@/firebase.configuration', () => ({
  db: {}, // or mock db object if needed
}));

const CACHE_PATH = path.join(process.cwd(), 'cache', 'articles.json');

describe('getAllArticles utils', () => {
  beforeEach(() => {
    mock({}); // Clean file system for each test
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-key';
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test-auth-domain';
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project-id';
  });

  afterEach(() => {
    mock.restore();
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    delete process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
    delete process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  });

  it('fetchAndCacheArticles writes data to cache', async () => {
    const mockData = [
      {
        id: 'test-1',
        data: () => ({
          author: 'Jane Doe',
          canonical: 'https://example.com',
          content: 'Hello world',
          date: '2024-01-01',
          description: 'This is a test',
          image: '/img.png',
          tags: ['test'],
          title: 'Test Title',
        }),
      },
    ];

    (getDocs as jest.Mock).mockResolvedValue({ docs: mockData });

    const articles = await fetchAndCacheArticles();

    expect(fs.existsSync(CACHE_PATH)).toBe(true);
    const raw = fs.readFileSync(CACHE_PATH, 'utf-8');
    const cached = JSON.parse(raw);

    expect(cached.articles).toHaveLength(1);
    expect(cached.articles[0].title).toBe('Test Title');
    expect(articles).toEqual(cached.articles);
  });

  it('getCachedArticles returns parsed JSON if file exists', () => {
    const sample = { generatedAt: Date.now(), articles: [{ slug: 'abc', title: 'Cached Article' }] };
    fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
    fs.writeFileSync(CACHE_PATH, JSON.stringify(sample));

    const result = getCachedArticles();
    expect(result).toEqual({
      articles: sample.articles,
      isStale: false,
    });
  });

  it('getCachedArticles returns empty array if cache is missing', () => {
    const result = getCachedArticles();
    expect(result).toEqual({ articles: [], isStale: true });
  });
});
