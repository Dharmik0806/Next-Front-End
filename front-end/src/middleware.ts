import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public authentication routes (only accessible to non-authenticated visitors)
const PUBLIC_AUTH_ROUTES = ["/login", "/register"];

// Protected route prefixes (require authentication)
const PRIVATE_ROUTE_PREFIXES = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const isAuthenticated = Boolean(token && token.trim().length > 0);

  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isPrivateRoute = PRIVATE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  // 1. Root ("/") routing
  if (pathname === "/") {
    const target = isAuthenticated ? "/dashboard" : "/login";
    return NextResponse.redirect(new URL(target, request.url));
  }

  // 2. Unauthenticated user attempting to access private route -> redirect to /login
  if (!isAuthenticated && isPrivateRoute) {
    const loginUrl = new URL("/login", request.url);
    const redirectPath = `${pathname}${search}`;
    loginUrl.searchParams.set("redirect", redirectPath);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Authenticated user attempting to access public auth routes (/login, /register) -> redirect to /dashboard
  if (isAuthenticated && isPublicAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - images and asset file extensions (.svg, .png, .jpg, .jpeg, .gif, .webp, .ico)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
