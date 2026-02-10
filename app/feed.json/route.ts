import getFeedItems from '@/utils/getFeedItems';

const BASE_URL = 'https://blog.andreszenteno.com';

export const GET = async () => {
    const items = getFeedItems();

    const payload = {
        version: 'https://jsonfeed.org/version/1.1',
        title: 'The Tech Pulse',
        home_page_url: BASE_URL,
        feed_url: `${BASE_URL}/feed.json`,
        description: 'Explore tech articles on web development, programming, and more.',
        items: items.map((item) => ({
            id: item.url,
            url: item.url,
            title: item.title,
            summary: item.description,
            date_published: item.date ? new Date(item.date).toISOString() : undefined,
            tags: item.tags,
        })),
    };

    return new Response(JSON.stringify(payload, null, 2), {
        headers: {
            'Content-Type': 'application/feed+json; charset=utf-8',
        },
    });
};
