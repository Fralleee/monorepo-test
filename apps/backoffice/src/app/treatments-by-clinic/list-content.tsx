"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDelete, useList } from "@refinedev/core";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

type TreatmentByClinic = {
    id: string;
    clinicId: string;
    treatmentId: string;
    priceOverride: string | number | null;
    notes: string | null;
    clinic: { id: string; name: string; code: string };
    treatment: { id: string; name: string; price: string | number };
    createdAt: string;
    updatedAt: string;
};

export function TreatmentsByClinicListContent() {
    const { result, query } = useList<TreatmentByClinic>({ resource: "treatmentsByClinic" });
    const { isLoading, refetch } = query;
    const items = result.data;
    const { mutate: deleteItem } = useDelete();

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to remove this treatment from the clinic?")) {
            deleteItem(
                { resource: "treatmentsByClinic", id },
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
                    <h1 className="text-2xl font-bold">Clinic Treatments</h1>
                    <p className="text-muted-foreground">Manage treatment assignments by clinic</p>
                </div>
                <Button asChild>
                    <Link href="/treatments-by-clinic/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Assign Treatment
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-muted-foreground">Loading...</p>
                    ) : !items?.length ? (
                        <p className="text-muted-foreground">No treatment assignments found</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Clinic</TableHead>
                                    <TableHead>Treatment</TableHead>
                                    <TableHead>Base Price</TableHead>
                                    <TableHead>Override Price</TableHead>
                                    <TableHead>Notes</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            {item.clinic.name}
                                            <span className="ml-2 text-xs text-muted-foreground">
                                                ({item.clinic.code})
                                            </span>
                                        </TableCell>
                                        <TableCell>{item.treatment.name}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            ${Number(item.treatment.price).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {item.priceOverride ? (
                                                <span className="font-medium text-green-600">
                                                    ${Number(item.priceOverride).toFixed(2)}
                                                </span>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-[150px] truncate text-muted-foreground">
                                            {item.notes || "-"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/treatments-by-clinic/${item.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(item.id)}
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
