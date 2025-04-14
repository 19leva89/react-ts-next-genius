import OpenAI from 'openai'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { checkSubscription } from '@/lib/subscription'
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'

const configuration = {
	apiKey: process.env.OPENAI_API_KEY,
}

const openai = new OpenAI(configuration)

export async function POST(req: NextRequest) {
	try {
		const { userId } = await auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!configuration.apiKey) {
			return new NextResponse('OpenAI API Key not configured', { status: 500 })
		}

		// Check if request has body
		if (!req.body) {
			return new NextResponse('Request body is required', { status: 400 })
		}

		let body
		try {
			body = await req.json()
		} catch (error) {
			return new NextResponse('Invalid JSON format', { status: 400 })
		}

		const { prompt, amount = 1, resolution = '512x512' } = body

		if (!prompt) {
			return new NextResponse('Prompt is required', { status: 400 })
		}

		const freeTrial = await checkApiLimit()
		const isPro = await checkSubscription()

		if (!freeTrial && !isPro) {
			return new NextResponse('You have reached your free trial limit', {
				status: 403,
			})
		}

		const response = await openai.images.generate({
			prompt,
			n: parseInt(amount),
			size: resolution,
		})

		if (!isPro) {
			await increaseApiLimit()
		}

		return NextResponse.json(response.data)
	} catch (error) {
		console.log('[IMAGE_ERROR]', error)

		return new NextResponse('Internal error', { status: 500 })
	}
}
