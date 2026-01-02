import { PrismaClient } from '@prisma/client'
import { enhance } from '@zenstackhq/runtime'
import type { SessionUser } from '@acme/auth'

export { Prisma } from '@prisma/client'
export type { Clinic, Treatment, TreatmentsByClinic } from '@prisma/client'

// Global prisma instance for connection pooling
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// ZenStack auth context type
type AuthContext = {
  id: string
  role: string
}

/**
 * Creates a ZenStack-enhanced Prisma client with access control based on session
 * @param session - The authenticated user session from SlashID
 * @returns Enhanced Prisma client with row-level security
 */
export function createDb(session: SessionUser | null) {
  const authContext: AuthContext | undefined = session
    ? {
        id: session.id,
        role: session.role,
      }
    : undefined

  return enhance(prisma, { user: authContext })
}

export type EnhancedPrismaClient = ReturnType<typeof createDb>
