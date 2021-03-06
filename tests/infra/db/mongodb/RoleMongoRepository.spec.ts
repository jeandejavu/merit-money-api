import { RoleMongoRepository, MongoHelper } from '@/infra/db';
import { mockRoleModel } from '@/tests/domain/mocks';
import { Collection, ObjectID } from 'mongodb';
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
      const addRoleParams = mockRoleModel();
      const isValid = await sut.add(addRoleParams);
      expect(isValid).toBe(true);
    });
  });

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut();
      const addRoleParams = mockRoleModel();
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

  describe('list()', () => {
    test('Should return roles', async () => {
      const sut = makeSut();
      const addRoleParams = mockRoleModel();
      await roleCollection.insertOne(addRoleParams);
      await expect(sut.list()).resolves.toHaveLength(1);
    });

    test('Should return empty array when base is empty', async () => {
      const sut = makeSut();
      await expect(sut.list()).resolves.toHaveLength(0);
    });
  });

  describe('checkById()', () => {
    test('Should return true if id is valid', async () => {
      const sut = makeSut();
      const addRoleParams = mockRoleModel();
      const { id, ...data } = addRoleParams;

      await roleCollection.insertOne({ ...data, _id: new ObjectID(id) });
      const exists = await sut.checkById(id);
      expect(exists).toBe(true);
    });

    test('Should return false if id is not exists', async () => {
      const sut = makeSut();
      const exists = await sut.checkById(new ObjectID().toHexString());
      expect(exists).toBe(false);
    });

    test('Should return false if invalid id', async () => {
      const sut = makeSut();
      const exists = await sut.checkById(faker.random.uuid());
      expect(exists).toBe(false);
    });
  });
});
