import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RequestCreateChannelSchema = z.object({
  name: z.string(),
  description: z.string().nullish(),
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

const ResponseGetChannelsSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable(),
    avatar: z.string().nullable(),
    members: z.array(
      z.object({
        id: z.string().uuid(),
        display_name: z.string(),
        username: z.string(),
        email: z.string().email(),
        avatar: z.string().nullish(),
        created_at: z.string(),
        updated_at: z.string(),
      }),
    ),
    is_deleted: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
);

export class ResponseGetChannelsDTO extends createZodDto(
  ResponseGetChannelsSchema,
) {}

const RequestGetChannelByIdSchema = z.object({
  id: z.string().uuid(),
});

export class RequestGetChannelByIdDTO extends createZodDto(
  RequestGetChannelByIdSchema,
) {}

const ResponseGetChannelByIdSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullish(),
  avatar: z.string().nullish(),
  members: z.array(
    z.object({
      id: z.string().uuid(),
      display_name: z.string(),
      username: z.string(),
      email: z.string().email(),
      avatar: z.string().nullish(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  ),
  is_deleted: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export class ResponseGetChannelByIdDTO extends createZodDto(
  ResponseGetChannelByIdSchema,
) {}

const RequestDeleteChannelParamsSchema = z.object({
  channelId: z.string().uuid(),
});

export class RequestDeleteChannelParamsDTO extends createZodDto(
  RequestDeleteChannelParamsSchema,
) {}

const RequestUpdateChannelSchema = z.object({
  name: z.string().nullish(),
  description: z.string().nullish(),
});

export class RequestUpdateChannelDTO extends createZodDto(
  RequestUpdateChannelSchema,
) {}

const ResponseUpdateChannelSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  avatar: z.string().nullable(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export class ResponseUpdateChannelDTO extends createZodDto(
  ResponseUpdateChannelSchema,
) {}

const RequestUpdateChannelParamsSchema = z.object({
  channelId: z.string().uuid(),
});

export class RequestUpdateChannelParamsDTO extends createZodDto(
  RequestUpdateChannelParamsSchema,
) {}

const RequestConnectToChannelParamsSchema = z.object({
  channelId: z.string().uuid(),
});

export class RequestConnectToChannelParamsDTO extends createZodDto(
  RequestConnectToChannelParamsSchema,
) {}

const RequestDisconnectFromChannelParamsSchema = z.object({
  channelId: z.string().uuid(),
});

export class RequestDisconnectFromChannelParamsDTO extends createZodDto(
  RequestDisconnectFromChannelParamsSchema,
) {}
