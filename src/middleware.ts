import { NextResponse } from "next/server";
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/auth/login', '/signup', '/']
export default async function middleware(req: any) {
  const isAuthenticated = !!req.auth;
  console.log("isAuthenticated",isAuthenticated);
  
  const path = req.nextUrl.pathname
  console.log("🦓 middleware",path);
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  console.log(isProtectedRoute );
  console.log(isPublicRoute );

   // 5. Redirect to /login if the user is not authenticated
   if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    isAuthenticated &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 
  return NextResponse.next()
}
// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
