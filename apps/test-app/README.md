# @acme/test-app

Next.js customer-facing application for testing tRPC integration and authentication.

## Overview

This app serves as a customer-facing application and testing ground. It:
- Demonstrates direct tRPC usage without Refine
- Implements SlashID authentication
- Shows data from the API (clinics, treatments)
- Provides login/logout functionality

## Tech Stack

- **Framework**: Next.js 15.1.3 (App Router)
- **UI Library**: React 19
- **API Client**: tRPC + React Query
- **Authentication**: SlashID
- **Styling**: Tailwind CSS 4.0.0
- **Components**: shadcn/ui (Radix UI)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with providers
│   ├── page.tsx         # Home page
│   ├── login/
│   │   └── page.tsx     # Login page
│   └── logout/
│       └── page.tsx     # Logout page
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── data-display.tsx # Data display components
│   └── providers.tsx    # tRPC + React Query providers
├── lib/
│   └── trpc.ts          # tRPC client setup
└── styles/
    └── globals.css      # Tailwind CSS
```

## How It Works

### tRPC Client Setup

```typescript
// src/lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import type { AppRouter } from '@acme/api-contract'

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_API_URL}/trpc`,
      transformer: superjson,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include', // Include cookies for auth
        })
      },
    }),
  ],
})
```

### Provider Setup

```typescript
// src/components/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc, trpcClient } from '@/lib/trpc'
import { SlashIDProvider } from '@slashid/react'

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SlashIDProvider oid={process.env.NEXT_PUBLIC_SLASHID_ORG_ID}>
          {children}
        </SlashIDProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
```

### Using tRPC Hooks

```typescript
// In any component
import { trpc } from '@/lib/trpc'

export function ClinicsDisplay() {
  const { data: clinics, isLoading, error } = trpc.clinic.list.useQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {clinics?.map((clinic) => (
        <li key={clinic.id}>{clinic.name}</li>
      ))}
    </ul>
  )
}
```

## Development

### Running the App

```bash
# From monorepo root
pnpm --filter @acme/test-app dev

# Or start all apps
pnpm dev
```

The app runs on http://localhost:3001 by default.

### Environment Variables

Required in `.env`:

```env
# SlashID (client-side)
NEXT_PUBLIC_SLASHID_ORG_ID="your-org-id"

# API URL
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

## Pages

### Home (`/`)

Displays data from the API:
- List of clinics
- List of treatments

### Login (`/login`)

SlashID login form:
- Email input
- Magic link authentication
- Redirects to home after login

### Logout (`/logout`)

Handles logout:
- Clears SlashID session
- Redirects to login page

## Data Display Components

### ClinicsDisplay

Fetches and displays all clinics:

```typescript
export function ClinicsDisplay() {
  const { data: clinics, isLoading, error } = trpc.clinic.list.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinics</CardTitle>
        <CardDescription>Loaded via tRPC from API</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading clinics...</p>}
        {error && <p>Error: {error.message}</p>}
        {clinics?.map((clinic) => (
          <div key={clinic.id}>
            <span>{clinic.name}</span>
            <span>({clinic.code})</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
```

### TreatmentsDisplay

Fetches and displays all treatments with prices:

```typescript
export function TreatmentsDisplay() {
  const { data: treatments, isLoading, error } = trpc.treatment.list.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Treatments</CardTitle>
      </CardHeader>
      <CardContent>
        {treatments?.map((treatment) => (
          <div key={treatment.id}>
            <span>{treatment.name}</span>
            <span>${Number(treatment.price).toFixed(2)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
```

## Adding New Features

### Adding a New Page

1. Create the page file:

```typescript
// src/app/patients/page.tsx
'use client'

import { trpc } from '@/lib/trpc'

export default function PatientsPage() {
  const { data: patients } = trpc.patient.list.useQuery()

  return (
    <div>
      <h1>Patients</h1>
      {patients?.map((patient) => (
        <div key={patient.id}>{patient.name}</div>
      ))}
    </div>
  )
}
```

### Using Mutations

```typescript
'use client'

import { trpc } from '@/lib/trpc'

export function CreateClinicForm() {
  const utils = trpc.useUtils()
  const createClinic = trpc.clinic.create.useMutation({
    onSuccess: () => {
      // Invalidate cache to refetch list
      utils.clinic.list.invalidate()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    createClinic.mutate({
      name: formData.get('name') as string,
      code: formData.get('code') as string,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Clinic Name" />
      <input name="code" placeholder="Code" />
      <button type="submit" disabled={createClinic.isPending}>
        {createClinic.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
```

### Conditional Queries

```typescript
export function ClinicTreatments({ clinicId }: { clinicId?: string }) {
  const { data } = trpc.treatmentsByClinic.list.useQuery(
    { clinicId },
    { enabled: !!clinicId } // Only fetch when clinicId is provided
  )

  return (/* ... */)
}
```

## Building for Production

```bash
# Build the app
pnpm --filter @acme/test-app build

# Start production server
pnpm --filter @acme/test-app start
```

## Differences from Backoffice

| Aspect | Test App | Backoffice |
|--------|----------|------------|
| **Purpose** | Customer-facing | Admin panel |
| **Framework** | Next.js only | Next.js + Refine |
| **API Usage** | Direct tRPC hooks | Refine data provider |
| **Complexity** | Simpler | More features |
| **Mutations** | Manual handling | Refine handles |

## Dependencies

### Workspace Dependencies

- `@acme/api-contract` - tRPC router types
- `@acme/auth` - Authentication utilities

### Key External Dependencies

- `@trpc/client`, `@trpc/react-query` - tRPC client
- `@tanstack/react-query` - Data fetching
- `@slashid/react` - SlashID React SDK
- `@radix-ui/*` - UI primitives
- `tailwindcss` - Styling
