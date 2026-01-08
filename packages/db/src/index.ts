import type { SessionUser } from "@acme/auth";
import type { ClientOptions } from "@zenstackhq/orm";
import { ZenStackClient } from "@zenstackhq/orm";
import { PostgresDialect } from "@zenstackhq/orm/dialects/postgres";
import { PolicyPlugin } from "@zenstackhq/plugin-policy";
import { Pool } from "pg";
import { SchemaType } from "../zenstack/schema";

// Export types from generated schema
export type { Clinic, Treatment, TreatmentsByClinic } from "../zenstack/models";

// Create the schema instance
const schema = new SchemaType();

// Create a PostgreSQL connection pool
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

// Create the dialect
const dialect = new PostgresDialect({ pool });

// Define client options with proper typing
const clientOptions: ClientOptions<SchemaType> = {
	dialect,
	plugins: [new PolicyPlugin<SchemaType>()],
	log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
};

// Global client for connection pooling
const globalForDb = globalThis as unknown as {
	db: ReturnType<typeof createBaseClient> | undefined;
};

function createBaseClient() {
	return new ZenStackClient(schema, clientOptions);
}

const baseClient = globalForDb.db ?? createBaseClient();

if (process.env.NODE_ENV !== "production") {
	globalForDb.db = baseClient;
}

/**
 * Creates a ZenStack client with access control based on session
 * @param session - The authenticated user session
 * @returns ZenStack client with row-level security
 */
export function createDb(session: SessionUser | null) {
	const authContext = session
		? {
				id: session.id,
				role: session.role,
			}
		: undefined;

	return baseClient.$setAuth(authContext);
}

export type EnhancedPrismaClient = typeof baseClient;
