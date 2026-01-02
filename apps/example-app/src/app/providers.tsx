'use client'

import '@slashid/react/style.css'
import type { ReactNode } from 'react'
import { SlashIDProvider } from '@slashid/react'

type ProvidersProps = {
	children: ReactNode
	initialToken?: string | null
}

export function Providers({ children, initialToken }: ProvidersProps) {
	const orgId = process.env.NEXT_PUBLIC_SLASHID_ORG_ID

	if (!orgId) {
		throw new Error('NEXT_PUBLIC_SLASHID_ORG_ID is required for SlashID.')
	}

	return (
		<SlashIDProvider oid={orgId} tokenStorage="cookie" initialToken={initialToken ?? undefined}>
			{children}
		</SlashIDProvider>
	)
}
