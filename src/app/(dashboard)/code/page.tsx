'use client'

import axios from 'axios'
import ReactMarkdown from 'react-markdown'

import { toast } from 'sonner'
import { useState } from 'react'
import { CodeIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { ChatCompletionMessageParam } from 'openai/resources/chat/index.mjs'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { userProModal } from '@/hooks/user-pro-modal'
import { IFormSchema, formSchema } from './_constants/constants'
import { BotAvatar, Empty, Heading, Loader, UserAvatar } from '@/components/shared'
import { Button, Form, FormControl, FormField, FormItem, Input } from '@/components/ui'

const CodePage = () => {
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

			const response = await axios.post('/api/code', {
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
				title="Code Generation"
				description="Generate code using descriptive text"
				icon={CodeIcon}
				iconColor="text-green-700"
				bgColor="bg-green-700/10"
			/>

			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid grid-cols-12 gap-2 w-full p-4 px-3 md:px-6 border rounded-lg focus-within:shadow-sm "
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0 px-2">
											<Input
												{...field}
												disabled={isLoading}
												placeholder="Simple toggle button using react hooks"
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
						<div className="flex items-center justify-center w-full p-8 rounded-lg bg-[#fafafa]">
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
									msg.role === 'user' ? 'border border-black/10 bg-white' : 'bg-muted',
								)}
							>
								{msg.role === 'user' ? <UserAvatar /> : <BotAvatar />}

								<div className="text-sm overflow-hidden leading-7">
									<ReactMarkdown
										components={{
											pre: ({ node, children, ...props }) => (
												<div className="w-full rounded-lg overflow-auto bg-muted">
													<pre {...props}>{children}</pre>
												</div>
											),
											code({ node, className, children, ...props }) {
												const match = /language-(\w+)/.exec(className || '')

												return match ? (
													<div className="relative">
														<button
															onClick={() =>
																navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
															}
															className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-muted cursor-pointer hover:bg-muted/80"
														>
															Copy
														</button>

														<SyntaxHighlighter
															style={oneLight}
															language={match[1]}
															PreTag="div"
															className="px-2 py-1 rounded-lg overflow-auto"
															{...(props as any)}
														>
															{String(children).replace(/\n$/, '')}
														</SyntaxHighlighter>
													</div>
												) : (
													<code className="px-2 py-1 rounded-lg bg-muted dark:bg-gray-800" {...props}>
														{children}
													</code>
												)
											},
										}}
									>
										{(msg.content as string) || ''}
									</ReactMarkdown>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CodePage
