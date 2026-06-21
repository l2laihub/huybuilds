import { NextResponse, type NextRequest } from "next/server";
import { isStudioHost } from "@/app/studio/lib/host";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const studio = isStudioHost(host);

  // Browsers hard-request /favicon.ico, which bypasses the page rewrite below.
  // Serve each brand its own mark so the studio subdomain isn't stuck with the
  // root site's favicon (and vice versa).
  if (request.nextUrl.pathname === "/favicon.ico") {
    const url = request.nextUrl.clone();
    url.pathname = studio ? "/studio/brand/favicon-64.png" : "/logo.svg";
    return NextResponse.rewrite(url);
  }

  if (!studio) return NextResponse.next();

  const url = request.nextUrl.clone();
  // Already under /studio (e.g. assets/anchors) — leave it.
  if (url.pathname === "/studio" || url.pathname.startsWith("/studio/")) {
    return NextResponse.next();
  }
  url.pathname = `/studio${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, and files with an extension (assets) —
  // but include /favicon.ico so we can route it per host above.
  matcher: ["/((?!_next/|api/|.*\\..*).*)", "/favicon.ico"],
};
