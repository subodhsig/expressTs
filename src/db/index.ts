import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { databaseConfig } from "../config/database.js";
import * as schema from "./schemas/index.js";

const { Pool } = pkg;

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: databaseConfig.url,
  ...databaseConfig.poolConfig,
});

// Error handling
pool.on("error", (err: Error) => {
  console.error(" Unexpected error on idle PostgreSQL client", err);
  process.exit(-1);
});

pool.on("connect", () => {
  console.log("PostgreSQL client connected");
});

// Create Drizzle instance
export const db = drizzle(pool, { schema });

// Test connection function
export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("Database connection successful");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

// Graceful shutdown
export async function closeDatabase(): Promise<void> {
  await pool.end();
  console.log(" Database connection pool closed");
}

// Export pool and schema
export { pool };
export * from "./schemas/index.js";
