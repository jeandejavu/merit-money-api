import env from '@/main/config/env';
import { AccountMongoRepository } from '@/infra/db';
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography';
import { DbAuthentication } from '@/data/usecases';
import { IAuthentication } from '@/domain/usecases';
import { makeDiskStorageAdapter } from '../infra';

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const diskStorageAdapter = makeDiskStorageAdapter();

  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    diskStorageAdapter,
  );
};
