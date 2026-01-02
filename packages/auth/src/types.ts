export type UserRole = 'USER' | 'ADMIN' | 'SUPPORT'

export type SessionUser = {
  id: string
  token: string
  email?: string
  groups: string[]
  role: UserRole
}

export type SessionConfig = {
  orgId: string
  cookieSecret: string
  cookieName?: string
  secureCookie?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}
