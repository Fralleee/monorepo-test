"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useList, useOne, useUpdate } from "@refinedev/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Clinic = {
    id: string;
    name: string;
    code: string;
};

type Patient = {
    id: string;
    name: string;
    phone: string;
    email: string;
    clinicId: string;
};

export function PatientEditContent() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const { result: patient, query: patientQuery } = useOne<Patient>({
        resource: "patients",
        id,
    });
    const isLoadingPatient = patientQuery.isLoading;

    const { result: clinicsResult } = useList<Clinic>({ resource: "clinics" });
    const clinics = clinicsResult.data;

    const { mutate: updatePatient, mutation } = useUpdate();
    const isPending = mutation.isPending;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [clinicId, setClinicId] = useState("");

    useEffect(() => {
        if (patient) {
            setName(patient.name);
            setPhone(patient.phone);
            setEmail(patient.email);
            setClinicId(patient.clinicId);
        }
    }, [patient]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updatePatient(
            {
                resource: "patients",
                id,
                values: { name, phone, email, clinicId },
            },
            {
                onSuccess: () => router.push("/patients"),
            },
        );
    };

    if (isLoadingPatient) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Edit Patient</h1>
                    <p className="text-muted-foreground">Loading patient details...</p>
                </div>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Edit Patient</h1>
                    <p className="text-muted-foreground">Patient not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Edit Patient</h1>
                <p className="text-muted-foreground">Update patient information</p>
            </div>

            <Card className="max-w-lg">
                <CardHeader>
                    <CardTitle>Patient Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="clinicId">Clinic</Label>
                            <select
                                id="clinicId"
                                value={clinicId}
                                onChange={(e) => setClinicId(e.target.value)}
                                required
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            >
                                <option value="">Select a clinic</option>
                                {clinics?.map((clinic) => (
                                    <option key={clinic.id} value={clinic.id}>
                                        {clinic.name} ({clinic.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={isPending || !clinicId}>
                                {isPending ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
