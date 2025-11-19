import express, { Application } from 'express';
import { createRoutes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { corsMiddleware } from './middleware/cors';

export const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsMiddleware);
  app.use('/api', createRoutes());
  app.use(errorHandler);

  return app;
};