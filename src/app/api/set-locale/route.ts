import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { locale } = await request.json();
  const isChanged = request.headers.get("cookie")?.split("locale=")[1] !== locale;
  const res = NextResponse.json({ success: true, isChanged });
  if (!isChanged) return res;
  res.cookies.set("locale", locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
  return res;
}
