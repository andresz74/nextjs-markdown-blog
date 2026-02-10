describe('contentPageMeta', () => {
	afterEach(() => {
		delete process.env.NEXT_PUBLIC_DYNAMIC_OG_ENABLED;
		jest.resetModules();
	});

	it('uses default static image when dynamic og is disabled', async () => {
		const { buildContentMetadata } = await import('@/utils/contentPageMeta');
		const metadata = buildContentMetadata({
			slug: 'post-1',
			sectionPath: 'articles',
			data: { title: 'Post 1', description: 'Desc' },
		});
		expect(metadata.openGraph?.images?.[0]).toMatchObject({
			url: 'https://blog.andreszenteno.com/media/default-image.jpg',
		});
	});

	it('uses dynamic og image fallback when enabled', async () => {
		process.env.NEXT_PUBLIC_DYNAMIC_OG_ENABLED = 'true';
		jest.resetModules();
		const { buildContentMetadata } = await import('@/utils/contentPageMeta');
		const metadata = buildContentMetadata({
			slug: 'post-2',
			sectionPath: 'notes',
			data: { title: 'Post 2', description: 'Desc' },
		});
		expect(metadata.openGraph?.images?.[0]).toMatchObject({
			url: 'https://blog.andreszenteno.com/og?title=Post%202',
		});
	});
});
