import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../data/vehicles.db');
export const db = new Database(dbPath);

db.pragma('foreign_keys = ON');


export const initializeDatabase = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      license_plate TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL CHECK(status IN ('Available', 'InUse', 'Maintenance')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `;

  db.exec(createTableQuery);
  console.log('✅ Database table initialized');
};


export const closeDatabase = () => {
  db.close();
};