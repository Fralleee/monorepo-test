import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getTokenFromCookies } from '@/lib/auth'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Backoffice - Acme CRM',
  description: 'Internal backoffice for Acme CRM management',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const initialToken = await getTokenFromCookies()

  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <Providers initialToken={initialToken}>{children}</Providers>
      </body>
    </html>
  )
}
