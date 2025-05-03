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
  channel_id: z.string().uuid(),
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

const RequestGetChatParamsSchema = z.object({
  channelId: z.string().uuid(),
  chatId: z.string().uuid(),
});

export class RequestGetChatParamsDTO extends createZodDto(
  RequestGetChatParamsSchema,
) {}

const ResponseGetChatByIdSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.string(),
  channel_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export class ResponseGetChatByIdDTO extends createZodDto(
  ResponseGetChatByIdSchema,
) {}

const RequestGetChatsParamsSchema = z.object({
  channelId: z.string().uuid(),
});

export class RequestGetChatsParamsDTO extends createZodDto(
  RequestGetChatsParamsSchema,
) {}

const ResponseGetChatsSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    type: z.string(),
    channel_id: z.string().uuid(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
);

export class ResponseGetChatsDTO extends createZodDto(ResponseGetChatsSchema) {}

const RequestUpdateChatParamsSchema = z.object({
  channelId: z.string().uuid(),
  chatId: z.string().uuid(),
});

export class RequestUpdateChatParamsDTO extends createZodDto(
  RequestUpdateChatParamsSchema,
) {}

const RequestUpdateChatBodySchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, 'Username must be greater or equal 3 characters')
    .max(32, 'Username must be less or equal 32 characters'),
  type: z.enum(['text', 'voice']),
});

export class RequestUpdateChatBodyDTO extends createZodDto(
  RequestUpdateChatBodySchema,
) {}

const ResponseUpdateChatSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.string(),
  channel_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export class ResponseUpdateChatDTO extends createZodDto(
  ResponseUpdateChatSchema,
) {}
