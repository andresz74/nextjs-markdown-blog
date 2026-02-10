import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import getAllContentMetadata from '@/utils/getAllContentMetadata';
import { getCachedArticles } from '@/utils/getAllArticles';

jest.mock('@/utils/getAllContentMetadata', () => jest.fn());
jest.mock('@/utils/getAllArticles', () => ({
	getCachedArticles: jest.fn(),
}));

const mockedGetAllContentMetadata = getAllContentMetadata as jest.MockedFunction<typeof getAllContentMetadata>;
const mockedGetCachedArticles = getCachedArticles as jest.MockedFunction<typeof getCachedArticles>;

describe('sitemap and robots', () => {
	beforeEach(() => {
		mockedGetAllContentMetadata.mockReturnValue([
			{ title: 'A', slug: 'a', folder: 'articles', date: '2026-01-01', tags: ['React'] },
		] as ReturnType<typeof getAllContentMetadata>);
		mockedGetCachedArticles.mockReturnValue({
			articles: [{ slug: 'fb-1', date: '2026-01-02' }] as ReturnType<typeof getCachedArticles>['articles'],
			isStale: false,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('includes canonical content routes in sitemap', () => {
		const map = sitemap();
		expect(map.some(entry => entry.url === 'https://blog.andreszenteno.com/articles/a')).toBe(true);
		expect(map.some(entry => entry.url === 'https://blog.andreszenteno.com/fb-articles/fb-1')).toBe(true);
	});

	it('returns robots with sitemap reference', () => {
		const output = robots();
		expect(output.sitemap).toBe('https://blog.andreszenteno.com/sitemap.xml');
	});
});
