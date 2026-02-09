import sanitizeTags from '@/utils/sanitizeTags';

describe('sanitizeTags', () => {
	it('splits comma-packed tags, normalizes casing, and dedupes by slug', () => {
		const result = sanitizeTags([
			' react ',
			'React',
			'ai/tools',
			'javascript, css',
			'Next.js',
		]);

		expect(result).toEqual(['React', 'AI Tools', 'JavaScript', 'CSS', 'Next.js']);
	});
});
