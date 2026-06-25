/** True when the request host is the studio subdomain (prod or local dev). */
export function isStudioHost(host: string | null): boolean {
  if (!host) return false;
  const name = host.split(":")[0].toLowerCase();
  return name === "studio.huybuilds.app" || name === "studio.localhost";
}

/**
 * Resolve an in-site studio link relative to the current pathname.
 *
 * On the studio subdomain the app is served at the root, so links are bare
 * ("/privacy"). When viewed under the /studio path prefix (e.g.
 * localhost:3000/studio, where middleware does not rewrite) the prefix must be
 * preserved or the link 404s. `sub` is "" for the home page, or a "/path".
 */
export function studioHref(currentPath: string | null, sub: string): string {
  const path = currentPath ?? "";
  const underPrefix = path === "/studio" || path.startsWith("/studio/");
  return (underPrefix ? "/studio" : "") + sub || "/";
}
