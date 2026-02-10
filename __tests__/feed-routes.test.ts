import { GET as getRss } from '@/app/rss.xml/route';
import { GET as getAtom } from '@/app/atom.xml/route';
import { GET as getJsonFeed } from '@/app/feed.json/route';
import getFeedItems from '@/utils/getFeedItems';

jest.mock('@/utils/getFeedItems', () => jest.fn());

const mockedGetFeedItems = getFeedItems as jest.MockedFunction<typeof getFeedItems>;

class MockResponse {
	private readonly payload: string;
	readonly headers: Headers;

	constructor(body: string, init?: { headers?: Record<string, string> }) {
		this.payload = body;
		this.headers = new Headers(init?.headers);
	}

	async text() {
		return this.payload;
	}

	async json() {
		return JSON.parse(this.payload);
	}
}

describe('feed routes', () => {
	beforeEach(() => {
		(global as unknown as { Response: typeof MockResponse }).Response = MockResponse as unknown as typeof Response;
		mockedGetFeedItems.mockReturnValue([
			{
				title: 'Post One',
				description: 'Feed description',
				date: '2026-01-01',
				url: 'https://blog.andreszenteno.com/articles/post-one',
				tags: ['tech'],
			},
		]);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('returns RSS xml', async () => {
		const response = await getRss();
		const body = await response.text();
		expect(response.headers.get('Content-Type')).toContain('application/rss+xml');
		expect(body).toContain('<rss version="2.0">');
		expect(body).toContain('<title>Post One</title>');
	});

	it('returns Atom xml', async () => {
		const response = await getAtom();
		const body = await response.text();
		expect(response.headers.get('Content-Type')).toContain('application/atom+xml');
		expect(body).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
		expect(body).toContain('<title>Post One</title>');
	});

	it('returns JSON feed', async () => {
		const response = await getJsonFeed();
		const body = await response.json();
		expect(response.headers.get('Content-Type')).toContain('application/feed+json');
		expect(body.title).toBe('The Tech Pulse');
		expect(body.items[0].title).toBe('Post One');
	});
});
