import z from "zod";
import "dotenv/config";

/*
 * Environment variables validation
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.parse(process.env);

export const env = _env;
