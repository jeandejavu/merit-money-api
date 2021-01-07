import { DbAddRoleUseCase } from '@/data/usecases';
import { IAddRoleUseCase } from '@/domain/usecases';
import { RoleMongoRepository } from '@/infra/db';
import { MongoAdapter } from '@/infra/id';

export const makeDbAddRole = (): IAddRoleUseCase => {
  const mongoAdapter = new MongoAdapter();
  const accountMongoRepository = new RoleMongoRepository();
  return new DbAddRoleUseCase(
    accountMongoRepository,
    accountMongoRepository,
    mongoAdapter,
  );
};
