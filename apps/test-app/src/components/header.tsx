"use client";

import { useSlashID } from "@slashid/react";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useClinic } from "@/context/clinic-context";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { trpc } from "@/lib/trpc";

export function Header() {
    const { isAuthenticated } = useSlashID();
    const isAdmin = useIsAdmin();
    const { selectedClinicId, setSelectedClinicId } = useClinic();
    const { data: clinics, isLoading: clinicsLoading } = trpc.clinic.list.useQuery(undefined, {
        enabled: isAuthenticated && isAdmin,
    });

    return (
        <header className="border-b bg-background">
            <div className="container mx-auto flex h-14 max-w-4xl items-center justify-between px-8">
                <Link href="/" className="font-semibold">
                    Acme CRM
                </Link>

                <div className="flex items-center gap-4">
                    {isAuthenticated && isAdmin && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Clinic:</span>
                            <Select
                                value={selectedClinicId ?? "all"}
                                onValueChange={(value) => setSelectedClinicId(value === "all" ? null : value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={clinicsLoading ? "Loading..." : "Select clinic"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Clinics</SelectItem>
                                    {clinics?.map((clinic) => (
                                        <SelectItem key={clinic.id} value={clinic.id}>
                                            {clinic.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {isAuthenticated && <LogoutButton variant="outline" size="sm" />}
                </div>
            </div>
        </header>
    );
}
