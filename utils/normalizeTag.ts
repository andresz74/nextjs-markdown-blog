import slugify from 'slugify';

const normalizeTag = (tag?: string | null) => {
	if (typeof tag !== 'string') return '';
	return slugify(tag, { lower: true, strict: true });
};

export default normalizeTag;
