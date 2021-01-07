import { IListRolesRepository } from '@/data/protocols';
import { mockRoleModel } from '@/tests/domain/mocks';

export class ListRolesRepositorySpy implements IListRolesRepository {
  result = [mockRoleModel()];

  async list(): Promise<IListRolesRepository.Result> {
    return this.result;
  }
}
