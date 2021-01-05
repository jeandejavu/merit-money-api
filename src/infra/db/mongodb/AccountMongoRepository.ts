import { MongoHelper } from '@/infra/db/mongodb';
import {
  IAddAccountRepository,
  ICheckAccountByEmailRepository,
} from '@/data/protocols/db';

export class AccountMongoRepository
  implements IAddAccountRepository, ICheckAccountByEmailRepository {
  async add(
    data: IAddAccountRepository.Params,
  ): Promise<IAddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(data);
    return result.ops[0] !== null;
  }

  async checkByEmail(
    email: string,
  ): Promise<ICheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne(
      {
        email,
      },
      {
        projection: {
          _id: 1,
        },
      },
    );
    return account !== null;
  }
}
