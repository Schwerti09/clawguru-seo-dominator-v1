import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getOrigin } from "@/lib/origin";

export const runtime = "nodejs";
type ProductKey = "daypass" | "pro" | "team";
const priceEnv: Record<ProductKey, string> = { daypass: "STRIPE_PRICE_DAYPASS", pro: "STRIPE_PRICE_PRO", team: "STRIPE_PRICE_TEAM" };

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "STRIPE_SECRET_KEY missing" }, { status: 500 });

  const body = await req.json().catch(() => ({}));
  const product = (body?.product as ProductKey) || "daypass";
  const envKey = priceEnv[product];
  if (!envKey) return NextResponse.json({ error: "invalid product" }, { status: 400 });
  const priceId = process.env[envKey];
  if (!priceId) return NextResponse.json({ error: `${envKey} missing` }, { status: 500 });

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  const origin = getOrigin(req);
  const mode = product === "daypass" ? "payment" : "subscription";

  const session = await stripe.checkout.sessions.create({
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing?canceled=1`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
