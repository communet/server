import { z } from 'zod';

// NOTE: Подключишь схему конфига как удобно, там много разных способов
// Один из них - это использовать @nestjs/config
export const ConfigSchema = z.object({
  PORT: z.string().default('3535'),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;
