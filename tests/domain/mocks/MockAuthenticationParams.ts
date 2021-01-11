import faker from 'faker';
import { IAuthentication } from '@/domain/usecases';

export const mockAuthenticationParams = (): IAuthentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
