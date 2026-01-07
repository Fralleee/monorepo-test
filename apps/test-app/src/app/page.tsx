import { ClinicsDisplay, TreatmentsDisplay } from "@/components/data-display";
import { LogoutButton } from "@/components/logout-button";
import { SessionInfo } from "@/components/session-info";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerUser } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
    const user = await getServerUser();

    return (
        <main className="container mx-auto max-w-4xl p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Test App</h1>
                <p className="text-muted-foreground">Acme CRM test application with SlashID authentication</p>
            </div>

            {!user ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome</CardTitle>
                        <CardDescription>Please sign in to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/login">Sign in with SlashID</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">Welcome back!</h2>
                            <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
                        </div>
                        <LogoutButton />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <SessionInfo />
                        <Card>
                            <CardHeader>
                                <CardTitle>Server Session</CardTitle>
                                <CardDescription>Verified on the server</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="text-sm">
                                    <span className="font-medium">Role:</span> {user.role}
                                </div>
                                <div className="text-sm">
                                    <span className="font-medium">Groups:</span>{" "}
                                    {user.groups.length > 0 ? user.groups.join(", ") : "None"}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <h2 className="text-xl font-semibold">Data from API</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <ClinicsDisplay />
                        <TreatmentsDisplay />
                    </div>
                </div>
            )}
        </main>
    );
}
