import { MongoHelper } from '@/infra/db/mongodb';
import {
  IAddAccountRepository,
  ICheckAccountByEmailRepository,
} from '@/data/protocols/db';
import { ObjectID } from 'mongodb';

export class AccountMongoRepository
  implements IAddAccountRepository, ICheckAccountByEmailRepository {
  async add(
    data: IAddAccountRepository.Params,
  ): Promise<IAddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');

    const { account_role, ...rest } = data;

    const result = await accountCollection.insertOne({
      ...rest,
      role_id: new ObjectID(account_role.id),
    });
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
