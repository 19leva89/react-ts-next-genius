'use client'

import Link from 'next/link'
import Typed from 'typed.js'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui'

export const LandingHero = () => {
	const { isSignedIn } = useAuth()

	const typedRef = useRef(null)

	useEffect(() => {
		const typed = new Typed(typedRef.current, {
			strings: ['Chatbot', 'Photo Generation', 'Music Generation', 'Code Generation', 'Video Generation'],
			typeSpeed: 50,
			backSpeed: 30,
			loop: true,
			showCursor: true,
			cursorChar: '|',
		})

		return () => {
			typed.destroy()
		}
	}, [])

	return (
		<div className="space-y-5 text-white font-bold py-36 text-center">
			<div className="space-y-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
				<h1>The Best AI Tool for</h1>

				<div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
					<span ref={typedRef} />
				</div>
			</div>

			<div className="text-sm md:text-xl font-light text-zinc-400">Create content using AI 10x faster</div>

			<div>
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button variant="premium" className="md:text-lg md:p6 rounded-full font-semibold cursor-pointer">
						Start Generating For Free
					</Button>
				</Link>
			</div>

			<div className="text-zinc-400 text-xs md:text-sm font-normal">No credit card required</div>
		</div>
	)
}
