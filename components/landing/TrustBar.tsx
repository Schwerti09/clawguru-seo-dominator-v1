function Icon({ children }: { children: React.ReactNode }) {
  return <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyber-border bg-black/30">{children}</div>;
}
export function TrustBar() {
  return (
    <section className="relative mx-auto mt-10 w-full max-w-6xl">
      <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Operational Intelligence</div>
            <div className="mt-1 text-lg font-semibold text-cyber-ink">
              used by <span className="text-cyber-green">1,200+</span> Nodes
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            <div className="flex items-center gap-3">
              <Icon><span className="font-mono text-cyber-green">E</span></Icon>
              <div><div className="text-sm font-semibold text-cyber-ink">Encrypted Analysis</div><div className="text-xs text-cyber-muted">Transport-level protection</div></div>
            </div>
            <div className="flex items-center gap-3">
              <Icon><span className="font-mono text-cyber-green">NL</span></Icon>
              <div><div className="text-sm font-semibold text-cyber-ink">No-Log Policy</div><div className="text-xs text-cyber-muted">No storage of sensitive payloads</div></div>
            </div>
            <div className="flex items-center gap-3">
              <Icon><span className="font-mono text-cyber-green">✓</span></Icon>
              <div><div className="text-sm font-semibold text-cyber-ink">Community Verified</div><div className="text-xs text-cyber-muted">Patterns reviewed in the wild</div></div>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-cyber-border pt-4 text-xs text-cyber-muted">
          Tip: lock your control plane behind a VPN + allowlist. Most “RCE” incidents start with exposure.
        </div>
      </div>
    </section>
  );
}
