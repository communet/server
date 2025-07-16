import { config } from 'dotenv';
import { ConfigSchema } from './validator';

config();

export const AppConfig = ConfigSchema.parse(process.env);
