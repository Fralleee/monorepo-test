import { SSR } from '@slashid/slashid'
import { cookies } from 'next/headers'

export type SessionUser = {
	id: string
	token: string
	groups: string[]
}

const COOKIE_PREFIX = '@slashid/USER_TOKEN'

function requireOrgId(): string {
	const orgId = process.env.NEXT_PUBLIC_SLASHID_ORG_ID
	if (!orgId) {
		throw new Error('NEXT_PUBLIC_SLASHID_ORG_ID must be set.')
	}
	return orgId
}

export function getCookieName(): string {
	return `${COOKIE_PREFIX}/${requireOrgId()}`
}

export async function getTokenFromCookies(): Promise<string | null> {
	const cookieStore = await cookies()
	const value = cookieStore.get(getCookieName())
	return value?.value ?? null
}

/** @knipignore */
export async function getUserFromToken(token: string): Promise<SessionUser | null> {
	const orgId = requireOrgId()
	const user = new SSR.User(token, { oid: orgId })

	const state = await user.validateToken()
	if (!state.valid) {
		return null
	}

	return {
		id: user.ID,
		token,
		groups: user.getGroups(),
	}
}

export async function getServerUser(): Promise<SessionUser | null> {
	const token = await getTokenFromCookies()
	if (!token) {
		return null
	}

	return getUserFromToken(token)
}
