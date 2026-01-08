import type { SessionUser } from "@acme/auth";
import type { EnhancedClient } from "@acme/db";

export type TRPCContext = {
    session: SessionUser | null;
    db: EnhancedClient;
};

type CreateContextOptions = {
    session: SessionUser | null;
    db: EnhancedClient;
};

export function createTRPCContext(opts: CreateContextOptions): TRPCContext {
    return {
        session: opts.session,
        db: opts.db,
    };
}
