import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicleService';
import { HTTP_STATUS } from '../config/constants';

export class VehicleController {
  constructor(private service: VehicleService) {}

  getAllVehicles = async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicles = await this.service.getAllVehicles();
      res.json({ success: true, data: vehicles });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: 'Failed to fetch vehicles'
      });
    }
  };

  getVehicleById = async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicle = await this.service.getVehicleById(req.params.id);
      res.json({ success: true, data: vehicle });
    } catch (error: any) {
      const status = error.message === 'Vehicle not found' 
        ? HTTP_STATUS.NOT_FOUND 
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;
      res.status(status).json({ success: false, error: error.message });
    }
  };

  createVehicle = async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicle = await this.service.createVehicle(req.body);
      res.status(HTTP_STATUS.CREATED).json({ success: true, data: vehicle });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: error.message
      });
    }
  };

  updateVehicle = async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicle = await this.service.updateVehicle(req.params.id, req.body);
      res.json({ success: true, data: vehicle });
    } catch (error: any) {
      const status = error.message === 'Vehicle not found' 
        ? HTTP_STATUS.NOT_FOUND 
        : HTTP_STATUS.BAD_REQUEST;
      res.status(status).json({ success: false, error: error.message });
    }
  };

  deleteVehicle = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.deleteVehicle(req.params.id);
      res.json({ success: true, message: 'Vehicle deleted successfully' });
    } catch (error: any) {
      const status = error.message === 'Vehicle not found' 
        ? HTTP_STATUS.NOT_FOUND 
        : HTTP_STATUS.BAD_REQUEST;
      res.status(status).json({ success: false, error: error.message });
    }
  };
}