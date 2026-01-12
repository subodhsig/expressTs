import { defineConfig } from "drizzle-kit";
import { config } from "./src/config/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas/*.ts",
  out: "./drizzle",
  dbCredentials: {
    url: config.dbConfig.url!,
  },
  verbose: true,
  strict: true,
});
