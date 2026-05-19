import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const products = [
  { id: "sole-001", name: "AirEdge Pro", brand: "Nike", price: 12999, gender: "men", category: "running" },
  { id: "sole-002", name: "Ultraboost 23", brand: "Adidas", price: 15999, gender: "unisex", category: "running" },
  { id: "sole-003", name: "Jordan 1 Retro High", brand: "Jordan", price: 22999, gender: "men", category: "lifestyle" },
  { id: "sole-004", name: "Cloud X 3", brand: "On Running", price: 17499, gender: "women", category: "training" },
  { id: "sole-005", name: "Gel-Kayano 30", brand: "ASICS", price: 13499, gender: "women", category: "running" },
  { id: "sole-006", name: "Fresh Foam X 1080v13", brand: "New Balance", price: 14999, gender: "men", category: "running" },
  { id: "sole-007", name: "Suede Classic XXI", brand: "Puma", price: 6999, gender: "unisex", category: "lifestyle" },
  { id: "sole-008", name: "Metaspeed Sky+", brand: "ASICS", price: 24999, gender: "unisex", category: "running" },
  { id: "sole-009", name: "Air Max 270", brand: "Nike", price: 11999, gender: "women", category: "lifestyle" },
  { id: "sole-010", name: "Speedgoat 5", brand: "HOKA", price: 16499, gender: "men", category: "running" },
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    const geminiKey = Deno.env.get("GEMINI_API_KEY");

    if (!geminiKey) {
      console.log("[ai-search] No GEMINI_API_KEY configured");
      return new Response(JSON.stringify({ productIds: [], explanation: "API key not configured" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const productList = products.map(p =>
      `ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Price: ₹${p.price}, Gender: ${p.gender}, Category: ${p.category}`
    ).join("\n");

    const prompt = `You are a sneaker product search assistant.
The user searched for: '${query}'
Here are all available products:
${productList}
Your job: Return ONLY a raw JSON array of product IDs that match the search.
No explanation. No markdown. No code blocks. No backticks.
Just the array like this: ["sole-001","sole-002","sole-003"]
If nothing matches return: []`;

    console.log("[ai-search] Query:", query);
    console.log("[ai-search] Sending to Gemini...");

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.3 }
        })
      }
    );

    const geminiData = await geminiRes.json();
    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "[]";

    console.log("[ai-search] Raw Gemini response:", text);

    const cleaned = text.replace(/```json|```/g, "").trim();
    console.log("[ai-search] Cleaned text:", cleaned);

    const productIds = JSON.parse(cleaned);
    console.log("[ai-search] Parsed productIds:", productIds);

    const validIds = productIds.filter((id: string) => products.some(p => p.id === id)).slice(0, 4);
    console.log("[ai-search] Valid IDs:", validIds);

    return new Response(JSON.stringify({
      productIds: validIds,
      explanation: validIds.length > 0 ? `Found ${validIds.length} matches` : "No matches found"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[ai-search] Error:", err);
    return new Response(JSON.stringify({ productIds: [], explanation: "Search error" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
