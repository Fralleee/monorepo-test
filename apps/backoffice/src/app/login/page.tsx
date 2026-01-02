'use client'

import { Form } from '@slashid/react'
import type { User } from '@slashid/slashid'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'

  const handleSuccess = (_user: User) => {
    const target = redirectTo.startsWith('/') ? redirectTo : '/'
    router.replace(target)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Acme Backoffice</CardTitle>
          <CardDescription>
            Internal administration panel. Sign in with your SlashID account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            factors={[{ method: 'email_link' }]}
            onSuccess={handleSuccess}
            text={{
              'initial.title': 'Admin Sign In',
              'initial.subtitle': 'Use your company email',
            }}
          />
        </CardContent>
      </Card>
    </main>
  )
}
