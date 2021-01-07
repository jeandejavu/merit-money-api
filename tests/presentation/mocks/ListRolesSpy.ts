import { IListRolesUseCase } from '@/domain/usecases';
import { mockRoleModel } from '@/tests/domain/mocks';

export class ListRolesSpy implements IListRolesUseCase {
  result = [mockRoleModel()];

  async list(): Promise<IListRolesUseCase.Result> {
    return this.result;
  }
}
