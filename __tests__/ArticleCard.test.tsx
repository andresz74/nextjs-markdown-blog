import React from 'react'; // Import React to avoid the test error
import { render, screen } from '@testing-library/react';
import ArticleCard from '@/components/ArticleCard';

describe('ArticleCard', () => {
	it('renders article title and description', () => {
		render(
			<ArticleCard
				folder="articles"
				article={{
					title: 'Test Article',
					slug: 'test-article',
					date: '2025-01-01',
					bio: 'This is a test description.',
					image: '/test.jpg',
				}}
			/>,
		);

		expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Article');
		expect(screen.getByText('This is a test description.')).toBeInTheDocument();
	});

	it('renders null when article prop is missing', () => {
		const { container } = render(<ArticleCard folder="articles" />);
		expect(container.firstChild).toBeNull(); // ✅ covers the `: null` branch
	});

	it('uses default image when article.image is not provided', () => {
		render(
			<ArticleCard
				folder="articles"
				article={{
					slug: 'test-post',
					title: 'Test Post',
					bio: 'Short description',
					date: '2025-05-01',
					image: '', // Empty image triggers fallback
				}}
			/>,
		);
		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('src', expect.stringContaining('/media/default-image.jpg'));
	});

	it('shows only three tags with an overflow chip', () => {
		render(
			<ArticleCard
				folder="articles"
				article={{
					slug: 'test-tags',
					title: 'Tagged Post',
					bio: 'Tagged content',
					date: '2025-05-01',
					image: '/test.jpg',
					tags: ['React', 'JavaScript', 'CSS', 'TypeScript', 'Testing'],
				}}
			/>,
		);

		expect(screen.getByRole('link', { name: 'React' })).toHaveAttribute('href', '/tags/react');
		expect(screen.getByRole('link', { name: 'JavaScript' })).toHaveAttribute('href', '/tags/javascript');
		expect(screen.getByRole('link', { name: 'CSS' })).toHaveAttribute('href', '/tags/css');
		expect(screen.queryByRole('link', { name: 'TypeScript' })).not.toBeInTheDocument();
		expect(screen.getByText('+2')).toBeInTheDocument();
	});
});
