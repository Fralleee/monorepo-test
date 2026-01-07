# SlashID + Next.js Example

A minimal standalone app demonstrating SlashID authentication with cookie storage for both browser and server validation.

## Overview

This app is a reference implementation showing how to:
- Configure SlashID with cookie-based token storage
- Validate tokens on the server side
- Protect pages with authentication
- Handle login/logout flows

**Note**: This app is standalone and does not depend on other workspace packages. It serves as a reference for understanding the SlashID integration pattern used in the main apps.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19
- **Authentication**: SlashID

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with SlashIDProvider
│   ├── page.tsx         # Home page (protected)
│   └── login/
│       └── page.tsx     # Login page
├── components/
│   └── client-user.tsx  # Client-side user display
└── lib/
    └── auth.ts          # Server-side auth utilities
```

## How It Works

### Cookie-Based Token Storage

Unlike localStorage, cookies are sent with every request, allowing server-side validation:

```typescript
// src/app/layout.tsx
<SlashIDProvider
  oid={process.env.NEXT_PUBLIC_SLASHID_ORG_ID}
  tokenStorage="cookie"  // Store token in cookie, not localStorage
>
  {children}
</SlashIDProvider>
```

### Server-Side Validation

Server components can validate the SlashID cookie:

```typescript
// src/lib/auth.ts
import { cookies } from 'next/headers'
import { SSR } from '@slashid/slashid'

export async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get(`@slashid/USER_TOKEN/${orgId}`)?.value

  if (!token) return null

  const user = new SSR.User(token, { oid: orgId })
  const { valid } = await user.validateToken()

  return valid ? user : null
}
```

### Protected Pages

Pages can check authentication on the server:

```typescript
// src/app/page.tsx
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'

export default async function HomePage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return <div>Welcome, {user.ID}</div>
}
```

### Client Components

Client components use the `useSlashID` hook:

```typescript
// src/components/client-user.tsx
'use client'

import { useSlashID } from '@slashid/react'

export function ClientUser() {
  const { user, logOut } = useSlashID()

  if (!user) return null

  return (
    <div>
      <p>User ID: {user.ID}</p>
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}
```

## Setup

### 1. Install Dependencies

```bash
# From monorepo root
pnpm install
```

### 2. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SLASHID_ORG_ID=your-slashid-org-id
```

### 3. Start the App

```bash
pnpm --filter slashid-example dev
```

Open http://localhost:3002

## Key Concepts

### Token Storage Options

| Storage | Browser Access | Server Access | SSR Compatible |
|---------|---------------|---------------|----------------|
| `localStorage` | Yes | No | No |
| `cookie` | Yes | Yes | Yes |

This example uses `cookie` for SSR compatibility.

### Cookie Configuration

SlashID sets the cookie with:
- `HttpOnly: true` - Prevents XSS attacks
- `Secure: true` - HTTPS only in production
- `SameSite: lax` - CSRF protection

### Validation Flow

```
1. User logs in via SlashID form
       ↓
2. SlashID issues JWT token
       ↓
3. Token stored in HTTP-only cookie
       ↓
4. Page request sent to server
       ↓
5. Server reads cookie, validates with SlashID SSR
       ↓
6. If valid, render protected content
7. If invalid, redirect to login
```

## What This Demonstrates

1. **SlashIDProvider Configuration**
   - Using `tokenStorage="cookie"` instead of default localStorage
   - Proper organization ID configuration

2. **Server-Side Token Validation**
   - Reading cookies in server components
   - Using SlashID SSR SDK to validate tokens
   - Redirecting unauthenticated users

3. **Client-Side Integration**
   - Using `useSlashID` hook for user state
   - Implementing logout functionality

4. **Protected Routes**
   - Pattern for protecting pages
   - Combining server and client checks

## Differences from Main Apps

| Aspect | Example App | Main Apps |
|--------|-------------|-----------|
| **Dependencies** | Standalone | Uses workspace packages |
| **Auth Package** | Direct SlashID | `@acme/auth` wrapper |
| **Role Mapping** | None | Groups → Roles |
| **Database** | None | Prisma + ZenStack |

## Use Cases

Use this app as a reference when:
- Learning SlashID integration
- Debugging authentication issues
- Understanding the cookie flow
- Testing SlashID configuration changes

## Related Documentation

- [SlashID React SDK](https://developer.slashid.dev/docs/access/react)
- [SlashID SSR](https://developer.slashid.dev/docs/access/ssr)
- [Next.js App Router](https://nextjs.org/docs/app)
