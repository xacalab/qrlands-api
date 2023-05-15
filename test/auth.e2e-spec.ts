import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '@api/app.module';
import {
  DEFAULT_API_VERSION as defaultVersion,
  GLOBAL_API_PREFIX,
} from '@api/config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix(GLOBAL_API_PREFIX);
    app.enableVersioning({ defaultVersion, type: VersioningType.URI });

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('[GET /api/v1/users/me] should return unauthorized', () => {
    return request(app.getHttpServer())
      .get('/api/v1/users/me')
      .expect(401)
      .expect({ statusCode: 401, message: 'Unauthorized' });
  });
});
