"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@slashid/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

    const handleSuccess = () => {
        const target = redirectTo.startsWith("/") ? redirectTo : "/";
        router.replace(target);
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30 p-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle>Acme Backoffice</CardTitle>
                    <CardDescription>Internal administration panel. Sign in with your SlashID account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form
                        factors={[{ method: "email_link" }]}
                        onSuccess={handleSuccess}
                        text={{
                            "initial.title": "Admin Sign In",
                            "initial.subtitle": "Use your company email",
                        }}
                    />
                </CardContent>
            </Card>
        </main>
    );
}
