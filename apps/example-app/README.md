# SlashID + Next.js example

A minimal monorepo app that shows how to use SlashID with cookie storage so both the browser and the server can validate the session.

## Setup

1. Install deps from the monorepo root:
   ```bash
   pnpm install
   pnpm --filter slashid-example dev
   ```
2. Configure environment:
   - `NEXT_PUBLIC_SLASHID_ORG_ID` – required.
3. Open http://localhost:3000.

## What it demonstrates

- `SlashIDProvider` uses `tokenStorage="cookie"` so tokens are not placed in `localStorage`.
- Server components and API routes read and validate the cookie with `@slashid/slashid` SSR helpers.
- Client components use `useSlashID` to render UI state and call `logOut`.
- A protected page redirects to `/login` when no valid SlashID cookie is present.

Use this as a starting point for cookie-based auth when you need backend/SSR access to the SlashID token.
