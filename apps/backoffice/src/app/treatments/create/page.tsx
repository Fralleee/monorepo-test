import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { TreatmentCreateContent } from './create-content'

export default function TreatmentCreatePage() {
  return (
    <AuthenticatedLayout>
      <TreatmentCreateContent />
    </AuthenticatedLayout>
  )
}
