import Link from "next/link";
export function RelatedLinks({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
      <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">{title}</div>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 text-sm hover:bg-black/40">
            <span className="font-mono text-cyber-green">SAFE</span> <span className="text-cyber-muted">→</span> {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
