import { Injectable, type NestMiddleware } from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter, createTRPCContext } from '@acme/api-contract'
import { getSessionFromCookieHeader } from '@acme/auth'
import { createDb } from '@acme/db'

@Injectable()
export class TrpcMiddleware implements NestMiddleware {
  private middleware = createExpressMiddleware({
    router: appRouter,
    createContext: async ({ req }) => {
      const cookieHeader = req.headers.cookie
      const session = await getSessionFromCookieHeader(cookieHeader)
      const db = createDb(session)

      return createTRPCContext({
        session,
        db,
      })
    },
    onError({ error, path }) {
      // biome-ignore lint/suspicious/noConsole: Error logging
      console.error(`tRPC error on path "${path}":`, error)
    },
  })

  use(req: Request, res: Response, next: NextFunction) {
    // Strip /trpc prefix for the tRPC middleware
    const originalUrl = req.url
    req.url = req.url.replace(/^\/trpc/, '') || '/'

    this.middleware(req, res, (err?: unknown) => {
      req.url = originalUrl
      next(err)
    })
  }
}
