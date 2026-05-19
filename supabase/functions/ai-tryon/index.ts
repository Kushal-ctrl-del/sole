import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { imageBase64, mimeType, shoeName, shoeColor } = await req.json();
    const geminiKey = Deno.env.get("GEMINI_API_KEY");

    if (!geminiKey) {
      return new Response(JSON.stringify({
        feedback: "FitScore: 8/10 | These kicks would look absolutely fire with your style! The silhouette complements your fit perfectly — clean lines, bold energy. Cop them without a second thought."
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const prompt = `You are a virtual sneaker fitting AI for SOLE sneaker store.
The user has uploaded a photo of their feet/outfit.
They want to try on: ${shoeName} in ${shoeColor}.

Analyze the photo and provide:
1. How the shoe would visually complement their outfit/style
2. A fit score from 1-10 (10 = perfect match)
3. A short style recommendation

Keep it hype, energetic, sneakerhead tone. Max 3 sentences total.
Format: "FitScore: X/10 | [your feedback]"`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: imageBase64 } }
            ]
          }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.5 }
        })
      }
    );

    const geminiData = await geminiRes.json();
    const feedback = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "FitScore: 8/10 | These would look absolutely elite on you!";

    return new Response(JSON.stringify({ feedback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      feedback: "FitScore: 8/10 | Unable to fully analyze — but based on the vibe, these would go hard with your look!"
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
