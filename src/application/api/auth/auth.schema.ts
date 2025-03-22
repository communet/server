import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export function onlyAlphaNumeric(value: string): boolean {
  const regExp = /^[a-zA-Z0-9_]*$/;
  return regExp.test(value);
}

const RequestRegisterSchema = z
  .object({
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, 'Username must be greater or equal 3 characters')
      .max(32, 'Username must be less or equal 32 characters')
      .refine(
        onlyAlphaNumeric,
        'Username must contains symbols A-z, 0-9 and _ (underscore)',
      ),
    email: z.string().email('Email is required and must be valid'),
    password: z
      .string()
      .min(8, 'Password must be greater or equal 8 characters'),
    confirm: z.string(),
  })
  .refine((value) => value.password === value.confirm, {
    message: "Passwords doesn't match",
    path: ['confirm'],
  });

export class RequestRegisterDTO extends createZodDto(RequestRegisterSchema) {}

const ResponseRegisterSchema = z.object({
  id: z.string().uuid(),
  display_name: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar_url: z.string().nullable(),
  created_at: z.date(),
});

export class ResponseRegisterDTO extends createZodDto(ResponseRegisterSchema) {}

const RequestLoginSchema = z
  .object({
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, 'Username must be greater or equal 3 characters')
      .max(32, 'Username must be less or equal 32 characters')
      .refine(
        onlyAlphaNumeric,
        'Username must contains symbols A-z, 0-9 and _ (underscore)',
      )
      .optional(),
    email: z.string().email('Email is required and must be valid').optional(),
    password: z
      .string()
      .min(8, 'Password must be greater or equal 8 characters'),
  })
  .refine((data) => data.username || data.email, {
    message: 'Either username or email must be provided',
    path: ['username', 'email'],
  });

export class RequestLoginDTO extends createZodDto(RequestLoginSchema) {}

const ResponseLoginSchema = z.object({
  access_token: z.string(),
  access_expires: z.date(),
});

export class ResponseLoginDTO extends createZodDto(ResponseLoginSchema) {}

const ResponseRefreshSchema = z.object({
  access_token: z.string(),
  access_expires: z.date(),
});

export class ResponseRefreshDTO extends createZodDto(ResponseRefreshSchema) {}
