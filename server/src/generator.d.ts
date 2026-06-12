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
export declare function generateValidationReport(name: string, idea: string, industry: string, country: string, budget: string, businessModel: string): Promise<ValidationReportData>;
//# sourceMappingURL=generator.d.ts.map