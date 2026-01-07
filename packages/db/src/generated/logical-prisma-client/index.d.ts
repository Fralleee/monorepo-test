import * as runtime from "./runtime/library.js";

import $Types = runtime.Types
// general types
import $Public = runtime.Types.Public

import $Utils = runtime.Types.Utils

import $Extensions = runtime.Types.Extensions

import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>;
/**
 * Model Clinic
 * @
 * @allow ('read', auth() != null)
 * @
 * @allow ('create,update,delete', auth().role == 'ADMIN')
 */
export type Clinic = $Result.DefaultSelection<Prisma.$ClinicPayload>;
/**
 * Model Treatment
 * @
 * @allow ('read', auth() != null)
 * @
 * @allow ('create,update,delete', auth().role == 'ADMIN')
 */
export type Treatment = $Result.DefaultSelection<Prisma.$TreatmentPayload>;
/**
 * Model TreatmentsByClinic
 * @
 * @allow ('read', auth() != null)
 * @
 * @allow ('create,update,delete', auth().role == 'ADMIN')
 */
export type TreatmentsByClinic = $Result.DefaultSelection<Prisma.$TreatmentsByClinicPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clinics
 * const clinics = await prisma.clinic.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
        extArgs: ExtArgs
    }>>;
    /**
     * ##  Prisma Client ʲˢ
     *
     * Type-safe database client for TypeScript & Node.js
     * @example
     * ```
     * const prisma = new PrismaClient()
     * // Fetch zero or more Clinics
     * const clinics = await prisma.clinic.findMany()
     * ```
     *
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
     */
    constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
    /**
     * `prisma.clinic`: Exposes CRUD operations for the **Clinic** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Clinics
     * const clinics = await prisma.clinic.findMany()
     * ```
     */
    get clinic(): Prisma.ClinicDelegate<ExtArgs, ClientOptions>;
    /**
     * `prisma.treatment`: Exposes CRUD operations for the **Treatment** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Treatments
     * const treatments = await prisma.treatment.findMany()
     * ```
     */
    get treatment(): Prisma.TreatmentDelegate<ExtArgs, ClientOptions>;
    /**
     * `prisma.treatmentsByClinic`: Exposes CRUD operations for the **TreatmentsByClinic** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more TreatmentsByClinics
     * const treatmentsByClinics = await prisma.treatmentsByClinic.findMany()
     * ```
     */
    get treatmentsByClinic(): Prisma.TreatmentsByClinicDelegate<ExtArgs, ClientOptions>;
    $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): $Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): $Utils.JsPromise<void>;
    /**
     * Executes a prepared raw query and returns the number of affected rows.
     * @example
     * ```
     * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>;
}

export namespace Prisma {

    export import DMMF = runtime.DMMF


    /**
     * Validator
     */
    export import validator = runtime.Public.validator


    /**
     * Prisma Errors
     */
    export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError

    export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError

    export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError

    export import PrismaClientInitializationError = runtime.PrismaClientInitializationError

    export import PrismaClientValidationError = runtime.PrismaClientValidationError


    /**
     * Re-export of sql-template-tag
     */
    export import sql = runtime.sqltag

    export import empty = runtime.empty

    export import join = runtime.join

    export import raw = runtime.raw

    export import Sql = runtime.Sql




    /**
     * Decimal.js
     */
    export import Decimal = runtime.Decimal


    /**
    * Extensions
    */
    export import Extension = $Extensions.UserArgs

    export import getExtensionContext = runtime.Extensions.getExtensionContext

    export import Args = $Public.Args

    export import Payload = $Public.Payload

    export import Result = $Public.Result

    export import Exact = $Public.Exact


    /**
     * Utility Types
     */


    export import Bytes = runtime.Bytes

    export import JsonObject = runtime.JsonObject

    export import JsonArray = runtime.JsonArray

    export import JsonValue = runtime.JsonValue

    export import InputJsonObject = runtime.InputJsonObject

    export import InputJsonArray = runtime.InputJsonArray

    export import InputJsonValue = runtime.InputJsonValue

    export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

    /**
     * Types of the values used to represent different kinds of `null` values when working with JSON fields.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    namespace NullTypes {
        /**
         * Type of `Prisma.DbNull`.
         *
         * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
         *
         * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
         */
        class DbNull {
            private DbNull: never;
            private constructor();
        }

        /**
         * Type of `Prisma.JsonNull`.
         *
         * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
         *
         * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
         */
        class JsonNull {
            private JsonNull: never;
            private constructor();
        }

        /**
         * Type of `Prisma.AnyNull`.
         *
         * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
         *
         * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
         */
        class AnyNull {
            private AnyNull: never;
            private constructor();
        }
    }

    export const prismaVersion: PrismaVersion;
    /**
     * Helper for filtering JSON entries that have `null` on the database (empty on the db)
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    export const DbNull: NullTypes.DbNull;
    /**
     * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    export const JsonNull: NullTypes.JsonNull;
    /**
     * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    export const AnyNull: NullTypes.AnyNull;
    export const type: unique symbol;
    export const ModelName: {
        Clinic: 'Clinic',
        Treatment: 'Treatment',
        TreatmentsByClinic: 'TreatmentsByClinic'
    };
    export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>;
    /**
     * Enums
     */
    export const TransactionIsolationLevel: {
        ReadCommitted: 'ReadCommitted',
        Serializable: 'Serializable'
    };
    export const ClinicScalarFieldEnum: {
        id: 'id',
        name: 'name',
        code: 'code',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    };
    export const TreatmentScalarFieldEnum: {
        id: 'id',
        name: 'name',
        description: 'description',
        price: 'price',
        maintenanceIntervalMonths: 'maintenanceIntervalMonths',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    };
    export const TreatmentsByClinicScalarFieldEnum: {
        id: 'id',
        clinicId: 'clinicId',
        treatmentId: 'treatmentId',
        priceOverride: 'priceOverride',
        notes: 'notes',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    };
    export const SortOrder: {
        asc: 'asc',
        desc: 'desc'
    };
    export const QueryMode: {
        default: 'default',
        insensitive: 'insensitive'
    };
    export const NullsOrder: {
        first: 'first',
        last: 'last'
    };
    /**
     * DMMF
     */
    export const dmmf: runtime.BaseDMMF;

    interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{ extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
        returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>;
    }

    export interface PrismaClientOptions {
        /**
         * Overwrites the datasource url from your schema.prisma file
         */
        datasources?: Datasources;
        /**
         * Overwrites the datasource url from your schema.prisma file
         */
        datasourceUrl?: string;
        /** @default "colorless" */
        errorFormat?: ErrorFormat;
        /**
         * @example
         * ```
         * // Shorthand for `emit: 'stdout'`
         * log: ['query', 'info', 'warn', 'error']
         *
         * // Emit as events only
         * log: [
         *   { emit: 'event', level: 'query' },
         *   { emit: 'event', level: 'info' },
         *   { emit: 'event', level: 'warn' }
         *   { emit: 'event', level: 'error' }
         * ]
         *
         * / Emit as events and log to stdout
         * og: [
         *  { emit: 'stdout', level: 'query' },
         *  { emit: 'stdout', level: 'info' },
         *  { emit: 'stdout', level: 'warn' }
         *  { emit: 'stdout', level: 'error' }
         *
         * ```
         * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
         */
        log?: (LogLevel | LogDefinition)[];
        /**
         * The default values for transactionOptions
         * maxWait ?= 2000
         * timeout ?= 5000
         */
        transactionOptions?: {
            maxWait?: number
            timeout?: number
            isolationLevel?: Prisma.TransactionIsolationLevel
        };
        /**
         * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
         */
        adapter?: runtime.SqlDriverAdapterFactory | null;
        /**
         * Global configuration for omitting model fields by default.
         *
         * @example
         * ```
         * const prisma = new PrismaClient({
         *   omit: {
         *     user: {
         *       password: true
         *     }
         *   }
         * })
         * ```
         */
        omit?: Prisma.GlobalOmitConfig;
    }

    export interface ClinicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clinic'], meta: { name: 'Clinic' } };
        /**
         * Fields of the Clinic model
         */
        readonly fields: ClinicFieldRefs;
        /**
         * Find zero or one Clinic that matches the filter.
         * @param {ClinicFindUniqueArgs} args - Arguments to find a Clinic
         * @example
         * // Get one Clinic
         * const clinic = await prisma.clinic.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends ClinicFindUniqueArgs>(args: SelectSubset<T, ClinicFindUniqueArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        /**
         * Find one Clinic that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {ClinicFindUniqueOrThrowArgs} args - Arguments to find a Clinic
         * @example
         * // Get one Clinic
         * const clinic = await prisma.clinic.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends ClinicFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Find the first Clinic that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ClinicFindFirstArgs} args - Arguments to find a Clinic
         * @example
         * // Get one Clinic
         * const clinic = await prisma.clinic.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends ClinicFindFirstArgs>(args?: SelectSubset<T, ClinicFindFirstArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        /**
         * Find the first Clinic that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ClinicFindFirstOrThrowArgs} args - Arguments to find a Clinic
         * @example
         * // Get one Clinic
         * const clinic = await prisma.clinic.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends ClinicFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Find zero or more Clinics that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ClinicFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all Clinics
         * const clinics = await prisma.clinic.findMany()
         *
         * // Get first 10 Clinics
         * const clinics = await prisma.clinic.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const clinicWithIdOnly = await prisma.clinic.findMany({ select: { id: true } })
         */
        findMany<T extends ClinicFindManyArgs>(args?: SelectSubset<T, ClinicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        /**
         * Create a Clinic.
         * @param {ClinicCreateArgs} args - Arguments to create a Clinic.
         * @example
         * // Create one Clinic
         * const Clinic = await prisma.clinic.create({
         *   data: {
         *     // ... data to create a Clinic
         *   }
         * })
         */
        create<T extends ClinicCreateArgs>(args: SelectSubset<T, ClinicCreateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Create many Clinics.
         * @param {ClinicCreateManyArgs} args - Arguments to create many Clinics.
         * @example
         * // Create many Clinics
         * const clinic = await prisma.clinic.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         */
        createMany<T extends ClinicCreateManyArgs>(args?: SelectSubset<T, ClinicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        /**
         * Create many Clinics and returns the data saved in the database.
         * @param {ClinicCreateManyAndReturnArgs} args - Arguments to create many Clinics.
         * @example
         * // Create many Clinics
         * const clinic = await prisma.clinic.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many Clinics and only return the `id`
         * const clinicWithIdOnly = await prisma.clinic.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         */
        createManyAndReturn<T extends ClinicCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        /**
         * Delete a Clinic.
         * @param {ClinicDeleteArgs} args - Arguments to delete one Clinic.
         * @example
         * // Delete one Clinic
         * const Clinic = await prisma.clinic.delete({
         *   where: {
         *     // ... filter to delete one Clinic
         *   }
         * })
         */
        delete<T extends ClinicDeleteArgs>(args: SelectSubset<T, ClinicDeleteArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Update one Clinic.
         * @param {ClinicUpdateArgs} args - Arguments to update one Clinic.
         * @example
         * // Update one Clinic
         * const clinic = await prisma.clinic.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         */
        update<T extends ClinicUpdateArgs>(args: SelectSubset<T, ClinicUpdateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Delete zero or more Clinics.
         * @param {ClinicDeleteManyArgs} args - Arguments to filter Clinics to delete.
         * @example
         * // Delete a few Clinics
         * const { count } = await prisma.clinic.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        deleteMany<T extends ClinicDeleteManyArgs>(args?: SelectSubset<T, ClinicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        /**
         * Update zero or more Clinics.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ClinicUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many Clinics
         * const clinic = await prisma.clinic.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         */
        updateMany<T extends ClinicUpdateManyArgs>(args: SelectSubset<T, ClinicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        /**
         * Update zero or more Clinics and returns the data updated in the database.
         * @param {ClinicUpdateManyAndReturnArgs} args - Arguments to update many Clinics.
         * @example
         * // Update many Clinics
         * const clinic = await prisma.clinic.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more Clinics and only return the `id`
         * const clinicWithIdOnly = await prisma.clinic.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         */
        updateManyAndReturn<T extends ClinicUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        /**
         * Create or update one Clinic.
         * @param {ClinicUpsertArgs} args - Arguments to update or create a Clinic.
         * @example
         * // Update or create a Clinic
         * const clinic = await prisma.clinic.upsert({
         *   create: {
         *     // ... data to create a Clinic
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the Clinic we want to update
         *   }
         * })
         */
        upsert<T extends ClinicUpsertArgs>(args: SelectSubset<T, ClinicUpsertArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Count the number of Clinics.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ClinicCountArgs} args - Arguments to filter Clinics to count.
         * @example
         * // Count the number of Clinics
         * const count = await prisma.clinic.count({
         *   where: {
         *     // ... the filter for the Clinics we want to count
         *   }
         * })
         */
        count<T extends ClinicCountArgs>(args?: Subset<T, ClinicCountArgs>): Prisma.PrismaPromise<
            T extends $Utils.Record<'select', any>
            ? T['select'] extends true
            ? number
            : GetScalarType<T['select'], ClinicCountAggregateOutputType>
            : number
        >;
        /**
         * Allows you to perform aggregations operations on a Clinic.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ClinicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         */
        aggregate<T extends ClinicAggregateArgs>(args: Subset<T, ClinicAggregateArgs>): Prisma.PrismaPromise<GetClinicAggregateType<T>>;
        /**
         * Group by Clinic.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ClinicGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         */
        groupBy<T extends ClinicGroupByArgs, HasSelectOrTake extends Or<
            Extends<'skip', Keys<T>>,
            Extends<'take', Keys<T>>
        >, OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicGroupByArgs['orderBy'] }
        : { orderBy?: ClinicGroupByArgs['orderBy'] }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
            ]
        }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
        ? ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
        ? ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]>(args: SubsetIntersection<T, ClinicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    }

    /**
     * The delegate class that acts as a "Promise-like" for Clinic.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__ClinicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        treatmentsByClinic<T extends Clinic$treatmentsByClinicArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$treatmentsByClinicArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }

    /**
     * Fields of the Clinic model
     */
    interface ClinicFieldRefs {
        readonly id: FieldRef<"Clinic", 'String'>;
        readonly name: FieldRef<"Clinic", 'String'>;
        readonly code: FieldRef<"Clinic", 'String'>;
        readonly createdAt: FieldRef<"Clinic", 'DateTime'>;
        readonly updatedAt: FieldRef<"Clinic", 'DateTime'>;
    }

    export interface TreatmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Treatment'], meta: { name: 'Treatment' } };
        /**
         * Fields of the Treatment model
         */
        readonly fields: TreatmentFieldRefs;
        /**
         * Find zero or one Treatment that matches the filter.
         * @param {TreatmentFindUniqueArgs} args - Arguments to find a Treatment
         * @example
         * // Get one Treatment
         * const treatment = await prisma.treatment.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends TreatmentFindUniqueArgs>(args: SelectSubset<T, TreatmentFindUniqueArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        /**
         * Find one Treatment that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {TreatmentFindUniqueOrThrowArgs} args - Arguments to find a Treatment
         * @example
         * // Get one Treatment
         * const treatment = await prisma.treatment.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends TreatmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TreatmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Find the first Treatment that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentFindFirstArgs} args - Arguments to find a Treatment
         * @example
         * // Get one Treatment
         * const treatment = await prisma.treatment.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends TreatmentFindFirstArgs>(args?: SelectSubset<T, TreatmentFindFirstArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        /**
         * Find the first Treatment that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentFindFirstOrThrowArgs} args - Arguments to find a Treatment
         * @example
         * // Get one Treatment
         * const treatment = await prisma.treatment.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends TreatmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TreatmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Find zero or more Treatments that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all Treatments
         * const treatments = await prisma.treatment.findMany()
         *
         * // Get first 10 Treatments
         * const treatments = await prisma.treatment.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const treatmentWithIdOnly = await prisma.treatment.findMany({ select: { id: true } })
         */
        findMany<T extends TreatmentFindManyArgs>(args?: SelectSubset<T, TreatmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        /**
         * Create a Treatment.
         * @param {TreatmentCreateArgs} args - Arguments to create a Treatment.
         * @example
         * // Create one Treatment
         * const Treatment = await prisma.treatment.create({
         *   data: {
         *     // ... data to create a Treatment
         *   }
         * })
         */
        create<T extends TreatmentCreateArgs>(args: SelectSubset<T, TreatmentCreateArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Create many Treatments.
         * @param {TreatmentCreateManyArgs} args - Arguments to create many Treatments.
         * @example
         * // Create many Treatments
         * const treatment = await prisma.treatment.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         */
        createMany<T extends TreatmentCreateManyArgs>(args?: SelectSubset<T, TreatmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        /**
         * Create many Treatments and returns the data saved in the database.
         * @param {TreatmentCreateManyAndReturnArgs} args - Arguments to create many Treatments.
         * @example
         * // Create many Treatments
         * const treatment = await prisma.treatment.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many Treatments and only return the `id`
         * const treatmentWithIdOnly = await prisma.treatment.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         */
        createManyAndReturn<T extends TreatmentCreateManyAndReturnArgs>(args?: SelectSubset<T, TreatmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        /**
         * Delete a Treatment.
         * @param {TreatmentDeleteArgs} args - Arguments to delete one Treatment.
         * @example
         * // Delete one Treatment
         * const Treatment = await prisma.treatment.delete({
         *   where: {
         *     // ... filter to delete one Treatment
         *   }
         * })
         */
        delete<T extends TreatmentDeleteArgs>(args: SelectSubset<T, TreatmentDeleteArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Update one Treatment.
         * @param {TreatmentUpdateArgs} args - Arguments to update one Treatment.
         * @example
         * // Update one Treatment
         * const treatment = await prisma.treatment.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         */
        update<T extends TreatmentUpdateArgs>(args: SelectSubset<T, TreatmentUpdateArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Delete zero or more Treatments.
         * @param {TreatmentDeleteManyArgs} args - Arguments to filter Treatments to delete.
         * @example
         * // Delete a few Treatments
         * const { count } = await prisma.treatment.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        deleteMany<T extends TreatmentDeleteManyArgs>(args?: SelectSubset<T, TreatmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        /**
         * Update zero or more Treatments.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many Treatments
         * const treatment = await prisma.treatment.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         */
        updateMany<T extends TreatmentUpdateManyArgs>(args: SelectSubset<T, TreatmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        /**
         * Update zero or more Treatments and returns the data updated in the database.
         * @param {TreatmentUpdateManyAndReturnArgs} args - Arguments to update many Treatments.
         * @example
         * // Update many Treatments
         * const treatment = await prisma.treatment.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more Treatments and only return the `id`
         * const treatmentWithIdOnly = await prisma.treatment.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         */
        updateManyAndReturn<T extends TreatmentUpdateManyAndReturnArgs>(args: SelectSubset<T, TreatmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        /**
         * Create or update one Treatment.
         * @param {TreatmentUpsertArgs} args - Arguments to update or create a Treatment.
         * @example
         * // Update or create a Treatment
         * const treatment = await prisma.treatment.upsert({
         *   create: {
         *     // ... data to create a Treatment
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the Treatment we want to update
         *   }
         * })
         */
        upsert<T extends TreatmentUpsertArgs>(args: SelectSubset<T, TreatmentUpsertArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Count the number of Treatments.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentCountArgs} args - Arguments to filter Treatments to count.
         * @example
         * // Count the number of Treatments
         * const count = await prisma.treatment.count({
         *   where: {
         *     // ... the filter for the Treatments we want to count
         *   }
         * })
         */
        count<T extends TreatmentCountArgs>(args?: Subset<T, TreatmentCountArgs>): Prisma.PrismaPromise<
            T extends $Utils.Record<'select', any>
            ? T['select'] extends true
            ? number
            : GetScalarType<T['select'], TreatmentCountAggregateOutputType>
            : number
        >;
        /**
         * Allows you to perform aggregations operations on a Treatment.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         */
        aggregate<T extends TreatmentAggregateArgs>(args: Subset<T, TreatmentAggregateArgs>): Prisma.PrismaPromise<GetTreatmentAggregateType<T>>;
        /**
         * Group by Treatment.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         */
        groupBy<T extends TreatmentGroupByArgs, HasSelectOrTake extends Or<
            Extends<'skip', Keys<T>>,
            Extends<'take', Keys<T>>
        >, OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreatmentGroupByArgs['orderBy'] }
        : { orderBy?: TreatmentGroupByArgs['orderBy'] }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
            ]
        }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
        ? ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
        ? ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]>(args: SubsetIntersection<T, TreatmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreatmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    }

    /**
     * The delegate class that acts as a "Promise-like" for Treatment.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__TreatmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        treatmentsByClinic<T extends Treatment$treatmentsByClinicArgs<ExtArgs> = {}>(args?: Subset<T, Treatment$treatmentsByClinicArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }

    /**
     * Fields of the Treatment model
     */
    interface TreatmentFieldRefs {
        readonly id: FieldRef<"Treatment", 'String'>;
        readonly name: FieldRef<"Treatment", 'String'>;
        readonly description: FieldRef<"Treatment", 'String'>;
        readonly price: FieldRef<"Treatment", 'Decimal'>;
        readonly maintenanceIntervalMonths: FieldRef<"Treatment", 'Int'>;
        readonly createdAt: FieldRef<"Treatment", 'DateTime'>;
        readonly updatedAt: FieldRef<"Treatment", 'DateTime'>;
    }

    export interface TreatmentsByClinicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TreatmentsByClinic'], meta: { name: 'TreatmentsByClinic' } };
        /**
         * Fields of the TreatmentsByClinic model
         */
        readonly fields: TreatmentsByClinicFieldRefs;
        /**
         * Find zero or one TreatmentsByClinic that matches the filter.
         * @param {TreatmentsByClinicFindUniqueArgs} args - Arguments to find a TreatmentsByClinic
         * @example
         * // Get one TreatmentsByClinic
         * const treatmentsByClinic = await prisma.treatmentsByClinic.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends TreatmentsByClinicFindUniqueArgs>(args: SelectSubset<T, TreatmentsByClinicFindUniqueArgs<ExtArgs>>): Prisma__TreatmentsByClinicClient<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        /**
         * Find one TreatmentsByClinic that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {TreatmentsByClinicFindUniqueOrThrowArgs} args - Arguments to find a TreatmentsByClinic
         * @example
         * // Get one TreatmentsByClinic
         * const treatmentsByClinic = await prisma.treatmentsByClinic.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends TreatmentsByClinicFindUniqueOrThrowArgs>(args: SelectSubset<T, TreatmentsByClinicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TreatmentsByClinicClient<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Find the first TreatmentsByClinic that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentsByClinicFindFirstArgs} args - Arguments to find a TreatmentsByClinic
         * @example
         * // Get one TreatmentsByClinic
         * const treatmentsByClinic = await prisma.treatmentsByClinic.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends TreatmentsByClinicFindFirstArgs>(args?: SelectSubset<T, TreatmentsByClinicFindFirstArgs<ExtArgs>>): Prisma__TreatmentsByClinicClient<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        /**
         * Find the first TreatmentsByClinic that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentsByClinicFindFirstOrThrowArgs} args - Arguments to find a TreatmentsByClinic
         * @example
         * // Get one TreatmentsByClinic
         * const treatmentsByClinic = await prisma.treatmentsByClinic.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends TreatmentsByClinicFindFirstOrThrowArgs>(args?: SelectSubset<T, TreatmentsByClinicFindFirstOrThrowArgs<ExtArgs>>): Prisma__TreatmentsByClinicClient<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Find zero or more TreatmentsByClinics that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentsByClinicFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all TreatmentsByClinics
         * const treatmentsByClinics = await prisma.treatmentsByClinic.findMany()
         *
         * // Get first 10 TreatmentsByClinics
         * const treatmentsByClinics = await prisma.treatmentsByClinic.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const treatmentsByClinicWithIdOnly = await prisma.treatmentsByClinic.findMany({ select: { id: true } })
         */
        findMany<T extends TreatmentsByClinicFindManyArgs>(args?: SelectSubset<T, TreatmentsByClinicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        /**
         * Create a TreatmentsByClinic.
         * @param {TreatmentsByClinicCreateArgs} args - Arguments to create a TreatmentsByClinic.
         * @example
         * // Create one TreatmentsByClinic
         * const TreatmentsByClinic = await prisma.treatmentsByClinic.create({
         *   data: {
         *     // ... data to create a TreatmentsByClinic
         *   }
         * })
         */
        create<T extends TreatmentsByClinicCreateArgs>(args: SelectSubset<T, TreatmentsByClinicCreateArgs<ExtArgs>>): Prisma__TreatmentsByClinicClient<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Create many TreatmentsByClinics.
         * @param {TreatmentsByClinicCreateManyArgs} args - Arguments to create many TreatmentsByClinics.
         * @example
         * // Create many TreatmentsByClinics
         * const treatmentsByClinic = await prisma.treatmentsByClinic.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         */
        createMany<T extends TreatmentsByClinicCreateManyArgs>(args?: SelectSubset<T, TreatmentsByClinicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        /**
         * Create many TreatmentsByClinics and returns the data saved in the database.
         * @param {TreatmentsByClinicCreateManyAndReturnArgs} args - Arguments to create many TreatmentsByClinics.
         * @example
         * // Create many TreatmentsByClinics
         * const treatmentsByClinic = await prisma.treatmentsByClinic.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many TreatmentsByClinics and only return the `id`
         * const treatmentsByClinicWithIdOnly = await prisma.treatmentsByClinic.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         */
        createManyAndReturn<T extends TreatmentsByClinicCreateManyAndReturnArgs>(args?: SelectSubset<T, TreatmentsByClinicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        /**
         * Delete a TreatmentsByClinic.
         * @param {TreatmentsByClinicDeleteArgs} args - Arguments to delete one TreatmentsByClinic.
         * @example
         * // Delete one TreatmentsByClinic
         * const TreatmentsByClinic = await prisma.treatmentsByClinic.delete({
         *   where: {
         *     // ... filter to delete one TreatmentsByClinic
         *   }
         * })
         */
        delete<T extends TreatmentsByClinicDeleteArgs>(args: SelectSubset<T, TreatmentsByClinicDeleteArgs<ExtArgs>>): Prisma__TreatmentsByClinicClient<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Update one TreatmentsByClinic.
         * @param {TreatmentsByClinicUpdateArgs} args - Arguments to update one TreatmentsByClinic.
         * @example
         * // Update one TreatmentsByClinic
         * const treatmentsByClinic = await prisma.treatmentsByClinic.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         */
        update<T extends TreatmentsByClinicUpdateArgs>(args: SelectSubset<T, TreatmentsByClinicUpdateArgs<ExtArgs>>): Prisma__TreatmentsByClinicClient<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Delete zero or more TreatmentsByClinics.
         * @param {TreatmentsByClinicDeleteManyArgs} args - Arguments to filter TreatmentsByClinics to delete.
         * @example
         * // Delete a few TreatmentsByClinics
         * const { count } = await prisma.treatmentsByClinic.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        deleteMany<T extends TreatmentsByClinicDeleteManyArgs>(args?: SelectSubset<T, TreatmentsByClinicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        /**
         * Update zero or more TreatmentsByClinics.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentsByClinicUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many TreatmentsByClinics
         * const treatmentsByClinic = await prisma.treatmentsByClinic.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         */
        updateMany<T extends TreatmentsByClinicUpdateManyArgs>(args: SelectSubset<T, TreatmentsByClinicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        /**
         * Update zero or more TreatmentsByClinics and returns the data updated in the database.
         * @param {TreatmentsByClinicUpdateManyAndReturnArgs} args - Arguments to update many TreatmentsByClinics.
         * @example
         * // Update many TreatmentsByClinics
         * const treatmentsByClinic = await prisma.treatmentsByClinic.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more TreatmentsByClinics and only return the `id`
         * const treatmentsByClinicWithIdOnly = await prisma.treatmentsByClinic.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         */
        updateManyAndReturn<T extends TreatmentsByClinicUpdateManyAndReturnArgs>(args: SelectSubset<T, TreatmentsByClinicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        /**
         * Create or update one TreatmentsByClinic.
         * @param {TreatmentsByClinicUpsertArgs} args - Arguments to update or create a TreatmentsByClinic.
         * @example
         * // Update or create a TreatmentsByClinic
         * const treatmentsByClinic = await prisma.treatmentsByClinic.upsert({
         *   create: {
         *     // ... data to create a TreatmentsByClinic
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the TreatmentsByClinic we want to update
         *   }
         * })
         */
        upsert<T extends TreatmentsByClinicUpsertArgs>(args: SelectSubset<T, TreatmentsByClinicUpsertArgs<ExtArgs>>): Prisma__TreatmentsByClinicClient<$Result.GetResult<Prisma.$TreatmentsByClinicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        /**
         * Count the number of TreatmentsByClinics.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentsByClinicCountArgs} args - Arguments to filter TreatmentsByClinics to count.
         * @example
         * // Count the number of TreatmentsByClinics
         * const count = await prisma.treatmentsByClinic.count({
         *   where: {
         *     // ... the filter for the TreatmentsByClinics we want to count
         *   }
         * })
         */
        count<T extends TreatmentsByClinicCountArgs>(args?: Subset<T, TreatmentsByClinicCountArgs>): Prisma.PrismaPromise<
            T extends $Utils.Record<'select', any>
            ? T['select'] extends true
            ? number
            : GetScalarType<T['select'], TreatmentsByClinicCountAggregateOutputType>
            : number
        >;
        /**
         * Allows you to perform aggregations operations on a TreatmentsByClinic.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentsByClinicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         */
        aggregate<T extends TreatmentsByClinicAggregateArgs>(args: Subset<T, TreatmentsByClinicAggregateArgs>): Prisma.PrismaPromise<GetTreatmentsByClinicAggregateType<T>>;
        /**
         * Group by TreatmentsByClinic.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {TreatmentsByClinicGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         */
        groupBy<T extends TreatmentsByClinicGroupByArgs, HasSelectOrTake extends Or<
            Extends<'skip', Keys<T>>,
            Extends<'take', Keys<T>>
        >, OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreatmentsByClinicGroupByArgs['orderBy'] }
        : { orderBy?: TreatmentsByClinicGroupByArgs['orderBy'] }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
            ]
        }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
        ? ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
        ? ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]>(args: SubsetIntersection<T, TreatmentsByClinicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreatmentsByClinicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    }

    /**
     * The delegate class that acts as a "Promise-like" for TreatmentsByClinic.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__TreatmentsByClinicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        treatment<T extends TreatmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TreatmentDefaultArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }

    /**
     * Fields of the TreatmentsByClinic model
     */
    interface TreatmentsByClinicFieldRefs {
        readonly id: FieldRef<"TreatmentsByClinic", 'String'>;
        readonly clinicId: FieldRef<"TreatmentsByClinic", 'String'>;
        readonly treatmentId: FieldRef<"TreatmentsByClinic", 'String'>;
        readonly priceOverride: FieldRef<"TreatmentsByClinic", 'Decimal'>;
        readonly notes: FieldRef<"TreatmentsByClinic", 'String'>;
        readonly createdAt: FieldRef<"TreatmentsByClinic", 'DateTime'>;
        readonly updatedAt: FieldRef<"TreatmentsByClinic", 'DateTime'>;
    }

    export type PrismaPromise<T> = $Public.PrismaPromise<T>;
    export type DecimalJsLike = runtime.DecimalJsLike;
    /**
     * Metrics
     */
    export type Metrics = runtime.Metrics;
    export type Metric<T> = runtime.Metric<T>;
    export type MetricHistogram = runtime.MetricHistogram;
    export type MetricHistogramBucket = runtime.MetricHistogramBucket;
    /**
     * Prisma Client JS version: 6.19.1
     * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
     */
    export type PrismaVersion = {
        client: string
    };
    type SelectAndInclude = {
        select: any
        include: any
    };
    type SelectAndOmit = {
        select: any
        omit: any
    };
    /**
     * Get the type of the value, that the Promise holds.
     */
    export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;
    /**
     * Get the return type of a function which returns a Promise.
     */
    export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>;
    /**
     * From T, pick a set of properties whose keys are in the union K
     */
    type Prisma__Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
    export type Enumerable<T> = T | Array<T>;
    export type RequiredKeys<T> = {
        [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
    }[keyof T];
    export type TruthyKeys<T> = keyof {
        [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
    };
    export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;
    /**
     * Subset
     * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
     */
    export type Subset<T, U> = {
        [key in keyof T]: key extends keyof U ? T[key] : never;
    };
    /**
     * SelectSubset
     * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
     * Additionally, it validates, if both select and include are present. If the case, it errors.
     */
    export type SelectSubset<T, U> = {
        [key in keyof T]: key extends keyof U ? T[key] : never
    } &
        (T extends SelectAndInclude
            ? 'Please either choose `select` or `include`.'
            : T extends SelectAndOmit
            ? 'Please either choose `select` or `omit`.'
            : {});
    /**
     * Subset + Intersection
     * @desc From `T` pick properties that exist in `U` and intersect `K`
     */
    export type SubsetIntersection<T, U, K> = {
        [key in keyof T]: key extends keyof U ? T[key] : never
    } &
        K;
    type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
    /**
     * XOR is needed to have a real mutually exclusive union type
     * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
     */
    type XOR<T, U> = T extends object ?
        U extends object ?
        (Without<T, U> & U) | (Without<U, T> & T)
        : U : T;
    /**
     * Is T a Record?
     */
    type IsObject<T extends any> = T extends Array<any>
        ? False
        : T extends Date
        ? False
        : T extends Uint8Array
        ? False
        : T extends BigInt
        ? False
        : T extends object
        ? True
        : False;
    /**
     * If it's T[], return T
     */
    export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
    /**
     * From ts-toolbelt
     */
    type __Either<O extends object, K extends Key> = Omit<O, K> &
        {
            // Merge all but K
            [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
        }[K];
    type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
    type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
    type _Either<O extends object, K extends Key, strict extends Boolean> = {
        1: EitherStrict<O, K>
        0: EitherLoose<O, K>
    }[strict];
    type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
    export type Union = any;
    type PatchUndefined<O extends object, O1 extends object> = {
        [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
    } & {};
    /** Helper Types for "Merge" */
    export type IntersectOf<U extends Union> = (
        U extends unknown ? (k: U) => void : never
    ) extends (k: infer I) => void
        ? I
        : never;
    export type Overwrite<O extends object, O1 extends object> = {
        [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
    } & {};
    type _Merge<U extends object> = IntersectOf<Overwrite<U, {
        [K in keyof U]-?: At<U, K>;
    }>>;
    type Key = string | number | symbol;
    type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
    type AtStrict<O extends object, K extends Key> = O[K & keyof O];
    type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
    export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
        1: AtStrict<O, K>;
        0: AtLoose<O, K>;
    }[strict];
    export type ComputeRaw<A extends any> = A extends Function ? A : {
        [K in keyof A]: A[K];
    } & {};
    export type OptionalFlat<O> = {
        [K in keyof O]?: O[K];
    } & {};
    type _Record<K extends keyof any, T> = {
        [P in K]: T;
    };
    type NoExpand<T> = T extends unknown ? T : never;
    type AtLeast<O extends object, K extends string> = NoExpand<
        O extends unknown
        ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
        | { [P in keyof O as P extends K ? P : never]-?: O[P] } & O
        : never>;
    type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
    export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
    /** End Helper Types for "Merge" */
    export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
    /**
     *   A [[Boolean]]
     */
    export type Boolean = True | False;
    export type True = 1;
    /**
     *   0
     */
    export type False = 0;
    export type Not<B extends Boolean> = {
        0: 1
        1: 0
    }[B];
    export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
        ? 0 // anything `never` is false
        : A1 extends A2
        ? 1
        : 0;
    export type Has<U extends Union, U1 extends Union> = Not<
        Extends<Exclude<U1, U>, U1>
    >;
    export type Or<B1 extends Boolean, B2 extends Boolean> = {
        0: {
            0: 0
            1: 1
        }
        1: {
            0: 1
            1: 1
        }
    }[B1][B2];
    export type Keys<U extends Union> = U extends unknown ? keyof U : never;
    type Cast<A, B> = A extends B ? A : B;
    /**
     * Used by group by
     */
    export type GetScalarType<T, O> = O extends object ? {
        [P in keyof T]: P extends keyof O
        ? O[P]
        : never
    } : never;
    type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
    type GetHavingFields<T> = {
        [K in keyof T]: Or<
            Or<Extends<'OR', K>, Extends<'AND', K>>,
            Extends<'NOT', K>
        > extends True
        ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
        : {} extends FieldPaths<T[K]>
        ? never
        : K
    }[keyof T];
    /**
     * Convert tuple to union
     */
    type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
    type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
    type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
    /**
     * Like `Pick`, but additionally can also accept an array of keys
     */
    type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
    /**
     * Exclude all keys with underscores
     */
    type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
    export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
    type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
    export type ModelName = (typeof ModelName)[keyof typeof ModelName];
    export type Datasources = {
        db?: Datasource
    };
    export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
        globalOmitOptions: {
            omit: GlobalOmitOptions
        }
        meta: {
            modelProps: "clinic" | "treatment" | "treatmentsByClinic"
            txIsolationLevel: Prisma.TransactionIsolationLevel
        }
        model: {
            Clinic: {
                payload: Prisma.$ClinicPayload<ExtArgs>
                fields: Prisma.ClinicFieldRefs
                operations: {
                    findUnique: {
                        args: Prisma.ClinicFindUniqueArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
                    }
                    findUniqueOrThrow: {
                        args: Prisma.ClinicFindUniqueOrThrowArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
                    }
                    findFirst: {
                        args: Prisma.ClinicFindFirstArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
                    }
                    findFirstOrThrow: {
                        args: Prisma.ClinicFindFirstOrThrowArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
                    }
                    findMany: {
                        args: Prisma.ClinicFindManyArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
                    }
                    create: {
                        args: Prisma.ClinicCreateArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
                    }
                    createMany: {
                        args: Prisma.ClinicCreateManyArgs<ExtArgs>
                        result: BatchPayload
                    }
                    createManyAndReturn: {
                        args: Prisma.ClinicCreateManyAndReturnArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
                    }
                    delete: {
                        args: Prisma.ClinicDeleteArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
                    }
                    update: {
                        args: Prisma.ClinicUpdateArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
                    }
                    deleteMany: {
                        args: Prisma.ClinicDeleteManyArgs<ExtArgs>
                        result: BatchPayload
                    }
                    updateMany: {
                        args: Prisma.ClinicUpdateManyArgs<ExtArgs>
                        result: BatchPayload
                    }
                    updateManyAndReturn: {
                        args: Prisma.ClinicUpdateManyAndReturnArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
                    }
                    upsert: {
                        args: Prisma.ClinicUpsertArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
                    }
                    aggregate: {
                        args: Prisma.ClinicAggregateArgs<ExtArgs>
                        result: $Utils.Optional<AggregateClinic>
                    }
                    groupBy: {
                        args: Prisma.ClinicGroupByArgs<ExtArgs>
                        result: $Utils.Optional<ClinicGroupByOutputType>[]
                    }
                    count: {
                        args: Prisma.ClinicCountArgs<ExtArgs>
                        result: $Utils.Optional<ClinicCountAggregateOutputType> | number
                    }
                }
            }
            Treatment: {
                payload: Prisma.$TreatmentPayload<ExtArgs>
                fields: Prisma.TreatmentFieldRefs
                operations: {
                    findUnique: {
                        args: Prisma.TreatmentFindUniqueArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload> | null
                    }
                    findUniqueOrThrow: {
                        args: Prisma.TreatmentFindUniqueOrThrowArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
                    }
                    findFirst: {
                        args: Prisma.TreatmentFindFirstArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload> | null
                    }
                    findFirstOrThrow: {
                        args: Prisma.TreatmentFindFirstOrThrowArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
                    }
                    findMany: {
                        args: Prisma.TreatmentFindManyArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
                    }
                    create: {
                        args: Prisma.TreatmentCreateArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
                    }
                    createMany: {
                        args: Prisma.TreatmentCreateManyArgs<ExtArgs>
                        result: BatchPayload
                    }
                    createManyAndReturn: {
                        args: Prisma.TreatmentCreateManyAndReturnArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
                    }
                    delete: {
                        args: Prisma.TreatmentDeleteArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
                    }
                    update: {
                        args: Prisma.TreatmentUpdateArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
                    }
                    deleteMany: {
                        args: Prisma.TreatmentDeleteManyArgs<ExtArgs>
                        result: BatchPayload
                    }
                    updateMany: {
                        args: Prisma.TreatmentUpdateManyArgs<ExtArgs>
                        result: BatchPayload
                    }
                    updateManyAndReturn: {
                        args: Prisma.TreatmentUpdateManyAndReturnArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
                    }
                    upsert: {
                        args: Prisma.TreatmentUpsertArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
                    }
                    aggregate: {
                        args: Prisma.TreatmentAggregateArgs<ExtArgs>
                        result: $Utils.Optional<AggregateTreatment>
                    }
                    groupBy: {
                        args: Prisma.TreatmentGroupByArgs<ExtArgs>
                        result: $Utils.Optional<TreatmentGroupByOutputType>[]
                    }
                    count: {
                        args: Prisma.TreatmentCountArgs<ExtArgs>
                        result: $Utils.Optional<TreatmentCountAggregateOutputType> | number
                    }
                }
            }
            TreatmentsByClinic: {
                payload: Prisma.$TreatmentsByClinicPayload<ExtArgs>
                fields: Prisma.TreatmentsByClinicFieldRefs
                operations: {
                    findUnique: {
                        args: Prisma.TreatmentsByClinicFindUniqueArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload> | null
                    }
                    findUniqueOrThrow: {
                        args: Prisma.TreatmentsByClinicFindUniqueOrThrowArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload>
                    }
                    findFirst: {
                        args: Prisma.TreatmentsByClinicFindFirstArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload> | null
                    }
                    findFirstOrThrow: {
                        args: Prisma.TreatmentsByClinicFindFirstOrThrowArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload>
                    }
                    findMany: {
                        args: Prisma.TreatmentsByClinicFindManyArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload>[]
                    }
                    create: {
                        args: Prisma.TreatmentsByClinicCreateArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload>
                    }
                    createMany: {
                        args: Prisma.TreatmentsByClinicCreateManyArgs<ExtArgs>
                        result: BatchPayload
                    }
                    createManyAndReturn: {
                        args: Prisma.TreatmentsByClinicCreateManyAndReturnArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload>[]
                    }
                    delete: {
                        args: Prisma.TreatmentsByClinicDeleteArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload>
                    }
                    update: {
                        args: Prisma.TreatmentsByClinicUpdateArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload>
                    }
                    deleteMany: {
                        args: Prisma.TreatmentsByClinicDeleteManyArgs<ExtArgs>
                        result: BatchPayload
                    }
                    updateMany: {
                        args: Prisma.TreatmentsByClinicUpdateManyArgs<ExtArgs>
                        result: BatchPayload
                    }
                    updateManyAndReturn: {
                        args: Prisma.TreatmentsByClinicUpdateManyAndReturnArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload>[]
                    }
                    upsert: {
                        args: Prisma.TreatmentsByClinicUpsertArgs<ExtArgs>
                        result: $Utils.PayloadToResult<Prisma.$TreatmentsByClinicPayload>
                    }
                    aggregate: {
                        args: Prisma.TreatmentsByClinicAggregateArgs<ExtArgs>
                        result: $Utils.Optional<AggregateTreatmentsByClinic>
                    }
                    groupBy: {
                        args: Prisma.TreatmentsByClinicGroupByArgs<ExtArgs>
                        result: $Utils.Optional<TreatmentsByClinicGroupByOutputType>[]
                    }
                    count: {
                        args: Prisma.TreatmentsByClinicCountArgs<ExtArgs>
                        result: $Utils.Optional<TreatmentsByClinicCountAggregateOutputType> | number
                    }
                }
            }
        }
    } & {
        other: {
            payload: any
            operations: {
                $executeRaw: {
                    args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
                    result: any
                }
                $executeRawUnsafe: {
                    args: [query: string, ...values: any[]],
                    result: any
                }
                $queryRaw: {
                    args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
                    result: any
                }
                $queryRawUnsafe: {
                    args: [query: string, ...values: any[]],
                    result: any
                }
            }
        }
    };
    export type DefaultPrismaClient = PrismaClient;
    export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
    export type GlobalOmitConfig = {
        clinic?: ClinicOmit
        treatment?: TreatmentOmit
        treatmentsByClinic?: TreatmentsByClinicOmit
    };
    export type LogLevel = 'info' | 'query' | 'warn' | 'error';
    export type LogDefinition = {
        level: LogLevel
        emit: 'stdout' | 'event'
    };
    export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
    export type GetLogType<T> = CheckIsLogLevel<
        T extends LogDefinition ? T['level'] : T
    >;
    export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
        ? GetLogType<T[number]>
        : never;
    export type QueryEvent = {
        timestamp: Date
        query: string
        params: string
        duration: number
        target: string
    };
    export type LogEvent = {
        timestamp: Date
        message: string
        target: string
    };
    export type PrismaAction = | 'findUnique'
        | 'findUniqueOrThrow'
        | 'findMany'
        | 'findFirst'
        | 'findFirstOrThrow'
        | 'create'
        | 'createMany'
        | 'createManyAndReturn'
        | 'update'
        | 'updateMany'
        | 'updateManyAndReturn'
        | 'upsert'
        | 'delete'
        | 'deleteMany'
        | 'executeRaw'
        | 'queryRaw'
        | 'aggregate'
        | 'count'
        | 'runCommandRaw'
        | 'findRaw'
        | 'groupBy';
    /**
     * `PrismaClient` proxy available in interactive transactions.
     */
    export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;
    export type Datasource = {
        url?: string
    };
    /**
     * Count Types
     */
    /**
     * Count Type ClinicCountOutputType
     */
    export type ClinicCountOutputType = {
        treatmentsByClinic: number
    };
    export type ClinicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        treatmentsByClinic?: boolean | ClinicCountOutputTypeCountTreatmentsByClinicArgs
    };
    /**
     * ClinicCountOutputType without action
     */
    export type ClinicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ClinicCountOutputType
         */
        select?: ClinicCountOutputTypeSelect<ExtArgs> | null
    };
    /**
     * ClinicCountOutputType without action
     */
    export type ClinicCountOutputTypeCountTreatmentsByClinicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: TreatmentsByClinicWhereInput
    };
    /**
     * Count Type TreatmentCountOutputType
     */
    export type TreatmentCountOutputType = {
        treatmentsByClinic: number
    };
    export type TreatmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        treatmentsByClinic?: boolean | TreatmentCountOutputTypeCountTreatmentsByClinicArgs
    };
    /**
     * TreatmentCountOutputType without action
     */
    export type TreatmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentCountOutputType
         */
        select?: TreatmentCountOutputTypeSelect<ExtArgs> | null
    };
    /**
     * TreatmentCountOutputType without action
     */
    export type TreatmentCountOutputTypeCountTreatmentsByClinicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: TreatmentsByClinicWhereInput
    };
    /**
     * Models
     */
    /**
     * Model Clinic
     */
    export type AggregateClinic = {
        _count: ClinicCountAggregateOutputType | null
        _min: ClinicMinAggregateOutputType | null
        _max: ClinicMaxAggregateOutputType | null
    };
    export type ClinicMinAggregateOutputType = {
        id: string | null
        name: string | null
        code: string | null
        createdAt: Date | null
        updatedAt: Date | null
    };
    export type ClinicMaxAggregateOutputType = {
        id: string | null
        name: string | null
        code: string | null
        createdAt: Date | null
        updatedAt: Date | null
    };
    export type ClinicCountAggregateOutputType = {
        id: number
        name: number
        code: number
        createdAt: number
        updatedAt: number
        _all: number
    };
    export type ClinicMinAggregateInputType = {
        id?: true
        name?: true
        code?: true
        createdAt?: true
        updatedAt?: true
    };
    export type ClinicMaxAggregateInputType = {
        id?: true
        name?: true
        code?: true
        createdAt?: true
        updatedAt?: true
    };
    export type ClinicCountAggregateInputType = {
        id?: true
        name?: true
        code?: true
        createdAt?: true
        updatedAt?: true
        _all?: true
    };
    export type ClinicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Filter which Clinic to aggregate.
         */
        where?: ClinicWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of Clinics to fetch.
         */
        orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the start position
         */
        cursor?: ClinicWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` Clinics from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` Clinics.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Count returned Clinics
        **/
        _count?: true | ClinicCountAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to find the minimum value
        **/
        _min?: ClinicMinAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to find the maximum value
        **/
        _max?: ClinicMaxAggregateInputType
    };
    export type GetClinicAggregateType<T extends ClinicAggregateArgs> = {
        [P in keyof T & keyof AggregateClinic]: P extends '_count' | 'count'
        ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinic[P]>
        : GetScalarType<T[P], AggregateClinic[P]>
    };
    export type ClinicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: ClinicWhereInput
        orderBy?: ClinicOrderByWithAggregationInput | ClinicOrderByWithAggregationInput[]
        by: ClinicScalarFieldEnum[] | ClinicScalarFieldEnum
        having?: ClinicScalarWhereWithAggregatesInput
        take?: number
        skip?: number
        _count?: ClinicCountAggregateInputType | true
        _min?: ClinicMinAggregateInputType
        _max?: ClinicMaxAggregateInputType
    };
    export type ClinicGroupByOutputType = {
        id: string
        name: string
        code: string
        createdAt: Date
        updatedAt: Date
        _count: ClinicCountAggregateOutputType | null
        _min: ClinicMinAggregateOutputType | null
        _max: ClinicMaxAggregateOutputType | null
    };
    type GetClinicGroupByPayload<T extends ClinicGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<ClinicGroupByOutputType, T['by']> &
            {
                [P in ((keyof T) & (keyof ClinicGroupByOutputType))]: P extends '_count'
                ? T[P] extends boolean
                ? number
                : GetScalarType<T[P], ClinicGroupByOutputType[P]>
                : GetScalarType<T[P], ClinicGroupByOutputType[P]>
            }
        >
    >;
    export type ClinicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        code?: boolean
        createdAt?: boolean
        updatedAt?: boolean
        treatmentsByClinic?: boolean | Clinic$treatmentsByClinicArgs<ExtArgs>
        _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
    }, ExtArgs["result"]["clinic"]>;
    export type ClinicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        code?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    }, ExtArgs["result"]["clinic"]>;
    export type ClinicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        code?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    }, ExtArgs["result"]["clinic"]>;
    export type ClinicSelectScalar = {
        id?: boolean
        name?: boolean
        code?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    };
    export type ClinicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "createdAt" | "updatedAt", ExtArgs["result"]["clinic"]>;
    export type ClinicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        treatmentsByClinic?: boolean | Clinic$treatmentsByClinicArgs<ExtArgs>
        _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
    };
    export type ClinicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
    export type ClinicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
    export type $ClinicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "Clinic"
        objects: {
            treatmentsByClinic: Prisma.$TreatmentsByClinicPayload<ExtArgs>[]
        }
        scalars: $Extensions.GetPayloadResult<{
            id: string
            name: string
            code: string
            createdAt: Date
            updatedAt: Date
        }, ExtArgs["result"]["clinic"]>
        composites: {}
    };
    type ClinicGetPayload<S extends boolean | null | undefined | ClinicDefaultArgs> = $Result.GetResult<Prisma.$ClinicPayload, S>;
    type ClinicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<ClinicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: ClinicCountAggregateInputType | true
    };
    /**
     * Clinic findUnique
     */
    export type ClinicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
        /**
         * Filter, which Clinic to fetch.
         */
        where: ClinicWhereUniqueInput
    };
    /**
     * Clinic findUniqueOrThrow
     */
    export type ClinicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
        /**
         * Filter, which Clinic to fetch.
         */
        where: ClinicWhereUniqueInput
    };
    /**
     * Clinic findFirst
     */
    export type ClinicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
        /**
         * Filter, which Clinic to fetch.
         */
        where?: ClinicWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of Clinics to fetch.
         */
        orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the position for searching for Clinics.
         */
        cursor?: ClinicWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` Clinics from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` Clinics.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         * 
         * Filter by unique combinations of Clinics.
         */
        distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
    };
    /**
     * Clinic findFirstOrThrow
     */
    export type ClinicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
        /**
         * Filter, which Clinic to fetch.
         */
        where?: ClinicWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of Clinics to fetch.
         */
        orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the position for searching for Clinics.
         */
        cursor?: ClinicWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` Clinics from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` Clinics.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         * 
         * Filter by unique combinations of Clinics.
         */
        distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
    };
    /**
     * Clinic findMany
     */
    export type ClinicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
        /**
         * Filter, which Clinics to fetch.
         */
        where?: ClinicWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of Clinics to fetch.
         */
        orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the position for listing Clinics.
         */
        cursor?: ClinicWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` Clinics from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` Clinics.
         */
        skip?: number
        distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
    };
    /**
     * Clinic create
     */
    export type ClinicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
        /**
         * The data needed to create a Clinic.
         */
        data: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
    };
    /**
     * Clinic createMany
     */
    export type ClinicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * The data used to create many Clinics.
         */
        data: ClinicCreateManyInput | ClinicCreateManyInput[]
        skipDuplicates?: boolean
    };
    /**
     * Clinic createManyAndReturn
     */
    export type ClinicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelectCreateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * The data used to create many Clinics.
         */
        data: ClinicCreateManyInput | ClinicCreateManyInput[]
        skipDuplicates?: boolean
    };
    /**
     * Clinic update
     */
    export type ClinicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
        /**
         * The data needed to update a Clinic.
         */
        data: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
        /**
         * Choose, which Clinic to update.
         */
        where: ClinicWhereUniqueInput
    };
    /**
     * Clinic updateMany
     */
    export type ClinicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * The data used to update Clinics.
         */
        data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
        /**
         * Filter which Clinics to update
         */
        where?: ClinicWhereInput
        /**
         * Limit how many Clinics to update.
         */
        limit?: number
    };
    /**
     * Clinic updateManyAndReturn
     */
    export type ClinicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelectUpdateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * The data used to update Clinics.
         */
        data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
        /**
         * Filter which Clinics to update
         */
        where?: ClinicWhereInput
        /**
         * Limit how many Clinics to update.
         */
        limit?: number
    };
    /**
     * Clinic upsert
     */
    export type ClinicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
        /**
         * The filter to search for the Clinic to update in case it exists.
         */
        where: ClinicWhereUniqueInput
        /**
         * In case the Clinic found by the `where` argument doesn't exist, create a new Clinic with this data.
         */
        create: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
        /**
         * In case the Clinic was found with the provided `where` argument, update it with this data.
         */
        update: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
    };
    /**
     * Clinic delete
     */
    export type ClinicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
        /**
         * Filter which Clinic to delete.
         */
        where: ClinicWhereUniqueInput
    };
    /**
     * Clinic deleteMany
     */
    export type ClinicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Filter which Clinics to delete
         */
        where?: ClinicWhereInput
        /**
         * Limit how many Clinics to delete.
         */
        limit?: number
    };
    /**
     * Clinic.treatmentsByClinic
     */
    export type Clinic$treatmentsByClinicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        where?: TreatmentsByClinicWhereInput
        orderBy?: TreatmentsByClinicOrderByWithRelationInput | TreatmentsByClinicOrderByWithRelationInput[]
        cursor?: TreatmentsByClinicWhereUniqueInput
        take?: number
        skip?: number
        distinct?: TreatmentsByClinicScalarFieldEnum | TreatmentsByClinicScalarFieldEnum[]
    };
    /**
     * Clinic without action
     */
    export type ClinicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Clinic
         */
        select?: ClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Clinic
         */
        omit?: ClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ClinicInclude<ExtArgs> | null
    };
    /**
     * Model Treatment
     */
    export type AggregateTreatment = {
        _count: TreatmentCountAggregateOutputType | null
        _avg: TreatmentAvgAggregateOutputType | null
        _sum: TreatmentSumAggregateOutputType | null
        _min: TreatmentMinAggregateOutputType | null
        _max: TreatmentMaxAggregateOutputType | null
    };
    export type TreatmentAvgAggregateOutputType = {
        price: Decimal | null
        maintenanceIntervalMonths: number | null
    };
    export type TreatmentSumAggregateOutputType = {
        price: Decimal | null
        maintenanceIntervalMonths: number | null
    };
    export type TreatmentMinAggregateOutputType = {
        id: string | null
        name: string | null
        description: string | null
        price: Decimal | null
        maintenanceIntervalMonths: number | null
        createdAt: Date | null
        updatedAt: Date | null
    };
    export type TreatmentMaxAggregateOutputType = {
        id: string | null
        name: string | null
        description: string | null
        price: Decimal | null
        maintenanceIntervalMonths: number | null
        createdAt: Date | null
        updatedAt: Date | null
    };
    export type TreatmentCountAggregateOutputType = {
        id: number
        name: number
        description: number
        price: number
        maintenanceIntervalMonths: number
        createdAt: number
        updatedAt: number
        _all: number
    };
    export type TreatmentAvgAggregateInputType = {
        price?: true
        maintenanceIntervalMonths?: true
    };
    export type TreatmentSumAggregateInputType = {
        price?: true
        maintenanceIntervalMonths?: true
    };
    export type TreatmentMinAggregateInputType = {
        id?: true
        name?: true
        description?: true
        price?: true
        maintenanceIntervalMonths?: true
        createdAt?: true
        updatedAt?: true
    };
    export type TreatmentMaxAggregateInputType = {
        id?: true
        name?: true
        description?: true
        price?: true
        maintenanceIntervalMonths?: true
        createdAt?: true
        updatedAt?: true
    };
    export type TreatmentCountAggregateInputType = {
        id?: true
        name?: true
        description?: true
        price?: true
        maintenanceIntervalMonths?: true
        createdAt?: true
        updatedAt?: true
        _all?: true
    };
    export type TreatmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Filter which Treatment to aggregate.
         */
        where?: TreatmentWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of Treatments to fetch.
         */
        orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the start position
         */
        cursor?: TreatmentWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` Treatments from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` Treatments.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Count returned Treatments
        **/
        _count?: true | TreatmentCountAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to average
        **/
        _avg?: TreatmentAvgAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to sum
        **/
        _sum?: TreatmentSumAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to find the minimum value
        **/
        _min?: TreatmentMinAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to find the maximum value
        **/
        _max?: TreatmentMaxAggregateInputType
    };
    export type GetTreatmentAggregateType<T extends TreatmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTreatment]: P extends '_count' | 'count'
        ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreatment[P]>
        : GetScalarType<T[P], AggregateTreatment[P]>
    };
    export type TreatmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: TreatmentWhereInput
        orderBy?: TreatmentOrderByWithAggregationInput | TreatmentOrderByWithAggregationInput[]
        by: TreatmentScalarFieldEnum[] | TreatmentScalarFieldEnum
        having?: TreatmentScalarWhereWithAggregatesInput
        take?: number
        skip?: number
        _count?: TreatmentCountAggregateInputType | true
        _avg?: TreatmentAvgAggregateInputType
        _sum?: TreatmentSumAggregateInputType
        _min?: TreatmentMinAggregateInputType
        _max?: TreatmentMaxAggregateInputType
    };
    export type TreatmentGroupByOutputType = {
        id: string
        name: string
        description: string | null
        price: Decimal
        maintenanceIntervalMonths: number | null
        createdAt: Date
        updatedAt: Date
        _count: TreatmentCountAggregateOutputType | null
        _avg: TreatmentAvgAggregateOutputType | null
        _sum: TreatmentSumAggregateOutputType | null
        _min: TreatmentMinAggregateOutputType | null
        _max: TreatmentMaxAggregateOutputType | null
    };
    type GetTreatmentGroupByPayload<T extends TreatmentGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<TreatmentGroupByOutputType, T['by']> &
            {
                [P in ((keyof T) & (keyof TreatmentGroupByOutputType))]: P extends '_count'
                ? T[P] extends boolean
                ? number
                : GetScalarType<T[P], TreatmentGroupByOutputType[P]>
                : GetScalarType<T[P], TreatmentGroupByOutputType[P]>
            }
        >
    >;
    export type TreatmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        description?: boolean
        price?: boolean
        maintenanceIntervalMonths?: boolean
        createdAt?: boolean
        updatedAt?: boolean
        treatmentsByClinic?: boolean | Treatment$treatmentsByClinicArgs<ExtArgs>
        _count?: boolean | TreatmentCountOutputTypeDefaultArgs<ExtArgs>
    }, ExtArgs["result"]["treatment"]>;
    export type TreatmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        description?: boolean
        price?: boolean
        maintenanceIntervalMonths?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    }, ExtArgs["result"]["treatment"]>;
    export type TreatmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        description?: boolean
        price?: boolean
        maintenanceIntervalMonths?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    }, ExtArgs["result"]["treatment"]>;
    export type TreatmentSelectScalar = {
        id?: boolean
        name?: boolean
        description?: boolean
        price?: boolean
        maintenanceIntervalMonths?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    };
    export type TreatmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "maintenanceIntervalMonths" | "createdAt" | "updatedAt", ExtArgs["result"]["treatment"]>;
    export type TreatmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        treatmentsByClinic?: boolean | Treatment$treatmentsByClinicArgs<ExtArgs>
        _count?: boolean | TreatmentCountOutputTypeDefaultArgs<ExtArgs>
    };
    export type TreatmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
    export type TreatmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
    export type $TreatmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "Treatment"
        objects: {
            treatmentsByClinic: Prisma.$TreatmentsByClinicPayload<ExtArgs>[]
        }
        scalars: $Extensions.GetPayloadResult<{
            id: string
            name: string
            description: string | null
            price: Prisma.Decimal
            maintenanceIntervalMonths: number | null
            createdAt: Date
            updatedAt: Date
        }, ExtArgs["result"]["treatment"]>
        composites: {}
    };
    type TreatmentGetPayload<S extends boolean | null | undefined | TreatmentDefaultArgs> = $Result.GetResult<Prisma.$TreatmentPayload, S>;
    type TreatmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<TreatmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: TreatmentCountAggregateInputType | true
    };
    /**
     * Treatment findUnique
     */
    export type TreatmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
        /**
         * Filter, which Treatment to fetch.
         */
        where: TreatmentWhereUniqueInput
    };
    /**
     * Treatment findUniqueOrThrow
     */
    export type TreatmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
        /**
         * Filter, which Treatment to fetch.
         */
        where: TreatmentWhereUniqueInput
    };
    /**
     * Treatment findFirst
     */
    export type TreatmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
        /**
         * Filter, which Treatment to fetch.
         */
        where?: TreatmentWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of Treatments to fetch.
         */
        orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the position for searching for Treatments.
         */
        cursor?: TreatmentWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` Treatments from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` Treatments.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         * 
         * Filter by unique combinations of Treatments.
         */
        distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
    };
    /**
     * Treatment findFirstOrThrow
     */
    export type TreatmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
        /**
         * Filter, which Treatment to fetch.
         */
        where?: TreatmentWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of Treatments to fetch.
         */
        orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the position for searching for Treatments.
         */
        cursor?: TreatmentWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` Treatments from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` Treatments.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         * 
         * Filter by unique combinations of Treatments.
         */
        distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
    };
    /**
     * Treatment findMany
     */
    export type TreatmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
        /**
         * Filter, which Treatments to fetch.
         */
        where?: TreatmentWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of Treatments to fetch.
         */
        orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the position for listing Treatments.
         */
        cursor?: TreatmentWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` Treatments from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` Treatments.
         */
        skip?: number
        distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
    };
    /**
     * Treatment create
     */
    export type TreatmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
        /**
         * The data needed to create a Treatment.
         */
        data: XOR<TreatmentCreateInput, TreatmentUncheckedCreateInput>
    };
    /**
     * Treatment createMany
     */
    export type TreatmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * The data used to create many Treatments.
         */
        data: TreatmentCreateManyInput | TreatmentCreateManyInput[]
        skipDuplicates?: boolean
    };
    /**
     * Treatment createManyAndReturn
     */
    export type TreatmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelectCreateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * The data used to create many Treatments.
         */
        data: TreatmentCreateManyInput | TreatmentCreateManyInput[]
        skipDuplicates?: boolean
    };
    /**
     * Treatment update
     */
    export type TreatmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
        /**
         * The data needed to update a Treatment.
         */
        data: XOR<TreatmentUpdateInput, TreatmentUncheckedUpdateInput>
        /**
         * Choose, which Treatment to update.
         */
        where: TreatmentWhereUniqueInput
    };
    /**
     * Treatment updateMany
     */
    export type TreatmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * The data used to update Treatments.
         */
        data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyInput>
        /**
         * Filter which Treatments to update
         */
        where?: TreatmentWhereInput
        /**
         * Limit how many Treatments to update.
         */
        limit?: number
    };
    /**
     * Treatment updateManyAndReturn
     */
    export type TreatmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelectUpdateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * The data used to update Treatments.
         */
        data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyInput>
        /**
         * Filter which Treatments to update
         */
        where?: TreatmentWhereInput
        /**
         * Limit how many Treatments to update.
         */
        limit?: number
    };
    /**
     * Treatment upsert
     */
    export type TreatmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
        /**
         * The filter to search for the Treatment to update in case it exists.
         */
        where: TreatmentWhereUniqueInput
        /**
         * In case the Treatment found by the `where` argument doesn't exist, create a new Treatment with this data.
         */
        create: XOR<TreatmentCreateInput, TreatmentUncheckedCreateInput>
        /**
         * In case the Treatment was found with the provided `where` argument, update it with this data.
         */
        update: XOR<TreatmentUpdateInput, TreatmentUncheckedUpdateInput>
    };
    /**
     * Treatment delete
     */
    export type TreatmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
        /**
         * Filter which Treatment to delete.
         */
        where: TreatmentWhereUniqueInput
    };
    /**
     * Treatment deleteMany
     */
    export type TreatmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Filter which Treatments to delete
         */
        where?: TreatmentWhereInput
        /**
         * Limit how many Treatments to delete.
         */
        limit?: number
    };
    /**
     * Treatment.treatmentsByClinic
     */
    export type Treatment$treatmentsByClinicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        where?: TreatmentsByClinicWhereInput
        orderBy?: TreatmentsByClinicOrderByWithRelationInput | TreatmentsByClinicOrderByWithRelationInput[]
        cursor?: TreatmentsByClinicWhereUniqueInput
        take?: number
        skip?: number
        distinct?: TreatmentsByClinicScalarFieldEnum | TreatmentsByClinicScalarFieldEnum[]
    };
    /**
     * Treatment without action
     */
    export type TreatmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the Treatment
         */
        select?: TreatmentSelect<ExtArgs> | null
        /**
         * Omit specific fields from the Treatment
         */
        omit?: TreatmentOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentInclude<ExtArgs> | null
    };
    /**
     * Model TreatmentsByClinic
     */
    export type AggregateTreatmentsByClinic = {
        _count: TreatmentsByClinicCountAggregateOutputType | null
        _avg: TreatmentsByClinicAvgAggregateOutputType | null
        _sum: TreatmentsByClinicSumAggregateOutputType | null
        _min: TreatmentsByClinicMinAggregateOutputType | null
        _max: TreatmentsByClinicMaxAggregateOutputType | null
    };
    export type TreatmentsByClinicAvgAggregateOutputType = {
        priceOverride: Decimal | null
    };
    export type TreatmentsByClinicSumAggregateOutputType = {
        priceOverride: Decimal | null
    };
    export type TreatmentsByClinicMinAggregateOutputType = {
        id: string | null
        clinicId: string | null
        treatmentId: string | null
        priceOverride: Decimal | null
        notes: string | null
        createdAt: Date | null
        updatedAt: Date | null
    };
    export type TreatmentsByClinicMaxAggregateOutputType = {
        id: string | null
        clinicId: string | null
        treatmentId: string | null
        priceOverride: Decimal | null
        notes: string | null
        createdAt: Date | null
        updatedAt: Date | null
    };
    export type TreatmentsByClinicCountAggregateOutputType = {
        id: number
        clinicId: number
        treatmentId: number
        priceOverride: number
        notes: number
        createdAt: number
        updatedAt: number
        _all: number
    };
    export type TreatmentsByClinicAvgAggregateInputType = {
        priceOverride?: true
    };
    export type TreatmentsByClinicSumAggregateInputType = {
        priceOverride?: true
    };
    export type TreatmentsByClinicMinAggregateInputType = {
        id?: true
        clinicId?: true
        treatmentId?: true
        priceOverride?: true
        notes?: true
        createdAt?: true
        updatedAt?: true
    };
    export type TreatmentsByClinicMaxAggregateInputType = {
        id?: true
        clinicId?: true
        treatmentId?: true
        priceOverride?: true
        notes?: true
        createdAt?: true
        updatedAt?: true
    };
    export type TreatmentsByClinicCountAggregateInputType = {
        id?: true
        clinicId?: true
        treatmentId?: true
        priceOverride?: true
        notes?: true
        createdAt?: true
        updatedAt?: true
        _all?: true
    };
    export type TreatmentsByClinicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Filter which TreatmentsByClinic to aggregate.
         */
        where?: TreatmentsByClinicWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of TreatmentsByClinics to fetch.
         */
        orderBy?: TreatmentsByClinicOrderByWithRelationInput | TreatmentsByClinicOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the start position
         */
        cursor?: TreatmentsByClinicWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` TreatmentsByClinics from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` TreatmentsByClinics.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Count returned TreatmentsByClinics
        **/
        _count?: true | TreatmentsByClinicCountAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to average
        **/
        _avg?: TreatmentsByClinicAvgAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to sum
        **/
        _sum?: TreatmentsByClinicSumAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to find the minimum value
        **/
        _min?: TreatmentsByClinicMinAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         * 
         * Select which fields to find the maximum value
        **/
        _max?: TreatmentsByClinicMaxAggregateInputType
    };
    export type GetTreatmentsByClinicAggregateType<T extends TreatmentsByClinicAggregateArgs> = {
        [P in keyof T & keyof AggregateTreatmentsByClinic]: P extends '_count' | 'count'
        ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreatmentsByClinic[P]>
        : GetScalarType<T[P], AggregateTreatmentsByClinic[P]>
    };
    export type TreatmentsByClinicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: TreatmentsByClinicWhereInput
        orderBy?: TreatmentsByClinicOrderByWithAggregationInput | TreatmentsByClinicOrderByWithAggregationInput[]
        by: TreatmentsByClinicScalarFieldEnum[] | TreatmentsByClinicScalarFieldEnum
        having?: TreatmentsByClinicScalarWhereWithAggregatesInput
        take?: number
        skip?: number
        _count?: TreatmentsByClinicCountAggregateInputType | true
        _avg?: TreatmentsByClinicAvgAggregateInputType
        _sum?: TreatmentsByClinicSumAggregateInputType
        _min?: TreatmentsByClinicMinAggregateInputType
        _max?: TreatmentsByClinicMaxAggregateInputType
    };
    export type TreatmentsByClinicGroupByOutputType = {
        id: string
        clinicId: string
        treatmentId: string
        priceOverride: Decimal | null
        notes: string | null
        createdAt: Date
        updatedAt: Date
        _count: TreatmentsByClinicCountAggregateOutputType | null
        _avg: TreatmentsByClinicAvgAggregateOutputType | null
        _sum: TreatmentsByClinicSumAggregateOutputType | null
        _min: TreatmentsByClinicMinAggregateOutputType | null
        _max: TreatmentsByClinicMaxAggregateOutputType | null
    };
    type GetTreatmentsByClinicGroupByPayload<T extends TreatmentsByClinicGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<TreatmentsByClinicGroupByOutputType, T['by']> &
            {
                [P in ((keyof T) & (keyof TreatmentsByClinicGroupByOutputType))]: P extends '_count'
                ? T[P] extends boolean
                ? number
                : GetScalarType<T[P], TreatmentsByClinicGroupByOutputType[P]>
                : GetScalarType<T[P], TreatmentsByClinicGroupByOutputType[P]>
            }
        >
    >;
    export type TreatmentsByClinicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean
        clinicId?: boolean
        treatmentId?: boolean
        priceOverride?: boolean
        notes?: boolean
        createdAt?: boolean
        updatedAt?: boolean
        clinic?: boolean | ClinicDefaultArgs<ExtArgs>
        treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    }, ExtArgs["result"]["treatmentsByClinic"]>;
    export type TreatmentsByClinicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean
        clinicId?: boolean
        treatmentId?: boolean
        priceOverride?: boolean
        notes?: boolean
        createdAt?: boolean
        updatedAt?: boolean
        clinic?: boolean | ClinicDefaultArgs<ExtArgs>
        treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    }, ExtArgs["result"]["treatmentsByClinic"]>;
    export type TreatmentsByClinicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean
        clinicId?: boolean
        treatmentId?: boolean
        priceOverride?: boolean
        notes?: boolean
        createdAt?: boolean
        updatedAt?: boolean
        clinic?: boolean | ClinicDefaultArgs<ExtArgs>
        treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    }, ExtArgs["result"]["treatmentsByClinic"]>;
    export type TreatmentsByClinicSelectScalar = {
        id?: boolean
        clinicId?: boolean
        treatmentId?: boolean
        priceOverride?: boolean
        notes?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    };
    export type TreatmentsByClinicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clinicId" | "treatmentId" | "priceOverride" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["treatmentsByClinic"]>;
    export type TreatmentsByClinicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        clinic?: boolean | ClinicDefaultArgs<ExtArgs>
        treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    };
    export type TreatmentsByClinicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        clinic?: boolean | ClinicDefaultArgs<ExtArgs>
        treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    };
    export type TreatmentsByClinicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        clinic?: boolean | ClinicDefaultArgs<ExtArgs>
        treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
    };
    export type $TreatmentsByClinicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "TreatmentsByClinic"
        objects: {
            clinic: Prisma.$ClinicPayload<ExtArgs>
            treatment: Prisma.$TreatmentPayload<ExtArgs>
        }
        scalars: $Extensions.GetPayloadResult<{
            id: string
            clinicId: string
            treatmentId: string
            priceOverride: Prisma.Decimal | null
            notes: string | null
            createdAt: Date
            updatedAt: Date
        }, ExtArgs["result"]["treatmentsByClinic"]>
        composites: {}
    };
    type TreatmentsByClinicGetPayload<S extends boolean | null | undefined | TreatmentsByClinicDefaultArgs> = $Result.GetResult<Prisma.$TreatmentsByClinicPayload, S>;
    type TreatmentsByClinicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<TreatmentsByClinicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: TreatmentsByClinicCountAggregateInputType | true
    };
    /**
     * TreatmentsByClinic findUnique
     */
    export type TreatmentsByClinicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        /**
         * Filter, which TreatmentsByClinic to fetch.
         */
        where: TreatmentsByClinicWhereUniqueInput
    };
    /**
     * TreatmentsByClinic findUniqueOrThrow
     */
    export type TreatmentsByClinicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        /**
         * Filter, which TreatmentsByClinic to fetch.
         */
        where: TreatmentsByClinicWhereUniqueInput
    };
    /**
     * TreatmentsByClinic findFirst
     */
    export type TreatmentsByClinicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        /**
         * Filter, which TreatmentsByClinic to fetch.
         */
        where?: TreatmentsByClinicWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of TreatmentsByClinics to fetch.
         */
        orderBy?: TreatmentsByClinicOrderByWithRelationInput | TreatmentsByClinicOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the position for searching for TreatmentsByClinics.
         */
        cursor?: TreatmentsByClinicWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` TreatmentsByClinics from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` TreatmentsByClinics.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         * 
         * Filter by unique combinations of TreatmentsByClinics.
         */
        distinct?: TreatmentsByClinicScalarFieldEnum | TreatmentsByClinicScalarFieldEnum[]
    };
    /**
     * TreatmentsByClinic findFirstOrThrow
     */
    export type TreatmentsByClinicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        /**
         * Filter, which TreatmentsByClinic to fetch.
         */
        where?: TreatmentsByClinicWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of TreatmentsByClinics to fetch.
         */
        orderBy?: TreatmentsByClinicOrderByWithRelationInput | TreatmentsByClinicOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the position for searching for TreatmentsByClinics.
         */
        cursor?: TreatmentsByClinicWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` TreatmentsByClinics from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` TreatmentsByClinics.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         * 
         * Filter by unique combinations of TreatmentsByClinics.
         */
        distinct?: TreatmentsByClinicScalarFieldEnum | TreatmentsByClinicScalarFieldEnum[]
    };
    /**
     * TreatmentsByClinic findMany
     */
    export type TreatmentsByClinicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        /**
         * Filter, which TreatmentsByClinics to fetch.
         */
        where?: TreatmentsByClinicWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         * 
         * Determine the order of TreatmentsByClinics to fetch.
         */
        orderBy?: TreatmentsByClinicOrderByWithRelationInput | TreatmentsByClinicOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         * 
         * Sets the position for listing TreatmentsByClinics.
         */
        cursor?: TreatmentsByClinicWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Take `±n` TreatmentsByClinics from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         * 
         * Skip the first `n` TreatmentsByClinics.
         */
        skip?: number
        distinct?: TreatmentsByClinicScalarFieldEnum | TreatmentsByClinicScalarFieldEnum[]
    };
    /**
     * TreatmentsByClinic create
     */
    export type TreatmentsByClinicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        /**
         * The data needed to create a TreatmentsByClinic.
         */
        data: XOR<TreatmentsByClinicCreateInput, TreatmentsByClinicUncheckedCreateInput>
    };
    /**
     * TreatmentsByClinic createMany
     */
    export type TreatmentsByClinicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * The data used to create many TreatmentsByClinics.
         */
        data: TreatmentsByClinicCreateManyInput | TreatmentsByClinicCreateManyInput[]
        skipDuplicates?: boolean
    };
    /**
     * TreatmentsByClinic createManyAndReturn
     */
    export type TreatmentsByClinicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelectCreateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * The data used to create many TreatmentsByClinics.
         */
        data: TreatmentsByClinicCreateManyInput | TreatmentsByClinicCreateManyInput[]
        skipDuplicates?: boolean
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicIncludeCreateManyAndReturn<ExtArgs> | null
    };
    /**
     * TreatmentsByClinic update
     */
    export type TreatmentsByClinicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        /**
         * The data needed to update a TreatmentsByClinic.
         */
        data: XOR<TreatmentsByClinicUpdateInput, TreatmentsByClinicUncheckedUpdateInput>
        /**
         * Choose, which TreatmentsByClinic to update.
         */
        where: TreatmentsByClinicWhereUniqueInput
    };
    /**
     * TreatmentsByClinic updateMany
     */
    export type TreatmentsByClinicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * The data used to update TreatmentsByClinics.
         */
        data: XOR<TreatmentsByClinicUpdateManyMutationInput, TreatmentsByClinicUncheckedUpdateManyInput>
        /**
         * Filter which TreatmentsByClinics to update
         */
        where?: TreatmentsByClinicWhereInput
        /**
         * Limit how many TreatmentsByClinics to update.
         */
        limit?: number
    };
    /**
     * TreatmentsByClinic updateManyAndReturn
     */
    export type TreatmentsByClinicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelectUpdateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * The data used to update TreatmentsByClinics.
         */
        data: XOR<TreatmentsByClinicUpdateManyMutationInput, TreatmentsByClinicUncheckedUpdateManyInput>
        /**
         * Filter which TreatmentsByClinics to update
         */
        where?: TreatmentsByClinicWhereInput
        /**
         * Limit how many TreatmentsByClinics to update.
         */
        limit?: number
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicIncludeUpdateManyAndReturn<ExtArgs> | null
    };
    /**
     * TreatmentsByClinic upsert
     */
    export type TreatmentsByClinicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        /**
         * The filter to search for the TreatmentsByClinic to update in case it exists.
         */
        where: TreatmentsByClinicWhereUniqueInput
        /**
         * In case the TreatmentsByClinic found by the `where` argument doesn't exist, create a new TreatmentsByClinic with this data.
         */
        create: XOR<TreatmentsByClinicCreateInput, TreatmentsByClinicUncheckedCreateInput>
        /**
         * In case the TreatmentsByClinic was found with the provided `where` argument, update it with this data.
         */
        update: XOR<TreatmentsByClinicUpdateInput, TreatmentsByClinicUncheckedUpdateInput>
    };
    /**
     * TreatmentsByClinic delete
     */
    export type TreatmentsByClinicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
        /**
         * Filter which TreatmentsByClinic to delete.
         */
        where: TreatmentsByClinicWhereUniqueInput
    };
    /**
     * TreatmentsByClinic deleteMany
     */
    export type TreatmentsByClinicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Filter which TreatmentsByClinics to delete
         */
        where?: TreatmentsByClinicWhereInput
        /**
         * Limit how many TreatmentsByClinics to delete.
         */
        limit?: number
    };
    /**
     * TreatmentsByClinic without action
     */
    export type TreatmentsByClinicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the TreatmentsByClinic
         */
        select?: TreatmentsByClinicSelect<ExtArgs> | null
        /**
         * Omit specific fields from the TreatmentsByClinic
         */
        omit?: TreatmentsByClinicOmit<ExtArgs> | null
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: TreatmentsByClinicInclude<ExtArgs> | null
    };
    export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
    export type ClinicScalarFieldEnum = (typeof ClinicScalarFieldEnum)[keyof typeof ClinicScalarFieldEnum];
    export type TreatmentScalarFieldEnum = (typeof TreatmentScalarFieldEnum)[keyof typeof TreatmentScalarFieldEnum];
    export type TreatmentsByClinicScalarFieldEnum = (typeof TreatmentsByClinicScalarFieldEnum)[keyof typeof TreatmentsByClinicScalarFieldEnum];
    export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
    export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
    export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
    /**
     * Field references
     */
    /**
     * Reference to a field of type 'String'
     */
    export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
    /**
     * Reference to a field of type 'String[]'
     */
    export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
    /**
     * Reference to a field of type 'DateTime'
     */
    export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
    /**
     * Reference to a field of type 'DateTime[]'
     */
    export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
    /**
     * Reference to a field of type 'Decimal'
     */
    export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
    /**
     * Reference to a field of type 'Decimal[]'
     */
    export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
    /**
     * Reference to a field of type 'Int'
     */
    export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
    /**
     * Reference to a field of type 'Int[]'
     */
    export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
    /**
     * Reference to a field of type 'Float'
     */
    export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
    /**
     * Reference to a field of type 'Float[]'
     */
    export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
    /**
     * Deep Input Types
     */
    export type ClinicWhereInput = {
        AND?: ClinicWhereInput | ClinicWhereInput[]
        OR?: ClinicWhereInput[]
        NOT?: ClinicWhereInput | ClinicWhereInput[]
        id?: StringFilter<"Clinic"> | string
        name?: StringFilter<"Clinic"> | string
        code?: StringFilter<"Clinic"> | string
        createdAt?: DateTimeFilter<"Clinic"> | Date | string
        updatedAt?: DateTimeFilter<"Clinic"> | Date | string
        treatmentsByClinic?: TreatmentsByClinicListRelationFilter
    };
    export type ClinicOrderByWithRelationInput = {
        id?: SortOrder
        name?: SortOrder
        code?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
        treatmentsByClinic?: TreatmentsByClinicOrderByRelationAggregateInput
    };
    export type ClinicWhereUniqueInput = Prisma.AtLeast<{
        id?: string
        code?: string
        AND?: ClinicWhereInput | ClinicWhereInput[]
        OR?: ClinicWhereInput[]
        NOT?: ClinicWhereInput | ClinicWhereInput[]
        name?: StringFilter<"Clinic"> | string
        createdAt?: DateTimeFilter<"Clinic"> | Date | string
        updatedAt?: DateTimeFilter<"Clinic"> | Date | string
        treatmentsByClinic?: TreatmentsByClinicListRelationFilter
    }, "id" | "code">;
    export type ClinicOrderByWithAggregationInput = {
        id?: SortOrder
        name?: SortOrder
        code?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
        _count?: ClinicCountOrderByAggregateInput
        _max?: ClinicMaxOrderByAggregateInput
        _min?: ClinicMinOrderByAggregateInput
    };
    export type ClinicScalarWhereWithAggregatesInput = {
        AND?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
        OR?: ClinicScalarWhereWithAggregatesInput[]
        NOT?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
        id?: StringWithAggregatesFilter<"Clinic"> | string
        name?: StringWithAggregatesFilter<"Clinic"> | string
        code?: StringWithAggregatesFilter<"Clinic"> | string
        createdAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
        updatedAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
    };
    export type TreatmentWhereInput = {
        AND?: TreatmentWhereInput | TreatmentWhereInput[]
        OR?: TreatmentWhereInput[]
        NOT?: TreatmentWhereInput | TreatmentWhereInput[]
        id?: StringFilter<"Treatment"> | string
        name?: StringFilter<"Treatment"> | string
        description?: StringNullableFilter<"Treatment"> | string | null
        price?: DecimalFilter<"Treatment"> | Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: IntNullableFilter<"Treatment"> | number | null
        createdAt?: DateTimeFilter<"Treatment"> | Date | string
        updatedAt?: DateTimeFilter<"Treatment"> | Date | string
        treatmentsByClinic?: TreatmentsByClinicListRelationFilter
    };
    export type TreatmentOrderByWithRelationInput = {
        id?: SortOrder
        name?: SortOrder
        description?: SortOrderInput | SortOrder
        price?: SortOrder
        maintenanceIntervalMonths?: SortOrderInput | SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
        treatmentsByClinic?: TreatmentsByClinicOrderByRelationAggregateInput
    };
    export type TreatmentWhereUniqueInput = Prisma.AtLeast<{
        id?: string
        AND?: TreatmentWhereInput | TreatmentWhereInput[]
        OR?: TreatmentWhereInput[]
        NOT?: TreatmentWhereInput | TreatmentWhereInput[]
        name?: StringFilter<"Treatment"> | string
        description?: StringNullableFilter<"Treatment"> | string | null
        price?: DecimalFilter<"Treatment"> | Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: IntNullableFilter<"Treatment"> | number | null
        createdAt?: DateTimeFilter<"Treatment"> | Date | string
        updatedAt?: DateTimeFilter<"Treatment"> | Date | string
        treatmentsByClinic?: TreatmentsByClinicListRelationFilter
    }, "id">;
    export type TreatmentOrderByWithAggregationInput = {
        id?: SortOrder
        name?: SortOrder
        description?: SortOrderInput | SortOrder
        price?: SortOrder
        maintenanceIntervalMonths?: SortOrderInput | SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
        _count?: TreatmentCountOrderByAggregateInput
        _avg?: TreatmentAvgOrderByAggregateInput
        _max?: TreatmentMaxOrderByAggregateInput
        _min?: TreatmentMinOrderByAggregateInput
        _sum?: TreatmentSumOrderByAggregateInput
    };
    export type TreatmentScalarWhereWithAggregatesInput = {
        AND?: TreatmentScalarWhereWithAggregatesInput | TreatmentScalarWhereWithAggregatesInput[]
        OR?: TreatmentScalarWhereWithAggregatesInput[]
        NOT?: TreatmentScalarWhereWithAggregatesInput | TreatmentScalarWhereWithAggregatesInput[]
        id?: StringWithAggregatesFilter<"Treatment"> | string
        name?: StringWithAggregatesFilter<"Treatment"> | string
        description?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
        price?: DecimalWithAggregatesFilter<"Treatment"> | Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: IntNullableWithAggregatesFilter<"Treatment"> | number | null
        createdAt?: DateTimeWithAggregatesFilter<"Treatment"> | Date | string
        updatedAt?: DateTimeWithAggregatesFilter<"Treatment"> | Date | string
    };
    export type TreatmentsByClinicWhereInput = {
        AND?: TreatmentsByClinicWhereInput | TreatmentsByClinicWhereInput[]
        OR?: TreatmentsByClinicWhereInput[]
        NOT?: TreatmentsByClinicWhereInput | TreatmentsByClinicWhereInput[]
        id?: StringFilter<"TreatmentsByClinic"> | string
        clinicId?: StringFilter<"TreatmentsByClinic"> | string
        treatmentId?: StringFilter<"TreatmentsByClinic"> | string
        priceOverride?: DecimalNullableFilter<"TreatmentsByClinic"> | Decimal | DecimalJsLike | number | string | null
        notes?: StringNullableFilter<"TreatmentsByClinic"> | string | null
        createdAt?: DateTimeFilter<"TreatmentsByClinic"> | Date | string
        updatedAt?: DateTimeFilter<"TreatmentsByClinic"> | Date | string
        clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
        treatment?: XOR<TreatmentScalarRelationFilter, TreatmentWhereInput>
    };
    export type TreatmentsByClinicOrderByWithRelationInput = {
        id?: SortOrder
        clinicId?: SortOrder
        treatmentId?: SortOrder
        priceOverride?: SortOrderInput | SortOrder
        notes?: SortOrderInput | SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
        clinic?: ClinicOrderByWithRelationInput
        treatment?: TreatmentOrderByWithRelationInput
    };
    export type TreatmentsByClinicWhereUniqueInput = Prisma.AtLeast<{
        id?: string
        clinicId_treatmentId?: TreatmentsByClinicClinicIdTreatmentIdCompoundUniqueInput
        AND?: TreatmentsByClinicWhereInput | TreatmentsByClinicWhereInput[]
        OR?: TreatmentsByClinicWhereInput[]
        NOT?: TreatmentsByClinicWhereInput | TreatmentsByClinicWhereInput[]
        clinicId?: StringFilter<"TreatmentsByClinic"> | string
        treatmentId?: StringFilter<"TreatmentsByClinic"> | string
        priceOverride?: DecimalNullableFilter<"TreatmentsByClinic"> | Decimal | DecimalJsLike | number | string | null
        notes?: StringNullableFilter<"TreatmentsByClinic"> | string | null
        createdAt?: DateTimeFilter<"TreatmentsByClinic"> | Date | string
        updatedAt?: DateTimeFilter<"TreatmentsByClinic"> | Date | string
        clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
        treatment?: XOR<TreatmentScalarRelationFilter, TreatmentWhereInput>
    }, "id" | "clinicId_treatmentId">;
    export type TreatmentsByClinicOrderByWithAggregationInput = {
        id?: SortOrder
        clinicId?: SortOrder
        treatmentId?: SortOrder
        priceOverride?: SortOrderInput | SortOrder
        notes?: SortOrderInput | SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
        _count?: TreatmentsByClinicCountOrderByAggregateInput
        _avg?: TreatmentsByClinicAvgOrderByAggregateInput
        _max?: TreatmentsByClinicMaxOrderByAggregateInput
        _min?: TreatmentsByClinicMinOrderByAggregateInput
        _sum?: TreatmentsByClinicSumOrderByAggregateInput
    };
    export type TreatmentsByClinicScalarWhereWithAggregatesInput = {
        AND?: TreatmentsByClinicScalarWhereWithAggregatesInput | TreatmentsByClinicScalarWhereWithAggregatesInput[]
        OR?: TreatmentsByClinicScalarWhereWithAggregatesInput[]
        NOT?: TreatmentsByClinicScalarWhereWithAggregatesInput | TreatmentsByClinicScalarWhereWithAggregatesInput[]
        id?: StringWithAggregatesFilter<"TreatmentsByClinic"> | string
        clinicId?: StringWithAggregatesFilter<"TreatmentsByClinic"> | string
        treatmentId?: StringWithAggregatesFilter<"TreatmentsByClinic"> | string
        priceOverride?: DecimalNullableWithAggregatesFilter<"TreatmentsByClinic"> | Decimal | DecimalJsLike | number | string | null
        notes?: StringNullableWithAggregatesFilter<"TreatmentsByClinic"> | string | null
        createdAt?: DateTimeWithAggregatesFilter<"TreatmentsByClinic"> | Date | string
        updatedAt?: DateTimeWithAggregatesFilter<"TreatmentsByClinic"> | Date | string
    };
    export type ClinicCreateInput = {
        id?: string
        name: string
        code: string
        createdAt?: Date | string
        updatedAt?: Date | string
        treatmentsByClinic?: TreatmentsByClinicCreateNestedManyWithoutClinicInput
    };
    export type ClinicUncheckedCreateInput = {
        id?: string
        name: string
        code: string
        createdAt?: Date | string
        updatedAt?: Date | string
        treatmentsByClinic?: TreatmentsByClinicUncheckedCreateNestedManyWithoutClinicInput
    };
    export type ClinicUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        code?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
        treatmentsByClinic?: TreatmentsByClinicUpdateManyWithoutClinicNestedInput
    };
    export type ClinicUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        code?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
        treatmentsByClinic?: TreatmentsByClinicUncheckedUpdateManyWithoutClinicNestedInput
    };
    export type ClinicCreateManyInput = {
        id?: string
        name: string
        code: string
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type ClinicUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        code?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type ClinicUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        code?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentCreateInput = {
        id?: string
        name: string
        description?: string | null
        price: Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: number | null
        createdAt?: Date | string
        updatedAt?: Date | string
        treatmentsByClinic?: TreatmentsByClinicCreateNestedManyWithoutTreatmentInput
    };
    export type TreatmentUncheckedCreateInput = {
        id?: string
        name: string
        description?: string | null
        price: Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: number | null
        createdAt?: Date | string
        updatedAt?: Date | string
        treatmentsByClinic?: TreatmentsByClinicUncheckedCreateNestedManyWithoutTreatmentInput
    };
    export type TreatmentUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        description?: NullableStringFieldUpdateOperationsInput | string | null
        price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: NullableIntFieldUpdateOperationsInput | number | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
        treatmentsByClinic?: TreatmentsByClinicUpdateManyWithoutTreatmentNestedInput
    };
    export type TreatmentUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        description?: NullableStringFieldUpdateOperationsInput | string | null
        price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: NullableIntFieldUpdateOperationsInput | number | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
        treatmentsByClinic?: TreatmentsByClinicUncheckedUpdateManyWithoutTreatmentNestedInput
    };
    export type TreatmentCreateManyInput = {
        id?: string
        name: string
        description?: string | null
        price: Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: number | null
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type TreatmentUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        description?: NullableStringFieldUpdateOperationsInput | string | null
        price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: NullableIntFieldUpdateOperationsInput | number | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        description?: NullableStringFieldUpdateOperationsInput | string | null
        price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: NullableIntFieldUpdateOperationsInput | number | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentsByClinicCreateInput = {
        id?: string
        priceOverride?: Decimal | DecimalJsLike | number | string | null
        notes?: string | null
        createdAt?: Date | string
        updatedAt?: Date | string
        clinic: ClinicCreateNestedOneWithoutTreatmentsByClinicInput
        treatment: TreatmentCreateNestedOneWithoutTreatmentsByClinicInput
    };
    export type TreatmentsByClinicUncheckedCreateInput = {
        id?: string
        clinicId: string
        treatmentId: string
        priceOverride?: Decimal | DecimalJsLike | number | string | null
        notes?: string | null
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type TreatmentsByClinicUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
        clinic?: ClinicUpdateOneRequiredWithoutTreatmentsByClinicNestedInput
        treatment?: TreatmentUpdateOneRequiredWithoutTreatmentsByClinicNestedInput
    };
    export type TreatmentsByClinicUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string
        clinicId?: StringFieldUpdateOperationsInput | string
        treatmentId?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentsByClinicCreateManyInput = {
        id?: string
        clinicId: string
        treatmentId: string
        priceOverride?: Decimal | DecimalJsLike | number | string | null
        notes?: string | null
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type TreatmentsByClinicUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentsByClinicUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string
        clinicId?: StringFieldUpdateOperationsInput | string
        treatmentId?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type StringFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>
        in?: string[] | ListStringFieldRefInput<$PrismaModel>
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        mode?: QueryMode
        not?: NestedStringFilter<$PrismaModel> | string
    };
    export type DateTimeFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        not?: NestedDateTimeFilter<$PrismaModel> | Date | string
    };
    export type TreatmentsByClinicListRelationFilter = {
        every?: TreatmentsByClinicWhereInput
        some?: TreatmentsByClinicWhereInput
        none?: TreatmentsByClinicWhereInput
    };
    export type TreatmentsByClinicOrderByRelationAggregateInput = {
        _count?: SortOrder
    };
    export type ClinicCountOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        code?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    };
    export type ClinicMaxOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        code?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    };
    export type ClinicMinOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        code?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    };
    export type StringWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>
        in?: string[] | ListStringFieldRefInput<$PrismaModel>
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        mode?: QueryMode
        not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedStringFilter<$PrismaModel>
        _max?: NestedStringFilter<$PrismaModel>
    };
    export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedDateTimeFilter<$PrismaModel>
        _max?: NestedDateTimeFilter<$PrismaModel>
    };
    export type StringNullableFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        mode?: QueryMode
        not?: NestedStringNullableFilter<$PrismaModel> | string | null
    };
    export type DecimalFilter<$PrismaModel = never> = {
        equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
        notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
        lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    };
    export type IntNullableFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null
        in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntNullableFilter<$PrismaModel> | number | null
    };
    export type SortOrderInput = {
        sort: SortOrder
        nulls?: NullsOrder
    };
    export type TreatmentCountOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        description?: SortOrder
        price?: SortOrder
        maintenanceIntervalMonths?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    };
    export type TreatmentAvgOrderByAggregateInput = {
        price?: SortOrder
        maintenanceIntervalMonths?: SortOrder
    };
    export type TreatmentMaxOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        description?: SortOrder
        price?: SortOrder
        maintenanceIntervalMonths?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    };
    export type TreatmentMinOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        description?: SortOrder
        price?: SortOrder
        maintenanceIntervalMonths?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    };
    export type TreatmentSumOrderByAggregateInput = {
        price?: SortOrder
        maintenanceIntervalMonths?: SortOrder
    };
    export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        mode?: QueryMode
        not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
        _count?: NestedIntNullableFilter<$PrismaModel>
        _min?: NestedStringNullableFilter<$PrismaModel>
        _max?: NestedStringNullableFilter<$PrismaModel>
    };
    export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
        notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
        lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
        _count?: NestedIntFilter<$PrismaModel>
        _avg?: NestedDecimalFilter<$PrismaModel>
        _sum?: NestedDecimalFilter<$PrismaModel>
        _min?: NestedDecimalFilter<$PrismaModel>
        _max?: NestedDecimalFilter<$PrismaModel>
    };
    export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null
        in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
        _count?: NestedIntNullableFilter<$PrismaModel>
        _avg?: NestedFloatNullableFilter<$PrismaModel>
        _sum?: NestedIntNullableFilter<$PrismaModel>
        _min?: NestedIntNullableFilter<$PrismaModel>
        _max?: NestedIntNullableFilter<$PrismaModel>
    };
    export type DecimalNullableFilter<$PrismaModel = never> = {
        equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
        in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
        notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
        lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    };
    export type ClinicScalarRelationFilter = {
        is?: ClinicWhereInput
        isNot?: ClinicWhereInput
    };
    export type TreatmentScalarRelationFilter = {
        is?: TreatmentWhereInput
        isNot?: TreatmentWhereInput
    };
    export type TreatmentsByClinicClinicIdTreatmentIdCompoundUniqueInput = {
        clinicId: string
        treatmentId: string
    };
    export type TreatmentsByClinicCountOrderByAggregateInput = {
        id?: SortOrder
        clinicId?: SortOrder
        treatmentId?: SortOrder
        priceOverride?: SortOrder
        notes?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    };
    export type TreatmentsByClinicAvgOrderByAggregateInput = {
        priceOverride?: SortOrder
    };
    export type TreatmentsByClinicMaxOrderByAggregateInput = {
        id?: SortOrder
        clinicId?: SortOrder
        treatmentId?: SortOrder
        priceOverride?: SortOrder
        notes?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    };
    export type TreatmentsByClinicMinOrderByAggregateInput = {
        id?: SortOrder
        clinicId?: SortOrder
        treatmentId?: SortOrder
        priceOverride?: SortOrder
        notes?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    };
    export type TreatmentsByClinicSumOrderByAggregateInput = {
        priceOverride?: SortOrder
    };
    export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
        in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
        notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
        lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
        _count?: NestedIntNullableFilter<$PrismaModel>
        _avg?: NestedDecimalNullableFilter<$PrismaModel>
        _sum?: NestedDecimalNullableFilter<$PrismaModel>
        _min?: NestedDecimalNullableFilter<$PrismaModel>
        _max?: NestedDecimalNullableFilter<$PrismaModel>
    };
    export type TreatmentsByClinicCreateNestedManyWithoutClinicInput = {
        create?: XOR<TreatmentsByClinicCreateWithoutClinicInput, TreatmentsByClinicUncheckedCreateWithoutClinicInput> | TreatmentsByClinicCreateWithoutClinicInput[] | TreatmentsByClinicUncheckedCreateWithoutClinicInput[]
        connectOrCreate?: TreatmentsByClinicCreateOrConnectWithoutClinicInput | TreatmentsByClinicCreateOrConnectWithoutClinicInput[]
        createMany?: TreatmentsByClinicCreateManyClinicInputEnvelope
        connect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
    };
    export type TreatmentsByClinicUncheckedCreateNestedManyWithoutClinicInput = {
        create?: XOR<TreatmentsByClinicCreateWithoutClinicInput, TreatmentsByClinicUncheckedCreateWithoutClinicInput> | TreatmentsByClinicCreateWithoutClinicInput[] | TreatmentsByClinicUncheckedCreateWithoutClinicInput[]
        connectOrCreate?: TreatmentsByClinicCreateOrConnectWithoutClinicInput | TreatmentsByClinicCreateOrConnectWithoutClinicInput[]
        createMany?: TreatmentsByClinicCreateManyClinicInputEnvelope
        connect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
    };
    export type StringFieldUpdateOperationsInput = {
        set?: string
    };
    export type DateTimeFieldUpdateOperationsInput = {
        set?: Date | string
    };
    export type TreatmentsByClinicUpdateManyWithoutClinicNestedInput = {
        create?: XOR<TreatmentsByClinicCreateWithoutClinicInput, TreatmentsByClinicUncheckedCreateWithoutClinicInput> | TreatmentsByClinicCreateWithoutClinicInput[] | TreatmentsByClinicUncheckedCreateWithoutClinicInput[]
        connectOrCreate?: TreatmentsByClinicCreateOrConnectWithoutClinicInput | TreatmentsByClinicCreateOrConnectWithoutClinicInput[]
        upsert?: TreatmentsByClinicUpsertWithWhereUniqueWithoutClinicInput | TreatmentsByClinicUpsertWithWhereUniqueWithoutClinicInput[]
        createMany?: TreatmentsByClinicCreateManyClinicInputEnvelope
        set?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        disconnect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        delete?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        connect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        update?: TreatmentsByClinicUpdateWithWhereUniqueWithoutClinicInput | TreatmentsByClinicUpdateWithWhereUniqueWithoutClinicInput[]
        updateMany?: TreatmentsByClinicUpdateManyWithWhereWithoutClinicInput | TreatmentsByClinicUpdateManyWithWhereWithoutClinicInput[]
        deleteMany?: TreatmentsByClinicScalarWhereInput | TreatmentsByClinicScalarWhereInput[]
    };
    export type TreatmentsByClinicUncheckedUpdateManyWithoutClinicNestedInput = {
        create?: XOR<TreatmentsByClinicCreateWithoutClinicInput, TreatmentsByClinicUncheckedCreateWithoutClinicInput> | TreatmentsByClinicCreateWithoutClinicInput[] | TreatmentsByClinicUncheckedCreateWithoutClinicInput[]
        connectOrCreate?: TreatmentsByClinicCreateOrConnectWithoutClinicInput | TreatmentsByClinicCreateOrConnectWithoutClinicInput[]
        upsert?: TreatmentsByClinicUpsertWithWhereUniqueWithoutClinicInput | TreatmentsByClinicUpsertWithWhereUniqueWithoutClinicInput[]
        createMany?: TreatmentsByClinicCreateManyClinicInputEnvelope
        set?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        disconnect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        delete?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        connect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        update?: TreatmentsByClinicUpdateWithWhereUniqueWithoutClinicInput | TreatmentsByClinicUpdateWithWhereUniqueWithoutClinicInput[]
        updateMany?: TreatmentsByClinicUpdateManyWithWhereWithoutClinicInput | TreatmentsByClinicUpdateManyWithWhereWithoutClinicInput[]
        deleteMany?: TreatmentsByClinicScalarWhereInput | TreatmentsByClinicScalarWhereInput[]
    };
    export type TreatmentsByClinicCreateNestedManyWithoutTreatmentInput = {
        create?: XOR<TreatmentsByClinicCreateWithoutTreatmentInput, TreatmentsByClinicUncheckedCreateWithoutTreatmentInput> | TreatmentsByClinicCreateWithoutTreatmentInput[] | TreatmentsByClinicUncheckedCreateWithoutTreatmentInput[]
        connectOrCreate?: TreatmentsByClinicCreateOrConnectWithoutTreatmentInput | TreatmentsByClinicCreateOrConnectWithoutTreatmentInput[]
        createMany?: TreatmentsByClinicCreateManyTreatmentInputEnvelope
        connect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
    };
    export type TreatmentsByClinicUncheckedCreateNestedManyWithoutTreatmentInput = {
        create?: XOR<TreatmentsByClinicCreateWithoutTreatmentInput, TreatmentsByClinicUncheckedCreateWithoutTreatmentInput> | TreatmentsByClinicCreateWithoutTreatmentInput[] | TreatmentsByClinicUncheckedCreateWithoutTreatmentInput[]
        connectOrCreate?: TreatmentsByClinicCreateOrConnectWithoutTreatmentInput | TreatmentsByClinicCreateOrConnectWithoutTreatmentInput[]
        createMany?: TreatmentsByClinicCreateManyTreatmentInputEnvelope
        connect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
    };
    export type NullableStringFieldUpdateOperationsInput = {
        set?: string | null
    };
    export type DecimalFieldUpdateOperationsInput = {
        set?: Decimal | DecimalJsLike | number | string
        increment?: Decimal | DecimalJsLike | number | string
        decrement?: Decimal | DecimalJsLike | number | string
        multiply?: Decimal | DecimalJsLike | number | string
        divide?: Decimal | DecimalJsLike | number | string
    };
    export type NullableIntFieldUpdateOperationsInput = {
        set?: number | null
        increment?: number
        decrement?: number
        multiply?: number
        divide?: number
    };
    export type TreatmentsByClinicUpdateManyWithoutTreatmentNestedInput = {
        create?: XOR<TreatmentsByClinicCreateWithoutTreatmentInput, TreatmentsByClinicUncheckedCreateWithoutTreatmentInput> | TreatmentsByClinicCreateWithoutTreatmentInput[] | TreatmentsByClinicUncheckedCreateWithoutTreatmentInput[]
        connectOrCreate?: TreatmentsByClinicCreateOrConnectWithoutTreatmentInput | TreatmentsByClinicCreateOrConnectWithoutTreatmentInput[]
        upsert?: TreatmentsByClinicUpsertWithWhereUniqueWithoutTreatmentInput | TreatmentsByClinicUpsertWithWhereUniqueWithoutTreatmentInput[]
        createMany?: TreatmentsByClinicCreateManyTreatmentInputEnvelope
        set?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        disconnect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        delete?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        connect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        update?: TreatmentsByClinicUpdateWithWhereUniqueWithoutTreatmentInput | TreatmentsByClinicUpdateWithWhereUniqueWithoutTreatmentInput[]
        updateMany?: TreatmentsByClinicUpdateManyWithWhereWithoutTreatmentInput | TreatmentsByClinicUpdateManyWithWhereWithoutTreatmentInput[]
        deleteMany?: TreatmentsByClinicScalarWhereInput | TreatmentsByClinicScalarWhereInput[]
    };
    export type TreatmentsByClinicUncheckedUpdateManyWithoutTreatmentNestedInput = {
        create?: XOR<TreatmentsByClinicCreateWithoutTreatmentInput, TreatmentsByClinicUncheckedCreateWithoutTreatmentInput> | TreatmentsByClinicCreateWithoutTreatmentInput[] | TreatmentsByClinicUncheckedCreateWithoutTreatmentInput[]
        connectOrCreate?: TreatmentsByClinicCreateOrConnectWithoutTreatmentInput | TreatmentsByClinicCreateOrConnectWithoutTreatmentInput[]
        upsert?: TreatmentsByClinicUpsertWithWhereUniqueWithoutTreatmentInput | TreatmentsByClinicUpsertWithWhereUniqueWithoutTreatmentInput[]
        createMany?: TreatmentsByClinicCreateManyTreatmentInputEnvelope
        set?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        disconnect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        delete?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        connect?: TreatmentsByClinicWhereUniqueInput | TreatmentsByClinicWhereUniqueInput[]
        update?: TreatmentsByClinicUpdateWithWhereUniqueWithoutTreatmentInput | TreatmentsByClinicUpdateWithWhereUniqueWithoutTreatmentInput[]
        updateMany?: TreatmentsByClinicUpdateManyWithWhereWithoutTreatmentInput | TreatmentsByClinicUpdateManyWithWhereWithoutTreatmentInput[]
        deleteMany?: TreatmentsByClinicScalarWhereInput | TreatmentsByClinicScalarWhereInput[]
    };
    export type ClinicCreateNestedOneWithoutTreatmentsByClinicInput = {
        create?: XOR<ClinicCreateWithoutTreatmentsByClinicInput, ClinicUncheckedCreateWithoutTreatmentsByClinicInput>
        connectOrCreate?: ClinicCreateOrConnectWithoutTreatmentsByClinicInput
        connect?: ClinicWhereUniqueInput
    };
    export type TreatmentCreateNestedOneWithoutTreatmentsByClinicInput = {
        create?: XOR<TreatmentCreateWithoutTreatmentsByClinicInput, TreatmentUncheckedCreateWithoutTreatmentsByClinicInput>
        connectOrCreate?: TreatmentCreateOrConnectWithoutTreatmentsByClinicInput
        connect?: TreatmentWhereUniqueInput
    };
    export type NullableDecimalFieldUpdateOperationsInput = {
        set?: Decimal | DecimalJsLike | number | string | null
        increment?: Decimal | DecimalJsLike | number | string
        decrement?: Decimal | DecimalJsLike | number | string
        multiply?: Decimal | DecimalJsLike | number | string
        divide?: Decimal | DecimalJsLike | number | string
    };
    export type ClinicUpdateOneRequiredWithoutTreatmentsByClinicNestedInput = {
        create?: XOR<ClinicCreateWithoutTreatmentsByClinicInput, ClinicUncheckedCreateWithoutTreatmentsByClinicInput>
        connectOrCreate?: ClinicCreateOrConnectWithoutTreatmentsByClinicInput
        upsert?: ClinicUpsertWithoutTreatmentsByClinicInput
        connect?: ClinicWhereUniqueInput
        update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutTreatmentsByClinicInput, ClinicUpdateWithoutTreatmentsByClinicInput>, ClinicUncheckedUpdateWithoutTreatmentsByClinicInput>
    };
    export type TreatmentUpdateOneRequiredWithoutTreatmentsByClinicNestedInput = {
        create?: XOR<TreatmentCreateWithoutTreatmentsByClinicInput, TreatmentUncheckedCreateWithoutTreatmentsByClinicInput>
        connectOrCreate?: TreatmentCreateOrConnectWithoutTreatmentsByClinicInput
        upsert?: TreatmentUpsertWithoutTreatmentsByClinicInput
        connect?: TreatmentWhereUniqueInput
        update?: XOR<XOR<TreatmentUpdateToOneWithWhereWithoutTreatmentsByClinicInput, TreatmentUpdateWithoutTreatmentsByClinicInput>, TreatmentUncheckedUpdateWithoutTreatmentsByClinicInput>
    };
    export type NestedStringFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>
        in?: string[] | ListStringFieldRefInput<$PrismaModel>
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringFilter<$PrismaModel> | string
    };
    export type NestedDateTimeFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        not?: NestedDateTimeFilter<$PrismaModel> | Date | string
    };
    export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>
        in?: string[] | ListStringFieldRefInput<$PrismaModel>
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedStringFilter<$PrismaModel>
        _max?: NestedStringFilter<$PrismaModel>
    };
    export type NestedIntFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>
        in?: number[] | ListIntFieldRefInput<$PrismaModel>
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntFilter<$PrismaModel> | number
    };
    export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedDateTimeFilter<$PrismaModel>
        _max?: NestedDateTimeFilter<$PrismaModel>
    };
    export type NestedStringNullableFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringNullableFilter<$PrismaModel> | string | null
    };
    export type NestedDecimalFilter<$PrismaModel = never> = {
        equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
        notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
        lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    };
    export type NestedIntNullableFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null
        in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntNullableFilter<$PrismaModel> | number | null
    };
    export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
        _count?: NestedIntNullableFilter<$PrismaModel>
        _min?: NestedStringNullableFilter<$PrismaModel>
        _max?: NestedStringNullableFilter<$PrismaModel>
    };
    export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
        notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
        lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
        _count?: NestedIntFilter<$PrismaModel>
        _avg?: NestedDecimalFilter<$PrismaModel>
        _sum?: NestedDecimalFilter<$PrismaModel>
        _min?: NestedDecimalFilter<$PrismaModel>
        _max?: NestedDecimalFilter<$PrismaModel>
    };
    export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null
        in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
        _count?: NestedIntNullableFilter<$PrismaModel>
        _avg?: NestedFloatNullableFilter<$PrismaModel>
        _sum?: NestedIntNullableFilter<$PrismaModel>
        _min?: NestedIntNullableFilter<$PrismaModel>
        _max?: NestedIntNullableFilter<$PrismaModel>
    };
    export type NestedFloatNullableFilter<$PrismaModel = never> = {
        equals?: number | FloatFieldRefInput<$PrismaModel> | null
        in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
        notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
        lt?: number | FloatFieldRefInput<$PrismaModel>
        lte?: number | FloatFieldRefInput<$PrismaModel>
        gt?: number | FloatFieldRefInput<$PrismaModel>
        gte?: number | FloatFieldRefInput<$PrismaModel>
        not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    };
    export type NestedDecimalNullableFilter<$PrismaModel = never> = {
        equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
        in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
        notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
        lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    };
    export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
        in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
        notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
        lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
        not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
        _count?: NestedIntNullableFilter<$PrismaModel>
        _avg?: NestedDecimalNullableFilter<$PrismaModel>
        _sum?: NestedDecimalNullableFilter<$PrismaModel>
        _min?: NestedDecimalNullableFilter<$PrismaModel>
        _max?: NestedDecimalNullableFilter<$PrismaModel>
    };
    export type TreatmentsByClinicCreateWithoutClinicInput = {
        id?: string
        priceOverride?: Decimal | DecimalJsLike | number | string | null
        notes?: string | null
        createdAt?: Date | string
        updatedAt?: Date | string
        treatment: TreatmentCreateNestedOneWithoutTreatmentsByClinicInput
    };
    export type TreatmentsByClinicUncheckedCreateWithoutClinicInput = {
        id?: string
        treatmentId: string
        priceOverride?: Decimal | DecimalJsLike | number | string | null
        notes?: string | null
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type TreatmentsByClinicCreateOrConnectWithoutClinicInput = {
        where: TreatmentsByClinicWhereUniqueInput
        create: XOR<TreatmentsByClinicCreateWithoutClinicInput, TreatmentsByClinicUncheckedCreateWithoutClinicInput>
    };
    export type TreatmentsByClinicCreateManyClinicInputEnvelope = {
        data: TreatmentsByClinicCreateManyClinicInput | TreatmentsByClinicCreateManyClinicInput[]
        skipDuplicates?: boolean
    };
    export type TreatmentsByClinicUpsertWithWhereUniqueWithoutClinicInput = {
        where: TreatmentsByClinicWhereUniqueInput
        update: XOR<TreatmentsByClinicUpdateWithoutClinicInput, TreatmentsByClinicUncheckedUpdateWithoutClinicInput>
        create: XOR<TreatmentsByClinicCreateWithoutClinicInput, TreatmentsByClinicUncheckedCreateWithoutClinicInput>
    };
    export type TreatmentsByClinicUpdateWithWhereUniqueWithoutClinicInput = {
        where: TreatmentsByClinicWhereUniqueInput
        data: XOR<TreatmentsByClinicUpdateWithoutClinicInput, TreatmentsByClinicUncheckedUpdateWithoutClinicInput>
    };
    export type TreatmentsByClinicUpdateManyWithWhereWithoutClinicInput = {
        where: TreatmentsByClinicScalarWhereInput
        data: XOR<TreatmentsByClinicUpdateManyMutationInput, TreatmentsByClinicUncheckedUpdateManyWithoutClinicInput>
    };
    export type TreatmentsByClinicScalarWhereInput = {
        AND?: TreatmentsByClinicScalarWhereInput | TreatmentsByClinicScalarWhereInput[]
        OR?: TreatmentsByClinicScalarWhereInput[]
        NOT?: TreatmentsByClinicScalarWhereInput | TreatmentsByClinicScalarWhereInput[]
        id?: StringFilter<"TreatmentsByClinic"> | string
        clinicId?: StringFilter<"TreatmentsByClinic"> | string
        treatmentId?: StringFilter<"TreatmentsByClinic"> | string
        priceOverride?: DecimalNullableFilter<"TreatmentsByClinic"> | Decimal | DecimalJsLike | number | string | null
        notes?: StringNullableFilter<"TreatmentsByClinic"> | string | null
        createdAt?: DateTimeFilter<"TreatmentsByClinic"> | Date | string
        updatedAt?: DateTimeFilter<"TreatmentsByClinic"> | Date | string
    };
    export type TreatmentsByClinicCreateWithoutTreatmentInput = {
        id?: string
        priceOverride?: Decimal | DecimalJsLike | number | string | null
        notes?: string | null
        createdAt?: Date | string
        updatedAt?: Date | string
        clinic: ClinicCreateNestedOneWithoutTreatmentsByClinicInput
    };
    export type TreatmentsByClinicUncheckedCreateWithoutTreatmentInput = {
        id?: string
        clinicId: string
        priceOverride?: Decimal | DecimalJsLike | number | string | null
        notes?: string | null
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type TreatmentsByClinicCreateOrConnectWithoutTreatmentInput = {
        where: TreatmentsByClinicWhereUniqueInput
        create: XOR<TreatmentsByClinicCreateWithoutTreatmentInput, TreatmentsByClinicUncheckedCreateWithoutTreatmentInput>
    };
    export type TreatmentsByClinicCreateManyTreatmentInputEnvelope = {
        data: TreatmentsByClinicCreateManyTreatmentInput | TreatmentsByClinicCreateManyTreatmentInput[]
        skipDuplicates?: boolean
    };
    export type TreatmentsByClinicUpsertWithWhereUniqueWithoutTreatmentInput = {
        where: TreatmentsByClinicWhereUniqueInput
        update: XOR<TreatmentsByClinicUpdateWithoutTreatmentInput, TreatmentsByClinicUncheckedUpdateWithoutTreatmentInput>
        create: XOR<TreatmentsByClinicCreateWithoutTreatmentInput, TreatmentsByClinicUncheckedCreateWithoutTreatmentInput>
    };
    export type TreatmentsByClinicUpdateWithWhereUniqueWithoutTreatmentInput = {
        where: TreatmentsByClinicWhereUniqueInput
        data: XOR<TreatmentsByClinicUpdateWithoutTreatmentInput, TreatmentsByClinicUncheckedUpdateWithoutTreatmentInput>
    };
    export type TreatmentsByClinicUpdateManyWithWhereWithoutTreatmentInput = {
        where: TreatmentsByClinicScalarWhereInput
        data: XOR<TreatmentsByClinicUpdateManyMutationInput, TreatmentsByClinicUncheckedUpdateManyWithoutTreatmentInput>
    };
    export type ClinicCreateWithoutTreatmentsByClinicInput = {
        id?: string
        name: string
        code: string
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type ClinicUncheckedCreateWithoutTreatmentsByClinicInput = {
        id?: string
        name: string
        code: string
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type ClinicCreateOrConnectWithoutTreatmentsByClinicInput = {
        where: ClinicWhereUniqueInput
        create: XOR<ClinicCreateWithoutTreatmentsByClinicInput, ClinicUncheckedCreateWithoutTreatmentsByClinicInput>
    };
    export type TreatmentCreateWithoutTreatmentsByClinicInput = {
        id?: string
        name: string
        description?: string | null
        price: Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: number | null
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type TreatmentUncheckedCreateWithoutTreatmentsByClinicInput = {
        id?: string
        name: string
        description?: string | null
        price: Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: number | null
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type TreatmentCreateOrConnectWithoutTreatmentsByClinicInput = {
        where: TreatmentWhereUniqueInput
        create: XOR<TreatmentCreateWithoutTreatmentsByClinicInput, TreatmentUncheckedCreateWithoutTreatmentsByClinicInput>
    };
    export type ClinicUpsertWithoutTreatmentsByClinicInput = {
        update: XOR<ClinicUpdateWithoutTreatmentsByClinicInput, ClinicUncheckedUpdateWithoutTreatmentsByClinicInput>
        create: XOR<ClinicCreateWithoutTreatmentsByClinicInput, ClinicUncheckedCreateWithoutTreatmentsByClinicInput>
        where?: ClinicWhereInput
    };
    export type ClinicUpdateToOneWithWhereWithoutTreatmentsByClinicInput = {
        where?: ClinicWhereInput
        data: XOR<ClinicUpdateWithoutTreatmentsByClinicInput, ClinicUncheckedUpdateWithoutTreatmentsByClinicInput>
    };
    export type ClinicUpdateWithoutTreatmentsByClinicInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        code?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type ClinicUncheckedUpdateWithoutTreatmentsByClinicInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        code?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentUpsertWithoutTreatmentsByClinicInput = {
        update: XOR<TreatmentUpdateWithoutTreatmentsByClinicInput, TreatmentUncheckedUpdateWithoutTreatmentsByClinicInput>
        create: XOR<TreatmentCreateWithoutTreatmentsByClinicInput, TreatmentUncheckedCreateWithoutTreatmentsByClinicInput>
        where?: TreatmentWhereInput
    };
    export type TreatmentUpdateToOneWithWhereWithoutTreatmentsByClinicInput = {
        where?: TreatmentWhereInput
        data: XOR<TreatmentUpdateWithoutTreatmentsByClinicInput, TreatmentUncheckedUpdateWithoutTreatmentsByClinicInput>
    };
    export type TreatmentUpdateWithoutTreatmentsByClinicInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        description?: NullableStringFieldUpdateOperationsInput | string | null
        price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: NullableIntFieldUpdateOperationsInput | number | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentUncheckedUpdateWithoutTreatmentsByClinicInput = {
        id?: StringFieldUpdateOperationsInput | string
        name?: StringFieldUpdateOperationsInput | string
        description?: NullableStringFieldUpdateOperationsInput | string | null
        price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
        maintenanceIntervalMonths?: NullableIntFieldUpdateOperationsInput | number | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentsByClinicCreateManyClinicInput = {
        id?: string
        treatmentId: string
        priceOverride?: Decimal | DecimalJsLike | number | string | null
        notes?: string | null
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type TreatmentsByClinicUpdateWithoutClinicInput = {
        id?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
        treatment?: TreatmentUpdateOneRequiredWithoutTreatmentsByClinicNestedInput
    };
    export type TreatmentsByClinicUncheckedUpdateWithoutClinicInput = {
        id?: StringFieldUpdateOperationsInput | string
        treatmentId?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentsByClinicUncheckedUpdateManyWithoutClinicInput = {
        id?: StringFieldUpdateOperationsInput | string
        treatmentId?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentsByClinicCreateManyTreatmentInput = {
        id?: string
        clinicId: string
        priceOverride?: Decimal | DecimalJsLike | number | string | null
        notes?: string | null
        createdAt?: Date | string
        updatedAt?: Date | string
    };
    export type TreatmentsByClinicUpdateWithoutTreatmentInput = {
        id?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
        clinic?: ClinicUpdateOneRequiredWithoutTreatmentsByClinicNestedInput
    };
    export type TreatmentsByClinicUncheckedUpdateWithoutTreatmentInput = {
        id?: StringFieldUpdateOperationsInput | string
        clinicId?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    export type TreatmentsByClinicUncheckedUpdateManyWithoutTreatmentInput = {
        id?: StringFieldUpdateOperationsInput | string
        clinicId?: StringFieldUpdateOperationsInput | string
        priceOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
        notes?: NullableStringFieldUpdateOperationsInput | string | null
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    };
    /**
     * Batch Payload for updateMany & deleteMany & createMany
     */
    export type BatchPayload = {
        count: number
    };
}

export type Auth = {
    id: string;
    role: string;
};
