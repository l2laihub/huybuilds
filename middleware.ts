import { NextResponse, type NextRequest } from "next/server";
import { isStudioHost } from "@/app/studio/lib/host";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (!isStudioHost(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  // Already under /studio (e.g. assets/anchors) — leave it.
  if (url.pathname === "/studio" || url.pathname.startsWith("/studio/")) {
    return NextResponse.next();
  }
  url.pathname = `/studio${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, and files with an extension (assets).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
