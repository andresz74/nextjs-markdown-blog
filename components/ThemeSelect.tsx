"use client";

import React from 'react';
import styles from './ThemeSelect.module.css';
import { useTheme, ThemeName } from '../utils/useTheme';

export default function ThemeSelect() {
    const { theme, setTheme, themes } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value as ThemeName);
	};

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <label>
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
    );
}
