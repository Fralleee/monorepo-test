import type { UserRole } from "@acme/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { TRPCContext } from "./context";

export const t = initTRPC.context<TRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

/** @knipignore */
export const router = t.router;
/** @knipignore */
export const middleware = t.middleware;

// Public procedure - no auth required
export const publicProcedure = t.procedure;

// Middleware to check if user is authenticated
const isAuthed = middleware(({ ctx, next }) => {
    if (!ctx.session) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to access this resource",
        });
    }
    return next({
        ctx: {
            ...ctx,
            session: ctx.session,
        },
    });
});

// Authenticated procedure - requires valid session
export const authedProcedure = t.procedure.use(isAuthed);

// Role-based middleware factory
export function requireRole(...roles: UserRole[]) {
    return middleware(({ ctx, next }) => {
        if (!ctx.session) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You must be logged in to access this resource",
            });
        }

        if (!roles.includes(ctx.session.role)) {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: `This action requires one of the following roles: ${roles.join(", ")}`,
            });
        }

        return next({
            ctx: {
                ...ctx,
                session: ctx.session,
            },
        });
    });
}

// Admin-only procedure
export const adminProcedure = t.procedure.use(requireRole("ADMIN"));
