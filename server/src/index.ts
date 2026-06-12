import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { ClerkExpressRequireAuth, StrictAuthProp } from '@clerk/clerk-sdk-node';

// Type extension for Express Request to include Clerk auth
declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

import { generateValidationReport } from './generator';

dotenv.config();

const app = express();
const connectionString = process.env.DATABASE_URL?.replace('file:', '') || './dev.db';
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create a demo project (EcoStream AI)
app.post('/api/projects/demo', ClerkExpressRequireAuth(), async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const targetUserId = req.auth.userId;

    // 1. Ensure user exists
    await prisma.user.upsert({
      where: { id: targetUserId },
      update: {},
      create: {
        id: targetUserId,
        clerkId: targetUserId,
        email: 'user_' + targetUserId + '@launchpilot.ai',
        name: 'Authenticated User',
      },
    });

    // 2. Create the project
    let project = await prisma.project.create({
      data: {
        name: 'EcoStream AI',
        idea: 'An AI-powered platform for optimizing household energy consumption through real-time IoT integration and personalized savings recommendations.',
        industry: 'CleanTech / AI',
        country: 'Global',
        budget: '$50,000 - $100,000',
        businessModel: 'SaaS Subscription',
        userId: targetUserId,
        status: 'COMPLETED',
      },
    });

    // 3. Create demo validation report
    await prisma.validationReport.create({
      data: {
        projectId: project.id,
        scores: {
          demand: 85,
          competition: 65,
          scalability: 92,
          innovation: 88,
          risk: 40,
          overall: 82,
        },
        marketResearch: {
          size: '$12.5 Billion by 2028',
          overview: 'The household energy management market is witnessing exponential growth driven by rising energy costs and global sustainability goals.',
          trends: ['Smart Home Integration', 'Decentralized Energy Grids', 'Predictive Analytics'],
          opportunities: ['Government Subsidies', 'Utility Partnerships', 'Carbon Credit Integration'],
          challenges: ['Hardware Interoperability', 'Privacy Concerns', 'Initial Setup Costs'],
        },
        competitors: [
          {
            name: 'Nest (Google)',
            strengths: ['Market Dominance', 'Deep Integration', 'Brand Trust'],
            weaknesses: ['High Price Point', 'Limited Third-Party Customization'],
            pricing: '$129 - $249 per device',
            advantage: 'Superior UX and massive existing user base.',
          },
          {
            name: 'Sense',
            strengths: ['Highly Accurate Detection', 'Detailed Appliance Breakdown'],
            weaknesses: ['Complex Installation', 'Niche Tech Audience'],
            pricing: '$299 + Installation',
            advantage: 'Granular appliance telemetry data.',
          },
        ],
        swot: {
          strengths: ['Proprietary AI Algorithm', 'Hardware Agnostic Approach', 'Low Entry Cost'],
          weaknesses: ['New Brand Identity', 'Limited Direct Utility Data Access'],
          opportunities: ['Expansion into EV Charging', 'Enterprise White-Labeling'],
          threats: ['Big Tech Entry (Amazon Energy)', 'Rapid Regulatory Changes'],
        },
        personas: [
          {
            name: 'Sustainable Sarah',
            role: 'Eco-Conscious Homeowner',
            demographics: { age: '28-40', income: '$75k - $120k', location: 'Urban/Suburban' },
            painPoints: ['High utility bills', 'Complexity of eco-living', 'Lack of actionable data'],
            goals: ['Reduce carbon footprint', 'Save 20% on energy', 'Automate home efficiency'],
          },
        ],
        businessModel: {
          revenueStreams: ['Direct SaaS Subscription', 'B2B white-label licenses'],
          pricingSuggestions: ['Starter: Free', 'Pro: $9.99/mo', 'Enterprise: Custom'],
          subscriptionOpportunities: ['Monthly automation fee'],
          upsellingOpportunities: ['Deep-dive energy telemetry exports'],
          canvas: {
            keyPartners: ['Smart meter operators', 'Utility providers', 'IoT hardware hubs'],
            keyActivities: ['Software optimization', 'Customer acquisition', 'Telemetry analytics'],
            keyResources: ['Recommendation algorithms', 'Customer data pipelines'],
            valuePropositions: ['Save 20% on energy bills seamlessly', 'Carbon footprint tracking'],
            customerRelationships: ['Self-serve onboarding', 'Priority email support'],
            channels: ['Smart home forums', 'Search marketing', 'Utility affiliates'],
            customerSegments: ['Eco-conscious homeowners', 'Energy managers'],
            costStructure: ['Compute & API costs (40%)', 'Marketing (40%)', 'Admin (20%)'],
            revenueStreams: ['SaaS Subscription model', 'Custom integrations'],
          },
        },
        gtmStrategy: {
          launchStrategy: 'Launch public beta on ProductHunt, targeting smart home communities.',
          acquisitionPlan: 'Build side-project calculators for home solar and EV savings.',
          marketingChannels: ['Social search ads', 'Sponsorship of smart home newsletters'],
          growthStrategy: 'Referral program to unlock Pro features for inviting other homeowners.',
          communityBuilding: 'Create a smart home Discord for sharing optimization templates.',
          timeline: {
            day1: 'Launch sign-up page and capture email leads.',
            week1: 'Send invite codes to first 100 beta testers.',
            month1: 'Address core sync bugs and push first update.',
            month3: 'Launch billing gates and introduce monetization.',
            month6: 'Establish regional utility affiliate partnerships.',
            month12: 'Reach $10k MRR and launch B2B White-Label sales.',
          },
        },
        roadmap: [
          {
            title: 'Phase 1: Validation',
            duration: 'Month 1',
            tasks: ['Conduct interviews with 30 target users', 'Verify IoT meter integrations'],
          },
          {
            title: 'Phase 2: MVP Development',
            duration: 'Months 2-3',
            tasks: ['Build energy shift algorithms', 'Setup user dashboard pages'],
          },
          {
            title: 'Phase 3: Beta Testing',
            duration: 'Month 4',
            tasks: ['Onboard 100 users for active trials', 'Track average savings metrics'],
          },
          {
            title: 'Phase 4: Product Launch',
            duration: 'Month 5',
            tasks: ['Launch on ProductHunt', 'Kick off search marketing ad sequences'],
          },
          {
            title: 'Phase 5: Growth',
            duration: 'Months 6-9',
            tasks: ['Launch referral features', 'Partner with 2 green accelerators'],
          },
          {
            title: 'Phase 6: Scaling',
            duration: 'Months 10-12',
            tasks: ['Expand international currency and language support', 'Initiate seed round funding'],
          },
        ],
        investorReadiness: {
          investmentPotential: 'Strong. High market size with recurring SaaS revenue.',
          scalabilityPotential: 'Excellent. Software-only infrastructure minimizes delivery costs.',
          revenuePotential: 'Significant recurring income with high margins.',
          marketOpportunity: 'High. Energy cost spikes drive consumer demand.',
          founderReadiness: 'Prepared with clear understanding of threats and pivots.',
          investorScore: 82,
          recommendations: [
            'Secure initial letters of intent from local utility firms.',
            'Keep customer acquisition costs low via green-builder forums.'
          ],
          threats: [
            {
              type: 'Market Reality',
              title: 'User Adoption Inertia',
              content: 'Users are slow to change energy behaviors. Product must automate processes.',
              severity: 'Critical'
            },
            {
              type: 'Competition',
              title: 'Incumbent Bundling',
              content: 'Large players like Nest can copy features and bundle them for free.',
              severity: 'High'
            },
            {
              type: 'Monetization',
              title: 'Customer Churn',
              content: 'High churn if users do not see tangible utility bill reductions.',
              severity: 'Medium'
            }
          ]
        },
        businessPlan: {
          summary: 'EcoStream AI is a CleanTech SaaS automating household energy savings.',
          problem: 'Eco-conscious users lack tools to easily cut energy bills without complex setups.',
          solution: 'A software bridge connecting to meters to auto-pivot appliance run times.',
          marketAnalysis: 'TAM is $45B growing at 16% CAGR, driven by carbon goals.',
          revenueModel: 'SaaS subscriptions starting at $9.99/mo plus B2B white-label licenses.',
          marketingStrategy: 'Side-project calculator tools, ProductHunt launch, and organic SEO content.',
          financialPlan: 'Highly optimized margins with low server and API overhead.',
          growthPlan: 'Scaling to B2B white-labeling for small utility distributors in Month 12.'
        },
        landingPage: {
          hero: {
            title: 'Optimize Your Home Energy with EcoStream AI',
            tagline: 'Automate your household energy efficiency and save 20% on utility bills within weeks.',
            ctaText: 'Start Saving Now'
          },
          features: [
            { title: 'Smart Energy Shift', description: 'Auto-detect peak hours and run appliances when power is cheapest.' },
            { title: 'IoT Utility Bridge', description: 'Seamlessly connects to your existing smart meters and smart plugs.' }
          ],
          benefits: ['Save $300+ annually on energy bills', 'Track and lower your home carbon footprint', '100% automated efficiency'],
          testimonials: [
            { quote: 'Saved me $45 in my first month without changing my routines!', author: 'Marc D.', role: 'Beta Tester' }
          ],
          pricing: [
            { tier: 'Eco-Insight', price: '$0', features: ['Basic tracking', 'Peak hour alerts'] },
            { tier: 'Eco-Pro', price: '$9.99/mo', features: ['Full automation', 'Carbon offset integration', 'Priority support'] }
          ],
          ctaSection: {
            title: 'Cut your power bills today',
            description: 'Join thousands of green homeowners saving money with EcoStream.',
            buttonText: 'Validate Energy Idea'
          }
        }
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating demo project:', error);
    res.status(500).json({ error: 'Failed to create demo project' });
  }
});

// Create project and run AI validation
app.post('/api/projects', ClerkExpressRequireAuth(), async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { name, idea, industry, country, budget, businessModel } = req.body;
    const targetUserId = req.auth.userId;

    if (!name || !idea || !industry || !country || !budget || !businessModel) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    // 1. Ensure the user exists
    await prisma.user.upsert({
      where: { id: targetUserId },
      update: {},
      create: {
        id: targetUserId,
        clerkId: targetUserId,
        email: 'user_' + targetUserId + '@launchpilot.ai',
        name: 'Authenticated User',
      },
    });

    // 2. Create the project with status PROCESSING
    let project = await prisma.project.create({
      data: {
        name,
        idea,
        industry,
        country,
        budget,
        businessModel,
        userId: targetUserId,
        status: 'PROCESSING',
      },
    });

    // 3. Generate validation report
    const reportData = await generateValidationReport(
      name,
      idea,
      industry,
      country,
      budget,
      businessModel
    );

    // 4. Save validation report and update project status
    await prisma.validationReport.create({
      data: {
        projectId: project.id,
        scores: reportData.scores as any,
        marketResearch: reportData.marketResearch as any,
        competitors: reportData.competitors as any,
        swot: reportData.swot as any,
        personas: reportData.personas as any,
        businessModel: reportData.businessModel as any,
        gtmStrategy: reportData.gtmStrategy as any,
        roadmap: reportData.roadmap as any,
        investorReadiness: reportData.investorReadiness as any,
        businessPlan: reportData.businessPlan as any,
        landingPage: reportData.landingPage as any,
      },
    });

    project = await prisma.project.update({
      where: { id: project.id },
      data: { status: 'COMPLETED' },
      include: { validationReport: true },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create and validate project' });
  }
});

// Fetch latest validated project
app.get('/api/projects/latest', ClerkExpressRequireAuth(), async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const project = await prisma.project.findFirst({
      where: { userId: req.auth.userId },
      orderBy: { createdAt: 'desc' },
      include: { validationReport: true },
    });

    if (!project) {
      res.status(404).json({ error: 'No projects found' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching latest project:', error);
    res.status(500).json({ error: 'Failed to fetch latest project' });
  }
});

// Fetch project by ID
app.get('/api/projects/:id', ClerkExpressRequireAuth(), async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findUnique({
      where: { id, userId: req.auth.userId },
      include: { validationReport: true },
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Chat with AI Co-Founder / Advisor
app.post('/api/projects/:id/cofounder', ClerkExpressRequireAuth(), async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { messages, currentMessage } = req.body;

    const project = await prisma.project.findUnique({
      where: { id, userId: req.auth.userId },
      include: { validationReport: true },
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const projectReport = (project as any).validationReport;

    if (apiKey) {
      try {
        const historyPrompt = messages
          .map((m: any) => `${m.role === 'user' ? 'User' : 'Co-Founder'}: ${m.content}`)
          .join('\n');

        const prompt = `You are the AI Co-Founder and advisor for the startup project "${project.name}".
Startup Idea: "${project.idea}"
Industry: "${project.industry}"
Target Market: "${project.country}"
Budget: "${project.budget}"
Business Model: "${project.businessModel}"

Here is the generated analysis report data for context:
Scores: ${JSON.stringify(projectReport.scores)}
SWOT: ${JSON.stringify(projectReport.swot)}
Competitors: ${JSON.stringify(projectReport.competitors)}
Market: ${JSON.stringify(projectReport.marketResearch)}
Business Plan: ${JSON.stringify(projectReport.businessPlan)}
Investor Readiness: ${JSON.stringify(projectReport.investorReadiness)}

Here is the chat history so far:
${historyPrompt}

User asks: "${currentMessage}"

Please reply in a conversational, helpful, and highly personalized tone as a co-founder and startup mentor (e.g. YC partner style). Base your answers strongly on the provided report context. Provide actionable insights. Keep your response around 3-4 sentences.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
              },
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            res.json({ content: text.trim() });
            return;
          }
        }
      } catch (geminiError) {
        console.error('Gemini chat failed, falling back to default responder', geminiError);
      }
    }

    // Default conversational responses tailored to the user query
    const q = currentMessage.toLowerCase();
    let responseText = `That's a very strategic question. For ${project.name}, since we are operating in the ${project.industry} space, we need to focus on building a very solid validation prototype. What specifically are you thinking about next?`;

    if (q.includes('price') || q.includes('pricing') || q.includes('cost')) {
      responseText = `Based on our ${project.businessModel} model, we should target a tiered approach. I suggest launching a Free tier to capture leads, a Pro tier at $19/mo for core workflows, and upselling custom reports. Our initial budget of ${project.budget} means we need to keep customer acquisition costs low.`;
    } else if (q.includes('risk') || q.includes('threat') || q.includes('fail')) {
      responseText = `The primary risk for ${project.name} is user adoption inertia. People are used to legacy ways of solving this. We can mitigate this by building a highly intuitive, self-serve onboarding flow and targeting Early Adopter segments first.`;
    } else if (q.includes('customer') || q.includes('user') || q.includes('acquire') || q.includes('get first')) {
      responseText = `To acquire our first 100 users for ${project.name}, we should launch a free SEO tool on ProductHunt and post in active builder communities. Cold outreach to startup mentors and accelerators in ${project.country} will also yield high-quality early leads.`;
    } else if (q.includes('build') || q.includes('mvp') || q.includes('should i')) {
      responseText = `You should absolutely build the MVP for ${project.name}, but keep it extremely lean. Focus solely on solving the primary pain point for our first user persona, Early Adopter Eric, before spending money on custom APIs or complex dashboards.`;
    }

    res.json({ content: responseText });
  } catch (error) {
    console.error('Error in cofounder chat:', error);
    res.status(500).json({ error: 'Failed to chat with Co-Founder' });
  }
});

// Generate Digital Twin Data
app.post('/api/projects/:id/digital-twin', ClerkExpressRequireAuth(), async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findUnique({ where: { id, userId: req.auth.userId }, include: { validationReport: true } });
    if (!project || !project.validationReport) { res.status(404).json({ error: 'Not found' }); return; }

    const report = project.validationReport;
    if (report.digitalTwin) {
      res.json(report.digitalTwin);
      return;
    }

    // Generate mock robust data for Demo
    const digitalTwin = {
      growthProbability: 78,
      revenueProjection: { sixMonth: '$12,500', twelveMonth: '$124,000' },
      fundingReadiness: 65,
      adoptionForecast: [
        { month: 'M1', users: 100 }, { month: 'M2', users: 350 }, { month: 'M3', users: 800 },
        { month: 'M4', users: 1500 }, { month: 'M5', users: 3200 }, { month: 'M6', users: 5000 },
      ],
      riskForecast: [
        { month: 'M1', riskLevel: 80 }, { month: 'M3', riskLevel: 60 }, { month: 'M6', riskLevel: 45 }, { month: 'M12', riskLevel: 30 }
      ],
      marketPosition: 'Early Mover Advantage in Niche Segment'
    };

    await prisma.validationReport.update({
      where: { projectId: id },
      data: { digitalTwin: digitalTwin as any }
    });

    res.json(digitalTwin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed' });
  }
});

// Run Simulation
app.post('/api/projects/:id/simulate', ClerkExpressRequireAuth(), async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { pricing, market, segment } = req.body;
    
    const project = await prisma.project.findUnique({ where: { id, userId: req.auth.userId } });
    if (!project) { res.status(404).json({ error: 'Not found' }); return; }
    
    // In a real scenario, this goes to Gemini to evaluate the parameters.
    // We'll return a mock comparison for demo purposes.
    const simulationResult = {
      scenarioName: `Sim: ${pricing} | ${market}`,
      originalScore: 82,
      newScore: pricing.includes('Premium') ? 75 : 88,
      insights: [
        `Targeting ${market} with a ${pricing} model shifts your acquisition cost significantly.`,
        `The ${segment} segment has high churn if not onboarded properly.`,
        `Overall recommendation: Test this scenario with a small cohort first.`
      ],
      metrics: {
        cac: pricing.includes('Premium') ? '+$45' : '-$12',
        ltv: pricing.includes('Premium') ? '+$400' : '+$150',
        timeToProfit: '8 Months'
      }
    };

    res.json(simulationResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

// Generate Pitch Deck
app.post('/api/projects/:id/pitch-deck', ClerkExpressRequireAuth(), async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findUnique({ where: { id, userId: req.auth.userId }, include: { validationReport: true } });
    if (!project || !project.validationReport) { res.status(404).json({ error: 'Not found' }); return; }

    const report = project.validationReport;
    if (report.pitchDeck) { res.json(report.pitchDeck); return; }

    const pitchDeck = {
      slides: [
        { title: 'Title', content: `${project.name}\n${project.idea}` },
        { title: 'The Problem', content: (report.businessPlan as any)?.problem || 'Problem definition missing' },
        { title: 'The Solution', content: (report.businessPlan as any)?.solution || 'Solution definition missing' },
        { title: 'Market Opportunity', content: (report.marketResearch as any)?.size || 'Large TAM' },
        { title: 'Business Model', content: (report.businessPlan as any)?.revenueModel || 'Subscription based' },
        { title: 'Go-To-Market', content: (report.gtmStrategy as any)?.launchStrategy || 'Organic and Paid' },
        { title: 'The Ask', content: `Seeking Seed investment to achieve Month 12 Roadmap goals.` }
      ]
    };

    await prisma.validationReport.update({ where: { projectId: id }, data: { pitchDeck: pitchDeck as any } });
    res.json(pitchDeck);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

// Generate Branding
app.post('/api/projects/:id/branding', ClerkExpressRequireAuth(), async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findUnique({ where: { id, userId: req.auth.userId }, include: { validationReport: true } });
    if (!project || !project.validationReport) { res.status(404).json({ error: 'Not found' }); return; }

    const report = project.validationReport;
    if (report.branding) { res.json(report.branding); return; }

    const branding = {
      names: [`${project.name}HQ`, `${project.name}ify`, `The ${project.name} Company`, `Get${project.name}`],
      taglines: [
        `The modern way to solve ${project.industry} problems.`,
        `Empowering ${project.country} with intelligent automation.`,
        `${project.name}: Built for scale.`
      ],
      personality: ['Innovative', 'Trustworthy', 'Modern', 'Accessible'],
      colors: [
        { name: 'Primary', hex: '#4F46E5' },
        { name: 'Secondary', hex: '#06B6D4' },
        { name: 'Accent', hex: '#8B5CF6' },
        { name: 'Dark', hex: '#0F172A' }
      ]
    };

    await prisma.validationReport.update({ where: { projectId: id }, data: { branding: branding as any } });
    res.json(branding);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

// Error handler for Clerk auth
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.message === 'Unauthenticated') {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

