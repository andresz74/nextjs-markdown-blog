"use client";

import Script from "next/script";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_TRACKING_ID = "G-F2P6NKY1EC";

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export default function GoogleAnalytics() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Track client-side navigations (App Router SPA behavior)
	React.useEffect(() => {
		const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
		window.gtag?.("config", GA_TRACKING_ID, { page_path: url });
	}, [pathname, searchParams]);

	return (
		<>
			<Script
			src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
			strategy="afterInteractive"
			/>
			<Script id="ga-init" strategy="afterInteractive">
			{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				window.gtag = gtag;
				gtag('js', new Date());
				gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
			`}
			</Script>
		</>
	);
}
