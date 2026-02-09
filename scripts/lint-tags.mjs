import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';

const CONTENT_DIRS = ['articles', 'notes', 'docs'];
const MAX_TAG_LENGTH = 32;
const errors = [];

const normalizeTag = (tag) => slugify(tag, { lower: true, strict: true });

const getMarkdownFiles = (dir) =>
	fs
		.readdirSync(dir)
		.filter((file) => file.endsWith('.md'))
		.map((file) => path.join(dir, file));

const report = (file, message) => {
	errors.push(`${file}: ${message}`);
};

CONTENT_DIRS.forEach((dir) => {
	const files = getMarkdownFiles(dir);

	files.forEach((file) => {
		const raw = fs.readFileSync(file, 'utf8');
		const { data } = matter(raw);
		const frontmatterTags = data.tags;
		const rawTags = Array.isArray(frontmatterTags)
			? frontmatterTags
			: frontmatterTags
				? [frontmatterTags]
				: [];

		const seen = new Map();

		rawTags.forEach((tag, index) => {
			if (typeof tag !== 'string') {
				report(file, `tag #${index + 1} must be a string`);
				return;
			}

			const trimmed = tag.trim();
			if (!trimmed) {
				report(file, `tag #${index + 1} is empty`);
				return;
			}

			if (trimmed.includes(',')) {
				report(file, `tag "${trimmed}" appears comma-packed; split into individual tags`);
			}

			if (trimmed.length > MAX_TAG_LENGTH) {
				report(file, `tag "${trimmed}" is too long (${trimmed.length} > ${MAX_TAG_LENGTH})`);
			}

			const slug = normalizeTag(trimmed);
			if (!slug) {
				report(file, `tag "${trimmed}" normalizes to an empty slug`);
				return;
			}

			if (seen.has(slug)) {
				report(file, `duplicate normalized tag "${slug}" from "${seen.get(slug)}" and "${trimmed}"`);
				return;
			}

			seen.set(slug, trimmed);
		});
	});
});

if (errors.length) {
	console.error('Tag lint found issues:\n');
	errors.forEach((item) => console.error(`- ${item}`));
	process.exit(1);
}

console.log('Tag lint passed.');
