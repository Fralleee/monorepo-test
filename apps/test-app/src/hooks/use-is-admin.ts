"use client";

import { useSlashID } from "@slashid/react";
import { useMemo } from "react";

export function useIsAdmin(): boolean {
    const { user, isAuthenticated } = useSlashID();

    return useMemo(() => {
        if (!isAuthenticated || !user) return false;

        try {
            const groups = user.getGroups();
            return groups.includes("internal_users");
        } catch {
            return false;
        }
    }, [user, isAuthenticated]);
}
