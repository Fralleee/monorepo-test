# @acme/api

NestJS backend API server that hosts the tRPC endpoint and handles authentication.

## Overview

This app serves as the backend for all frontend applications. It:
- Exposes tRPC procedures at `/trpc`
- Validates SlashID tokens from cookies
- Creates authenticated database connections with ZenStack
- Provides a health check endpoint at `/health`

## Tech Stack

- **Framework**: NestJS 10.4.15
- **HTTP Server**: Express (via `@nestjs/platform-express`)
- **API Protocol**: tRPC 11.0.0-rc
- **Authentication**: SlashID (via `@acme/auth`)
- **Database**: ZenStack ORM (via `@acme/db`)
- **Environment**: `@nestjs/config` for `.env` loading

## Project Structure

```
src/
├── main.ts              # Application bootstrap
├── app.module.ts        # Root NestJS module
├── health.controller.ts # Health check endpoint
└── trpc/
    ├── trpc.module.ts       # tRPC NestJS module
    └── trpc.middleware.ts   # Express middleware for tRPC
```

## How It Works

### Request Flow

```
1. HTTP Request arrives at /trpc/*
       ↓
2. TrpcMiddleware intercepts request
       ↓
3. Extract token from Cookie header
       ↓
4. Validate token with SlashID SSR
       ↓
5. Create ZenStack client with session context
       ↓
6. tRPC procedure executes with { session, db } context
       ↓
7. ZenStack policies filter data based on user role
       ↓
8. Response returned to client
```

### tRPC Integration

The middleware integrates tRPC with Express:

```typescript
// src/trpc/trpc.middleware.ts
@Injectable()
export class TrpcMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    return createExpressMiddleware({
      router: appRouter,
      createContext: async ({ req }) => {
        // Extract session from cookie
        const session = await getSessionFromCookieHeader(req.headers.cookie)
        // Create database client with access policies
        const db = createDb(session)
        return { session, db }
      },
    })(req, res, next)
  }
}
```

### Module Configuration

```typescript
// src/trpc/trpc.module.ts
@Module({})
export class TrpcModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TrpcMiddleware)
      .forRoutes({ path: 'trpc/*', method: RequestMethod.ALL })
  }
}
```

## Development

### Running the Server

```bash
# From monorepo root
pnpm --filter @acme/api dev

# Or start all apps
pnpm dev
```

The server runs on http://localhost:4000 by default.

### Environment Variables

Required in `.env`:

```env
# Database connection
DATABASE_URL="postgresql://..."

# SlashID organization ID
SLASHID_ORG_ID="your-org-id"

# Server port (optional, defaults to 4000)
PORT=4000
```

### Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/trpc/*` | ALL | tRPC procedures |
| `/health` | GET | Health check |

### Testing tRPC Endpoints

```bash
# Health check
curl http://localhost:4000/health

# tRPC query (requires authentication cookie)
curl http://localhost:4000/trpc/clinic.list \
  -H "Cookie: @slashid/USER_TOKEN/your-org-id=token"
```

## Building for Production

```bash
# Build the app
pnpm --filter @acme/api build

# The output is in dist/
```

### Production Considerations

1. **Environment**: Set `NODE_ENV=production`
2. **CORS**: Configure allowed origins for production domains
3. **SSL**: Ensure cookies have `Secure: true` in production
4. **Database**: Use connection pooling for production

## Adding New Functionality

### Adding a New Controller

1. Create the controller:

```typescript
// src/example/example.controller.ts
import { Controller, Get } from '@nestjs/common'

@Controller('example')
export class ExampleController {
  @Get()
  getExample() {
    return { message: 'Hello' }
  }
}
```

2. Add to AppModule:

```typescript
// src/app.module.ts
@Module({
  imports: [ConfigModule.forRoot(), TrpcModule],
  controllers: [HealthController, ExampleController],
})
export class AppModule {}
```

### Extending tRPC Context

If you need additional context in tRPC procedures:

```typescript
// src/trpc/trpc.middleware.ts
createContext: async ({ req }) => {
  const session = await getSessionFromCookieHeader(req.headers.cookie)
  const db = createDb(session)

  return {
    session,
    db,
    // Add custom context
    requestId: req.headers['x-request-id'],
  }
}
```

## Dependencies

### Workspace Dependencies

- `@acme/api-contract` - tRPC router and procedures
- `@acme/auth` - Authentication utilities
- `@acme/db` - Database client

### External Dependencies

- `@nestjs/common`, `@nestjs/core` - NestJS framework
- `@nestjs/config` - Environment configuration
- `@nestjs/platform-express` - Express adapter
- `@trpc/server` - tRPC server
- `express` - HTTP server
- `reflect-metadata` - Decorator support
- `rxjs` - Reactive extensions (NestJS requirement)
