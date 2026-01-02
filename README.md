# Acme CRM Monorepo

A Turborepo monorepo for a CRM-style product with end-to-end type safety.

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: Next.js 15 (App Router), Tailwind CSS v4, shadcn/ui
- **Backend**: NestJS + tRPC
- **Database**: PostgreSQL + Prisma + ZenStack (row-level security)
- **Authentication**: SlashID (cookie-based sessions)
- **Tooling**: Biome (lint/format), TypeScript 5.7+

## Project Structure

```
apps/
  api/                 # NestJS server hosting tRPC endpoint
  backoffice/          # Next.js admin panel with Refine
  test-app/            # Next.js customer-facing app
  example-app/         # SlashID auth reference implementation

packages/
  api-contract/        # tRPC router + types (framework-agnostic)
  auth/                # SlashID helpers + session types
  config/              # Shared tsconfig + biome config
  db/                  # Prisma schema + ZenStack policies
```

## Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL (local or AWS RDS)
- SlashID account

## Environment Variables

Create `.env` files in each app based on `.env.example`:

### Required Variables

| Variable | Description | Used In |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | packages/db, apps/api |
| `SLASHID_ORG_ID` | SlashID organization ID (server) | apps/api, packages/auth |
| `NEXT_PUBLIC_SLASHID_ORG_ID` | SlashID org ID (client) | apps/test-app, apps/backoffice |
| `SESSION_COOKIE_SECRET` | Secret for session signing (32+ chars) | packages/auth |
| `API_URL` | API server URL (server-side) | apps/test-app, apps/backoffice |
| `NEXT_PUBLIC_API_URL` | API server URL (client-side) | apps/test-app, apps/backoffice |

### Example .env

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/acme_crm?schema=public"

# SlashID
SLASHID_ORG_ID=your-slashid-org-id
NEXT_PUBLIC_SLASHID_ORG_ID=your-slashid-org-id
SESSION_COOKIE_SECRET=your-secret-key-at-least-32-characters-long

# API
API_URL=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up the database

```bash
# Generate Prisma client and ZenStack enhanced client
pnpm db:generate

# Run migrations (development)
pnpm db:migrate

# Or push schema directly (for quick prototyping)
pnpm db:push
```

### 3. Start development servers

```bash
pnpm dev
```

This starts all apps:
- **API**: http://localhost:4000
- **Backoffice**: http://localhost:3000
- **Test App**: http://localhost:3001

## Development

### Commands

```bash
pnpm dev          # Start all apps in development mode
pnpm build        # Build all apps
pnpm typecheck    # Run TypeScript checks
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
pnpm db:generate  # Generate Prisma/ZenStack clients
pnpm db:migrate   # Run database migrations
pnpm db:push      # Push schema to database
```

### Type Safety

The monorepo enforces end-to-end type safety:

1. **Database types** are generated from Prisma schema
2. **API types** are inferred from tRPC router
3. **Frontend** imports only types from `@acme/api-contract`

```typescript
// In Next.js apps - full type inference
import type { AppRouter } from '@acme/api-contract'
import { trpc } from '@/lib/trpc'

// Fully typed queries
const { data } = trpc.clinic.list.useQuery()
```

### Authentication Flow

1. User visits `/login` on test-app or backoffice
2. SlashID Form component handles email magic link
3. Token is stored in HTTP-only cookie
4. Server components read cookie and verify with SlashID
5. API validates session on each tRPC request

## Database Schema

### Models

- **Clinic**: Medical facility locations
- **Treatment**: Available treatment types
- **TreatmentsByClinic**: Many-to-many with price overrides

### Access Control (ZenStack)

- All authenticated users can read data
- Only ADMIN role can create/update/delete
- SUPPORT role permissions: TODO

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

### Deployment Options

#### Next.js Apps (backoffice, test-app)

| Option | Pros | Cons |
|--------|------|------|
| **ECS/Fargate** | Full control, VPC integration | More config, higher cost |
| **App Runner** | Simple, auto-scaling | Limited customization |
| **Amplify** | Easy CI/CD, preview deployments | Framework limitations |

#### NestJS API

| Option | Pros | Cons |
|--------|------|------|
| **ECS/Fargate** | Production-ready, long-running | Container management |
| **App Runner** | Simple deployment | Cold starts possible |
| **Lambda + API GW** | Serverless, pay-per-use | Requires adapter, cold starts |

#### Database

- **AWS RDS PostgreSQL** (recommended)
- Enable SSL in production
- Use private subnet with VPC peering

### Cookie Configuration for Production

All apps should run under the same parent domain for cookie sharing:

```
api.acme.com       -> API service
app.acme.com       -> Test App
admin.acme.com     -> Backoffice
```

SlashID cookie settings:
- `Secure: true` (HTTPS only)
- `SameSite: Lax` (or `Strict` if all apps on same domain)
- `HttpOnly: true` (set by SlashID SDK)

### Environment Variables in AWS

Use AWS Systems Manager Parameter Store or Secrets Manager:

```bash
# Example: Setting up SSM parameters
aws ssm put-parameter --name "/acme/prod/DATABASE_URL" --value "..." --type SecureString
aws ssm put-parameter --name "/acme/prod/SLASHID_ORG_ID" --value "..." --type String
aws ssm put-parameter --name "/acme/prod/SESSION_COOKIE_SECRET" --value "..." --type SecureString
```

### Docker Build

Each app can be containerized:

```dockerfile
# Example Dockerfile for apps/api
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @acme/api build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "dist/main.js"]
```

## Ports

| App | Development Port |
|-----|------------------|
| API | 4000 |
| Backoffice | 3000 |
| Test App | 3001 |

## TODO

- [ ] Add SUPPORT role permissions in ZenStack
- [ ] Implement edit pages for all resources
- [ ] Add pagination to list views
- [ ] Set up CI/CD pipeline
- [ ] Add E2E tests with Playwright
- [ ] Configure production Docker builds
