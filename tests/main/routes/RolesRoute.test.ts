import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

import { Collection } from 'mongodb';
import request from 'supertest';

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
      await request(app)
        .post('/api/roles')
        .send({
          description: 'any_description',
        })
        .expect(204);

      await request(app)
        .post('/api/roles')
        .send({
          description: 'any_description',
        })
        .expect(403);
    });
  });
});
