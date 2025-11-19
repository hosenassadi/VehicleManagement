import { db } from '../config/database';
import { Vehicle, CreateVehicleDTO, UpdateVehicleDTO, VehicleStatus } from '../types/Vehicle';

export class VehicleRepository {
  
  async findAll(): Promise<Vehicle[]> {
    const query = 'SELECT * FROM vehicles ORDER BY created_at DESC';
    const rows = db.prepare(query).all();
    
    return rows.map(this.mapRowToVehicle);
  }

  async findById(id: string): Promise<Vehicle | null> {
    const query = 'SELECT * FROM vehicles WHERE id = ?';
    const row = db.prepare(query).get(id);
    
    if (!row) return null;
    return this.mapRowToVehicle(row);
  }

  async create(data: CreateVehicleDTO): Promise<Vehicle> {
    const id = Date.now().toString();
    const now = new Date().toISOString();
    
    const query = `
      INSERT INTO vehicles (id, license_plate, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.prepare(query).run(
      id,
      data.licensePlate,
      data.status || VehicleStatus.Available,
      now,
      now
    );
    
    return {
      id,
      licensePlate: data.licensePlate,
      status: data.status || VehicleStatus.Available,
      createdAt: new Date(now),
      updatedAt: new Date(now)
    };
  }

  async update(id: string, data: UpdateVehicleDTO): Promise<Vehicle | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updates: string[] = [];
    const params: any[] = [];

    if (data.licensePlate !== undefined) {
      updates.push('license_plate = ?');
      params.push(data.licensePlate);
    }

    if (data.status !== undefined) {
      updates.push('status = ?');
      params.push(data.status);
    }

    updates.push('updated_at = ?');
    params.push(new Date().toISOString());

    params.push(id); 

    const query = `
      UPDATE vehicles 
      SET ${updates.join(', ')}
      WHERE id = ?
    `;

    db.prepare(query).run(...params);

    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM vehicles WHERE id = ?';
    const result = db.prepare(query).run(id);
    
    return result.changes > 0;
  }

  async deleteAll(): Promise<void> {
    db.prepare('DELETE FROM vehicles').run();
  }

  
  async seed(): Promise<void> {
    const count = db.prepare('SELECT COUNT(*) as count FROM vehicles').get() as any;
    
    if (count.count > 0) {
      console.log('⏭️  Database already has data, skipping seed');
      return;
    }

    const seedData = [
      { licensePlate: 'ABC-1234', status: VehicleStatus.Available },
      { licensePlate: 'XYZ-5678', status: VehicleStatus.InUse },
      { licensePlate: 'DEF-9012', status: VehicleStatus.Maintenance },
      { licensePlate: 'GHI-3456', status: VehicleStatus.Available },
      { licensePlate: 'JKL-7890', status: VehicleStatus.Available }
    ];

    for (const data of seedData) {
      await this.create(data);
    }

    console.log(`✅ Seeded ${seedData.length} vehicles into database`);
  }

  private mapRowToVehicle(row: any): Vehicle {
    return {
      id: row.id,
      licensePlate: row.license_plate,
      status: row.status as VehicleStatus,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
}