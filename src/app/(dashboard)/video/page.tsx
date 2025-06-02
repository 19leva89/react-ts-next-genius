'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { useState } from 'react'
import { VideoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { userProModal } from '@/hooks/user-pro-modal'
import { Empty, Heading, Loader } from '@/components/shared'
import { IFormSchema, formSchema } from './_constants/form-schema'
import { Button, Form, FormControl, FormField, FormItem, Input } from '@/components/ui'

const VideoPage = () => {
	const router = useRouter()

	const { onOpen } = userProModal()

	const [videoUrl, setVideoUrl] = useState<string>()

	const form = useForm<IFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: IFormSchema) => {
		try {
			setVideoUrl(undefined)

			const response = await axios.post('/api/video', values)

			setVideoUrl(response.data.video)

			form.reset()
		} catch (error: any) {
			if (error?.response?.status === 403) {
				onOpen() // open pro modal
			} else {
				toast.error('Something went wrong')
			}
		} finally {
			router.refresh()
		}
	}

	return (
		<div>
			<Heading
				title='Video Generation'
				description='Turn your prompt into video'
				icon={VideoIcon}
				iconColor='text-orange-700'
				bgColor='bg-orange-700/10'
			/>

			<div className='px-4 lg:px-8'>
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6'
						>
							<FormField
								name='prompt'
								render={({ field }) => (
									<FormItem className='col-span-12 lg:col-span-10'>
										<FormControl className='m-0 p-0 px-2'>
											<Input
												{...field}
												disabled={isLoading}
												placeholder='Clown fish swimming around a coral reef'
												className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button
								type='submit'
								disabled={isLoading}
								className='col-span-12 w-full cursor-pointer lg:col-span-2'
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>

				<div className='mt-4 space-y-4'>
					{isLoading && (
						<div className='flex w-full items-center justify-center rounded-lg bg-muted p-8'>
							<Loader />
						</div>
					)}

					{!videoUrl && !isLoading && <Empty label='No video generated' />}

					{videoUrl && (
						<video controls className='mt-8 aspect-video w-full rounded-lg border bg-black'>
							<source src={videoUrl} />
						</video>
					)}
				</div>
			</div>
		</div>
	)
}

export default VideoPage
