import { IAddRoleRepository } from '@/data/protocols';

export class AddRoleRepositorySpy implements IAddRoleRepository {
  params: IAddRoleRepository.Params;

  result = true;

  async add(
    params: IAddRoleRepository.Params,
  ): Promise<IAddRoleRepository.Result> {
    this.params = params;
    return this.result;
  }
}
