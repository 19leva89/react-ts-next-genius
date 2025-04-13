import { PropsWithChildren } from 'react'

import { Navbar, Sidebar } from '@/components/shared'

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="relative h-full">
			<div className="z-80 h-full bg-gray-900 hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0">
				<Sidebar />
			</div>

			<main className="md:ml-72">
				<Navbar />

				{children}
			</main>
		</div>
	)
}

export default DashboardLayout
