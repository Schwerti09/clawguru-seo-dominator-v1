import Link from "next/link";
import { titleCase } from "@/lib/pseo";
export const revalidate = 3600;

export default function Page() {
  const items: string[] = ["aws", "gcp", "azure", "hetzner", "digitalocean", "ovh", "linode", "vultr", "cloudflare", "oracle", "scaleway", "ionos"];
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Hub</div>
      <h1 className="mt-2 text-3xl font-semibold">Provider Index</h1>
      <p className="mt-2 text-cyber-muted max-w-3xl">Cluster pages designed for crawl depth and internal linking.</p>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {items.map((x) => (
          <Link
            key={x}
            href={"/provider/" + x}
            className="rounded-xl border border-cyber-border bg-cyber-panel/55 px-4 py-3 hover:bg-black/30"
          >
            <span className="font-mono text-cyber-green">HUB</span> <span className="text-cyber-muted">→</span> {titleCase(x)}
          </Link>
        ))}
      </div>
    </main>
  );
}
