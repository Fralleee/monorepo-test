import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { TreatmentsByClinicListContent } from './list-content'

export default function TreatmentsByClinicPage() {
	return (
		<AuthenticatedLayout>
			<TreatmentsByClinicListContent />
		</AuthenticatedLayout>
	)
}
