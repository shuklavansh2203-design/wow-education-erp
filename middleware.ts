import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/lib/types';

/**
 * Authentication middleware
 * Validates JWT tokens for protected routes
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/auth/login',
    '/auth/register',
    '/public',
  ];

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get token from Authorization header
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  // Routes that require authentication
  if (pathname.startsWith('/api/') && !isPublicRoute) {
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Token required', statusCode: 401 },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'default-secret'
      ) as JWTPayload;

      // Store decoded token in request headers for use in API routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token', statusCode: 401 },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*', '/teacher/:path*', '/parent/:path*'],
};