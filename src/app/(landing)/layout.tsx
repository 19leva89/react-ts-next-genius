import { PropsWithChildren } from 'react'

const LandingLayout = ({ children }: PropsWithChildren) => {
	return (
		<main className="h-full bg-[#111827] overflow-auto">
			<div className="size-full mx-auto max-w-screen-xl">{children}</div>
		</main>
	)
}

export default LandingLayout
