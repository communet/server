import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RequestCreateMessageParamsSchema = z.object({
  channelId: z.string().uuid(),
  chatId: z.string().uuid(),
});

export class RequestCreateMessageParamsDTO extends createZodDto(
  RequestCreateMessageParamsSchema,
) {}

const RequestCreateMessageBodySchema = z.object({
  content: z.string(),
});

export class RequestCreateMessageBodyDTO extends createZodDto(
  RequestCreateMessageBodySchema,
) {}

const ResponseCreateMessageSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  author: z.object({
    id: z.string().uuid(),
    display_name: z.string(),
    username: z.string(),
    email: z.string().email(),
    avatar: z.string().nullable(),
  }),
  reply_to: z.string().uuid().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ResponseCreateMessageDTO extends createZodDto(
  ResponseCreateMessageSchema,
) {}
