import { ListRolesController } from '@/presentation/controllers';
import { ServerError } from '@/presentation/errors';
import { serverError, ok } from '@/presentation/helpers';
import { ListRolesSpy } from '@/tests/presentation/mocks';
import { throwError } from '@/tests/utils';

type SutTypes = {
  sut: ListRolesController;
  listRolesSpy: ListRolesSpy;
};

const makeSut = (): SutTypes => {
  const listRolesSpy = new ListRolesSpy();
  const sut = new ListRolesController(listRolesSpy);
  return {
    sut,
    listRolesSpy,
  };
};

describe('ListRoles Controller', () => {
  test('Should return 500 if ListRoles throws', async () => {
    const { sut, listRolesSpy } = makeSut();
    jest.spyOn(listRolesSpy, 'list').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
  });

  test('Should return 200', async () => {
    const { sut, listRolesSpy } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(ok(listRolesSpy.result));
  });
});
