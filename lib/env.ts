import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z.enum(["development", "test", "production"]),
  WASENDER_API_KEY: z.string().min(1),
  APP_URL: z.string().url().optional().default("http://localhost:3000"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  WASENDER_API_KEY: process.env.WASENDER_API_KEY,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL,
});
