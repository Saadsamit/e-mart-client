// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { getCurrentUser } from "./services/authService/authApi";

// const AuthRoutes = ["/login", "/signup"];

// type Role = keyof typeof roleBasedRoutes;

// const commonRoutes = ["/news-feed", "/profile", "/dashboard"];

// const roleBasedRoutes = {
//   admin: [
//     ...commonRoutes,
//     "/dashboard/manage-users",
//     "/dashboard/manage-posts",
//     "/dashboard/payments",
//   ],
//   user: [
//     ...commonRoutes,
//     "/dashboard/posts",
//     "/dashboard/followers",
//     "/dashboard/following",
//   ],
// };

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const user = await getCurrentUser();

//   if (!user) {
//     if (AuthRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url)
//       );
//     }
//   }

//   if (user?.role && roleBasedRoutes[user?.role as Role]) {
//     const routes = roleBasedRoutes[user?.role as Role];

//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: [
//     "/dashboard",
//     "/profile",
//     "/news-feed/:page*",
//     "/news-feed",
//     "/dashboard/:page*",
//     "/login",
//     "/signup",
//   ],
// };

export const config = {
      matcher: [
        "/abc"
      ],
    };