import { getRunbookCount, runbookSlugById } from "@/lib/pseo";
export const runtime = "nodejs";
const esc = (s:string)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
export async function GET(_: Request, { params }: { params: { chunk: string } }) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org").replace(/\/$/,"");
  const total = getRunbookCount();
  const chunkSize = 2000;
  const idx = Math.max(0, Math.floor(Number(params.chunk || "0")));
  const start = idx * chunkSize + 1;
  const end = Math.min(total, start + chunkSize - 1);

  const urls: string[] = [];
  for (let i=start; i<=end; i++) urls.push(`${base}/runbooks/${runbookSlugById(i)}`);

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${esc(u)}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  return new Response(body, { headers: { "Content-Type":"application/xml; charset=utf-8", "Cache-Control":"public, max-age=300" } });
}
