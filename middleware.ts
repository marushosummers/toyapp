import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get("host") || "localhost:3000";
  const path = url.pathname;
  const query = url.search;

  const sub =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.toyapp.vercel.app`, "").replace(`.toyapp.dev`, "")
      : hostname.replace(`.localhost:3000`, "");

  if (sub === "emoji") {
    return NextResponse.rewrite(
      new URL(`/_sub/${sub}${path}${query}`, req.url),
    );
  }
  return NextResponse.rewrite(req.url);
}
