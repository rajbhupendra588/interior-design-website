import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for protecting routes and handling auth
 * Note: Client-side auth validation happens in the dashboard component
 * since we can't access localStorage from server-side middleware.
 * 
 * This middleware can be extended in the future for:
 * - Server-side session validation
 * - Cookie-based authentication
 * - Rate limiting
 * - Request logging
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes - client-side auth check happens in components
  if (pathname.startsWith("/admin/dashboard")) {
    return NextResponse.next();
  }

  // API routes are protected individually in their handlers
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/api/:path*",
  ],
};

