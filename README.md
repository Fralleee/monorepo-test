# Acme CRM Monorepo

A full-stack TypeScript monorepo with end-to-end type safety, featuring a NestJS API, Next.js applications, and shared workspace packages.

## Architecture Overview

```
monorepo/
├── apps/
│   ├── api/              # NestJS backend API (Port 4000)
│   ├── backoffice/       # Next.js admin panel with Refine (Port 3000)
│   ├── test-app/         # Next.js customer-facing app (Port 3001)
│   └── example-app/      # SlashID reference implementation (Port 3002)
├── packages/
│   ├── api-contract/     # tRPC router definitions and types
│   ├── auth/             # SlashID authentication utilities
│   ├── db/               # Prisma + ZenStack database layer
│   └── config/           # Shared TypeScript configurations
└── turbo.json            # Turborepo pipeline configuration
```

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Monorepo | [Turborepo](https://turbo.build/repo) | 2.3.3 | Build system and task orchestration |
| Package Manager | [pnpm](https://pnpm.io/) | 9.15.1 | Fast, disk-efficient package manager |
| Backend | [NestJS](https://nestjs.com/) | 10.4.15 | Enterprise Node.js framework |
| API Protocol | [tRPC](https://trpc.io/) | 11.0.0-rc.660 | End-to-end typesafe APIs |
| Frontend | [Next.js](https://nextjs.org/) | 15.1.3 | React framework with App Router |
| UI Library | [React](https://react.dev/) | 19.0.0 | Component-based UI library |
| Admin UI | [Refine.dev](https://refine.dev/) | 5.0.0 | React admin panel framework |
| Database ORM | [Prisma](https://www.prisma.io/) | 6.1.0 | Type-safe database client |
| Access Control | [ZenStack](https://zenstack.dev/) | 2.10.2 | Authorization layer for Prisma |
| Authentication | [SlashID](https://slashid.dev/) | 3.29.6 | Passwordless authentication |
| Data Fetching | [React Query](https://tanstack.com/query) | 5.62.8 | Server state management |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | 4.0.0 | Utility-first CSS framework |
| Components | [shadcn/ui](https://ui.shadcn.com/) | - | Radix UI-based component library |
| Validation | [Zod](https://zod.dev/) | 3.24.1 | TypeScript-first schema validation |
| Linting | [Biome](https://biomejs.dev/) | 1.9.4 | Fast formatter and linter |
| Unused Code | [Knip](https://knip.dev/) | 5.73.4 | Unused code/dependency detector |
| Language | [TypeScript](https://www.typescriptlang.org/) | 5.7.2 | Type-safe JavaScript |

---

## Framework Details

### tRPC

**Why:** Provides end-to-end type safety between the API and frontend without code generation, manual type definitions, or REST/GraphQL complexity. Change a procedure's return type and the frontend immediately shows type errors.

**How it works in this monorepo:**
1. **Define procedures** in `packages/api-contract` with Zod input validation
2. **Export `AppRouter` type** from the package
3. **NestJS exposes router** at `/trpc` via Express middleware in `apps/api`
4. **Frontend apps import types** and create tRPC React client with React Query
5. **SuperJSON transformer** handles complex types (Decimal, Date, Map, etc.)

**Type flow:**
```
ZenStack → Prisma Types → tRPC Router → AppRouter Type → Frontend Hooks
```

**Example usage:**
```typescript
// Backend: packages/api-contract/src/routers/clinic.ts
export const clinicRouter = t.router({
  list: authedProcedure.query(async ({ ctx }) => {
    return ctx.db.clinic.findMany()  // Returns typed Clinic[]
  }),
})

// Frontend: Full type inference
const { data } = trpc.clinic.list.useQuery()  // data is Clinic[]
```

### ZenStack

**Why:** Adds declarative access control policies directly in the schema, enforcing row-level security at the ORM level. Without it, you'd need to manually add permission checks to every query.

**How it works in this monorepo:**
1. Define models and policies in `packages/db/schema.zmodel` using `@@allow`/`@@deny`
2. Run `zenstack generate --output ./src/generated` to create enhanced Prisma client
3. Export `createDb(session)` from `packages/db` that wraps Prisma with ZenStack
4. Pass session context when creating the database client
5. All queries are automatically filtered by access policies

**Example policy:**
```prisma
model Clinic {
  id        String @id @default(cuid())
  name      String
  // ... fields

  // Access control policies
  @@allow('read', auth() != null)                        // Authenticated users can read
  @@allow('create,update,delete', auth().role == 'ADMIN')  // Only admins can modify
}
```

**Virtual auth type:**
```prisma
type Auth {
  id   String @id
  role String  // 'USER' | 'ADMIN' | 'SUPPORT'
  @@auth
}
```

### Refine.dev

**Why:** Rapidly scaffold admin panels with built-in CRUD operations, forms, tables, and routing. Saves weeks of development time on admin interfaces.

**How it works in this monorepo:**
1. **Configure resources** (Clinic, Treatment, etc.) in Refine's `<Refine>` component
2. **Custom data provider** in `apps/backoffice/src/lib/data-provider.ts` translates Refine actions to tRPC calls
3. **Custom auth provider** in `apps/backoffice/src/lib/auth-provider.ts` handles authentication
4. **Create pages** for each resource using Refine hooks (`useList`, `useOne`, `useCreate`, etc.)
5. Refine handles loading states, error handling, and optimistic updates

**Resource definition:**
```typescript
resources={[
  {
    name: 'clinics',
    list: '/clinics',
    create: '/clinics/create',
    edit: '/clinics/edit/:id',
    show: '/clinics/show/:id',
    meta: { label: 'Clinics' },
  },
]}
```

### Prisma

**Why:** Type-safe database client with migrations, auto-generated types, and excellent developer experience. Changes to the schema automatically update TypeScript types.

**How it works in this monorepo:**
1. **Schema defined** in `packages/db/schema.zmodel` (ZenStack extends Prisma syntax)
2. **ZenStack generates** `prisma/schema.prisma` from the zmodel
3. **Run `db:generate`** to generate both Prisma client and ZenStack enhance function
4. **Run `db:migrate`** to apply schema changes to the database
5. **Import from `@acme/db`** in apps to get the enhanced, type-safe client

**Database:** CockroachDB (PostgreSQL-compatible)

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9.15+
- PostgreSQL or CockroachDB instance
- SlashID account (for authentication)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd monorepo

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables section)

# Generate Prisma client and ZenStack types
pnpm db:generate

# Apply database migrations
pnpm db:migrate
```

### Development

```bash
# Start all apps in development mode
pnpm dev

# Or start individual apps
pnpm --filter @acme/api dev
pnpm --filter @acme/backoffice dev
pnpm --filter @acme/test-app dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Run Biome linting |
| `pnpm format` | Format code with Biome |
| `pnpm db:generate` | Generate Prisma client and ZenStack types |
| `pnpm db:migrate` | Apply database migrations |
| `pnpm db:push` | Push schema changes without migration |
| `pnpm check:unused` | Check for unused code with Knip |

### Ports

| App | Port | URL |
|-----|------|-----|
| API | 4000 | http://localhost:4000 |
| Backoffice | 3000 | http://localhost:3000 |
| Test App | 3001 | http://localhost:3001 |
| Example App | 3002 | http://localhost:3002 |

---

## Environment Variables

Create a `.env` file in the root with:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/acme"

# SlashID Authentication
SLASHID_ORG_ID="your-org-id"
NEXT_PUBLIC_SLASHID_ORG_ID="your-org-id"

# Session
SESSION_COOKIE_SECRET="your-32-character-minimum-secret"

# API URL (for frontend apps)
API_URL="http://localhost:4000"
NEXT_PUBLIC_API_URL="http://localhost:4000"

# Server
PORT=4000
NODE_ENV=development
```

| Variable | Description | Used In |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL/CockroachDB connection string | packages/db, apps/api |
| `SLASHID_ORG_ID` | SlashID organization ID (server-side) | apps/api, packages/auth |
| `NEXT_PUBLIC_SLASHID_ORG_ID` | SlashID org ID (client-side) | apps/test-app, apps/backoffice |
| `SESSION_COOKIE_SECRET` | Secret for session signing (32+ chars) | packages/auth |
| `API_URL` | API server URL (server-side) | apps/test-app, apps/backoffice |
| `NEXT_PUBLIC_API_URL` | API server URL (client-side) | apps/test-app, apps/backoffice |

---

## Creating a New Feature

### Adding a New Database Model

Follow these steps to add a new model with full type safety from database to frontend.

#### Step 1: Define the model in ZenStack schema

Edit `packages/db/schema.zmodel`:

```prisma
model Patient {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  clinic    Clinic   @relation(fields: [clinicId], references: [id])
  clinicId  String

  // Access control policies
  @@allow('read', auth() != null)
  @@allow('create,update,delete', auth().role == 'ADMIN')
}
```

Don't forget to add the reverse relation to the related model:

```prisma
model Clinic {
  // ... existing fields
  patients  Patient[]
}
```

#### Step 2: Generate types and apply migration

```bash
# Generate Prisma client and ZenStack types
pnpm db:generate

# Create and apply migration
pnpm db:migrate
```

#### Step 3: Export the type from db package

Edit `packages/db/src/index.ts`:

```typescript
export type { Clinic, Treatment, TreatmentsByClinic, Patient } from '@prisma/client'
```

#### Step 4: Create the tRPC router

Create `packages/api-contract/src/routers/patient.ts`:

```typescript
import { z } from 'zod'
import { t, authedProcedure, adminProcedure } from '../trpc'

export const patientRouter = t.router({
  // List all patients (with optional clinic filter)
  list: authedProcedure
    .input(z.object({ clinicId: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      return ctx.db.patient.findMany({
        where: { clinicId: input?.clinicId },
        include: { clinic: true },
        orderBy: { name: 'asc' },
      })
    }),

  // Get single patient by ID
  byId: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.patient.findUnique({
        where: { id: input.id },
        include: { clinic: true },
      })
    }),

  // Create new patient (admin only)
  create: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      clinicId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.patient.create({
        data: input,
        include: { clinic: true },
      })
    }),

  // Update patient (admin only)
  update: adminProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
      phone: z.string().optional().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.db.patient.update({
        where: { id },
        data,
        include: { clinic: true },
      })
    }),

  // Delete patient (admin only)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.patient.delete({
        where: { id: input.id },
      })
    }),
})
```

#### Step 5: Add router to the app router

Edit `packages/api-contract/src/router.ts`:

```typescript
import { patientRouter } from './routers/patient'

export const appRouter = t.router({
  clinic: clinicRouter,
  treatment: treatmentRouter,
  treatmentsByClinic: treatmentsByClinicRouter,
  patient: patientRouter,  // Add this line
})
```

#### Step 6: Use in frontend

The router is now available in all frontend apps with full type inference:

```typescript
// In any React component
const { data: patients, isLoading } = trpc.patient.list.useQuery()
const { data: patient } = trpc.patient.byId.useQuery({ id: 'patient-id' })

// Mutations
const createPatient = trpc.patient.create.useMutation()
await createPatient.mutateAsync({
  name: 'John Doe',
  email: 'john@example.com',
  clinicId: 'clinic-id',
})

// With React Query options
const { data } = trpc.patient.list.useQuery(
  { clinicId: selectedClinicId },
  { enabled: !!selectedClinicId }
)
```

### Adding a New tRPC Procedure

To add a procedure to an existing router:

#### Step 1: Add the procedure

Edit the router file in `packages/api-contract/src/routers/`:

```typescript
export const clinicRouter = t.router({
  // ... existing procedures

  // Add new search procedure
  search: authedProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.clinic.findMany({
        where: {
          OR: [
            { name: { contains: input.query, mode: 'insensitive' } },
            { code: { contains: input.query, mode: 'insensitive' } },
          ],
        },
      })
    }),

  // Add procedure with multiple inputs
  findByDateRange: authedProcedure
    .input(z.object({
      startDate: z.date(),
      endDate: z.date(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.clinic.findMany({
        where: {
          createdAt: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
      })
    }),
})
```

#### Step 2: Use immediately in frontend

No additional configuration needed - types are automatically available:

```typescript
const { data } = trpc.clinic.search.useQuery({ query: 'london' })
```

### Adding a Refine Resource (Backoffice)

To add a full CRUD interface in the backoffice:

#### Step 1: Add resource to Refine configuration

Edit `apps/backoffice/src/app/layout.tsx`:

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

#### Step 2: Create the list page

Create `apps/backoffice/src/app/patients/page.tsx`:

```typescript
'use client'

import { useList } from '@refinedev/core'
import Link from 'next/link'

export default function PatientList() {
  const { data, isLoading, isError } = useList({ resource: 'patients' })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading patients</div>

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Patients</h1>
        <Link href="/patients/create" className="btn btn-primary">
          Create Patient
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Clinic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.clinic?.name}</td>
              <td>
                <Link href={`/patients/edit/${patient.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

#### Step 3: Create other pages

Create similar pages for:
- `apps/backoffice/src/app/patients/create/page.tsx` - Create form
- `apps/backoffice/src/app/patients/edit/[id]/page.tsx` - Edit form
- `apps/backoffice/src/app/patients/show/[id]/page.tsx` - Detail view

### Adding a New Role

#### Step 1: Update the UserRole type

Edit `packages/auth/src/types.ts`:

```typescript
export type UserRole = 'USER' | 'ADMIN' | 'SUPPORT' | 'MANAGER'
```

#### Step 2: Update role mapping

Edit `packages/auth/src/session.ts` to map user groups to the new role.

#### Step 3: Add ZenStack policies

Edit `packages/db/schema.zmodel`:

```prisma
model SomeModel {
  // ... fields

  @@allow('read', auth() != null)
  @@allow('create,update', auth().role in ['ADMIN', 'MANAGER'])
  @@allow('delete', auth().role == 'ADMIN')
}
```

#### Step 4: Create procedure middleware (if needed)

Edit `packages/api-contract/src/trpc.ts`:

```typescript
export const managerProcedure = authedProcedure.use(
  requireRole('ADMIN', 'MANAGER')
)
```

---

## Database Schema

```
┌─────────────┐     ┌─────────────────────┐     ┌─────────────┐
│   Clinic    │     │  TreatmentsByClinic │     │  Treatment  │
├─────────────┤     ├─────────────────────┤     ├─────────────┤
│ id          │────<│ clinicId            │>────│ id          │
│ name        │     │ treatmentId         │     │ name        │
│ code        │     │ priceOverride       │     │ description │
│ createdAt   │     │ notes               │     │ price       │
│ updatedAt   │     │ createdAt           │     │ maintenance │
└─────────────┘     │ updatedAt           │     │ createdAt   │
                    └─────────────────────┘     │ updatedAt   │
                                                └─────────────┘
```

- **Clinic**: Medical facilities with unique codes
- **Treatment**: Available medical treatments with base pricing
- **TreatmentsByClinic**: Many-to-many junction with optional price overrides per clinic

---

## Authentication & Authorization

### Roles

| Role | Permissions |
|------|-------------|
| ADMIN | Full CRUD on all resources |
| USER | Read-only access |
| SUPPORT | TBD |

Role mapping is configured in `packages/auth/src/session.ts`.

---

## Project Structure Details

### Apps

| App | Framework | Purpose | Port |
|-----|-----------|---------|------|
| [api](./apps/api/README.md) | NestJS | Backend API server | 4000 |
| [backoffice](./apps/backoffice/README.md) | Next.js + Refine | Admin panel | 3000 |
| [test-app](./apps/test-app/README.md) | Next.js | Customer application | 3001 |
| [example-app](./apps/example-app/README.md) | Next.js | SlashID reference | 3002 |

### Packages

| Package | Purpose |
|---------|---------|
| [@acme/api-contract](./packages/api-contract/README.md) | tRPC router definitions, procedures, and shared types |
| [@acme/auth](./packages/auth/README.md) | SlashID integration, session management, role utilities |
| [@acme/db](./packages/db/README.md) | Prisma schema, ZenStack policies, database client |
| [@acme/config](./packages/config/README.md) | Shared TypeScript configurations |

---

## Code Quality

### Linting & Formatting

```bash
# Check for issues
pnpm lint

# Auto-fix formatting
pnpm format
```

### Type Checking

```bash
pnpm typecheck
```

TypeScript strict mode is enabled across all packages.

### Unused Code Detection

```bash
pnpm check:unused
```

---

## Troubleshooting

### Types not updating after schema change

```bash
pnpm db:generate
pnpm typecheck
```

### TS2742 errors about non-portable types

This happens when ZenStack generates types to `node_modules`. The fix is already applied - types are generated to `packages/db/src/generated/`.

### Database connection errors

- Check `DATABASE_URL` in `.env`
- Ensure database server is running
- Verify SSL settings match your database configuration

### Authentication not working

- Verify auth environment variables are set
- Check cookie settings for local development
- Ensure API and frontend are on compatible domains (for cookies)

### tRPC 404 errors

- Verify API is running at the configured `API_URL`
- Check that the tRPC middleware route matches (`trpc/*`)
- Ensure CORS is configured correctly in the API

### 403 Forbidden on mutations

- Verify the user has the required role (e.g., ADMIN)
- Check ZenStack policies allow the operation for the user's role
- Verify role mapping in `packages/auth/src/session.ts`

---

## AWS Deployment

### Architecture

```
                    ┌─────────────────┐
                    │   Route 53      │
                    │   *.acme.com    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ Backoffice│  │ Test App │  │   API    │
        │ (ECS/    │  │ (ECS/    │  │ (ECS/    │
        │ AppRunner)│  │ AppRunner)│  │ AppRunner)│
        └──────────┘  └──────────┘  └────┬─────┘
                                         │
                                         ▼
                                   ┌──────────┐
                                   │ RDS      │
                                   │ Postgres │
                                   └──────────┘
```

### Cookie Configuration for Production

All apps should run under the same parent domain:

```
api.acme.com       -> API service
app.acme.com       -> Test App
admin.acme.com     -> Backoffice
```

---

## TODO

- [ ] Add SUPPORT role permissions in ZenStack
- [ ] Implement edit pages for all resources
- [ ] Add pagination to list views
- [ ] Set up CI/CD pipeline
- [ ] Add E2E tests with Playwright
- [ ] Configure production Docker builds
