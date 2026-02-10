import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import logger from '@/utils/logger';

const getArticleContent = (folder: string, slug: string) => {
	try {
		const file = path.join(folder, `${slug}.md`);
		const content = fs.readFileSync(file, 'utf8');
		const matterResult = matter(content);
		return matterResult;
	} catch (error) {
		logger.warn('getArticleContent', `Missing markdown file for slug: ${slug}`, error);
		return null;
	}
};

export default getArticleContent;
