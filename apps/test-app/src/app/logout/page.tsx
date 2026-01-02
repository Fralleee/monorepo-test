'use client'

import { useSlashID } from '@slashid/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LogoutPage() {
  const { logOut } = useSlashID()
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      await logOut()
      router.replace('/login')
    }
    performLogout()
  }, [logOut, router])

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center p-8">
      <p className="text-muted-foreground">Signing out...</p>
    </main>
  )
}
