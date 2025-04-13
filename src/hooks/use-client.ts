'use client'

import { useEffect, useState } from 'react'

export const useClient = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => setIsMounted(true), [])

	return { isMounted }
}
