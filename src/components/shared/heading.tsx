import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface Props {
	title: string
	description: string
	icon: LucideIcon
	iconColor?: string
	bgColor?: string
}

export const Heading = ({ title, description, icon: Icon, iconColor, bgColor }: Props) => {
	return (
		<div className="flex items-center gap-x-3 mb-8 px-4 lg:px-8  ">
			<div className={cn('w-fit p-2 rounded-md', bgColor)}>
				<Icon className={cn('size-10', iconColor)} />
			</div>

			<div>
				<h2 className="text-3xl font-bold">{title}</h2>

				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	)
}
