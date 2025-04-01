import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RequestCreateChannelSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
});

export class RequestCreateChannelDTO extends createZodDto(
  RequestCreateChannelSchema,
) {}

const ResponseCreateChannelSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  avatar: z.string().nullable(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ResponseCreateChannelDTO extends createZodDto(
  ResponseCreateChannelSchema,
) {}
