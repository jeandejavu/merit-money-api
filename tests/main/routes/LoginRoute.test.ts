import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db';
import { hash } from 'bcrypt';
import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

let accountCollection: Collection;
let roleCollection: Collection;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let account_role: any;
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
    await request(app).post('/api/roles').send({
      description: 'any_description',
    });

    roleCollection = await MongoHelper.getCollection('roles');
    account_role = MongoHelper.map(await roleCollection.findOne({}));
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
      const password = `${faker.internet.password()}$`;

      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any.mail@mail.com',
          password,
          password_confirmation: password,
          account_role,
        })
        .expect(204);

      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any.mail@mail.com',
          password,
          password_confirmation: password,
          account_role,
        })
        .expect(403);
    });
  });

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const email = faker.internet.email();
      const password = `${faker.internet.password()}$`;

      const hashPassword = await hash(password, 12);
      await accountCollection.insertOne({
        name: faker.name.findName(),
        email,
        password: hashPassword,
      });
      await request(app)
        .post('/api/login')
        .send({ email, password })
        .expect(200);
    });

    test('Should return 401 on login', async () => {
      const email = faker.internet.email();
      const password = await hash(`${faker.internet.password()}$`, 12);
      await request(app)
        .post('/api/login')
        .send({ email, password })
        .expect(401);
    });
  });
});
