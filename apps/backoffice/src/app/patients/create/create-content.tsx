"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreate, useList } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Clinic = {
    id: string;
    name: string;
    code: string;
};

export function PatientCreateContent() {
    const router = useRouter();
    const { mutate: createPatient, mutation } = useCreate();
    const isPending = mutation.isPending;

    const { result: clinicsResult } = useList<Clinic>({ resource: "clinics" });
    const clinics = clinicsResult.data;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [clinicId, setClinicId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createPatient(
            {
                resource: "patients",
                values: { name, phone, email, clinicId },
            },
            {
                onSuccess: () => router.push("/patients"),
            },
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Create Patient</h1>
                <p className="text-muted-foreground">Add a new patient to a clinic</p>
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
                                {isPending ? "Creating..." : "Create Patient"}
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
