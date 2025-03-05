import { z } from 'zod';

// NOTE: Подключишь схему конфига как удобно, там много разных способов
// Один из них - это использовать @nestjs/config
export const ConfigSchema = z.object({
  port: z.number().default(3535),
  db: z.object({
    host: z.string(),
    port: z.number(),
    user: z.string(),
    password: z.string(),
    name: z.string(),
  }),
  redis: z.object({
    host: z.string(),
    port: z.number(),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;
