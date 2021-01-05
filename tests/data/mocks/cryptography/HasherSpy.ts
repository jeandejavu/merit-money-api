import { IHasher } from '@/data/protocols';

import faker from 'faker';

export class HasherSpy implements IHasher {
  digest = faker.random.uuid();

  plaintext: string;

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.digest;
  }
}
