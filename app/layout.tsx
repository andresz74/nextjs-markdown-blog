/* eslint-disable @next/next/no-css-tags */
import React from 'react';
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Noto_Sans, Roboto_Mono } from 'next/font/google';
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Client components (they can include 'use client' internally)
import ThemeInit from '@/components/ThemeInit';
import GoogleAnalytics from "@/components/GoogleAnalytics";

const notoSans = Noto_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-noto',
});

const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto-mono',
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-jetbrains-mono',
});

// If you already have metadata in ./metadata, you can re-export it here
// or convert it to Next's standard export.
// Example: export { metadata } from "./metadata";
export { metadata } from "./metadata";

// Prefer Next's viewport export instead of <meta name="viewport" ... />
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${notoSans.variable} ${robotoMono.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <link rel="stylesheet" href="/style/fa.all.css" />
        <link rel="stylesheet" href="/style/light-steel.css" />
        <link rel="stylesheet" href="/style/matrix.css" />
      </head>
      <body>
        {/* Runs before paint to avoid theme flash */}
        <ThemeInit />
		<React.Suspense>
			{/* Loads GA + tracks SPA navigations */}
			<GoogleAnalytics />
		</React.Suspense>

        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
