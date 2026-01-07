import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { getTokenFromCookies } from "@/lib/auth";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
    title: "Test App - Acme CRM",
    description: "Test application for Acme CRM with SlashID authentication",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    const initialToken = await getTokenFromCookies();

    return (
        <html lang="en">
            <body className="min-h-screen font-sans antialiased">
                <Providers initialToken={initialToken}>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
