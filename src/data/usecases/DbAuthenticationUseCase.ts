import { IAuthentication } from '@/domain/usecases';
import {
  IHashComparer,
  IEncrypter,
  IFindAccountByEmailRepository,
} from '@/data/protocols';
import { InvalidAuthenticationError } from '@/domain/errors';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly findAccountByEmailRepository: IFindAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
  ) {}

  async auth(
    authenticationParams: IAuthentication.Params,
  ): Promise<IAuthentication.Result> {
    const account = await this.findAccountByEmailRepository.findByEmail(
      authenticationParams.email,
    );
    if (!account) throw new InvalidAuthenticationError();

    const isValid = await this.hashComparer.compare(
      authenticationParams.password,
      account.password,
    );

    if (!isValid) throw new InvalidAuthenticationError();

    const accessToken = await this.encrypter.encrypt(account.id);
    return {
      accessToken,
      name: account.name,
    };
  }
}
