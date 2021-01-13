import { IAddAccountUseCase } from '@/domain/usecases';
import {
  IHasher,
  IAddAccountRepository,
  ICheckAccountByEmailRepository,
  ICheckRoleByIdRepository,
  ISaveFile,
} from '@/data/protocols';
import { EmailInUseError, ModelNotExists } from '@/domain/errors';

export class DbAddAccountUseCase implements IAddAccountUseCase {
  constructor(
    private readonly hasher: IHasher,
    private readonly AddAccountUseCaseRepository: IAddAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
    private readonly checkRoleByIdRepository: ICheckRoleByIdRepository,
    private readonly saveFile: ISaveFile,
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

    const { avatar, ...restData } = accountData;
    const filename = await this.saveFile.saveFile(avatar.filename);

    const hashedPassword = await this.hasher.hash(accountData.password);
    return this.AddAccountUseCaseRepository.add({
      ...restData,
      password: hashedPassword,
      filename,
    });
  }
}
