declare module 'next/navigation' {
	export function notFound(): never;
	export function usePathname(): string;
	export function useSearchParams(): URLSearchParams;
}

declare module 'next/link' {
	import type { ComponentType } from 'react';
	const Link: ComponentType<any>;
	export default Link;
}

declare module 'next/image' {
	import type { ComponentType } from 'react';
	const Image: ComponentType<any>;
	export default Image;
}

declare module 'next/script' {
	import type { ComponentType } from 'react';
	const Script: ComponentType<any>;
	export default Script;
}

declare module 'next/og' {
	export class ImageResponse extends Response {
		constructor(element: any, init?: any);
	}
}

declare module 'next/font/google' {
	type FontLoader = (options: any) => { className: string; variable?: string };
	export const JetBrains_Mono: FontLoader;
	export const Noto_Sans: FontLoader;
	export const Roboto_Mono: FontLoader;
}
