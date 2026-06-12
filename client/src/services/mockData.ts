import { Project } from "../types";

export const MOCK_PROJECT: Project = {
  id: "proj_123",
  name: "EcoStream AI",
  idea: "An AI-powered platform for optimizing household energy consumption through real-time IoT integration and personalized savings recommendations.",
  industry: "CleanTech / AI",
  country: "Global",
  budget: "$50,000 - $100,000",
  businessModel: "SaaS Subscription",
  status: "COMPLETED",
  report: {
    scores: {
      demand: 85,
      competition: 65,
      scalability: 92,
      innovation: 88,
      risk: 40,
      overall: 82
    },
    marketResearch: {
      size: "$12.5 Billion by 2028",
      overview: "The household energy management market is witnessing exponential growth driven by rising energy costs and global sustainability goals.",
      trends: ["Smart Home Integration", "Decentralized Energy Grids", "Predictive Analytics"],
      opportunities: ["Government Subsidies", "Utility Partnerships", "Carbon Credit Integration"],
      challenges: ["Hardware Interoperability", "Privacy Concerns", "Initial Setup Costs"]
    },
    competitors: [
      {
        name: "Nest (Google)",
        strengths: ["Market Dominance", "Deep Integration", "Brand Trust"],
        weaknesses: ["High Price Point", "Limited Third-Party Customization"],
        pricing: "$129 - $249 per device",
        advantage: "Superior UX and massive existing user base."
      },
      {
        name: "Sense",
        strengths: ["Highly Accurate Detection", "Detailed Appliance Breakdown"],
        weaknesses: ["Complex Installation", "Niche Tech Audience"],
        pricing: "$299 + Installation",
        advantage: "Most granular data insights in the market."
      }
    ],
    swot: {
      strengths: ["Proprietary AI Algorithm", "Hardware Agnostic Approach", "Low Entry Cost"],
      weaknesses: ["New Brand Identity", "Limited Direct Utility Data Access"],
      opportunities: ["Expansion into EV Charging", "Enterprise White-Labeling"],
      threats: ["Big Tech Entry (Amazon Energy)", "Rapid Regulatory Changes"]
    },
    personas: [
      {
        name: "Sustainable Sarah",
        role: "Eco-Conscious Homeowner",
        demographics: { age: "28-40", income: "$75k - $120k", location: "Urban/Suburban" },
        painPoints: ["High utility bills", "Complexity of eco-living", "Lack of actionable data"],
        goals: ["Reduce carbon footprint", "Save 20% on energy", "Automate home efficiency"]
      }
    ],
    roadmap: [
      {
        title: "Validation & Prototype",
        duration: "Month 1-2",
        tasks: ["Beta testing with 50 homes", "AI algorithm refinement", "Seed funding pitch"]
      },
      {
        title: "MVP Development",
        duration: "Month 3-5",
        tasks: ["Mobile app launch", "IoT bridge hardware V1", "First utility partnership"]
      }
    ]
  }
};
