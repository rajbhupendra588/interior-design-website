import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

/**
 * Middleware for internationalization and route protection
 * 
 * Handles:
 * - Locale detection and routing
 * - Admin route protection (client-side auth check in components)
 * - API route handling
 * 
 * This middleware can be extended in the future for:
 * - Server-side session validation
 * - Cookie-based authentication
 * - Rate limiting
 * - Request logging
 */

// Create the i18n middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Only add locale prefix when not using default locale
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip locale handling for API routes, static files, and admin routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Apply i18n middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes (/api)
    // - Next.js internals (/_next)
    // - Static files (e.g. /favicon.ico)
    '/((?!api|_next|.*\\..*).*)',
  ],
};

