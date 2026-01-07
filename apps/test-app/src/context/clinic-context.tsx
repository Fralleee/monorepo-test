"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

interface ClinicContextValue {
    selectedClinicId: string | null;
    setSelectedClinicId: (id: string | null) => void;
}

const ClinicContext = createContext<ClinicContextValue | null>(null);

export function ClinicProvider({ children }: { children: ReactNode }) {
    const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

    return (
        <ClinicContext.Provider value={{ selectedClinicId, setSelectedClinicId }}>{children}</ClinicContext.Provider>
    );
}

export function useClinic() {
    const context = useContext(ClinicContext);
    if (!context) {
        throw new Error("useClinic must be used within a ClinicProvider");
    }
    return context;
}
