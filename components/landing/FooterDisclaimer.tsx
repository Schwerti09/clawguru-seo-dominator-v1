export function FooterDisclaimer() {
  return (
    <footer className="mt-16 border-t border-cyber-border bg-black/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-sm font-semibold text-cyber-ink">ClawGuru</div>
            <div className="mt-2 text-sm text-cyber-muted max-w-xl">
              Independent security resource for OpenClaw operators. Hardening patterns against common RCE/misconfiguration vectors.
            </div>
          </div>
          <div className="text-sm text-cyber-muted max-w-xl">
            <div className="font-semibold text-cyber-ink">Disclaimer</div>
            <p className="mt-2">
              ClawGuru is an independent security resource and not affiliated with the OpenClaw core team. Tools and templates are provided “as is” without warranties.
            </p>
            <p className="mt-2">
              Affiliate links may generate commissions at no extra cost to you.
            </p>
          </div>
        </div>
        <div className="mt-8 text-xs text-cyber-muted">© {new Date().getFullYear()} ClawGuru.</div>
      </div>
    </footer>
  );
}
