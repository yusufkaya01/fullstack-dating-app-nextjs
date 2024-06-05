import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./utils/constants";

export function middleware(req: NextRequest, res: NextResponse) {
  if (req.nextUrl.pathname === "/") {
    if (!req.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}
