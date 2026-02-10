import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !whsec) return NextResponse.json({ error: "Stripe keys missing" }, { status: 500 });

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  const sig = req.headers.get("stripe-signature") || "";
  const raw = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whsec);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err?.message || err}` }, { status: 400 });
  }

  // Extend later: persist subscription status, email delivery, etc.
  return NextResponse.json({ received: true, type: event.type });
}
