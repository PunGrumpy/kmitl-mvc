import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'

import { AppModule } from './app.module'

async function bootstrap() {
  // Create NestJS application
  const app = await NestFactory.create(AppModule, { cors: true })

  // Set global prefix
  const projectName = 'KMITL Exit Exam with MVC'
  const projectDescription = 'KMITL Exit Exam with MVC'
  const globalPrefix = 'api/v1'
  const pathDocs = 'docs'
  const port = process.env.PORT || 3000

  // Set global prefix and global pipes
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(new ValidationPipe())

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle(projectName)
    .setDescription(projectDescription)
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  // Serve Swagger UI (with Scalar API Reference)
  app.use(
    `/${pathDocs}`,
    apiReference({
      theme: 'deepSpace',
      spec: {
        content: document
      }
    })
  )

  // Launch application
  await app.listen(port)
  Logger.log(`🚀 Server running on http://localhost:${port}`, 'RunOn')
  Logger.log(
    `🚀 API Reference running on http://localhost:${port}/${pathDocs}`,
    'RunOn'
  )
  Logger.log(
    `🚀 OpenAPI Spec available at http://localhost:${port}/swagger-spec`,
    'RunOn'
  )
}

// Bootstrap the application
bootstrap()
