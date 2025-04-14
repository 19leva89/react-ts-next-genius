'use client'

import axios from 'axios'
import Image from 'next/image'
import { toast } from 'sonner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { DownloadIcon, ImageIcon } from 'lucide-react'

import {
	Button,
	Card,
	CardFooter,
	Form,
	FormControl,
	FormField,
	FormItem,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui'
import { userProModal } from '@/hooks/user-pro-modal'
import { Empty, Heading, Loader } from '@/components/shared'
import { amountOptions, formSchema, IFormSchema, resolutionOptions } from './_constants/constants'

const ImagePage = () => {
	const router = useRouter()

	const { onOpen } = userProModal()

	const [images, setImages] = useState<string[]>([])

	const form = useForm<IFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
			amount: '1',
			resolution: '512x512',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: IFormSchema) => {
		try {
			setImages([])

			const response = await axios.post('/api/image', values)
			const urls = response.data.map((image: { url: string }) => image.url)

			setImages(urls)

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
				title="Image Generation"
				description="Turn your prompt into an image"
				icon={ImageIcon}
				iconColor="text-pink-700"
				bgColor="bg-pink-700/10"
			/>

			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid grid-cols-20 gap-2 w-full p-4 px-3 md:px-6 border rounded-lg focus-within:shadow-sm"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-20 lg:col-span-8">
										<FormControl className="w-full m-0 p-0 px-2">
											<Input
												{...field}
												disabled={isLoading}
												placeholder="A picture of react developer"
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								name="amount"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-20 lg:col-span-4">
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl className="w-full">
												<SelectTrigger className="cursor-pointer">
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{amountOptions.map((option) => (
													<SelectItem key={option.value} value={option.value} className="cursor-pointer">
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<FormField
								name="resolution"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-20 lg:col-span-4">
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl className="w-full">
												<SelectTrigger className="cursor-pointer">
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{resolutionOptions.map((resolution) => (
													<SelectItem
														key={resolution.value}
														value={resolution.value}
														className="cursor-pointer"
													>
														{resolution.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								disabled={isLoading}
								className="col-span-20 lg:col-span-4 w-full cursor-pointer"
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>

				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-20">
							<Loader />
						</div>
					)}

					{images.length === 0 && !isLoading && <Empty label="No images generated" />}

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
						{images.map((src, index) => (
							<Card key={index} className="rounded-lg overflow-hidden">
								<div className="relative aspect-square">
									<Image src={src ?? ''} alt="Image" fill />
								</div>

								<CardFooter className="p-2">
									<Button
										variant="secondary"
										onClick={() => window.open(src)}
										className="w-full cursor-pointer"
									>
										<DownloadIcon className="size-4" />
										Download
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ImagePage
