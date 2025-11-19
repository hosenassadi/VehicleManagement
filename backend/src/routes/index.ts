import { Router } from 'express';
import { createVehicleRoutes } from './vehicleRoutes';

export const createRoutes = (): Router => {
  const router = Router();
  router.use('/vehicles', createVehicleRoutes());
  router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  return router;
};