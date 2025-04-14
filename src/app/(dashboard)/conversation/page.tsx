'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MessageSquare } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ChatCompletionMessageParam } from 'openai/resources/chat/index'

import { cn } from '@/lib/utils'
import { userProModal } from '@/hooks/user-pro-modal'
import { IFormSchema, formSchema } from './_constants/constants'
import { BotAvatar, Empty, Heading, Loader, UserAvatar } from '@/components/shared'
import { Button, Form, FormControl, FormField, FormItem, Input } from '@/components/ui'

const ConversationPage = () => {
	const router = useRouter()

	const { onOpen } = userProModal()

	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])

	const form = useForm<IFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: IFormSchema) => {
		try {
			const userMessage: ChatCompletionMessageParam = {
				role: 'user',
				content: values.prompt,
			}
			const newMessages = [...messages, userMessage]

			const response = await axios.post('/api/conversation', {
				messages: newMessages,
			})

			setMessages((current) => [...current, userMessage, response.data])

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
				title="Conversation"
				description="Our most advanced conversation model"
				icon={MessageSquare}
				iconColor="text-violet-500"
				bgColor="bg-violet-500/10"
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
										<FormControl className="m-0 p-0">
											<Input
												{...field}
												disabled={isLoading}
												placeholder="How do I calculate the radius of a circle?"
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

					{messages.length === 0 && !isLoading && <Empty label="No conversation started" />}

					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((msg, index) => (
							<div
								key={`${msg.role}-${index}`}
								className={cn(
									'flex items-start gap-x-8 w-full p-8 rounded-lg',
									msg.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted',
								)}
							>
								{msg.role === 'user' ? <UserAvatar /> : <BotAvatar />}

								<p className="text-sm">{msg.content as string}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConversationPage
