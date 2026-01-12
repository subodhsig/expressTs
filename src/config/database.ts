import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  url: string;
  poolConfig: {
    max: number;
    idleTimeoutMillis: number;
    connectionTimeoutMillis: number;
  };
}

export const databaseConfig: DatabaseConfig = {
  url: process.env.DATABASE_URL || "",
  poolConfig: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
};

export const appConfig = {
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
};
