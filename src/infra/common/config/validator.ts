import * as z from 'zod/v4';

export const ConfigSchema = z
  .object({
    PORT: z.number().default(3535),

    // Database
    DB_HOST: z.string(),
    DB_PORT: z.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),

    // Redis
    REDIS_PORT: z.number(),
    REDIS_URL: z.string(),

    // JWT
    JWT_SECRET: z.string(),
    JWT_ACCESS_EXPIRES_IN_MINUTES: z.number(),
    JWT_REFRESH_EXPIRES_IN_DAYS: z.number(),
    JWT_ALGORITHM: z.string(),

    ADMINER_PORT: z.number(),

    MINIO_HOST: z.string(),
    MINIO_API_PORT: z.number(),
    MINIO_CLIENT_PORT: z.number(),
    MINIO_USERNAME: z.string(),
    MINIO_PASSWORD: z.string(),
    MINIO_ACCESS_KEY: z.string(),
    MINIO_SECRET_KEY: z.string(),
  })
  .readonly();

export type Config = z.infer<typeof ConfigSchema>;
