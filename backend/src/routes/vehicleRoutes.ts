import { Router } from 'express';
import { VehicleController } from '../controllers/vehicleController';
import { VehicleService } from '../services/vehicleService';
import { vehicleRepository } from '../repositories';

export const createVehicleRoutes = (): Router => {
  const router = Router();
  
  // Use the shared repository instance
  const service = new VehicleService(vehicleRepository);
  const controller = new VehicleController(service);

  router.get('/', controller.getAllVehicles);
  router.get('/:id', controller.getVehicleById);
  router.post('/', controller.createVehicle);
  router.put('/:id', controller.updateVehicle);
  router.delete('/:id', controller.deleteVehicle);

  return router;
};