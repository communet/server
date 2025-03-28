import { z } from 'zod';

export const ConfigSchema = z.object({
  PORT: z.string().default('3535'),
  ORIGIN_ADDRESS: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  REDIS_URL: z.string(),
  MINIO_HOST: z.string(),
  MINIO_API_PORT: z.string().default('9000'),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN_MINUTES: z.string().default('15'),
  JWT_REFRESH_EXPIRES_IN_DAYS: z.string().default('7'),
  JWT_ALGORITHM: z.enum([
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
    'PS256',
    'PS384',
    'PS512',
  ]),
});

export type Config = z.infer<typeof ConfigSchema>;
