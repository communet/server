import { z } from 'zod';

export const ConfigSchema = z.object({
  PORT: z.string().default('3535'),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN_MINUTES: z.string().default('15'),
  JWT_REFRESH_EXPIRES_IN_DAYS: z.string().default('7'),
  JWT_ALGORITHM: z.string().default('HS256'),
});

export type Config = z.infer<typeof ConfigSchema>;
