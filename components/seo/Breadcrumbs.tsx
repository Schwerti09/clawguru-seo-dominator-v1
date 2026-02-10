import Link from "next/link";
export type Crumb = { href: string; label: string };
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-cyber-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, idx) => (
          <li key={c.href} className="flex items-center gap-2">
            {idx > 0 ? <span className="text-cyber-muted/60">/</span> : null}
            <Link href={c.href} className="hover:text-cyber-ink">{c.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
