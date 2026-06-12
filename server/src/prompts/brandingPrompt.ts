import { buildCountryContext } from './countryContext';

export function buildBrandingPrompt(
  name: string,
  idea: string,
  industry: string,
  country: string
): string {
  return `You are a world-class creative director and brand strategist.
Create a comprehensive Brand Kit for the startup "${name}".
Idea: ${idea}
Industry: ${industry}
Target Market: ${country}

${buildCountryContext(country)}

Your response must be a single valid JSON object. Output only raw, parsable JSON.

{
  "names": [
    "string (Idea for a modern, catchy startup name alternative 1)",
    "string (Idea 2)",
    "string (Idea 3)",
    "string (Idea 4)"
  ],
  "taglines": [
    "string (Short, punchy tagline 1)",
    "string (Tagline 2)",
    "string (Tagline 3)"
  ],
  "personality": [
    "string (e.g., Trustworthy)",
    "string (e.g., Playful)",
    "string",
    "string"
  ],
  "colors": [
    { "name": "Primary", "hex": "#HexCode (e.g., #4F46E5)" },
    { "name": "Secondary", "hex": "#HexCode" },
    { "name": "Accent", "hex": "#HexCode" },
    { "name": "Dark", "hex": "#HexCode" },
    { "name": "Light", "hex": "#HexCode" }
  ]
}

Respond ONLY with raw JSON. Choose color palettes that reflect the requested industry and startup vibe (e.g., green for eco, blue for fin-tech, purple for AI/Web3).`;
}
