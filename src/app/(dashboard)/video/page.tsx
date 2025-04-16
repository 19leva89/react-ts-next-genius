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
				title="Video Generation"
				description="Turn your prompt into video"
				icon={VideoIcon}
				iconColor="text-orange-700"
				bgColor="bg-orange-700/10"
			/>

			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid grid-cols-12 gap-2 w-full p-4 px-3 md:px-6 border rounded-lg focus-within:shadow-sm"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0 px-2">
											<Input
												{...field}
												disabled={isLoading}
												placeholder="Clown fish swimming around a coral reef"
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								disabled={isLoading}
								className="col-span-12 lg:col-span-2 w-full cursor-pointer"
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>

				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
							<Loader />
						</div>
					)}

					{!videoUrl && !isLoading && <Empty label="No video generated" />}

					{videoUrl && (
						<video controls className="w-full mt-8 border rounded-lg aspect-video bg-black">
							<source src={videoUrl} />
						</video>
					)}
				</div>
			</div>
		</div>
	)
}

export default VideoPage
