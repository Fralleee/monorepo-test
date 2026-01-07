"use client";

import "@slashid/react/style.css";
import { ClinicProvider } from "@/context/clinic-context";
import { trpc, trpcClient } from "@/lib/trpc";
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
                    <ClinicProvider>{children}</ClinicProvider>
                </SlashIDProvider>
            </QueryClientProvider>
        </trpc.Provider>
    );
}
