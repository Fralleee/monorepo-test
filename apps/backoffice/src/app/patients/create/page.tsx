import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { PatientCreateContent } from "./create-content";

export default function PatientCreatePage() {
    return (
        <AuthenticatedLayout>
            <PatientCreateContent />
        </AuthenticatedLayout>
    );
}
