export const runtime = "nodejs";
export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org").replace(/\/$/,"");
  const body = `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type":"text/plain; charset=utf-8" } });
}
