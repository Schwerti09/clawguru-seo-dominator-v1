import Link from "next/link";
import { BackgroundGrid } from "@/components/landing/BackgroundGrid";
import { ThreatCounter } from "@/components/landing/ThreatCounter";
import { TrustBar } from "@/components/landing/TrustBar";
import { FooterDisclaimer } from "@/components/landing/FooterDisclaimer";
import { TOPICS, PROVIDERS, VECTORS, STACKS, runbookSlugById, titleCase } from "@/lib/pseo";

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-cyber-border bg-black/35 px-3 py-1 text-xs text-cyber-muted">{children}</span>;
}

export default function Page() {
  const sampleIds = [11, 73, 141, 509, 777, 1024, 2048, 4096];
  const sampleRunbooks = sampleIds.map((id) => ({ id, slug: runbookSlugById(id) }));

  return (
    <main className="relative min-h-screen">
      <BackgroundGrid />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-cyber-border bg-black/40 shadow-glow grid place-items-center">
            <span className="font-mono text-cyber-green">CG</span>
          </div>
          <div>
            <div className="text-sm font-semibold">ClawGuru</div>
            <div className="text-xs text-cyber-muted">Institutional OpenClaw Security</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-cyber-muted">
          <Link className="hover:text-cyber-ink" href="/runbooks">Runbooks</Link>
          <Link className="hover:text-cyber-ink" href="/topics">Topics</Link>
          <Link className="hover:text-cyber-ink" href="/providers">Providers</Link>
          <Link className="hover:text-cyber-ink" href="/tools">Live Audit</Link>
        </nav>
        <Link href="/pricing" className="rounded-xl border border-cyber-green/30 bg-black/40 px-4 py-2 text-sm font-semibold text-cyber-green hover:bg-black/55">
          Get Hardening Kit
        </Link>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-14 pt-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill><span className="h-2 w-2 rounded-full bg-cyber-red shadow-danger mr-2" />CRITICAL</Pill>
              <Pill><span className="font-mono text-cyber-green mr-2">SAFE</span>Baseline hardening patterns</Pill>
              <Pill><span className="font-mono text-cyber-green mr-2">ISR</span>SEO scale without build pain</Pill>
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Is Your OpenClaw Instance Exposed? <span className="text-cyber-green">Run a Live Security Audit</span> in 30 Seconds.
            </h1>

            <p className="mt-5 text-lg text-cyber-muted">
              Don&apos;t let RCE vulnerabilities compromise your server. Get institutional-grade protection patterns, runbooks, and hardened defaults.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/tools" className="rounded-xl border border-cyber-green/35 bg-black/45 px-5 py-3 text-center font-semibold text-cyber-green hover:bg-black/60">
                Run Live Audit
              </Link>
              <Link href="/pricing" className="rounded-xl border border-cyber-border bg-black/25 px-5 py-3 text-center font-semibold text-cyber-ink hover:bg-black/40">
                Download Hardening Kit
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
              <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">What ClawGuru does</div>
              <div className="mt-3 grid gap-3 text-sm text-cyber-muted">
                <div><span className="font-mono text-cyber-green">SAFE</span> Exposure mapping: ports, reachability, risky defaults.</div>
                <div><span className="font-mono text-cyber-red">CRITICAL</span> RCE guardrails: sandboxing, egress controls, secrets isolation.</div>
                <div><span className="font-mono text-cyber-green">SAFE</span> Institutional runbooks: step-by-step remediation you can hand to ops.</div>
              </div>
            </div>

            <div className="mt-5 font-mono text-xs text-cyber-muted">
              $ audit: <span className="text-cyber-green">clawguru</span> scan --target <span className="text-cyber-ink">your-node</span> --profile <span className="text-cyber-ink">rce</span>
            </div>
          </div>

          <div className="space-y-4">
            <ThreatCounter />
            <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
              <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Live Risk Snapshot</div>
              <div className="mt-3 grid gap-3">
                {[
                  { label: "Control plane exposure", state: "CRITICAL", color: "text-cyber-red" },
                  { label: "Agent sandboxing", state: "WARNING", color: "text-cyber-muted" },
                  { label: "Egress restrictions", state: "SAFE", color: "text-cyber-green" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between rounded-xl border border-cyber-border bg-black/25 px-4 py-3">
                    <div className="text-sm text-cyber-muted">{r.label}</div>
                    <div className={`font-mono text-sm font-semibold ${r.color}`}>{r.state}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-cyber-muted">Dashboard view is a visualization. Use Live Audit for your actual report.</div>
            </div>
          </div>
        </div>

        <TrustBar />
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Monster SEO</div>
            <h2 className="mt-2 text-2xl font-semibold">Crawlable cluster network</h2>
            <p className="mt-2 text-sm text-cyber-muted max-w-3xl">
              Topic hubs, provider baselines, vector guides, stack playbooks, and 10k+ runbooks (configurable). Everything interlinks.
            </p>
          </div>
          <Link href="/runbooks" className="rounded-xl border border-cyber-border bg-black/25 px-4 py-2 text-sm font-semibold hover:bg-black/40">Explore Runbooks</Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
            <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Topics</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <Link key={t} href={`/topic/${t}`} className="rounded-full border border-cyber-border bg-black/25 px-3 py-2 text-xs hover:bg-black/40">{titleCase(t)}</Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
            <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Providers</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {PROVIDERS.map((p) => (
                <Link key={p} href={`/provider/${p}`} className="rounded-full border border-cyber-border bg-black/25 px-3 py-2 text-xs hover:bg-black/40">{titleCase(p)}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
            <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Vectors</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {VECTORS.map((v) => (
                <Link key={v} href={`/vector/${v}`} className="rounded-full border border-cyber-border bg-black/25 px-3 py-2 text-xs hover:bg-black/40">{titleCase(v)}</Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
            <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Stacks</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {STACKS.map((s) => (
                <Link key={s} href={`/stack/${s}`} className="rounded-full border border-cyber-border bg-black/25 px-3 py-2 text-xs hover:bg-black/40">{titleCase(s)}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Sample runbooks</div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {sampleRunbooks.map((rb) => (
              <Link key={rb.slug} href={`/runbooks/${rb.slug}`} className="rounded-xl border border-cyber-border bg-black/25 px-4 py-3 text-sm hover:bg-black/40">
                <span className="font-mono text-cyber-green">RUNBOOK</span> <span className="text-cyber-muted">→</span> {rb.slug}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterDisclaimer />
    </main>
  );
}
