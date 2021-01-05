import { IAddAccountUseCase } from '@/domain/usecases';
import {
  IHasher,
  IAddAccountRepository,
  ICheckAccountByEmailRepository,
} from '@/data/protocols';

export class DbAddAccountUseCase implements IAddAccountUseCase {
  constructor(
    private readonly hasher: IHasher,
    private readonly AddAccountUseCaseRepository: IAddAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
  ) {}

  async add(
    accountData: IAddAccountUseCase.Params,
  ): Promise<IAddAccountUseCase.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(
      accountData.email,
    );
    let isValid = false;
    if (!exists) {
      const hashedPassword = await this.hasher.hash(accountData.password);
      isValid = await this.AddAccountUseCaseRepository.add({
        ...accountData,
        password: hashedPassword,
      });
    }
    return isValid;
  }
}
