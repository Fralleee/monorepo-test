import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { ClinicsListContent } from './list-content'

export default function ClinicsPage() {
	return (
		<AuthenticatedLayout>
			<ClinicsListContent />
		</AuthenticatedLayout>
	)
}
