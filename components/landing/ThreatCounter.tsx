"use client";
import { useEffect, useMemo, useState } from "react";
const fmt = (n: number) => n.toLocaleString("en-US");
export function ThreatCounter() {
  const base = useMemo(() => {
    const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return 128_000 + (daySeed % 9000);
  }, []);
  const [value, setValue] = useState(base);
  useEffect(() => {
    const t = setInterval(() => setValue(v => v + 7 + Math.floor(Math.random() * 23)), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-xl border border-cyber-border bg-cyber-panel/70 px-4 py-3 shadow-glow">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Live Global Threat Counter</div>
          <div className="mt-1 text-lg font-semibold text-cyber-ink">Attacks Blocked Today</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-cyber-green">{fmt(value)}</div>
          <div className="mt-1 text-xs text-cyber-muted">telemetry signal (simulated)</div>
        </div>
      </div>
    </div>
  );
}
