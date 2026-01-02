'use client'

import { trpc } from '@/lib/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ClinicsDisplay() {
	const { data: clinics, isLoading, error } = trpc.clinic.list.useQuery()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Clinics</CardTitle>
				<CardDescription>Loaded via tRPC from API</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading && <p className="text-sm text-muted-foreground">Loading clinics...</p>}
				{error && <p className="text-sm text-destructive">Error: {error.message}</p>}
				{clinics && clinics.length === 0 && <p className="text-sm text-muted-foreground">No clinics found</p>}
				{clinics && clinics.length > 0 && (
					<ul className="space-y-2">
						{clinics.map((clinic) => (
							<li key={clinic.id} className="rounded border p-2 text-sm">
								<span className="font-medium">{clinic.name}</span>
								<span className="ml-2 text-muted-foreground">({clinic.code})</span>
							</li>
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	)
}

export function TreatmentsDisplay() {
	const { data: treatments, isLoading, error } = trpc.treatment.list.useQuery()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Treatments</CardTitle>
				<CardDescription>Loaded via tRPC from API</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading && <p className="text-sm text-muted-foreground">Loading treatments...</p>}
				{error && <p className="text-sm text-destructive">Error: {error.message}</p>}
				{treatments && treatments.length === 0 && <p className="text-sm text-muted-foreground">No treatments found</p>}
				{treatments && treatments.length > 0 && (
					<ul className="space-y-2">
						{treatments.map((treatment) => (
							<li key={treatment.id} className="rounded border p-2 text-sm">
								<span className="font-medium">{treatment.name}</span>
								<span className="ml-2 text-muted-foreground">${Number(treatment.price).toFixed(2)}</span>
								{treatment.description && <p className="mt-1 text-xs text-muted-foreground">{treatment.description}</p>}
							</li>
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	)
}
