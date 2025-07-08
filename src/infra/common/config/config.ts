import { ConfigSchema } from '@/infra/common/config/validator';
import { config } from 'dotenv';

config();

export const AppConfig = ConfigSchema.parse(process.env);
