import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { HttpFilter, HttpInterceptor, Logger } from '@api/common';
import { AppModule } from '@api/app.module';
import {
  DEFAULT_API_VERSION as defaultVersion,
  GLOBAL_API_PREFIX,
  PORT,
} from '@api/config';

async function bootstrap() {
  const logLabel = 'Nest';
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(logLabel),
  });

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new HttpInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpFilter());
  app.enableVersioning({ defaultVersion, type: VersioningType.URI });
  app.enableCors();

  await app.listen(PORT);
}

bootstrap();
