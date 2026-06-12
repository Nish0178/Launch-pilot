"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const generator_1 = require("./generator");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 5000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Create project and run AI validation
app.post('/api/projects', async (req, res) => {
    try {
        const { name, idea, industry, country, budget, businessModel, userId } = req.body;
        const targetUserId = userId || 'temp-user-id';
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
                clerkId: 'clerk-' + targetUserId,
                email: 'guest@launchpilot.ai',
                name: 'Guest User',
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
        const reportData = await (0, generator_1.generateValidationReport)(name, idea, industry, country, budget, businessModel);
        // 4. Save validation report and update project status
        await prisma.validationReport.create({
            data: {
                projectId: project.id,
                scores: reportData.scores,
                marketResearch: reportData.marketResearch,
                competitors: reportData.competitors,
                swot: reportData.swot,
                personas: reportData.personas,
                businessModel: reportData.businessModel,
                gtmStrategy: reportData.gtmStrategy,
                roadmap: reportData.roadmap,
                investorReadiness: reportData.investorReadiness,
                businessPlan: reportData.businessPlan,
                landingPage: reportData.landingPage,
            },
        });
        project = await prisma.project.update({
            where: { id: project.id },
            data: { status: 'COMPLETED' },
            include: { validationReport: true },
        });
        res.status(201).json(project);
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create and validate project' });
    }
});
// Fetch latest validated project
app.get('/api/projects/latest', async (req, res) => {
    try {
        const project = await prisma.project.findFirst({
            orderBy: { createdAt: 'desc' },
            include: { validationReport: true },
        });
        if (!project) {
            res.status(404).json({ error: 'No projects found' });
            return;
        }
        res.json(project);
    }
    catch (error) {
        console.error('Error fetching latest project:', error);
        res.status(500).json({ error: 'Failed to fetch latest project' });
    }
});
// Fetch project by ID
app.get('/api/projects/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const project = await prisma.project.findUnique({
            where: { id },
            include: { validationReport: true },
        });
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.json(project);
    }
    catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});
// Chat with AI Co-Founder / Advisor
app.post('/api/projects/:id/cofounder', async (req, res) => {
    try {
        const id = req.params.id;
        const { messages, currentMessage } = req.body;
        const project = await prisma.project.findUnique({
            where: { id },
            include: { validationReport: true },
        });
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        const apiKey = process.env.GEMINI_API_KEY;
        const projectReport = project.validationReport;
        if (apiKey) {
            try {
                const historyPrompt = messages
                    .map((m) => `${m.role === 'user' ? 'User' : 'Co-Founder'}: ${m.content}`)
                    .join('\n');
                const prompt = `You are the AI Co-Founder and advisor for the startup project "${project.name}".
Startup Idea: "${project.idea}"
Industry: "${project.industry}"
Target Market: "${project.country}"
Budget: "${project.budget}"
Business Model: "${project.businessModel}"

Here is the chat history so far:
${historyPrompt}

User asks: "${currentMessage}"

Please reply in a conversational, helpful, and highly personalized tone as a co-founder and startup mentor (e.g. YC partner style). Provide actionable insights. Keep your response around 3-4 sentences.`;
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.7,
                        },
                    }),
                });
                if (response.ok) {
                    const result = await response.json();
                    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                        res.json({ content: text.trim() });
                        return;
                    }
                }
            }
            catch (geminiError) {
                console.error('Gemini chat failed, falling back to default responder', geminiError);
            }
        }
        // Default conversational responses tailored to the user query
        const q = currentMessage.toLowerCase();
        let responseText = `That's a very strategic question. For ${project.name}, since we are operating in the ${project.industry} space, we need to focus on building a very solid validation prototype. What specifically are you thinking about next?`;
        if (q.includes('price') || q.includes('pricing') || q.includes('cost')) {
            responseText = `Based on our ${project.businessModel} model, we should target a tiered approach. I suggest launching a Free tier to capture leads, a Pro tier at $19/mo for core workflows, and upselling custom reports. Our initial budget of ${project.budget} means we need to keep customer acquisition costs low.`;
        }
        else if (q.includes('risk') || q.includes('threat') || q.includes('fail')) {
            responseText = `The primary risk for ${project.name} is user adoption inertia. People are used to legacy ways of solving this. We can mitigate this by building a highly intuitive, self-serve onboarding flow and targeting Early Adopter segments first.`;
        }
        else if (q.includes('customer') || q.includes('user') || q.includes('acquire') || q.includes('get first')) {
            responseText = `To acquire our first 100 users for ${project.name}, we should launch a free SEO tool on ProductHunt and post in active builder communities. Cold outreach to startup mentors and accelerators in ${project.country} will also yield high-quality early leads.`;
        }
        else if (q.includes('build') || q.includes('mvp') || q.includes('should i')) {
            responseText = `You should absolutely build the MVP for ${project.name}, but keep it extremely lean. Focus solely on solving the primary pain point for our first user persona, Early Adopter Eric, before spending money on custom APIs or complex dashboards.`;
        }
        res.json({ content: responseText });
    }
    catch (error) {
        console.error('Error in cofounder chat:', error);
        res.status(500).json({ error: 'Failed to chat with Co-Founder' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map