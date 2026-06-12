export function buildCountryContext(country: string): string {
  const normalized = country.toLowerCase().trim();
  
  if (normalized === 'india') {
    return `
=== COUNTRY CONTEXT ENGINE: INDIA ===
CRITICAL: You MUST adapt ALL of your analysis, projections, competitors, and advice for the INDIAN market.
- Currency: Use INR (₹) for ALL revenue projections, pricing models, budget estimates, and funding requirements. Do NOT use USD.
- Market Research: Focus on the Indian startup ecosystem, Indian consumer behavior, and tier-1/tier-2/tier-3 city dynamics if applicable.
- Competitors: Cite real Indian competitors (e.g., Zomato, Swiggy, Flipkart, Meesho, Zepto, Blinkit, CRED, Groww, or relevant Indian startups in this niche).
- Investors: Structure investor advice around the Indian funding environment, including Indian Angel Investors, Indian VCs (e.g., Peak XV, Nexus, Accel India), and the Startup India ecosystem.
- Challenges: Address specific Indian market challenges (e.g., price sensitivity, digital infrastructure, localization, logistics).
- AI Boardroom/Questions: If asking questions, ask highly specific Indian market questions (e.g., "How will you acquire users in Tier-2 and Tier-3 cities?", "Why will users switch from local informal competitors?").
=====================================
`;
  }
  
  if (normalized === 'usa' || normalized === 'united states') {
    return `
=== COUNTRY CONTEXT ENGINE: USA ===
CRITICAL: You MUST adapt ALL of your analysis, projections, competitors, and advice for the USA market.
- Currency: Use USD ($) for ALL financial figures.
- Market Research: Focus on the US startup ecosystem, tech hubs (Silicon Valley, NYC, Austin), and US consumer/B2B behavior.
- Competitors: Cite established US-based competitors and SaaS players.
- Investors: Focus on US Venture Capital dynamics, angel syndicates, and standard Silicon Valley funding milestones.
- AI Boardroom/Questions: Ask specific US market questions (e.g., "How will you compete against established SaaS incumbents?", "What is your GTM strategy for capturing high-LTV US enterprise clients?").
===================================
`;
  }

  if (normalized === 'uk' || normalized === 'united kingdom') {
    return `
=== COUNTRY CONTEXT ENGINE: UK ===
CRITICAL: You MUST adapt ALL of your analysis for the UK market.
- Currency: Use GBP (£) for ALL financial figures.
- Market Research: Focus on the UK ecosystem (London tech scene, regional hubs) and UK/European consumer/B2B behavior.
- Investors: Reference UK-specific funding models (EIS/SEIS), UK VCs, and European expansion paths.
==================================
`;
  }

  if (normalized === 'uae' || normalized === 'united arab emirates') {
    return `
=== COUNTRY CONTEXT ENGINE: UAE ===
CRITICAL: You MUST adapt ALL of your analysis for the UAE and MENA market.
- Currency: Use AED (د.إ) for ALL financial figures.
- Market Research: Focus on the UAE/MENA startup ecosystem, Dubai/Abu Dhabi free zones, and high digital penetration.
- Investors: Reference MENA region VCs, sovereign wealth funds, and regional angel networks.
===================================
`;
  }

  // Default / Global
  return `
=== COUNTRY CONTEXT ENGINE: GLOBAL/DEFAULT ===
- Target Market: ${country || 'Global'}
- Currency: Use USD ($) by default unless a specific local currency makes more sense based on the startup's description.
- Market Research: Provide a macro or global perspective, unless the user specifically mentions a local niche.
==============================================
`;
}
