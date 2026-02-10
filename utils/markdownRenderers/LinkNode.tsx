'use client';
import React from 'react';
import styles from './LinkNode.module.css';

export interface LinkNodeProps {
	href?: string | undefined;
	children: React.ReactNode;
}

const isExternalHttpLink = (href: string) => href.startsWith('http://') || href.startsWith('https://');

const LinkNode: React.FC<LinkNodeProps> = ({ href, children }) => {
	if (!href) {
		return <span className={styles.link}>{children}</span>;
	}

	const external = isExternalHttpLink(href);
	return (
		<a
			className={styles.link}
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer nofollow' : undefined}
		>
			{children}
		</a>
	);
};

export default LinkNode;
