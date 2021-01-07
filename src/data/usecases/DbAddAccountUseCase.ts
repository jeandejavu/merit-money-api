import { IAddAccountUseCase } from '@/domain/usecases';
import {
  IHasher,
  IAddAccountRepository,
  ICheckAccountByEmailRepository,
  ICheckRoleByIdRepository,
} from '@/data/protocols';
import { EmailInUseError, ModelNotExists } from '@/domain/errors';

export class DbAddAccountUseCase implements IAddAccountUseCase {
  constructor(
    private readonly hasher: IHasher,
    private readonly AddAccountUseCaseRepository: IAddAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
    private readonly checkRoleByIdRepository: ICheckRoleByIdRepository,
  ) {}

  async add(
    accountData: IAddAccountUseCase.Params,
  ): Promise<IAddAccountUseCase.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(
      accountData.email,
    );
    if (exists) throw new EmailInUseError();

    const roleExist = await this.checkRoleByIdRepository.checkById(
      accountData.account_role.id,
    );
    if (!roleExist) throw new ModelNotExists('account_role');

    const hashedPassword = await this.hasher.hash(accountData.password);
    return this.AddAccountUseCaseRepository.add({
      ...accountData,
      password: hashedPassword,
    });
  }
}
