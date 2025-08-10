import * as z from 'zod/v4';

export const ConfigSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    PORT: z.coerce.number().default(3535),

    // Database
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),

    // Redis
    REDIS_PORT: z.coerce.number(),
    REDIS_URL: z.string(),

    // JWT
    JWT_SECRET: z.string(),
    JWT_ACCESS_EXPIRES_IN_MINUTES: z.coerce.number(),
    JWT_REFRESH_EXPIRES_IN_DAYS: z.coerce.number(),
    JWT_ALGORITHM: z.string(),

    ADMINER_PORT: z.coerce.number(),

    MINIO_HOST: z.string(),
    MINIO_API_PORT: z.coerce.number(),
    MINIO_CLIENT_PORT: z.coerce.number(),
    MINIO_USERNAME: z.string(),
    MINIO_PASSWORD: z.string(),
    MINIO_ACCESS_KEY: z.string(),
    MINIO_SECRET_KEY: z.string(),
  })
  .readonly();

export type Config = z.infer<typeof ConfigSchema>;
