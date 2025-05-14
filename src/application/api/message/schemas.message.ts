import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RequestGetAllMessagesParamsSchema = z.object({
  channelId: z.string().uuid(),
  chatId: z.string().uuid(),
});

export class RequestGetAllMessagesParamsDTO extends createZodDto(
  RequestGetAllMessagesParamsSchema,
) {}

const ResponseGetAllMessagesSchema = z.array(
  z.object({
    id: z.string().uuid(),
    content: z.string(),
    author: z.object({
      id: z.string().uuid(),
      display_name: z.string(),
      username: z.string(),
      email: z.string().email(),
      avatar: z.string().nullable(),
      created_at: z.string().datetime(),
      updated_at: z.string().datetime(),
    }),
    reply_to: z.string().uuid().nullable(),
    chat_id: z.string().uuid(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
);

export class ResponseGetAllMessagesDTO extends createZodDto(
  ResponseGetAllMessagesSchema,
) {}

const RequestCreateMessageParamsSchema = z.object({
  channelId: z.string().uuid(),
  chatId: z.string().uuid(),
});

export class RequestCreateMessageParamsDTO extends createZodDto(
  RequestCreateMessageParamsSchema,
) {}

const RequestCreateMessageBodySchema = z.object({
  content: z.string(),
  reply_to: z.string().uuid().nullish(),
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
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
  reply_to: z.string().uuid().nullable(),
  chat_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ResponseCreateMessageDTO extends createZodDto(
  ResponseCreateMessageSchema,
) {}

const RequestGetMessageByParamsIdSchema = z.object({
  channelId: z.string().uuid(),
  chatId: z.string().uuid(),
  messageId: z.string().uuid(),
});

export class RequestGetMessageByParamsIdDTO extends createZodDto(
  RequestGetMessageByParamsIdSchema,
) {}

const ResponseGetMessageByIdSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  author: z.object({
    id: z.string().uuid(),
    display_name: z.string(),
    username: z.string(),
    email: z.string().email(),
    avatar: z.string().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
  reply_to: z.string().uuid().nullable(),
  chat_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ResponseGetMessageByIdDTO extends createZodDto(
  ResponseGetMessageByIdSchema,
) {}

const RequestUpdateMessageByIdParamsIdSchema = z.object({
  channelId: z.string().uuid(),
  chatId: z.string().uuid(),
  messageId: z.string().uuid(),
});

export class RequestUpdateMessageByIdParamsIdDTO extends createZodDto(
  RequestUpdateMessageByIdParamsIdSchema,
) {}

const RequestUpdateMessageByIdBodySchema = z.object({
  content: z.string(),
});

export class RequestUpdateMessageByIdBodyDTO extends createZodDto(
  RequestUpdateMessageByIdBodySchema,
) {}

const ResponseUpdateMessageByIdSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  author: z.object({
    id: z.string().uuid(),
    display_name: z.string(),
    username: z.string(),
    email: z.string().email(),
    avatar: z.string().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
  reply_to: z.string().uuid().nullable(),
  chat_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ResponseUpdateMessageByIdDTO extends createZodDto(
  ResponseUpdateMessageByIdSchema,
) {}

const RequestDeleteMessageByParamsIdSchema = z.object({
  channelId: z.string().uuid(),
  chatId: z.string().uuid(),
  messageId: z.string().uuid(),
});

export class RequestDeleteMessageByParamsIdDTO extends createZodDto(
  RequestDeleteMessageByParamsIdSchema,
) {}
