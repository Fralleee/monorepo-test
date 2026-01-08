import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { PatientsListContent } from "./list-content";

export default function PatientsPage() {
    return (
        <AuthenticatedLayout>
            <PatientsListContent />
        </AuthenticatedLayout>
    );
}
