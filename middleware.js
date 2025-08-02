import { NextResponse } from "next/server";

const protectedRoutes = [
  "/search",
  "/trending",
  "/create",
  "/messages",
  "/profile",
  "/notifications",
  "/settings",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      const loginUrl = new URL("/sign-in", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|sign-in|sign-up).*)*",
  ],
};
