'use client'

import { MenuIcon } from 'lucide-react'

import { Sidebar } from '@/components/shared'
import { useClient } from '@/hooks/use-client'
import { Button, Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui'

interface Props {
	isPro: boolean
	apiLimitCount: number
}

export const MobileSidebar = ({ isPro = false, apiLimitCount = 0 }: Props) => {
	const { isMounted } = useClient()

	if (!isMounted) {
		return null
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="cursor-pointer md:hidden">
					<MenuIcon />
				</Button>
			</SheetTrigger>

			<SheetContent side="left" className="p-0" aria-describedby={undefined}>
				<SheetTitle className="hidden" />

				<SheetDescription className="hidden" />

				<Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
			</SheetContent>
		</Sheet>
	)
}
