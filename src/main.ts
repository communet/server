import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import * as cookieParser from 'cookie-parser';

patchNestJsSwagger();

import { AppModule } from '@/app.module';
import { setupDocumentation } from '@/infra/nest-configuration/api-documentation';
import { setupCors } from '@/infra/nest-configuration/cors';
import { NestFactory } from '@nestjs/core';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ZodValidationPipe());
  app.use(cookieParser());

  setupDocumentation(app);
  setupCors(app, process.env.ORIGIN_ADDRESS ?? 'http://localhost:5173');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
