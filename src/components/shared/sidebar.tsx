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
		<div className="flex flex-col py-4 space-y-4 h-full bg-[#111827] text-white">
			<div className="flex flex-col flex-1 gap-14 px-3 py-2">
				<Link href="/dashboard" className="flex items-center w-min pl-3">
					<div className="relative size-8 mr-4">
						<Image src="/img/logo.png" alt="Logo" fill />
					</div>

					<h1 className={cn('text-2xl font-bold overflow-hidden', montserrat.className)}>Genius</h1>
				</Link>

				<div className="space-y-1">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								'flex justify-start w-full p-3 rounded-lg text-sm font-medium cursor-pointer hover:text-white hover:bg-white/10 transition group',
								pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400',
							)}
						>
							<div className="flex items-center flex-1">
								<route.icon className={cn('size-5 mr-3', route.color)} />

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
