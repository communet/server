import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ResponseErrorSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

export class ResponseErrorDTO extends createZodDto(ResponseErrorSchema) {}
