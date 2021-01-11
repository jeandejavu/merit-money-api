import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';
import env from '@/main/config/env';
import faker from 'faker';

let accountCollection: Collection;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const mockAccessToken = async (mongoHelper: any): Promise<string> => {
  accountCollection = await mongoHelper.getCollection('roles');
  const res = await accountCollection.insertOne({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  const id = res.ops[0]._id;
  const accessToken = sign({}, env.jwtSecret, {
    subject: String(id),
  });
  return accessToken;
};
