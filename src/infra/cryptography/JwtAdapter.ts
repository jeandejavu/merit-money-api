import { IDecrypter, IEncrypter } from '@/data/protocols';

import jwt from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({}, this.secret, {
      subject: String(plaintext),
    });
  }

  async decrypt(ciphertext: string): Promise<string | undefined> {
    try {
      const decoded = jwt.verify(ciphertext, this.secret);
      const { sub } = decoded as ITokenPayload;
      return sub;
    } catch (error) {
      return undefined;
    }
  }
}
