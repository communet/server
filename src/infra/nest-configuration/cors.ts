import { INestApplication } from '@nestjs/common';

export function setupCors(app: INestApplication): void {
  // NOTE: Base CORS configuration
  // I'm too lazy to helmet configuration, but It'll be done later
  app.enableCors();
}
