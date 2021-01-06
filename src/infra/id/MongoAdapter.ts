import { ObjectID } from 'mongodb';
import { IGenerateID } from '@/data/protocols';

export class MongoAdapter implements IGenerateID {
  async generateID(): Promise<string> {
    const id = new ObjectID();
    return id.toHexString();
  }
}
