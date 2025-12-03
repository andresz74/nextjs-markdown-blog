'use client';
import './globals.css';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { metadata } from './metadata';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				{metadata.title && <title>{metadata.title as string}</title>}
				{metadata.description && <meta name="description" content={metadata.description as string} />}
			</head>
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
