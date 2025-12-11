import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isLoggedIn = !!(accessToken || refreshToken);

  if (isLoggedIn && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isPublicPath =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/" ||
    pathname === "/list" ||
    pathname === "/error" ||
    pathname.startsWith("/api");

  if (!isLoggedIn && !isPublicPath) {
    const url = new URL("/sign-in", request.url);

    console.log("Why?", pathname, isPublicPath);

    url.searchParams.set("error", "session_expired");
    url.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
