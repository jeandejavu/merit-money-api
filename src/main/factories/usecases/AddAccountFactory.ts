import { DbAddAccountUseCase } from '@/data/usecases';
import { IAddAccountUseCase } from '@/domain/usecases';
import { AccountMongoRepository, RoleMongoRepository } from '@/infra/db';
import { BcryptAdapter } from '@/infra/cryptography';
import { makeDiskStorageAdapter } from '../infra';

export const makeDbAddAccount = (): IAddAccountUseCase => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const roleMongoRepository = new RoleMongoRepository();

  const diskStorageAdapter = makeDiskStorageAdapter();

  return new DbAddAccountUseCase(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository,
    roleMongoRepository,
    diskStorageAdapter,
  );
};
