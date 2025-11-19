export enum VehicleStatus {
    Available = 'Available',
    InUse = 'InUse',
    Maintenance = 'Maintenance'
  }
  
  export interface Vehicle {
    id: string;
    licensePlate: string;
    status: VehicleStatus;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CreateVehicleDTO {
    licensePlate: string;
    status?: VehicleStatus;
  }
  
  export interface UpdateVehicleDTO {
    licensePlate?: string;
    status?: VehicleStatus;
  }