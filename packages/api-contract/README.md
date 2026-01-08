# @acme/api-contract

Framework-agnostic tRPC router definitions and shared types for the Acme CRM monorepo.

## Overview

This package defines the API contract between the backend and frontend. It:
- Defines all tRPC procedures with Zod validation
- Exports the `AppRouter` type for frontend type inference
- Provides middleware for authentication and authorization
- Is framework-agnostic (can be used with any backend)

## Tech Stack

- **RPC Protocol**: tRPC 11.0.0-rc
- **Validation**: Zod
- **Serialization**: SuperJSON
- **Types**: TypeScript

## Project Structure

```
src/
├── trpc.ts                # tRPC instance, middleware, procedures
├── context.ts             # Context type definition
├── router.ts              # App router combining all sub-routers
├── client.ts              # Client exports
├── routers/
│   ├── clinic.ts          # Clinic CRUD procedures
│   ├── treatment.ts       # Treatment CRUD procedures
│   └── treatments-by-clinic.ts  # Junction table procedures
└── index.ts               # Main exports
```

## Key Concepts

### tRPC Instance

```typescript
// src/trpc.ts
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { TRPCContext } from './context'

export const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,  // Handles Decimal, Date, etc.
})

export const router = t.router
export const publicProcedure = t.procedure
```

### Context Type

The context is passed to every procedure:

```typescript
// src/context.ts
import type { SessionUser } from '@acme/auth'
import type { EnhancedClient } from '@acme/db'

export interface TRPCContext {
  session: SessionUser | null
  db: EnhancedClient  // ZenStack client with auth context
}
```

### Middleware

```typescript
// src/trpc.ts

// Require authenticated session
const requireAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { ...ctx, session: ctx.session } })
})

// Require specific roles
export const requireRole = (...roles: UserRole[]) =>
  t.middleware(({ ctx, next }) => {
    if (!ctx.session || !roles.includes(ctx.session.role)) {
      throw new TRPCError({ code: 'FORBIDDEN' })
    }
    return next({ ctx })
  })
```

### Procedure Types

| Procedure | Authentication | Authorization |
|-----------|----------------|---------------|
| `publicProcedure` | None | None |
| `authedProcedure` | Required | Any authenticated user |
| `adminProcedure` | Required | ADMIN role only |

## Routers

### Clinic Router

```typescript
// src/routers/clinic.ts
export const clinicRouter = t.router({
  // Queries (read operations)
  list: authedProcedure.query(...)     // Get all clinics
  byId: authedProcedure.input(...).query(...)   // Get by ID
  byCode: authedProcedure.input(...).query(...) // Get by code

  // Mutations (write operations)
  create: adminProcedure.input(...).mutation(...)
  update: adminProcedure.input(...).mutation(...)
  delete: adminProcedure.input(...).mutation(...)
})
```

### Treatment Router

```typescript
// src/routers/treatment.ts
export const treatmentRouter = t.router({
  list: authedProcedure.query(...)
  byId: authedProcedure.input(...).query(...)
  create: adminProcedure.input(...).mutation(...)
  update: adminProcedure.input(...).mutation(...)
  delete: adminProcedure.input(...).mutation(...)
})
```

### TreatmentsByClinic Router

Manages the many-to-many relationship with price overrides:

```typescript
// src/routers/treatments-by-clinic.ts
export const treatmentsByClinicRouter = t.router({
  list: authedProcedure.input(z.object({
    clinicId: z.string().optional(),
    treatmentId: z.string().optional(),
  }).optional()).query(...)

  byId: authedProcedure.input(...).query(...)
  create: adminProcedure.input(...).mutation(...)
  update: adminProcedure.input(...).mutation(...)
  delete: adminProcedure.input(...).mutation(...)
})
```

## Input Validation

All inputs are validated with Zod:

```typescript
// Example: create clinic
create: adminProcedure
  .input(z.object({
    name: z.string().min(1),
    code: z.string().min(1).max(20),
  }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.clinic.create({ data: input })
  })

// Example: update with optional fields
update: adminProcedure
  .input(z.object({
    id: z.string(),
    name: z.string().min(1).optional(),
    code: z.string().min(1).max(20).optional(),
  }))
  .mutation(...)
```

## Usage

### In Backend (NestJS)

```typescript
// apps/api/src/trpc/trpc.middleware.ts
import { appRouter } from '@acme/api-contract'
import { createExpressMiddleware } from '@trpc/server/adapters/express'

createExpressMiddleware({
  router: appRouter,
  createContext: async ({ req }) => ({
    session: await getSessionFromCookieHeader(req.headers.cookie),
    db: createDb(session),
  }),
})
```

### In Frontend (Next.js)

```typescript
// apps/test-app/src/lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@acme/api-contract'

export const trpc = createTRPCReact<AppRouter>()
```

```typescript
// In components
const { data } = trpc.clinic.list.useQuery()
const create = trpc.clinic.create.useMutation()
```

## Adding a New Router

### 1. Create the Router File

```typescript
// src/routers/patient.ts
import { z } from 'zod'
import { t, authedProcedure, adminProcedure } from '../trpc'

export const patientRouter = t.router({
  list: authedProcedure
    .input(z.object({ clinicId: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      return ctx.db.patient.findMany({
        where: { clinicId: input?.clinicId },
        orderBy: { name: 'asc' },
      })
    }),

  byId: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.patient.findUnique({
        where: { id: input.id },
      })
    }),

  create: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      clinicId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.patient.create({ data: input })
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.db.patient.update({ where: { id }, data })
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.patient.delete({ where: { id: input.id } })
    }),
})
```

### 2. Add to App Router

```typescript
// src/router.ts
import { patientRouter } from './routers/patient'

export const appRouter = t.router({
  clinic: clinicRouter,
  treatment: treatmentRouter,
  treatmentsByClinic: treatmentsByClinicRouter,
  patient: patientRouter,  // Add this
})
```

### 3. Use in Frontend

```typescript
// Immediate type inference
const { data } = trpc.patient.list.useQuery()
```

## Adding a New Procedure

### Query Example

```typescript
// In existing router
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
```

### Mutation Example

```typescript
// In existing router
archive: adminProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.clinic.update({
      where: { id: input.id },
      data: { archivedAt: new Date() },
    })
  }),
```

## Exports

### Main Export (`index.ts`)

```typescript
export { appRouter } from './router'
export type { AppRouter } from './router'
export type { TRPCContext } from './context'
```

### Client Export (`./client`)

```typescript
// For Next.js apps to import types
export type { AppRouter } from './router'
```

## Dependencies

### Workspace Dependencies

- `@acme/auth` - SessionUser type, UserRole type
- `@acme/db` - ZenStack database client type

### External Dependencies

- `@trpc/server` - tRPC server
- `zod` - Schema validation
- `superjson` - JSON serialization
