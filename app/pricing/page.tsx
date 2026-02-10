"use client";
import { useState } from "react";

async function go(product: "daypass" | "pro" | "team", setLoading: (v: string) => void) {
  setLoading(product);
  try {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ product }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "checkout failed");
    window.location.href = data.url;
  } finally {
    setLoading("");
  }
}

function Card(props: { title: string; price: string; desc: string; items: string[]; product: "daypass"|"pro"|"team"; accent: "green"|"red"; }) {
  const { title, price, desc, items, product, accent } = props;
  const [loading, setLoading] = useState("");
  return (
    <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-6">
      <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Plan</div>
      <h2 className="mt-2 text-xl font-semibold">{title}</h2>
      <div className="mt-2 font-mono text-3xl font-bold text-cyber-ink">{price}</div>
      <p className="mt-2 text-sm text-cyber-muted">{desc}</p>
      <ul className="mt-4 space-y-2 text-sm text-cyber-muted">
        {items.map((x) => (
          <li key={x} className="flex gap-2">
            <span className={"mt-[6px] h-2 w-2 rounded-full " + (accent === "green" ? "bg-cyber-green" : "bg-cyber-red")} />
            <span>{x}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => go(product, setLoading)}
        className={"mt-6 w-full rounded-xl border px-4 py-3 font-semibold transition " + (accent === "green" ? "border-cyber-green/35 bg-black/45 text-cyber-green hover:bg-black/60" : "border-cyber-border bg-black/25 text-cyber-ink hover:bg-black/40")}
        disabled={loading !== ""}
      >
        {loading === product ? "Redirecting..." : "Continue to Checkout"}
      </button>
      <div className="mt-3 text-xs text-cyber-muted">Instant access after payment.</div>
    </div>
  );
}

export default function Pricing() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Monetization</div>
          <h1 className="mt-2 text-3xl font-semibold">Hardening Kits & Institutional Runbooks</h1>
          <p className="mt-2 text-cyber-muted max-w-2xl">
            Daypass is perfect for one incident. Pro & Teams are designed for ongoing exposure management.
          </p>
        </div>
        <a href="/tools" className="rounded-xl border border-cyber-border bg-black/25 px-4 py-2 text-sm font-semibold hover:bg-black/40">Try Tools</a>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Card title="Day Pass" price="€7" desc="24h access — emergency hardening sprint."
          items={["Runbook generator access", "Firewall baseline checklist", "RCE exposure audit prompts"]}
          product="daypass" accent="red" />
        <Card title="Pro" price="€14.99/mo" desc="Continuous protection patterns + updates."
          items={["Unlimited runbooks", "Provider-specific hardening packs", "New threat playbooks weekly"]}
          product="pro" accent="green" />
        <Card title="Teams" price="€29.99/mo" desc="Multi-node rollout playbooks + team workflows."
          items={["Shared rollout checklists", "Ops-friendly templates", "Higher generation limits"]}
          product="team" accent="green" />
      </div>
    </main>
  );
}
