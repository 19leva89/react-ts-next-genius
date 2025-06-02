import Image from 'next/image'

interface Props {
	label: string
}

export const Empty = ({ label }: Props) => {
	return (
		<div className='flex h-full flex-col items-center justify-center p-20'>
			<div className='relative size-72'>
				<Image src='/img/empty.png' alt='Empty' fill />
			</div>

			<p className='text-center text-sm text-muted-foreground'>{label}</p>
		</div>
	)
}
