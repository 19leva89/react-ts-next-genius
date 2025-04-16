'use client'

import { ZapIcon } from 'lucide-react'

import { MAX_FREE_COUNTS } from '@/constants'
import { useClient } from '@/hooks/use-client'
import { userProModal } from '@/hooks/user-pro-modal'
import { Button, Card, CardContent, Progress } from '@/components/ui'

interface Props {
	isPro: boolean
	apiLimitCount: number
}

export const FreeCounter = ({ isPro = false, apiLimitCount = 0 }: Props) => {
	const { onOpen } = userProModal()
	const { isMounted } = useClient()

	if (!isMounted) return null

	if (isPro) return null

	return (
		<div className="px-3">
			<Card className="border-0 bg-white/10">
				<CardContent>
					<div className="mb-4 space-y-2 text-center text-sm text-white">
						<p>
							{apiLimitCount} / {MAX_FREE_COUNTS} Free generations
						</p>

						<Progress className="h-3 bg-secondary" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
					</div>

					<Button variant="premium" onClick={() => onOpen()} className="w-full cursor-pointer">
						Upgrade
						<ZapIcon className="size-4 ml-2 fill-white" />
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
