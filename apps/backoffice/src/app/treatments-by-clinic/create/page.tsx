import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { TreatmentByClinicCreateContent } from "./create-content";

export default function TreatmentByClinicCreatePage() {
    return (
        <AuthenticatedLayout>
            <TreatmentByClinicCreateContent />
        </AuthenticatedLayout>
    );
}
