import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupDocumentation(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('CommuNet API Reference')
    .setDescription('CommuNet API Reference')
    .setVersion('v1')
    .addBearerAuth({
      description: 'JWT Authorization header using the Bearer scheme',
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}
