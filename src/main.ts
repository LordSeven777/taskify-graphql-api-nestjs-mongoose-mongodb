import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

import { formatValidationErrors } from './common/helpers/formatters.helper';

async function bootstrap() {
  // The base application
  const app = await NestFactory.create(AppModule);

  // CORS handling
  app.enableCors({
    optionsSuccessStatus: 200,
    credentials: true,
  });

  // Global pipe for the DTO validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory(errors) {
        // Errors formatting
        const formattedErrors = formatValidationErrors(errors);
        return new BadRequestException(formattedErrors);
      },
    }),
  );
  // Containerizing the DTO validations to the scope of the App module
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // PORT setup
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
}
bootstrap();
