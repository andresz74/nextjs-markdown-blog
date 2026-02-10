const BASE_URL = 'https://blog.andreszenteno.com';

export default function robots() {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${BASE_URL}/sitemap.xml`,
		host: BASE_URL,
	};
}
