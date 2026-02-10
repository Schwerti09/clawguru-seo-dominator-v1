type GenerateInput = { prompt: string; system?: string; maxOutputTokens?: number };

export async function generateText(input: GenerateInput) {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();

  if (provider === "openai") {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY missing");
    const base = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const res = await fetch(`${base.replace(/\/$/,"")}/responses`, {
      method: "POST",
      headers: { "Content-Type":"application/json", "Authorization":`Bearer ${key}` },
      body: JSON.stringify({
        model,
        input: [
          ...(input.system ? [{ role: "system", content: [{ type:"text", text: input.system }]}] : []),
          { role: "user", content: [{ type:"text", text: input.prompt }]}
        ],
        max_output_tokens: input.maxOutputTokens ?? 900
      })
    });

    if (!res.ok) throw new Error(`OpenAI error ${res.status}: ${await res.text().catch(()=> "")}`);
    const data: any = await res.json();
    const text = data?.output?.[0]?.content?.find((c:any)=>c.type==="output_text")?.text ?? data?.output_text ?? "";
    return { provider: "openai", model, text };
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY missing");
  const base = process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta";
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `${base.replace(/\/$/,"")}/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: (input.system ? `[SYSTEM]\n${input.system}\n\n` : "") + input.prompt }]}],
      generationConfig: { maxOutputTokens: input.maxOutputTokens ?? 900, temperature: 0.4 }
    })
  });

  if (!res.ok) throw new Error(`Gemini error ${res.status}: ${await res.text().catch(()=> "")}`);
  const data: any = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p:any)=>p.text).join("") ?? "";
  return { provider: "gemini", model, text };
}
