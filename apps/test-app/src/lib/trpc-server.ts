import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@acme/api-contract'
import superjson from 'superjson'
import { cookies } from 'next/headers'
import { getCookieName } from '@acme/auth'

function getApiUrl() {
  return process.env.API_URL ?? 'http://localhost:4000'
}

export async function createServerTrpcClient() {
  const cookieStore = await cookies()
  const cookieName = getCookieName()
  const token = cookieStore.get(cookieName)?.value

  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${getApiUrl()}/trpc`,
        transformer: superjson,
        headers() {
          if (token) {
            return {
              cookie: `${cookieName}=${token}`,
            }
          }
          return {}
        },
      }),
    ],
  })
}
