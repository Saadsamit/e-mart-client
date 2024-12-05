import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/authService/authApi";
import { userRole } from "./const/user";

const AuthRoutes = ["/login", "/signup"];

type Roles = keyof typeof userRole;

const commonRoutes = ["/dashboard"];

const roleBasedRoutes = {
  ADMIN: [
    ...commonRoutes,
    "/dashboard/manage-users",
  ],
  VENDOR: [
    ...commonRoutes,
    "/dashboard/posts",
  ],
  CUSTOMER: [
    ...commonRoutes,
    "/dashboard/posts",
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();
  
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Roles]) {
    const routes = roleBasedRoutes[user?.role as Roles];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:page*",
    "/login",
    "/signup",
  ],
};