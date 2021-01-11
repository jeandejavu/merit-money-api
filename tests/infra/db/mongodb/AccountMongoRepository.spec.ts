import { AccountMongoRepository, MongoHelper } from '@/infra/db';
import { mockAddAccountParams } from '@/tests/domain/mocks';
import { Collection } from 'mongodb';
import faker from 'faker';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

let accountCollection: Collection;

describe('AccountMongoRepository', () => {
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

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      const isValid = await sut.add(addAccountParams);
      expect(isValid).toBe(true);
    });
  });

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      await accountCollection.insertOne(addAccountParams);
      const exists = await sut.checkByEmail(addAccountParams.email);
      expect(exists).toBe(true);
    });

    test('Should return false if email is not valid', async () => {
      const sut = makeSut();
      const exists = await sut.checkByEmail(faker.internet.email());
      expect(exists).toBe(false);
    });
  });

  describe('findByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      await accountCollection.insertOne(addAccountParams);
      const account = await sut.findByEmail(addAccountParams.email);
      expect(account).toBeTruthy();
      expect(account?.id).toBeTruthy();
      expect(account?.name).toBe(addAccountParams.name);
      expect(account?.password).toBe(addAccountParams.password);
    });

    test('Should return null if findByEmail fails', async () => {
      const sut = makeSut();
      const account = await sut.findByEmail(faker.internet.email());
      expect(account).toBeFalsy();
    });
  });
});
