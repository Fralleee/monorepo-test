import type { SessionUser } from "@acme/auth";
import type { EnhancedPrismaClient } from "@acme/db";

export type TRPCContext = {
    session: SessionUser | null;
    db: EnhancedPrismaClient;
};

export type CreateContextOptions = {
    session: SessionUser | null;
    db: EnhancedPrismaClient;
};

export function createTRPCContext(opts: CreateContextOptions): TRPCContext {
    return {
        session: opts.session,
        db: opts.db,
    };
}
