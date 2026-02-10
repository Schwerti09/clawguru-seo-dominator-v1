import { getRunbookCount } from "@/lib/pseo";
export const runtime = "nodejs";
const esc = (s:string)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org").replace(/\/$/,"");
  const total = getRunbookCount();
  const chunkSize = 2000;
  const chunks = Math.ceil(total / chunkSize);

  const urls: string[] = [
    `${base}/sitemaps/core.xml`,
    `${base}/sitemaps/topics.xml`,
    `${base}/sitemaps/providers.xml`,
    `${base}/sitemaps/vectors.xml`,
    `${base}/sitemaps/stacks.xml`,
  ];
  for (let i=0;i<chunks;i++) urls.push(`${base}/sitemaps/runbooks-${i}.xml`);

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <sitemap><loc>${esc(u)}</loc></sitemap>`).join("\n") +
    `\n</sitemapindex>\n`;

  return new Response(body, { headers: { "Content-Type":"application/xml; charset=utf-8", "Cache-Control":"public, max-age=300" } });
}
