import Link from 'next/link'

import { Button } from '@/components/ui'

const LandingPage = () => {
	return (
		<div>
			Landing page
			<div>
				<Link href="/sign-in">
					<Button className="cursor-pointer">Login</Button>
				</Link>

				<Link href="/sign-up">
					<Button className="cursor-pointer">Register</Button>
				</Link>
			</div>
		</div>
	)
}

export default LandingPage
