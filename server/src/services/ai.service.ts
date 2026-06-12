import { callGemini } from '../utils/gemini';
import { buildStartupAnalysisPrompt } from '../prompts/startupAnalysisPrompt';
import { buildFounderBoardroomPrompt } from '../prompts/founderBoardroomPrompt';
import { buildDigitalTwinPrompt } from '../prompts/digitalTwinPrompt';
import { buildSimulationLabPrompt } from '../prompts/simulationLabPrompt';
import { buildPitchDeckPrompt } from '../prompts/pitchDeckPrompt';
import { buildBrandingPrompt } from '../prompts/brandingPrompt';

export class AIService {
  static async generateValidationReport(
    name: string,
    idea: string,
    industry: string,
    country: string,
    budget: string,
    businessModel: string
  ) {
    const prompt = buildStartupAnalysisPrompt(name, idea, industry, country, budget, businessModel);
    return callGemini(prompt, 0.2, true);
  }

  static async chatWithFounderBoardroom(
    projectName: string,
    idea: string,
    industry: string,
    country: string,
    budget: string,
    businessModel: string,
    reportData: any,
    messages: any[],
    currentMessage: string
  ) {
    const history = messages
      .map((m: any) => `${m.role === 'user' ? 'User' : 'Co-Founder'}: ${m.content}`)
      .join('\n');
      
    const prompt = buildFounderBoardroomPrompt(
      projectName,
      idea,
      industry,
      country,
      budget,
      businessModel,
      JSON.stringify(reportData),
      history,
      currentMessage
    );
    
    const response = await callGemini(prompt, 0.7, false);
    return response;
  }

  static async generateDigitalTwin(
    name: string,
    idea: string,
    industry: string,
    businessModel: string,
    country: string,
    reportData: any
  ) {
    const prompt = buildDigitalTwinPrompt(name, idea, industry, businessModel, country, JSON.stringify(reportData));
    return callGemini(prompt, 0.5, true);
  }

  static async runSimulation(
    name: string,
    idea: string,
    originalScore: number,
    pricingVariable: string,
    marketVariable: string,
    segmentVariable: string,
    country: string,
    reportData: any
  ) {
    const prompt = buildSimulationLabPrompt(
      name,
      idea,
      originalScore,
      pricingVariable,
      marketVariable,
      segmentVariable,
      country,
      JSON.stringify(reportData)
    );
    return callGemini(prompt, 0.5, true);
  }

  static async generatePitchDeck(name: string, idea: string, country: string, reportData: any) {
    const prompt = buildPitchDeckPrompt(name, idea, country, JSON.stringify(reportData));
    return callGemini(prompt, 0.5, true);
  }

  static async generateBranding(name: string, idea: string, industry: string, country: string) {
    const prompt = buildBrandingPrompt(name, idea, industry, country);
    return callGemini(prompt, 0.6, true);
  }
}
