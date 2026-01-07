import type { AppRouter } from "@acme/api-contract";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>();

function getBaseUrl() {
    if (typeof window !== "undefined") {
        return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    }
    return process.env.API_URL ?? "http://localhost:4000";
}

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/trpc`,
            transformer: superjson,
            fetch(url, options) {
                return fetch(url, {
                    ...options,
                    credentials: "include",
                });
            },
        }),
    ],
});
