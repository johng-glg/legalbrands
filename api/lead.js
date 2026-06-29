/**
 * Lead intake — native Vercel Serverless Function (deployed automatically from
 * the repo-root /api directory, independent of the static Astro build).
 *
 * Every submission is tagged with `brand` + UTM params so paid traffic
 * attributes per brand. Inserts to Supabase when SUPABASE_URL +
 * SUPABASE_ANON_KEY are set; otherwise logs to the function console so no lead
 * is lost during early build.
 *
 * Swap target: to send leads to Forth/Zoho instead, replace the Supabase block
 * with that CRM's intake call — the normalized `lead` object stays the same.
 */
const UTM_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "variant", "gclid", "fbclid",
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Vercel parses JSON bodies automatically; fall back to manual parse.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ ok: false, error: "Invalid JSON" }); }
  }
  body = body || {};

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  if (!name || !phone) {
    return res.status(422).json({ ok: false, error: "Name and phone are required" });
  }

  const utm = {};
  for (const k of UTM_KEYS) if (body[k]) utm[k] = String(body[k]);

  const lead = {
    brand: String(body.brand ?? "unknown"),
    name,
    phone,
    email: String(body.email ?? "").trim() || null,
    debt_range: String(body.debt_range ?? "").trim() || null,
    message: String(body.message ?? "").trim() || null,
    page: String(body.page ?? "").trim() || null,
    utm,
    user_agent: req.headers["user-agent"] || null,
    created_at: new Date().toISOString(),
  };

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      const r = await fetch(`${url}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(lead),
      });
      if (!r.ok) {
        console.error("[lead] Supabase insert failed", r.status, await r.text());
        return res.status(502).json({ ok: false, error: "Storage error" });
      }
    } catch (err) {
      console.error("[lead] Supabase request error", err);
      return res.status(502).json({ ok: false, error: "Storage error" });
    }
  } else {
    console.log("[lead] (no SUPABASE env — logging)", JSON.stringify(lead));
  }

  return res.status(200).json({ ok: true });
}
