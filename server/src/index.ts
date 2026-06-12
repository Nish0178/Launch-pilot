import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { StrictAuthProp } from '@clerk/clerk-sdk-node';

// Type extension for Express Request to include Clerk auth
declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

import projectRoutes from './routes/project.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Use routes
app.use('/api/projects', projectRoutes);

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
