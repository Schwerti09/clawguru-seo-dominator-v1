export const runtime = "nodejs";
const esc = (s:string)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org").replace(/\/$/,"");
  const items: string[] = ["reverse-shell", "cmd-injection", "deserialization", "ssrf", "path-traversal", "lfi", "rfi", "priv-esc", "token-theft", "webhook-abuse", "config-drift", "open-ports"];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    items.map(x => `  <url><loc>${esc(base + "/vector/" + x)}</loc></url>`).join("\n") +
    `\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type":"application/xml; charset=utf-8", "Cache-Control":"public, max-age=600" } });
}
