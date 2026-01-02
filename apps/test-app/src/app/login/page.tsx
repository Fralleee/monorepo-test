'use client'

import { Form } from '@slashid/react'
import type { User } from '@slashid/slashid'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const redirectTo = searchParams.get('redirectTo') || '/'

	const handleSuccess = (_user: User) => {
		const target = redirectTo.startsWith('/') ? redirectTo : '/'
		router.replace(target)
	}

	return (
		<main className="container mx-auto flex min-h-screen max-w-md items-center justify-center p-8">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Sign in</CardTitle>
					<CardDescription>
						Use your email to sign in with SlashID. Tokens are stored in cookies for SSR support.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Form
						factors={[{ method: 'email_link' }]}
						onSuccess={handleSuccess}
						text={{
							'initial.title': 'Welcome',
							'initial.subtitle': 'Passwordless email login',
						}}
					/>

					<div className="text-center">
						<Button variant="ghost" asChild>
							<Link href="/">Back to home</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	)
}
