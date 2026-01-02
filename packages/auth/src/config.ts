import type { SessionConfig } from './types'

const COOKIE_PREFIX = '@slashid/USER_TOKEN'

export function getDefaultConfig(): SessionConfig {
  const orgId = process.env.SLASHID_ORG_ID ?? process.env.NEXT_PUBLIC_SLASHID_ORG_ID
  const cookieSecret = process.env.SESSION_COOKIE_SECRET

  if (!orgId) {
    throw new Error('SLASHID_ORG_ID or NEXT_PUBLIC_SLASHID_ORG_ID must be set')
  }

  if (!cookieSecret) {
    throw new Error('SESSION_COOKIE_SECRET must be set')
  }

  return {
    orgId,
    cookieSecret,
    cookieName: `${COOKIE_PREFIX}/${orgId}`,
    secureCookie: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  }
}

export function getCookieName(orgId?: string): string {
  const oid = orgId ?? process.env.SLASHID_ORG_ID ?? process.env.NEXT_PUBLIC_SLASHID_ORG_ID
  if (!oid) {
    throw new Error('SLASHID_ORG_ID or NEXT_PUBLIC_SLASHID_ORG_ID must be set')
  }
  return `${COOKIE_PREFIX}/${oid}`
}
