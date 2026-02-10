import getFeedItems from '@/utils/getFeedItems';

const BASE_URL = 'https://blog.andreszenteno.com';

const escapeXml = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET = async () => {
    const items = getFeedItems();
    const lastBuildDate = items[0]?.date ? new Date(items[0].date).toUTCString() : new Date().toUTCString();

    const itemXml = items
        .map((item) => {
            const pubDate = item.date ? new Date(item.date).toUTCString() : new Date().toUTCString();
            return `
        <item>
          <title>${escapeXml(item.title ?? '')}</title>
          <link>${item.url}</link>
          <guid>${item.url}</guid>
          <pubDate>${pubDate}</pubDate>
          ${item.description ? `<description>${escapeXml(item.description)}</description>` : ''}
        </item>`;
        })
        .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The Tech Pulse</title>
    <link>${BASE_URL}</link>
    <description>Explore tech articles on web development, programming, and more.</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${itemXml}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
        },
    });
};
