'use client'

import { ProModal } from '@/components/shared'
import { useClient } from '@/hooks/use-client'

export const ModalProvider = () => {
	const { isMounted } = useClient()

	if (!isMounted) {
		return null
	}

	return <ProModal />
}
