import faker from 'faker';
import { IAddAccountRepository } from '@/data/protocols/db';

export const mockAddAccountParams = (): IAddAccountRepository.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
