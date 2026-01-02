'use client'

import { useList } from '@refinedev/core'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Syringe, Link2 } from 'lucide-react'

export function DashboardContent() {
  const { data: clinicsData } = useList({ resource: 'clinics' })
  const { data: treatmentsData } = useList({ resource: 'treatments' })
  const { data: treatmentsByClinicData } = useList({ resource: 'treatmentsByClinic' })

  const stats = [
    {
      title: 'Clinics',
      value: clinicsData?.total ?? 0,
      icon: Building2,
      description: 'Total registered clinics',
    },
    {
      title: 'Treatments',
      value: treatmentsData?.total ?? 0,
      icon: Syringe,
      description: 'Available treatments',
    },
    {
      title: 'Clinic Treatments',
      value: treatmentsByClinicData?.total ?? 0,
      icon: Link2,
      description: 'Treatment-clinic assignments',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Acme CRM Backoffice</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
