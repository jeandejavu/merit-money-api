import faker from 'faker';
import { ObjectID } from 'mongodb';
import { RoleModel } from '@/domain/models';

export const mockRoleModel = (): RoleModel => ({
  id: new ObjectID().toHexString(),
  description: faker.name.jobDescriptor(),
});
