import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
const protectedRoutes = ["/dashboard", '/dashboard/manage-users/all-user'];
const publicRoutes = ["/auth/login", "/signup", "/"];
export default async function middleware(req: any) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret });

  const isAuthenticated = !!token;

  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith('/dashboard');

  const isPublicRoute = publicRoutes.includes(path);
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
  if (
    isPublicRoute &&
    isAuthenticated &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
