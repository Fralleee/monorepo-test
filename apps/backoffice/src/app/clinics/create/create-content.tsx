'use client'

import { useCreate } from '@refinedev/core'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ClinicCreateContent() {
  const router = useRouter()
  const { mutate: createClinic, mutation } = useCreate()
  const isPending = mutation.isPending

  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createClinic(
      {
        resource: 'clinics',
        values: { name, code },
      },
      {
        onSuccess: () => router.push('/clinics'),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Clinic</h1>
        <p className="text-muted-foreground">Add a new clinic location</p>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Clinic Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={20}
                required
              />
              <p className="text-xs text-muted-foreground">Unique identifier (e.g., NYC-001)</p>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Clinic'}
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
