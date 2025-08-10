import { config } from 'dotenv';
import { ConfigSchema } from './validator';

config({ quiet: true });

export const AppConfig = ConfigSchema.parse(process.env);
