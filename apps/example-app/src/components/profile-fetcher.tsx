"use client";

import { useEffect, useState } from "react";

type Profile =
  | { status: "idle" | "loading" }
  | { status: "error"; message: string }
  | { status: "success"; id: string; groups: string[]; cookieName: string; tokenPreview: string };

export function ProfileFetcher() {
  const [profile, setProfile] = useState<Profile>({ status: "idle" });

  const fetchProfile = async () => {
    setProfile({ status: "loading" });
    try {
      const response = await fetch("/api/profile", {
        credentials: "include",
      });

      if (!response.ok) {
        const message = response.status === 401 ? "Unauthenticated" : "Request failed";
        setProfile({ status: "error", message });
        return;
      }

      const data = await response.json();
      setProfile({
        status: "success",
        id: data.id,
        groups: data.groups ?? [],
        cookieName: data.cookieName,
        tokenPreview: data.tokenPreview,
      });
    } catch (error) {
      setProfile({ status: "error", message: error instanceof Error ? error.message : "Unknown error" });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="stack">
      <div className="muted">Server endpoint (/api/profile) validates the SlashID cookie on every request.</div>
      {profile.status === "loading" && <div className="muted">Checking session on the server...</div>}
      {profile.status === "error" && <div className="muted">Result: {profile.message}</div>}
      {profile.status === "success" && (
        <div className="stack">
          <div className="badge">User ID: {profile.id}</div>
          <div className="muted">Groups: {profile.groups.length ? profile.groups.join(", ") : "none"}</div>
          <div className="muted">
            Cookie: <code>{profile.cookieName}</code>
          </div>
          <div className="muted">
            Token preview (server-side): <code>{profile.tokenPreview}</code>
          </div>
        </div>
      )}
      <div>
        <button className="secondary" onClick={fetchProfile} disabled={profile.status === "loading"}>
          Refresh from server
        </button>
      </div>
    </div>
  );
}
