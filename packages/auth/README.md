# @acme/auth

SlashID authentication utilities and session management for the Acme CRM monorepo.

## Overview

This package provides authentication utilities that:
- Verify SlashID JWT tokens
- Extract sessions from cookies
- Map SlashID groups to application roles
- Export shared types for session management

## Tech Stack

- **Authentication Provider**: SlashID
- **Token Format**: JWT
- **Server SDK**: `@slashid/slashid` SSR

## Project Structure

```
src/
├── index.ts         # Main exports
├── types.ts         # Type definitions
├── config.ts        # Configuration utilities
├── session.ts       # Session management
└── react/
    └── index.ts     # React utilities exports
```

## Types

### UserRole

```typescript
export type UserRole = 'USER' | 'ADMIN' | 'SUPPORT'
```

### SessionUser

```typescript
export interface SessionUser {
  id: string           // SlashID user ID
  token: string        // JWT token
  email?: string       // User email (if available)
  groups: string[]     // SlashID groups
  role: UserRole       // Derived application role
}
```

### SessionConfig

```typescript
export interface SessionConfig {
  cookieName: string
  secret?: string
  secure: boolean
  sameSite: 'strict' | 'lax' | 'none'
  maxAge: number
}
```

## Key Functions

### verifyToken

Validates a SlashID JWT token:

```typescript
import { verifyToken } from '@acme/auth'

const session = await verifyToken(token, orgId)
// Returns SessionUser or null if invalid
```

**Implementation:**

```typescript
export async function verifyToken(
  token: string,
  orgId?: string
): Promise<SessionUser | null> {
  const oid = orgId ?? process.env.SLASHID_ORG_ID

  if (!oid) {
    throw new Error('SLASHID_ORG_ID must be set')
  }

  try {
    const user = new SSR.User(token, { oid })
    const { valid } = await user.validateToken()

    if (!valid) return null

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
```

### getSessionFromCookieHeader

Extracts and validates session from HTTP cookie header:

```typescript
import { getSessionFromCookieHeader } from '@acme/auth'

// In API middleware
const session = await getSessionFromCookieHeader(req.headers.cookie)
```

**Implementation:**

```typescript
export async function getSessionFromCookieHeader(
  cookieHeader: string | null | undefined,
  orgId?: string
): Promise<SessionUser | null> {
  const token = extractTokenFromCookieHeader(cookieHeader, orgId)

  if (!token) return null

  return verifyToken(token, orgId)
}
```

### extractTokenFromCookieHeader

Parses the token from a cookie header string:

```typescript
export function extractTokenFromCookieHeader(
  cookieHeader: string | null | undefined,
  orgId?: string
): string | null {
  if (!cookieHeader) return null

  const cookieName = getCookieName(orgId)
  const cookies = cookieHeader.split(';').map(c => c.trim())

  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.split('=')
    if (name === cookieName) {
      return valueParts.join('=') || null
    }
  }

  return null
}
```

### deriveRoleFromGroups

Maps SlashID groups to application roles:

```typescript
function deriveRoleFromGroups(groups: string[]): UserRole {
  if (groups.includes('internal_users')) return 'ADMIN'
  // Add more group mappings as needed
  return 'USER'
}
```

### getCookieName

Returns the SlashID cookie name:

```typescript
export function getCookieName(orgId?: string): string {
  const oid = orgId ?? process.env.SLASHID_ORG_ID
  return `@slashid/USER_TOKEN/${oid}`
}
```

### getDefaultConfig

Returns default session configuration:

```typescript
export function getDefaultConfig(orgId?: string): SessionConfig {
  return {
    cookieName: getCookieName(orgId),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  }
}
```

## Usage

### In NestJS API

```typescript
// apps/api/src/trpc/trpc.middleware.ts
import { getSessionFromCookieHeader, createDb } from '@acme/auth'

@Injectable()
export class TrpcMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    return createExpressMiddleware({
      router: appRouter,
      createContext: async ({ req }) => {
        const session = await getSessionFromCookieHeader(req.headers.cookie)
        const db = createDb(session)
        return { session, db }
      },
    })(req, res, next)
  }
}
```

### In Next.js Server Components

```typescript
// apps/test-app/src/lib/auth.ts
import { cookies } from 'next/headers'
import { verifyToken, getCookieName } from '@acme/auth'

export async function getServerSession() {
  const cookieStore = cookies()
  const token = cookieStore.get(getCookieName())?.value

  if (!token) return null

  return verifyToken(token)
}
```

### Type Usage

```typescript
import type { SessionUser, UserRole } from '@acme/auth'

function checkPermission(session: SessionUser | null): boolean {
  return session?.role === 'ADMIN'
}
```

## Role Mapping

The package maps SlashID groups to application roles:

| SlashID Group | Application Role |
|---------------|------------------|
| `internal_users` | ADMIN |
| (default) | USER |

### Adding a New Role

1. Update the UserRole type:

```typescript
// src/types.ts
export type UserRole = 'USER' | 'ADMIN' | 'SUPPORT' | 'MANAGER'
```

2. Update the group mapping:

```typescript
// src/session.ts
function deriveRoleFromGroups(groups: string[]): UserRole {
  if (groups.includes('internal_users')) return 'ADMIN'
  if (groups.includes('support_team')) return 'SUPPORT'
  if (groups.includes('managers')) return 'MANAGER'
  return 'USER'
}
```

## Cookie Format

SlashID stores the JWT in a cookie with this format:

```
@slashid/USER_TOKEN/{orgId}=<jwt-token>
```

Cookie attributes:
- `HttpOnly: true` - Prevents JavaScript access (XSS protection)
- `Secure: true` - HTTPS only in production
- `SameSite: lax` - Sent with navigation, not cross-site requests

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SLASHID_ORG_ID` | Yes | SlashID organization ID (server) |
| `NEXT_PUBLIC_SLASHID_ORG_ID` | Yes | SlashID org ID (client) |
| `SESSION_COOKIE_SECRET` | Optional | Secret for additional signing |
| `NODE_ENV` | No | Affects cookie security settings |

## Exports

### Main Export

```typescript
// Types
export type { UserRole, SessionUser, SessionConfig } from './types'

// Functions
export { verifyToken, getSessionFromCookieHeader, extractTokenFromCookieHeader } from './session'
export { getCookieName, getDefaultConfig } from './config'
```

### React Export (`./react`)

```typescript
// Re-exports for client-side usage
export { SlashIDProvider, useSlashID } from '@slashid/react'
```

## Dependencies

### External Dependencies

- `@slashid/slashid` - SlashID SSR SDK for token validation

### Peer Dependencies (for React)

- `@slashid/react` - SlashID React SDK
