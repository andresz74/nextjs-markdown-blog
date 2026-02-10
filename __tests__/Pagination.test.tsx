import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '@/components/Pagination';

describe('Pagination', () => {
	it('renders non-interactive previous button on first page', () => {
		render(<Pagination currentPage={1} totalPages={3} basePath="/notes" />);
		expect(screen.getByText('Previous').tagName).toBe('SPAN');
		expect(screen.getByText('Next').tagName).toBe('A');
	});

	it('renders non-interactive next button on last page', () => {
		render(<Pagination currentPage={3} totalPages={3} basePath="/notes" />);
		expect(screen.getByText('Next').tagName).toBe('SPAN');
		expect(screen.getByText('Previous').tagName).toBe('A');
	});
});
