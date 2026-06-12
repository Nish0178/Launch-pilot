import { buildCountryContext } from './countryContext';

export function buildSimulationLabPrompt(
  name: string,
  idea: string,
  originalScore: number,
  pricingVariable: string,
  marketVariable: string,
  segmentVariable: string,
  country: string,
  reportData: string
): string {
  return `You are an AI Simulation Lab for startup scenario testing.
Evaluate the impact of changing the startup's variables on its probability of success.
Startup Name: ${name}
Core Idea: ${idea}
Original Validation Score: ${originalScore}/100
Baseline Context: ${reportData}

${buildCountryContext(country)}

User is simulating the following scenario:
- New Pricing Strategy: ${pricingVariable || 'No Change'}
- New Target Market: ${marketVariable || 'No Change'}
- New Customer Segment: ${segmentVariable || 'No Change'}

Your response must be a single valid JSON object. Output only raw, parsable JSON.

{
  "scenarioName": "string (e.g. Premium B2B US Expansion)",
  "originalScore": ${originalScore},
  "newScore": number (0-100, calculate the new estimated score),
  "insights": [
    "string (insight 1)",
    "string (insight 2)",
    "string (insight 3)"
  ],
  "metrics": {
    "cac": "string (e.g. +$45 or -$12)",
    "ltv": "string (e.g. +$400 or -$150)",
    "timeToProfit": "string (e.g. 14 Months)"
  }
}

Respond ONLY with raw JSON. Ensure the insights explain WHY the score went up or down based on the simulated variables.`;
}
