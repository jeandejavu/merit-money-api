import faker from 'faker';
import { IAddRoleUseCase } from '@/domain/usecases';

export const mockAddRoleParams = (): IAddRoleUseCase.Params => ({
  description: faker.name.jobDescriptor(),
});
