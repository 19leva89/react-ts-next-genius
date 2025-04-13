import Image from 'next/image'

export const Loader = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-y-4 h-full">
			<div className="relative size-10 animate-spin">
				<Image src="/img/logo.png" alt="Logo" fill />
			</div>

			<p className="text-sm text-muted-foreground">Genius is thinking...</p>
		</div>
	)
}
