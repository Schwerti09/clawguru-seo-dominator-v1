"use client";
import { useState } from "react";

export default function Tools() {
  const [input, setInput] = useState("Audit my OpenClaw instance for RCE exposure. I run on Ubuntu with Docker behind Nginx. Give me a step-by-step hardening plan and a firewall baseline.");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    setErr("");
    setOut("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Generation failed");
      setOut(data.text || "");
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Runbook Factory</div>
          <h1 className="mt-2 text-3xl font-semibold">Generate Institutional Hardening Runbooks</h1>
          <p className="mt-2 text-cyber-muted max-w-2xl">
            If you see <span className="font-mono text-cyber-ink">ACCESS_REQUIRED</span>, buy a Day Pass or Pro/Teams on <a className="underline" href="/pricing">/pricing</a>.
          </p>
        </div>
        <a href="/pricing" className="rounded-xl border border-cyber-green/35 bg-black/45 px-4 py-2 text-sm font-semibold text-cyber-green hover:bg-black/60">
          Unlock Access
        </a>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Input</div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-3 h-56 w-full rounded-xl border border-cyber-border bg-black/25 p-4 font-mono text-sm text-cyber-ink outline-none focus:ring-2 focus:ring-cyber-green/30"
          />
          <button
            onClick={run}
            disabled={loading}
            className="mt-4 w-full rounded-xl border border-cyber-green/35 bg-black/45 px-4 py-3 font-semibold text-cyber-green hover:bg-black/60 disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Runbook"}
          </button>

          {err ? (
            <div className="mt-3 rounded-xl border border-red-500/30 bg-black/35 p-3 text-sm text-cyber-red">
              {err}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Output</div>
          <pre className="mt-3 h-[22rem] overflow-auto rounded-xl border border-cyber-border bg-black/25 p-4 font-mono text-sm text-cyber-ink whitespace-pre-wrap">
{out || "Output appears here."}
          </pre>
          <div className="mt-3 text-xs text-cyber-muted">
            Provider: <span className="font-mono text-cyber-ink">{process.env.NEXT_PUBLIC_SITE_URL ? "prod" : "preview"}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
