import { IAuthentication } from '@/domain/usecases';
import faker from 'faker';

export class AuthenticationSpy implements IAuthentication {
  params: IAuthentication.Params;

  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
  };

  async auth(params: IAuthentication.Params): Promise<IAuthentication.Result> {
    this.params = params;
    return this.result;
  }
}
