import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Toaster } from '@/components/ui'
import { ModalProvider } from '@/components/shared/providers'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Genius',
	description: 'AI Powered Platform',
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<ModalProvider />

					{children}

					<Toaster position="bottom-right" expand={false} richColors />
				</body>
			</html>
		</ClerkProvider>
	)
}
