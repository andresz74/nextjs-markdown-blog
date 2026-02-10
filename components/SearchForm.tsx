'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import styles from './SearchForm.module.css';

interface SearchFormProps {
	query?: string;
	placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ query = '', placeholder = 'Search posts...' }) => {
	const pathname = usePathname();

	return (
		<form className={styles.form} method="get" action={pathname}>
			<label className={styles.label} htmlFor="content-search">
				Search
			</label>
			<input
				id="content-search"
				name="q"
				type="search"
				defaultValue={query}
				placeholder={placeholder}
				className={styles.input}
			/>
			<button className={styles.button} type="submit">
				Apply
			</button>
		</form>
	);
};

export default SearchForm;
