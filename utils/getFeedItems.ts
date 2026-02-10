import getAllContentMetadata from '@/utils/getAllContentMetadata';

const BASE_URL = 'https://blog.andreszenteno.com';

export interface FeedItem {
    title: string;
    description?: string;
    date?: string;
    url: string;
    tags?: string[];
    image?: string;
}

const getFeedItems = (): FeedItem[] => {
    const items = getAllContentMetadata().map((item) => ({
        title: item.title,
        description: item.bio,
        date: item.date,
        url: `${BASE_URL}/${item.folder}/${item.slug}`,
        tags: item.tags,
        image: item.image,
    }));

    return items.sort((a, b) => {
        const dateA = new Date(a.date ?? 0).getTime();
        const dateB = new Date(b.date ?? 0).getTime();
        return dateB - dateA;
    });
};

export default getFeedItems;
