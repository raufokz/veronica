import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // @supabase/ssr pulls in Node APIs, so the Edge runtime can't bundle it.
  runtime: "nodejs",
  matcher: ["/admin/:path*"],
};
