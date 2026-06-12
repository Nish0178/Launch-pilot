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
      "content": "string (Catchy opening statement and company purpose)"
    },
    {
      "title": "Slide 2: The Problem",
      "content": "string (Clear explanation of the problem)"
    },
    {
      "title": "Slide 3: The Solution",
      "content": "string (How the product solves the problem)"
    },
    {
      "title": "Slide 4: Market Opportunity",
      "content": "string (TAM, SAM, SOM and CAGR)"
    },
    {
      "title": "Slide 5: Business Model",
      "content": "string (How we make money)"
    },
    {
      "title": "Slide 6: Go-To-Market",
      "content": "string (How we acquire users)"
    },
    {
      "title": "Slide 7: Competitive Advantage",
      "content": "string (Why we win against incumbents)"
    },
    {
      "title": "Slide 8: The Ask",
      "content": "string (Funding required and what it will be used for)"
    }
  ]
}

Respond ONLY with raw JSON. Ensure the slide content is punchy, persuasive, and ready for investors to read.`;
}
