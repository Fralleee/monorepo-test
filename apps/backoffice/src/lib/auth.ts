import { cookies } from 'next/headers'
import { verifyToken, getCookieName } from '@acme/auth'
import type { SessionUser } from '@acme/auth'

/** @knipignore */
export { getCookieName } from '@acme/auth'
/** @knipignore */
export type { SessionUser } from '@acme/auth'

export async function getTokenFromCookies(): Promise<string | null> {
	const cookieStore = await cookies()
	const cookieName = getCookieName()
	const value = cookieStore.get(cookieName)
	return value?.value ?? null
}

/** @knipignore */
export async function getServerUser(): Promise<SessionUser | null> {
	const token = await getTokenFromCookies()
	if (!token) {
		return null
	}
	return verifyToken(token)
}
