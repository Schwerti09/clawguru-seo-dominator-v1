export const TOPICS = ["rce-hardening", "openclaw-security", "agent-sandboxing", "firewall-baselines", "zero-trust", "ssh-lockdown", "container-escape", "supply-chain", "secrets-management", "telemetry", "incident-response", "patch-management"];
export const PROVIDERS = ["aws", "gcp", "azure", "hetzner", "digitalocean", "ovh", "linode", "vultr", "cloudflare", "oracle", "scaleway", "ionos"];
export const VECTORS = ["reverse-shell", "cmd-injection", "deserialization", "ssrf", "path-traversal", "lfi", "rfi", "priv-esc", "token-theft", "webhook-abuse", "config-drift", "open-ports"];
export const STACKS = ["ubuntu", "debian", "alpine", "docker", "kubernetes", "nginx", "caddy", "traefik", "systemd", "ufw", "iptables", "nftables"];

export function getRunbookCount(): number {
  const n = Number(process.env.PSEO_RUNBOOK_COUNT || "10000");
  return Number.isFinite(n) ? Math.max(1000, Math.min(200000, Math.floor(n))) : 10000;
}

function pick<T>(arr: T[], idx: number): T {
  return arr[idx % arr.length];
}

export function runbookSlugById(id: number): string {
  const a = pick(TOPICS, id);
  const b = pick(PROVIDERS, id * 7 + 3);
  const c = pick(VECTORS, id * 13 + 5);
  const d = pick(STACKS, id * 17 + 11);
  return `openclaw-${a}-${b}-${c}-${d}-${id}`;
}

export function parseRunbookSlug(slug: string): { id: number, topic: string, provider: string, vector: string, stack: string } | null {
  const m = slug.match(/-(\d+)$/);
  if (!m) return null;
  const id = Number(m[1]);
  if (!Number.isFinite(id)) return null;
  const topic = pick(TOPICS, id);
  const provider = pick(PROVIDERS, id * 7 + 3);
  const vector = pick(VECTORS, id * 13 + 5);
  const stack = pick(STACKS, id * 17 + 11);
  return { id, topic, provider, vector, stack };
}

export function titleCase(s: string): string {
  return s.split(/[-_]/g).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function relatedRunbookIds(id: number): number[] {
  const n = getRunbookCount();
  return [1,2,3,4,5,6].map(k => Math.abs((id * (k+3) + k*97) % n));
}

export function buildRunbookContent(meta: { id: number, topic: string, provider: string, vector: string, stack: string }) {
  const { id, topic, provider, vector, stack } = meta;
  const topicT = titleCase(topic);
  const providerT = titleCase(provider);
  const vectorT = titleCase(vector);
  const stackT = titleCase(stack);

  const keyword = `OpenClaw ${topicT} on ${providerT} (${stackT}) — mitigate ${vectorT}`;
  const updated = new Date().toISOString().slice(0,10);

  const sections = [
    {
      h: "Threat Model",
      bullets: [
        `Minimize exposure paths that lead to ${vectorT} compromise in OpenClaw deployments.`,
        `Assume attackers scan continuously; “RCE incidents” are usually misconfig + exposure.`,
        `Goal: remove public control-plane reachability, harden runtime, constrain egress.`
      ]
    },
    {
      h: "30-Second Audit Checklist",
      bullets: [
        `Control plane is NOT public (VPN / allowlist).`,
        `Agent runtime is sandboxed (FS/Proc/Net).`,
        `Egress is restricted (explicit outbound policies).`,
        `Dependencies pinned + integrity validated.`
      ]
    },
    {
      h: `Hardening Actions (${stackT})`,
      bullets: [
        `Apply firewall baseline for ${stackT} and close unused ports.`,
        `Rotate secrets; ensure OpenClaw tokens are short-lived and scope-limited.`,
        `Disable password SSH; require keys + MFA where possible.`,
        `Separate nodes for agent runners vs control-plane services.`
      ]
    },
    {
      h: "Detection & Response",
      bullets: [
        `Alert on new outbound destinations, unexpected binary execution, privilege escalation attempts.`,
        `Isolate compromised nodes; rotate credentials; redeploy from clean images.`,
        `Post-incident diff: what drifted in networking, agents, and access control?`
      ]
    },
    {
      h: "FAQ",
      bullets: [
        `Q: Is this specific to ${providerT}? A: Baselines are portable; provider notes map to primitives.`,
        `Q: Do I need a WAF? A: Helpful for HTTP surfaces, but VPN/allowlist + runtime hardening is the main win.`,
        `Q: Fastest risk reduction? A: remove public exposure + lock egress.`
      ]
    }
  ];

  return { keyword, updated, topicT, providerT, vectorT, stackT, sections };
}
