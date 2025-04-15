import Replicate from 'replicate'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { checkSubscription } from '@/lib/subscription'
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'

export const maxDuration = 60

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(req: NextRequest) {
	try {
		const { userId } = await auth()
		const body = await req.json()
		const { prompt } = body

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

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

		// Create prediction
		const prediction = await replicate.predictions.create({
			version: '8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
			input: {
				prompt_b: prompt,
				denoising: 0.75,
				duration: 10,
			},
		})

		if (!prediction?.id) {
			return new NextResponse('Failed to create prediction', { status: 500 })
		}

		// Poll until status is 'succeeded'
		let result = prediction
		let attempts = 0

		while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < 180) {
			await new Promise((res) => setTimeout(res, 1000)) // 1s delay

			result = await replicate.predictions.get(result.id)
			attempts++
		}

		if (result.status !== 'succeeded' || !result.output) {
			return new NextResponse('Prediction failed', { status: 500 })
		}

		if (!isPro) await increaseApiLimit()

		return NextResponse.json({ audio: result.output.audio })
	} catch (error) {
		console.log('[MUSIC_ERROR]', error)

		return new NextResponse('Internal error', { status: 500 })
	}
}
