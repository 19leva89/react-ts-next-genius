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
			return new NextResponse('Prompt are required', { status: 400 })
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
			version: '9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
			input: {
				prompt,
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

		return NextResponse.json({ video: result.output[0] })
	} catch (error) {
		console.log('[VIDEO_ERROR]', error)

		return new NextResponse('Internal error', { status: 500 })
	}
}
