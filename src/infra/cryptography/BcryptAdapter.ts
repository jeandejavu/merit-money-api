import bcrypt from 'bcrypt';
import { IHasher } from '@/data/protocols';

export class BcryptAdapter implements IHasher {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }
}
