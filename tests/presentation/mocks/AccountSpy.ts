import { IAddAccountUseCase } from '@/domain/usecases';

export class AddAccountSpy implements IAddAccountUseCase {
  params: IAddAccountUseCase.Params;

  result = true;

  async add(
    params: IAddAccountUseCase.Params,
  ): Promise<IAddAccountUseCase.Result> {
    this.params = params;
    return this.result;
  }
}
