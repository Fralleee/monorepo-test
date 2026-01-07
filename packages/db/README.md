# @acme/db

Prisma database client with ZenStack access control for the Acme CRM monorepo.

## Overview

This package provides the database layer that:
- Defines the database schema with ZenStack
- Generates Prisma client with type safety
- Enforces row-level security via ZenStack policies
- Exports the enhanced database client

## Tech Stack

- **ORM**: Prisma 6.1.0
- **Access Control**: ZenStack 2.10.2
- **Database**: CockroachDB (PostgreSQL-compatible)

## Project Structure

```
├── schema.zmodel         # ZenStack schema (models + policies)
├── prisma/
│   └── schema.prisma     # Generated Prisma schema
├── src/
│   ├── index.ts          # Main exports
│   └── generated/        # ZenStack generated files
│       ├── enhance.ts    # Enhanced client wrapper
│       └── ...           # Other generated files
└── package.json
```

## Database Schema

### Models

#### Clinic

```prisma
model Clinic {
  id        String   @id @default(cuid())
  name      String
  code      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  treatmentsByClinic TreatmentsByClinic[]

  @@allow('read', auth() != null)
  @@allow('create,update,delete', auth().role == 'ADMIN')
}
```

#### Treatment

```prisma
model Treatment {
  id                       String   @id @default(cuid())
  name                     String
  description              String?
  price                    Decimal  @db.Decimal(10, 2)
  maintenanceIntervalMonths Int?
  createdAt                DateTime @default(now())
  updatedAt                DateTime @updatedAt

  treatmentsByClinic TreatmentsByClinic[]

  @@allow('read', auth() != null)
  @@allow('create,update,delete', auth().role == 'ADMIN')
}
```

#### TreatmentsByClinic

Many-to-many junction table with price overrides:

```prisma
model TreatmentsByClinic {
  id            String   @id @default(cuid())
  clinic        Clinic   @relation(fields: [clinicId], references: [id])
  clinicId      String
  treatment     Treatment @relation(fields: [treatmentId], references: [id])
  treatmentId   String
  priceOverride Decimal? @db.Decimal(10, 2)
  notes         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@unique([clinicId, treatmentId])

  @@allow('read', auth() != null)
  @@allow('create,update,delete', auth().role == 'ADMIN')
}
```

### Virtual Auth Type

ZenStack uses a virtual auth type for access control:

```prisma
type Auth {
  id   String @id
  role String  // 'USER' | 'ADMIN' | 'SUPPORT'
  @@auth
}
```

This type is not stored in the database but is used in policy expressions.

## Access Control Policies

### Policy Syntax

```prisma
@@allow('operation', condition)
@@deny('operation', condition)
```

**Operations**: `read`, `create`, `update`, `delete`, `all`

### Current Policies

| Model | Read | Create | Update | Delete |
|-------|------|--------|--------|--------|
| Clinic | Authenticated | ADMIN | ADMIN | ADMIN |
| Treatment | Authenticated | ADMIN | ADMIN | ADMIN |
| TreatmentsByClinic | Authenticated | ADMIN | ADMIN | ADMIN |

### Policy Examples

```prisma
// Any authenticated user can read
@@allow('read', auth() != null)

// Only admins can write
@@allow('create,update,delete', auth().role == 'ADMIN')

// Row-level: users can only see their own data
@@allow('read', auth().id == userId)

// Multiple roles
@@allow('update', auth().role in ['ADMIN', 'MANAGER'])
```

## Key Exports

### createDb

Creates an enhanced Prisma client with access policies:

```typescript
import { createDb } from '@acme/db'
import type { SessionUser } from '@acme/auth'

// Create client with session context
const db = createDb(session)

// Now all queries are filtered by policies
const clinics = await db.clinic.findMany()
// Only returns clinics the user has access to
```

**Implementation:**

```typescript
import { PrismaClient } from '@prisma/client'
import { enhance } from './generated/enhance'
import type { SessionUser } from '@acme/auth'

const prisma = new PrismaClient()

export function createDb(session: SessionUser | null) {
  return enhance(prisma, {
    user: session ? { id: session.id, role: session.role } : undefined,
  })
}
```

### Type Exports

```typescript
// Prisma namespace for advanced usage
export { Prisma } from '@prisma/client'

// Model types
export type { Clinic, Treatment, TreatmentsByClinic } from '@prisma/client'

// Enhanced client type
export type EnhancedPrismaClient = Enhanced<PrismaClient>
```

## Usage

### In API Contract

```typescript
// packages/api-contract/src/routers/clinic.ts
export const clinicRouter = t.router({
  list: authedProcedure.query(async ({ ctx }) => {
    // ctx.db is the enhanced client
    return ctx.db.clinic.findMany({
      orderBy: { name: 'asc' },
    })
  }),
})
```

### Direct Usage

```typescript
import { createDb } from '@acme/db'

// With session
const session = { id: 'user-123', role: 'ADMIN' }
const db = createDb(session)

// All operations respect policies
await db.clinic.create({
  data: { name: 'New Clinic', code: 'NC' },
}) // Works for ADMIN

// Without session (or USER role)
const publicDb = createDb(null)
await publicDb.clinic.create({...}) // Throws - access denied
```

## Commands

### Generate Client

```bash
# From package directory
pnpm db:generate

# Or from monorepo root
pnpm --filter @acme/db db:generate
```

This runs:
1. `zenstack generate --output ./src/generated` - Generates ZenStack enhance
2. `prisma generate` - Generates Prisma client

### Run Migrations

```bash
# Create and apply migration
pnpm db:migrate

# Push schema without migration (dev only)
pnpm db:push
```

### Open Prisma Studio

```bash
pnpm db:studio
```

## Adding a New Model

### 1. Define in schema.zmodel

```prisma
model Patient {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  clinic    Clinic   @relation(fields: [clinicId], references: [id])
  clinicId  String

  @@allow('read', auth() != null)
  @@allow('create,update,delete', auth().role == 'ADMIN')
}
```

### 2. Add Reverse Relation

```prisma
model Clinic {
  // ... existing fields
  patients Patient[]
}
```

### 3. Generate and Migrate

```bash
pnpm db:generate
pnpm db:migrate
```

### 4. Export Type

```typescript
// src/index.ts
export type { Clinic, Treatment, TreatmentsByClinic, Patient } from '@prisma/client'
```

## Package Exports

### Main Export

```typescript
// Database client
export { createDb } from './index'

// Types
export { Prisma } from '@prisma/client'
export type { Clinic, Treatment, TreatmentsByClinic } from '@prisma/client'
export type { EnhancedPrismaClient } from './index'
```

### Generated Export (`./generated/*`)

```typescript
// For direct access to generated types
import { enhance } from '@acme/db/generated/enhance'
```

## Configuration

### package.json exports

```json
{
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },
    "./generated/*": {
      "types": "./src/generated/*",
      "default": "./src/generated/*"
    }
  }
}
```

### Why Custom Output Location?

ZenStack by default generates to `node_modules/.zenstack`. In a pnpm monorepo, this causes TS2742 errors because TypeScript cannot resolve types across the pnpm store.

**Solution:** Generate to `./src/generated` and export via package.json.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |

Example:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/acme?schema=public"
```

## Dependencies

### External Dependencies

- `@prisma/client` - Prisma ORM client
- `prisma` - Prisma CLI (dev)
- `zenstack` - ZenStack CLI (dev)
- `@zenstackhq/runtime` - ZenStack runtime

### Workspace Dependencies

- `@acme/auth` - SessionUser type for createDb
