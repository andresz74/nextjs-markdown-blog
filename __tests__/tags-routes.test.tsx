import React from 'react';
import { render, screen } from '@testing-library/react';
import TagsPage from '@/app/tags/page';
import TagPage, { generateStaticParams } from '@/app/tags/[tag]/page';
import getAllContentMetadata from '@/utils/getAllContentMetadata';

jest.mock('@/utils/getAllContentMetadata', () => jest.fn());

jest.mock('@/components/TagFilter', () => {
	return function TagFilterMock({ tags }: { tags: { label: string; count: number }[] }) {
		return <div data-testid="tag-filter">{tags.map((tag) => `${tag.label}:${tag.count}`).join(',')}</div>;
	};
});

jest.mock('@/components/FilteredArticleList', () => {
	return function FilteredArticleListMock() {
		return <div data-testid="filtered-list">filtered list</div>;
	};
});

jest.mock('next/navigation', () => ({
	notFound: () => {
		throw new Error('NOT_FOUND');
	},
}));

const mockedGetAllContentMetadata = getAllContentMetadata as jest.MockedFunction<typeof getAllContentMetadata>;

describe('tags routes', () => {
	beforeEach(() => {
		mockedGetAllContentMetadata.mockReturnValue([
			{ title: 'A', slug: 'a', folder: 'articles', tags: ['React', 'Next.js'] },
			{ title: 'B', slug: 'b', folder: 'notes', tags: ['React'] },
			{ title: 'C', slug: 'c', folder: 'docs', tags: ['Testing'] },
		] as ReturnType<typeof getAllContentMetadata>);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('builds static params from unique normalized tags', async () => {
		const params = await generateStaticParams();
		expect(params).toEqual(
			expect.arrayContaining([{ tag: 'react' }, { tag: 'nextjs' }, { tag: 'testing' }]),
		);
	});

	it('renders tags index with merged counts', () => {
		render(<TagsPage />);
		expect(screen.getByRole('heading', { name: 'Tags' })).toBeInTheDocument();
		expect(screen.getByTestId('tag-filter')).toHaveTextContent('React:2');
	});

	it('renders a tag page when matches exist', () => {
		render(<TagPage params={{ tag: 'react' }} />);
		expect(screen.getByRole('heading', { name: 'Tag: React' })).toBeInTheDocument();
		expect(screen.getByTestId('filtered-list')).toBeInTheDocument();
	});

	it('throws not found for unknown tags', () => {
		expect(() => TagPage({ params: { tag: 'unknown' } })).toThrow('NOT_FOUND');
	});
});
