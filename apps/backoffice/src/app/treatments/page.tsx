import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { TreatmentsListContent } from './list-content'

export default function TreatmentsPage() {
	return (
		<AuthenticatedLayout>
			<TreatmentsListContent />
		</AuthenticatedLayout>
	)
}
