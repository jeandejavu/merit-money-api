import { IFindAccountByEmailRepository } from '@/data/protocols';
import faker from 'faker';

export class FindAccountByEmailRepositorySpy
  implements IFindAccountByEmailRepository {
  email: string;

  result: IFindAccountByEmailRepository.Result = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password(),
    avatar: faker.system.filePath(),
  };

  async findByEmail(
    email: string,
  ): Promise<IFindAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}
