import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { config } from "../config/config.js";

const { Pool } = pkg;

// Create a single pool
const pool = new Pool({
  connectionString: config.dbConfig.url,
});

// Export a Drizzle instance for runtime usage
export const db = drizzle(pool);
