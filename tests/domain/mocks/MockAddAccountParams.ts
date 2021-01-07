import faker from 'faker';
import { IAddAccountRepository } from '@/data/protocols/db';
import { mockRoleModel } from './MockRoleModel';

export const mockAddAccountParams = (): IAddAccountRepository.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  account_role: mockRoleModel(),
});
