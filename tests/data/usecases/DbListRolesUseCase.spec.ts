import { throwError } from '@/tests/utils';
import { DbListRolesUseCase } from '@/data/usecases';
import { ListRolesRepositorySpy } from '../mocks/db';

type SutTypes = {
  sut: DbListRolesUseCase;
  listRoleRepositorySpy: ListRolesRepositorySpy;
};

const makeSut = (): SutTypes => {
  const listRoleRepositorySpy = new ListRolesRepositorySpy();
  const sut = new DbListRolesUseCase(listRoleRepositorySpy);
  return {
    sut,
    listRoleRepositorySpy,
  };
};

describe('DbListRoles Usecase', () => {
  test('Should return have lenght 1', async () => {
    const { sut } = makeSut();
    await expect(sut.list()).resolves.toHaveLength(1);
  });

  test('Should throw if ListRolesRepository throws', async () => {
    const { sut, listRoleRepositorySpy } = makeSut();
    jest
      .spyOn(listRoleRepositorySpy, 'list')
      .mockImplementationOnce(throwError);
    const promise = sut.list();
    await expect(promise).rejects.toThrow();
  });
});
