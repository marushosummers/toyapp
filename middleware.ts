import { NextResponse } from "next/server";

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

const DOMAIN = process.env.VERCEL === "1" ? process.env.HOST : "localhost:3000";
export default function middleware(req: {
  nextUrl: { pathname: any; search: string; origin: string };
  headers: { get: (arg0: string) => string };
}) {
  const { pathname, origin, search } = req.nextUrl;
  const hostname: string = req.headers.get("host");
  const subdomain = hostname.replace(`.${DOMAIN}`, "");

  if (pathname.startsWith(`/_sub`)) {
    return new Response(null, { status: 404 });
  }
  if (hostname === DOMAIN) {
    // 本体サイトへ
    return NextResponse.rewrite(`${origin}${pathname}${search}`);
  }

  console.log(`${origin}/_sub/${subdomain}${pathname}${search}`);
  // サブドメインサイトへ
  return NextResponse.rewrite(
    `${origin}/_sub/${subdomain}${pathname}${search}`,
  );
}
