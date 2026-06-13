import { buildCountryContext } from './countryContext';

export function buildStartupAnalysisPrompt(
  name: string,
  idea: string,
  industry: string,
  country: string,
  budget: string,
  businessModel: string
): string {
  return `You are a professional startup analyst, VC investor, and Y-Combinator advisor.
Analyze the following startup idea and generate a comprehensive validation report:
- Startup Name: ${name}
- Startup Idea: ${idea}
- Industry: ${industry}
- Country/Market Scope: ${country}
- Budget/Funding Status: ${budget}
- Primary Business Model: ${businessModel}

${buildCountryContext(country)}

Your response must be a single, valid JSON object matching the requested schema. Do not wrap the JSON in markdown code blocks like \`\`\`json. Output only raw, parsable JSON.

The JSON schema must be:
{
  "scores": {
    "demand": number (0-100),
    "competition": number (0-100),
    "scalability": number (0-100),
    "innovation": number (0-100),
    "risk": number (0-100),
    "overall": number (0-100)
  },
  "marketResearch": {
    "size": "string (e.g. $10B by 2030)",
    "overview": "string (1-2 sentences)",
    "trends": ["string", "string", ...],
    "opportunities": ["string", "string", ...],
    "challenges": ["string", "string", ...]
  },
  "competitors": [
    {
      "name": "string",
      "strengths": ["string", ...],
      "weaknesses": ["string", ...],
      "pricing": "string",
      "advantage": "string"
    },
    ... (at least 2 competitors)
  ],
  "swot": {
    "strengths": ["string", "string", ...],
    "weaknesses": ["string", "string", ...],
    "opportunities": ["string", "string", ...],
    "threats": ["string", "string", ...]
  },
  "personas": [
    {
      "name": "string (e.g. Innovator Ian)",
      "role": "string (e.g. Tech Lead)",
      "demographics": {
        "age": "string",
        "income": "string",
        "location": "string"
      },
      "painPoints": ["string", ...],
      "goals": ["string", ...]
    },
    ... (at least 2 customer personas)
  ],
  "businessModel": {
    "revenueStreams": ["string", ...],
    "monetizationModels": ["string", ...],
    "pricingSuggestions": ["string", ...],
    "subscriptionOpportunities": ["string", ...],
    "upsellingOpportunities": ["string", ...],
    "canvas": {
      "keyPartners": ["string", ...],
      "keyActivities": ["string", ...],
      "keyResources": ["string", ...],
      "valuePropositions": ["string", ...],
      "customerRelationships": ["string", ...],
      "channels": ["string", ...],
      "customerSegments": ["string", ...],
      "costStructure": ["string", ...],
      "revenueStreams": ["string", ...]
    }
  },
  "gtmStrategy": {
    "launchStrategy": "string",
    "acquisitionPlan": "string",
    "marketingChannels": ["string", ...],
    "growthStrategy": "string",
    "communityBuilding": "string",
    "timeline": {
      "day1": "string",
      "week1": "string",
      "month1": "string",
      "month3": "string",
      "month6": "string",
      "month12": "string"
    }
  },
  "roadmap": [
    {
      "title": "Phase 1: Validation",
      "duration": "string (e.g. Weeks 1-4)",
      "tasks": ["string", ...]
    },
    { "title": "Phase 2: MVP Development", "duration": "string", "tasks": ["string", ...] },
    { "title": "Phase 3: Beta Testing", "duration": "string", "tasks": ["string", ...] },
    { "title": "Phase 4: Product Launch", "duration": "string", "tasks": ["string", ...] },
    { "title": "Phase 5: Growth", "duration": "string", "tasks": ["string", ...] },
    { "title": "Phase 6: Scaling", "duration": "string", "tasks": ["string", ...] }
  ],
  "investorReadiness": {
    "investmentPotential": "string (1 sentence)",
    "scalabilityPotential": "string (1 sentence)",
    "revenuePotential": "string (1 sentence)",
    "marketOpportunity": "string (1 sentence)",
    "founderReadiness": "string (1 sentence)",
    "investorScore": number (0-100),
    "recommendations": ["string", ...],
    "threats": [
      {
        "type": "string",
        "title": "string",
        "content": "string",
        "severity": "Medium" | "High" | "Critical"
      },
      ... (3 threats)
    ]
  },
  "businessPlan": {
    "summary": "string",
    "problem": "string",
    "solution": "string",
    "marketAnalysis": "string",
    "revenueModel": "string",
    "marketingStrategy": "string",
    "financialPlan": "string",
    "growthPlan": "string"
  },
  "landingPage": {
    "hero": {
      "title": "string",
      "tagline": "string",
      "ctaText": "string"
    },
    "features": [
      { "title": "string", "description": "string" },
      ...
    ],
    "benefits": ["string", ...],
    "testimonials": [
      { "quote": "string", "author": "string", "role": "string" },
      ...
    ],
    "pricing": [
      { "tier": "string", "price": "string", "features": ["string", ...] },
      ... (at least 2 tiers)
    ],
    "ctaSection": {
      "title": "string",
      "description": "string",
      "buttonText": "string"
    }
  },
  "crossQuestions": [
    {
      "question": "string (Tough, critical question challenging the founder's assumptions)",
      "explanation": "string (Deep explanation of why this question is critical, the systemic risks involved, and the real-world consequence if the founder fails to solve it)"
    },
    ... (exactly 5 questions)
  ]
}

CRITICAL INSTRUCTIONS:
1. Respond ONLY with raw JSON. No markdown formatting like \`\`\`json.
2. Be HIGHLY CRITICAL and objective. Do not just sugarcoat the idea.
3. For the SWOT (Pros and Cons) and Risk sections, dig deep. Expose real systemic risks, regulatory hurdles, why incumbents might crush them, or why the unit economics might fail. 
4. Provide exactly 5 "crossQuestions" that serve as a harsh reality check for the founder. Each question must include a deep 'explanation' detailing why it matters.`;
}
