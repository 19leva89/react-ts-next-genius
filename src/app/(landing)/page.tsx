import { LandingContent, LandingHero, LandingNavbar } from '@/components/shared'

const LandingPage = () => {
	return (
		<div className="h-full">
			<LandingNavbar />

			<LandingHero />

			<LandingContent />
		</div>
	)
}

export default LandingPage
