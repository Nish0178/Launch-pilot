import { buildCountryContext } from './countryContext';

export function buildPitchDeckPrompt(
  name: string,
  idea: string,
  country: string,
  reportData: string
): string {
  return `You are an expert Pitch Deck creator who specializes in writing compelling slide copy for Y-Combinator level startups.
Create a pitch deck for the startup "${name}" based on this idea: "${idea}".
Here is their validation report context:
${reportData}

${buildCountryContext(country)}

Your response must be a single valid JSON object. Output only raw, parsable JSON.

{
  "slides": [
    {
      "title": "Slide 1: Title",
      "content": "string (Catchy opening statement and company purpose)",
      "metrics": []
    },
    {
      "title": "Slide 2: The Problem",
      "content": "string (Clear explanation of the problem)",
      "bullets": ["string", "string"]
    },
    {
      "title": "Slide 3: The Solution",
      "content": "string (How the product solves the problem)",
      "bullets": ["string", "string"]
    },
    {
      "title": "Slide 4: Market Opportunity",
      "content": "string (TAM, SAM, SOM and CAGR)",
      "metrics": [
        { "label": "TAM", "value": "$XX B" },
        { "label": "SAM", "value": "$XX M" }
      ],
      "chart": {
        "title": "Market Growth",
        "type": "bar",
        "data": [
          { "name": "2024", "value": 10 },
          { "name": "2025", "value": 25 },
          { "name": "2026", "value": 50 }
        ]
      }
    },
    {
      "title": "Slide 5: Business Model",
      "content": "string (How we make money)",
      "bullets": ["string", "string"]
    },
    {
      "title": "Slide 6: Go-To-Market",
      "content": "string (How we acquire users)",
      "metrics": [
        { "label": "CAC Target", "value": "$XX" },
        { "label": "LTV Estimate", "value": "$XX" }
      ]
    },
    {
      "title": "Slide 7: Competitive Advantage",
      "content": "string (Why we win against incumbents)",
      "bullets": ["string", "string"]
    },
    {
      "title": "Slide 8: The Ask",
      "content": "string (Funding required and what it will be used for)",
      "metrics": [
        { "label": "Raising", "value": "$XX" },
        { "label": "Runway", "value": "18 Months" }
      ],
      "chart": {
        "title": "Fund Allocation",
        "type": "pie",
        "data": [
          { "name": "Engineering", "value": 40 },
          { "name": "Marketing", "value": 30 },
          { "name": "Operations", "value": 30 }
        ]
      }
    }
  ]
  ]
}

CRITICAL INSTRUCTIONS:
1. Respond ONLY with raw JSON. No markdown formatting like \`\`\`json.
2. Ensure the slide content is punchy, persuasive, and ready for investors to read.
3. For the "chart" and "metrics" fields, DO NOT copy the placeholder data. You MUST generate realistic, data-driven estimates based on the provided Validation Report context. Calculate realistic TAM/SAM/SOM growth and plausible fund allocation percentages.`;
}
