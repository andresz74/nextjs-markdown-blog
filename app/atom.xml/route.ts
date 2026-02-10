import getFeedItems from '@/utils/getFeedItems';

const BASE_URL = 'https://blog.andreszenteno.com';

const escapeXml = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET = async () => {
    const items = getFeedItems();
    const updated = items[0]?.date ? new Date(items[0].date).toISOString() : new Date().toISOString();

    const entries = items
        .map((item) => {
            const updatedItem = item.date ? new Date(item.date).toISOString() : updated;
            return `
    <entry>
      <title>${escapeXml(item.title)}</title>
      <id>${item.url}</id>
      <link href="${item.url}" />
      <updated>${updatedItem}</updated>
      ${item.description ? `<summary>${escapeXml(item.description)}</summary>` : ''}
    </entry>`;
        })
        .join('');

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>The Tech Pulse</title>
  <id>${BASE_URL}</id>
  <link href="${BASE_URL}" />
  <link href="${BASE_URL}/atom.xml" rel="self" />
  <updated>${updated}</updated>
  ${entries}
</feed>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
        },
    });
};
