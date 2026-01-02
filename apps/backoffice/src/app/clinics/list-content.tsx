'use client'

import { useList, useDelete } from '@refinedev/core'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Clinic = {
  id: string
  name: string
  code: string
  createdAt: string
  updatedAt: string
}

export function ClinicsListContent() {
  const { data, isLoading, refetch } = useList<Clinic>({ resource: 'clinics' })
  const { mutate: deleteClinic } = useDelete()

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this clinic?')) {
      deleteClinic(
        { resource: 'clinics', id },
        {
          onSuccess: () => refetch(),
        },
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clinics</h1>
          <p className="text-muted-foreground">Manage clinic locations</p>
        </div>
        <Button asChild>
          <Link href="/clinics/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Clinic
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clinics</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : !data?.data.length ? (
            <p className="text-muted-foreground">No clinics found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((clinic) => (
                  <TableRow key={clinic.id}>
                    <TableCell className="font-medium">{clinic.name}</TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1 py-0.5 text-xs">{clinic.code}</code>
                    </TableCell>
                    <TableCell>{new Date(clinic.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/clinics/${clinic.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(clinic.id)}>
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
  )
}
