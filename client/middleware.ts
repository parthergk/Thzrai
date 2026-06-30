import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname, origin } = request.nextUrl;

  const GUEST_PAGES = ["/sign-in", "/sign-up", "/verifiyUser"];
  const PROTECTED_PAGES = ["/saved-thumbnails"];

  const isGuestPage = GUEST_PAGES.some((route) => pathname.startsWith(route));
  const isProtectedPage = PROTECTED_PAGES.some((route) => pathname.startsWith(route));

  if (token && isGuestPage) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  if (!token && isProtectedPage) {
    return NextResponse.redirect(`${origin}/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/verifiyUser",
    "/saved-thumbnails/:path*",
    "/dashboard/:path*",
    "/analyze/:path*"
  ],
};