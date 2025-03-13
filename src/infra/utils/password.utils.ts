import { hash, verify } from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password);
  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  confirm: string,
): Promise<boolean> {
  return await verify(confirm, password);
}
