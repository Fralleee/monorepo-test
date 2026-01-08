import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { PatientEditContent } from "./edit-content";

export default function PatientEditPage() {
    return (
        <AuthenticatedLayout>
            <PatientEditContent />
        </AuthenticatedLayout>
    );
}
