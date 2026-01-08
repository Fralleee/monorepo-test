import type { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    login: async () => {
        return {
            success: true,
            redirectTo: "/login",
        };
    },

    logout: async () => {
        return {
            success: true,
            redirectTo: "/login",
        };
    },

    check: async () => {
        if (typeof window !== "undefined") {
            const orgId = process.env.NEXT_PUBLIC_SLASHID_ORG_ID;
            const cookieName = `@slashid/USER_TOKEN/${orgId}`;
            const hasCookie = document.cookie.includes(cookieName);

            if (hasCookie) {
                return { authenticated: true };
            }
        }

        return {
            authenticated: false,
            redirectTo: "/login",
        };
    },

    getPermissions: async () => {
        return null;
    },

    getIdentity: async () => {
        return null;
    },

    onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
            return {
                logout: true,
                redirectTo: "/login",
            };
        }

        return { error };
    },
};
