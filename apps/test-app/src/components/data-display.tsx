"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useClinic } from "@/context/clinic-context";
import { trpc } from "@/lib/trpc";

export function ClinicsDisplay() {
    const { data: clinics, isLoading, error } = trpc.clinic.list.useQuery();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Clinics</CardTitle>
                <CardDescription>Loaded via tRPC from API</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && <p className="text-sm text-muted-foreground">Loading clinics...</p>}
                {error && <p className="text-sm text-destructive">Error: {error.message}</p>}
                {clinics && clinics.length === 0 && <p className="text-sm text-muted-foreground">No clinics found</p>}
                {clinics && clinics.length > 0 && (
                    <ul className="space-y-2">
                        {clinics.map((clinic) => (
                            <li key={clinic.id} className="rounded border p-2 text-sm">
                                <span className="font-medium">{clinic.name}</span>
                                <span className="ml-2 text-muted-foreground">({clinic.code})</span>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}

export function TreatmentsDisplay() {
    const { selectedClinicId } = useClinic();

    // Fetch base treatments when no clinic selected
    const {
        data: treatments,
        isLoading: treatmentsLoading,
        error: treatmentsError,
    } = trpc.treatment.list.useQuery(undefined, {
        enabled: !selectedClinicId,
    });

    // Fetch clinic-specific treatments when a clinic is selected
    const {
        data: clinicTreatments,
        isLoading: clinicTreatmentsLoading,
        error: clinicTreatmentsError,
    } = trpc.treatmentsByClinic.list.useQuery({ clinicId: selectedClinicId ?? "" }, { enabled: !!selectedClinicId });

    const isLoading = selectedClinicId ? clinicTreatmentsLoading : treatmentsLoading;
    const error = selectedClinicId ? clinicTreatmentsError : treatmentsError;

    const selectedClinic = clinicTreatments?.[0]?.clinic;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Treatments</CardTitle>
                <CardDescription>
                    {selectedClinicId && selectedClinic
                        ? `Prices for ${selectedClinic.name}`
                        : "Base prices (select a clinic for overrides)"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && <p className="text-sm text-muted-foreground">Loading treatments...</p>}
                {error && <p className="text-sm text-destructive">Error: {error.message}</p>}

                {/* Show base treatments when no clinic selected */}
                {!selectedClinicId && treatments && treatments.length === 0 && (
                    <p className="text-sm text-muted-foreground">No treatments found</p>
                )}
                {!selectedClinicId && treatments && treatments.length > 0 && (
                    <ul className="space-y-2">
                        {treatments.map((treatment) => (
                            <li key={treatment.id} className="rounded border p-2 text-sm">
                                <span className="font-medium">{treatment.name}</span>
                                <span className="ml-2 text-muted-foreground">
                                    ${Number(treatment.price).toFixed(2)}
                                </span>
                                {treatment.description && (
                                    <p className="mt-1 text-xs text-muted-foreground">{treatment.description}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Show clinic-specific treatments when a clinic is selected */}
                {selectedClinicId && clinicTreatments && clinicTreatments.length === 0 && (
                    <p className="text-sm text-muted-foreground">No treatments assigned to this clinic</p>
                )}
                {selectedClinicId && clinicTreatments && clinicTreatments.length > 0 && (
                    <ul className="space-y-2">
                        {clinicTreatments.map((ct) => {
                            const effectivePrice = ct.priceOverride ?? ct.treatment.price;
                            const hasOverride = ct.priceOverride !== null;

                            return (
                                <li key={ct.id} className="rounded border p-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{ct.treatment.name}</span>
                                        <div className="text-right">
                                            <span
                                                className={
                                                    hasOverride ? "font-medium text-green-600" : "text-muted-foreground"
                                                }
                                            >
                                                ${Number(effectivePrice).toFixed(2)}
                                            </span>
                                            {hasOverride && (
                                                <span className="ml-2 text-xs text-muted-foreground line-through">
                                                    ${Number(ct.treatment.price).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {ct.treatment.description && (
                                        <p className="mt-1 text-xs text-muted-foreground">{ct.treatment.description}</p>
                                    )}
                                    {ct.notes && (
                                        <p className="mt-1 text-xs italic text-muted-foreground">{ct.notes}</p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
