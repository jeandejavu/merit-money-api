import faker from 'faker';
import fs from 'fs';
import path from 'path';
import { DiskStorageAdapter } from '@/infra/storage';
import { throwError } from '@/tests/utils';

jest.mock('path', () => ({
  resolve(...pathSegments: string[]): string {
    return pathSegments.join('/');
  },
}));

jest.mock('fs', () => ({
  promises: {
    async rename(): Promise<void> {
      //
    },
  },
}));

const tmpFolder = faker.system.filePath();
const uploadsFolder = faker.system.filePath();
const staticFolter = faker.system.filePath();
const fileName = faker.system.fileName('jpge');
const makeSut = (): DiskStorageAdapter => {
  return new DiskStorageAdapter(tmpFolder, uploadsFolder, staticFolter);
};

describe('DiskStorage Adapter', () => {
  describe('saveFile()', () => {
    test('Should call rename with correct values', async () => {
      const sut = makeSut();
      const renameSpy = jest.spyOn(fs.promises, 'rename');
      await sut.saveFile(fileName);
      expect(renameSpy).toHaveBeenCalledWith(
        path.resolve(tmpFolder, fileName),
        path.resolve(uploadsFolder, fileName),
      );
    });

    test('Should throw if rename throws', async () => {
      const sut = makeSut();
      jest.spyOn(fs.promises, 'rename').mockImplementationOnce(throwError);
      const promise = sut.saveFile(fileName);
      await expect(promise).rejects.toThrow();
    });
  });

  describe('pathFile()', () => {
    test('Should return valid filePath with correct values', async () => {
      const sut = makeSut();
      const filePath = await sut.pathFile(fileName);
      expect(filePath).toBe(path.resolve(staticFolter, fileName));
    });

    test('Should return empty filePath with filename is undefined', async () => {
      const sut = makeSut();
      const filePath = await sut.pathFile((undefined as unknown) as string);
      expect(filePath).toBe('');
    });
  });
});
