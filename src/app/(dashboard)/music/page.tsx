'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { useState } from 'react'
import { MusicIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { userProModal } from '@/hooks/user-pro-modal'
import { Empty, Heading, Loader } from '@/components/shared'
import { IFormSchema, formSchema } from './_constants/constants'
import { Button, Form, FormControl, FormField, FormItem, Input } from '@/components/ui'

const MusicPage = () => {
	const router = useRouter()

	const { onOpen } = userProModal()

	const [musicUrl, setMusicUrl] = useState<string>()

	const form = useForm<IFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: IFormSchema) => {
		try {
			setMusicUrl(undefined)

			const response = await axios.post('/api/music', values)

			setMusicUrl(response.data.audio)

			// form.reset()
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
				title="Music Generation"
				description="Turn your prompt into music"
				icon={MusicIcon}
				iconColor="text-emerald-500"
				bgColor="bg-emerald-500/10"
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
												placeholder="Piano solo"
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

					{!musicUrl && !isLoading && <Empty label="No music generated" />}

					{musicUrl && (
						<audio controls className="w-full mt-8">
							<source src={musicUrl} />
						</audio>
					)}
				</div>
			</div>
		</div>
	)
}

export default MusicPage
