import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RequestCreateChatParamsSchema = z.object({
  channelId: z.string().uuid(),
});

export class RequestCreateChatParamsDTO extends createZodDto(
  RequestCreateChatParamsSchema,
) {}

const RequestCreateChatBodySchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, 'Username must be greater or equal 3 characters')
    .max(32, 'Username must be less or equal 32 characters'),
  type: z.enum(['text', 'voice']),
});

export class RequestCreateChatBodyDTO extends createZodDto(
  RequestCreateChatBodySchema,
) {}

const ResponseCreateChatSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.string(),
  chanenl_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export class ResponseCreateChatDTO extends createZodDto(
  ResponseCreateChatSchema,
) {}

const RequestDeleteChatParamsSchema = z.object({
  channelId: z.string().uuid(),
  chatId: z.string().uuid(),
});

export class RequestDeleteChatParamsDTO extends createZodDto(
  RequestDeleteChatParamsSchema,
) {}
