export function getOrigin(req?: Request): string {
  const forced = process.env.NEXT_PUBLIC_SITE_URL;
  if (forced && forced.startsWith("http")) return forced.replace(/\/$/, "");
  if (!req) return "http://localhost:3000";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`.replace(/\/$/, "");
}
