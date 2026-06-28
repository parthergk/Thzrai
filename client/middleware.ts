import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log("token in middleware", token);

  const { pathname, origin } = request.nextUrl;

  const GUEST_PAGES = ["/", "/login", "/register"];
  const PROTECTED_PAGES = ["/saved-thumbnails"];

  if (token && GUEST_PAGES.includes(pathname)) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  const isProtectedPath = PROTECTED_PAGES.some((route) =>
    pathname.startsWith(route)
  );
  console.log("is protected path", isProtectedPath);

  if (isProtectedPath && !token) {
    console.log("redirect to login");

    return NextResponse.redirect(`${origin}/sign-in?p=${pathname}`);
  }

  if (pathname.startsWith("/api/thumbnail") && request.method === "POST") {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized access. Please log in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/api/thumbnail", "/saved-thumbnails/:path*"],
};