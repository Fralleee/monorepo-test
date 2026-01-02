'use client'

import { useList, useDelete } from '@refinedev/core'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Treatment = {
  id: string
  name: string
  description: string | null
  price: string | number
  maintenanceIntervalMonths: number | null
  createdAt: string
  updatedAt: string
}

export function TreatmentsListContent() {
  const { result, query } = useList<Treatment>({ resource: 'treatments' })
  const { isLoading, refetch } = query
  const treatments = result.data
  const { mutate: deleteTreatment } = useDelete()

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this treatment?')) {
      deleteTreatment(
        { resource: 'treatments', id },
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
          <h1 className="text-2xl font-bold">Treatments</h1>
          <p className="text-muted-foreground">Manage available treatments</p>
        </div>
        <Button asChild>
          <Link href="/treatments/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Treatment
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Treatments</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : !treatments?.length ? (
            <p className="text-muted-foreground">No treatments found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Maintenance</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {treatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell className="font-medium">{treatment.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">
                      {treatment.description || '-'}
                    </TableCell>
                    <TableCell>${Number(treatment.price).toFixed(2)}</TableCell>
                    <TableCell>
                      {treatment.maintenanceIntervalMonths
                        ? `${treatment.maintenanceIntervalMonths} months`
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/treatments/${treatment.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(treatment.id)}>
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
