import Link from "next/link";
import { ClientAuthState } from "@/components/client-auth-state";
import { LogoutButton } from "@/components/logout-button";
import { ProfileFetcher } from "@/components/profile-fetcher";
import { getCookieName, getServerUser } from "@/lib/auth";

export default async function HomePage() {
  const serverUser = await getServerUser();
  const cookieName = getCookieName();

  return (
    <main className="page">
      <section className="panel stack">
        <div className="pill">SlashID + Next.js</div>
        <h1>Cookie-based auth ready for SSR</h1>
        <p className="muted">
          This example keeps the SlashID session in a cookie instead of localStorage so the backend can validate every
          request. Use it as a starting point for server-rendered pages and API routes that need authenticated users.
        </p>
        <div className="grid">
          <div className="stack">
            <div className="muted">Server session snapshot</div>
            {serverUser ? (
              <div className="stack">
                <div className="badge">User ID: {serverUser.id}</div>
                <div className="muted">Groups: {serverUser.groups.length ? serverUser.groups.join(", ") : "none"}</div>
                <div className="muted">
                  Cookie: <code>{cookieName}</code>
                </div>
                <LogoutButton />
              </div>
            ) : (
              <div className="stack">
                <div className="muted">No valid session found on the server.</div>
                <div className="stack" style={{ flexDirection: "row", gap: 12 }}>
                  <Link className="pill" href="/login">
                    Go to login
                  </Link>
                  <Link className="pill" href="/protected">
                    View protected page
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="stack">
            <div className="muted">What this template shows</div>
            <ul className="list">
              <li>SlashIDProvider uses <code>tokenStorage="cookie"</code>, so tokens are HTTP cookies, not localStorage.</li>
              <li>Server components and API routes validate the cookie with <code>@slashid/slashid</code> SSR helpers.</li>
              <li>Client components still use <code>useSlashID</code> for UI/UX checks.</li>
              <li>A protected route redirects to login if the cookie is missing or invalid.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid">
        <div className="panel stack">
          <div className="pill">Client state</div>
          <ClientAuthState />
        </div>
        <div className="panel stack">
          <div className="pill">Server check</div>
          <ProfileFetcher />
        </div>
      </section>
    </main>
  );
}
