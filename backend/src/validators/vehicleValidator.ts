import { Vehicle, VehicleStatus } from '../types/Vehicle';
import { MAINTENANCE_LIMIT_PERCENTAGE } from '../config/constants';

export class VehicleValidator {
  static validateStatusChange(
    currentStatus: VehicleStatus, 
    newStatus: VehicleStatus
  ): string | null {
    if (currentStatus === VehicleStatus.Maintenance && 
        newStatus !== VehicleStatus.Available) {
      return 'A vehicle in maintenance can only move to Available status';
    }
    return null;
  }

  static validateDelete(vehicle: Vehicle): string | null {
    if (vehicle.status === VehicleStatus.InUse || 
        vehicle.status === VehicleStatus.Maintenance) {
      return `Cannot delete vehicle that is ${vehicle.status}`;
    }
    return null;
  }

  static validateMaintenanceLimit(
    allVehicles: Vehicle[], 
    newStatus: VehicleStatus, 
    currentVehicleId?: string
  ): string | null {
    if (newStatus !== VehicleStatus.Maintenance) return null;
    
    const maintenanceCount = allVehicles.filter(
      v => v.status === VehicleStatus.Maintenance && v.id !== currentVehicleId
    ).length;
    
    const maxAllowed = Math.ceil(allVehicles.length * MAINTENANCE_LIMIT_PERCENTAGE);
    
    if (maintenanceCount >= maxAllowed) {
      return `Maximum ${maxAllowed} vehicle(s) (5%) can be in maintenance at the same time`;
    }
    
    return null;
  }

  static validateLicensePlate(plate: string): string | null {
    if (!plate || plate.trim().length === 0) {
      return 'License plate is required';
    }
    if (plate.length < 3) {
      return 'License plate must be at least 3 characters';
    }
    return null;
  }
}