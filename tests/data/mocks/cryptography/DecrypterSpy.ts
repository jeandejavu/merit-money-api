import { IDecrypter } from '@/data/protocols';
import faker from 'faker';

export class DecrypterSpy implements IDecrypter {
  result: string | undefined = faker.internet.password();

  ciphertext: string;

  async decrypt(ciphertext: string): Promise<string | undefined> {
    this.ciphertext = ciphertext;
    return this.result;
  }
}
