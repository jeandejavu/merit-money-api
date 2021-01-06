import { RoleMongoRepository, MongoHelper } from '@/infra/db';
import { mockRoleParams } from '@/tests/domain/mocks';
import { Collection } from 'mongodb';
import faker from 'faker';

const makeSut = (): RoleMongoRepository => {
  return new RoleMongoRepository();
};

let roleCollection: Collection;

describe('RoleMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    roleCollection = await MongoHelper.getCollection('roles');
    await roleCollection.deleteMany({});
  });

  describe('add()', () => {
    test('Should return an role on success', async () => {
      const sut = makeSut();
      const addRoleParams = mockRoleParams();
      const isValid = await sut.add(addRoleParams);
      expect(isValid).toBe(true);
    });
  });

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut();
      const addRoleParams = mockRoleParams();
      await roleCollection.insertOne(addRoleParams);
      const exists = await sut.checkByDescription(addRoleParams.description);
      expect(exists).toBe(true);
    });

    test('Should return false if description is exists', async () => {
      const sut = makeSut();
      const exists = await sut.checkByDescription(faker.name.jobTitle());
      expect(exists).toBe(false);
    });
  });
});
