import { IAddRoleUseCase } from '@/domain/usecases';

export class AddRoleSpy implements IAddRoleUseCase {
  params: IAddRoleUseCase.Params;

  result = true;

  async add(params: IAddRoleUseCase.Params): Promise<IAddRoleUseCase.Result> {
    this.params = params;
    return this.result;
  }
}
