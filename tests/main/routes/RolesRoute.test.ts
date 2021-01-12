import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

import { Collection } from 'mongodb';
import request from 'supertest';
import { mockAccessToken } from '../mock/AccessToken';

let accountCollection: Collection;

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('roles');
    await accountCollection.deleteMany({});
  });

  describe('POST /roles', () => {
    test('Should return 200 on roles and return 403 with role exists', async () => {
      const accessToken = await mockAccessToken(MongoHelper);
      await request(app)
        .post('/api/roles')
        .set('x-access-token', accessToken)
        .send({
          description: 'any_description',
        })
        .expect(204);

      await request(app)
        .post('/api/roles')
        .set('x-access-token', accessToken)
        .send({
          description: 'any_description',
        })
        .expect(403);
    });
  });

  describe('GET /roles', () => {
    test('Should return 403 on roles without accessToken', async () => {
      await request(app).get('/api/roles').expect(403);
    });

    test('Should return 200 on roles with accessToken', async () => {
      const accessToken = await mockAccessToken(MongoHelper);
      await request(app)
        .get(`/api/roles`)
        .set('x-access-token', accessToken)
        .expect(200);
    });
  });
});
