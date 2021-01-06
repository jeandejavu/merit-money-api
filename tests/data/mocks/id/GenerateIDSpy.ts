import { IGenerateID } from '@/data/protocols';

import faker from 'faker';

export class GenerateIDSpy implements IGenerateID {
  id = faker.random.uuid();

  async generateID(): Promise<string> {
    return this.id;
  }
}
