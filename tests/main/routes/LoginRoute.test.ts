import app from '@/main/config/app';
import path from 'path';
import { MongoHelper } from '@/infra/db';
import { hash } from 'bcrypt';
import faker from 'faker';
import { Collection, ObjectID } from 'mongodb';
import request from 'supertest';
import { mockRoleModel } from '@/tests/domain/mocks';
import { RoleModel } from '@/domain/models';

let accountCollection: Collection;
let roleCollection: Collection;
let addRoleParams: RoleModel;
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
    roleCollection = await MongoHelper.getCollection('roles');

    addRoleParams = mockRoleModel();
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
      await roleCollection.insertOne({
        _id: new ObjectID(addRoleParams.id),
        description: addRoleParams.description,
      });

      const avatarPath = path.resolve(
        __dirname,
        '..',
        '..',
        'images',
        'perfil.jpg',
      );

      await request(app)
        .post('/api/signup')
        .attach('avatar', avatarPath)
        .field('name', 'any_name')
        .field('email', 'any.mail@mail.com')
        .field('password', password)
        .field('password_confirmation', password)
        .field('account_role_id', addRoleParams.id)
        .expect(204);

      await request(app)
        .post('/api/signup')
        .attach('avatar', avatarPath)
        .field('name', 'any_name')
        .field('email', 'any.mail@mail.com')
        .field('password', password)
        .field('password_confirmation', password)
        .field('account_role_id', addRoleParams.id)
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
