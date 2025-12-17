import './globals.css';

import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export { metadata } from './metadata';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
        return (
                <html lang="en">
                        <body>
                                <Header />
                                <main>{children}</main>
                                <Footer />
                        </body>
                </html>
        );
}
