import normalizeTag from '@/utils/normalizeTag';

const SPECIAL_CASE_LABELS: Record<string, string> = {
	ai: 'AI',
	api: 'API',
	css: 'CSS',
	html: 'HTML',
	javascript: 'JavaScript',
	js: 'JS',
	nextjs: 'Next.js',
	rag: 'RAG',
	react: 'React',
	ts: 'TS',
	typescript: 'TypeScript',
	ui: 'UI',
	ux: 'UX',
};

const toTitleCase = (value: string) => {
	if (!value) return value;
	return value.charAt(0).toUpperCase() + value.slice(1);
};

export const slugToTagLabel = (slug: string) => {
	return slug
		.split('-')
		.map((part) => SPECIAL_CASE_LABELS[part] ?? toTitleCase(part))
		.join(' ');
};

const splitCommaPackedTag = (tag: string) => {
	return tag.includes(',') ? tag.split(',') : [tag];
};

export const sanitizeTags = (tagsValue: unknown): string[] => {
	const rawTags = Array.isArray(tagsValue) ? tagsValue : tagsValue ? [tagsValue] : [];
	const labels: string[] = [];
	const seen = new Set<string>();

	rawTags.forEach((rawTag) => {
		if (typeof rawTag !== 'string') return;
		const candidateTags = splitCommaPackedTag(rawTag);

		candidateTags.forEach((candidate) => {
			const cleaned = candidate.trim().replace(/[\/_]+/g, ' ').replace(/\s+/g, ' ');
			const slug = normalizeTag(cleaned);
			if (!slug || seen.has(slug)) return;
			seen.add(slug);
			labels.push(slugToTagLabel(slug));
		});
	});

	return labels;
};

export default sanitizeTags;
