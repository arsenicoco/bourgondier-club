import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create data directory if it doesn't exist
const dataDir = join(__dirname, '../../data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = join(dataDir, 'club.db');

export interface ClubMember {
  id?: number;
  name: string;
  email: string;
  created_at?: string;
}

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS club_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Database table initialized successfully');
      }
    });
  }

  public addMember(name: string, email: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO club_members (name, email) VALUES (?, ?)`;

      this.db.run(query, [name, email], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            reject(new Error('Email already exists'));
          } else {
            reject(err);
          }
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  public getAllMembers(): Promise<ClubMember[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM club_members ORDER BY created_at DESC`;

      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as ClubMember[]);
        }
      });
    });
  }

  public getMemberByEmail(email: string): Promise<ClubMember | null> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM club_members WHERE email = ?`;

      this.db.get(query, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve((row as ClubMember) || null);
        }
      });
    });
  }

  public close(): void {
    this.db.close();
  }
}

// Export a singleton instance
export const database = new Database();
