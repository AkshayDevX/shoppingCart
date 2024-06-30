import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from './lib/auth';

// Admin middleware function
async function adminMiddleware(req: NextRequest) {
  const token = req.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  const user = await getUserFromToken(token.value);

  if (token && user.role === "admin") {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

// Login page middleware function
async function loginPageMiddleware(req: NextRequest) {
  const token = req.cookies.get('token');
  if (token) {
    const user = await getUserFromToken(token.value);
    if (user && user.role === "admin") {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    } else {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  return NextResponse.next();
}

// Main middleware function
export async function middleware(req: NextRequest) {
  //admin middleware
  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    return adminMiddleware(req);
  }

  // login page middleware
  if (req.nextUrl.pathname === '/admin') {
    return loginPageMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashborad/:path*', '/admin'],
}