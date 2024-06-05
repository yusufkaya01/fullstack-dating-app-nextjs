import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./utils/constants";

export function middleware(req: NextRequest, res: NextResponse) {
  if (req.nextUrl.pathname.startsWith("/members")) {
    if (!req.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/members", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
