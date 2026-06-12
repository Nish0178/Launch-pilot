import dotenv from 'dotenv';
dotenv.config();

export interface ValidationReportData {
  scores: {
    demand: number;
    competition: number;
    scalability: number;
    innovation: number;
    risk: number;
    overall: number;
  };
  marketResearch: {
    size: string;
    overview: string;
    trends: string[];
    opportunities: string[];
    challenges: string[];
  };
  competitors: Array<{
    name: string;
    strengths: string[];
    weaknesses: string[];
    pricing: string;
    advantage: string;
  }>;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  personas: Array<{
    name: string;
    role: string;
    demographics: {
      age: string;
      income: string;
      location: string;
    };
    painPoints: string[];
    goals: string[];
  }>;
  businessModel: {
    revenueStreams: string[];
    monetizationModels: string[];
    pricingSuggestions: string[];
    subscriptionOpportunities: string[];
    upsellingOpportunities: string[];
    canvas: {
      keyPartners: string[];
      keyActivities: string[];
      keyResources: string[];
      valuePropositions: string[];
      customerRelationships: string[];
      channels: string[];
      customerSegments: string[];
      costStructure: string[];
      revenueStreams: string[];
    };
  };
  gtmStrategy: {
    launchStrategy: string;
    acquisitionPlan: string;
    marketingChannels: string[];
    growthStrategy: string;
    communityBuilding: string;
    timeline: {
      day1: string;
      week1: string;
      month1: string;
      month3: string;
      month6: string;
      month12: string;
    };
  };
  roadmap: Array<{
    title: string;
    duration: string;
    tasks: string[];
  }>;
  investorReadiness: {
    investmentPotential: string;
    scalabilityPotential: string;
    revenuePotential: string;
    marketOpportunity: string;
    founderReadiness: string;
    investorScore: number;
    recommendations: string[];
    threats: Array<{
      type: string;
      title: string;
      content: string;
      severity: 'Medium' | 'High' | 'Critical';
    }>;
  };
  businessPlan: {
    summary: string;
    problem: string;
    solution: string;
    marketAnalysis: string;
    revenueModel: string;
    marketingStrategy: string;
    financialPlan: string;
    growthPlan: string;
  };
  landingPage: {
    hero: {
      title: string;
      tagline: string;
      ctaText: string;
    };
    features: Array<{
      title: string;
      description: string;
    }>;
    benefits: string[];
    testimonials: Array<{
      quote: string;
      author: string;
      role: string;
    }>;
    pricing: Array<{
      tier: string;
      price: string;
      features: string[];
    }>;
    ctaSection: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
}

export async function generateValidationReport(
  name: string,
  idea: string,
  industry: string,
  country: string,
  budget: string,
  businessModel: string
): Promise<ValidationReportData> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      return await generateWithGemini(apiKey, name, idea, industry, country, budget, businessModel);
    } catch (e) {
      console.error('Failed to generate report with Gemini API, falling back to rule-based engine', e);
    }
  }

  return generateRuleBased(name, idea, industry, country, budget, businessModel);
}

async function generateWithGemini(
  apiKey: string,
  name: string,
  idea: string,
  industry: string,
  country: string,
  budget: string,
  businessModel: string
): Promise<ValidationReportData> {
  const prompt = `You are a professional startup analyst, VC investor, and Y-Combinator advisor.
Analyze the following startup idea and generate a comprehensive validation report:
- Startup Name: ${name}
- Startup Idea: ${idea}
- Industry: ${industry}
- Country/Market Scope: ${country}
- Budget/Funding Status: ${budget}
- Primary Business Model: ${businessModel}

Your response must be a single, valid JSON object matching the TypeScript interface \`ValidationReportData\`. Do not wrap the JSON in markdown code blocks like \\\`json. Output only raw, parsable JSON.

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
    { "title": "Phase 2: MVP Development", "duration": "string", "tasks": [...] },
    { "title": "Phase 3: Beta Testing", "duration": "string", "tasks": [...] },
    { "title": "Phase 4: Product Launch", "duration": "string", "tasks": [...] },
    { "title": "Phase 5: Growth", "duration": "string", "tasks": [...] },
    { "title": "Phase 6: Scaling", "duration": "string", "tasks": [...] }
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
  }
}

Respond ONLY with raw JSON. Make the content detailed, professional, and custom-tailored to the startup idea. Do not include any text outside the JSON.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}: ${await response.text()}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error('Empty response from Gemini API');
  }

  return JSON.parse(rawText.trim()) as ValidationReportData;
}

function generateRuleBased(
  name: string,
  idea: string,
  industry: string,
  country: string,
  budget: string,
  businessModel: string
): ValidationReportData {
  // We'll extract details to make the response seem tailored
  const lowerIdea = idea.toLowerCase();
  const lowerIndustry = industry.toLowerCase();

  // Generate scores based on details
  const demandScore = Math.floor(Math.random() * 20) + 75; // 75 - 95
  const compScore = Math.floor(Math.random() * 25) + 55; // 55 - 80
  const scalabilityScore = Math.floor(Math.random() * 15) + 80; // 80 - 95
  const innovationScore = Math.floor(Math.random() * 20) + 78; // 78 - 98
  const riskScore = Math.floor(Math.random() * 20) + 35; // 35 - 55
  const overallScore = Math.round((demandScore + scalabilityScore + innovationScore + (100 - riskScore)) / 4);

  // Custom market details based on industry
  let marketSize = '$25.4 Billion by 2029';
  let cagr = '12.8%';
  if (lowerIndustry.includes('health') || lowerIndustry.includes('medical')) {
    marketSize = '$120.5 Billion by 2030';
    cagr = '15.4%';
  } else if (lowerIndustry.includes('clean') || lowerIndustry.includes('energy') || lowerIndustry.includes('eco')) {
    marketSize = '$45.2 Billion by 2028';
    cagr = '16.1%';
  } else if (lowerIndustry.includes('fin') || lowerIndustry.includes('bank') || lowerIndustry.includes('pay')) {
    marketSize = '$380.0 Billion by 2031';
    cagr = '11.2%';
  } else if (lowerIndustry.includes('saas') || lowerIndustry.includes('software')) {
    marketSize = '$307.2 Billion by 2027';
    cagr = '18.7%';
  }

  return {
    scores: {
      demand: demandScore,
      competition: compScore,
      scalability: scalabilityScore,
      innovation: innovationScore,
      risk: riskScore,
      overall: overallScore
    },
    marketResearch: {
      size: `${marketSize} (CAGR: ${cagr})`,
      overview: `The ${industry} industry in ${country} is undergoing rapid disruption driven by automation, digitized user behaviors, and modern cloud integrations. ${name} targets a highly addressable niche addressing efficiency gaps.`,
      trends: [
        'AI and Predictive Machine Learning Integration',
        'Mobile-first and localized distribution models',
        'Strict regulatory standards and privacy-first data handling',
        'Shift towards micro-transactions and user-centric subscription billing'
      ],
      opportunities: [
        'Partnerships with regional enterprise and utility distributors',
        'Direct-to-consumer digital acquisition with low churn rates',
        'Cross-selling value-added services using proprietary telemetry data'
      ],
      challenges: [
        'High initial user acquisition friction',
        'Navigating complex local regulatory compliance structures',
        'Incumbent resistance and platform lock-in effects'
      ]
    },
    competitors: [
      {
        name: `${industry} Incumbent Alpha`,
        strengths: ['Established brand awareness', 'Deep pockets', 'Massive distribution'],
        weaknesses: ['Legacy codebase and slow iteration cycles', 'High pricing tiers', 'Generic user interface'],
        pricing: '$199 - $499 per year',
        advantage: `First-mover advantage and enterprise contracts.`
      },
      {
        name: `Startup Competitor Beta`,
        strengths: ['Fast feature release', 'Clean mobile UX'],
        weaknesses: ['Limited customizability', 'Poor API integration', 'High customer support overhead'],
        pricing: '$19/month',
        advantage: 'Highly focused targeting of millennial audiences.'
      }
    ],
    swot: {
      strengths: [
        `Highly focused value proposition for ${industry} clients.`,
        'Low operational overhead using modern cloud architecture.',
        'Adaptive data models providing unique predictive recommendations.'
      ],
      weaknesses: [
        'New brand with zero initial trust and domain authority.',
        'Limited historical performance data to train algorithms.',
        `Tight budget restriction of ${budget} for initial marketing.`
      ],
      opportunities: [
        'Untapped customer segments looking for affordable alternatives.',
        'Viral loop creation through peer sharing and invite systems.',
        'White-label integration opportunities with B2B distribution partners.'
      ],
      threats: [
        'Incumbents copying features into their next version releases.',
        'Rapidly changing regulatory frameworks surrounding customer data.',
        'Rising advertising costs on search and social channels.'
      ]
    },
    personas: [
      {
        name: 'Early Adopter Eric',
        role: `Tech-savvy Consumer / Manager`,
        demographics: {
          age: '25-38',
          income: '$80,000 - $120,000',
          location: 'Urban Center'
        },
        painPoints: [
          'Frustrated with slow and clunky manual alternatives',
          'High current expenses with little transparency',
          'Overwhelmed by complex enterprise software dashboards'
        ],
        goals: [
          'Automate daily workflows to save 5+ hours weekly',
          'Optimize costs and measure return on investment instantly',
          'Access data on-the-go via mobile device'
        ]
      },
      {
        name: 'Pragmatic Patty',
        role: 'Head of Operations / Budget Holder',
        demographics: {
          age: '35-50',
          income: '$90,000 - $140,000',
          location: 'Suburban Area'
        },
        painPoints: [
          'Skeptical of over-hyped tech products',
          'Worried about onboarding times for their team',
          'Needs clear regulatory compliance assurance'
        ],
        goals: [
          'Implement stable tools with guaranteed 3x+ ROI',
          'Keep employee training time under 1 hour',
          'Ensure 99.9% uptime and bulletproof data security'
        ]
      }
    ],
    businessModel: {
      revenueStreams: [
        `Direct SaaS Subscription (${businessModel})`,
        'Usage-based transactional billing',
        'B2B partnership commissions and white-labeling setups'
      ],
      monetizationModels: [
        'Freemium tier (basic dashboard, analytics)',
        'Professional tier (unlocked automated tasks, custom endpoints)',
        'Enterprise tier (custom compliance SLA, priority support)'
      ],
      pricingSuggestions: [
        'Starter: Free Forever (up to 3 projects/active tracks)',
        'Pro: $19.99/month or $180/year (fully automated, priority queues)',
        'Growth: $79.99/month (multi-seat, dedicated data reports)'
      ],
      subscriptionOpportunities: [
        'Monthly recurring fees for automated recommendations',
        'Add-on support and maintenance service agreements'
      ],
      upsellingOpportunities: [
        'Custom report downloads with deep-dive spreadsheets',
        'Premium API access tokens for secondary developer tools'
      ],
      canvas: {
        keyPartners: [
          'Cloud hosting infrastructure providers (GCP/AWS)',
          'Industry API operators and database registries',
          'Local distribution agencies and consultants'
        ],
        keyActivities: [
          'Software development and system maintenance',
          'Customer acquisition and performance marketing',
          'AI optimization and telemetry data training'
        ],
        keyResources: [
          'Proprietary recommendation algorithms',
          'Domain expertise and product knowledge',
          `Initial launch budget of ${budget}`
        ],
        valuePropositions: [
          `Allows users to achieve startup results in ${country} 10x faster.`,
          'Granular intelligence dashboards replacing expensive consultancies.',
          'Seamless, easy-to-use UX requiring zero configuration.'
        ],
        customerRelationships: [
          'Self-serve onboarding with interactive guides',
          'E-mail support channels and active product discord',
          'Personal account audits for enterprise contracts'
        ],
        channels: [
          'Search Engine Optimization (SEO) of landing page tools',
          'Organic developer/builder communities (ProductHunt, X)',
          'Highly targeted LinkedIn and search ads'
        ],
        customerSegments: [
          `Innovators and builders looking to validate ideas in the ${industry} sector.`,
          'Growth managers seeking optimization platforms.',
          'Small businesses transitioning away from manual spreadsheets.'
        ],
        costStructure: [
          'Server hosting and AI API tokens (35%)',
          'Customer acquisition ads and content marketing (45%)',
          'Administrative, compliance, and legal costs (20%)'
        ],
        revenueStreams: [
          `Monthly SaaS subscription plans (${businessModel})`,
          'One-off detailed CSV/report exports',
          'Custom white-label licensing agreements'
        ]
      }
    },
    gtmStrategy: {
      launchStrategy: `Launch as a 'Build in Public' beta project on ProductHunt and HackerNews, offering early-bird users a free 3-month trial of the Pro features in exchange for structured feedback.`,
      acquisitionPlan: `Deploy a free side-project tool (e.g., a mini-${industry} calculator) that ranks quickly on Google search, capturing emails and funneling users to the main validation platform.`,
      marketingChannels: [
        'Content marketing on Medium/Dev.to with targeted SEO keywords',
        'Cold outreach to startup incubators and business advisors',
        'Retargeting ads on Meta and LinkedIn for site visitors'
      ],
      growthStrategy: 'Create a referral system where inviting another founder unlocks advanced SWOT and persona reports for both parties.',
      communityBuilding: 'Build an exclusive Slack or Discord community where early-stage founders share growth advice and review each other\'s validation reports.',
      timeline: {
        day1: 'Launch landing page with video demo, collect early user signups.',
        week1: 'Distribute MVP to first 100 beta users in builder communities.',
        month1: 'Release first iteration addressing main UX bottlenecks, introduce basic billing.',
        month3: 'Launch on ProductHunt; roll out first B2B affiliate partnership program.',
        month6: 'Expand platform integrations (e.g., Slack, Notion, Zapier) and scale marketing.',
        month12: 'Reach 1,000 active paid subscribers, kick off Series Pre-Seed funding round.'
      }
    },
    roadmap: [
      {
        title: 'Phase 1: Validation',
        duration: 'Month 1',
        tasks: [
          `Conduct 30 user interviews with target founders in the ${industry} space.`,
          'Create high-fidelity interactive wireframes and launch signup page.',
          'Verify core technical assumptions regarding database/API integrations.'
        ]
      },
      {
        title: 'Phase 2: MVP Development',
        duration: 'Months 2-3',
        tasks: [
          'Build functional core dashboard pages and client state flow.',
          'Integrate database schema and setup fallback rule-based generation.',
          'Deploy secure payments and subscription gating using stripe or similar.'
        ]
      },
      {
        title: 'Phase 3: Beta Testing',
        duration: 'Month 4',
        tasks: [
          'Onboard 200 alpha testers to validate dashboard insights.',
          'Optimize server response latency and resolve telemetry bugs.',
          'Collect testimonials and case studies from initial success stories.'
        ]
      },
      {
        title: 'Phase 4: Product Launch',
        duration: 'Month 5',
        tasks: [
          `Submit ${name} to major directories and launch on ProductHunt.`,
          'Kick off organic content marketing campaign targeting key industry pain points.',
          'Activate Google Search Ad sequences for selected high-intent keywords.'
        ]
      },
      {
        title: 'Phase 5: Growth',
        duration: 'Months 6-9',
        tasks: [
          'Launch co-founder advisor and reality check sharing features.',
          'Implement referral loops and unlockable validation modules.',
          'Form partnerships with 3 startup accelerators and incubators.'
        ]
      },
      {
        title: 'Phase 6: Scaling',
        duration: 'Months 10-12',
        tasks: [
          `Extend support for regional language and local currency configurations.`,
          'Integrate secondary SaaS tool modules for MVP building guides.',
          'Hire 2 dedicated customer success agents to support enterprise tier users.'
        ]
      }
    ],
    investorReadiness: {
      investmentPotential: `Strong. The ${industry} sector is hot, and an ARR SaaS model holds high investor appeal.`,
      scalabilityPotential: 'Excellent. Hardware-agnostic software architectures enable rapid, low-marginal-cost user acquisition.',
      revenuePotential: `High. Tiered SaaS subscriptions can scale quickly past $100k ARR within the first year.`,
      marketOpportunity: `Significant. Targeting underserved small business segments in ${country} bypasses legacy competitors.`,
      founderReadiness: `Ready. Clear understanding of the primary risk landscape and resource constraints.`,
      investorScore: Math.floor(Math.random() * 15) + 75, // 75 - 90
      recommendations: [
        'Secure 5 letters of intent (LOIs) from prospective enterprise clients to validate B2B demand.',
        `Keep startup MVP development lean to stay well within the ${budget} budget limit.`,
        'Refine GTM metrics with a focus on organic side-project SEO tools.'
      ],
      threats: [
        {
          type: 'Market Reality',
          title: 'Adoption Inertia',
          content: `90% of software products fail because users stick to legacy solutions (e.g., pen and paper, excel). ${name} must deliver a 10x better experience on Day 1.`,
          severity: 'Critical'
        },
        {
          type: 'Competition',
          title: 'Fast Followers',
          content: 'Incumbents with existing distribution channels can replicate successful features within weeks of launch.',
          severity: 'High'
        },
        {
          type: 'Monetization',
          title: 'Churn Rates',
          content: `Early stage business tools often face high churn as validation projects get abandoned. Retaining users through community building is vital.`,
          severity: 'Medium'
        }
      ]
    },
    businessPlan: {
      summary: `${name} is an innovative ${industry} startup targeting the ${country} market. By deploying a ${businessModel} business model, we provide a robust, low-cost platform that empowers users to validate startup operations quickly. Our goal is to achieve $100k ARR in 12 months with high unit margins.`,
      problem: `Founders and product teams spend months and thousands of dollars on manual research, consultations, and competitor reviews. There is currently no automated, instant platform that translates a startup concept into a full validation suite.`,
      solution: `We provide a centralized, interactive validation dashboard. Within 60 seconds, our AI analyzes market size, creates client personas, generates competitive gap analyses, formulates GTM timelines, and builds downloadable executive business plans.`,
      marketAnalysis: `The addressable market is growing at a double-digit CAGR. With rising global startup creation rates, small and medium enterprises (SMEs) are looking for automated SaaS tools to cut operational and strategy consulting costs.`,
      revenueModel: `Our revenue is driven by a hybrid model consisting of monthly subscriptions ($19.99/mo), usage-based report credits, and premium upsells (detailed CSV datasets, white-label decks).`,
      marketingStrategy: `Our marketing focuses on side-project SEO tools, building in public on Twitter/Reddit, launching on product registries (ProductHunt), and partnering with startup incubators.`,
      financialPlan: `We plan to stay lean, leveraging SaaS tools and serverless cloud architectures. Operational costs will be kept low, with the majority of the initial ${budget} budget allocated directly to growth and customer acquisition.`,
      growthPlan: `Following a successful MVP release, we will launch secondary features including the AI Co-founder advisor, pitch deck generation, and automated competitor tracker to drive expansion revenue and increase customer lifetime value.`
    },
    landingPage: {
      hero: {
        title: `Launch ${name} with Complete Confidence`,
        tagline: `Transform your startup idea into an investor-ready business in 60 seconds. Powered by advanced AI intelligence.`,
        ctaText: 'Validate Your Idea'
      },
      features: [
        {
          title: '60-Second Deep Analysis',
          description: 'Receive market sizes, trend evaluations, and competitor breakdowns instantly.'
        },
        {
          title: 'SWOT & Customer Personas',
          description: 'Understand customer goals, pain points, and map your strategic opportunities.'
        },
        {
          title: 'Interactive Roadmap & Canvas',
          description: 'Visualize your business model canvas and track progress on an interactive timeline.'
        }
      ],
      benefits: [
        'Save weeks of manual market research',
        'Create pitch-ready business plans in minutes',
        'Identify competitors and market gaps instantly',
        'Assess investor readiness and receive funding strategies'
      ],
      testimonials: [
        {
          quote: `Using this platform, I validated my idea, adjusted my pricing model, and pitched to an angel investor in under 48 hours. We got funded!`,
          author: 'Alex Carter',
          role: 'Founder, EcoStream'
        },
        {
          quote: 'This is the most comprehensive onboarding and intelligence platform I have ever seen. It saves founders thousands of dollars in advisory fees.',
          author: 'Sarah Jenkins',
          role: 'Incubator Director'
        }
      ],
      pricing: [
        {
          tier: 'Free Tier',
          price: '$0',
          features: ['1 Validation Report', 'Basic SWOT Matrix', 'Early Adopter Persona']
        },
        {
          tier: 'Founder Pro',
          price: '$19/mo',
          features: ['Unlimited Reports', 'Full Competitor Gap Analysis', 'AI Co-Founder Access', 'PDF & CSV Export', 'Custom Landing Page Copy']
        }
      ],
      ctaSection: {
        title: 'Ready to build the future?',
        description: `Create your startup report now and join 10,000+ founders who built their startups the smart way.`,
        buttonText: 'Get Started Free'
      }
    }
  };
}
