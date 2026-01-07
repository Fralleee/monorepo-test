import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { DashboardContent } from "./dashboard-content";

export default function DashboardPage() {
    return (
        <AuthenticatedLayout>
            <DashboardContent />
        </AuthenticatedLayout>
    );
}
