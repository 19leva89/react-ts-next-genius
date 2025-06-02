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
		<div className='space-y-5 py-36 text-center font-bold text-white'>
			<div className='space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl'>
				<h1>The Best AI Tool for</h1>

				<div className='bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent'>
					<span ref={typedRef} />
				</div>
			</div>

			<div className='text-sm font-light text-zinc-400 md:text-xl'>Create content using AI 10x faster</div>

			<div>
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button variant='premium' className='md:p6 cursor-pointer rounded-full font-semibold md:text-lg'>
						Start Generating For Free
					</Button>
				</Link>
			</div>

			<div className='text-xs font-normal text-zinc-400 md:text-sm'>No credit card required</div>
		</div>
	)
}
