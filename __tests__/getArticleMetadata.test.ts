import fs from 'fs';
import getArticleMetadata, { clearArticleMetadataCache } from '@/utils/getArticleMetadata';

describe('getArticleMetadata', () => {
	afterEach(() => {
		clearArticleMetadataCache();
		jest.restoreAllMocks();
	});

	it('extracts frontmatter metadata from markdown files', () => {
		jest.spyOn(fs, 'readdirSync').mockReturnValue(['entry-1.md', 'entry-2.md'] as unknown as ReturnType<typeof fs.readdirSync>);
		jest.spyOn(fs, 'readFileSync')
			.mockReturnValueOnce('---\ntitle: Entry 1\ndate: 2023-01-01\n---\nHello!')
			.mockReturnValueOnce('---\ntitle: Entry 2\ndate: 2023-02-01\n---\nWorld!');

		const metadata = getArticleMetadata('notes');

		expect(metadata).toHaveLength(2);
		expect(metadata[0]).toHaveProperty('title');
		expect(metadata[0]).toHaveProperty('slug');
		expect(metadata[0].title).toBe('Entry 2');
	});

	it('caches and reuses metadata per folder', () => {
		const readdirSpy = jest
			.spyOn(fs, 'readdirSync')
			.mockReturnValue(['entry-1.md'] as unknown as ReturnType<typeof fs.readdirSync>);
		jest
			.spyOn(fs, 'readFileSync')
			.mockReturnValue('---\ntitle: Entry 1\ndate: 2023-01-01\n---\nHello!');

		const first = getArticleMetadata('notes');
		const second = getArticleMetadata('notes');

		expect(readdirSpy).toHaveBeenCalledTimes(1);
		expect(first[0].title).toBe('Entry 1');
		expect(second[0].title).toBe('Entry 1');
	});
});
