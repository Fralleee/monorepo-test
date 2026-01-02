'use client'

import type { ReactNode } from 'react'
import { useSlashID } from '@slashid/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Sidebar } from './sidebar'

type AuthenticatedLayoutProps = {
	children: ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
	const { isAuthenticated, sdkState } = useSlashID()
	const router = useRouter()

	useEffect(() => {
		if (sdkState === 'ready' && !isAuthenticated) {
			router.replace('/login')
		}
	}, [isAuthenticated, sdkState, router])

	if (sdkState !== 'ready') {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-muted-foreground">Loading...</div>
			</div>
		)
	}

	if (!isAuthenticated) {
		return null
	}

	return (
		<div className="flex h-screen">
			<Sidebar />
			<main className="flex-1 overflow-auto p-6">{children}</main>
		</div>
	)
}
