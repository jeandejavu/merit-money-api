import { IAuthentication } from '@/domain/usecases';
import faker from 'faker';

export class AuthenticationSpy implements IAuthentication {
  params: IAuthentication.Params;

  result: IAuthentication.Result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
  };

  async auth(params: IAuthentication.Params): Promise<IAuthentication.Result> {
    this.params = params;
    return this.result;
  }
}
