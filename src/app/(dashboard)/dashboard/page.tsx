'use client'

import { useRouter } from 'next/navigation'
import { ArrowRightIcon, CodeIcon, ImageIcon, MessageSquareIcon, MusicIcon, VideoIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui'

const tools = [
	{
		label: 'Conversation',
		icon: MessageSquareIcon,
		color: 'text-violet-500',
		bgColor: 'bg-violet-500/10',
		href: '/conversation',
	},
	{
		label: 'Music Generation',
		icon: MusicIcon,
		color: 'text-emerald-500',
		bgColor: 'bg-emerald-500/10',
		href: '/music',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-pink-700',
		bgColor: 'bg-violet-700/10',
		href: '/image',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-orange-700',
		bgColor: 'bg-orange-700/10',
		href: '/video',
	},
	{
		label: 'Code Generation',
		icon: CodeIcon,
		color: 'text-green-700',
		bgColor: 'bg-green-700/10',
		href: '/code',
	},
]

const DashboardPage = () => {
	const router = useRouter()

	return (
		<div className='container'>
			<div className='mb-8 space-y-4'>
				<h2 className='text-center text-2xl font-bold md:text-4xl'>Explore the power of AI</h2>

				<p className='text-center text-sm font-light text-muted-foreground md:text-lg'>
					Chat with the smartest AI - Experience the power of AI
				</p>
			</div>

			<div className='space-y-4 px-4 md:px-20 lg:px-32'>
				{tools.map((tool) => (
					<Card
						key={tool.href}
						onClick={() => router.push(tool.href)}
						className='flex cursor-pointer items-center justify-between border-black/5 p-4 transition hover:shadow-md'
					>
						<div className='flex items-center gap-x-4'>
							<div className={cn('w-fit rounded-md p-2', tool.bgColor)}>
								<tool.icon className={cn('size-8', tool.color)} />
							</div>

							<div className='font-semibold'>{tool.label}</div>

							<ArrowRightIcon className='size-5' />
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}

export default DashboardPage
