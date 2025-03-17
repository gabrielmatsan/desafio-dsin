import { defineConfig } from "drizzle-kit";
import { env } from "./src/env/env";
import "dotenv/config";

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
