import { IAddAccountRepository } from '@/data/protocols';

export class AddAccountRepositorySpy implements IAddAccountRepository {
  params: IAddAccountRepository.Params;

  result = true;

  async add(
    params: IAddAccountRepository.Params,
  ): Promise<IAddAccountRepository.Result> {
    this.params = params;
    return this.result;
  }
}
