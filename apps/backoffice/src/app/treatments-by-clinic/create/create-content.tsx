'use client'

import { useCreate, useList } from '@refinedev/core'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Clinic = { id: string; name: string; code: string }
type Treatment = { id: string; name: string; price: string | number }

export function TreatmentByClinicCreateContent() {
	const router = useRouter()
	const { mutate: createAssignment, mutation } = useCreate()
	const isPending = mutation.isPending

	const { result: clinicsResult } = useList<Clinic>({ resource: 'clinics' })
	const { result: treatmentsResult } = useList<Treatment>({ resource: 'treatments' })
	const clinics = clinicsResult?.data
	const treatments = treatmentsResult?.data

	const [clinicId, setClinicId] = useState('')
	const [treatmentId, setTreatmentId] = useState('')
	const [priceOverride, setPriceOverride] = useState('')
	const [notes, setNotes] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		createAssignment(
			{
				resource: 'treatmentsByClinic',
				values: {
					clinicId,
					treatmentId,
					priceOverride: priceOverride ? Number.parseFloat(priceOverride) : undefined,
					notes: notes || undefined,
				},
			},
			{
				onSuccess: () => router.push('/treatments-by-clinic'),
			},
		)
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Assign Treatment to Clinic</h1>
				<p className="text-muted-foreground">Link a treatment to a specific clinic</p>
			</div>

			<Card className="max-w-lg">
				<CardHeader>
					<CardTitle>Assignment Details</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="clinic">Clinic</Label>
							<select
								id="clinic"
								value={clinicId}
								onChange={(e) => setClinicId(e.target.value)}
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								required
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
							<Label htmlFor="treatment">Treatment</Label>
							<select
								id="treatment"
								value={treatmentId}
								onChange={(e) => setTreatmentId(e.target.value)}
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								required
							>
								<option value="">Select a treatment</option>
								{treatments?.map((treatment) => (
									<option key={treatment.id} value={treatment.id}>
										{treatment.name} (${Number(treatment.price).toFixed(2)})
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="priceOverride">Price Override ($)</Label>
							<Input
								id="priceOverride"
								type="number"
								step="0.01"
								min="0"
								value={priceOverride}
								onChange={(e) => setPriceOverride(e.target.value)}
							/>
							<p className="text-xs text-muted-foreground">
								Optional: custom price for this clinic (overrides base price)
							</p>
						</div>
						<div className="space-y-2">
							<Label htmlFor="notes">Notes</Label>
							<Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
						</div>
						<div className="flex gap-2">
							<Button type="submit" disabled={isPending}>
								{isPending ? 'Creating...' : 'Create Assignment'}
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
