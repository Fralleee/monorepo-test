'use client'

import { useSlashID } from '@slashid/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const { logOut } = useSlashID()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const handleLogout = async () => {
    await logOut()
    startTransition(() => router.replace('/login'))
  }

  return (
    <Button onClick={handleLogout} disabled={pending} variant="outline">
      {pending ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}
