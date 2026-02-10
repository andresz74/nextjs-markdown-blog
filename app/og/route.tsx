import { ImageResponse } from 'next/og';

export const runtime = 'edge';
const ogSize = {
	width: 1200,
	height: 630,
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const title = searchParams.get('title') || 'The Tech Pulse';

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					background: 'linear-gradient(135deg, #1e293b, #0f172a)',
					color: '#f8fafc',
					padding: '64px',
					fontSize: 56,
					fontWeight: 700,
				}}
			>
				<div style={{ fontSize: 24, opacity: 0.8 }}>The Tech Pulse</div>
				<div style={{ marginTop: 20 }}>{title}</div>
			</div>
		),
		ogSize,
	);
}
