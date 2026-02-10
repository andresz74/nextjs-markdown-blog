import getArticleMetadata from '@/utils/getArticleMetadata';
import type { ArticleMetadata } from '@/types/ArticleMetadata';

export interface ContentMetadata extends ArticleMetadata {
    folder: 'articles' | 'notes' | 'docs';
}

const contentFolders: ContentMetadata['folder'][] = ['articles', 'notes', 'docs'];

const getAllContentMetadata = (): ContentMetadata[] => {
    return contentFolders.flatMap((folder) =>
        getArticleMetadata(folder).map((item) => ({
            ...item,
            folder,
        }))
    );
};

export default getAllContentMetadata;
