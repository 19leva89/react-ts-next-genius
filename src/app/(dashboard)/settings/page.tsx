import { SettingsIcon } from 'lucide-react'

import { checkSubscription } from '@/lib/subscription'
import { Heading, SubscriptionButton } from '@/components/shared'

const SettingsPage = async () => {
	const isPro = await checkSubscription()

	return (
		<div>
			<Heading
				title="Settings"
				description="Manage account settings"
				icon={SettingsIcon}
				iconColor="text-gray-700"
				bgColor="bg-gray-700/10"
			/>

			<div className="px-4 lg:px-8 space-y-4">
				<div className="text-muted-foreground text-sm">
					You are currently on a {isPro ? 'Pro' : 'Free'} plan
				</div>

				<SubscriptionButton isPro={isPro} />
			</div>
		</div>
	)
}

export default SettingsPage
