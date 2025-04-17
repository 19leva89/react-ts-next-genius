'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@clerk/nextjs'
import { Montserrat } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

const font = Montserrat({ weight: '600', subsets: ['latin'] })

export const LandingNavbar = () => {
	const { isSignedIn } = useAuth()

	return (
		<nav className="flex items-center justify-between p-4 bg-transparent">
			<Link href="/" className="flex items-center">
				<div className="relative size-8 mr-4">
					<Image src="/img/logo.png" alt="Logo" fill />
				</div>

				<h1 className={cn('text-2xl font-bold text-white', font.className)}>Genius</h1>
			</Link>

			<div className="flex items-center gap-x-2">
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button variant="outline" className="rounded-full cursor-pointer">
						{isSignedIn ? 'Dashboard' : 'Get Started'}
					</Button>
				</Link>
			</div>
		</nav>
	)
}
