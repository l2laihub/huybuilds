/** True when the request host is the studio subdomain (prod or local dev). */
export function isStudioHost(host: string | null): boolean {
  if (!host) return false;
  const name = host.split(":")[0].toLowerCase();
  return name === "studio.huybuilds.app" || name === "studio.localhost";
}
