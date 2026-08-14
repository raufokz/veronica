"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps the public site chrome (nav, footer, mobile dock) so it stays out of
 * the admin, which renders its own sidebar shell and needs no footer.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return <>{children}</>;
}
