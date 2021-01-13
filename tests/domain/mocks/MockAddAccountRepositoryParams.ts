import faker from 'faker';
import { IAddAccountRepository } from '@/data/protocols';
import { mockRoleModel } from './MockRoleModel';

export const mockAddAccountRepositoryParams = (): IAddAccountRepository.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  account_role: mockRoleModel(),
  filename: faker.system.fileName('jpg'),
});
