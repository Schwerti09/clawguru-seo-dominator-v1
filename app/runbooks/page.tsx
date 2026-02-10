import Link from "next/link";
import { getRunbookCount, runbookSlugById } from "@/lib/pseo";

export const revalidate = 3600;

export default function Runbooks() {
  const total = getRunbookCount();
  const preview = Array.from({ length: 80 }, (_, i) => runbookSlugById(i + 1));

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Programmatic SEO</div>
          <h1 className="mt-2 text-3xl font-semibold">Runbook Index</h1>
          <p className="mt-2 text-cyber-muted max-w-3xl">
            Catalog expands up to <span className="font-mono text-cyber-ink">{total}</span> runbooks (configurable via <span className="font-mono">PSEO_RUNBOOK_COUNT</span>). ISR renders on demand.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/sitemap.xml" className="rounded-xl border border-cyber-border bg-black/25 px-4 py-2 text-sm font-semibold hover:bg-black/40">Sitemap</Link>
          <Link href="/pricing" className="rounded-xl border border-cyber-green/35 bg-black/45 px-4 py-2 text-sm font-semibold text-cyber-green hover:bg-black/60">Unlock Kits</Link>
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {preview.map((slug) => (
          <Link key={slug} href={`/runbooks/${slug}`} className="rounded-xl border border-cyber-border bg-cyber-panel/55 px-4 py-3 hover:bg-black/30">
            <span className="font-mono text-cyber-green">RUNBOOK</span> <span className="text-cyber-muted">→</span> {slug}
          </Link>
        ))}
      </div>
    </main>
  );
}
