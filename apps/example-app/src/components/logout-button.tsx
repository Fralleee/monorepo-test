"use client";

import { useSlashID } from "@slashid/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LogoutButton() {
  const { logOut } = useSlashID();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleLogout = async () => {
    await logOut();
    startTransition(() => router.replace("/login"));
  };

  return (
    <button onClick={handleLogout} disabled={pending}>
      {pending ? "Signing out..." : "Sign out"}
    </button>
  );
}
