"use client";

import { Form, Slot } from "@slashid/react";
import type { User } from "@slashid/slashid";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/protected";

  const handleSuccess = (_user: User) => {
    // SlashID stores the token in a cookie for us. Redirect once the SDK resolves.
    const target = redirectTo.startsWith("/") ? redirectTo : "/protected";
    router.replace(target);
  };

  return (
    <main className="page">
      <div className="panel stack" style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="pill">Sign in</div>
        <h1>SlashID login</h1>
        <p className="muted">
          Authentication tokens are stored in a cookie (not localStorage) so server-rendered routes and API endpoints
          can read them. Use any email address that is allowed for your SlashID org.
        </p>

        <Form
          factors={[{ method: "email_link" }]}
          onSuccess={handleSuccess}
          text={{
            "initial.title": "Welcome back",
            "initial.subtitle": "Passwordless email login powered by SlashID",
          }}
        >
          <Slot name="initial">
            <Form.Initial.Header />
            <Form.Initial.Controls />
          </Slot>
          <Slot name="footer">
            <div className="muted">You will be redirected to {redirectTo || "/"} after the token is issued.</div>
          </Slot>
        </Form>

        <div className="stack" style={{ flexDirection: "row", gap: 12 }}>
          <Link className="pill" href="/">
            Back home
          </Link>
          <Link className="pill" href="/protected">
            Protected page
          </Link>
        </div>
      </div>
    </main>
  );
}
