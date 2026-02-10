import { NextResponse } from "next/server";
import { generateText } from "@/lib/ai";
import { parseCookie, verifyAccess } from "@/lib/access";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.ACCESS_TOKEN_SECRET || "";
  if (!secret) return NextResponse.json({ error: "ACCESS_TOKEN_SECRET missing" }, { status: 500 });

  const cookies = parseCookie(req.headers.get("cookie"));
  const token = cookies["cg_access"];
  if (!token) return NextResponse.json({ error: "ACCESS_REQUIRED" }, { status: 401 });

  const payload = verifyAccess(token, secret);
  if (!payload) return NextResponse.json({ error: "ACCESS_INVALID" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const prompt = String(body?.prompt || "").slice(0, 50_000);
  if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

  const system = String(body?.system || "You are ClawGuru, an institutional-grade cybersecurity assistant for OpenClaw operators. Be concrete, structured, and action-oriented.").slice(0, 20_000);

  const result = await generateText({ prompt, system, maxOutputTokens: 900 });
  return NextResponse.json({ ok: true, ...result });
}
