"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useSlashID } from "@slashid/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type LogoutButtonProps = Pick<ButtonProps, "variant" | "size">;

export function LogoutButton({ variant = "outline", size }: LogoutButtonProps) {
    const { logOut } = useSlashID();
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const handleLogout = async () => {
        await logOut();
        startTransition(() => router.replace("/login"));
    };

    return (
        <Button onClick={handleLogout} disabled={pending} variant={variant} size={size}>
            {pending ? "Signing out..." : "Sign out"}
        </Button>
    );
}
