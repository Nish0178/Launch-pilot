import { buildCountryContext } from './countryContext';

export function buildDigitalTwinPrompt(
  name: string,
  idea: string,
  industry: string,
  businessModel: string,
  country: string,
  reportData: string
): string {
  return `You are an advanced AI predictive engine.
Generate a "Startup Digital Twin" forecast for the startup "${name}" operating in the "${industry}" industry with a "${businessModel}" model.
Idea: ${idea}
Validation Context: ${reportData}

${buildCountryContext(country)}

Your response must be a single valid JSON object matching the schema below. Output only raw, parsable JSON.

{
  "growthProbability": number (0-100),
  "revenueProjection": {
    "sixMonth": "string (e.g. $15,000)",
    "twelveMonth": "string (e.g. $150,000)"
  },
  "fundingReadiness": number (0-100),
  "adoptionForecast": [
    { "month": "M1", "users": number },
    { "month": "M2", "users": number },
    { "month": "M3", "users": number },
    { "month": "M4", "users": number },
    { "month": "M5", "users": number },
    { "month": "M6", "users": number },
    { "month": "M7", "users": number },
    { "month": "M8", "users": number },
    { "month": "M9", "users": number },
    { "month": "M10", "users": number },
    { "month": "M11", "users": number },
    { "month": "M12", "users": number }
  ],
  "riskForecast": [
    { "month": "M1", "riskLevel": number (0-100) },
    { "month": "M3", "riskLevel": number },
    { "month": "M6", "riskLevel": number },
    { "month": "M9", "riskLevel": number },
    { "month": "M12", "riskLevel": number }
  ],
  "marketPosition": "string (1-2 sentences summarizing predicted position after 12 months)"
}

Respond ONLY with raw JSON. Ensure numbers are realistic based on typical SaaS/startup growth curves.`;
}
