import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { ClinicCreateContent } from "./create-content";

export default function ClinicCreatePage() {
    return (
        <AuthenticatedLayout>
            <ClinicCreateContent />
        </AuthenticatedLayout>
    );
}
