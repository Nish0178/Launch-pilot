export interface StartupScores {
  demand: number;
  competition: number;
  scalability: number;
  innovation: number;
  risk: number;
  overall: number;
}

export interface MarketResearch {
  size: string;
  overview: string;
  trends: string[];
  opportunities: string[];
  challenges: string[];
}

export interface Competitor {
  name: string;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  advantage: string;
}

export interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Persona {
  name: string;
  role: string;
  demographics: {
    age: string;
    income: string;
    location: string;
  };
  painPoints: string[];
  goals: string[];
}

export interface RoadmapPhase {
  title: string;
  duration: string;
  tasks: string[];
}

export interface Project {
  id: string;
  name: string;
  idea: string;
  industry: string;
  country: string;
  budget: string;
  businessModel: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  report?: {
    scores: StartupScores;
    marketResearch: MarketResearch;
    competitors: Competitor[];
    swot: SWOT;
    personas: Persona[];
    roadmap: RoadmapPhase[];
  };
}
