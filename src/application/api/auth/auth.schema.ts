import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RequestRegisterSchema = z.object({
  email: z
    .string({ required_error: 'Email is required field' })
    .email({ message: 'Invalid email format' })
    .nonempty('Email cannot be empty'),
});

export class RequestRegisterDTO extends createZodDto(RequestRegisterSchema) {}
