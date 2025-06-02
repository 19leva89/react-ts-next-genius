'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
	CodeIcon,
	ImageIcon,
	LayoutDashboardIcon,
	MessageSquareIcon,
	MusicIcon,
	SettingsIcon,
	VideoIcon,
} from 'lucide-react'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { useClient } from '@/hooks/use-client'
import { FreeCounter } from '@/components/shared'

const montserrat = Montserrat({
	weight: '600',
	subsets: ['latin'],
})

const routes = [
	{
		label: 'Dashboard',
		icon: LayoutDashboardIcon,
		href: '/dashboard',
		color: 'text-sky-500',
	},
	{
		label: 'Conversation',
		icon: MessageSquareIcon,
		href: '/conversation',
		color: 'text-violet-500',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		href: '/image',
		color: 'text-pink-700',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		href: '/video',
		color: 'text-orange-700',
	},
	{
		label: 'Music Generation',
		icon: MusicIcon,
		href: '/music',
		color: 'text-emerald-500',
	},
	{
		label: 'Code Generation',
		icon: CodeIcon,
		href: '/code',
		color: 'text-green-700',
	},
	{
		label: 'Settings',
		icon: SettingsIcon,
		href: '/settings',
	},
]

interface Props {
	isPro: boolean
	apiLimitCount: number
}

export const Sidebar = ({ isPro = false, apiLimitCount = 0 }: Props) => {
	const pathname = usePathname()

	const { isMounted } = useClient()

	if (!isMounted) {
		return null
	}

	return (
		<div className='flex h-full flex-col space-y-4 bg-[#111827] py-4 text-white'>
			<div className='flex flex-1 flex-col gap-14 px-3 py-2'>
				<Link href='/dashboard' className='flex w-min items-center pl-3'>
					<div className='relative mr-4 size-8'>
						<Image src='/img/logo.png' alt='Logo' fill />
					</div>

					<h1 className={cn('overflow-hidden text-2xl font-bold', montserrat.className)}>Genius</h1>
				</Link>

				<div className='space-y-1'>
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white',
								pathname === route.href ? 'bg-white/10 text-white' : 'text-zinc-400',
							)}
						>
							<div className='flex flex-1 items-center'>
								<route.icon className={cn('mr-3 size-5', route.color)} />

								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>

			<FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
		</div>
	)
}
