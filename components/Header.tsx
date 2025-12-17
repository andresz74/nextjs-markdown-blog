'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useTheme, ThemeName } from '../utils/useTheme';

const Header = () => {
	const { theme, setTheme, themes } = useTheme();
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value as ThemeName);
	};
	return (
		<header className={styles.headerStyles}>
			<Link className='no-link-style' href={'/'}>
				<div className={styles.logo}></div>
				<h1 className={styles.title}>My Blog</h1>
			</Link>
			<nav className={styles.navStyles}>
				<Link href="/">Home</Link>
				<Link href="/about">About</Link>
			</nav>
			<label className={styles.themeLabel}>
				<select
					className={styles.themeSelect}
					value={theme}
					onChange={handleChange}
					onFocus={(e) => {
						e.target.style.borderColor = "var(--color-primary)";
						e.target.style.boxShadow = "0 0 0 2px var(--color-soft-primary)";
					}}
					onBlur={(e) => {
						e.target.style.borderColor = "var(--card-border)";
						e.target.style.boxShadow = "none";
					}}
				>
					{themes.map((name: ThemeName) => (
						<option key={name} value={name}>
							{name.charAt(0).toUpperCase() + name.slice(1)}
						</option>
					))}
				</select>
			</label>
		</header>
	);
};

export default Header;
