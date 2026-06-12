import { Router } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import * as ProjectController from '../controllers/project.controller';

const router = Router();

// Middleware applied to all routes
router.use(ClerkExpressRequireAuth());

router.post('/demo', ProjectController.createDemoProject);
router.post('/', ProjectController.createProject);
router.get('/latest', ProjectController.getLatestProject);
router.get('/:id', ProjectController.getProjectById);

router.post('/:id/cofounder', ProjectController.chatWithCofounder);
router.post('/:id/digital-twin', ProjectController.generateDigitalTwin);
router.post('/:id/simulate', ProjectController.runSimulation);
router.post('/:id/pitch-deck', ProjectController.generatePitchDeck);
router.post('/:id/branding', ProjectController.generateBranding);

export default router;
