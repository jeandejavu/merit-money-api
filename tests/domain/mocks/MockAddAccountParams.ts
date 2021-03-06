import faker from 'faker';
import { IAddAccountUseCase } from '@/domain/usecases';
import { mockRoleModel } from './MockRoleModel';

export const mockAddAccountParams = (): IAddAccountUseCase.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  account_role: mockRoleModel(),
  avatar: {
    filename: faker.system.fileName('jpg'),
  },
});
