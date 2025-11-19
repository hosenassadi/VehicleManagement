import { VehicleRepository } from './vehicleRepository';

// Singleton instance - shared across the entire application
export const vehicleRepository = new VehicleRepository();

// Seed function to initialize data
export const seedDatabase = async () => {
  await vehicleRepository.seed();
  console.log('✅ Database seeded with initial data');
};