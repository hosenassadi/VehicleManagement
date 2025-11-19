import { VehicleRepository } from '../repositories/vehicleRepository';
import { VehicleValidator } from '../validators/vehicleValidator';
import { Vehicle, CreateVehicleDTO, UpdateVehicleDTO } from '../types/Vehicle';

export class VehicleService {
  constructor(private repository: VehicleRepository) {}

  async getAllVehicles(): Promise<Vehicle[]> {
    return await this.repository.findAll();
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    const vehicle = await this.repository.findById(id);
    if (!vehicle) throw new Error('Vehicle not found');
    return vehicle;
  }

  async createVehicle(data: CreateVehicleDTO): Promise<Vehicle> {
    const plateError = VehicleValidator.validateLicensePlate(data.licensePlate);
    if (plateError) throw new Error(plateError);

    if (data.status) {
      const allVehicles = await this.repository.findAll();
      const maintenanceError = VehicleValidator.validateMaintenanceLimit(
        allVehicles, 
        data.status
      );
      if (maintenanceError) throw new Error(maintenanceError);
    }

    return await this.repository.create(data);
  }

  async updateVehicle(id: string, data: UpdateVehicleDTO): Promise<Vehicle> {
    const vehicle = await this.getVehicleById(id);
    
    if (data.licensePlate) {
      const plateError = VehicleValidator.validateLicensePlate(data.licensePlate);
      if (plateError) throw new Error(plateError);
    }

    if (data.status) {
      const statusError = VehicleValidator.validateStatusChange(vehicle.status, data.status);
      if (statusError) throw new Error(statusError);

      const allVehicles = await this.repository.findAll();
      const maintenanceError = VehicleValidator.validateMaintenanceLimit(
        allVehicles, 
        data.status, 
        id
      );
      if (maintenanceError) throw new Error(maintenanceError);
    }

    const updated = await this.repository.update(id, data);
    if (!updated) throw new Error('Failed to update vehicle');
    return updated;
  }

  async deleteVehicle(id: string): Promise<void> {
    const vehicle = await this.getVehicleById(id);
    
    const deleteError = VehicleValidator.validateDelete(vehicle);
    if (deleteError) throw new Error(deleteError);

    const deleted = await this.repository.delete(id);
    if (!deleted) throw new Error('Failed to delete vehicle');
  }
}