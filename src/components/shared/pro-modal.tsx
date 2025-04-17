'use client'

import axios from 'axios'
import {
	CheckIcon,
	CodeIcon,
	ImageIcon,
	LoaderIcon,
	MessageSquareIcon,
	MusicIcon,
	VideoIcon,
	ZapIcon,
} from 'lucide-react'
import { useState } from 'react'

import {
	Badge,
	Button,
	Card,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { userProModal } from '@/hooks/user-pro-modal'

const tools = [
	{
		label: 'Conversation',
		icon: MessageSquareIcon,
		color: 'text-violet-500',
		bgColor: 'bg-violet-500/10',
	},
	{
		label: 'Music Generation',
		icon: MusicIcon,
		color: 'text-emerald-500',
		bgColor: 'bg-emerald-500/10',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-pink-700',
		bgColor: 'bg-violet-700/10',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-orange-700',
		bgColor: 'bg-orange-700/10',
	},
	{
		label: 'Code Generation',
		icon: CodeIcon,
		color: 'text-green-700',
		bgColor: 'bg-green-700/10',
	},
]

export const ProModal = () => {
	const { isOpen, onClose } = userProModal()

	const [loading, setLoading] = useState<boolean>(false)

	const onSubscribe = async () => {
		setLoading(true)

		try {
			const response = await axios.get('/api/stripe')

			window.location.href = response.data.url
		} catch (error: any) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent aria-describedby={undefined}>
				<DialogHeader className="flex justify-center items-center flex-col gap-y-4 pb-2">
					<DialogTitle>
						<div className="flex items-center gap-x-2 py-1 font-bold">
							Upgrade to Genius
							<Badge variant="premium" className="py-1 uppercase text-sm">
								pro
							</Badge>
						</div>
					</DialogTitle>

					<DialogDescription className="hidden" />
				</DialogHeader>

				<div className="w-full pt-2 space-y-2 text-center text-sm font-medium text-zinc-900">
					{tools.map((tool) => (
						<Card key={tool.label} className="flex flex-row items-center justify-between p-3 border-black/5">
							<div className="flex items-center gap-x-4">
								<div className={cn('w-fit p-2 rounded-md', tool.bgColor)}>
									<tool.icon className={cn('size-6', tool.color)} />
								</div>

								<div className="font-semibold text-sm">{tool.label}</div>
							</div>

							<CheckIcon className="size-5 text-primary" />
						</Card>
					))}
				</div>

				<DialogFooter className="w-full">
					<Button
						variant="premium"
						size="lg"
						disabled={loading}
						onClick={onSubscribe}
						className="w-full cursor-pointer"
					>
						{loading ? (
							<LoaderIcon className="size-4 ml-2 fill-white animate-spin" />
						) : (
							<>
								Upgrade <ZapIcon className="size-4 ml-2 fill-white" />
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
