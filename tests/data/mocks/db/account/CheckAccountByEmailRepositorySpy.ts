import { ICheckAccountByEmailRepository } from '@/data/protocols';

export class CheckAccountByEmailRepositorySpy
  implements ICheckAccountByEmailRepository {
  email: string;

  result = false;

  async checkByEmail(
    email: string,
  ): Promise<ICheckAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}
