"use client";

import { useMemo } from "react";
import { useSlashID } from "@slashid/react";

export function ClientAuthState() {
  const { user, sdkState, isAuthenticated } = useSlashID();

  const cookieName = useMemo(() => {
    const orgId = process.env.NEXT_PUBLIC_SLASHID_ORG_ID;
    return orgId ? `@slashid/USER_TOKEN/${orgId}` : "@slashid/USER_TOKEN/<org-id>";
  }, []);

  const groups = useMemo(() => {
    if (!user) return [];
    try {
      return user.getGroups();
    } catch {
      return [];
    }
  }, [user]);

  return (
    <div className="stack">
      <div className="muted">
        Client SDK state: <code>{sdkState}</code>
      </div>
      <div className="muted">Authenticated on client: {isAuthenticated ? "yes" : "no"}</div>
      {user ? (
        <div className="stack">
          <div className="badge">User ID: {user.ID}</div>
          <div className="muted">Groups: {groups.length ? groups.join(", ") : "none"}</div>
          <div className="muted">
            Token stored in cookie: <code>{cookieName}</code>
          </div>
        </div>
      ) : (
        <div className="muted">No user loaded in the browser yet.</div>
      )}
    </div>
  );
}
