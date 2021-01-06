import faker from 'faker';
import { ObjectID } from 'mongodb';
import { IAddRoleRepository } from '@/data/protocols';

export const mockRoleParams = (): IAddRoleRepository.Params => ({
  id: new ObjectID().toHexString(),
  description: faker.name.jobDescriptor(),
});
