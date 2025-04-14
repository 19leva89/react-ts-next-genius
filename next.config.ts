import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'oaidalleapiprodscus.blob.core.windows.net',
			},
		],
		unoptimized: true,
	},
	reactStrictMode: false,
}

export default nextConfig
