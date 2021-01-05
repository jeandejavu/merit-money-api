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
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('POST /signup', () => {
    test('Should return 200 on signup and return 403 with account exists', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any.mail@mail.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(204);

      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any.mail@mail.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(403);
    });
  });
});
