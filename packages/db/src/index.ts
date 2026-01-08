import type { SessionUser } from "@acme/auth";
import type { ClientOptions } from "@zenstackhq/orm";
import { ZenStackClient } from "@zenstackhq/orm";
import { PostgresDialect } from "@zenstackhq/orm/dialects/postgres";
import { PolicyPlugin } from "@zenstackhq/plugin-policy";
import { Pool } from "pg";
import { SchemaType } from "../zenstack/schema";

// Export types from generated schema
export type { Clinic, Treatment, TreatmentsByClinic } from "../zenstack/models";

// Type for the ZenStack client instance
type ZenStackClientInstance = InstanceType<typeof ZenStackClient<SchemaType>>;

// Global client for connection pooling (lazy initialized)
const globalForDb = globalThis as unknown as {
	db: ZenStackClientInstance | undefined;
};

/**
 * Lazily creates and returns the ZenStack client.
 * This ensures DATABASE_URL is read after NestJS loads environment variables.
 */
function getBaseClient(): ZenStackClientInstance {
	if (globalForDb.db) {
		return globalForDb.db;
	}

	const schema = new SchemaType();

	const pool = new Pool({
		connectionString: process.env.DATABASE_URL,
	});

	const dialect = new PostgresDialect({ pool });

	const clientOptions: ClientOptions<SchemaType> = {
		dialect,
		plugins: [new PolicyPlugin<SchemaType>()],
		log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
	};

	const client = new ZenStackClient(schema, clientOptions);

	if (process.env.NODE_ENV !== "production") {
		globalForDb.db = client;
	}

	return client;
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

	return getBaseClient().$setAuth(authContext);
}

export type EnhancedClient = ZenStackClientInstance;
