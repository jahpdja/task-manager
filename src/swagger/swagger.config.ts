import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/** Registers OpenAPI separately from the versioned API routes. */
export function configureSwagger(
  app: INestApplication,
  config: ConfigService,
): void {
  const documentConfig = new DocumentBuilder()
    .setTitle(config.get<string>('SWAGGER_TITLE', 'Task Manager API'))
    .setDescription(
      'REST API for task management. The API base path is /api/v1.',
    )
    .setVersion(config.get<string>('SWAGGER_VERSION', '1.0.0'))
    .addTag('Tasks', 'Create, query, update and delete tasks')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  const docsPath = config.get<string>('SWAGGER_PATH', 'api/docs');

  SwaggerModule.setup(docsPath, app, document, {
    jsonDocumentUrl: `${docsPath}/openapi.json`,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
    },
  });
}
