import type { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL('https://blog.andreszenteno.com'),
	title: 'The Tech Pulse - Explore Technology and Web Development',
	description: 'Explore tech articles on web development, programming, and more. Created by Andres Zenteno.',
	icons: {
		icon: '/logo.svg',
		shortcut: '/logo.svg',
		apple: '/logo.svg',
	},
	openGraph: {
		type: 'website',
		title: 'The Tech Pulse - Explore Technology and Web Development',
		description: 'Explore tech articles on web development, programming, and more.',
		url: 'https://blog.andreszenteno.com',
		images: [
			{
				url: 'https://blog.andreszenteno.com/media/default-image.jpg',
				width: 1200,
				height: 630,
				alt: 'The Tech Pulse',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'The Tech Pulse - Explore Technology and Web Development',
		description: 'Explore tech articles on web development, programming, and more.',
		images: ['https://blog.andreszenteno.com/media/default-image.jpg'],
	},
};

export const generateMetadata = async () => {
	return metadata;
};
