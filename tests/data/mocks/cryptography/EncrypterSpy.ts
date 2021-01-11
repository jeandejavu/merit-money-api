import { IEncrypter } from '@/data/protocols';
import faker from 'faker';

export class EncrypterSpy implements IEncrypter {
  ciphertext = faker.random.uuid();

  plaintext: string;

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.ciphertext;
  }
}
