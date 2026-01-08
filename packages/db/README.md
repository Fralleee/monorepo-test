# @acme/db

ZenStack v3 ORM database layer with access control for the Acme CRM monorepo.

## Overview

This package provides the database layer that:
- Defines the database schema with ZenStack
- Generates type-safe ORM client (based on Kysely)
- Enforces row-level security via ZenStack policies
- Exports the database client with auth context

## Tech Stack

- **ORM**: ZenStack 3.1.1 (standalone ORM based on Kysely)
- **Database**: PostgreSQL
- **Connection Pool**: pg (node-postgres)

## Project Structure

```
├── zenstack/
│   ├── schema.zmodel     # Main schema (imports models, config, auth type)
│   ├── models/           # Model definitions (one file per model)
│   │   ├── clinic.zmodel
│   │   ├── treatment.zmodel
│   │   └── treatmentsByClinic.zmodel
│   ├── schema.ts         # Generated schema class
│   └── models.ts         # Generated model types
├── src/
│   └── index.ts          # Main exports
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

Creates a ZenStack client with auth context:

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
import { ZenStackClient } from '@zenstackhq/orm'
import { PostgresDialect } from '@zenstackhq/orm/dialects/postgres'
import { PolicyPlugin } from '@zenstackhq/plugin-policy'
import { Pool } from 'pg'
import { SchemaType } from '../zenstack/schema'

const schema = new SchemaType()
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const dialect = new PostgresDialect({ pool })

const baseClient = new ZenStackClient(schema, {
  dialect,
  plugins: [new PolicyPlugin()],
})

export function createDb(session: SessionUser | null) {
  const authContext = session
    ? { id: session.id, role: session.role }
    : undefined
  return baseClient.$setAuth(authContext)
}
```

### Type Exports

```typescript
// Model types
export type { Clinic, Treatment, TreatmentsByClinic } from '../zenstack/models'

// Enhanced client type
export type EnhancedClient = typeof baseClient
```

## Usage

### In API Contract

```typescript
// packages/api-contract/src/routers/clinic.ts
export const clinicRouter = t.router({
  list: authedProcedure.query(async ({ ctx }) => {
    // ctx.db is the ZenStack client with auth context
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

This runs `zenstack generate` which generates:
- `zenstack/schema.ts` - Schema class
- `zenstack/models.ts` - TypeScript model types

### Run Migrations

```bash
# Create and apply migration
pnpm db:migrate

# Push schema without migration (dev only)
pnpm db:push
```

## Adding a New Model

### 1. Create a new model file

Create `zenstack/models/patient.zmodel`:

```prisma
import 'clinic'

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

### 2. Import in schema.zmodel

Add the import to `zenstack/schema.zmodel`:

```prisma
import './models/clinic'
import './models/treatment'
import './models/treatmentsByClinic'
import './models/patient'  // Add this
```

### 3. Add Reverse Relation

Update `zenstack/models/clinic.zmodel` to add the reverse relation:

```prisma
import 'treatmentsByClinic'
import 'patient'  // Add this import

model Clinic {
  // ... existing fields
  patients Patient[]
}
```

### 4. Generate and Migrate

```bash
pnpm db:generate
pnpm db:migrate
```

### 5. Export Type

```typescript
// src/index.ts
export type { Clinic, Treatment, TreatmentsByClinic, Patient } from '../zenstack/models'
```

## Package Exports

### Main Export

```typescript
// Database client factory
export { createDb } from './index'

// Types
export type { Clinic, Treatment, TreatmentsByClinic } from '../zenstack/models'
export type { EnhancedClient } from './index'
```

### Generated Export (`./zenstack/*`)

```typescript
// For direct access to generated types
import { SchemaType } from '@acme/db/zenstack/schema'
import type { Clinic } from '@acme/db/zenstack/models'
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
    "./zenstack/*": {
      "types": "./zenstack/*",
      "default": "./zenstack/*"
    }
  }
}
```

### Why ZenStack v3?

ZenStack v3 is a complete rewrite that replaces Prisma with its own standalone ORM based on Kysely:
- **No Prisma dependency** - Lighter footprint, fewer moving parts
- **Kysely-based** - Direct SQL generation with type safety
- **Same schema syntax** - Models and policies still defined in `.zmodel` files
- **Prisma-compatible API** - Query API is compatible with Prisma (findMany, create, etc.)

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

- `@zenstackhq/orm` - ZenStack ORM client
- `@zenstackhq/plugin-policy` - Access control plugin
- `@zenstackhq/cli` - ZenStack CLI (dev)
- `kysely` - SQL query builder (peer dependency)
- `pg` - PostgreSQL connection pool

### Workspace Dependencies

- `@acme/auth` - SessionUser type for createDb
