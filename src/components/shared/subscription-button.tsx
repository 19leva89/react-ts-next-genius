'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { useState } from 'react'
import { ZapIcon } from 'lucide-react'

import { Button } from '@/components/ui'

interface Props {
	isPro: boolean
}

export const SubscriptionButton = ({ isPro = false }: Props) => {
	const [loading, setLoading] = useState<boolean>(false)

	const onClick = async () => {
		try {
			setLoading(true)

			const response = await axios.get('/api/stripe')

			window.location.href = response.data.url
		} catch (error) {
			console.log('BILLING_ERROR', error)

			toast.error('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button
			variant={isPro ? 'default' : 'premium'}
			disabled={loading}
			onClick={onClick}
			className="cursor-pointer"
		>
			{isPro ? 'Manage Subscription' : 'Upgrade'}

			{!isPro && <ZapIcon className="size-4 ml-2 fill-white" />}
		</Button>
	)
}
