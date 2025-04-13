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
		<div className="container">
			<div className="mb-8 space-y-4">
				<h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h2>

				<p className="text-muted-foreground font-light text-sm md:text-lg text-center">
					Chat with the smartest AI - Experience the power of AI
				</p>
			</div>

			<div className="px-4 md:px-20 lg:px-32 space-y-4">
				{tools.map((tool) => (
					<Card
						key={tool.href}
						onClick={() => router.push(tool.href)}
						className="flex items-center justify-between p-4 border-black/5 hover:shadow-md transition cursor-pointer"
					>
						<div className="flex items-center gap-x-4">
							<div className={cn('w-fit p-2 rounded-md', tool.bgColor)}>
								<tool.icon className={cn('size-8', tool.color)} />
							</div>

							<div className="font-semibold">{tool.label}</div>

							<ArrowRightIcon className="size-5" />
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}

export default DashboardPage
