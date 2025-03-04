import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AppPostSchema = z.object({
  username: z.string().describe('User name :D').min(3, {
    message: 'Username must be at least 3 characters long',
  }),
});

export class AppPostDto extends createZodDto(AppPostSchema) {}
