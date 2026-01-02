import { NextResponse } from "next/server";
import { getCookieName, getServerUser } from "@/lib/auth";

export async function GET() {
  const user = await getServerUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const preview =
    user.token.length > 18
      ? `${user.token.slice(0, 12)}...${user.token.slice(-6)}`
      : user.token;

  return NextResponse.json({
    id: user.id,
    groups: user.groups,
    cookieName: getCookieName(),
    tokenPreview: preview,
  });
}
