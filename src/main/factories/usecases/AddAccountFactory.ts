import { DbAddAccountUseCase } from '@/data/usecases';
import { IAddAccountUseCase } from '@/domain/usecases';
import { AccountMongoRepository } from '@/infra/db';
import { BcryptAdapter } from '@/infra/cryptography';

export const makeDbAddAccount = (): IAddAccountUseCase => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAddAccountUseCase(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository,
  );
};
