# @acme/backoffice

Next.js admin panel built with Refine.dev for managing clinics, treatments, and other resources.

## Overview

This app provides an admin interface for managing the CRM data. It:
- Uses Refine.dev for rapid admin UI development
- Connects to the API via tRPC with full type safety
- Authenticates users via SlashID
- Provides CRUD operations for all resources

## Tech Stack

- **Framework**: Next.js 15.1.3 (App Router)
- **UI Library**: React 19
- **Admin Framework**: Refine.dev 5.0.0
- **API Client**: tRPC + React Query
- **Authentication**: SlashID
- **Styling**: Tailwind CSS 4.0.0
- **Components**: shadcn/ui (Radix UI)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with Refine provider
│   ├── page.tsx             # Dashboard/home page
│   ├── login/
│   │   └── page.tsx         # Login page with SlashID
│   ├── clinics/
│   │   ├── page.tsx         # Clinic list
│   │   └── create/page.tsx  # Create clinic
│   ├── treatments/
│   │   ├── page.tsx         # Treatment list
│   │   └── create/page.tsx  # Create treatment
│   └── treatments-by-clinic/
│       ├── page.tsx         # Junction table list
│       └── create/page.tsx  # Assign treatment to clinic
├── components/
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── trpc.ts              # tRPC client setup
│   ├── data-provider.ts     # Refine data provider (tRPC)
│   └── auth-provider.ts     # Refine auth provider (SlashID)
└── styles/
    └── globals.css          # Tailwind CSS
```

## How It Works

### Refine Integration

Refine provides the admin framework with:
- Resource definitions (CRUD routes)
- Data provider abstraction
- Auth provider abstraction
- Built-in hooks for data fetching

```typescript
// src/app/layout.tsx
<Refine
  dataProvider={dataProvider}
  authProvider={authProvider}
  resources={[
    {
      name: 'clinics',
      list: '/clinics',
      create: '/clinics/create',
      edit: '/clinics/edit/:id',
      show: '/clinics/show/:id',
      meta: { label: 'Clinics' },
    },
    // ... more resources
  ]}
>
```

### Custom Data Provider

The data provider translates Refine actions to tRPC calls:

```typescript
// src/lib/data-provider.ts
export const dataProvider: DataProvider = {
  getList: async ({ resource }) => {
    const data = await trpcClient[resource].list.query()
    return { data, total: data.length }
  },

  getOne: async ({ resource, id }) => {
    const data = await trpcClient[resource].byId.query({ id })
    return { data }
  },

  create: async ({ resource, variables }) => {
    const data = await trpcClient[resource].create.mutate(variables)
    return { data }
  },

  // ... update, delete, etc.
}
```

### Custom Auth Provider

The auth provider integrates SlashID:

```typescript
// src/lib/auth-provider.ts
export const authProvider: AuthProvider = {
  check: async () => {
    const user = await getUser()
    return user ? { authenticated: true } : { authenticated: false }
  },

  getIdentity: async () => {
    const user = await getUser()
    return user
  },

  logout: async () => {
    await logOut()
    return { success: true }
  },
}
```

## Development

### Running the App

```bash
# From monorepo root
pnpm --filter @acme/backoffice dev

# Or start all apps
pnpm dev
```

The app runs on http://localhost:3000 by default.

### Environment Variables

Required in `.env`:

```env
# SlashID (client-side)
NEXT_PUBLIC_SLASHID_ORG_ID="your-org-id"

# API URL
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

## Pages

### Dashboard (`/`)

Home page showing overview or redirecting to default resource.

### Login (`/login`)

SlashID login form with email magic link authentication.

### Clinics (`/clinics`)

| Route | Purpose |
|-------|---------|
| `/clinics` | List all clinics |
| `/clinics/create` | Create new clinic |
| `/clinics/edit/:id` | Edit clinic |
| `/clinics/show/:id` | View clinic details |

### Treatments (`/treatments`)

| Route | Purpose |
|-------|---------|
| `/treatments` | List all treatments |
| `/treatments/create` | Create new treatment |
| `/treatments/edit/:id` | Edit treatment |
| `/treatments/show/:id` | View treatment details |

### Treatments by Clinic (`/treatments-by-clinic`)

Manages the many-to-many relationship with price overrides.

| Route | Purpose |
|-------|---------|
| `/treatments-by-clinic` | List clinic-treatment assignments |
| `/treatments-by-clinic/create` | Assign treatment to clinic |

## Adding a New Resource

### 1. Add Resource Configuration

Edit `src/app/layout.tsx`:

```typescript
resources={[
  // ... existing resources
  {
    name: 'patients',
    list: '/patients',
    create: '/patients/create',
    edit: '/patients/edit/:id',
    show: '/patients/show/:id',
    meta: { label: 'Patients' },
  },
]}
```

### 2. Create List Page

Create `src/app/patients/page.tsx`:

```typescript
'use client'

import { useList } from '@refinedev/core'
import Link from 'next/link'

export default function PatientList() {
  const { data, isLoading } = useList({ resource: 'patients' })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Patients</h1>
      <Link href="/patients/create">Create Patient</Link>
      <ul>
        {data?.data.map((patient) => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### 3. Create Form Page

Create `src/app/patients/create/page.tsx`:

```typescript
'use client'

import { useForm } from '@refinedev/react-hook-form'
import { useCreate } from '@refinedev/core'

export default function CreatePatient() {
  const { register, handleSubmit } = useForm()
  const { mutate } = useCreate()

  const onSubmit = (data) => {
    mutate({ resource: 'patients', values: data })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      <input {...register('email')} placeholder="Email" />
      <button type="submit">Create</button>
    </form>
  )
}
```

## Using Refine Hooks

### Data Fetching

```typescript
// List resources
const { data, isLoading } = useList({ resource: 'clinics' })

// Get single resource
const { data } = useOne({ resource: 'clinics', id: 'clinic-id' })

// With filters
const { data } = useList({
  resource: 'patients',
  filters: [{ field: 'clinicId', operator: 'eq', value: selectedClinicId }],
})
```

### Mutations

```typescript
// Create
const { mutate: create } = useCreate()
create({ resource: 'clinics', values: { name: 'New Clinic', code: 'NC' } })

// Update
const { mutate: update } = useUpdate()
update({ resource: 'clinics', id: 'clinic-id', values: { name: 'Updated' } })

// Delete
const { mutate: remove } = useDelete()
remove({ resource: 'clinics', id: 'clinic-id' })
```

### Navigation

```typescript
import { useNavigation } from '@refinedev/core'

const { list, create, edit, show, push } = useNavigation()

// Navigate to list
list('clinics')

// Navigate to create
create('clinics')

// Navigate to edit
edit('clinics', 'clinic-id')
```

## Building for Production

```bash
# Build the app
pnpm --filter @acme/backoffice build

# Start production server
pnpm --filter @acme/backoffice start
```

## Dependencies

### Workspace Dependencies

- `@acme/api-contract` - tRPC router types
- `@acme/auth` - Authentication utilities

### Key External Dependencies

- `@refinedev/core` - Refine core hooks
- `@refinedev/react-hook-form` - Form handling
- `@trpc/client`, `@trpc/react-query` - tRPC client
- `@tanstack/react-query` - Data fetching
- `@slashid/react` - SlashID React SDK
- `@radix-ui/*` - UI primitives
- `tailwindcss` - Styling
