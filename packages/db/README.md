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

All database commands can be run from the monorepo root. Use `--` to pass additional arguments.

### Generate Client

```bash
# From monorepo root
pnpm db:generate

# From package directory
pnpm --filter @acme/db db:generate
```

This runs `zenstack generate` which generates:
- `zenstack/schema.ts` - Schema class
- `zenstack/models.ts` - TypeScript model types

### Push Schema (Development Only)

```bash
pnpm db:push
```

**What it does:**
- Directly synchronizes the database schema with your `.zmodel` files
- Does NOT create migration files
- Preserves existing data when possible (may drop data for destructive changes)

**When to use:**
- Rapid prototyping during early development
- Experimenting with schema changes locally
- When you don't need migration history

**When NOT to use:**
- On production databases
- When working on a feature branch that needs migrations for team review
- After you've started using migrations on a branch

### Create and Apply Migrations

```bash
# Create and apply migration with auto-generated name
pnpm db:migrate

# Create migration with custom name
pnpm db:migrate -- --name add_patient_table
```

**What it does:**
- Compares your `.zmodel` files to the last migration state
- Generates a new migration file with SQL changes
- Applies the migration to the database
- Records the migration in the `_zenstack_migrations` table

**When to use:**
- Feature branches with schema changes
- Any change that will be reviewed/merged
- Local development

### Deploy Migrations (CI/CD)

```bash
pnpm db:migrate:deploy
```

**What it does:**
- Applies all pending migration files to the database
- Does NOT generate new migrations
- Only runs migrations that are committed to the repository

**When to use:**
- CI/CD pipelines
- Production deployments
- Any environment where you want deterministic migrations

### Reset Database

```bash
pnpm db:reset
```

**What it does:**
- Drops all tables and data
- Re-runs all migrations from scratch
- Useful for getting a clean slate

**Warning:** This destroys all data. Only use in development.

## Migration Workflow

### Feature Branch Workflow

When implementing a feature that requires schema changes:

```bash
# 1. Create your feature branch
git checkout -b feature/add-patients

# 2. Make schema changes in .zmodel files
# Edit zenstack/models/patient.zmodel

# 3. Generate the client (for type checking)
pnpm db:generate

# 4. Create a migration with descriptive name
pnpm db:migrate -- --name add_patient_model

# 5. Commit both schema and migration files
git add .
git commit -m "feat: add patient model with migration"

# 6. Push for review
git push origin feature/add-patients
```

### Push vs Migrate Decision Tree

```
Is this CI/CD or production? ──Yes──> Use db:migrate:deploy
       │
       No (local development)
       │
Are you prototyping/experimenting? ──Yes──> Use db:push
       │
       No
       │
Will this be reviewed/merged? ──Yes──> Use db:migrate
       │
       No
       │
Use db:push
```

| Command | Environment | What it does |
|---------|-------------|--------------|
| `db:push` | Local prototyping | Syncs schema directly, no migration files |
| `db:migrate` | Local development | Generates AND applies migration files |
| `db:migrate:deploy` | CI/CD, production | Applies only committed migration files |

### Handling Schema Drift

**What is drift?**
Schema drift occurs when the database state doesn't match the expected state from migrations. This commonly happens when:
- You used `db:push` then switched to `db:migrate`
- You manually modified the database
- You switched branches with different migration histories

**Symptoms:**
```
Error: The database schema has drifted from the migration history.
```

**How to fix:**

1. **Option A: Reset the database (development only)**
   ```bash
   pnpm db:reset
   ```
   This drops everything and re-runs migrations.

2. **Option B: Baseline the current state**
   ```bash
   # Mark current database state as the baseline
   pnpm db:migrate -- --baseline
   ```

3. **Option C: Resolve manually**
   - Compare database state to expected migration state
   - Make targeted SQL fixes
   - Re-run migrations

### CI/CD Pipeline

For deploying migrations in CI/CD, use `db:migrate:deploy` (not `db:migrate`):

```yaml
# Example GitHub Actions step
- name: Run database migrations
  run: pnpm db:migrate:deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

| Command | Use Case |
|---------|----------|
| `db:migrate` | Local development - generates AND applies migrations |
| `db:migrate:deploy` | CI/CD - applies only committed migration files |

Using `migrate:deploy` ensures deterministic deployments where the exact same SQL runs every time.

**Important:** Always run migrations before deploying application code.

### Rolling Back Migrations

To rollback a migration, create a revert PR that generates a new forward migration:

```bash
# 1. Revert the problematic commit
git revert <commit-sha>

# 2. Generate a new migration for the reverted schema
pnpm db:migrate -- --name revert_<description>

# 3. Commit both the reverted code AND the new migration file
git add .
git commit -m "Revert: <description>"

# 4. Push and merge the revert PR
git push
```

When the revert PR is merged, CI runs `migrate:deploy` which applies the rollback migration.

**Note:** If the original migration dropped a column or table, the data cannot be recovered. The rollback will recreate the structure but the data is lost.

### Best Practices

1. **Always use migrations for shared work**
   - Any schema change that will be committed should use `db:migrate`
   - Include migration files in code review

2. **Use descriptive migration names**
   ```bash
   pnpm db:migrate -- --name add_patient_phone_field
   pnpm db:migrate -- --name create_appointments_table
   pnpm db:migrate -- --name add_clinic_patient_index
   ```

3. **One logical change per migration**
   - Don't bundle unrelated changes
   - Makes it easier to understand and revert if needed

4. **Test migrations on fresh database**
   ```bash
   # Reset and re-run all migrations to verify they work
   pnpm db:reset
   ```

5. **Never edit committed migrations**
   - Once pushed, a migration is immutable
   - Create a new migration to fix issues

6. **Coordinate with team**
   - Communicate before making breaking schema changes
   - Consider data migration needs for existing records

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
