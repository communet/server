import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RequestRegisterSchema = z.object({
  email: z.string().email('Email is required and must be valid'),
});

export class RequestRegisterDTO extends createZodDto(RequestRegisterSchema) {}
