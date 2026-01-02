import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { getTokenFromCookies } from "@/lib/auth";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SlashID + Next.js",
  description: "Minimal SSR + client auth example using SlashID with cookie-based sessions.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const initialToken = await getTokenFromCookies();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <Providers initialToken={initialToken}>{children}</Providers>
      </body>
    </html>
  );
}
