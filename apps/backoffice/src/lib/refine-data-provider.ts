/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DataProvider } from "@refinedev/core";
import { trpcClient } from "./trpc";

type ResourceName = "clinics" | "treatments" | "treatmentsByClinic";

export const dataProvider: DataProvider = {
    getList: async ({ resource }) => {
        const resourceMap: Record<ResourceName, () => Promise<unknown[]>> = {
            clinics: () => trpcClient.clinic.list.query(),
            treatments: () => trpcClient.treatment.list.query(),
            treatmentsByClinic: () => trpcClient.treatmentsByClinic.list.query({}),
        };

        const fetcher = resourceMap[resource as ResourceName];
        if (!fetcher) {
            throw new Error(`Unknown resource: ${resource}`);
        }

        const data = await fetcher();

        return {
            data: data as any,
            total: data.length,
        };
    },

    getOne: async ({ resource, id }) => {
        const resourceMap: Record<ResourceName, (id: string) => Promise<unknown>> = {
            clinics: (id) => trpcClient.clinic.byId.query({ id }),
            treatments: (id) => trpcClient.treatment.byId.query({ id }),
            treatmentsByClinic: (id) => trpcClient.treatmentsByClinic.byId.query({ id }),
        };

        const fetcher = resourceMap[resource as ResourceName];
        if (!fetcher) {
            throw new Error(`Unknown resource: ${resource}`);
        }

        const data = await fetcher(id as string);

        return {
            data: data as any,
        };
    },

    create: async ({ resource, variables }) => {
        const resourceMap: Record<ResourceName, (vars: Record<string, unknown>) => Promise<unknown>> = {
            clinics: (vars) => trpcClient.clinic.create.mutate(vars as { name: string; code: string }),
            treatments: (vars) =>
                trpcClient.treatment.create.mutate(
                    vars as { name: string; description?: string; price: number; maintenanceIntervalMonths?: number },
                ),
            treatmentsByClinic: (vars) =>
                trpcClient.treatmentsByClinic.create.mutate(
                    vars as { clinicId: string; treatmentId: string; priceOverride?: number; notes?: string },
                ),
        };

        const creator = resourceMap[resource as ResourceName];
        if (!creator) {
            throw new Error(`Unknown resource: ${resource}`);
        }

        const data = await creator(variables as Record<string, unknown>);

        return {
            data: data as any,
        };
    },

    update: async ({ resource, id, variables }) => {
        const resourceMap: Record<ResourceName, (id: string, vars: Record<string, unknown>) => Promise<unknown>> = {
            clinics: (id, vars) =>
                trpcClient.clinic.update.mutate({ id, ...vars } as { id: string; name?: string; code?: string }),
            treatments: (id, vars) =>
                trpcClient.treatment.update.mutate({
                    id,
                    ...vars,
                } as {
                    id: string;
                    name?: string;
                    description?: string;
                    price?: number;
                    maintenanceIntervalMonths?: number | null;
                }),
            treatmentsByClinic: (id, vars) =>
                trpcClient.treatmentsByClinic.update.mutate({
                    id,
                    ...vars,
                } as { id: string; priceOverride?: number | null; notes?: string | null }),
        };

        const updater = resourceMap[resource as ResourceName];
        if (!updater) {
            throw new Error(`Unknown resource: ${resource}`);
        }

        const data = await updater(id as string, variables as Record<string, unknown>);

        return {
            data: data as any,
        };
    },

    deleteOne: async ({ resource, id }) => {
        const resourceMap: Record<ResourceName, (id: string) => Promise<unknown>> = {
            clinics: (id) => trpcClient.clinic.delete.mutate({ id }),
            treatments: (id) => trpcClient.treatment.delete.mutate({ id }),
            treatmentsByClinic: (id) => trpcClient.treatmentsByClinic.delete.mutate({ id }),
        };

        const deleter = resourceMap[resource as ResourceName];
        if (!deleter) {
            throw new Error(`Unknown resource: ${resource}`);
        }

        const data = await deleter(id as string);

        return {
            data: data as any,
        };
    },

    getApiUrl: () => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",

    getMany: async ({ resource, ids }) => {
        const results = await Promise.all(ids.map((id) => dataProvider.getOne({ resource, id })));
        return {
            data: results.map((r) => r.data) as any,
        };
    },

    createMany: async ({ resource, variables }) => {
        const results = await Promise.all(variables.map((vars) => dataProvider.create({ resource, variables: vars })));
        return {
            data: results.map((r) => r.data) as any,
        };
    },

    updateMany: async ({ resource, ids, variables }) => {
        const results = await Promise.all(ids.map((id) => dataProvider.update({ resource, id, variables })));
        return {
            data: results.map((r) => r.data) as any,
        };
    },

    deleteMany: async ({ resource, ids }) => {
        const results = await Promise.all(ids.map((id) => dataProvider.deleteOne({ resource, id })));
        return {
            data: results.map((r) => r.data) as any,
        };
    },

    custom: async () => {
        throw new Error("Custom method not implemented");
    },
};
