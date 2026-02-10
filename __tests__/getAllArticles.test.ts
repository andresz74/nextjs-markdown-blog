import fs from 'fs';
import path from 'path';
import { getDocs, collection } from 'firebase/firestore';
import { fetchAndCacheArticles, getCachedArticles } from '@/utils/getAllArticles';

jest.mock('firebase/firestore', () => ({
	getDocs: jest.fn(),
	collection: jest.fn(),
	getFirestore: jest.fn(),
}));

jest.mock('@/firebase.configuration', () => ({
	db: {},
}));

const CACHE_PATH = path.join(process.cwd(), 'cache', 'articles.json');

describe('getAllArticles utils', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-key';
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test-auth-domain';
		process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project-id';
	});

	afterEach(() => {
		jest.restoreAllMocks();
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
		(collection as jest.Mock).mockReturnValue('articles-ref');
		const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);
		const writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined);

		const articles = await fetchAndCacheArticles();

		expect(mkdirSpy).toHaveBeenCalledWith(path.dirname(CACHE_PATH), { recursive: true });
		expect(writeSpy).toHaveBeenCalledTimes(1);
		const cachedPayload = JSON.parse((writeSpy.mock.calls[0]?.[1] as string) ?? '{}');

		expect(cachedPayload.articles).toHaveLength(1);
		expect(cachedPayload.articles[0].title).toBe('Test Title');
		expect(articles).toEqual(cachedPayload.articles);
	});

	it('getCachedArticles returns parsed payload if cache exists', () => {
		const sample = { generatedAt: Date.now(), articles: [{ slug: 'abc', title: 'Cached Article' }] };
		jest.spyOn(fs, 'existsSync').mockReturnValue(true);
		jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(sample) as unknown as ReturnType<typeof fs.readFileSync>);

		const result = getCachedArticles();
		expect(result).toEqual({
			articles: sample.articles,
			isStale: false,
		});
	});

	it('getCachedArticles returns empty array when cache is missing', () => {
		jest.spyOn(fs, 'existsSync').mockReturnValue(false);
		const result = getCachedArticles();
		expect(result).toEqual({ articles: [], isStale: true });
	});

	it('getCachedArticles supports legacy array cache schema', () => {
		const legacy = [{ slug: 'legacy-post', title: 'Legacy Post' }];
		jest.spyOn(fs, 'existsSync').mockReturnValue(true);
		jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(legacy) as unknown as ReturnType<typeof fs.readFileSync>);

		const result = getCachedArticles();
		expect(result).toEqual({
			articles: legacy,
			isStale: true,
		});
	});
});
