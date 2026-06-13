import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { AIService } from '../services/ai.service';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL?.replace('file:', '') || './dev.db';
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, idea, industry, country, budget, businessModel } = req.body;
    const targetUserId = req.auth.userId;

    if (!name || !idea || !industry || !country || !budget || !businessModel) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

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

    const reportData = await AIService.generateValidationReport(name, idea, industry, country, budget, businessModel);

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
};

export const getLatestProject = async (req: Request, res: Response): Promise<void> => {
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
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
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
};

export const chatWithCofounder = async (req: Request, res: Response): Promise<void> => {
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

    const response = await AIService.chatWithFounderBoardroom(
      project.name,
      project.idea,
      project.industry,
      project.country,
      project.budget,
      project.businessModel,
      project.validationReport,
      messages || [],
      currentMessage
    );

    res.json({ content: response });
  } catch (error) {
    console.error('Error in cofounder chat:', error);
    res.status(500).json({ error: 'Failed to chat with Co-Founder' });
  }
};

export const generateDigitalTwin = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findUnique({ where: { id, userId: req.auth.userId }, include: { validationReport: true } });
    if (!project || !project.validationReport) { res.status(404).json({ error: 'Not found' }); return; }

    const report = project.validationReport;
    if (report.digitalTwin) {
      res.json(report.digitalTwin);
      return;
    }

    const digitalTwin = await AIService.generateDigitalTwin(
      project.name,
      project.idea,
      project.industry,
      project.businessModel,
      project.country,
      report
    );

    await prisma.validationReport.update({
      where: { projectId: id },
      data: { digitalTwin: digitalTwin as any }
    });

    res.json(digitalTwin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate digital twin' });
  }
};

export const runSimulation = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { pricing, market, segment } = req.body;
    
    const project = await prisma.project.findUnique({ where: { id, userId: req.auth.userId }, include: { validationReport: true } });
    if (!project || !project.validationReport) { res.status(404).json({ error: 'Not found' }); return; }
    
    const report = project.validationReport as any;
    const originalScore = report.scores?.overall || 80;

    const simulationResult = await AIService.runSimulation(
      project.name,
      project.idea,
      originalScore,
      pricing,
      market,
      segment,
      project.country,
      report
    );

    res.json(simulationResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to run simulation' });
  }
};

export const generatePitchDeck = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findUnique({ where: { id, userId: req.auth.userId }, include: { validationReport: true } });
    if (!project || !project.validationReport) { res.status(404).json({ error: 'Not found' }); return; }

    const report = project.validationReport;
    if (report.pitchDeck) { res.json(report.pitchDeck); return; }

    const pitchDeck = await AIService.generatePitchDeck(project.name, project.idea, project.country, report);

    await prisma.validationReport.update({ where: { projectId: id }, data: { pitchDeck: pitchDeck as any } });
    res.json(pitchDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate pitch deck' });
  }
};

export const generateBranding = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findUnique({ where: { id, userId: req.auth.userId }, include: { validationReport: true } });
    if (!project || !project.validationReport) { res.status(404).json({ error: 'Not found' }); return; }

    const report = project.validationReport;
    if (report.branding) { res.json(report.branding); return; }

    const branding = await AIService.generateBranding(project.name, project.idea, project.industry, project.country);

    await prisma.validationReport.update({ where: { projectId: id }, data: { branding: branding as any } });
    res.json(branding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate branding' });
  }
};

export const createDemoProject = async (req: Request, res: Response): Promise<void> => {
    // Keep the existing demo generation for Hackathon backup purposes, but minimal implementation
    res.status(501).json({ error: 'Demo generation disabled, please use main validation endpoint.' });
};
