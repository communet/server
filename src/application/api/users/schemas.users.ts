import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ReponseGetCurrentUserSchema = z.object({
  id: z.string().uuid(),
  display_name: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable(),
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
  avatar: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ReponseUpdateCurrentUserDTO extends createZodDto(
  ReponseUpdateCurrentUserSchema,
) {}

const RequestGetUserByIdParamsSchema = z.object({
  profileId: z.string().uuid(),
});

export class RequestGetUserByIdParamsDTO extends createZodDto(
  RequestGetUserByIdParamsSchema,
) {}

const ReponseGetUserByIdSchema = z.object({
  id: z.string().uuid(),
  display_name: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ReponseGetUserByIdDTO extends createZodDto(
  ReponseGetUserByIdSchema,
) {}
