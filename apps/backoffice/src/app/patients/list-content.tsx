"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDelete, useList } from "@refinedev/core";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

type Patient = {
    id: string;
    name: string;
    phone: string;
    email: string;
    clinicId: string;
    clinic: {
        id: string;
        name: string;
        code: string;
    };
    createdAt: string;
    updatedAt: string;
};

export function PatientsListContent() {
    const { result, query } = useList<Patient>({ resource: "patients" });
    const { isLoading, refetch } = query;
    const patients = result.data;
    const { mutate: deletePatient } = useDelete();

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            deletePatient(
                { resource: "patients", id },
                {
                    onSuccess: () => refetch(),
                },
            );
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Patients</h1>
                    <p className="text-muted-foreground">Manage clinic patients</p>
                </div>
                <Button asChild>
                    <Link href="/patients/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Patient
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Patients</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-muted-foreground">Loading...</p>
                    ) : !patients?.length ? (
                        <p className="text-muted-foreground">No patients found</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Clinic</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell className="font-medium">{patient.name}</TableCell>
                                        <TableCell>{patient.email}</TableCell>
                                        <TableCell>{patient.phone}</TableCell>
                                        <TableCell>
                                            <code className="rounded bg-muted px-1 py-0.5 text-xs">
                                                {patient.clinic?.name ?? "N/A"}
                                            </code>
                                        </TableCell>
                                        <TableCell>{new Date(patient.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/patients/${patient.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(patient.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
