import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/auth";

export function middleware(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/metrics", "/api/users/:path*"],
};
