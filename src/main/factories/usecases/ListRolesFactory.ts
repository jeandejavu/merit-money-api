import { DbListRolesUseCase } from '@/data/usecases';
import { IListRolesUseCase } from '@/domain/usecases';
import { RoleMongoRepository } from '@/infra/db';

export const makeDbListRoles = (): IListRolesUseCase => {
  const roleMongoRepository = new RoleMongoRepository();
  return new DbListRolesUseCase(roleMongoRepository);
};
