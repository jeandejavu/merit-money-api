import { MongoHelper } from '@/infra/db/mongodb';
import { IAddAccountRepository } from '@/data/protocols/db';

export class AccountMongoRepository implements IAddAccountRepository {
  async add(
    data: IAddAccountRepository.Params,
  ): Promise<IAddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(data);
    return result.ops[0] !== null;
  }
}
