import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ReponseGetCurrentUserSchema = z.object({
  id: z.string().uuid(),
  display_name: z.string(),
  username: z.string(),
  email: z.string().email(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ReponseGetCurrentUserDTO extends createZodDto(
  ReponseGetCurrentUserSchema,
) {}

const ReponseUpdateCurrentUserSchema = z.object({
  id: z.string().uuid(),
  display_name: z.string(),
  username: z.string(),
  email: z.string().email(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ReponseUpdateCurrentUserDTO extends createZodDto(
  ReponseUpdateCurrentUserSchema,
) {}
