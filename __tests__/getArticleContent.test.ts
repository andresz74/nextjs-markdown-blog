import fs from 'fs';
import getArticleContent from '@/utils/getArticleContent';

describe('getArticleContent', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('returns data and content from a markdown file', () => {
		jest.spyOn(fs, 'readFileSync').mockReturnValue('---\ntitle: My Note\n---\nThis is the content.');

		const result = getArticleContent('notes', 'my-note');

		expect(result?.data.title).toBe('My Note');
		expect(result?.content).toContain('This is the content.');
	});

	it('returns null when file is missing', () => {
		jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
			throw new Error('ENOENT');
		});

		const result = getArticleContent('notes', 'missing');
		expect(result).toBeNull();
	});
});
