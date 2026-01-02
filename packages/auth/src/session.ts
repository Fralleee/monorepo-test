import { SSR } from '@slashid/slashid'
import { getCookieName } from './config.js'
import type { SessionUser, UserRole } from './types.js'

function deriveRoleFromGroups(groups: string[]): UserRole {
  if (groups.includes('admin') || groups.includes('ADMIN')) {
    return 'ADMIN'
  }
  if (groups.includes('support') || groups.includes('SUPPORT')) {
    return 'SUPPORT'
  }
  return 'USER'
}

export async function verifyToken(
  token: string,
  orgId?: string,
): Promise<SessionUser | null> {
  const oid = orgId ?? process.env.SLASHID_ORG_ID ?? process.env.NEXT_PUBLIC_SLASHID_ORG_ID

  if (!oid) {
    throw new Error('SLASHID_ORG_ID or NEXT_PUBLIC_SLASHID_ORG_ID must be set')
  }

  try {
    const user = new SSR.User(token, { oid })
    const state = await user.validateToken()

    if (!state.valid) {
      return null
    }

    const groups = user.getGroups()

    return {
      id: user.ID,
      token,
      groups,
      role: deriveRoleFromGroups(groups),
    }
  } catch {
    return null
  }
}

export function extractTokenFromCookieHeader(
  cookieHeader: string | null | undefined,
  orgId?: string,
): string | null {
  if (!cookieHeader) {
    return null
  }

  const cookieName = getCookieName(orgId)
  const cookies = cookieHeader.split(';').map((c) => c.trim())

  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.split('=')
    if (name === cookieName) {
      return valueParts.join('=') || null
    }
  }

  return null
}

export async function getSessionFromCookieHeader(
  cookieHeader: string | null | undefined,
  orgId?: string,
): Promise<SessionUser | null> {
  const token = extractTokenFromCookieHeader(cookieHeader, orgId)

  if (!token) {
    return null
  }

  return verifyToken(token, orgId)
}
