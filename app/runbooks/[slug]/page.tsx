import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Schema } from "@/components/seo/Schema";
import { buildRunbookContent, parseRunbookSlug, relatedRunbookIds, runbookSlugById, titleCase } from "@/lib/pseo";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Array.from({ length: 200 }, (_, i) => ({ slug: runbookSlugById(i + 1) }));
}

export default function RunbookPage({ params }: { params: { slug: string } }) {
  const meta = parseRunbookSlug(params.slug);
  if (!meta) return notFound();

  const content = buildRunbookContent(meta);

  const crumbs = [
    { href: "/", label: "Dashboard" },
    { href: "/runbooks", label: "Runbooks" },
    { href: `/topic/${meta.topic}`, label: content.topicT },
    { href: `/provider/${meta.provider}`, label: content.providerT },
    { href: `/vector/${meta.vector}`, label: content.vectorT },
  ];

  const related = relatedRunbookIds(meta.id).map((id) => {
    const slug = runbookSlugById(id + 1);
    return { href: `/runbooks/${slug}`, label: slug };
  });

  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org").replace(/\/$/, "");
  const url = `${base}/runbooks/${params.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.keyword,
    dateModified: content.updated,
    mainEntityOfPage: url,
    author: { "@type":"Organization", name:"ClawGuru" },
    publisher: { "@type":"Organization", name:"ClawGuru" },
  };

  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    mainEntity: [
      { "@type":"Question", name:`How do I reduce ${content.vectorT} risk in OpenClaw?`, acceptedAnswer: { "@type":"Answer", text:"Remove public exposure of control plane, lock egress, harden runtime permissions, rotate scoped secrets." } },
      { "@type":"Question", name:`Do I need provider-specific hardening for ${content.providerT}?`, acceptedAnswer: { "@type":"Answer", text:"Use portable baseline controls, then map them to provider primitives (firewalls, private networking, IAM) for consistent enforcement." } }
    ]
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Schema json={schema} />
      <Schema json={faqSchema} />

      <Breadcrumbs items={crumbs} />

      <div className="mt-4 rounded-2xl border border-cyber-border bg-cyber-panel/55 p-6">
        <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Runbook</div>
        <h1 className="mt-2 text-3xl font-semibold">{content.keyword}</h1>

        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-cyber-border bg-black/25 px-3 py-1 text-cyber-muted">Topic: <span className="text-cyber-ink">{content.topicT}</span></span>
          <span className="rounded-full border border-cyber-border bg-black/25 px-3 py-1 text-cyber-muted">Provider: <span className="text-cyber-ink">{content.providerT}</span></span>
          <span className="rounded-full border border-cyber-border bg-black/25 px-3 py-1 text-cyber-muted">Vector: <span className="text-cyber-ink">{content.vectorT}</span></span>
          <span className="rounded-full border border-cyber-border bg-black/25 px-3 py-1 text-cyber-muted">Stack: <span className="text-cyber-ink">{content.stackT}</span></span>
          <span className="rounded-full border border-cyber-border bg-black/25 px-3 py-1 text-cyber-muted">Updated: <span className="font-mono text-cyber-ink">{content.updated}</span></span>
        </div>

        <div className="mt-6 space-y-6">
          {content.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-semibold">{s.h}</h2>
              <ul className="mt-2 list-disc pl-5 text-cyber-muted space-y-1">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-cyber-green/25 bg-black/35 p-5">
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Hardening Kit</div>
          <div className="mt-2 text-lg font-semibold text-cyber-ink">Turn this runbook into rollout.</div>
          <p className="mt-2 text-sm text-cyber-muted">Pro Kits include hardened templates, provider baselines, and operational checklists.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link href="/pricing" className="rounded-xl border border-cyber-green/35 bg-black/45 px-5 py-3 text-center font-semibold text-cyber-green hover:bg-black/60">
              Download Hardening Kit
            </Link>
            <Link href="/tools" className="rounded-xl border border-cyber-border bg-black/25 px-5 py-3 text-center font-semibold hover:bg-black/40">
              Run Live Audit
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <RelatedLinks title="Related runbooks" links={related} />
        <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Hubs</div>
          <div className="mt-3 grid gap-2">
            <Link className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 hover:bg-black/40" href={`/topic/${meta.topic}`}>Topic Hub → {titleCase(meta.topic)}</Link>
            <Link className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 hover:bg-black/40" href={`/provider/${meta.provider}`}>Provider Hub → {titleCase(meta.provider)}</Link>
            <Link className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 hover:bg-black/40" href={`/vector/${meta.vector}`}>Vector Hub → {titleCase(meta.vector)}</Link>
            <Link className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 hover:bg-black/40" href={`/stack/${meta.stack}`}>Stack Hub → {titleCase(meta.stack)}</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
