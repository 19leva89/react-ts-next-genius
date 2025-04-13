import Image from 'next/image'

interface Props {
	label: string
}

export const Empty = ({ label }: Props) => {
	return (
		<div className="flex flex-col items-center justify-center h-full p-20">
			<div className="relative size-72">
				<Image src="/img/empty.png" alt="Empty" fill />
			</div>

			<p className="text-muted-foreground text-sm text-center">{label}</p>
		</div>
	)
}
