import { PropsWithChildren } from 'react'

import { getApiLimitCount } from '@/lib/api-limit'
import { Navbar, Sidebar } from '@/components/shared'
import { checkSubscription } from '@/lib/subscription'

const DashboardLayout = async ({ children }: PropsWithChildren) => {
	const isPro = await checkSubscription()
	const apiLimitCount = await getApiLimitCount()

	return (
		<div className="relative h-full">
			<div className="z-80 h-full bg-gray-900 hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0">
				<Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
			</div>

			<main className="md:ml-72">
				<Navbar />

				{children}
			</main>
		</div>
	)
}

export default DashboardLayout
