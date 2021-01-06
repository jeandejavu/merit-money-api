import { MongoAdapter } from '@/infra/id';
import { throwError } from '@/tests/utils';

import { ObjectID } from 'mongodb';

const makeSut = (): MongoAdapter => {
  return new MongoAdapter();
};

describe('Mongo Adapter', () => {
  describe('generateID()', () => {
    test('Should return a valid id on generateID success', async () => {
      const sut = makeSut();
      const newId = await sut.generateID();
      expect(new ObjectID(newId).toHexString()).toBe(newId);
    });

    test('Should throw if generateID throws', async () => {
      const sut = makeSut();
      jest
        .spyOn(ObjectID.prototype, 'toHexString')
        .mockImplementationOnce(throwError);
      const generateID = sut.generateID();
      expect(generateID).rejects.toThrow();
    });
  });
});
