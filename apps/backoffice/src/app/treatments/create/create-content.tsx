'use client'

import { useCreate } from '@refinedev/core'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function TreatmentCreateContent() {
  const router = useRouter()
  const { mutate: createTreatment, mutation } = useCreate()
  const isPending = mutation.isPending

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [maintenanceMonths, setMaintenanceMonths] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createTreatment(
      {
        resource: 'treatments',
        values: {
          name,
          description: description || undefined,
          price: Number.parseFloat(price),
          maintenanceIntervalMonths: maintenanceMonths ? Number.parseInt(maintenanceMonths, 10) : undefined,
        },
      },
      {
        onSuccess: () => router.push('/treatments'),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Treatment</h1>
        <p className="text-muted-foreground">Add a new treatment option</p>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Treatment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance">Maintenance Interval (months)</Label>
              <Input
                id="maintenance"
                type="number"
                min="1"
                value={maintenanceMonths}
                onChange={(e) => setMaintenanceMonths(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Optional: recommended follow-up interval</p>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Treatment'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
