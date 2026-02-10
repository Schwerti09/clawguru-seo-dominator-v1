import Stripe from "stripe";
import Link from "next/link";
import { cookies } from "next/headers";
import { signAccess } from "@/lib/access";

export const dynamic = "force-dynamic";

export default async function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams.session_id;
  const key = process.env.STRIPE_SECRET_KEY;
  const secret = process.env.ACCESS_TOKEN_SECRET;

  let ok = false;
  let mode: string | null = null;

  if (sessionId && key && secret) {
    const stripe = new Stripe(key, { apiVersion: "2024-06-20" });
    const session = await stripe.checkout.sessions.retrieve(sessionId).catch(() => null);
    if (session && session.payment_status === "paid") {
      ok = true;
      mode = session.mode;
      const payload = {
        v: 1,
        exp: Date.now() + (session.mode === "payment" ? 24 * 3600 * 1000 : 30 * 24 * 3600 * 1000),
        mode: session.mode,
        sid: session.id,
      };
      const token = signAccess(payload, secret);
      cookies().set("cg_access", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: session.mode === "payment" ? 24 * 3600 : 30 * 24 * 3600,
      });
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="rounded-2xl border border-cyber-border bg-cyber-panel/60 p-6">
        <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Checkout Status</div>
        <h1 className="mt-2 text-3xl font-semibold">{ok ? "Access Granted" : "Payment Verification Pending"}</h1>
        <p className="mt-3 text-cyber-muted">
          {ok ? "Your access token is active. Go generate runbooks." : "If you just paid, refresh in a few seconds. If it still fails, check Stripe keys."}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/tools" className="rounded-xl border border-cyber-green/35 bg-black/45 px-5 py-3 text-center font-semibold text-cyber-green hover:bg-black/60">
            Go to Runbook Factory
          </Link>
          <Link href="/" className="rounded-xl border border-cyber-border bg-black/25 px-5 py-3 text-center font-semibold hover:bg-black/40">
            Back to Dashboard
          </Link>
        </div>

        <div className="mt-5 text-xs text-cyber-muted">Session mode: <span className="font-mono text-cyber-ink">{mode || "unknown"}</span></div>
      </div>
    </main>
  );
}
