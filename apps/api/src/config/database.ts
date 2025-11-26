/**
 * PostgreSQL database connection
 */

import { Pool } from 'pg';

import { config } from './config';

/**
 * PostgreSQL connection pool
 */
export const db = new Pool({
  connectionString: config.databaseUrl,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

/**
 * Connect to the database and test connection
 */
export async function connectDatabase(): Promise<void> {
  try {
    const client = await db.connect();
    console.warn('📦 Connected to PostgreSQL database');
    client.release();
  } catch (error) {
    console.error('❌ Failed to connect to PostgreSQL:', error);
    throw error;
  }
}

/**
 * Close database connection pool
 */
export async function closeDatabase(): Promise<void> {
  await db.end();
  console.warn('📦 PostgreSQL connection pool closed');
}
