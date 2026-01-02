import Link from "next/link";
import { redirect } from "next/navigation";
import { ClientAuthState } from "@/components/client-auth-state";
import { LogoutButton } from "@/components/logout-button";
import { ProfileFetcher } from "@/components/profile-fetcher";
import { getCookieName, getServerUser } from "@/lib/auth";

export default async function ProtectedPage() {
  const user = await getServerUser();

  if (!user) {
    redirect("/login?redirectTo=/protected");
  }

  const cookieName = getCookieName();

  return (
    <main className="page">
      <section className="panel stack">
        <div className="pill">Protected route</div>
        <h1>Server-only page</h1>
        <p className="muted">
          Access requires a valid SlashID token stored in the cookie. The server validated it before rendering this
          page.
        </p>
        <div className="stack">
          <div className="badge">User ID: {user.id}</div>
          <div className="muted">Groups: {user.groups.length ? user.groups.join(", ") : "none"}</div>
          <div className="muted">
            Cookie: <code>{cookieName}</code>
          </div>
          <div className="stack" style={{ flexDirection: "row", gap: 12 }}>
            <LogoutButton />
            <Link className="pill" href="/">
              Back home
            </Link>
          </div>
        </div>
      </section>

      <section className="grid">
        <div className="panel stack">
          <div className="pill">Client state</div>
          <ClientAuthState />
        </div>
        <div className="panel stack">
          <div className="pill">Server validation</div>
          <ProfileFetcher />
        </div>
      </section>
    </main>
  );
}
