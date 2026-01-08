"use client";

import "@slashid/react/style.css";
import { authProvider } from "@/lib/auth-provider";
import { dataProvider } from "@/lib/data-provider";
import { trpc, trpcClient } from "@/lib/trpc";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { SlashIDProvider } from "@slashid/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";

type ProvidersProps = {
    children: ReactNode;
    initialToken?: string | null;
};

export function Providers({ children, initialToken }: ProvidersProps) {
    const orgId = process.env.NEXT_PUBLIC_SLASHID_ORG_ID;

    if (!orgId) {
        throw new Error("NEXT_PUBLIC_SLASHID_ORG_ID is required");
    }

    const [queryClient] = useState(() => new QueryClient());

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <SlashIDProvider oid={orgId} tokenStorage="cookie" initialToken={initialToken ?? undefined}>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider}
                        authProvider={authProvider}
                        resources={[
                            {
                                name: "clinics",
                                list: "/clinics",
                                create: "/clinics/create",
                                edit: "/clinics/:id/edit",
                                show: "/clinics/:id",
                                meta: {
                                    label: "Clinics",
                                },
                            },
                            {
                                name: "treatments",
                                list: "/treatments",
                                create: "/treatments/create",
                                edit: "/treatments/:id/edit",
                                show: "/treatments/:id",
                                meta: {
                                    label: "Treatments",
                                },
                            },
                            {
                                name: "treatmentsByClinic",
                                list: "/treatments-by-clinic",
                                create: "/treatments-by-clinic/create",
                                edit: "/treatments-by-clinic/:id/edit",
                                show: "/treatments-by-clinic/:id",
                                meta: {
                                    label: "Clinic Treatments",
                                },
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        {children}
                    </Refine>
                </SlashIDProvider>
            </QueryClientProvider>
        </trpc.Provider>
    );
}
