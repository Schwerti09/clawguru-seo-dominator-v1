import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Schema } from "@/components/seo/Schema";
import { runbookSlugById, titleCase, TOPICS, PROVIDERS, VECTORS, STACKS } from "@/lib/pseo";

export const revalidate = 3600;

const KIND = "provider" as const;
const LIST = PROVIDERS;

function pickRunbooks(seed: number) {
  const ids: number[] = [];
  for (let i = 0; i < 50; i++) ids.push(Math.abs((seed * 97 + i * 131) % 10000) + 1);
  return ids;
}

export default function HubPage({ params }: { params: { slug: string } }) {
  if (!LIST.includes(params.slug)) return notFound();

  const seed = LIST.indexOf(params.slug) + 1;
  const title = `${titleCase(params.slug)} ${KIND === "topic" ? "Hardening" : "Baseline"} — OpenClaw Security Hub`;

  const crumbs = [
    { href: "/", label: "Dashboard" },
    { href: `/${KIND}s`, label: titleCase(KIND) + "s" },
    { href: `/${KIND}/${params.slug}`, label: titleCase(params.slug) },
  ];

  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org").replace(/\/$/, "");
  const url = `${base}/${KIND}/${params.slug}`;

  const schema = { "@context":"https://schema.org", "@type":"CollectionPage", name: title, url };

  const runbooks = pickRunbooks(seed).map((id) => runbookSlugById(id));

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Schema json={schema} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-4 rounded-2xl border border-cyber-border bg-cyber-panel/55 p-6">
        <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Hub</div>
        <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
        <p className="mt-3 text-cyber-muted max-w-3xl">
          This hub clusters relevant runbooks and links to adjacent hubs for strong internal linking and crawl depth.
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <Link href="/pricing" className="rounded-full border border-cyber-green/35 bg-black/45 px-4 py-2 font-semibold text-cyber-green hover:bg-black/60">Get Pro Kits</Link>
          <Link href="/tools" className="rounded-full border border-cyber-border bg-black/25 px-4 py-2 font-semibold hover:bg-black/40">Run Live Audit</Link>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {runbooks.map((slug) => (
            <Link key={slug} href={`/runbooks/${slug}`} className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 hover:bg-black/40">
              <span className="font-mono text-cyber-green">RUNBOOK</span> <span className="text-cyber-muted">→</span> {slug}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <Link href="/topics" className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 hover:bg-black/40">Browse Topics</Link>
          <Link href="/providers" className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 hover:bg-black/40">Browse Providers</Link>
          <Link href="/vectors" className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 hover:bg-black/40">Browse Vectors</Link>
          <Link href="/stacks" className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 hover:bg-black/40">Browse Stacks</Link>
        </div>
      </div>
    </main>
  );
}
